class ValidatorService {
    validatePwd(pwd) {
        return pwd.match(this.validatePwd_pattern());
    }

    validatePwd_pattern() {
        return /^[\w=!#$%&?-]{8,32}$/;
    }

    validateLogin(login) {
        return login.match(/^[a-zA-Z0-9]{8,32}$/);
    }

    validateMatch(new1, new2) {
        return new1 === new2;
    }

    validateIP_Pattern() {
        return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    }

}

export default new ValidatorService()