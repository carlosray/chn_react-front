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
import {Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Row, Table,} from "reactstrap";
import {AvField, AvForm, AvRadio, AvRadioGroup} from 'availity-reactstrap-validation';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from "@material-ui/core/IconButton";
import ValidatorService from "../service/ValidatorService";
import RestService from "../service/RestService";
import NotificationAlert from "react-notification-alert";
import StatusComponent from "../components/StatusComponent";

// core components

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        this.getAllMonitor = this.getAllMonitor.bind(this)
    };

    componentDidMount() {
        this.getAllMonitor(false);
    }

    getAllMonitor(withStatus) {
        if (withStatus) {
            this.setState({loading: true})
        }
        RestService.executeApiGetAll(withStatus)
            .then(res => {
                this.setState({data: res.data});
                this.setState({loading: false})
            })
            .catch((ex) => {
                this.showAlert(ValidatorService.getOrDefaultError(ex, "Ошибка при получении записей"), "warning")
            })
    }

    handleSubmit(event, errors, values) {
        if (Array.isArray(errors) && errors.length) {
            console.log(JSON.stringify(errors, null, 2))
        } else {
            this.addNewMonitoring(event, values)
        }
    }

    addNewMonitoring(event, values) {
        RestService.executeApiAddNew(values)
            .then(res => {
                this.setState(function (prevState, props) {
                    const prevData = prevState.data;
                    prevData.push(res.data)
                    return {data: prevData}
                });
                this.showAlert("Успешно сохранена запись", "success");
            })
            .catch((ex) => {
                this.showAlert(ValidatorService.getOrDefaultError(ex, "Ошибка! Запись не сохранена"), "warning")
            });

        event.preventDefault();
    }

    handleDelete(id, index) {
        RestService.executeApiDelete(id)
            .then(res => {
                this.setState(function (prevState, props) {
                    const prevData = prevState.data;
                    delete prevData[index];
                    return {data: prevData}
                });
                this.showAlert("Успешно удалена запись", "success");
            })
            .catch((ex) => {
                this.showAlert(ValidatorService.getOrDefaultError(ex, "Ошибка! Запись не удалена"), "warning")
            });
    }

    showAlert(message, severity) {
        this.notify(message, severity);
    }

    addRow = () => {
        var nextState = this.state;
        nextState.data.push('placeholder');
        this.setState(nextState);
    }

    render() {
        return (
            <>
                <div className="content">
                    <div className="react-notification-alert-container">
                        <NotificationAlert ref="notificationAlert"/>
                    </div>
                    <Row>
                        <Col md="8">
                            <Card>
                                <CardHeader>
                                    <h5 className="title">Добавить мониторинг IP</h5>
                                </CardHeader>
                                <CardBody>
                                    <AvForm onSubmit={this.handleSubmit}>
                                        <Row>
                                            <Col md="5">
                                                <AvField
                                                    name="name"
                                                    label="Имя:"
                                                    placeholder="Название"
                                                    type="text"
                                                    errorMessage="Invalid name" validate={{
                                                    required: {value: true, errorMessage: 'Поле не должно быть пустым'}
                                                }}/>
                                            </Col>
                                            <Col md="7">
                                                <AvField
                                                    name="value"
                                                    label="IP:"
                                                    placeholder="000.000.000.000"
                                                    type="text"
                                                    errorMessage="Invalid name" validate={{
                                                    required: {value: true, errorMessage: 'Поле не должно быть пустым'},
                                                    pattern: {value: ValidatorService.validateIP_Pattern(), errorMessage: 'Формат IP адреса не валидный'}
                                                }}/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={"8"}>
                                                <AvRadioGroup inline name="notification" required errorMessage={"Выберите тип"}>
                                                    <AvRadio label="По электронной почте" value="MAIL"/>
                                                    <AvRadio label="Сообщением в telegram" value="TELEGRAM" disabled/>
                                                </AvRadioGroup>
                                            </Col>
                                        </Row>
                                        <Row hidden>
                                            <Col md={"8"}>
                                                <AvField
                                                    name={"type"}
                                                    defaultValue={"IP"}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="8">
                                                <FormGroup>
                                                    <label>Описание:</label>
                                                    <AvField cols="80"
                                                             name={"description"}
                                                             placeholder=" Описание мониторинга"
                                                             rows="4"
                                                             type="textarea"/>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <Input type="submit" value="Отправить"/>
                                            </Col>
                                        </Row>
                                    </AvForm>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">Существующие мониторинги</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Table className="tablesorter" responsive>
                                        <thead className="text-primary">
                                        <tr>
                                            <th>Имя</th>
                                            <th>Ip/domain</th>
                                            <th>Описание</th>
                                            <th>Тип уведомления</th>
                                            <th>
                                                Статус
                                                <IconButton color="inherit" size={"small"} onClick={() => {
                                                    this.getAllMonitor(true);
                                                }}>
                                                    <i className="tim-icons icon-refresh-02" style={{padding: 5}}/>
                                                </IconButton>
                                            </th>
                                            <th>Удалить</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.data.map((listValue, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{listValue.name}</td>
                                                    <td>{listValue.value}</td>
                                                    <td>{listValue.description}</td>
                                                    <td>{listValue.notification}</td>
                                                    <td>
                                                        <StatusComponent status={this.state.data[index].status} loading={this.state.loading}/>
                                                    </td>
                                                    <td><IconButton onClick={() => {
                                                        this.handleDelete(listValue.id, index)
                                                    }} style={{color: "#cb5151"}} size={"small"}>
                                                        <DeleteForeverIcon/>
                                                    </IconButton></td>
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default Dashboard;
