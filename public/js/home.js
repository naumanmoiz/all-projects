/**

File: addTwoWithSubmit.html

Author: Tanner Blair - National Instruments

Project: Web Services Example 1 - Add Two With Submit

Date: 01/15/2015

Description: This file is the JavaScript file that accompanies

addTwoWithSubmit.js. This file is analogous to the controller element

of a traditional Model, View, Controller application architecture.

 */

//Disable async to allow for sequential behavior

async: false;

//Execute the following code once page is fully loaded

$(document).ready(function(){
	$( "#submitButton" ).click(update);
	$("#submitGraph").click(graph);
}
)


//update gets the data from the URL

function update(){
	console.log("hello in update method from homejs")
	//URL = document.URL;
	//FastResponseURL = "BC1";
	//URL = URL.replace("BC1.html", "") + FastResponseURL;
	//URL = URL + "?Vin=" + $('#Vin').val() + "&D=" + $('#D').val() + "&L=" + $('#L').val() + "&C=" + $('#C').val() + "&R=" + $('#R').val()
	//    + "&r1=" + $('#r1').val() + "&F=" + $('#F').val();
	cdata = {
		"Vin"  : $('#Vin').val(),
		"Du"   : $('#Du').val(),
		"Lu"   : $('#Lu').val(),
		"Cu"   : $('#Cu').val(),
		"Ru"   : $('#Ru').val(),
		"r1"   : $('#r1').val(),
		"Fu"   : $('#Fu').val()
	};
	var posting = $.post("/BC1", cdata);
	posting.done(function( data ) {

		console.log("posting data"+data);
		var lang = '';		
		var obj = $.parseJSON(data);
		for(var i in obj){
			console.log(obj[i]);
		}
	 console.log("Time" + obj['Time']);
		console.log("Outputs Data" + obj['Outputs Data']);
		var ydata = obj['Outputs Data'];
		var xdata = obj['Time']
		console.log(xdata[5] + "yes!");

		$.each(obj, function() {

			$('#Vo').text(this['Vo']);
			$('#deltaIL').text(this['deltaIL']);
			$('#Io').text(this['Io']);
			$('#P').text(this['P']);

		});

		$('#result').html(lang);
		
		google.charts.load('current', {packages: ['corechart']});
		google.charts.setOnLoadCallback(drawChart);


		function drawChart() {
			// Define the chart to be drawn.
			var data = new google.visualization.DataTable();
			data.addColumn('number', 'Name');
			data.addColumn('number', 'Values');
			var i,j;
			for (i in xdata) { 
				for(j in ydata){
					console.log(xdata[i] +' '+ ydata[j][i]);
					data.addRows([[parseFloat(xdata[i]),parseFloat(ydata[j][i])]]);
				}
				
			}

			var options = {'title':'Voltage vs time graph', 'width':800, 'height':600};

			
			var chart = new google.visualization.LineChart(document.getElementById('graphData'));
			chart.draw(data, options);
		}

	});


}


function graph() {
	cdata = {
			"Vin"  : $('#Vin').val(),
			"Du"   : $('#Du').val(),
			"Lu"   : $('#Lu').val(),
			"Cu"   : $('#Cu').val(),
			"Ru"   : $('#Ru').val(),
			"r1"   : $('#r1').val(),
			"Fu"   : $('#Fu').val()
	};
	var posting = $.post("/BC1", cdata);

	posting.done(function( data ) {

		console.log("posting data"+data);
		var lang = '';
		var jsoninput = '[' + data + ']';

		var obj = $.parseJSON(jsoninput);

		$.each(obj, function() {

			//  lang += this['Vo'] + "<br/>";
			$('#Vo').text(this['Vo']);
			$('#deltaIL').text(this['deltaIL']);
			$('#Io').text(this['Io']);
			$('#P').text(this['P']);

		});

		$('#graphresult').html(lang);

	});
}
