
const margin = { left:300, right:10, top:80, bottom:150 };

const width = 800 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;


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
        .range([0,width])
        .paddingInner(0.2)
        .paddingOuter(0.2);
        
        var xAxisCall = d3.axisBottom(x);
        g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0, " + height + ")")
            .call(xAxisCall)
        .selectAll("text")
            .attr("y", "-4")
            .attr("x", "-7")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("font-size", "10px")
            .attr("font-weight", "bold");

       
    
        var yAxisCall = d3.axisLeft(y)
            .ticks(3)
            .tickFormat(function(d){
                return d ;
            });
        g.append("g")
            .attr("class", "y-axis")
            .attr("font-weight", "bold")
            .call(yAxisCall);

    const rects = g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
            .attr("y", function(d){ return y(d.emission); })
            .attr("x", function(d){ return x(d.name); })
            .attr("width", x.bandwidth)
            .attr("height", function(d){ return height-y(d.emission); })
            .attr("fill", "y#B55FD4");

})
  
     // X Label
g.append("text")
     .attr("class", "x axis-label")
     .attr("x", width / 2)
     .attr("y", height + 90)
     .attr("font-size", "20px")
     .attr("font-weight", "bold")
    .attr("font-family", "Times New Roman")
     .attr("text-anchor", "middle")
     .text("The word's largest polluters");

 // Y Label
 g.append("text")
     .attr("class", "y axis-label")
     .attr("x", - (height / 2))
     .attr("y", -30)
     .attr("font-weight", "bold")
     .attr("font-size", "20px")
     .attr("text-anchor", "middle")
     .attr("transform", "rotate(-90)")
     .text("metric tones per capita");
 
// d3 min function
    // const min = d3.max(data, function(d){
    //     return d.emission;
    // })
    // console.log(min)
    
    
   