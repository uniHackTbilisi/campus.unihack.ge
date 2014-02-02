var hack = {
	bg:{
		mute: true,
		ratio: 16/9,
		id: 'bg-video',
		videoId:'aEn9Tki2kwY'
	}
};

hack = (function ($,window) {
	'use strict';


    // load youtube iframe js api
    var script = document.createElement("script");
    script.src = "//www.youtube.com/iframe_api";
    var head = document.getElementsByTagName("head")[0] || document.documentElement;
    head.appendChild(script);

    var domPlayer = null;
    var curHeight = null; 
    var curWidth  = null; 
	var player = null;


	var resize = function () {
		if (curWidth == window.innerWidth && curHeight == window.innerHeight) return;

	    curHeight = window.innerHeight; 
	    curWidth  = window.innerWidth; 

		if(curWidth / $.bg.ratio < curHeight){
			curWidth = curHeight * $.bg.ratio;
		}else{
			curHeight = curWidth / $.bg.ratio;
		}
		domPlayer.style.width = curWidth + "px";
		domPlayer.style.height = curHeight + "px";
		domPlayer.style.marginTop = -0.5 * curHeight + "px";
		domPlayer.style.marginLeft = -0.5 * curWidth + "px";
	};

	var onPlayerStateChange = function (state) {
		if (state.data === 1 && domPlayer.style.opacity == 0) { //play
			document.body.className += ' started';
		}else if(state.data === 0){
			state.target.seekTo(0);
		}
		console.log('onPlayerStateChange',state);
	};

	var onPlayerReady = function (event) {
		domPlayer = document.getElementById($.bg.id);
		resize();
        if($.bg.mute) event.target.mute();
        event.target.playVideo();
	};
	window.onresize = resize;
	window.onYouTubeIframeAPIReady = function () {
		player = new YT.Player($.bg.id, {
		height: 0,
		width: 0,
		videoId: $.bg.videoId,
        playerVars: {
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            wmode: 'transparent',
            rel : 0,
        },
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

	return $;
})(hack,window);


// hack = (function ($,window) {
// 	'use strict';
// 	var module = {

// 	};
// 	$.mModule = module;
// 	return $;
// })(hack,window);
