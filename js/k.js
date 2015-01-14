var keyarray = [];
document.addEventListener('keydown', function (event) {
	//console.log(event.keyCode);
	keyarray[keyarray.length] = event.keyCode;
	//console.log(keyarray);
	if (keyarray.length>10) {
		for (var y = 0; y < keyarray.length - 1; y++) {
			keyarray[y] = keyarray[y+1];
		}
		keyarray.splice(10, 1);
	}

	if (keyarray.length == 10) {
		for (var z = 0; z < 10; z++) {
			if(keyarray[z] != [38,38,40,40,37,39,37,39,66,65][z]) {
				return false;
			}
		}
		konami('regular');
	}
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
					buttonarray[buttonarray.length] = button; 
				}, 50);
			}
		}
		if (buttonarray.length>10) {
			for (var y = 0; y < buttonarray.length - 1; y++) {
				buttonarray[y] = buttonarray[y+1];
			}
			buttonarray.splice(10, 1);
			//console.log('button array is now: '+buttonarray);
		}

		if (buttonarray.length == 10) {
			for (var z = 0; z < 10; z++) {
				if (buttonarray[z] != [12,12,13,13,14,15,14,15,1,0][z]) {
					break;
				} else if (z < 9) {
					continue;
				} else {
					konami('gamepad');
				}
			}
		}
	//}
}
window.requestAnimationFrame(gamepadAnimation);