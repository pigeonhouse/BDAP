import Cookies from 'js-cookie';

//'frontEndTest'
//'backEndTest'
//'production'
const mode = 'frontEndTest'

export async function fetchToolTest(url, init) {
    init.headers["token"] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsaXZ5QWRkciI6IjEwLjEwNS4yMjIuOTA6ODk5OCIsImF1ZCI6IjIwMTcyMTE1MTEiLCJzZXNzaW9uSWQiOjk3LCJ1c2VySWQiOiIyMDE3MjExNTExIn0.QpSpOUcQXYtMraZCQp4eWuMH624glPu8tKUNyJe3hnU";

    if (mode === 'frontEndTest') {
        url = "https://result.eolinker.com/MSwz6fu34b763a21e1f7efa84a86a16f767a756952d0f95?uri=localhost:1001" + url;
    } else if (mode === 'backEndTest') {
        url = "http://localhost:8888" + url;
    } else if (mode === "production") {

        // 待定url前缀
        url = "https://result.eolinker.com/MSwz6fu34b763a21e1f7efa84a86a16f767a756952d0f95?uri=localhost:1001" + url;
    }

    const res = await fetch(url, init)
    const response = await res.json();
    Cookies.set("loginToken", response.token);
    console.log(response)

    return response;
}