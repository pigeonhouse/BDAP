import React from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;
const text = (
	<p style={{ paddingLeft: 24 }}>
		A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
		as a welcome guest in many households across the world.
	</p>
);

class CollapseTable extends React.Component {
	render() {
		return (
			<Collapse bordered={false} style={{ height: "300px" }} >
				{this.props.statistic.map((item, index) => {
					return (
						<Panel header={item} key={index.toString()}>
							{text}
						</Panel>
					);
				})}
			</Collapse>
		);
	}
}

export default CollapseTable;