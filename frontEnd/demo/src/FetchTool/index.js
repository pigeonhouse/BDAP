import Cookies from 'js-cookie';

//'frontEndTest'
//'backEndTest'
//'production'
const mode = 'backEndTest'

export async function fetchTool(url, init) {


    if (mode === 'frontEndTest') {
        url = "https://result.eolinker.com/MSwz6fu34b763a21e1f7efa84a86a16f767a756952d0f95?uri=localhost:8888" + url;
    } else if (mode === 'backEndTest') {
        url = "http://localhost:8888" + url;
    } else if (mode === "production") {

        // 待定url前缀
        url = "https://result.eolinker.com/MSwz6fu34b763a21e1f7efa84a86a16f767a756952d0f95?uri=localhost:8888" + url;
    }

    const res = await fetch(url, init)
    const response = await res.json();
    Cookies.set("loginToken", response.token);
    console.log(response)

    return response;
}