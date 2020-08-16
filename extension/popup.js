let currentTabId = -1

function restoreOptions() {
  chrome.storage.sync.get({
    [currentTabId]: 'off',
  }, (items) => {
    // update toggle event silently
    $('#toggle').bootstrapToggle(items[currentTabId], true)
  })
}

function updateLiveTab() {
  chrome.storage.sync.get(['latestIcon', 'latestLink'], (items) => {
    $('#nav-live').empty()
    const liveList = []
    if (items.latestIcon === undefined) {
      $('#nav-live').append($('<span>Loading...</span>'))
    } else {
      const liveCounts = items.latestIcon.length
      if (liveCounts !== 0) {
        for (let index = 0; index < liveCounts; index++) {
          liveList.push(
            $(`<div class="video-avatar">
                <a href="https://www.youtube.com/watch?v=${items.latestLink[index]}" target="_blank">
                  <img src="${items.latestIcon[index]}" height="60" width="60">
                </a>
              </div>`),
          )
        }
        $('#nav-live').append(liveList)
      } else {
        $('#nav-live').append($('<span>No live now...</span>'))
      }
    }
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
    updateLiveTab()
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

updateLiveTab()
setInterval(updateLiveTab, 60000)
