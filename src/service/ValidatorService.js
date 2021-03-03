class ValidatorService {
    validatePwd(pwd) {
        return pwd.match(this.validatePwd_pattern());
    }

    validatePwd_pattern() {
        return /^[\w=!#$%&?-]{8,32}$/;
    }

    validateLogin(login) {
        return login.match(this.validateLogin_pattern());
    }

    validateLogin_pattern() {
        return /^[a-zA-Z0-9]{8,32}$/;
    }

    validateMatch(new1, new2) {
        return new1 === new2;
    }

    validateIP_Pattern() {
        return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    }

    getOrDefaultError(ex, def) {
        const message = ex?.response?.data?.message
        console.log(ex?.response?.data)
        return message ? message : def
    }

}

export default new ValidatorService()