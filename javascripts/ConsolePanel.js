define('ConsolePanel', ["ace/ace"], function(ace) {

	function ConsolePanel() {

		var that = this;

		var parentDiv = document.getElementById("ConsoleSection");
		var consoleDiv = document.createElement("div");
		parentDiv.appendChild(consoleDiv);
		consoleDiv.id = "console";
		var editor = ace.edit(consoleDiv);
		editor.setTheme("ace/theme/monokai");
		editor.getSession().setMode("ace/mode/text");
		editor.setReadOnly(true);
		editor.setShowPrintMargin(false); 
		editor.renderer.setShowGutter(false);
		editor.setHighlightActiveLine(false);
		//editor.$blockScrolling = Infinity;
		editor.renderer.$cursorLayer.element.style.opacity = 0;

		var clearConsoleButton = document.getElementById("ClearConsoleButton");

		this.print = function(text) {

			text = editor.getValue() + "\n" + text;
			editor.setValue(text, 1); 
		}
		clearConsoleButton.onclick = function() {

			editor.setValue("");
		}
	};

	return ConsolePanel;
});
