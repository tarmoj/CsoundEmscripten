define('FilePanel', ["libcsound"], function() {

	function FilePanel(fileManager, listOnClickFunction) {

		var that = this;
		var listElement = document.getElementById('FileList');
		var fileButtonElement = document.getElementById('FileButton');
		var fileListObject = new FileList("/");
		var selectedFileName = null;
		this.fileLinks = null;

		var onClickFunction = function() {

			listOnClickFunction(this);

			for (var i = 0; i < that.fileLinks.length; ++i) {

				if (this === that.fileLinks[i]) {

					selectedFileName = that.fileLinks[i].fileName;
					that.populateList();
				}
			}
		}


		this.fileNameDiv = document.createElement('div');
		this.fileNameDiv.id = "FileNames";
		this.populateList = function() {

			that.fileNameDiv.innerHTML = "";
			var fileList = fileListObject.getFileList();
			that.fileLinks = [];
			for (var i = 0; i < fileList.length; ++i) {

				var fileExtension = fileList[i].split('.').pop();

				var link = document.createElement('a');
				link.innerHTML = fileList[i];
				link.fileName = fileList[i];
				link.fileExtension = fileExtension;

				if (link.fileName.localeCompare(selectedFileName) === 0) {


					link.className = "list-group-item active";
				}
				else {

					link.className = "list-group-item";
				}
				link.onclick = onClickFunction;
				that.fileNameDiv.appendChild(link);
				that.fileLinks.push(link);
			}

			listElement.appendChild(that.fileNameDiv);
		};



		function handleFileSelect(e) {


			fileManager.fileUploadFromClient(e.target.files[0], that.populateList);
		}

		fileButtonElement.addEventListener('change', handleFileSelect, false);



		var filePanelDiv = document.getElementById('FilePanel');
		filePanelDiv.ondragover = function(e) {

			this.className = 'panel panel-warning';
			e.dataTransfer.dropAllowed = 'copy'
			e.dataTransfer.dropEffect = 'copy'
			e.preventDefault();	
		};	
		filePanelDiv.ondragend = function(e)	{

			this.className = 'panel panel-primary';
			e.preventDefault();	
		};	

		filePanelDiv.ondragleave = function(e)	{

			this.className = 'panel panel-primary';
			e.preventDefault();	
		};	

		filePanelDiv.ondrop = function (e) {
			this.className = 'panel panel-primary';
			e.preventDefault();
			fileManager.fileUploadFromClient(e.dataTransfer.files[0], that.populateList);
		};
	};

	return FilePanel;

});	
