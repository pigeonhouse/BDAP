import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ModuleAddingForm from './ModuleForm';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<ModuleAddingForm />, document.getElementById('root'));

serviceWorker.unregister();
