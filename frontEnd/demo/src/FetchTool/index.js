import Cookies from 'js-cookie';

//'frontEndTest'
//'backEndTest'
//'production'
export const mode = 'backEndTest';

export async function fetchTool(url, init) {
    const token = Cookies.get('token')
    init.headers["token"] = token;

    if (mode === 'frontEndTest') {
        var newUrl = '';
        for (let i = 0; i < url.length; i++) {
            if (url[i] === '?') {
                newUrl += '&';
            } else {
                newUrl += url[i];
            }
        }
        url = "https://result.eolinker.com/MSwz6fu34b763a21e1f7efa84a86a16f767a756952d0f95?uri=localhost:1001" + newUrl;
    } else if (mode === 'backEndTest') {
        url = "http://localhost:1001" + url;
    } else if (mode === "production") {

        // 待定url前缀
        url = "https://result.eolinker.com/MSwz6fu34b763a21e1f7efa84a86a16f767a756952d0f95?uri=localhost:1001" + url;
    }

    const res = await fetch(url, init);
    console.log(res)

    if (res.status === 200) {
        if (token === undefined) {
            const response = await res.json();
            if (response.token !== undefined) {
                Cookies.set("token", response.token);
            }
            return response;
        }
        return res;
    }
}