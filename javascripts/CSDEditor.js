define('CSDEditor', ["ace/ace"], function(ace) {
	function CSDEditor(editorParentDiv) {

		var that = this;
		this.csdEditorDiv = document.createElement("div");
		this.csdEditorDiv.id = "CSDEditor";
		this.editor = ace.edit(this.csdEditorDiv);
		this.editor.setTheme("ace/theme/github");
		this.editor.getSession().setMode("ace/mode/javascript");
		this.editor.setShowPrintMargin(false);
		this.editor.setOption("highlightActiveLine", false);
		this.editor.$blockScrolling = Infinity;
		this.currentFilePath = "";
		this.replaceParentDiv = function () {

			editorParentDiv.innerHTML = "";
			editorParentDiv.appendChild(that.csdEditorDiv);
		};
	};

	return CSDEditor
});
