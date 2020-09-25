import Cookies from 'js-cookie';
/***
 * 存放与后端交互的函数fetchTool，负责前后端交互时发送请求信息，并将后端响应的结果返回。
 */

//'frontEndTest'
//'backEndTest'
//'production'
export const mode = 'backEndTest';
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
/**
 * 将init作为属性，向url发送fetch请求，根据返回的状态码刷新token，返回请求结果  
 * @param {string} url 向后端发送请求所用的url
 * @param {object} init 包括请求类型，请求头（headers）等参数
 */
export async function fetchTool(url, init) {
    var newUrl = '';

    // 拿到Cookies中存的token，放入init中
    const token = Cookies.get('token');
    const refreshToken = Cookies.get('refreshToken');
    init.headers["token"] = token;
    
    ///获取本机ip///
    

    // 根据mode的不同（包括三种类型frontEndTest，backEndTest以及production），将url改为对应的newUrl
    if (mode === 'frontEndTest') {
        var frontUrl = '';
        for (let i = 0; i < url.length; i++) {
            if (url[i] === '?') {
                frontUrl += '&';
            } else {
                frontUrl += url[i];
            }
        }
        newUrl = "https://result.eolinker.com/MSwz6fu34b763a21e1f7efa84a86a16f767a756952d0f95?uri=localhost:1001" + frontUrl;
    } else if (mode === 'backEndTest') {
        newUrl = "http://"+getNetworkIp()+":1001" + url;
    } else if (mode === "production") {

        // 待定url前缀
        newUrl = "https://result.eolinker.com/MSwz6fu34b763a21e1f7efa84a86a16f767a756952d0f95?uri=localhost:1001" + url;
    }

    // 通过fetch函数向后端发送请求
    const res = await fetch(newUrl, init);
    console.log(res)

    /**
     * 根据fetch返回结果的status值，刷新token及返回结果
     * 1. status == 200，若Cookies并未存储token及refreshToken，则返回的
     *    accessToken和refreshToken作为token及refreshToken放入Cookies中，
     *    返回请求结果。
     * 2. status == 401，则使用refreshAccessToken函数向后端发送重新获取token的请求，
     *    a.若新请求得到的status == 200，表明拿到了正确的token，对accessToken进行刷新，
     *      调用fetchTool再次发送请求。
     *    b.若status == 403，表明会话超时，移除token，刷新界面。
     */
    if (res.status === 200) {
        if (token === undefined && refreshToken === undefined) {
            const response = await res.json();
            Cookies.set("token", response.accessToken);
            Cookies.set("refreshToken", response.refreshToken);
            return response;
        }
        return res;
    } else if (res.status === 401) {
        const response = await refreshAccessToken();
        if (response.status === 200) {
            const accessToken = await response.text();
            Cookies.set("token", accessToken);
            console.log("刷新token");
            return await fetchTool(url, init);
        } else if (response.status === 403) {
            Cookies.remove("token");
            Cookies.remove("refreshToken");
            window.location.reload(true);
            return response;
        }
    }
    return res.status;
}

/**
 * 获取刷新token的函数
 */
async function refreshAccessToken() {
    const refreshToken = Cookies.get('refreshToken');
    const init = {
        method: 'GET',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "refreshToken": refreshToken
        },
    }
    var url = '/login-service/access-token';

    if (mode === 'frontEndTest') {
        url = "https://result.eolinker.com/MSwz6nfu34b763a21e1f7efa84a86a16f767a756952d0f95?uri=localhost:1001" + newUrl;
    } else if (mode === 'backEndTest') {
        url = "http://"+getNetworkIp()+":1001" + url;
    } else if (mode === "production") {
        // 待定url前缀
        url = "https://result.eolinker.com/MSwz6fu34b763a21e1f7efa84a86a16f767a756952d0f95?uri=localhost:1001" + url;
    }

    const res = await fetch(url, init);
    if (res.status === 200) {
        return res;
    } else if (res.status === 403) {
        return res;
    }
}       