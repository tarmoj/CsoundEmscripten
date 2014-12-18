define('InputPanel', [], function() {

	function InputPanel(csound) {

		var controlSlider = document.getElementById("ControlSlider");
		var controlSliderValue = document.getElementById("ControlSliderValue");
		var controlName = document.getElementById("ControlName");
		var audioInputButton = document.getElementById("AudioInputButton");
		var midiInputButton = document.getElementById("MidiInputButton");

		controlSlider.oninput = function() {

			controlSliderValue.value = controlSlider.value;
			csound.setControlChannel(controlName.value, controlSlider.value);
		};

		audioInputButton.onchange = function() {

			if (audioInputButton.checked === false) {

				csound.disableAudioInput();
				return;
			}

			var audioInputCallback = function(status) {

				if (status === true) {

					audioInputButton.checked = true;
				}
				else {

					audioInputButton.checked = false;
				}
			};

			csound.enableAudioInput(audioInputCallback);
		};

		midiInputButton.onchange = function() {

			var midiInputCallback = function(status) {

				if (status === true) {

					midiInputButton.checked = true;
				}
				else {

					midiInputButton.checked = false;
				}
			};

			csound.enableMidiInput(midiInputCallback);
		};
	}


	return InputPanel;


});
