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
    console.log(script);
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
	var form = {
	
		emailCheck: function(field) {
			var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			form.check(field,reg);
		},

		nameCheck: function(field) {
			var reg =  /^([ \u00c0-\u01ffa-zA-Z'\-])+$/;
			form.check(field,reg);
		},

		passwordCheck: function(field) {
			var reg = /^.{8,16}$/;
			form.check(field,reg);
		},

		idCheck: function(field) {
			var reg = /^[0-9]{11}$/;
			form.check(field,reg);
		},

		check: function(field, reg) {
			if(reg.test(field.value)) {
				form.successField(field);
			} else {
				form.errorField(field);
			}
		},

		successField: function(field) {
			field.className = 'success';
		},

		errorField: function(field) {
			field.className = 'warning';
		},



	} 

	window.onload = function() {
		var email = document.getElementById('mail');
		var	firstname = document.getElementById('firstname');
		var lastname = document.getElementById('lastname');
		var id = document.getElementById('id');
		var birth = document.getElementById('birth');
		var company = document.getElementById('company');
		var position = document.getElementById('position');
		var submit = document.getElementById('submit');

		email.onblur = function() {
			form.emailCheck(email);
		};

		firstname.onblur = function() {
			form.nameCheck(firstname);
		};

		lastname.onblur = function() {
			form.nameCheck(lastname);
		};

		id.onblur = function() {
			form.idCheck(id);
		};
		

		var submission = function(e) {
			if(document.querySelectorAll('.warning').length) {
				e.preventDefault();
			}
			console.log(document.querySelectorAll('.warning').length);
		};


		submit.addEventListener("click", submission, false);	


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
