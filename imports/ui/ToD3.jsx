import React from 'react'


export default class ToD3 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {chart: "pie"};
    this.displayChart = this.displayChart.bind(this);
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

      let w = 800;
      let h = 800;
      let r = Math.min(w, h) / 2;
      let color = d3.scale.category20c();
      let data = sortValues();

      let svg = d3.select('#_svg')
        .data([data])
        .attr("width", w)
        .attr("height", h)
        .append("svg:g")
        .attr("transform", "translate(" + r + "," + r + ")");

      let pie = d3.layout.pie()
        .value(function(d){return d.value;});

      // declare an arc generator function
      let arc = d3.svg.arc()
        .outerRadius(r - 40);

      // select paths, use arc generator to draw
      let arcs = svg.selectAll("g.slice")
        .data(pie)
        .enter()
        .append("svg:g")
        .attr("class", "slice");

      arcs.append("svg:path")
          .attr("fill", function(d, i){
              return color(i);
          })
          .attr("d", function (d) {
              return arc(d);
          });

      // add the text
      arcs.append("svg:text").attr("transform", function(d){
            d.innerRadius = 0;
            d.outerRadius = r;
          return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
          return data[i].label;}
          );


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


