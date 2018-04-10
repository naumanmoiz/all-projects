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

      console.log(data);
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

    $('#result').html(lang);
      /*
      console.log("Vo" + data.Vo);
      $('#Vo').text(data.Vo);
      $('#deltaIL').text(data.deltaIL);
      $('#Io').text(data.Io);
      $('#P').text(data.P);
    var content = $( data ).find( "#content" );
    $( "#result" ).empty().append( content );*/
  });



    // https://stackoverflow.com/questions/17365039/how-to-send-json-data-from-node-js-to-html-page

/*    $.getJSON("/BC1", cdata, function (cdata,status) {
        //We use JQuery to update the text inside of the field with id=result with the sum.
        console.log(status + " " + cdata);
        $('#Vo').text(cdata.Vo);
        $('#deltaIL').text(cdata.deltaIL);
        $('#Io').text(cdata.Io);
        $('#P').text(cdata.P);
    }
  ); */
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
  var posting = $.post("/BC2", cdata);


    // URL = document.URL;
    // GraphURL = "BuckConverterGraphData"
    // URL = URL.replace("home.html", "") + GraphURL;
    //
    // URL = URL + "?Vin=" + $('#Vin').val() + "&D=" + $('#D').val() + "&L=" + $('#L').val() + "&C=" + $('#C').val() + "&R=" + $('#R').val()
    //       + "&r1=" + $('#r1').val() + "&F=" + $('#F').val();
    //
    // $.getJSON(URL, function (data1) {
    //     var j,i;
    //     //We use JQuery to update the text inside of the field with id=result with the sum.
    //     //  for (i in data1) {
    //     //     j += "<h3>" + i + data1[i]+ "</h3>";
    //     // }
    //     //$('#graphData').text(data1);
    //
    //     google.charts.load('current', {packages: ['corechart']});
    //     google.charts.setOnLoadCallback(drawChart);
    //
    //     function drawChart() {
    //         // Define the chart to be drawn.
    //         var data = new google.visualization.DataTable();
    //         data.addColumn('string', 'Name');
    //         data.addColumn('number', 'Values');
    //         var i;
    //         //values = $('#graphData').text.data1
    //
    //         for (i in data1) {
    //             data.addRows([[, data1[i]]]);
    //         }
    //         //j = "<h3>" + values + "</h3>";
    //        // document.getElementById('cid').innerHTML = j;
    //
    //         //ate and draw the chart.
    //         var chart = new google.visualization.LineChart(document.getElementById('myLineChart'));
    //         chart.draw(data, null);
    //     }
    //
    //
    // }
    // );
}
