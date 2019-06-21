
// Generating standard variables to manage
// the size of our space

var UberRidesVizLib = UberRidesVizLib || {};

UberRidesVizLib.ScatterPlot = function() {

    var screenWidth = 800,
        screenHeight = 600,
        margin = {"top":  0.025 * screenHeight,
                  "bottom": 0.025 * screenHeight,
                  "left": 0.025 * screenWidth,
                  "right": 0.025 * screenWidth},
        canvasWidth = screenWidth - margin.left - margin.right, // 800 - 80 - 80 = 640
        canvasHeight = screenHeight - margin.top - margin.bottom;

    var svg = d3.select("div#viz")
                .append("svg")
                .attr("width", canvasWidth)
                .attr("height", canvasHeight);


    // Setting up X scaler, mapper, and value obtainer
    var xValue = function(d, i) {
        // console.log("weekday = " + d);
        return d.weekday;},
        xScale = d3.scalePoint()
                   // .domain(weekdays)
                   .range([0, canvasWidth])
                   .padding(10),
        xMap = function(d, i) {
                    console.log("x = " + xScale(xValue(d)));
                    return xScale(xValue(d));
                },
        xAxis = d3.axisBottom(xScale);

    // Setting up X scaler, mapper, and value obtainer
    var yValue = function(d, i) {
                      console.log("yValue > parseTimestamp:");
                      // console.log(d.timestamp_adj);
                      console.log(d[0]);
                      console.log(d[1]);
                      var hour = parseTimestamp(d.timestamp_adj).getHours(),
                          minute = parseTimestamp(d.timestamp_adj).getMinutes();
                      // second = parseTimestamp(d.timestamp_adj).getSeconds();
                      console.log(d.timestamp_adj + " >\n"
                              + parseTimestamp(d.timestamp_adj) + " >>\n"
                              + parseTimeOnly(`${hour}:${minute}`));
                      return parseTimeOnly(`${hour}:${minute}`);
                  },
    // yScale = d3.scaleLinear().domain([0, 24]).range([canvasHeight, 0]),
        yScale = d3.scaleTime()
                   // .domain([new Date("January 1 1900 00:00:00"),
                   //      new Date("January 2 1900 00:00:00")])
                   .range([canvasHeight, 0]),
        yMap = function(d, i) {
                    console.log("y = " + d);
                    return yScale(yValue(d));
                },
        yAxis = d3.axisLeft(yScale);

    var callback = function() {};
    var callback_ = function(_) {
                        var that = this;
                        if (!arguments.length) return callback;
                        callback = _;
                        return that;
                      }
    var data = [];
    var data_ = function(_) {
                    var that = this;
                    if (!arguments.length) return data;
                    data = _;
                    return that;
                  }
    var circle = d3.select("svg");

    var plot_ = function() {

        xScale.domain(weekdays);
        yScale.domain([new Date("January 1 1900 00:00:00"),
                       new Date("January 2 1900 00:00:00")]);

        circle = svg.selectAll("circles")
                    .data("data")
                    .enter()
                    .append("circle")
                    .attr("r", "2px")
                    .attr('cx', function(d, i) { return xMap(d[0]);})
                    .attr('cy', function(d, i) { return yMap(d[1]);})
                    .attr('transform',
                          'translate(' + margin.left + ',' + margin.top + ")")
                    .on("mouseover", function(d,i) {
                                          d3.select(this).attr("fill","red");
                                          // console.log(d);
                                          callback(d[0]);
                                        });
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
    };

    var highlight = function(data) {
                        console.log(data);
                        circle.filter(function(d,i) {
                                        return (i === userlist) ? true : false;
                        })
                        .attr("fill", "green")
                    };

    var public = {
      "plot": plot_,
      "data": data_,
      "highlight": highlight,
      "callback": callback_
    };

    return public;
};

// var screenWidth = 800,
//     screenHeight = 600,
//     margin = {"top":  0.025 * screenHeight, "bottom": 0.025 * screenHeight,
//               "left": 0.025 * screenWidth,   "right": 0.025 * screenWidth},
//     canvasWidth = screenWidth - margin.left - margin.right, // 800 - 80 - 80 = 640
//     canvasHeight = screenHeight - margin.top - margin.bottom;

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
// var xValue = function(d) {return d.weekday;},
//     xScale = d3.scalePoint()
//                .domain(weekdays)
//                .range([0, canvasWidth])
//                .padding(10),
//     xMap = function(d) {
//       console.log("x = " + xScale(xValue(d)));
//       return xScale(xValue(d));
//       },
//     xAxis = d3.axisBottom(xScale);

// var yValue = function(d) {
//     var hour = parseTimestamp(d.timestamp_adj).getHours();
//     var minute = parseTimestamp(d.timestamp_adj).getMinutes();
//     // var second = parseTimestamp(d.timestamp_adj).getSeconds();
//     console.log(d.timestamp_adj + " >\n"
//                 + parseTimestamp(d.timestamp_adj) + " >>\n"
//                 + parseTimeOnly(`${hour}:${minute}`));
//     return parseTimeOnly(`${hour}:${minute}`);
//     },
//     // yScale = d3.scaleLinear().domain([0, 24]).range([canvasHeight, 0]),
//     yScale = d3.scaleTime()
//                .domain([new Date("January 1 1900 00:00:00"),
//                         new Date("January 2 1900 00:00:00")])
//                .range([canvasHeight, 0]),
//     yMap = function(d) {
//               return yScale(yValue(d));
//             },
//     yAxis = d3.axisLeft(yScale);

// var highlight = function(data) {
//                     circle.filter(function(d,i) {
//                       return (i === data) ? true : false;
//                     }).attr("fill","red");};

// var svg = d3.select('svg')
//             .attr('class', 'canvas')
//             .attr('width', screenWidth)
//             .attr('height', screenHeight)
//             .append('g')
//             .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// var circle = d3.select("svg");

d3.csv('../data/uberRidesPart2.csv',
        function(error, data) {
          var models = data.map(function(d) {return d.vehicle_model;}),
              makes = data.map(function(d) {return d.vehicle_make;}),
              weekdays = data.map(function(d) {return d.weekday;}),
              services = data.map(function(d) {return d.service;}),
              years = data.map(function(d) {return d.date_year;}),
              months = data.map(function(d) {return d.date_month;}),
              days = data.map(function(d) {return d.date_day;}),
              pdts = data.map(function(d) {return d.time_pdt;}),
              times = data.map(function(d) {return d.timestamp_adj;});

          var days_and_times = [];
              for (var i = 0; i < data.length; i++) {
                days_and_times.push([weekdays[i], times[i]])
              };

          var ScatterPlot1 = UberRidesVizLib.ScatterPlot();
              ScatterPlot1.data(data);
              ScatterPlot1.plot();
              ScatterPlot1.callback();

  // // Generate the x axis
  // svg.append("g")
  //    .attr("class", "x axis")
  //    .attr("transform",
  //          'translate(' + margin.left + ',' + canvasHeight + ")")
  //    .call(xAxis);

  // // Create the x axis label
  // svg.append("text")
  //    .attr("transform",
  //          "translate(" + (canvasWidth/2) + "," +               // Centering L to R
  //                         (canvasHeight + margin.top/2) + ")")  // Aligning with bottom
  //    .style("text-anchor", "middle")
  //    .text("Weekday");

  // svg.append("g")
  //    .attr("class", "y axis")
  //    .attr("transform", 'translate(' + margin.left + ',' + margin.top + ")")
  //    .call(yAxis);

  // // text label for the y axis
  // svg.append("text")
  //    .attr("transform", "rotate(-90)")
  //    .attr("y", 0 - margin.left)
  //    .attr("x", 0 - (canvasHeight / 2))
  //    .attr("dy", "1em")
  //    .style("text-anchor", "middle")
  //    .text("Hour of the Day");

  // svg.selectAll('dot')
  // // .data(count_by_hours)
  //    .data(data)
  //    .enter().append('circle')
  //    .attr('class', 'dot')
  //    .attr('r', 2)
  //    .attr('cx', xMap)
  //    .attr('cy', yMap)
  //    .attr('transform',
  //          'translate(' + margin.left + ',' + margin.top + ")");

  // circle = svg
  //   .selectAll("dot")
  //   .data(data)
  //   .enter()
  //   .append("circle");

  // circle.on("mouseover", function(d,i) {
  //         d3.select(this).attr("fill","red");
  //         console.log(d);
  //         // svg.highlight(i);
  //       })
  //    .filter( function(d,i) { 
  //       // console.log("Evaluating", d, i);
  //       if ((i >= 200 && (i % 2 === 0))) {
  //         return true;
  //       } else {
  //         console.log("Excluding record num", i);
  //         return false;
  //       };})
  //   .attr("fill", "green")
})