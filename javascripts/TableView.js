var TableView = function(divID, onCellSelectCallback) {

	var table = document.createElement('TABLE');
	table.border = '1';
	table.style.borderCollapse = "collapse";
        table.addEventListener("onselectstart", function(e){if(e.preventDefault){e.preventDefault}return false;});
        table.addEventListener("ondragstart", function(e){if(e.preventDefault){e.preventDefault}return false;});

	var tableBody = document.createElement('TBODY');
	table.appendChild(tableBody);

	var tableDiv = document.getElementById(divID);
	tableDiv.appendChild(table);
	
	this.addRow = function(text) {

		var tableRow = document.createElement('TR');
		tableRow.onclick = function() {

			for (var i=0; i < table.rows.length; ++i){

				var row = table.rows[i];
				if (row === tableRow) {
					
					onCellSelectCallback(tableRow, i);
				}

				row.style.backgroundColor='#FFFFFF'
			}

			tableRow.style.backgroundColor='#AAAAAA';
		};

		tableBody.appendChild(tableRow);
		var tableCell = document.createElement('TD');
		tableCell.width = '75';

		var cellText = document.createTextNode(text);

		tableCell.appendChild(cellText);
		tableRow.appendChild(tableCell);
	};

};
