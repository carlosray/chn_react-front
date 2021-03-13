/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {Alert, Card, CardBody, CardFooter, CardHeader, Col, FormGroup, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import RestService from "../service/RestService.js";
import Button from "@material-ui/core/Button";
import ValidatorService from "../service/ValidatorService";
import {AvField, AvForm} from "availity-reactstrap-validation";
import * as classnames from "classnames";
import NotificationAlert from "react-notification-alert";

class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            password_old: '',
            password_new: '',
            password_new_confirm: '',
            city: '',
            company: '',
            country: '',
            email: '',
            firstName: '',
            info: '',
            lastName: ''
        }
        this.toggle = this.toggle.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveInfo = this.saveInfo.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangePass = this.handleChangePass.bind(this)
    }

    notify = (message, severity) => {
        let options = {};
        options = {
            place: "tc",
            message: (
                <div>
                    <div>
                        {message}
                    </div>
                </div>
            ),
            type: severity,
            icon: "tim-icons icon-bell-55",
            autoDismiss: 7
        };
        this.refs.notificationAlert.notificationAlert(options);
    };

    toggle = tab => {
        if (this.state.activeTab !== tab) this.setState({activeTab: tab});
    }

    componentDidMount() {
        RestService.executeApiUserInfo()
            .then(res => {
                this.setState({...res.data});
            })
            .catch((ex) => {
                this.handleShowProfileAlert(ValidatorService.getOrDefaultError(ex, "Ошибка при получении пользовательской инфо"), "warning", 3000)
            })
    }


    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleSubmit(event, errors, values) {
        if (Array.isArray(errors) && errors.length) {
            console.log(JSON.stringify(errors, null, 2))
        } else {
            this.saveInfo(values)
        }
    }

    saveInfo(values) {
        RestService.executeApiSaveUserInfo(values)
            .then(res => {
                this.handleShowProfileAlert("Пользователь успешно сохранен", "success", 3000);
            })
            .catch((ex) => {
                this.handleShowProfileAlert(ValidatorService.getOrDefaultError(ex, "Ошибка! Пользователь не сохранен"), "warning", 3000)
            });
    }

    handleChangePass() {
        this.setState({
            password_old: '',
            password_new: '',
            password_new_confirm: ''
        })
        this.handleShowPassAlert("Успешно изменен пароль", "success")
    };

    handleShowPassAlert(message, severity) {
        this.notify(message, severity);
    }

    handleShowProfileAlert(message, severity) {
        this.notify(message, severity);
    }

    render() {
        return (
            <>
                <div className="content">
                    <div className="react-notification-alert-container">
                        <NotificationAlert ref="notificationAlert" />
                    </div>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({active: this.state.activeTab === '1'})}
                                onClick={() => {
                                    this.toggle('1');
                                }}
                            >
                                Основная информация
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({active: this.state.activeTab === '2'})}
                                onClick={() => {
                                    this.toggle('2');
                                }}
                            >
                                Смена пароля
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col md="8">
                                    <Card>
                                        <CardHeader>
                                        </CardHeader>
                                        <AvForm onSubmit={this.handleSubmit}>
                                            <CardBody>
                                                <Row>
                                                    <Col md="4">
                                                        <FormGroup>
                                                            <label>Логин</label>
                                                            <AvField
                                                                name="username"
                                                                disabled
                                                                value={RestService.getLoggedInUserName()}
                                                                placeholder="Username"
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pl-md-1" md="4">
                                                        <FormGroup>
                                                            <AvField
                                                                name="email"
                                                                label="Email"
                                                                required
                                                                placeholder="mike@email.com"
                                                                value={this.state.email}
                                                                type="email"
                                                                errorMessage="Некорректный Email"/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <ColoredLine color="LightSlateGray"/>
                                                <Row>
                                                    <Col className="pr-md-1" md="6">
                                                        <FormGroup>
                                                            <label>Имя</label>
                                                            <AvField
                                                                name="firstName"
                                                                value={this.state.firstName}
                                                                placeholder={"Иван"}
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pl-md-1" md="6">
                                                        <FormGroup>
                                                            <label>Фамилия</label>
                                                            <AvField
                                                                name="lastName"
                                                                value={this.state.lastName}
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
                                                                value={this.state.city}
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
                                                                value={this.state.country}
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
                                                                value={this.state.company}
                                                                placeholder="Company"
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md="8">
                                                        <FormGroup>
                                                            <label>Дополнительная информация</label>
                                                            <AvField
                                                                name="info"
                                                                value={this.state.info}
                                                                cols="80"
                                                                placeholder="Here can be your description"
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
                                                        <Button variant="contained" color="primary" type="submit">
                                                            Сохранить
                                                        </Button>
                                                    </Col>

                                                    <Col md="4">
                                                        <Button color="secondary">
                                                            Удалить аккаунт
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </CardFooter>
                                        </AvForm>
                                    </Card>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col md="8">
                                    <Card>
                                        <CardHeader>
                                        </CardHeader>
                                        <CardBody>
                                            <AvForm onValidSubmit={this.handleChangePass}>
                                                <AvField
                                                    value={this.state.password_old}
                                                    name="password_old"
                                                    label="Старый пароль"
                                                    placeholder="Старый пароль"
                                                    onChange={this.handleChange}
                                                    type="password"
                                                    validate={{
                                                        required: {value: true, errorMessage: 'Поле не должно быть пустым'}
                                                    }}/>
                                                <AvField
                                                    value={this.state.password_new}
                                                    name="password_new"
                                                    label="Новый пароль"
                                                    placeholder="Новый пароль"
                                                    onChange={this.handleChange}
                                                    type="password"
                                                    validate={{
                                                        required: {value: true, errorMessage: 'Поле не должно быть пустым'},
                                                        pattern: {
                                                            value: ValidatorService.validatePwd_pattern(),
                                                            errorMessage: 'Пароль должен быть от 8 символов'
                                                        }
                                                    }}/>
                                                <AvField
                                                    value={this.state.password_new_confirm}
                                                    name="password_new_confirm"
                                                    placeholder="Новый пароль (повторить)"
                                                    onChange={this.handleChange}
                                                    type="password"
                                                    validate={{
                                                        required: {value: true, errorMessage: 'Поле не должно быть пустым'},
                                                        match: {value: 'password_new', errorMessage: 'Пароли должны совпадать'}
                                                    }}/>

                                                <Button type="submit" color="secondary">Сменить пароль</Button>
                                            </AvForm>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </div>
            </>
        );
    }
}

const ColoredLine = ({color}) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 0.1
        }}
    />
);

export default UserProfile;
