let currentTabId = -1

function updateLiveTab(latestLives) {
  $('#nav-live').empty()
  const liveList = []
  if (latestLives.latestIcon === undefined) {
    $('#nav-live').append($('<span>Loading...</span>'))
  } else {
    const liveCounts = latestLives.latestIcon.length
    if (liveCounts !== 0) {
      for (let index = 0; index < liveCounts; index++) {
        liveList.push(
          $(`<div class="video-avatar">
              <a href="https://www.youtube.com/watch?v=${latestLives.latestLink[index]}" target="_blank">
                <img src="${latestLives.latestIcon[index]}" height="60" width="60">
              </a>
            </div>`),
        )
      }
      liveList.push($(`<span>Last updated time: ${latestLives.updateTime}</span>`))
      $('#nav-live').append(liveList)
    } else {
      $('#nav-live').append(
        $(`<span>No live now...</span>
          <span>Last updated time: ${latestLives.updateTime}</span>
          `),
      )
    }
  }
}

function restorePopup() {
  chrome.storage.sync.get({
    latestLives: {},
    [currentTabId]: 'off',
  }, (items) => {
    // update toggle event silently
    $('#toggle').bootstrapToggle(items[currentTabId], true)
    updateLiveTab(items.latestLives)
  })
}

function initPopup() {
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
    url: ['https://www.youtube.com/*'],
  },
  (tabs) => {
    currentTabId = tabs[0].id
    restorePopup()
  })
}

document.addEventListener('DOMContentLoaded', initPopup)
$('#toggle').change(() => {
  const status = document.getElementById('toggle').checked
  if (status) {
    chrome.storage.sync.set({ [currentTabId]: 'on' })
  } else {
    chrome.storage.sync.set({ [currentTabId]: 'off' })
  }
})

chrome.storage.onChanged.addListener((changes) => {
  if (Object.keys(changes).includes('latestLives')) {
    updateLiveTab(changes.latestLives.newValue)
  }
})
