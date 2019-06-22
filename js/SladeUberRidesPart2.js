// Creating library to hold various visualization functions

var div = d3
            // .select("body")
            .select("div#viz")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

var UberRidesVizLib = UberRidesVizLib || {};

// Creating ScatterPlot viz function

UberRidesVizLib.ScatterPlot = function() {

    // Parameters to define size of canvas, figure
    var screenWidth = 800,
        screenHeight = 600,
        margin = {"top":  0.05 * screenHeight,    // 40 px
                  "bottom": 0.1 * screenHeight,  // 40 px
                  "left": 0.05 * screenWidth,     // 30 px
                  "right": 0.05 * screenWidth},   // 30 px
        canvasWidth = (screenWidth - margin.left - margin.right),   // 800 - 40 - 40 = 720
        canvasHeight = (screenHeight - margin.top - margin.bottom); // 600 - 30 - 30 = 540

    // Selecting the proper div
    var svg = d3.select("div#viz")
                .append("svg")
                .attr("width", screenWidth)
                .attr("height", screenHeight);

    // Setting up X scaler, mapper, and value obtainer

    // Given a datum, extract the weekday
    var xValue = function(d, i) {
        console.log("weekday = " + d.weekday);
        return d.weekday;};

    // Define scaler to map to the canvasWidth; domain comes later
    var xScale = d3.scalePoint()
                   .range([0, canvasWidth])
                   // .range([1, 7])
                   .padding(10);

    // Given a datum, return the scaled value of the weekday
    var xMap = function(d, i) {
                    console.log("x = " + xScale(xValue(d)));
                    return xScale(xValue(d));
                };

    // Define the xAxis
    var xAxis = d3.axisBottom(xScale);

    // Setting up X scaler, mapper, and value obtainer

    // Given a datum, extract the timestamp
    var yValue = function(d, i) {
                      console.log("yValue > parseTimestamp:");
                      console.log(d);
                      var hour = parseTimestamp(d.timestamp_adj).getHours();
                      var minute = parseTimestamp(d.timestamp_adj).getMinutes();
                      // second = parseTimestamp(d.timestamp_adj).getSeconds();
                      console.log(d.timestamp_adj + " >\n"
                              + parseTimestamp(d.timestamp_adj) + " >>\n"
                              + parseTimeOnly(`${hour}:${minute}`));
                      return parseTimeOnly(`${hour}:${minute}`);
                  };
    // Define scaler to map to canvasHeight; domain comes later
    var yScale = d3.scaleTime()
                   .range([canvasHeight, 0]);

    // Given a datum, return the scaled value of the timestamp
    var yMap = function(d, i) {
                    console.log("y = " + d);
                    return yScale(yValue(d));
                };

    // Define the yAxis
    var yAxis = d3.axisLeft(yScale)
                  .tickFormat(d3.timeFormat("%H:%M"));

    // Create a placeholder for the callback function
    var callback = function() {};

    var callback_ = function(_) {
                        var that = this;
                        if (!arguments.length) return callback;
                        callback = _;
                        return that;
                      };

    // Create a placeholder for the data
    var data = [];

    var data_ = function(_) {
                    var that = this;
                    if (!arguments.length) return data;
                    data = _;
                    return that;
                  };

    // Select the svg on which we'll operate
    var circle = d3.select("svg");

    // Define the plotting function
    var plot_ = function() {

        xScale.domain(weekdays);
        yScale.domain([new Date("January 1 1900 00:00:00"),
                       new Date("January 2 1900 00:00:00")]);

        circle = svg.selectAll("circles")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("id", "data_points")
                    .attr("r", "4px")
                    .attr('cx', function(d, i) { return xMap(d);})
                    .attr('cy', function(d, i) { return yMap(d);})
                    .attr("fill", function(d) {
                              return make_colors(make_dict[d.vehicle_make]);
                            })
                    .attr('transform',
                          'translate(' + 2.5 * margin.left + ',' + margin.top + ")")
                    .on("mouseover", function(d) {
                                      console.log("Hovering over " + d.vehicle_make);
                                      div.transition()
                                         .duration(200)
                                         .style("opacity", 0.9);
                                      div.html("<em><strong>Make:</strong></em> " + d.vehicle_make + "<br/>" +
                                               "<em><strong>Model:</strong></em> " + d.vehicle_model + "<br/>" +
                                               "<em><strong>Date:</strong></em> " + d.date_year +
                                               "/" + d.date_month +
                                               "/" + d.date_day)
                                         .style("left", (d3.event.pageX + 10) + "px")
                                         .style("top", (d3.event.pageY - 28) + "px");
                                         })
                    .on("mouseout", function(d, i) {
                                          restore(d);
                                          div.transition()
                                             .duration(200)
                                             .style("opacity", 0);})
                    .on("click", function(d,i) {
                                          console.log("make: " + d.vehicle_make);
                                          console.log("time: " + d.timestamp_adj);
                                          deemphasize(d);
                                          highlight(d);
                                        });
        // Generate the x axis
        svg.append("g")
           .attr("class", "x axis")
           .attr("transform",
                 'translate(' + 2.5 * margin.left + ',' + (canvasHeight + margin.top) + ")")
           .call(xAxis);

        // Create the x axis label
        svg.append("text")
           .attr("transform",
                 "translate(" + (2.5 * margin.left + canvasWidth/2) + "," +               // Centering L to R
                                (canvasHeight + 2 * margin.top) + ")")  // Aligning with bottom
           .style("text-anchor", "middle")
           .text("Weekday")
           .attr("font-weight", 700);

        svg.append("g")
           .attr("class", "y axis")
           .attr("transform", 'translate(' + 2.5 * margin.left + ',' + margin.top + ")")
           .call(yAxis);

        // text label for the y axis
        svg.append("text")
           .attr("transform", "translate(" + 0.5 * margin.left + "," + canvasHeight/2 + ") rotate(-90)")
           .attr("dy", "1em")
           .style("text-anchor", "middle")
           .text("Hour of the Day")
           .attr("font-weight", 700);
    };

    var highlight = function(point) {
                      console.log("highlighting: " + point);
                      circle.filter(function(d, i) {
                        return (d.vehicle_make === point.vehicle_make); })
                        .attr("r", "8px")
                        .attr("fill", function(d) {
                              return make_colors(make_dict[d.vehicle_make]);
                            })};

    var deemphasize = function(point) {
                      console.log("deemphasizing non-: " + point);
                      circle.filter(function(d, i) {
                        return (d === point) ? false : true; })
                            .attr("r", "2.5px")
                            .attr("fill", "grey")};

    var restore = function(point) {
                      console.log("highlighting: " + point);
                      circle.attr("r", "4px")
                            .attr("fill", function(d) {
                              return make_colors(make_dict[d.vehicle_make]);
                            })};

    var public = {
      "plot": plot_,
      "data": data_,
      "highlight": highlight,
      "callback": callback_
    };

    return public;
};

var weekdays = ["Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"];

var make_colors = d3.scaleOrdinal(d3.schemeCategory10);

var make_dict = {
  "Ford": 1,
  "Honda": 2,
  "Hyundai": 3,
  "Kia": 4,
  "Mazda": 5,
  "Mitsubishi": 6,
  "Nissan": 7,
  "Renault": 8,
  "Suzuki": 9,
  "Toyota": 10
};

var parseTimestamp = d3.timeParse("%Y-%m-%Y %I:%M");
var parseTimeOnly = d3.timeParse("%I:%M");

// d3.csv('../data/uberRidesPart2.csv',
d3.csv('static/data/uberRidesPart2.csv',
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
})
