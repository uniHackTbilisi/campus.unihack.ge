(function(document, window) {
    "use strict";
    var body = document.body;
    var onChange = function() {
        var hash = window.location.hash || '#/main';
        body.className = body.className.replace(/page\-[a-zA-Z]+/g, '').trim().concat(hash.replace('#/', ' page-'));
        console.log(body.className);
    };
    window.onhashchange = onChange;
    onChange();
    body.className += ' transition';
})(document, window);