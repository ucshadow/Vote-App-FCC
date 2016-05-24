import React from 'react'
import assignColor from '../api/assignColor.js';


export default class ToD3 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {chart: "pie"};
    this.displayChart = this.displayChart.bind(this);

    d3.selectAll("svg > *").remove();  //empty svg or it will redraw over itself

    this.svg = d3.select('#_svg')
        //.data([data])
        .attr("width", 600)
        .attr("height", 600)
        .append("svg:g")
        .attr("transform", "translate(" + 300 + "," + 300 + ")");


  }

  componentWillUnmount(){
    d3.select('#_svg')
        .attr("width", 0)
        .attr("height", 0);

    d3.selectAll("svg > *").remove();
  }

  displayChart() {
    if(this.state.chart === "pie"){

      let prop = this.props.d;

      function sortValues(){
        let x = [];
        for(let i = 0; i < prop.options.length; i++){
          x.push({"label": prop.options[i][0], "value": prop.options[i][1]})
        }
        return x;
      }

      let w = 600;
      let h = 600;
      let r = Math.min(w, h) / 2;
      let data = sortValues();
      let svg = this.svg;



      svg.data([data]);

      let pie = d3.layout.pie()
        .value(function(d){return d.value;});

      // declare an arc generator function
      let arc = d3.svg.arc()
        .outerRadius(r - 10)
        .innerRadius(0);

      let optionArc = d3.svg.arc()
        .outerRadius(r - 60)
        .innerRadius(r - 60);

      let scoreArc = d3.svg.arc()
        .outerRadius(r - 250)
        .innerRadius(r - 250);

      // select paths, use arc generator to draw
      let arcs = svg.selectAll("g.slice")
        .data(pie)
        .enter()
        .append("svg:g")
        .attr("class", "slice");

      arcs.append("svg:path")
          .attr("fill", function(d, i){
              return assignColor(i);
          })
          .attr("d", function (d) {
              return arc(d);
          });

      // add the text
      arcs.append("svg:text")
        .attr("transform", function(d){return "translate(" + optionArc.centroid(d) + ")";})
        .attr("text-anchor", "middle")
        .attr("class", "chart-text")
        .attr("dy", ".35em")
        .attr("fill", "white")
        .text( function(d, i) {
          if(data[i].value <= 0) {
            return ""
          } else {
            return data[i].label
          }
        });

      arcs.append("svg:text")
        .attr("transform", function(d){return "translate(" + scoreArc.centroid(d) + ")";})
        .attr("text-anchor", "middle")
        .attr("dy", "1em")
        .text( function(d, i) {
          if(data[i].value <= 0) {
            return ""
          } else {
            return data[i].value
          }
        });


    }
  }

  render() {
    return (
      <div>
        {this.displayChart()}
      </div>
    )
  }

}


