const path = require('path');
const { merge } = require('lodash');
const baseConfig = require('./webpack.config.base');

const mode = 'development';

const os = require('os');
 
function getNetworkIp() {
	let needHost = ''; // 打开的host
	try {
		// 获得网络接口列表
		let network = os.networkInterfaces();
		for (let dev in network) {
			let iface = network[dev];
			for (let i = 0; i < iface.length; i++) {
				let alias = iface[i];
				if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
					needHost = alias.address;
				}
			}
		}
	} catch (e) {
		needHost = 'localhost';
	}
	return needHost;
}
const entry = {
  bundle: path.resolve(__dirname, '..', 'demo/src/index.js'),
};

const alias = {
  '@src': path.resolve(__dirname, '..', 'src'),
};

const externals = {
  'react-dom': {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom',
  },
  'react-router-dom': {
    root: 'ReactRouterDOM',
    commonjs: 'react-router-dom',
    commonjs2: 'react-router-dom',
    amd: 'react-router-dom',
  },
  antd: {
    root: 'antd',
    commonjs: 'antd',
    commonjs2: 'antd',
    amd: 'antd',
  },
};

const devtool = 'cheap-module-eval-source-map';

const devServer = {
  contentBase: path.resolve(__dirname, '..', 'demo'),
  publicPath: '/dist',
  disableHostCheck: true,
  host:getNetworkIp(),
  port:8080
};

const output = {
  path: path.resolve(__dirname, '..', 'demo/dist'),
  filename: '[name].js',
  libraryTarget: 'umd',
};

module.exports = merge(baseConfig, {
  mode,
  entry,
  resolve: {
    alias,
  },
  externals,
  devtool,
  devServer,
  output,
  node: {
    fs: 'empty'
}
});
