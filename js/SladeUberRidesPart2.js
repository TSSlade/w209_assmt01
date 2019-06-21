// Creating library to hold various visualization functions

var UberRidesVizLib = UberRidesVizLib || {};

// Creating ScatterPlot viz function

UberRidesVizLib.ScatterPlot = function() {

    // Parameters to define size of canvas, figure
    var screenWidth = 800,
        screenHeight = 600,
        margin = {"top":  0.025 * screenHeight,
                  "bottom": 0.025 * screenHeight,
                  "left": 0.025 * screenWidth,
                  "right": 0.025 * screenWidth},
        canvasWidth = screenWidth - margin.left - margin.right, // 800 - 80 - 80 = 640
        canvasHeight = screenHeight - margin.top - margin.bottom;

    // Selecting the proper div
    var svg = d3.select("div#viz")
                .append("svg")
                .attr("width", canvasWidth)
                .attr("height", canvasHeight);

    // Setting up X scaler, mapper, and value obtainer

    // Given a datum, extract the weekday
    var xValue = function(d, i) {
        console.log("weekday = " + d);
        return d.weekday;};

    // Define scaler to map to the canvasWidth; domain comes later
    var xScale = d3.scalePoint()
                   // .domain(weekdays)
                   .range([0, canvasWidth])
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
                      // console.log(d[0]);
                      // console.log(d[1]);
                      var hour = parseTimestamp(d.timestamp_adj).getHours();
                      var minute = parseTimestamp(d.timestamp_adj).getMinutes();
                      // second = parseTimestamp(d.timestamp_adj).getSeconds();
                      console.log(d.timestamp_adj + " >\n"
                              + parseTimestamp(d.timestamp_adj) + " >>\n"
                              + parseTimeOnly(`${hour}:${minute}`));
                      return parseTimeOnly(`${hour}:${minute}`);
                  };
    // Define scaler to map to canvasHeight; domain comes later
    // yScale = d3.scaleLinear().domain([0, 24]).range([canvasHeight, 0]),
    var yScale = d3.scaleTime()
                   // .domain([new Date("January 1 1900 00:00:00"),
                   //      new Date("January 2 1900 00:00:00")])
                   .range([canvasHeight, 0]);

    // Given a datum, return the scaled value of the timestamp
    var yMap = function(d, i) {
                    console.log("y = " + d);
                    return yScale(yValue(d));
                };

    // Define the yAxis
    var yAxis = d3.axisLeft(yScale);

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
                    .attr("r", "2px")
                    .attr('cx', function(d, i) { return xMap(d);})
                    .attr('cy', function(d, i) { return yMap(d);})
                    .attr('transform',
                          'translate(' + margin.left + ',' + margin.top + ")")
                    .on("mouseover", function(d,i) {
                                          console.log("make: " + d.vehicle_make);
                                          deemphasize(d);
                                          highlight(d);
                                        })
                    .on("mouseout", function(d, i) {
                                          restore(d);});
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

    var highlight = function(point) {
                      console.log("highlighting: " + point);
                      circle.filter(function(d, i) {
                        return (d.vehicle_make === point.vehicle_make); })
                        .attr("r", "10px")
                        .attr("fill", function(d) {
                              return make_colors(make_dict[d.vehicle_make]);
                            })};

    var deemphasize = function(point) {
                      console.log("deemphasizing non-: " + point);
                      circle.filter(function(d, i) {
                        return (d === point) ? false : true; })
                            .attr("r", "1px")
                            .attr("fill", "grey")};

    var restore = function(point) {
                      console.log("highlighting: " + point);
                      circle.attr("r", "2px")
                            .attr("fill", "black")};


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

d3.csv('data/uberRidesPart2.csv',
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