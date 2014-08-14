(function() {



	var checks = document.querySelectorAll('input[type="radio"'),
		femaleConn = new Connect('GET', 'data/ontariotopbabynames_female_1917-2010_english.csv'),
		maleConn = new Connect('GET', 'data/ontariotopbabynames_male_1917-2010_english.csv'),
		femaleNames = csv.generate(femaleConn.respond()),
		maleNames = csv.generate(maleConn.respond()),
		data = {
			labels : [],
			datasets : [
				{
					fillColor : "rgba(155, 89, 182,0.5)",
					//fillColor : "rgba(151,187,205,0.5)",
					strokeColor : "rgba(142, 68, 173,1.0)",
					//strokeColor : "rgba(151,187,205,1)",
					data : []
				}
			]
		};

	function Connect(method, location, callback){

		var request = new XMLHttpRequest(),
			response;

		request.open(method, location, false);
		request.send();

		if (request.status === 200) {

			response = request.responseText;

		}

		return {

			respond: function() {

				return response;

			}

		};

	}

	function getName(name){

		name = name.toUpperCase();
		var tmpArr = [];
		var names;

		if (document.getElementById('radioCheck').checked) {

			names = femaleNames;

		} else {

			names = maleNames;

		}

		if (names.hasOwnProperty(name)){
			data.labels = [];

			for (var i = 0; i < names[name].length; i++) {
			//if (i%2 === 0){
				data.labels.push(names[name][i].year);
				tmpArr.push(names[name][i].occurrence);
			//}

			}
		}

		data.datasets[0].data = tmpArr;

	}

	function handleClick(e) {


		for (var s = 0; s < checks.length; s++) {

			checks[s].parentNode.classList.remove('active');

		}

		e.target.parentNode.classList.toggle('active');


	}

	function setupRadio() {

		for (var s = 0; s < checks.length; s++) {

			if (checks[s].checked) {

				checks[s].parentNode.classList.add('active');

			}
			checks[s].parentNode.setAttribute('data-label', checks[s].value);
			checks[s].addEventListener('click', handleClick);

		}

	}

	function chartSize(chart, w, h) {

		chart.width = w;//window.innerWidth;
		chart.height = h;

	}

	function init() {

		var chart = document.getElementById('myChart');

		setupRadio();

		chartSize(chart, chart.parentNode.offsetWidth, window.innerHeight/1.5);

		document.getElementById('namesearch').addEventListener('submit', function(e) {
			//check if > 0 searches, add last search as 2nd dataset for comparison

			var name = document.getElementById('thisName');

			e.preventDefault();

			getName(name.value);


			new Chart(document.getElementById('myChart').getContext('2d')).Line(data);

		}, false);


	}

	init();


})();
