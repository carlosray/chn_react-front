import axios from 'axios'
import {Component} from "react";

const API_URL = process.env.REACT_APP_BACKEND_URI + "/api"
const AUTH_URL = process.env.REACT_APP_BACKEND_URI + "/auth"

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

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

    executeApiAddNew(name, ip, description) {
        return axios.post(`${API_URL}/test`, {
            name, ip, description
        })
    }

    executeApiGetAll() {
        return axios.get(`${API_URL}/test`)
    }

    executeApiDelete(id) {
        return axios.delete(`${API_URL}/test/` + id)
    }
    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        document.location.href = '/login'
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new RestService()