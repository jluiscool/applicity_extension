/*global chrome*/

/*
job title, check
salary, check
company name, check
apply date Date.now(),
jobInfo,
*/

//check url, rerun code

//job details

//job title
let jobTitle = "";

let jobTitleHeader = document.querySelector(".jobs-unified-top-card__job-title")

let jobTitleFullText = jobTitleHeader.textContent

jobTitle = jobTitleFullText.replace(/\s{2,}/g, ' ');
jobTitle = jobTitle.replace(/^\s+/, '');

console.log(jobTitle + "This is job title")

//salary
let salary = "";
window.addEventListener("load", function () {
    // Your code here
    let salaryLink = document.querySelector('a[href="#SALARY"]');

    if (salaryLink) {
        // Anchor element found, you can proceed with further actions.
        salary = salaryLink.textContent;
        console.log(salary + " this is salary");
    } else {
        salary = "Salary not specified"
        console.log(salary);
    }
});

// company name
let companyName = "";
window.addEventListener("load", function () {
    let postOuterDiv = document.querySelector(".jobs-unified-top-card__primary-description")
    console.log(postOuterDiv)
    let firstChildDiv = postOuterDiv.querySelector("div:first-child");
    console.log(firstChildDiv + "first child div of company Name")
    let anchorTag = firstChildDiv.querySelector("a:first-child");

    companyName = anchorTag.textContent;
    console.log(companyName + "company name")
});

//jobInfo
let jobInfo = "";
window.addEventListener("load", function () {
    let outerJobInfoDiv = document.querySelector("li.jobs-unified-top-card__job-insight");
    console.log(outerJobInfoDiv)
    let firstSpanChild = outerJobInfoDiv.getElementsByTagName("span");
    console.log(firstSpanChild[0].textContent + "first span")

    jobInfo = firstSpanChild[0].textContent;
    jobInfo = jobInfo.replace(/\s{2,}/g, ' ');
    jobInfo = jobInfo.replace(/^\s+/, '');
    console.log(jobInfo + "this is the job info")
});

const bookmarkButton = document.createElement('button');

bookmarkButton.style.width = '300px';
bookmarkButton.style.height = '40px';
bookmarkButton.style.borderRadius = '24px';
bookmarkButton.style.backgroundColor = 'red';
bookmarkButton.style.borderWidth = '3px';

let userEmail = ""

chrome.storage.local.get(['cache', 'cacheTime'], function (items) {
    // console.log(items.cache)
    userEmail = items.cache
    bookmarkButton.textContent = userEmail;
});

// Set the button's text content to "Bookmark"

const firstButtonContainer = document.querySelector('.jobs-unified-top-card__content--two-pane');

if (firstButtonContainer) {
    // Append the bookmarkButton as a child of the first element
    firstButtonContainer.appendChild(bookmarkButton);
}

bookmarkButton.addEventListener('click', function () {
    // Ensure that the variables have valid values at this point
    console.log('Bookmark button clicked!');
    console.log({
        jobTitle: jobTitle,
        jobInfo: jobInfo,
        companyName: companyName,
        salary: salary,
    });

    // You can perform additional actions or logic here
});