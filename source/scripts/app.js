var hack = {
	bg:{
		mute: true,
		ratio: 16/9,
		id: 'bg-video',
		videoId:'jgjbJYC2cLQ'
	}
};

hack = (function ($,window) {
	'use strict';
    var a = navigator.userAgent||navigator.vendor||window.opera;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))){
      console.log('mobile');
      return $;
    }
	console.log('pc');
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
            rel : 0
        },
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

	return $;
})(hack,window);

(function (window) {
	var form = {
		emailCheck: function(field) {
			var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			form.check(field,reg);
		},nameCheck: function(field) {
			var reg =  /^[ა-ჰ ]+$/;
			form.check(field,reg);
		},passwordCheck: function(field) {
			var reg = /^.{8,16}$/;
			form.check(field,reg);
		},idCheck: function(field) {
			var reg = /^[0-9]{11}$/;
			form.check(field,reg);
		},check: function(field, reg) {
			if(reg.test(field.value)) {
				field.className = 'success';
			} else {
				field.className = 'warning';
			}
		}
	}

	window.onload = function() {
		var email = document.getElementById('email');
		var	firstname = document.getElementById('name');
		var id = document.getElementById('id');
		var birth = document.getElementById('birth');
		var company = document.getElementById('company');
		var position = document.getElementById('position');
		var submit = document.getElementById('submit');

		email.onblur = function() {
			form.emailCheck(email);
		};

        email.onkeyup = function() {
			form.emailCheck(email);
		};

		firstname.onblur = function() {
			form.nameCheck(firstname);
		};

        firstname.onkeyup = function() {
			form.nameCheck(firstname);
		};

		id.onblur = function() {
			form.idCheck(id);
		};

		id.onkeyup = function() {
			form.idCheck(id);
		};

		var submission = function(e) {
			form.emailCheck(email);
			form.nameCheck(firstname);
			form.idCheck(id);

			if(document.querySelectorAll('.warning').length) {
				e.preventDefault();
			}

		};
		submit.addEventListener("click", submission, false);	
	};
})(window);


// hack = (function ($,window) {
// 	'use strict';
// 	var module = {

// 	};
// 	$.mModule = module;
// 	return $;
// })(hack,window);
