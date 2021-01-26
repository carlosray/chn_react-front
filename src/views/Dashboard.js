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
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Label,
    FormGroup,
    Input,
    Table,
    Row,
    Col,
    UncontrolledTooltip
} from "reactstrap";
import Form from "reactstrap/es/Form";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import Alert from '@material-ui/lab/Alert';
import Collapse from "@material-ui/core/Collapse";

// core components

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alertSeverity: 'info',
            alertMessage: 'Что-то произошло.. :)',
            name: '',
            ip: '',
            description: '',
            data: [],
            isShowDeleteNotification: false
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeIp = this.handleChangeIp.bind(this);
        this.handleChangeDesc = this.handleChangeDesc.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    handleChangeIp(event) {
        this.setState({ip: event.target.value});
    }

    handleChangeDesc(event) {
        this.setState({description: event.target.value});
    }

    componentDidMount() {
        const apiUrl = 'http://localhost:8080/test';
        fetch(apiUrl)
            .then(res => {
                if (res.status !== 200) {
                    this.handleShowAlert("Ошибка при получении записей", "error");
                    console.log(res);
                    throw new Error('Response not 200 (ok).');
                }
                return res.json();
            })
            .then(resJson => {
                this.setState({data: resJson});
                }
            )
            .catch(console.log)
    }

    handleSubmit(event) {
        fetch('http://localhost:8080/test', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: this.state.name, ip: this.state.ip, description: this.state.description})
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    this.handleShowAlert("Ошибка! Запись не сохранена", "error");
                    console.log(res);
                    throw new Error('Response not 200 (ok).');
                }
            })
            .then(resJson => {
                this.setState(function (prevState, props) {
                    const prevData = prevState.data;
                    prevData.push(resJson)
                    return {data: prevData}
                });
                this.handleShowAlert("Успешно сохранена запись", "success");
            })
            .catch(console.log);


        event.preventDefault();
    }

    handleDelete(id, index) {
        fetch('http://localhost:8080/test/' + id, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.status === 204) {
                    this.setState(function (prevState, props) {
                        const prevData = prevState.data;
                        delete prevData[index];
                        return {data: prevData}
                    });
                    this.handleShowAlert("Успешно удалена запись", "success");
                } else {
                    this.handleShowAlert("Ошибка! Запись не удалена", "error");
                    console.log(res);
                    throw new Error('Response not 204 (no content).');
                }
            })
            .catch(console.log);
    }

    handleShowAlert(message, severity) {
        this.setState({isShowDeleteNotification: true});
        this.setState({alertMessage: message});
        this.setState({alertSeverity: severity});
        setTimeout(() => {
            this.setState({
                isShowDeleteNotification: false
            })
        }, 3000)
    }

    render() {
        return (
            <>

                <div className="content">
                    <Collapse in={this.state.isShowDeleteNotification}>
                        <Alert severity={this.state.alertSeverity}>
                            {this.state.alertMessage}
                        </Alert>
                    </Collapse>
                    <Row>
                        <Col md="8">
                            <Card>
                                <CardHeader>
                                    <h5 className="title">Добавить мониторинг IP</h5>
                                </CardHeader>
                                <CardBody>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Row>
                                            <Col md="5">
                                                <label>Имя:</label>
                                                <Input type="text"
                                                       placeholder=" Название"
                                                       onChange={this.handleChangeName}/>
                                            </Col>
                                            <Col md="7">
                                                <label>IP</label>
                                                <Input type="text"
                                                       placeholder=" IP адрес"
                                                       onChange={this.handleChangeIp}/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="8">
                                                <FormGroup>
                                                    <label>Описание:</label>
                                                    <Input cols="80"
                                                           placeholder=" Описание мониторинга"
                                                           rows="4"
                                                           type="textarea"
                                                           onChange={this.handleChangeDesc}/>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <Input type="submit" value="Отправить"/>
                                            </Col>
                                        </Row>
                                    </Form>
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
                                            <th>Ip</th>
                                            <th>Описание</th>
                                            <th>Удалить</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.data.map((listValue, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{listValue.name}</td>
                                                    <td>{listValue.ip}</td>
                                                    <td>{listValue.description}</td>
                                                    <IconButton onClick={() => {
                                                        this.handleDelete(listValue.id, index)
                                                    }} color="secondary"><DeleteIcon/></IconButton>
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
