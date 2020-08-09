/* eslint-disable no-undef */
/* eslint-disable no-console */
var streamList = {}

function main() {
    getStreamList()
    if (getCurrentLiveStatus() == 'ended') {
        redirectStream()
    }
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
            let liveStreams = streamList.live.map(item=>item.yt_video_key)
            let endStreams = streamList.ended.map(item=>item.yt_video_key)
            if (liveStreams.includes(params.get('v'))) {
                console.log('live')
                return 'live'
            }
            else if (endStreams.includes(params.get('v'))) {
                console.log('ended')
                return 'ended'
            }
            else {
                console.log('unfound')
                return 'unfound'
            }
        } catch (e) {
            // wait for stream list returned
            console.log('unfound')
            return 'unfound'
        }
    }
}

function redirectStream () {
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
        streamList.live.map(items=>items.channel.yt_channel_id),
        streamList.live.map(items=>items.yt_video_key)
    ]
}

getStreamList()
getStoredHostOrder()
setInterval(main, 60000)