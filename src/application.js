
const MODE = "test"

let API_SERVER = ""
let GITHUB_OAUTH_REDIRECT_IP = ""
let GITHUB_LOGIN_URL = ""

if (MODE === "test") {
    API_SERVER = "http://localhost:8080"
    GITHUB_OAUTH_REDIRECT_IP = "http://localhost:3000"
    GITHUB_LOGIN_URL = "https://github.com/login/oauth/authorize?client_id=Iv1.4734d61391d516c5"

}
else {
    API_SERVER = "https://api9heayo.devdev.kr"
    GITHUB_OAUTH_REDIRECT_IP = "https://9heayo.devdev.kr"
    GITHUB_LOGIN_URL = "https://github.com/login/oauth/authorize?client_id=Iv1.af8070948091998f"
}

export {API_SERVER, GITHUB_OAUTH_REDIRECT_IP, GITHUB_LOGIN_URL, MODE}
