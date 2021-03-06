$(function() {
	$('#stripe-2').hide();
	$('#stripe-3').hide();
	
	// some parameters for data retrieval
	var country = null;
	var what_data = "AG.LND.FRST.ZS";
	var year_from = "1990";
	var year_to = "2013";
	var rows_per_page = 20;

	$("#country_list").html(country);
	
	function display_data(json) {

		// Clean normal table of previous results
		$('#data_table tbody').html('');
		
		// Set up data for Google table
    var gData = new google.visualization.DataTable();
    gData.addColumn('string', 'Date');
    gData.addColumn('number', 'Value');

		// Loop once, populate both tables
		json[1].forEach(function(item) {

			// Populate normal table
			$('<tr><td>'+item.date+'</td><td>'+item.value+'</td></tr>').hide().appendTo('#data_table tbody').show('slow');
			
			// Populate Google table
			gData.addRows([
				[item.date, Math.round(parseFloat(item.value)*100)/100]
			]);
		})

		function drawGoogleTable() {
			var gTable = new google.visualization.Table(document.getElementById('data_chart'));
			gTable.draw(gData);
			
			// Set the width of the chart
			var title1 = "Date";
			var title2 = "Value";
			var width = "250px";
			$('.google-visualization-table-th:contains(' + title1 + ')').css('width', width);
			$('.google-visualization-table-th:contains(' + title2 + ')').css('width', width);
		}
		drawGoogleTable();

		// Draw Google Charts
		function drawGoogleChart() {

      var options = {
      	title: 'Forest Area',
      	backgroundColor: { fill:'transparent' },
        width: 400,
        height: 500,
        colors: ['#00CC00'],
        legend: {
        	position: 'none'
        }
      };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
      chart.draw(gData, options);
    }
    drawGoogleChart();
	}

	function get_data(){

		$("#data_status").html("Fetching data...");
		country = $('#country-select').val();

		// Where to retrieve the data from
		var url = "http://api.worldbank.org/countries/"+country+"/indicators/"+what_data+"?per_page="+rows_per_page+"&date="+year_from+":"+year_to+"&format=jsonP";
		$.ajax({
		  url: url,
		  type: "GET",
		  dataType: "jsonp", 
		  jsonp: "prefix",
		  jsonpCallback: "display_data",
		  cache: false,
		  
		  success: function(data, status, jqXHR) {

		  	$("#data_status").html('');

		  	// Display the table container
		  	display_data(data);
		  	$('#stripe-2').show();
		  	$('#stripe-3').show();

		  }, error: function(){
		  	$("#data_status").html("problems retrieving data");
		  }
		});
	}
	
	$("#btn_get_data").bind("click", get_data);

});