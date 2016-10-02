
var bookmarkURLs = [];

$(function() {
    $( ".login-btn" ).click(function() {

        // Login button was clicked.
        $.get("https://booksyncinternal.herokuapp.com/", function( data ) {

        });
    });
});

function getAllBookmarks(parent) {
    if (!parent.children) {
        c++;
        bookmarkURLs.push(parent);
    } else {
        parent.children.forEach(child => {
            getAllBookmarks(child);
        });
    }
}

function flattenBookmarkTree() {
    chrome.bookmarks.getTree(function(data) {
        if (!data[0]) { return; }

        getAllBookmarks(data[0])
        console.log(bookmarkURLs, c);
    });
}

document.addEventListener('DOMContentLoaded', function () {

    flattenBookmarkTree();
});