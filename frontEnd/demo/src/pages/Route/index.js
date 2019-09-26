import React from 'react';
import { Button, Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
var IntroJs = require('intro.js')
/**
 * 选择版本界面
 */
class RouteMode extends React.Component {
	startIntro = () => {
		IntroJs().setOptions({
			prevLabel: "上一步",
			nextLabel: "下一步",
			skipLabel: "跳过",
			doneLabel: "结束",
			showProgress: true,
			exitOnEsc: true,
			showButtons: true,
			showStepNumbers: true,
			keyboardNavigation: true,
			showBullets: false,
		}).oncomplete(function () {
		}).onexit(function () {
		}).start();
	}

	render() {
		return (
			<div>
				<Row>
					<Row id='root' data-step="1" data-intro='开始引导!'>
						<Card bordered={true} style={{ width: '100%' }} >
							<Button icon="question" shape='circle' onClick={() => this.startIntro()}></Button>
						</Card>
					</Row>
					<Col span={8}>
						<div data-step="2" data-intro='单机模式'>

							{/* 将版本信息通过link传递 */}
							<Link to={{
								pathname: '/mainPage',
								state: { type: 'local' }
							}}>
								<Button style={{ height: 200, width: 400, margin: 60, fontSize: 25 }}>
									LOCAL MODE
                				</Button>
							</Link>
						</div>
					</Col>

					<Col span={8}>
						<div data-step="3" data-intro='本地模式'>
							<Link to={{
								pathname: '/mainPage',
								state: { type: 'python' }
							}}>
								<Button style={{ height: 200, width: 400, margin: 60, fontSize: 25 }}>
									PYTHON MODE
                				</Button>
							</Link>
						</div>
					</Col>

					<Col span={8}>
						<div data-step="4" data-intro='集群模式'>
							<Link to={{
								pathname: '/mainPage',
								state: { type: 'cluster' }
							}}>
								<Button style={{ height: 200, width: 400, margin: 60, fontSize: 25 }}>
									CLUSTER MODE
                				</Button>
							</Link>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}

export default RouteMode;
