
var bookmarkURLs = [];
var loginBtnClicked = false;
$(function() {
    $( ".login-btn" ).click(function() {
        chrome.tabs.update({url: "https://booksyncinternal.herokuapp.com/auth/google"});
        window.close();
        $('.login-btn').addClass('hidden');
        loginBtnClicked = true;
    });
});

function getAllBookmarks(parent) {
    if (!parent.children) {
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

        getAllBookmarks(data[0]);

        $.get("https://booksyncinternal.herokuapp.com/bookmarks?email=akash.sant10@gmail.com", function(data) {
            data.forEach(url => {
                $('ul').append('<li><a href="'+ url.url +'">' + url.title + '</a></li>');        
            });
        });


    });
}



document.addEventListener('DOMContentLoaded', function () {
    flattenBookmarkTree();

});