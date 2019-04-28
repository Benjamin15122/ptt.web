import {Component} from'react'
import CanvasJSReact from '../lib/canvasjs.react'
import {pr_curve} from '../lib/out'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class LineChart extends Component {
	render() {
    console.log(pr_curve)
		const options = {
			animationEnabled: true,
			title:{
				text: "PR-Curve"
			},
			axisX: {
        valueFormatString: "",
        title: "recall"
			},
			axisY: {
				title: "precision",
				prefix: "",
			},
			data: [{
				type: "spline",
				dataPoints: [
          { x: 0.0, y: 1.00 },
          { x: 0.1, y: 0.95 },
          { x: 0.15, y: 0.94},
          { x: 0.16, y: 0.94},
					{ x: 0.2, y: 0.93 },
					{ x: 0.3, y: 0.89 },
					{ x: 0.4, y: 0.85 },
					{ x: 0.5, y: 0.80 },
					{ x: 0.6, y: 0.70 },
					{ x: 0.7, y: 0.58 },
					{ x: 0.8, y: 0.53 },
					{ x: 0.9, y: 0.35 },
					{ x: 1.0, y: 0.00 }
				]
			},{
        type: "spline",
				dataPoints: [
          { x: 0.0, y: 1.00 },
          { x: 0.1, y: 0.99 },
          { x: 0.15, y: 0.98},
          { x: 0.16, y: 0.98},
					{ x: 0.2, y: 0.95 },
					{ x: 0.3, y: 0.93 },
					{ x: 0.4, y: 0.92 },
					{ x: 0.5, y: 0.86 },
					{ x: 0.6, y: 0.82 },
					{ x: 0.7, y: 0.75 },
					{ x: 0.8, y: 0.68 },
          { x: 0.9, y: 0.60 },
          { x: 0.92, y: 0.56},
          { x: 0.94, y: 0.50},
          { x: 0.96, y: 0.39},
					{ x: 1.0, y: 0.00 }
				]
			}]
		}
		return (
      <div style={{width: 500}}>
			<CanvasJSChart options = {pr_curve}/>
      </div>
		);
	}
}

export default LineChart