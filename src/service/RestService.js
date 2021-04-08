import axios from 'axios'

const API_URL = process.env.REACT_APP_BACKEND_URI + "/api"
const AUTH_URL = process.env.REACT_APP_BACKEND_URI + "/auth"

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
export const TOKEN_SESSION_ATTRIBUTE_NAME = 'jwtToken'

class RestService {

    executeJwtAuthenticationService(username, password) {
        return axios.post(`${AUTH_URL}/login`, {
            username,
            password
        })
    }

    executeRegisterService(values) {
        return axios.post(`${AUTH_URL}/register`, values)
    }

    executeApiAddNew(values) {
        return axios.post(`${API_URL}/subscription`, values)
    }

    executeApiGetAll(withStatus) {
        return axios.get(`${API_URL}/subscription?withStatus=`+withStatus)
    }

    executeApiDelete(id) {
        return axios.delete(`${API_URL}/subscription/` + id)
    }

    executeApiUserInfo() {
        return axios.get(`${API_URL}/user`)
    }

    executeSearch(type, value) {
        return axios.get(`${API_URL}/search?type=`+type+`&value=`+value)
    }

    executeCount() {
        return axios.get(`${API_URL}/count`)
    }

    executeApiSaveUserInfo(values) {
        return axios.post(`${API_URL}/user`, values)
    }

    registerSuccessfulLoginForJwt(username, token) {
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        localStorage.setItem(TOKEN_SESSION_ATTRIBUTE_NAME, token)
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }

    logout() {
        localStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        document.location.href = '/login'
    }

    isUserLoggedIn() {
        let user = localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {
        let user = localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }

    setupAxiosInterceptors() {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = this.createJWTToken(localStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME))
                }
                return config
            }
        )
        axios.interceptors.response.use(
            (response) => {
                if (response.status !== 401) {

                }
                return response;
            },
            error => {
                if (error.response.status === 401) {
                    this.logout()
                } else {
                    return Promise.reject(error)
                }
            });
    }
}

export default new RestService()