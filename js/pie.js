let starterUrl = "http://localhost:5000/Adoption/1.0.2/animals?";

let selected = "%" ;
let aniSelector = d3.select("div.dropdown-menu")
  .selectAll("a")
  .on("click", function(event){
    console.log(d3.select(this).attr("value"));
    selected =d3.select(this).attr("value");
    updatePie();
  })

function updatePie() {

  let searchUrl = starterUrl + "type=" + selected;

  d3.json(searchUrl, function(response) {
    console.log(response);

    let maleCount = 0;
    let femaleCount = 0;
    let unknownCount = 0;

    for (var i = 0; i < response.length; i++) {
      if (response[i].gender == "Male") {
        maleCount++
      } else if (response[i].gender == "Female") {
        femaleCount++
      } else {
        unknownCount++
      };
    };
    console.log(maleCount);
    console.log(femaleCount);
    console.log(unknownCount);

    let pieData = [{
      values: [maleCount, femaleCount, unknownCount],
      labels: ["Male", "Female","Unknown"],
      type: "pie"
    }];

    let pieLayout = {
      height: 400,
      width: 500,
      title: "Gender Breakdown"
    };

    Plotly.newPlot("pie", pieData, pieLayout);
  })
};

updatePie();
