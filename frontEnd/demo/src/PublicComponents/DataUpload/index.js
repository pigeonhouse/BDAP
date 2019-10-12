import React from "react"
import { Upload, message, Button, Icon } from 'antd';

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
            action: 'http://localhost:8888/hdfs/upload',
            headers: {
                Cookie: this.getCookieValue("loginToken")
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
            <div style ={{marginLeft:20,marginTop:20}}>
                <Upload {...props}>
                    <Button type="primary">
                        <Icon type="upload" /> Click to Upload
    		        </Button>
                </Upload>
            </div>
        )

    }
}
export default DataUpload;
