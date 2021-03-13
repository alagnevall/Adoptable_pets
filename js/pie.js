// Part 1
var trace1 = {
    x: ["female", "male", "unknown"],
    y: [341, 432, 27],
    type: "pie"
  };
  
  var data = [trace1];
  
  var layout = {
    title: "'Gender' Chart"
  };
  
  Plotly.newPlot("pie", data, layout)