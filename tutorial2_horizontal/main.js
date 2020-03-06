
const margin = { left:250, right:10, top:5, bottom:150 };

const width = 700 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;


// setting the canvas properties
var svg= d3.select("#chart-area")
    .append("svg")
    .attr("width", width+margin.right+margin.left)
    .attr("height",height+margin.top+margin.bottom)

const g = svg.append("g")
    .attr("transform", "translate(" + margin.left 
    + ", " + margin.top + ")");


d3.json("../data/pollution.json").then(function(data){
    
    data.forEach(function(d){
        d.emission=+d.emission
    });
    //scaleLinear() scales attributes on the Y-axis 
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d){//automatically setting the max domain 
            return d.emission
        })])
        .range([height,0])

    const x= d3.scaleBand()
        .domain(data.map(function(d){//mapping the name attribute from our data set
            return d.name;
        }))
        .range([0,height])
        .paddingInner(0.4)
        .paddingOuter(0.2);
        
      
        var xAxisCall = d3.axisBottom(y);
        g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0, " + height + ")")
            .call(xAxisCall);
            
        var yAxisCall = d3.axisLeft(x)
            .ticks(3)
            .tickFormat(function(d){ return d ;});
        g.append("g")
            .attr("class", "y-axis")
            .call(yAxisCall);

    const rects = g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
            .attr("y", function(d){ return y(d.emission); })
            .attr("y", function(d){ return x(d.name); })
            .attr("height", x.bandwidth)
            .attr("width", function(d){ return height-y(d.emission); })
            .attr("fill", "y#B55FD4");

})
  
     // X Label
g.append("text")
     .attr("class", "x axis-label")
     .attr("x", width / 2)
     .attr("y", height + 50)
     .attr("font-size", "20px")
     .attr("font-weight", "bold")
    .attr("font-family", "Times New Roman")
     .attr("text-anchor", "middle")
     .text("Metric Tones Per Capita");
     
     
    //  &nbsp &nbsp &nbsp &nbsp  Souorce: World Bank

 
 
// d3 min function
    // const min = d3.max(data, function(d){
    //     return d.emission;
    // })
    // console.log(min)
    // triples equal sign id the most secure
    
    
   