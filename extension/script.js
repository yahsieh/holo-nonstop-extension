let streamList = {}
let lastStatus = 'unfound'
let failedCount = 0

const getStreamList = async () => {
  const response = await fetch('https://api.holotools.app/v1/live')
  streamList = await response.json()
}

function getCurrentLiveStatus() {
  const currentURL = new URL(window.location.toString())
  const params = currentURL.searchParams
  if (currentURL.pathname === '/watch' && params.has('v')) {
    try {
      const liveStreams = streamList.live.map((item) => item.yt_video_key)
      const endStreams = streamList.ended.map((item) => item.yt_video_key)
      if (liveStreams.includes(params.get('v'))) {
        failedCount = 0
        return 'live'
      }
      if (endStreams.includes(params.get('v'))) {
        failedCount = 0
        return 'ended'
      }
      failedCount += 1
      return 'unfound'
    } catch (e) {
      // wait for stream list returned
      console.error('live status unfound or waiting for response')
      return 'unfound'
    }
  } else {
    return 'unfound'
  }
}

function getLiveChannels() {
  return [
    streamList.live.map((items) => items.channel.yt_channel_id),
    streamList.live.map((items) => items.yt_video_key),
  ]
}

function redirectStream() {
  const msg = {
    ended: true,
    nextStream: getLiveChannels(),
  }
  chrome.runtime.sendMessage(msg)
}

function main() {
  if (failedCount < 10) getStreamList()
  const newStatus = getCurrentLiveStatus()
  if (newStatus === 'ended' && lastStatus === 'live') {
    lastStatus = newStatus
    redirectStream()
  }
  lastStatus = newStatus
}

getStreamList()
setInterval(main, 60000)
