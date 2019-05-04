import React,{Component} from 'react'
import {connect} from 'dva'
import {Input,Row,Col,Form,Icon,Button,Statistic,Card} from 'antd'
import CanvasJSReact from '../lib/canvasjs.react'
var CanvasJSChart = CanvasJSReact.CanvasJSChart

const tabListNoTitle = [{
  key: 'params',
  tab: 'Parameters',
}, {
  key: 'acc',
  tab: 'Acc Curve',
}, {
  key: 'loss',
  tab: 'Loss Curve',
}];

@connect(({git})=>({git: git}))
class LocalPttViewer extends Component{
  state = {
    noTitleKey: 'params',
  }

  onTabChange = (key) => {
    this.setState({ noTitleKey: key });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {dispatch} = this.props
    this.props.form.validateFields((err, values) => {
        if (!err) {
            dispatch({type:"git/fetchCommit",payload:values})
        }
    });
  }

  genRecordOptions = (title,axisx,axisy,record) => {
    const points = [{type: "spline",dataPoints:record.map((val,index)=>{return {"x":index,"y":val}})}]
    const max = Math.max(...record)
    const min = Math.min(...record)
    return {
			animationEnabled: true,
			title: {
				text: title
			},
			axisX: {
				title: axisx
			},
			axisY: {
        title: axisy,
        minimum: min-0.01,
        maximum: max+0.01
			},
			data: points
		}
  }

  recordToComponent = (r) => {
    const {epoches,batch_size,learning_rate,acc,loss,acc_record,loss_record} = r
    const acc_options = this.genRecordOptions("Acc Curve","Output Index","Acc Rate",acc_record)
    const loss_options = this.genRecordOptions("Loss Curve","Output Index","Loss Rate",loss_record)
    return {
      params:(<div>
        <Row gutter={16}>
          <Col span={12}>
            <Card><Statistic title="Accuracy" value={acc} formatter={(value)=><h2 style={{color: '#3f8600'}}>{value}</h2>} /></Card>
          </Col>
          <Col span={12}>
            <Card><Statistic title="Loss" value={loss} formatter={(value)=><h2 style={{color: '#cf1322'}}>{value}</h2>}/></Card>
          </Col>
        </Row>
        <Row gutter={16} style={{marginTop: '24px'}}>
          <Col span={8}>
            <Card><Statistic title="Epoches" value={epoches} formatter={(value)=><h3 style={{color: '#fffff'}}>{value}</h3>}/></Card>
          </Col>
          <Col span={8}>
            <Card><Statistic title="Learning Rate" value={learning_rate} formatter={(value)=><h3 style={{color: '#fffff'}}>{value}</h3>}/></Card>
          </Col>
          <Col span={8}>
            <Card><Statistic title="Batch Size" value={batch_size} formatter={(value)=><h3 style={{color: '#fffff'}}>{value}</h3>}/></Card>
          </Col>
        </Row>
      </div>),
      acc: (<div style={{width: '90%'}}>
        <CanvasJSChart options={acc_options} />
      </div>),
      loss: (<div style={{width: '90%'}}>
        <CanvasJSChart options={loss_options} />
      </div>)}
  }

  render(){
    const {
        getFieldDecorator
    } = this.props.form;
    const {c_record} = this.props.git
    return (
      <div>
        <Row>
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('sha', {
                  rules: [{ required: true, message: 'input commit sha' }],
                })(
                  <Input prefix={<Icon type="code" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Commit" />
                )}
            </Form.Item>
            <Form.Item>
              <Button
                  type="primary"
                  htmlType="submit"
              >
                  Fetch
              </Button>
            </Form.Item>
          </Form>
        </Row>
        {c_record===undefined?null:<Card
          style={{ width: '800px',marginTop: '24px'}}
          tabList={tabListNoTitle}
          activeTabKey={this.state.noTitleKey}
          onTabChange={(key) => { this.onTabChange(key); }}
        >
          {this.recordToComponent(c_record)[this.state.noTitleKey]}
        </Card>}
      </div>
    )
  }
}

export default Form.create()(LocalPttViewer)