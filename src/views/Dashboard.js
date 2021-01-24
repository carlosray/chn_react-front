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

// core components

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            ip: '',
            desc: '',
            data: []
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeIp = this.handleChangeIp.bind(this);
        this.handleChangeDesc = this.handleChangeDesc.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    handleChangeIp(event) {
        this.setState({ip: event.target.value});
    }

    handleChangeDesc(event) {
        this.setState({desc: event.target.value});
    }

    componentDidMount() {
        const apiUrl = 'http://localhost:8080/test';
        fetch(apiUrl)
            .then(res => res.json())
            .then((data) => {
                this.setState(function (prevState, props) {
                    const newItem = {name: data.name, ip: data.ip, desc: data.description};
                    const prevData = prevState.data;
                    prevData.push(newItem)
                    return {data: prevData}
                });
            })
            .catch(console.log)
    }

    handleSubmit(event) {
        fetch('http://localhost:8080/test', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: this.state.name, ip: this.state.ip, description: this.state.desc})
        }).then(res=>res.json())
            .then(res => console.log(res));

        this.setState(function (prevState, props) {
            const newItem = {name: this.state.name, ip: this.state.ip, desc: this.state.desc};
            const prevData = prevState.data;
            prevData.push(newItem)
            return {data: prevData}
        });
        event.preventDefault();
    }

    render() {
        return (
            <>
                <div className="content">
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
                                    <CardTitle tag="h4">Simple Table</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Table className="tablesorter" responsive>
                                        <thead className="text-primary">
                                        <tr>
                                            <th>Name</th>
                                            <th>Ip</th>
                                            <th>Описание</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.data.map((listValue, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{listValue.name}</td>
                                                    <td>{listValue.ip}</td>
                                                    <td>{listValue.desc}</td>
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
