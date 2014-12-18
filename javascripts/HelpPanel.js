define('HelpPanel', [], function() {

	function HelpPanel() {

		var editorPanelDiv = document.getElementById("EditorPanel");
		var csdEditorButtonDiv = document.getElementById("CSDEditorButton");
		var consolePanelDiv = document.getElementById("ConsolePanel");
		var filePanelDiv = document.getElementById("FilePanel");
		var inputPanelDiv = document.getElementById("InputPanel");
		var helpTextDiv = document.getElementById("helpText");

		var helpText = "Mouse over each panel for help";
		helpTextDiv.innerHTML = helpText;
		var stack = [];
		function registerHelpText(element, elementText) {

			element.onmouseenter = function(e) {

				stack.push(elementText);
				helpTextDiv.innerHTML = stack[stack.length - 1];
			}

			element.onmouseleave = function(e) {
				stack.pop();
				helpTextDiv.innerHTML = stack[stack.length - 1];
			}
		}

		registerHelpText(editorPanelDiv, "<h4>Editor Panel</h4>When the CSD Editor Button is pressed ");
		registerHelpText(csdEditorButtonDiv, "<h4>CSD Editor Button</h4>When the CSD Editor Button is pressed ");
		registerHelpText(consolePanelDiv, "Console");
		registerHelpText(filePanelDiv, "File");
		registerHelpText(inputPanelDiv, "Input");
	};

	return HelpPanel;
});
