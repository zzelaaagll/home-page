$(function () {
	var deftxt = "";
	var base = "/gOB/7TYu0de12gj9m9yYTsfxTyiw9vh1rnsN666l79EzPBPzIQlHd09T06EAyTj4NnTpW/2//nL6bG/GejSF28pVOoBArvKIxY9hJwXfgp10yWWds2AbNKO9cfKbCc5gn3jtgPFJemZ1wBFStvimw==";
	var hibernate = {
		time: 0,
		timer: null,
		start: function () {
			clearTimeout(hibernate.timer);
			hibernate.timer = setTimeout(function () {
				hibernate.time++;
				if (hibernate.time >= 10) {
					closeGate();
				}else {
					hibernate.start();
				}
			}, 1000);
		},
		end: function () {
			clearTimeout(hibernate.timer);
			hibernate.init();
		},
		init: function () {
			hibernate.time = 0;
		}
	};
	var newDate = {
		getTime: function () {
			let date = new Date();
			return date.getHours() + ":" + (date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes());
		}
		,getToday: function () {
			let date = new Date();
			return (date.getMonth() + 1) + "月" + date.getDate() + "日";
		}
		,getWeek: function () {
			let date = new Date();
			let week = "";
			switch (date.getDay()) {
				case 0: return "星期日";
				case 1: return "星期一";
				case 2: return "星期二";
				case 3: return "星期三";
				case 4: return "星期四";
				case 5: return "星期五";
				case 6: return "星期六";
			}
		}
	};
	function openGate () {
		showLoginInput();
		$(".gate").css({display:"none"});
		hibernate.start();
	}
	function closeGate () {
		$(".login").css({display:"none"});
		$(".gate").css({display:"block"});
		$(".login-input").blur();
		$(".login-input").val(deftxt);
		hibernate.end();
		
	}
	function showLoginInput () {
		$(".login-no-password").css({display:"none"});
		$(".login").css({display:'block'});
		$(".login-input").focus();
		$(".login-input").val(deftxt);
	}
	function showNoPassword () {
		$(".login-no-password").css({display:"block"});
		$(".login").css({display:'none'});
		$(".login-input").blur();
	}
	function showTime () {
		$(".show-time>p").eq(0).html(newDate.getTime());
		$(".show-time>p").eq(1).html(newDate.getToday() + ", " + newDate.getWeek());
		setTimeout(showTime, 1000);
	}
	function check () {
		let p = $(".login-input").val();
		let d = AESDecode(base, p.MD5(16), p.MD5(16));
		if (d) {
			$.cookie(d.key, d.value, {
				expires: d.expires, 
				path: '/', 
				domain: d.domain, 
				secure: true
			});
			window.location.href = d.url;
		}else {
			showNoPassword();
		}
	}
	$("body").keyup(function (e) {
		hibernate.init();
		if (e.keyCode === 13 && $(".gate").css("display") !== "none") {
			openGate();
			return;
		}
		if (e.keyCode === 27) {
			closeGate();
			return;
		}
		if (e.keyCode === 13 && $(".login-no-password").css("display") !== "none") {
			showLoginInput();
			return;
		}
		if (e.keyCode === 13 && $(".login").css("display") !== "none") {
			check();
			return;
		}
	});
	$("body").on("mouseout click", function () {
		hibernate.init();
	});
	$(".login-button").click(function(){
		check();
	});
	$(".gate").click(function(){
		openGate();
	});
	$(".login-no-password>p>button").click(function () {
		showLoginInput();
	});
	$(".login-input").blur(function () {
		if ($(".login").css("display") === "block") {
			$(".login-input").focus();
		}
	});
	showTime();
});