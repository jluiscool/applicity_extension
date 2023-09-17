/*global chrome*/

/*
job title, check
salary, check
company name, check
apply date Date.now(),
jobInfo,
*/
let bookmarkButton;

function initializeJobDetails() {
    // Function to extract job details
    function extractJobDetails() {
        //job title
        let jobTitle = "";
        let jobTitleHeader = document.querySelector(".jobs-unified-top-card__job-title");
        let jobTitleFullText = jobTitleHeader.textContent;
        jobTitle = jobTitleFullText.replace(/\s{2,}/g, ' ');
        jobTitle = jobTitle.replace(/^\s+/, '');
        console.log(jobTitle + "This is job title");

        //salary
        let salary = "";
        let salaryLink = document.querySelector('a[href="#SALARY"]');
        if (salaryLink) {
            // Anchor element found, you can proceed with further actions.
            salary = salaryLink.textContent;
            console.log(salary + " this is salary");
        } else {
            salary = "Salary not specified";
            console.log(salary);
        }

        // company name
        let companyName = "";
        let postOuterDiv = document.querySelector(".jobs-unified-top-card__primary-description");
        let firstChildDiv = postOuterDiv.querySelector("div:first-child");
        console.log(firstChildDiv + "first child div of company Name");
        let anchorTag = firstChildDiv.querySelector("a:first-child");
        companyName = anchorTag.textContent;
        console.log(companyName + "company name");

        //jobInfo
        let jobInfo = "";
        let outerJobInfoDiv = document.querySelector("li.jobs-unified-top-card__job-insight");
        console.log(outerJobInfoDiv);
        let firstSpanChild = outerJobInfoDiv.getElementsByTagName("span");
        console.log(firstSpanChild[0].textContent + "first span");
        jobInfo = firstSpanChild[0].textContent;
        jobInfo = jobInfo.replace(/\s{2,}/g, ' ');
        jobInfo = jobInfo.replace(/^\s+/, '');
        console.log(jobInfo + "this is the job info");

        // Return the extracted job details
        return {
            jobTitle: jobTitle,
            jobInfo: jobInfo,
            companyName: companyName,
            salary: salary
        };
    }

    // Function to create and append the bookmark button
    function createBookmarkButton() {
        if (!bookmarkButton) { // Check if the button doesn't exist
            bookmarkButton = document.createElement('button');
            bookmarkButton.style.width = '300px';
            bookmarkButton.style.height = '40px';
            bookmarkButton.style.borderRadius = '24px';
            bookmarkButton.style.backgroundColor = 'red';
            bookmarkButton.style.borderWidth = '3px';

            let userEmail = "";

            chrome.storage.local.get(['cache', 'cacheTime'], function (items) {
                userEmail = items.cache;
                bookmarkButton.textContent = userEmail;
            });

            const firstButtonContainer = document.querySelector('.jobs-unified-top-card__content--two-pane');

            if (firstButtonContainer) {
                firstButtonContainer.appendChild(bookmarkButton);
            }

            // Add a click event listener to the bookmark button
            bookmarkButton.addEventListener('click', function () {
                // Handle the button click, e.g., display job details
                console.log('Bookmark button clicked!');
                const jobDetails = extractJobDetails(); // Get the latest job details
                console.log(jobDetails);
            });
        }
    }

    // Use a MutationObserver to wait for changes in the DOM
    const observer = new MutationObserver(function (mutationsList, observer) {
        // Check if the DOM changes include the elements you are interested in
        const jobTitleHeader = document.querySelector(".jobs-unified-top-card__job-title");
        const salaryLink = document.querySelector('a[href="#SALARY"]');
        const companyDescription = document.querySelector(".jobs-unified-top-card__primary-description");
        const jobInfoElement = document.querySelector("li.jobs-unified-top-card__job-insight");

        // If all necessary elements are found, stop observing and proceed
        if (jobTitleHeader && salaryLink && companyDescription && jobInfoElement) {
            observer.disconnect(); // Stop observing DOM changes

            // Extract job details
            const jobDetails = extractJobDetails();

            // Create and attach the bookmark button
            createBookmarkButton();
        }
    });

    // Start observing the DOM for changes
    observer.observe(document.documentElement, { childList: true, subtree: true });
}

initializeJobDetails();

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.tabId && message.tabUrl) {
        // Access the tab ID and URL from the message object
        const tabId = message.tabId;
        const tabUrl = message.tabUrl;

        // Now you can use tabId and tabUrl in your content.js logic
        console.log(`Received tabId: ${tabId}`);
        console.log(`Received tabUrl: ${tabUrl}`);

        //reinitialize
        initializeJobDetails();
    }
});