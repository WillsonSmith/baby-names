var csv = (function(){

	'use strict';

	function CSVReader(separators) {

	    this.separators = separators || [","];

	    this.regexp =
	        new RegExp(this.separators.map(function(sep) {
	            return "\\" + sep[0];
	        }).join("|"));
	}

	CSVReader.prototype.read = function(str) {

	    var lines = str.trim().split(/\n/);

	    return lines.map(function(line) {

	        return line.split(this.regexp);

	    }.bind(this));
	};

	CSVReader.prototype.generateJSON = function(data) {

		var nameObject = {},
		tmpObj,
		dateObj,
		nameObj;

		for (var i = 0, l = data.length; i < l; i++) {

			dateObj = data[i][1];


			tmpObj = {};

			if (dateObj === dateObj){ //handles NaN - more for checking years
			
				if (!nameObject.hasOwnProperty(dateObj)) {

					nameObject[dateObj] = [];

				}

				tmpObj.year = data[i][0];
				tmpObj.occurrence = parseInt(data[i][2], 10);

				nameObject[dateObj].push(tmpObj);

			}

		}

		return nameObject;

	};

	var reader = new CSVReader();

		return {

			generate: function(data) {

				data = reader.read(data);

				return reader.generateJSON(data);

			}

		};


})();