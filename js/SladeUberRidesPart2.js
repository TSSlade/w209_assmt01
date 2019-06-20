
// Generating standard variables to manage
// the size of our space

var screenWidth = 800,
    screenHeight = 600,
    margin = {"top":  0.025 * screenHeight, "bottom": 0.025 * screenHeight,
              "left": 0.025 * screenWidth,   "right": 0.025 * screenWidth},
    canvasWidth = screenWidth - margin.left - margin.right, // 800 - 80 - 80 = 640
    canvasHeight = screenHeight - margin.top - margin.bottom;

var weekdays = ["Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"];

// var parseTime = d3.timeParse("Jan 1 1970 %I:%M:%S %p");
var parseTimestamp = d3.timeParse("%Y-%m-%Y %I:%M");
var parseTimeOnly = d3.timeParse("%I:%M");
// var parseTime = d3.timeParse("%H:%M:%S");

// set up X
// var xValue = function(d) {return d.x;},
var xValue = function(d) {return d.weekday;},
    xScale = d3.scalePoint()
               .domain(weekdays)
               .range([0, canvasWidth])
               .padding(10),
    xMap = function(d) {
      console.log("x = " + xScale(xValue(d)));
      return xScale(xValue(d));
      },
    xAxis = d3.axisBottom(xScale);

var yValue = function(d) {
    var hour = parseTimestamp(d.timestamp_adj).getHours();
    var minute = parseTimestamp(d.timestamp_adj).getMinutes();
    // var second = parseTimestamp(d.timestamp_adj).getSeconds();
    console.log(d.timestamp_adj + " >\n"
                + parseTimestamp(d.timestamp_adj) + " >>\n"
                + parseTimeOnly(`${hour}:${minute}`));
    return parseTimeOnly(`${hour}:${minute}`);
    },
    // yScale = d3.scaleLinear().domain([0, 24]).range([canvasHeight, 0]),
    yScale = d3.scaleTime()
               .domain([new Date("January 1 1900 00:00:00"),
                        new Date("January 2 1900 00:00:00")])
               .range([canvasHeight, 0]),
    yMap = function(d) {
              return yScale(yValue(d));
            },
    yAxis = d3.axisLeft(yScale);

var svg = d3.select('svg')
            .attr('class', 'canvas')
            .attr('width', screenWidth)
            .attr('height', screenHeight)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

d3.csv('../data/uberRidesPart2.csv', function(data) {

  // Generate the x axis
  svg.append("g")
     .attr("class", "x axis")
     .attr("transform",
           'translate(' + margin.left + ',' + canvasHeight + ")")
     .call(xAxis);

  // Create the x axis label
  svg.append("text")
     .attr("transform",
           "translate(" + (canvasWidth/2) + "," +               // Centering L to R
                          (canvasHeight + margin.top/2) + ")")  // Aligning with bottom
     .style("text-anchor", "middle")
     .text("Weekday");

  svg.append("g")
     .attr("class", "y axis")
     .attr("transform", 'translate(' + margin.left + ',' + margin.top + ")")
     .call(yAxis);

  // text label for the y axis
  svg.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 0 - margin.left)
     .attr("x", 0 - (canvasHeight / 2))
     .attr("dy", "1em")
     .style("text-anchor", "middle")
     .text("Hour of the Day");

  svg.selectAll('dot')
  // .data(count_by_hours)
     .data(data)
     .enter().append('circle')
     .attr('class', 'dot')
     .attr('r', 2)
     .attr('cx', xMap)
     .attr('cy', yMap)
     .attr('transform',
           'translate(' + margin.left + ',' + margin.top + ")")

})