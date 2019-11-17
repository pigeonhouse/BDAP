import React from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';

const text = (
	<p style={{ paddingLeft: 24 }}>
		A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
		as a welcome guest in many households across the world.
	</p>
);

class CollapseTable extends React.Component {
	render() {
		return (
			<div style={{ height: "300px" }} >
				{this.props.statistic.map((item, index) => {
					console.log(item)
					return (
						<Row>
							<Col span={2}></Col>
							<Col span={18} >
								<p style={{ color: 'rgba(0,0,0,0.45)', fontSize: 18, marginBottom: 4 }} >{item.title}</p>
								<p style={{ color: 'rgba(0,0,0,0.85)', fontSize: 24 }} >{item.value.toFixed(8)}</p>
							</Col>
							<Col span={4} >
								<Tooltip title={text}>
									<Icon type="question-circle"></Icon>
								</Tooltip>
							</Col>
						</Row>
					);
				})}
			</div>
		);
	}
}

export default CollapseTable;