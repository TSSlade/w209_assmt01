
var weekdays = {
    'sunday': 8,
    'monday': 14,
    'tuesday': 10,
    'wednesday': 12,
    'thursday': 14,
    'friday': 6,
    'saturday': 0
}

var hours = {
    '11': 2,
    '12': 0,
    '13': 1,
    '14': 1,
    '15': 2,
    '16': 4,
    '17': 17,
    '18': 8,
    '19': 2,
    '20': 1,
    '21': 0,
    '22': 0,
    '23': 1,
    '24': 0,
    '1': 1,
    '2': 0,
    '3': 0,
    '4': 1,
    '5': 1,
    '6': 3,
    '7': 10,
    '8': 9,
    '9': 0,
    '10': 0
}

var count_by_hours = [
{'x':1,'y':11,'z':0},   {'x':2,'y':11,'z':1},   {'x':3,'y':11,'z':0},   {'x':4,'y':11,'z':0},   {'x':5,'y':11,'z':1},   {'x':6,'y':11,'z':0},   {'x':7,'y':11,'z':0},
{'x':1,'y':12,'z':0},   {'x':2,'y':12,'z':0},   {'x':3,'y':12,'z':0},   {'x':4,'y':12,'z':0},   {'x':5,'y':12,'z':0},   {'x':6,'y':12,'z':0},   {'x':7,'y':12,'z':0},
{'x':1,'y':13,'z':0},   {'x':2,'y':13,'z':1},   {'x':3,'y':13,'z':0},   {'x':4,'y':13,'z':0},   {'x':5,'y':13,'z':0},   {'x':6,'y':13,'z':0},   {'x':7,'y':13,'z':0},
{'x':1,'y':14,'z':1},   {'x':2,'y':14,'z':0},   {'x':3,'y':14,'z':0},   {'x':4,'y':14,'z':0},   {'x':5,'y':14,'z':0},   {'x':6,'y':14,'z':0},   {'x':7,'y':14,'z':0},
{'x':1,'y':15,'z':0},   {'x':2,'y':15,'z':0},   {'x':3,'y':15,'z':0},   {'x':4,'y':15,'z':0},   {'x':5,'y':15,'z':1},   {'x':6,'y':15,'z':1},   {'x':7,'y':15,'z':0},
{'x':1,'y':16,'z':0},   {'x':2,'y':16,'z':3},   {'x':3,'y':16,'z':0},   {'x':4,'y':16,'z':0},   {'x':5,'y':16,'z':0},   {'x':6,'y':16,'z':1},   {'x':7,'y':16,'z':0},
{'x':1,'y':17,'z':0},   {'x':2,'y':17,'z':4},   {'x':3,'y':17,'z':3},   {'x':4,'y':17,'z':2},   {'x':5,'y':17,'z':5},   {'x':6,'y':17,'z':3},   {'x':7,'y':17,'z':0},
{'x':1,'y':18,'z':0},   {'x':2,'y':18,'z':1},   {'x':3,'y':18,'z':3},   {'x':4,'y':18,'z':2},   {'x':5,'y':18,'z':1},   {'x':6,'y':18,'z':1},   {'x':7,'y':18,'z':0},
{'x':1,'y':19,'z':1},   {'x':2,'y':19,'z':1},   {'x':3,'y':19,'z':0},   {'x':4,'y':19,'z':0},   {'x':5,'y':19,'z':0},   {'x':6,'y':19,'z':0},   {'x':7,'y':19,'z':0},
{'x':1,'y':20,'z':0},   {'x':2,'y':20,'z':0},   {'x':3,'y':20,'z':0},   {'x':4,'y':20,'z':0},   {'x':5,'y':20,'z':1},   {'x':6,'y':20,'z':0},   {'x':7,'y':20,'z':0},
{'x':1,'y':21,'z':0},   {'x':2,'y':21,'z':0},   {'x':3,'y':21,'z':0},   {'x':4,'y':21,'z':0},   {'x':5,'y':21,'z':0},   {'x':6,'y':21,'z':0},   {'x':7,'y':21,'z':0},
{'x':1,'y':22,'z':0},   {'x':2,'y':22,'z':0},   {'x':3,'y':22,'z':0},   {'x':4,'y':22,'z':0},   {'x':5,'y':22,'z':0},   {'x':6,'y':22,'z':0},   {'x':7,'y':22,'z':0},
{'x':1,'y':23,'z':0},   {'x':2,'y':23,'z':0},   {'x':3,'y':23,'z':0},   {'x':4,'y':23,'z':1},   {'x':5,'y':23,'z':0},   {'x':6,'y':23,'z':0},   {'x':7,'y':23,'z':0},
{'x':1,'y':24,'z':0},   {'x':2,'y':24,'z':0},   {'x':3,'y':24,'z':0},   {'x':4,'y':24,'z':0},   {'x':5,'y':24,'z':0},   {'x':6,'y':24,'z':0},   {'x':7,'y':24,'z':0},
{'x':1,'y':1,'z':1},    {'x':2,'y':1,'z':0},    {'x':3,'y':1,'z':0},    {'x':4,'y':1,'z':0},    {'x':5,'y':1,'z':0},    {'x':6,'y':1,'z':0},    {'x':7,'y':1,'z':0},
{'x':1,'y':2,'z':0},    {'x':2,'y':2,'z':0},    {'x':3,'y':2,'z':0},    {'x':4,'y':2,'z':0},    {'x':5,'y':2,'z':0},    {'x':6,'y':2,'z':0},    {'x':7,'y':2,'z':0},
{'x':1,'y':3,'z':0},    {'x':2,'y':3,'z':0},    {'x':3,'y':3,'z':0},    {'x':4,'y':3,'z':0},    {'x':5,'y':3,'z':0},    {'x':6,'y':3,'z':0},    {'x':7,'y':3,'z':0},
{'x':1,'y':4,'z':0},    {'x':2,'y':4,'z':0},    {'x':3,'y':4,'z':1},    {'x':4,'y':4,'z':0},    {'x':5,'y':4,'z':0},    {'x':6,'y':4,'z':0},    {'x':7,'y':4,'z':0},
{'x':1,'y':5,'z':0},    {'x':2,'y':5,'z':1},    {'x':3,'y':5,'z':0},    {'x':4,'y':5,'z':0},    {'x':5,'y':5,'z':0},    {'x':6,'y':5,'z':0},    {'x':7,'y':5,'z':0},
{'x':1,'y':6,'z':0},    {'x':2,'y':6,'z':0},    {'x':3,'y':6,'z':1},    {'x':4,'y':6,'z':2},    {'x':5,'y':6,'z':0},    {'x':6,'y':6,'z':0},    {'x':7,'y':6,'z':0},
{'x':1,'y':7,'z':4},    {'x':2,'y':7,'z':1},    {'x':3,'y':7,'z':0},    {'x':4,'y':7,'z':3},    {'x':5,'y':7,'z':2},    {'x':6,'y':7,'z':0},    {'x':7,'y':7,'z':0},
{'x':1,'y':8,'z':1},    {'x':2,'y':8,'z':1},    {'x':3,'y':8,'z':2},    {'x':4,'y':8,'z':2},    {'x':5,'y':8,'z':3},    {'x':6,'y':8,'z':0},    {'x':7,'y':8,'z':0},
{'x':1,'y':9,'z':0},    {'x':2,'y':9,'z':0},    {'x':3,'y':9,'z':0},    {'x':4,'y':9,'z':0},    {'x':5,'y':9,'z':0},    {'x':6,'y':9,'z':0},    {'x':7,'y':9,'z':0},
{'x':1,'y':10,'z':0},   {'x':2,'y':10,'z':0},   {'x':3,'y':10,'z':0},   {'x':4,'y':10,'z':0},   {'x':5,'y':10,'z':0},   {'x':6,'y':10,'z':0},   {'x':7,'y':10,'z':0}
]

// Generating standard variables to manage
// the size of our space

var screenWidth = 800,
    screenHeight = 600,
    margin = {"top":  0.05 * screenHeight, "bottom": 0.05 * screenHeight,
              "left": 0.1 * screenWidth,   "right": 0.1 * screenWidth},
    canvasWidth = screenWidth - margin.left - margin.right,
    canvasHeight = screenHeight - margin.top - margin.bottom;

// set up X
var xValue = function(d) {return d.x;},
    xScale = d3.scaleLinear().domain([0,8]).range([0, canvasWidth]),
    xMap = function(d) { return xScale(xValue(d));},
    xAxis = d3.axisBottom(xScale);

var yValue = function(d) {return d.y;},
    yScale = d3.scaleLinear().domain([0, 24]).range([canvasHeight, 0]),
    yMap = function(d) { return yScale(yValue(d));},
    yAxis = d3.axisLeft(yScale);

// var svg = d3.select('body').append('svg')
var svg = d3.select('svg')
            .attr('class', 'canvas')
            .attr('width', canvasWidth)
            .attr('height', canvasHeight)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
            // .attr('transform', 'translate(0,0)');

svg.append("g")
      .attr("class", "x axis")
      // .attr("transform", 'translate(0,' + 0.9 * canvasHeight + ")")
      .attr("transform", 'translate(' + -0.05 * canvasWidth + ',' + 0.90 * canvasHeight + ")")
      .call(xAxis);

svg.append("text")
      .attr("transform",
            "translate(" + (canvasWidth/2) + "," +
                           (canvasHeight + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Weekday");

svg.append("g")
      .attr("class", "y axis")
      .attr("transform", 'translate(' + -0.05 * canvasWidth + ',' + -0.1 * canvasHeight + ")")
      .call(yAxis);
  // text label for the y axis
svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (canvasHeight / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Hour of the Day");

svg.selectAll('dot')
   .data(count_by_hours)
   .enter().append('circle')
   .attr('class', 'dot')
   .attr('r', function(d) { return (d.z * 2);})
   .attr('cx', xMap)
   .attr('cy', yMap)
   .attr('transform','translate(' + -0.05 * canvasWidth + ',' + -0.1 * canvasHeight + ")")
   .style('fill', '#000');
