/*global chrome*/

const cookies = chrome.cookies.get({ url: "https://*", name: "Extension cookies" })

const newData = chrome.storage.sync.get(null, function (items) {
    let allKeys = Object.keys(items);
    return allKeys
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request.greeting)
        console.log(cookies)
        console.log(newData)
        sendResponse({ farewell: "goodbye" })
    }
);


chrome.storage.local.get(['cache', 'cacheTime'], function (items) {
    console.log(items)
});


// Initialize a variable to store the URL of the active tab
let activeTabUrl = '';
let activeTabId;

// Function to update the active tab's URL
function updateActiveTabUrl(tabId, changeInfo, tab) {
    if (tab.active && changeInfo.status === 'complete') {
        activeTabUrl = tab.url;
        activeTabId = tab.id
        console.log(activeTabId);
        console.log(activeTabUrl);

        chrome.tabs.sendMessage(activeTabId, { tabId: activeTabId, tabUrl: activeTabUrl });
    }
}

// Listen for tab URL changes
chrome.tabs.onUpdated.addListener(updateActiveTabUrl);