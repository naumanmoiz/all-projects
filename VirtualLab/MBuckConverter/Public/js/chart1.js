

var json = [{ "company_name": "project A", "present_worth": "81531.946062978" }, { "company_name": "project B", "present_worth": "67313.916593765" }, { "company_name": "project c", "present_worth": "92440.723376746"}];

var chartjsData = [];
for (var i = 0; i < json.length; i++) {
    chartjsData.push(json[i].present_worth);
}

var barChartData = {
    labels: ["January", "February", "March"], datasets: [
                {
                    fillColor: "rgba(220,280,220,0.5)",
                    strokeColor: "rgba(220,220,220,1)",
                    data: chartjsData

                }
            ]
};
var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Bar(barChartData);