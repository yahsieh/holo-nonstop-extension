let currentTabId = -1

function restoreOptions() {
  chrome.storage.sync.get({
    [currentTabId]: 'off',
  }, (items) => {
    // update toggle event silently
    $('#toggle').bootstrapToggle(items[currentTabId], true)
  })
}

function init() {
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
    url: ['https://www.youtube.com/*'],
  },
  (tabs) => {
    currentTabId = tabs[0].id
    restoreOptions()
  })
}

document.addEventListener('DOMContentLoaded', init)
$('#toggle').change(() => {
  const status = document.getElementById('toggle').checked
  if (status) {
    chrome.storage.sync.set({ [currentTabId]: 'on' })
  } else {
    chrome.storage.sync.set({ [currentTabId]: 'off' })
  }
})
