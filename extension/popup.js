/* eslint-disable no-undef */
// Saves options to chrome.storage
var currentTabId = -1

function init() {
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
        url: ['https://www.youtube.com/*']
    }
        , function (tabs) {
            currentTabId = tabs[0].id
            restore_options()
        })
}
function restore_options() {
    chrome.storage.sync.get({
        [currentTabId]: 'off'
    }, function (items) {
        // update toggle event silently
        $('#toggle').bootstrapToggle(items[currentTabId], true)
    })
}

document.addEventListener('DOMContentLoaded', init)
document.getElementById('optionButton').addEventListener('click', function () {
    chrome.runtime.openOptionsPage()
})
$('#toggle').change(function () {
    let status = document.getElementById('toggle').checked
    status ? chrome.storage.sync.set({ [currentTabId]: 'on' }) : chrome.storage.sync.set({ [currentTabId]: 'off' })
})