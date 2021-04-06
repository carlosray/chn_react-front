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
import {Collapse, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Row, Table} from "reactstrap";
import {AvField, AvForm} from 'availity-reactstrap-validation';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from "@material-ui/core/IconButton";
import ValidatorService from "../service/ValidatorService";
import RestService from "../service/RestService";
import NotificationAlert from "react-notification-alert";
import StatusComponent from "../components/StatusComponent";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// core components
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            addNew: false,
            anchorEl: null,
            addNewIP: true
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    getType() {
        return this.state.addNewIP ? "IP" : "DOMAIN";
    }

    handleClick = (event) => {
        if (this.state.addNew) {
            this.setState({addNew: !this.state.addNew})
        }
        else {
            this.setAnchorEl(event.currentTarget);
        }
    };

    setAnchorEl(an) {
        this.setState({anchorEl: an})
    }

    handleClose(type) {
        if (type === 'IP') {
            this.setState({
                addNewIP: true,
                addNew: true
            })
        }
        else if (type === 'DOMAIN') {
            this.setState({
                addNewIP: false,
                addNew: true
            })
        }
        this.setAnchorEl(null);
    };

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
                    <Row>
                        <Col md="8">
                            <Card>
                                <CardHeader>
                                    <h5 className="title">Добавить мониторинг IP
                                        <IconButton aria-haspopup="true" aria-controls="simple-menu" onClick={this.handleClick} color="inherit" size={"small"}>
                                            {this.state.addNew ?
                                                <i className="tim-icons icon-simple-remove" style={{margin: 5}}/> :
                                                <i className="tim-icons icon-simple-add" style={{margin: 5}}/>
                                            }
                                        </IconButton>
                                        <Menu
                                            id="simple-menu"
                                            anchorEl={this.state.anchorEl}
                                            keepMounted
                                            open={Boolean(this.state.anchorEl)}
                                            onClose={this.handleClose}>
                                            <MenuItem onClick={() => {this.handleClose("IP")}}>IP адрес</MenuItem>
                                            <MenuItem onClick={() => {this.handleClose("DOMAIN")}}>Домен</MenuItem>
                                        </Menu>
                                    </h5>
                                </CardHeader>
                                <Collapse isOpen={this.state.addNew}>
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
                                                    {this.state.addNewIP ?
                                                        <AvField
                                                        name="value"
                                                        label="IP:"
                                                        placeholder="000.000.000.000"
                                                        type="text"
                                                        errorMessage="Invalid name" validate={{
                                                        required: {value: true, errorMessage: 'Поле не должно быть пустым'},
                                                        pattern: {value: ValidatorService.validateIP_Pattern(), errorMessage: 'Формат IP адреса не валидный'}
                                                    }}/> :
                                                        <AvField
                                                            name="value"
                                                            label="Домен:"
                                                            placeholder="google.com"
                                                            type="text"
                                                            errorMessage="Invalid name" validate={{
                                                            required: {value: true, errorMessage: 'Поле не должно быть пустым'},
                                                        }}/>
                                                    }
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={"8"}>
                                                    <AvField type="select" defaultValue="MAIL" label="Выберите тип уведомления" name="notification" required errorMessage={"Выберите тип уведомления"}>
                                                        <option value="NONE">Без автоматического уведомления</option>
                                                        <option value="MAIL">По электронной почте</option>
                                                        <option value="TELEGRAM" disabled>Сообщением в telegram</option>
                                                    </AvField>
                                                </Col>
                                            </Row>
                                            <Row hidden>
                                                <Col md={"8"}>
                                                    <AvField type="select" value={this.state.addNewIP ? "IP" : "DOMAIN"} label="Выберите тип уведомления" name="type" required errorMessage={"Выберите тип уведомления"}>
                                                        <option value="IP">IP</option>
                                                        <option value="DOMAIN">DOMAIN</option>
                                                    </AvField>
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
                                </Collapse>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default Dashboard;
