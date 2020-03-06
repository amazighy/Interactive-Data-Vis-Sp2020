
const margin = { left:300, right:0, top:0, bottom:0 };

const width = 500 - margin.left - margin.right,
      height = 460 - margin.top - margin.bottom;

var income_domain = [0, 10000, 50000, 70000, 80000, 150000, 290000, 360000]
var income_color = d3.scaleThreshold()
    .domain(income_domain)
    .range(d3.schemeGreys[7]);

var incomeData = d3.map();

d3.queue()
    .defer(d3.json, "../data/TopoNY.json")
    .defer(d3.csv, "../data/Income.csv", function(d) { 
        if (isNaN(d.income)) {
            incomeData.set(d.id, 0); 
        } else {
            incomeData.set(d.id, +d.income); 
        }   
    }).await(ready);
  
function ready(error, data) {
    if (error) throw error;

    var new_york = topojson.feature(data, {
        type: "GeometryCollection",
        geometries: data.objects.ny.geometries
});

var projection = d3.geoAlbersUsa()
    .fitExtent([[20, 20], [460, 580]], new_york);;

var geoPath = d3.geoPath()
    .projection(projection);

var svg= d3.select("#chart-area")
.append("svg")
.attr("width", width+margin.right+margin.left)
.attr("height",height+margin.top+margin.bottom)
.attr('transform', `translate(${margin.left}, ${margin.top})`);

    svg.selectAll("path")
        .data(new_york.features)
        .enter()
        .append("path")
        .attr("d", geoPath)
        .attr("fill", "white")
        .transition().duration(1000)
        .ease(d3.easeLinear)
        .attr("fill", function(d) { 
            var value = incomeData.get(d.properties.GEOID);
            return (value != 0 ? income_color(value) : "grey");  

        })
        .attr("class", "counties-income");
}

