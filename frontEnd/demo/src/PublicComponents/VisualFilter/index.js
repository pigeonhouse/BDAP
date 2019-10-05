import React, { Fragment } from 'react';
import { Row, Col, Button, Modal } from 'antd';

import LabelSelect from './labelSelect.js';
import OperateSelect from './operateSelect.js';
import TagVisual from './tagVisual.js';

class Filter extends React.Component {

    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <Fragment>
                <Button onClick={this.showModal}>
                    Filter
                </Button>
                <Modal
                    title="Filter"
                    width={520}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Row>
                        <Col span={12} style={{ paddingLeft:'5%', paddingRight: '5%' }} >
                            <LabelSelect></LabelSelect>
                            <OperateSelect></OperateSelect>
                        </Col>
                        <Col span={12} >
                            <TagVisual></TagVisual>
                        </Col>
                    </Row>
                </Modal>
            </Fragment>
        );
    }
}

export default Filter;