require.config({
	shim : {
		"bootstrap" : { "deps" :['jquery']  },
		"libcsound":"libcsound"

	},
	paths: {
		ace: "ace",
		"jquery" : "jquery",
		"bootstrap" :  "bootstrap.min" ,
		"libcsound":"libcsound"	
	}
});

require(["jquery", "bootstrap", "libcsound", "InputPanel", "ConsolePanel", "FileManager", "FilePanel", "HelpPanel", "EditorPanel"], main);


function main() {

	var ConsolePanel = require('ConsolePanel');
	var HelpPanel = require('HelpPanel');
	var EditorPanel = require('EditorPanel');
	var FilePanel = require('FilePanel');
	var InputPanel = require('InputPanel');
	Module['noExitRuntime'] = true;

	Module['_main'] = function() {

		var consolePanel = new ConsolePanel();
		consolePanel.print("Welcome to Csound Emscripten!");

		Module['print'] = Module['printErr'] = consolePanel.print 
		const csound = new CsoundObj();

		var inputPanel = new InputPanel(csound);
		var allowedFileExtensions = ["csd", "wav", "orc"];
		const fileManager = new FileManager(allowedFileExtensions, Module["print"]);

		var editorPanel = new EditorPanel(csound, fileManager);
		var filePanel = new FilePanel(fileManager, editorPanel.onClickFunction);
		var fileUploadedCallback = function() {

			filePanel.populateList();
		};

		fileManager.fileUploadFromServer("controlInputTest.csd", fileUploadedCallback);
		fileManager.fileUploadFromServer("test.orc", fileUploadedCallback);
		fileManager.fileUploadFromServer("audioInputTest.csd", fileUploadedCallback);
		fileManager.fileUploadFromServer("Boulanger-Trapped_in_Convert.csd", fileUploadedCallback);
		
		fileUploadedCallback = function() {

			filePanel.populateList();
			filePanel.fileLinks[0].click();
		};

		fileManager.fileUploadFromServer("midiInputTest.csd", fileUploadedCallback);


		var helpPanel = new HelpPanel(editorPanel.orcEditorDiv, editorPanel.scoEditorDiv, filePanel.fileNameDiv);
	};
};

