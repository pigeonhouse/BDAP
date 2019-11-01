import Cookies from 'js-cookie';

//'frontEndTest'
//'backEndTest'
//'production'
const mode = 'backEndTest';
var token = '';

export async function fetchTool(url, init) {
    init.headers["token"] = token;

    if (mode === 'frontEndTest') {
        url = "https://result.eolinker.com/MSwz6fu34b763a21e1f7efa84a86a16f767a756952d0f95?uri=localhost:1001" + url;
    } else if (mode === 'backEndTest') {
        url = "http://localhost:1001" + url;
    } else if (mode === "production") {

        // 待定url前缀
        url = "https://result.eolinker.com/MSwz6fu34b763a21e1f7efa84a86a16f767a756952d0f95?uri=localhost:1001" + url;
    }

    const res = await fetch(url, init);

    if (res.status === 200) {
        if (token === '') {
            const response = await res.json();
            token = response.token;
            return response;
        }
        // Cookies.set("loginToken", res.token);
        return res;
    }
    // else return await res.text();
}