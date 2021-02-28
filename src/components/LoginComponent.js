import React, {Component} from 'react'
import RestService from '../service/RestService.js';
import {CardHeader, Card, CardBody, Col, Row, Alert} from "reactstrap";
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import ValidatorService from "../service/ValidatorService";

class LoginComponent extends Component {


    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            isShowAlert: false,
            alertSeverity: 'info',
            alertMessage: 'Что-то произошло.. :)',
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

    showAlert(message, severity, delay) {
        this.setState({isShowAlert: true});
        this.setState({alertMessage: message});
        this.setState({alertSeverity: severity});
        setTimeout(() => {
            this.setState({
                isShowAlert: false
            })
        }, delay)

    }

    loginClicked() {
        if (ValidatorService.validateLogin(this.state.username) &&
            ValidatorService.validatePwd(this.state.password)) {

            RestService
                .executeJwtAuthenticationService(this.state.username, this.state.password)
                .then((response) => {
                    const token = response?.data?.jwt;
                    if (token) {
                        RestService.registerSuccessfulLoginForJwt(this.state.username, response.data.jwt)
                        this.showAlert("Успешная авторизация", "success", 2000)
                        setTimeout(() => {
                            this.props.history.push(`/admin`)
                        }, 2000)
                    }
                    else {
                        throw new Error("Нет токена в ответе от сервера")
                    }
                })
                .catch((ex) => {
                    this.showAlert(ValidatorService.getOrDefaultError(ex), "warning", 6000)
                })
        } else {
            this.state.error.username = true;
            this.state.error.password = true;
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
                                    {this.state.isShowAlert &&
                                    <Alert color={this.state.alertSeverity}>
                                        {this.state.alertMessage}
                                    </Alert>}
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
                                                <Link href="/register" variant="body2">
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