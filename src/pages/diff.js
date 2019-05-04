import { Component } from 'react'
import style from 'react-gh-like-diff/lib/diff2html.min.css'
import { connect } from 'dva'
import {
    Form, Icon, Input, Button, Row, Card, Col, Statistic
} from 'antd';
import { ReactGhLikeDiff } from 'react-gh-like-diff'
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
}, {
    key: 'diff',
    tab: 'Code Diff'
}];

@connect(({ git }) => ({ git: git }))
class Diff extends Component {
    state = {
        noTitleKey: 'params',
    }

    onTabChange = (key) => {
        this.setState({ noTitleKey: key });
    }

    genRecordOptions = (title, axisx, axisy, record) => {
        const points = [{ type: "spline", dataPoints: record.map((val, index) => { return { "x": index, "y": val } }) }]
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
                minimum: min - 0.01,
                maximum: max + 0.01
            },
            data: points
        }
    }

    genContrastOptions = (title, axisx, axisy, a_record, b_record, a_name, b_name) => {
        const a_points = { type: "spline", name: a_name, showInLegend: true, dataPoints: a_record.map((val, index) => { return { "x": index, "y": val } }) }
        const b_points = { type: "spline", name: b_name, showInLegend: true, dataPoints: b_record.map((val, index) => { return { "x": index, "y": val } }) }
        const record = a_record.concat(b_record)
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
                minimum: min - 0.01,
                maximum: max + 0.01
            },
            data: [a_points,b_points]
        }
    }

    DiffToComponent = (diff) => {
        // const { epoches, batch_size, learning_rate, acc, loss, acc_record, loss_record } = r
        // const acc_options = this.genRecordOptions("Acc Curve", "Output Index", "Acc Rate", acc_record)
        // const loss_options = this.genRecordOptions("Loss Curve", "Output Index", "Loss Rate", loss_record)
        const { text } = diff
        const a = diff.a_record
        const b = diff.b_record
        // return {
        //     params: (<div>
        //         <Row gutter={16}>
        //             <Col span={12}>
        //                 <Card><Statistic title="Accuracy" value={acc} formatter={(value) => <h2 style={{ color: '#3f8600' }}>{value}</h2>} /></Card>
        //             </Col>
        //             <Col span={12}>
        //                 <Card><Statistic title="Loss" value={loss} formatter={(value) => <h2 style={{ color: '#cf1322' }}>{value}</h2>} /></Card>
        //             </Col>
        //         </Row>
        //         <Row gutter={16} style={{ marginTop: '24px' }}>
        //             <Col span={8}>
        //                 <Card><Statistic title="Epoches" value={epoches} formatter={(value) => <h3 style={{ color: '#fffff' }}>{value}</h3>} /></Card>
        //             </Col>
        //             <Col span={8}>
        //                 <Card><Statistic title="Learning Rate" value={learning_rate} formatter={(value) => <h3 style={{ color: '#fffff' }}>{value}</h3>} /></Card>
        //             </Col>
        //             <Col span={8}>
        //                 <Card><Statistic title="Batch Size" value={batch_size} formatter={(value) => <h3 style={{ color: '#fffff' }}>{value}</h3>} /></Card>
        //             </Col>
        //         </Row>
        //     </div>),
        // acc: (<div style={{ width: '90%' }}>
        //     <CanvasJSChart options={acc_options} />
        // </div>),
        //     loss: (<div style={{ width: '90%' }}>
        //         <CanvasJSChart options={loss_options} />
        //     </div>)
        // }
        return {
            params: (<div>
                <Card title={a.id}>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Card><Statistic title="Accuracy" value={a.acc} formatter={(value) => <h3 style={{ color: '#3f8600' }}>{value}</h3>} /></Card>
                        </Col>
                        <Col span={6}>
                            <Card><Statistic title="Loss" value={a.loss} formatter={(value) => <h3 style={{ color: '#cf1322' }}>{value}</h3>} /></Card>
                        </Col>
                        <Col span={4}>
                            <Card><Statistic title="Epoches" value={a.epoches} formatter={(value) => <h3 style={{ color: '#fffff' }}>{value}</h3>} /></Card>
                        </Col>
                        <Col span={4}>
                            <Card><Statistic title="Learning Rate" value={a.learning_rate} formatter={(value) => <h3 style={{ color: '#fffff' }}>{value}</h3>} /></Card>
                        </Col>
                        <Col span={4}>
                            <Card><Statistic title="Batch Size" value={a.batch_size} formatter={(value) => <h3 style={{ color: '#fffff' }}>{value}</h3>} /></Card>
                        </Col>
                    </Row>
                </Card>
                <Card title={b.id}>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Card><Statistic title="Accuracy" value={b.acc} formatter={(value) => <h3 style={{ color: '#3f8600' }}>{value}</h3>} /></Card>
                        </Col>
                        <Col span={6}>
                            <Card><Statistic title="Loss" value={b.loss} formatter={(value) => <h3 style={{ color: '#cf1322' }}>{value}</h3>} /></Card>
                        </Col>
                        <Col span={4}>
                            <Card><Statistic title="Epoches" value={b.epoches} formatter={(value) => <h3 style={{ color: '#fffff' }}>{value}</h3>} /></Card>
                        </Col>
                        <Col span={4}>
                            <Card><Statistic title="Learning Rate" value={b.learning_rate} formatter={(value) => <h3 style={{ color: '#fffff' }}>{value}</h3>} /></Card>
                        </Col>
                        <Col span={4}>
                            <Card><Statistic title="Batch Size" value={b.batch_size} formatter={(value) => <h3 style={{ color: '#fffff' }}>{value}</h3>} /></Card>
                        </Col>
                    </Row>
                </Card>
            </div>),
            acc: (<Row gutter={16}>
                <Col span={8}>
                    <div style={{ width: '90%' }}>
                        <CanvasJSChart options={this.genRecordOptions(a.id, "Output Index", "Acc Rate", a.acc_record)} />
                    </div>
                </Col>
                <Col span={8}>
                    <div style={{ width: '90%' }}>
                        <CanvasJSChart options={this.genRecordOptions(b.id, "Output Index", "Acc Rate", b.acc_record)} />
                    </div>
                </Col>
                <Col span={8}>
                    <div style={{ width: '90%' }}>
                        <CanvasJSChart options={this.genContrastOptions("contrast", "Output Index", "Acc Rate", a.acc_record, b.acc_record, a.id, b.id)} />
                    </div>
                </Col>
            </Row>),
            loss:          (<Row gutter={16}>
                <Col span={8}>
                    <div style={{ width: '90%' }}>
                        <CanvasJSChart options={this.genRecordOptions(a.id, "Output Index", "Loss Rate", a.loss_record)} />
                    </div>
                </Col>
                <Col span={8}>
                    <div style={{ width: '90%' }}>
                        <CanvasJSChart options={this.genRecordOptions(b.id, "Output Index", "Loss Rate", b.loss_record)} />
                    </div>
                </Col>
                <Col span={8}>
                    <div style={{ width: '90%' }}>
                        <CanvasJSChart options={this.genContrastOptions("contrast", "Output Index", "Loss Rate", a.loss_record, b.loss_record, a.id, b.id)} />
                    </div>
                </Col>
            </Row>),
            diff: (<div className={style} style={{ overflow: 'scroll', height: '600px' }}>
                <ReactGhLikeDiff diffString={text} />
            </div>)
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch } = this.props
        this.props.form.validateFields((err, values) => {
            if (!err) {
                dispatch({ type: "git/fetchDiff", payload: values })
            }
        });
    }

    render() {
        const { diff } = this.props.git
        const {
            getFieldDecorator
        } = this.props.form;
        return (
            <div >
                <Row>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator('commit1', {
                                rules: [{ required: true, message: 'input commit1' }],
                            })(
                                <Input prefix={<Icon type="code" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Commit" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('commit2', {
                                rules: [{ required: true, message: 'input commit2' }],
                            })(
                                <Input prefix={<Icon type="code" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Commit" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                Diff
                            </Button>
                        </Form.Item>
                    </Form>
                </Row>
                <Row style={{ marginTop: 24 }}>
                    {diff === undefined ? null : <Card
                        tabList={tabListNoTitle}
                        activeTabKey={this.state.noTitleKey}
                        onTabChange={(key) => { this.onTabChange(key); }}
                    >
                        {this.DiffToComponent(diff)[this.state.noTitleKey]}
                    </Card>}
                </Row>
            </div>
        );
    }
}
const GhDiff = Form.create()(Diff)
export default GhDiff

// {
//     diffText===undefined?(<div className={style}>
//         <ReactGhLikeDiff past="" current=""/>
//     </div>):(<div className={style}>
//         <ReactGhLikeDiff diffString={diffText}/>
//     </div>)
// }