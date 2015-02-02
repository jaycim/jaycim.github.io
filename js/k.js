var keyarray = [];
document.addEventListener('keydown', function (event) {
	//console.log(event.keyCode);
	keyarray.unshift(event.keyCode);
	//console.log(keyarray);
	if (keyarray.length>10) {
		keyarray.pop();
	}

	for (var z = 0; z < 10; z++) {
		if(keyarray[z] != [65,66,39,37,39,37,40,40,38,38][z]) {
			return false;
		}
	}
	konami('regular');
});

/*document.addEventListener('gamepadconnected', function(e) {
	gpconnect();
});*/

var pressed;
var buttonarray = [];
var button;
function gamepadAnimation() {
	window.requestAnimationFrame(gamepadAnimation);
	if (navigator.getGamepads()[0] == null) {
		return;
	}

	var gamepads = navigator.getGamepads();

	//for (var x = 0; x < gamepads.length; x++) {
		//var gp = gamepads[x];
		var gp = gamepads[0];

		for (var b = 0; b < gp.buttons.length; b++) {
			if (gp.buttons[b].pressed) {
				window.clearTimeout(pressed);
				button = b;
				//console.log('Detected button press: '+b);
				pressed = window.setTimeout(function() {
					//console.log('Button press '+button+' added to buttonarray');
					buttonarray.unshift(button);
					if (buttonarray.length>10) {
						buttonarray.pop();
						//console.log('button array is now: '+buttonarray);
					}

					for (var z = 0; z < 10; z++) {
						if (buttonarray[z] != [0,1,15,14,15,14,13,13,12,12][z]) {
							break;
						} else {
							konami('gamepad');
						}
					}
				}, 50);
			}
		}
	//}
}
window.requestAnimationFrame(gamepadAnimation);