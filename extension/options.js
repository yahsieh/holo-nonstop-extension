/* eslint-disable no-undef */
// Saves options to chrome.storage

$('#my-select').multiSelect({ keepOrder: true })

$('#deselect-all').click(function () {
    $('#my-select').multiSelect('deselect_all')
    $('#my-select').multiSelect('refresh')
})



function save_options() {
    let newList = []
    selectedCount = $('.ms-elem-selection[style=""] > span').length
    for (let index = 0; index < selectedCount; index++) {
        newList.push($('.ms-elem-selection[style=""] > span')[index].textContent)
    }
    chrome.storage.sync.set({
        hostlist: newList
    }, function () {
        // Update status to let user know options were saved.
        let status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
// function restore_options() {
//     // Use default value color = 'red' and likesColor = true.
//     chrome.storage.sync.get({
//         favoriteColor: 'red',
//         likesColor: true
//     }, function(items) {
//         document.getElementById('color').value = items.favoriteColor;
//         document.getElementById('like').checked = items.likesColor;
//     });
// }
// document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);