// Saves options to chrome.storage
function saveOptions() {
  const newList = []
  const selectedCount = $('.ms-elem-selection[style=""] > span').length
  for (let index = 0; index < selectedCount; index++) {
    newList.push($('.ms-elem-selection[style=""] > span')[index].textContent)
  }
  chrome.storage.sync.set({
    hostOrder: newList,
  }, () => {
    // Update status to let user know options were saved.
    const status = document.getElementById('status')
    status.textContent = 'Options saved.'
    setTimeout(() => {
      status.textContent = ''
    }, 750)
  })
}

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

function restoreOptions() {
  // Use default value hostOrder = []
  chrome.storage.sync.get({
    hostOrder: [],
  }, (items) => {
    $('#my-select').multiSelect('deselect_all')
    $('#my-select').multiSelect('refresh')
    items.hostOrder.forEach((channelName) => {
      $('#my-select').multiSelect('select', getChannelId(channelName))
    })
  })
}

function init() {
  $('#my-select').multiSelect({ keepOrder: true })
  restoreOptions()
}

$('#deselect-all').click(() => {
  $('#my-select').multiSelect('deselect_all')
  $('#my-select').multiSelect('refresh')
})
document.addEventListener('DOMContentLoaded', init)
document.getElementById('save').addEventListener('click', saveOptions)
document.getElementById('load').addEventListener('click', restoreOptions)
