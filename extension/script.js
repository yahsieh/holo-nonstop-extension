/* eslint-disable no-undef */
/* eslint-disable no-console */
var streamList = {}
var lastStatus = 'unfound'

function main() {
    getStreamList()
    let newStatus = getCurrentLiveStatus()
    if (newStatus == 'ended' && lastStatus == 'live') {
        lastStatus = newStatus
        redirectStream()
    }
    lastStatus = newStatus
}

const getStreamList = async () => {
    const response = await fetch('https://api.holotools.app/v1/live')
    streamList = await response.json()
}

function getCurrentLiveStatus() {
    let currentURL = new URL(window.location.toString())
    let params = currentURL.searchParams
    if (currentURL.pathname == '/watch' && params.has('v')) {
        try {
            let liveStreams = streamList.live.map(item => item.yt_video_key)
            let endStreams = streamList.ended.map(item => item.yt_video_key)
            if (liveStreams.includes(params.get('v'))) {
                return 'live'
            }
            else if (endStreams.includes(params.get('v'))) {
                return 'ended'
            }
            else {
                return 'unfound'
            }
        } catch (e) {
            // wait for stream list returned
            console.log('live status unfound or waiting for response')
            return 'unfound'
        }
    }
}

function redirectStream() {
    let msg = {
        'ended': true,
        'nextStream': getLiveChannels()
    }
    chrome.runtime.sendMessage(msg)
}

function getStoredHostOrder() {
    chrome.storage.sync.get('hostOrder', function (result) {
        newHostOrder = result.key
    })
}

function getLiveChannels() {
    return [
        streamList.live.map(items => items.channel.yt_channel_id),
        streamList.live.map(items => items.yt_video_key)
    ]
}

getStreamList()
getStoredHostOrder()
setInterval(main, 60000)