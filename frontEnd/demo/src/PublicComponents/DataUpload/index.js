import React from "react"
import { Upload, message, Button, Icon, Row, Col, Divider } from 'antd';





//可以用来测试
// const props = {
//     name: 'file',
//     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//     headers: {
//         authorization: 'authorization-text',
//     },
//     onChange(info) {
//         if (info.file.status !== 'uploading') {
//             console.log(info.file, info.fileList);
//         }
//         if (info.file.status === 'done') {
//             message.success(`${info.file.name} file uploaded successfully`);
//         } else if (info.file.status === 'error') {
//             message.error(`${info.file.name} file upload failed.`);
//         }
//     },
// };

class DataUpload extends React.Component {

    getCookieValue = (name) => {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        return arr;
    }

    render() {
        const props = {
            name: 'file',
            method: 'UPDATE',
            action: 'localhost:8888/hdfs/',
            headers: {
                "Content-Type": 'multipart/form-data',
                "Cookies": this.getCookieValue("loginToken")
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        }
        return (
            <div >
                <Row>
                    <Col span={12}>
                        <Row style={{ height: 200 }}></Row>
                        <Row>
                            <Col span={2}></Col>
                            <Col span={20} style={{ height: 240, overflow: "auto" }}>
                                <Upload {...props} >
                                    <Button>
                                        <Icon type="upload" /> Click to Upload
    		                        </Button>
                                </Upload>
                            </Col>
                            <Col span={2}></Col>
                        </Row>
                    </Col>

                    <Col span={12}>可以写其他</Col>
                </Row>

            </div>
        )

    }
}
export default DataUpload;
