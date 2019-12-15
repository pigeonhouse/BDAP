import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { DatePicker } from 'antd';
import MyEditor from './MyEditor';

function App() {
  return (
    <div style={{ margin: 200 }}>
      <MyEditor></MyEditor>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
