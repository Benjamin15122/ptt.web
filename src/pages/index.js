import React,{Component} from 'react'
import {connect} from 'dva'
import {Input,Row,Timeline} from 'antd'
import {
  // G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  // Coord,
  // Label,
  // Legend,
  // View,
  // Guide,
  // Shape,
  // Facet,
  // Util
} from "bizcharts";

function getCols(graph){
  debugger
  var cols = {}
  cols[graph.scalex] = {
    range: [0,1]
  }
  cols[graph.scaley] = {
    min: 0,
  }
  console.log(cols)
  return cols
}

const Search = Input.Search;
@connect(({git})=>({git: git}))
class LocalPttViewer extends Component{
  render(){
    const {content} = this.props.git
    if(content!==undefined){
      debugger
      console.log(content.graphlist[0])
    }
    const cols = content===undefined?null:getCols(content.graphlist[0])
    const position = content===undefined?null:`${content.graphlist[0].scalex}*${content.graphlist[0].scaley}`
    console.log(position)
    return (
      <div>
        <Row>
          <Search
            placeholder="git repo url"
            enterButton="fetch"
            size="large"
            value="/Benjamin15122/ptt.log"
            onSearch={value => this.props.dispatch({type:"git/fetchCommits",payload:value})}
          />
        </Row>
        <Row>
          <Timeline style={{marginTop: 24}}>
            {this.props.git.commits.map((str,index)=><Timeline.Item key={index}>{str}</Timeline.Item>)}
          </Timeline>
        </Row>
        <Row>
          <Search
            placeholder="fetch Json content"
            enterButton="get"
            size="large"
            onSearch={value => this.props.dispatch({type:"git/fetchJson",payload:value})}
          />
        </Row>
        <Row>
          {content===undefined?null:<Chart height={400} data={content.graphlist[0].node} scale={cols} forceFit>
            <Axis name={content.graphlist[0].scalex} />
            <Axis name={content.graphlist[0].scaley} />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom type="line" position={position} size={2} />
            <Geom
              type="point"
              position={position}
              size={4}
              shape={"circle"}
              style={{
                stroke: "#fff",
                lineWidth: 1
              }}
            />
          </Chart>}
        </Row>
      </div>
    )
  }
}

export default LocalPttViewer;