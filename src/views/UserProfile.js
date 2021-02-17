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
import {
    TabPane,
    Nav,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    NavItem,
    NavLink,
    TabContent
} from "reactstrap";
import AuthenticationService from "../service/AuthenticationService";
import Button from "@material-ui/core/Button";
import ValidatorService from "../service/ValidatorService";
import {AvField, AvForm} from "availity-reactstrap-validation";
import * as classnames from "classnames";

class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            password_old: '',
            password_new: '',
            password_new_confirm: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangePass = this.handleChangePass.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    toggle = tab => {
        if (this.state.activeTab !== tab) this.setState({activeTab: tab});
    }


    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    componentDidMount() {
        fetch('http://localhost:8080/test/json')
            .then(res => res.json())
            .then((data) => {
                this.setState({...data})
            })
            .catch(console.log)
    }

    handleChangePass() {
        this.setState({
            password_old: '',
            password_new: '',
            password_new_confirm: ''
        })
    };

    render() {
        return (
            <>
                <div className="content">
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
                                            <h5 className="title">Редактировать профиль</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Form>
                                                <Row>
                                                    <Col md="4">
                                                        <FormGroup>
                                                            <label>Логин</label>
                                                            <Input
                                                                disabled
                                                                defaultValue={AuthenticationService.getLoggedInUserName()}
                                                                placeholder="Username"
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pl-md-1" md="4">
                                                        <FormGroup>
                                                            <label htmlFor="exampleInputEmail1">
                                                                Email
                                                            </label>
                                                            <Input
                                                                required
                                                                placeholder="mike@email.com" type="email"/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <ColoredLine color="LightSlateGray"/>
                                                <Row>
                                                    <Col className="pr-md-1" md="6">
                                                        <FormGroup>
                                                            <label>Имя</label>
                                                            <Input
                                                                defaultValue={""}
                                                                placeholder={""}
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pl-md-1" md="6">
                                                        <FormGroup>
                                                            <label>Фамилия</label>
                                                            <Input
                                                                defaultValue={""}
                                                                placeholder={""}
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className="pr-md-1" md="4">
                                                        <FormGroup>
                                                            <label>Город</label>
                                                            <Input
                                                                placeholder="Moscow"
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="px-md-1" md="4">
                                                        <FormGroup>
                                                            <label>Страна</label>
                                                            <Input
                                                                placeholder="Russia"
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col  md="4">
                                                        <FormGroup>
                                                            <label>Компания</label>
                                                            <Input
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
                                                            <Input
                                                                cols="80"
                                                                defaultValue="Ака, ака, ак-47!
                                                                У щет мэн, гат дем"
                                                                placeholder="Here can be your description"
                                                                rows="4"
                                                                type="textarea"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </Form>
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
                                    </Card>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col md="8">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="title">Изменить пароль</h5>
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
