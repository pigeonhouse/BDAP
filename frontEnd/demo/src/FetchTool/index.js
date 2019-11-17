import Cookies from 'js-cookie';

//'frontEndTest'
//'backEndTest'
//'production'
export const mode = 'backEndTest';

export async function fetchTool(url, init) {
    var newUrl = '';
    const token = Cookies.get('token');
    const refreshToken = Cookies.get('refreshToken');

    init.headers["token"] = token;

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
        newUrl = "http://localhost:1001" + url;
    } else if (mode === "production") {

        // 待定url前缀
        newUrl = "https://result.eolinker.com/MSwz6fu34b763a21e1f7efa84a86a16f767a756952d0f95?uri=localhost:1001" + url;
    }

    const res = await fetch(newUrl, init);
    console.log(res)

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
}

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
        url = "https://result.eolinker.com/MSwz6fu34b763a21e1f7efa84a86a16f767a756952d0f95?uri=localhost:1001" + newUrl;
    } else if (mode === 'backEndTest') {
        url = "http://localhost:1001" + url;
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