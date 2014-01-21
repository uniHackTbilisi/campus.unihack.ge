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
    // TODO add navigation using arrows;
    /* document.onKeyDown = function(event) {
        if (!event)
            event = window.event;
        var code = event.keyCode;
        if (event.charCode && code == 0)
            code = event.charCode;
        switch (code) {
            case 37:
                // Key left.
                break;
            case 39:
                // Key right.
                break;
        }
        event.preventDefault();
    };*/
})(document, window);