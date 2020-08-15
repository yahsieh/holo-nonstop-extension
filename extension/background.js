let hostOrder = []

function getChannelId(channelName) {
  const convertList = {
    ときのそら: 'UCp6993wxpyDPHUpavwDFqgg',
    ロボ子さん: 'UCDqI2jOz0weumE8s7paEk6g',
    さくらみこ: 'UC-hM6YJuNYVAmUWxeIr9FeA',
    星街すいせい: 'UC5CwaMl1eIgY8h02uZw7u8A',
    AZKi: 'UC0TXe_LYZ4scaW2XMyi5_kw',
    夜空メル: 'UCD8HOxPs4Xvsm8H0ZxXGiBw',
    白上フブキ: 'UCdn5BQ06XqgXoAxIhbqw5Rg',
    夏色まつり: 'UCQ0UDLQCjY0rmuxCDE38FGg',
    'アキ・ローゼンタール': 'UCFTLzh12_nrtzqBPsTCqenA',
    赤井はあと: 'UC1CfXB_kRs3C-zaeTG3oGyg',
    湊あくあ: 'UC1opHUrw8rvnsadT-iGp7Cg',
    紫咲シオン: 'UCXTpFs_3PqI41qX2d9tL2Rw',
    百鬼あやめ: 'UC7fk0CB07ly8oSl0aqKkqFg',
    癒月ちょこ: 'UC1suqwovbL1kzsoaZgFZLKg',
    大空スバル: 'UCvzGlP9oQwU--Y0r9id_jnA',
    大神ミオ: 'UCp-5t9SrOQwXMU7iIjQfARg',
    猫又おかゆ: 'UCvaTdHTWBGv3MKj3KVqJVCw',
    戌神ころね: 'UChAnqc_AY5_I3Px5dig3X1Q',
    兎田ぺこら: 'UC1DCedRgGHBdm81E1llLhOQ',
    潤羽るしあ: 'UCl_gCybOJRIgOXw6Qb4qJzQ',
    不知火フレア: 'UCvInZx9h3jC2JzsIzoOebWg',
    白銀ノエル: 'UCdyqAaZDKHXg4Ahi7VENThQ',
    宝鐘マリン: 'UCCzUftO8KOVkV4wQG1vkUvg',
    天音かなた: 'UCZlDXzGoo7d44bwdNObFacg',
    桐生ココ: 'UCS9uQI-jC3DE0L4IpXyvr6w',
    角巻わため: 'UCqm3BQLlJfvkTsX_hvm0UmA',
    常闇トワ: 'UC1uv2Oq6kNxgATlCiez59hw',
    姫森ルーナ: 'UCa9Y57gfeY0Zro_noHRVrnw',
    雪花ラミィ: 'UCFKOVgVbGmX65RxO3EtH3iw',
    桃鈴ねね: 'UCAWSyEs_Io8MtpY3m-zqILA',
    獅白ぼたん: 'UCUKD-uaobj9jiqB-VXt71mA',
    魔乃アロエ: 'UCgZuwn-O7Szh9cAgHqJ6vjw',
    尾丸ポルカ: 'UCK9V2B22uJYu3N7eR_BT9QA',
    花咲みやび: 'UC6t3-_N8A6ME1JShZHHqOMw',
    鏡見キラ: 'UCEzsociuFqVwgZuMaZqaCsg',
    奏手イヅル: 'UCZgOv3YDEs-ZnZWDYVwJdmA',
    アルランディス: 'UCKeAhJvy8zgXWbh9duVjIaQ',
    律可: 'UC9mf_ZVpouoILRY9NUIaK-w',
    'アステル・レダ': 'UCNVEsYbiZjH5QLmGeSgTSzg',
    岸堂天真: 'UCGNI4MENvnsymYjKiZwv9eg',
    夕刻ロベル: 'UCANDOlYTJT7N5jlRC3zfzVA',
    影山シエン: 'UChSvpZYRPh0FvG4SJGSga3g',
    荒咬オウガ: 'UCwL7dgTxKo8Y4RFIKWaf8gA',
    'アユンダ・リス': 'UCOyYb1c43VlX9rc_lT6NKQw',
    'ムーナ・ホシノヴァ': 'UCP0BspO_AMEe3aQqqpo89Dg',
    'アイラニ・イオフィフティーン': 'UCAoy6rzhSf4ydcYjJw3WoVg',
    'AkiRose Ch.アキ・ローゼンタールSub': 'UCLbtM3JZfRTg8v2KGag-RMw',
    'Akai Haato Sub 赤井はあと': 'UCHj_mh57PVMXhAUDphUQDFA',
    'Choco subCh. 癒月ちょこ': 'UCp3tgHXw_HI0QMk1K8qh3gQ',
    'hololive ホロライブ': 'UCJFZiqLMntJufDCHc7bQixg',
  }
  return convertList[channelName]
}

function getNextStreamCandidates(streamList) {
  const liveChannels = streamList[0]
  const liveVideos = streamList[1]
  for (let index = 0; index < hostOrder.length; index++) {
    const foundIndex = liveChannels.indexOf(getChannelId(hostOrder[index]))
    if (foundIndex !== -1) {
      return liveVideos[foundIndex]
    }
  }
  if (liveVideos.length !== 0) { return liveVideos[0] }
  return ''
}

function updatehostOrder() {
  chrome.storage.sync.get({
    hostOrder: [],
  }, (items) => {
    hostOrder = items.hostOrder
  })
}

chrome.runtime.onMessage.addListener(
  (request, sender) => {
    chrome.storage.sync.get({ [sender.tab.id]: 'off' }, (items) => {
      if (request.ended && items[sender.tab.id] === 'on') {
        const nextVideoId = getNextStreamCandidates(request.nextStream)
        chrome.tabs.update(
          sender.tab.id, { url: `https://www.youtube.com/watch?v=${nextVideoId}` },
        )
      }
    })
  },
)

chrome.storage.onChanged.addListener(() => {
  updatehostOrder()
})

chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: 'www.youtube.com', schemes: ['https'] },
        }),
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()],
    }])
  })
})

updatehostOrder()
