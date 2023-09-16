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

