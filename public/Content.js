/*global chrome*/

/*
job title, check
salary, check
company name, check
apply date Date.now(),
jobInfo,
*/
let bookmarkButton;
let userEmail;
const logoUrl = "https://i.ibb.co/37vyk40/logo.png";

chrome.storage.local.get(['cache', 'cacheTime'], function (items) {
    userEmail = items.cache;
});

function initializeJobDetails() {
    // Function to extract job details
    function extractJobDetails() {
        //job title
        let jobTitle = "";
        let jobTitleHeader = document.querySelector(".jobs-unified-top-card__job-title");
        let jobTitleFullText = jobTitleHeader.textContent;
        jobTitle = jobTitleFullText.replace(/\s{2,}/g, ' ');
        jobTitle = jobTitle.replace(/^\s+/, '');
        // console.log(jobTitle + "This is job title");

        //salary
        let salary = "";
        let salaryLink = document.querySelector('a[href="#SALARY"]');
        if (salaryLink) {
            // Anchor element found, you can proceed with further actions.
            salary = salaryLink.textContent;
            // console.log(salary + " this is salary");
        } else {
            salary = "Salary not specified";
            // console.log(salary);
        }

        // company name
        let companyName = "";
        let postOuterDiv = document.querySelector(".jobs-unified-top-card__primary-description");
        let firstChildDiv = postOuterDiv.querySelector("div:first-child");
        // console.log(firstChildDiv + "first child div of company Name");
        let anchorTag = firstChildDiv.querySelector("a:first-child");
        companyName = anchorTag.textContent;
        // console.log(companyName + "company name");

        //jobInfo
        let jobInfo = "";
        let outerJobInfoDiv = document.querySelector("li.jobs-unified-top-card__job-insight");
        // console.log(outerJobInfoDiv);
        let firstSpanChild = outerJobInfoDiv.getElementsByTagName("span");
        // console.log(firstSpanChild[0].textContent + "first span");
        jobInfo = firstSpanChild[0].textContent;
        jobInfo = jobInfo.replace(/\s{2,}/g, ' ');
        jobInfo = jobInfo.replace(/^\s+/, '');
        // console.log(jobInfo + "this is the job info");

        const currentUrl = window.location.href;

        // Return the extracted job details
        return {
            role_name: jobTitle,
            job_info: jobInfo,
            company_name: companyName,
            salary: salary,
            job_link: currentUrl
        };
    }

    function makeApplicationPost(data) {
        const url = 'http://localhost:3001/applications';

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
                // You can add other headers if needed
            },
            body: JSON.stringify(data), // Convert data to JSON string
        };

        fetch(url, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // console.log(response.json)
                return response.json(); // Parse the response as JSON
            })
            .then((data) => {
                // Handle the response data here
                console.log('Response data:', data);
            })
            .catch((error) => {
                // Handle errors here
                console.error('Error:', error);
            });
    }

    // Function to create and append the bookmark button
    function createBookmarkButton() {
        if (!bookmarkButton) { // Check if the button doesn't exist
            bookmarkButton = document.createElement('button');
            bookmarkButton.style.width = '80px';
            bookmarkButton.style.height = '40px';
            bookmarkButton.style.borderRadius = '24px';
            bookmarkButton.style.backgroundColor = '#171621';
            bookmarkButton.style.display = 'inline-flex';
            // Set display to inline-flex
            bookmarkButton.style.marginTop = '8px'
            // Add CSS styles to center content
            bookmarkButton.style.justifyContent = 'center';
            bookmarkButton.style.alignItems = 'center';

            const img = document.createElement('img'); // Create an image element
            img.src = logoUrl // Set the source URL for your image
            img.style.height = '32px';
            img.alt = 'Bookmark'; // Set an alt attribute for accessibility

            // Append the image to the button
            bookmarkButton.appendChild(img);

            const firstButtonContainer = document.querySelector('.jobs-unified-top-card__content--two-pane');

            if (firstButtonContainer) {
                firstButtonContainer.appendChild(bookmarkButton);
            }

            // Add a click event listener to the bookmark button
            bookmarkButton.addEventListener('click', function () {
                // Handle the button click, e.g., display job details
                console.log('Bookmark button clicked!');
                const jobDetails = extractJobDetails(); // Get the latest job details
                jobDetails.user_email = userEmail;
                console.log(jobDetails);
                makeApplicationPost(jobDetails)
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
            // const jobDetails = extractJobDetails();

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

        //reinitialize
        initializeJobDetails();
    }
});