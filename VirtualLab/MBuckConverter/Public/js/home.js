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
    URL = document.URL;
    FastResponseURL = "BuckConverterWeb";
    URL = URL.replace("home.html", "") + FastResponseURL;

    URL = URL + "?Vin=" + $('#Vin').val() + "&D=" + $('#D').val() + "&L=" + $('#L').val() + "&C=" + $('#C').val() + "&R=" + $('#R').val()
          + "&r1=" + $('#r1').val() + "&F=" + $('#F').val();

    $.getJSON(URL, function (data) {
        //We use JQuery to update the text inside of the field with id=result with the sum.
        $('#Vo').text(data.Vo);
        $('#deltaIL').text(data.deltaIL);
        $('#Io').text(data.Io);
        $('#P').text(data.P);
    }
    );
}


function graph() {
    URL = document.URL;
    GraphURL = "BuckConverterGraphData"
    URL = URL.replace("home.html", "") + GraphURL;

    URL = URL + "?Vin=" + $('#Vin').val() + "&D=" + $('#D').val() + "&L=" + $('#L').val() + "&C=" + $('#C').val() + "&R=" + $('#R').val()
          + "&r1=" + $('#r1').val() + "&F=" + $('#F').val();

    $.getJSON(URL, function (data1) {
        var j,i;
        //We use JQuery to update the text inside of the field with id=result with the sum.
      //  for (i in data1) {
       //     j += "<h3>" + i + data1[i]+ "</h3>";
       // }
        //$('#graphData').text(data1);

        google.charts.load('current', {packages: ['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            // Define the chart to be drawn.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Name');
            data.addColumn('number', 'Values');
            var i;
            //values = $('#graphData').text.data1

            for (i in data1) {
                data.addRows([[, data1[i]]]);
            }
            //j = "<h3>" + values + "</h3>";
           // document.getElementById('cid').innerHTML = j;

            //ate and draw the chart.
            var chart = new google.visualization.LineChart(document.getElementById('myLineChart'));
            chart.draw(data, null);
        }


    }
    );
}