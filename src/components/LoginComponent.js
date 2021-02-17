import React, {Component} from 'react'
import AuthenticationService from '../service/AuthenticationService';
import {CardHeader, Card, CardBody, Col, Row} from "reactstrap";
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Checkbox from "@material-ui/core/Checkbox";
import ValidatorService from "../service/ValidatorService";

class LoginComponent extends Component {


    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
            error: {
                password: false,
                username: false,
                helperText: {
                    password: "Пароль должен быть от 8 до 32 символов",
                    username: "Логин должен быть от 8 до 32 символов (буквы и цифры)"
                }
            },
            submitEnabled: false
        }


        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.validate(event.target.name, event.target.value)
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    validate(name, value) {
        switch (name) {
            case 'username':
                this.state.error.username = !ValidatorService.validateLogin(value);
                break;
            case 'password':
                this.state.error.password = !ValidatorService.validatePwd(value);
                break;
            default:
                break;
        }
    }

    loginClicked() {
        if (ValidatorService.validateLogin(this.state.username) &&
            ValidatorService.validatePwd(this.state.password)) {
            console.log("1")
            //in28minutes,dummy
            // if(this.state.username==='in28minutes' && this.state.password==='dummy'){
            //     AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
            //     this.props.history.push(`/courses`)
            //     //this.setState({showSuccessMessage:true})
            //     //this.setState({hasLoginFailed:false})
            // }
            // else {
            //     this.setState({showSuccessMessage:false})
            //     this.setState({hasLoginFailed:true})
            // }
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
            this.props.history.push('/admin')
            // AuthenticationService
            //     .executeBasicAuthenticationService(this.state.username, this.state.password)
            //     .then(() => {
            //         AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
            //         this.props.history.push(`/courses`)
            //     }).catch(() => {
            //     this.setState({ showSuccessMessage: false })
            //     this.setState({ hasLoginFailed: true })
            // })

            // AuthenticationService
            //     .executeJwtAuthenticationService(this.state.username, this.state.password)
            //     .then((response) => {
            //         AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
            //         this.props.history.push(`/courses`)
            //     }).catch(() => {
            //         this.setState({ showSuccessMessage: false })
            //         this.setState({ hasLoginFailed: true })
            //     })
        } else {
            console.log("2")
            this.state.error.username=true;
            this.state.error.password=true;
            this.forceUpdate();
        }
    }

    render() {
        return (
            <>

                <div className="content">
                    <Row className="justify-content-center">
                        <Col xl="4" lg="5" md="5">
                            <Card>
                                <CardHeader>
                                    {this.state.hasLoginFailed &&
                                    <div className="alert alert-warning">Invalid Credentials</div>}
                                    {this.state.showSuccessMessage && <div>Login Successful</div>}
                                </CardHeader>
                                <CardBody>
                                    <form noValidate>
                                        <TextField
                                            error={this.state.error.username}
                                            helperText={this.state.error.username ? this.state.error.helperText.username : ''}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Логин"
                                            name="username"
                                            autoComplete="username"
                                            autoFocus
                                        />
                                        <TextField
                                            error={this.state.error.password}
                                            helperText={this.state.error.password ? this.state.error.helperText.password : ''}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Пароль"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox value="remember" color="primary"/>}
                                            label="Запомнить меня"
                                        />
                                        <Button
                                            disabled={this.state.error.username || this.state.error.password}
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            onClick={this.loginClicked}
                                        >
                                            Войти
                                        </Button>
                                        <Grid container>
                                            <Grid item xs>
                                                <Link href="#" variant="body2">
                                                    Забыли пароль?
                                                </Link>
                                            </Grid>
                                            <Grid item>
                                                <Link href="#" variant="body2">
                                                    {"Нет аккаунта? Зарегистрироваться"}
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default LoginComponent