
 // set the dimensions and margins of the graph
 var margin = {top: 10, right: 0, bottom: 30, left: 400},
 width = 900 - margin.left - margin.right,
 height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#chart-area")
.append("svg")
 .attr("width", width + margin.left + margin.right)
 .attr("height", height + margin.top + margin.bottom)
.append("g")
.attr('transform', `translate(${margin.left}, ${margin.top})`);

//Read the data

// var dataset = d3.csv("file.csv", function(data){
//data.forEach(function(d){ d['columnName'] = +d['columnName']; });      
//   console.log(data);     
// });

d3.csv("../data/polution.csv"). then( data=> {
 //data.forEach(d => d['year'] = +d['year']);
  
  console.log()
 var Countries = d3.map(data, d=>d.name).keys()
 
 // add the options to the button
 d3.select("#selectButton")
   .selectAll('myOptions')
      .data(Countries)
   .enter()
     .append('option')
   .text( d => d) // text showed in the menu
   .attr("value", d=> d ) // corresponding value returned by the drop down button button

 

 var myColor = d3.scaleOrdinal()
   .domain(Countries)
   .range(d3.schemeSet2);

   var xAxisGroup = svg.append("g")
   .attr("transform", `translate(0, ${height})`)
   
   var yAxisGroup = svg.append("g");
   svg.append("text")
   .attr("class", "y axis-label")
   .attr("x", - (height / 2))
   .attr("y", -90)
   .attr("font-weight", "bold")
   .attr("font-size", "20px")
   .attr("text-anchor", "middle")
   .attr("transform", "rotate(-90)")
   .text("metric tones per capita");


 // Add X axis --> it is a date format
 var x = d3.scaleLinear()
   .domain(d3.extent(data, d => d.year))
   .range([ 0, width ]);
   

  var y = d3.scaleLinear()
  .domain([0, d3.max(data, d => +d.emission )])
  .range([ height, 0 ]);

  var xAxis = d3.axisBottom(x)
  .ticks(6)
  
  var yAxis = d3.axisLeft(y)
  .tickFormat(d => d+ ' metric tons');
  

 
 var line = svg
   .append('g')
   .append("path")
     .datum(data.filter(d =>d.name==Countries[0]))
     .attr("d", d3.line()
       .x(d=> x(d.year))
       .y(d=> y(+d.emission))
     )
     .attr("stroke", d=> myColor("valueA"))
     .style("stroke-width", 4)
     .style("fill", "none")
   
 // When the button is changed, run the updateChart function
 d3.select("#selectButton").on("change", function(d) {
     // recover the option that has been chosen
     var selectedOption = d3.select(this).property("value")
     // run the updateChart function with this selected option
     update(selectedOption)
     console.log(selectedOption)
  })
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

 function update(selectedGroup) {
 
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

  var dataFilter = data.filter(d=> d.name==selectedGroup)
  y.domain([0, d3.max(dataFilter, d => +d.emission)])
  x.domain(d3.extent(dataFilter, d => +d.year))
  // Give these new data to update line
  line
      .datum(dataFilter)
      .transition()
      .duration(1000)
      .attr("d", d3.line()
        .x(d=> x(d.year) )
        .y(d=> y(+ d.emission) )
      )
      .attr("stroke", d => myColor(selectedGroup))     
}
})

