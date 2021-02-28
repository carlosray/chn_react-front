import React, {Component} from 'react'
import RestService from '../service/RestService.js';
import {CardHeader, Card, CardBody, Col, Row, Alert, FormGroup, CardFooter, Button} from "reactstrap";
import ValidatorService from "../service/ValidatorService";
import {AvField, AvForm} from "availity-reactstrap-validation";

class RegisterComponent extends Component {


    constructor(props) {
        super(props)

        this.state = {
            isShowAlert: false,
            alertSeverity: 'info',
            alertMessage: 'Что-то произошло.. :)',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event, errors, values) {
        if (Array.isArray(errors) && errors.length) {
            console.log(JSON.stringify(errors, null, 2))
        }
        else {
            this.tryRegister(values)
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

    tryRegister(values) {
        RestService
            .executeRegisterService(values)
            .then((response) => {
                const message = response?.data?.message;
                this.showAlert(message ? message : "Успешная регистрация", "success", 2000)
                setTimeout(() => {
                    this.props.history.push(`/login`)
                }, 2000)
            })
            .catch((ex) => {
                this.showAlert(ValidatorService.getOrDefaultError(ex), "warning", 6000)
            })
    }

    render() {
        return (
            <>

                <div className="content">
                    <Row className="justify-content-center">
                        <Col xl="6" lg="7" md="8">
                            <Card>
                                <AvForm onSubmit={this.handleSubmit}>
                                <CardHeader>
                                    {this.state.isShowAlert &&
                                    <Alert color={this.state.alertSeverity}>
                                        {this.state.alertMessage}
                                    </Alert>}
                                    <h2 align={"center"}>Регистрация</h2>
                                </CardHeader>
                                <CardBody>

                                        <Row>
                                            <Col md="6">
                                                <FormGroup>
                                                    <AvField
                                                        required
                                                        name="username"
                                                        label="Логин *"
                                                        placeholder="Username"
                                                        type="text"
                                                        validate={{
                                                            required: {value: true, errorMessage: 'Поле не должно быть пустым'},
                                                            pattern: {
                                                                value: ValidatorService.validateLogin_pattern(),
                                                                errorMessage: "Логин должен быть от 8 до 32 символов (буквы и цифры)"
                                                            }
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col className="pl-md-1" md="6">
                                                <FormGroup>
                                                    <AvField
                                                        name="email"
                                                        label="Email *"
                                                        required
                                                        placeholder="mike@email.com"
                                                        type="email"
                                                        errorMessage="Некорректный формат Email"/>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="6">
                                                <AvField
                                                    name="password"
                                                    label="Пароль *"
                                                    placeholder="Пароль не меньше 8 символов"
                                                    type="password"
                                                    required
                                                    validate={{
                                                        required: {value: true, errorMessage: 'Поле не должно быть пустым'},
                                                        pattern: {
                                                            value: ValidatorService.validatePwd_pattern(),
                                                            errorMessage: 'Пароль должен быть от 8 символов'
                                                        }
                                                    }}/>
                                            </Col>
                                            <Col className="pl-md-1" md="6">
                                                <AvField
                                                    name="password_confirm"
                                                    label="Пароль (повторить) *"
                                                    placeholder="Повторить"
                                                    type="password"
                                                    required
                                                    validate={{
                                                        required: {value: true, errorMessage: 'Поле не должно быть пустым'},
                                                        match: {value: 'password', errorMessage: 'Пароли должны совпадать'}
                                                    }}/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pr-md-1" md="6">
                                                <FormGroup>
                                                    <label>Имя *</label>
                                                    <AvField
                                                        required
                                                        name="firstName"
                                                        placeholder={"Иван"}
                                                        type="text"
                                                        errorMessage="Поле не должно быть пустым"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col className="pl-md-1" md="6">
                                                <FormGroup>
                                                    <label>Фамилия</label>
                                                    <AvField
                                                        name="lastName"
                                                        placeholder={"Иванов"}
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pr-md-1" md="4">
                                                <FormGroup>
                                                    <label>Город</label>
                                                    <AvField
                                                        name="city"
                                                        placeholder="Moscow"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col className="px-md-1" md="4">
                                                <FormGroup>
                                                    <label>Страна</label>
                                                    <AvField
                                                        name="country"
                                                        placeholder="Russia"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md="4">
                                                <FormGroup>
                                                    <label>Компания</label>
                                                    <AvField
                                                        name="company"
                                                        placeholder="Company"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label>Дополнительная информация</label>
                                                    <AvField
                                                        name="info"
                                                        cols="80"
                                                        placeholder="Ака, ака, ак-47!
                                                                У щет мэн, гат дем"
                                                        rows="4"
                                                        type="textarea"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                </CardBody>
                                <CardFooter>
                                    <Row>
                                        <Col md="8">
                                                <Button variant="contained" color="info" type="submit" >
                                                    Зарегистрироваться
                                                </Button>
                                        </Col>
                                        <Col md="3">
                                            <Button variant="contained" color="dark" href={"/login"} >
                                                Назад
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardFooter>
                            </AvForm>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default RegisterComponent