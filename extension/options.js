/* eslint-disable no-undef */
// Saves options to chrome.storage
function save_options() {
    let newList = []
    selectedCount = $('.ms-elem-selection[style=""] > span').length
    for (let index = 0; index < selectedCount; index++) {
        newList.push($('.ms-elem-selection[style=""] > span')[index].textContent)
    }
    chrome.storage.sync.set({
        hostOrder: newList
    }, function () {
        // Update status to let user know options were saved.
        let status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

function init() {
    $('#my-select').multiSelect({ keepOrder: true })
    restore_options()
}
function restore_options() {
    // Use default value hostOrder = []
    chrome.storage.sync.get({
        hostOrder: []
    }, function(items) {
        $('#my-select').multiSelect('deselect_all')
        $('#my-select').multiSelect('refresh')
        items.hostOrder.forEach(items => {
            $('#my-select').multiSelect('select', getChannelId(items))
        });
    });
}

function getChannelId(channelName) {
    let convertList = {
        'elem 1': 'elem_1',
        'elem 2': 'elem_2',
        'elem 3': 'elem_3',
        'elem 4': 'elem_4'
    }
    return convertList[channelName]
}

$('#deselect-all').click(function () {
    $('#my-select').multiSelect('deselect_all')
    $('#my-select').multiSelect('refresh')
})
document.addEventListener('DOMContentLoaded', init);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('load').addEventListener('click', restore_options);