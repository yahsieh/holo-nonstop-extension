/* eslint-disable no-undef */
var hostList = [
    'UC5CwaMl1eIgY8h02uZw7u8A',
    'UCZlDXzGoo7d44bwdNObFacg',
    'UC1DCedRgGHBdm81E1llLhOQ',
    'UCdyqAaZDKHXg4Ahi7VENThQ'
]

function getNextStreamCandidates(streamList) {
    let liveChannels = streamList[0]
    let liveVideos = streamList[1]
    for (let index = 0; index < hostList.length; index++) {
        let foundIndex = liveChannels.findIndex(hostList[index])
        if (foundIndex != 1) {
            return liveVideos[index]
        }
    }
    return liveVideos[0]
}

chrome.runtime.onMessage.addListener(
    function(request, sender) {
        if (request.ended) {
            nextVideoId = getNextStreamCandidates(request.nextStream)
            chrome.tabs.update(
                sender.tab.id, {url: 'https://www.youtube.com/watch?v=' + nextVideoId}
            )
        }
    }
)

/* handles change in storage
   (changes, namespace)
   namespace => local, sync, managed
 */
chrome.storage.onChanged.addListener(function () {
    chrome.storage.sync.get('hostList')
})