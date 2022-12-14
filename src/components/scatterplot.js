import * as d3 from 'd3';

const ScatterPlot = (props) => {
    const dataset = props.scatterData;

    console.log('DATASET', dataset);

    const w = 800;
    const h = 400;
    const padding = 40;

    const svg = d3.select('.chart')
                    .append('svg')
                    .attr('width', w)
                    .attr('height', h);

   

    if(dataset !== undefined && dataset !== null){
     
        const yAxisScale = d3.scaleTime()
                            .domain([d3.min(dataset, (d) => new Date(d.Seconds * 1000)), d3.max(dataset, (d) => new Date(d.Seconds * 1000))])
                            .range([padding, h - padding])
        
       

        const xAxisScale = d3.scaleLinear()
                                .domain([d3.min(dataset, (d) => d.Year) - 1, d3.max(dataset, (d) => d.Year) + 1])
                                .range([padding, w-padding])
        
        const xAxis = d3.axisBottom(xAxisScale).tickFormat(d3.format('d'));
        const yAxis = d3.axisLeft(yAxisScale).tickFormat(d3.timeFormat('%M:%S'));

        svg.append('g')
            .attr("transform", "translate(0," + (h - padding) + ")")
            .attr("id", "x-axis")
            .style('font-family', 'Consolas')
            .call(xAxis);

        svg.append('g')
            .attr("transform", "translate(" + (padding) + ", 0)")
            .attr("id", "y-axis")
            .style('font-family', 'Consolas')
            .call(yAxis);

        svg.selectAll('circle')
            .data(dataset)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('r', '5')
            .style('font-family', 'Consolas')
            .attr("data-xvalue", (d) => d.Year)
            .attr("data-yvalue", (d) => new Date(d["Seconds"] * 1000))
            .attr("cx", (d) => xAxisScale(d.Year))
            .attr("cy", (d) => yAxisScale(new Date(d.Seconds * 1000)))
            .attr("fill", (d) => {
                if(d.Doping !== '') {
                    return 'green'
                } else {
                    return 'red'
                }
            })
            .on('mouseover', (event, d) => {
                tooltip.transition()
                        .style('visibility', 'visible')

                tooltip.text(`${d.Name} - ${d.Time}  ${d.Doping}`)
                        .attr('data-year', d.Year)
                
                
            })
            .on('mouseout', (event, d) => {
                tooltip.transition()
                        .style('visibility', 'hidden');
            })


            let tooltip = d3.select('.chart')
                        .append('div')
                        .attr('id', 'tooltip')                        
    }

    return ( 
        <main>
            <div className="container"> 
                <h1 id="title">Doping in Professional Bicycle Racing</h1>
                <div className="chart"></div>
                <div id="legend">
                    <p>Red = Doping Allegation</p>
                    <p>Green = No Doping Allegation</p>
                </div>
            </div>
        </main>
       
     );
}
 
export default ScatterPlot;