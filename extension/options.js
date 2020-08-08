/* eslint-disable no-undef */
// Saves options to chrome.storage

$("#addOption").click(function () {
    let id = $(".poll-options ul").children().length + 1;
    let qOption = '<li><span class="po-number">'+ id +'</span><input type="text" class="form-control" id="pollOption-'+ id +'" placeholder="Option '+ id +' "><i class="fas fa-times remove-this"></i></li>';
    $(".poll-options ul").append(qOption);
});

$(".poll-options").on("click", ".remove-this", function() {
    $(this).closest("li").remove();
});

// function save_options() {
//     var color = document.getElementById('color').value;
//     var likesColor = document.getElementById('like').checked;
//     chrome.storage.sync.set({
//         favoriteColor: color,
//         likesColor: likesColor
//     }, function() {
//         // Update status to let user know options were saved.
//         var status = document.getElementById('status');
//         status.textContent = 'Options saved.';
//         setTimeout(function() {
//             status.textContent = '';
//         }, 750);
//     });
// }

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
// document.getElementById('save').addEventListener('click',
//    save_options);