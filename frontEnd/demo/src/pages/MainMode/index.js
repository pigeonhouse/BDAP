import React from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Col, Button, message, notification, Icon, Tabs } from 'antd';
import { Motion, spring } from "react-motion";

import SparkRun from '../../ClusterModeComponents/SparkRunPanel';
import ExperimentPanel from '../ExperimentPanel';
import DataSetPanel from '../DataSetPanel';
import AddMenu from './AddMenu'
import JsParser from '../../PublicComponents/GenerateColumn/jsParser'
import NetworkPanel from '../Network';
import GuideModel from "./guideModel.js"

import Cookies from 'js-cookie';

import { fetchTool } from '../../FetchTool';
import styles from './index.less';

/** 
 * 登陆成功后进入的主界面，在界面的左侧点击标签可更换主页面功能
 * GuideModel为用户导引的内容
 * 
 */
const TabPane = Tabs.TabPane;
var IntroJs = require('intro.js');

class LocalMode extends React.Component {

	// 用户导引相关函数
	Intro = (key) => {
		notification.close(key)
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
			message.success('开始你的数据挖掘之旅吧！')
		}).onexit(function () {
		}).start();
	}

	state = {
		/**
		 * 判断当前界面处于何种功能的标志
		 * currentTab代表当前标签的序号，由上到下，从小到大
		 * clickTab为0表示进入当前标签下其他界面，与currentTab相等表示为当前标签下的默认界面
		 */
		currentTab: '1',
		clickTab: '1',

		// cookie中的信息
		username: '',
		password: '',
		remind: 'false',

		// 表明是否创建完session
		sessionFinish: Cookies.get('token') === undefined ? false : true,

		// 实验运行的标志
		running: false,

		connectCtrl: false,
		sliderOut: false,
		Menuvisible: 'none'
	}

	// 用户点击右上角通知栏的用户导引不再提醒后，将此选择保存到cookie中
	noRemind = (key) => {
		notification.close(key)
		let accountInfo = this.state.username + '&' + this.state.password + '&false';
		let Days = 3;
		let exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = 'accountInfo' + "=" + escape(accountInfo) + ";expires=" + exp.toGMTString()
	}

	setMenuVisible = () => {
		if (this.state.Menuvisible == 'none') {
			this.setState(
				{
					Menuvisible: this.state.Menuvisible == 'none' ? 'block' : 'none',
				}
			);
			this.setSlider();
		}
		else {
			this.setSlider();
			setTimeout(() => {
				this.setState(
					{
						Menuvisible: this.state.Menuvisible == 'none' ? 'block' : 'none',
					}
				)
			}, 750
			)
		}
	}

	setSlider = () => {
		this.setState(
			{
				sliderOut: !this.state.sliderOut
			}
		);
	}

	// 从cookies中取出username，password，remind的信息
	componentWillMount() {
		let arr, reg = new RegExp("(^| )" + 'accountInfo' + "=([^;]*)(;|$)");
		let accountInfo = ''

		if (arr = document.cookie.match(reg)) {
			accountInfo = unescape(arr[2]);
		}
		else {
			accountInfo = null;
		}
		if (Boolean(accountInfo) == false) {
			return false;
		} else {
			let userName = "";
			let passWord = "";
			let Remind = "";

			let i = new Array()
			i = accountInfo.split("&");
			userName = i[0],
				passWord = i[1],
				Remind = i[2],
				this.setState({
					username: userName,
					password: passWord,
					remind: Remind
				})
		}
	}

	// 轮询后端，发送请求，确定session是否创建成功，得到肯定回复后，将state中的sessionFinish改为true
	querySession = () => {
		if (this.state.sessionFinish === true) return;
		setTimeout(async () => {
			const init = {
				method: 'GET',
				mode: 'cors',
				headers: {
					"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
				},
				credentials: 'include'
			}

			const response = await fetchTool("/experiment-service/session/status", init);
			const res = await response.text();

			if (res === "idle") {
				notification.close('session');
				notification['success']({
					key: 'session',
					message: 'Session',
					duration: 1,
					description: 'session创建成功',
				})
				this.setState({ sessionFinish: true });
			}

			this.querySession();
		}, 1000)
	}

	componentDidMount() {
		if (this.state.sessionFinish === false &&
			this.props.location.state !== undefined) {
			this.querySession();
		}
		return;
		if (this.state.remind === 'true') {
			const key = `open${Date.now()}`;
			const btn = (
				<div>
					<Button type="primary" onClick={() => this.Intro(key)} style={{ marginRight: '10px' }}>
						需要
          			</Button>
					<Button type="primary" onClick={() => this.noRemind(key)}>
						不再提醒
          			</Button>
				</div>
			);
			notification.open({
				message: '是否需要帮助？',
				description: '点击下方的"需要"按钮，可以帮助您进行简单的引导。',
				style: {
					width: 400,
				},
				duration: 2,
				btn,
				key
			});
		}
	}

	// 点击左侧标签发生标签间的切换时触发的函数。
	tabChange = (value) => {
		this.setState({
			currentTab: value,
			clickTab: value
		})
	}

	// 同一tab下，进入内层时，将clickTab修改为0，表明进入了内层
	handleClickEnter = () => {
		this.setState({
			clickTab: "0"
		})
	}

	// 再次点击标签，将clickTab修改为与currentTab相等的情况，回到初始进入tab的状态
	handleTabClick = () => {
		this.setState({
			clickTab: this.state.currentTab
		})
	}

	// 点击运行按钮时，将running改为true，表示工作流正在运行
	onClickButtonRunning = () => {
		this.setState({
			running: true
		})
	}

	// 因执行条件不足，将running改为false，表示工作流停止运行
	stopRunning = () => {
		this.setState({
			running: false
		})
	}

	// 点击退出时，清楚token，退出mainPage
	handleSignout = () => {
		this.setState({ token: undefined });
		Cookies.remove("token");
		Cookies.remove("refreshToken");
	}

	render() {
		const token = Cookies.get('token');
		const refreshToken = Cookies.get('refreshToken');
		if (token === undefined && refreshToken === undefined) {
			return <Redirect to='/' />
		}

		//#343941  黑色
		//#509ee3  蓝色
		//#a88bc3  紫色
		const backgroundColor = '#343941'
		const offset = -500
		const initialX = spring(this.state.sliderOut ? offset : 0, {
			stiffness: 170,
			damping: 35
		});
		return (
			<div style={{ width: "100%" }}>
				<div className={styles.editor}>
					{/* 导航条 */}
					<Row
						style={{ lineHeight: '40px', height: '40px', backgroundColor: backgroundColor, color: "white" }}
					>
						<Col span={1}>
							<Button style={{ border: 0, backgroundColor: backgroundColor, color: "#ddd" }} size="large">
								<Icon type="bars" style={{ fontSize: 20 }} />
							</Button>
						</Col>
						<Col span={19}>
							<Button style={{ border: 0, backgroundColor: backgroundColor, color: "#ddd", fontSize: 18, fontFamily: 'consolas' }}>BigDataPlayground Preview-Mode</Button>
						</Col>
						{/* 用户导引按钮 */}
						<Col span={1}>
							<GuideModel/>
						</Col>
						<Col span={1}>
							<a href="https://www.yuque.com/ddrid/tx7z84" target="_blank">
								<Button style={{ border: 0, backgroundColor: backgroundColor, color: "#ddd", fontSize: 25 }} >
									<Icon type="question-circle" data-step="5" data-intro="如果想要进一步了解详细的使用教程及组件介绍，请点击此处查看文档。" />
								</Button>
							</a>
						</Col>
						<Col span={1}>
							<Button onClick={this.handleSignout}>退出</Button>
						</Col>
						<Col span={1}></Col>
						<a href="https://github.com/pigeonhouse/BigDataPlayground" target="_blank" className={styles.githubCorner} aria-label="View source on GitHub">
							<svg
								width="45"
								height="45"
								viewBox="0 0 250 250"
								style={{
									fill: '#fff',
									color: backgroundColor,
									position: 'absolute',
									top: 0,
									border: 0,
									right: 0
								}}
								aria-hidden="true">
								<path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
								<path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style={{ transformOrigin: '130px 106px' }} className={styles.octoArm}></path>
								<path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" className={styles.octoBody}></path>
							</svg>
						</a>
					</Row>

					{/* 主界面 */}
					<Tabs
						tabPosition='left'
						activeKey={this.state.currentTab}
						className={styles.leftMenuTab}
						onChange={this.tabChange}
					>
						<TabPane
							className={styles.leftMenu}
							tab={<Icon type="credit-card"
								className={styles.iconStyle}
								onClick={this.handleTabClick}
							/>}
							key="1"
						>
							{/* 工作流实验组件 */}
							<ExperimentPanel
								refresh={this.state.refresh}
								currentTab={this.state.currentTab}
								clickTab={this.state.clickTab}
								handleClickEnter={this.handleClickEnter}
								stopRunning={this.stopRunning}
								running={this.state.running}
							/>
						</TabPane>

						<TabPane
							className={styles.leftMenu}
							tab={<Icon
								type="api"
								className={styles.iconStyle}
								onClick={this.handleTabClick}
							/>}
							key="2"
						>
							{/* 文件存储、上传下载组件 */}
							<DataSetPanel
								currentTab={this.state.currentTab}
								clickTab={this.state.clickTab}
								sessionFinish={this.state.sessionFinish}
								handleClickEnter={this.handleClickEnter}
							/>
						</TabPane>
						<TabPane
							className={styles.leftMenu}
							tab={<Icon
								type="user"
								className={styles.iconStyle}
								onClick={this.handleTabClick}
							/>}
							key="3"
						>

						</TabPane>
						<TabPane
							className={styles.leftMenu}
							tab={<Icon
								type="global"
								className={styles.iconStyle}
								onClick={this.handleTabClick}
							/>}
							key="4"
						>
							<NetworkPanel
								currentTab={this.state.currentTab}
								clickTab={this.state.clickTab}
								handleClickEnter={this.handleClickEnter}
							/>

						</TabPane>
						<TabPane
							className={styles.leftMenu}
							tab={<Icon
								type="global"
								className={styles.iconStyle}
								onClick={this.handleTabClick}
							/>}
							key="5"
						>
							<JsParser></JsParser>
						</TabPane>
					</Tabs>
				</div >

				{/* footer */}
				<Motion style={{ x: initialX }}>
					{({ x }) => (
						<div style={{ position: "relative", transform: `translateY(${x}px)`, zIndex: 999 }}>
							<Row type="flex" style={{ top: 0, height: '65px', lineHeight: '65px', backgroundColor: backgroundColor }}
								data-step="4" data-intro="所有配置完成后，点击'运行'按钮开始运行整个工作流。" data-position='top'
							>
								<Col span={11}>
									<Button
										icon="plus-circle"
										onClick={this.setMenuVisible}
										style={{ border: 0, backgroundColor: '#343941', color: "#ddd", fontSize: 25, height: "65px", textAlign: "left " }}
									>
										添加
		        					</Button>
								</Col>
								<Col span={2}>
									<SparkRun
										onClickButtonRunning={this.onClickButtonRunning}
										currentTab={this.state.currentTab}
										clickTab={this.state.clickTab}
										sessionFinish={this.state.sessionFinish}
										running={this.state.running}
									></SparkRun>
								</Col>
								<Col span={11}></Col>
							</Row>
							<div className={styles.bottomMenu} style={{ backgroundColor: backgroundColor, display: this.state.Menuvisible }}>
							</div>
						</div>
					)}
				</Motion>
			</div>

		);
	}
}

export default LocalMode;
