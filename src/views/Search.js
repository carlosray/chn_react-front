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
import {Collapse, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Row, Table, Modal} from "reactstrap";
import {AvField, AvForm} from 'availity-reactstrap-validation';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from "@material-ui/core/IconButton";
import ValidatorService from "../service/ValidatorService";
import RestService from "../service/RestService";
import NotificationAlert from "react-notification-alert";
import StatusComponent from "../components/StatusComponent";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SearchComponent from "../components/SearchComponent";

// core components
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "IP",
            value: "",
            isSearching: false,
            isShowSearchingResult: false,
            blockedResources: []
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleCloseSearch = this.handleCloseSearch.bind(this)
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

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleSearch(event) {
        if (event.key === 'Enter') {
            this.setState({isSearching: true})
            this.setState({isShowSearchingResult: true})
            RestService.executeSearch(this.state.type, this.state.value)
                .then(res => {
                    this.setState({blockedResources: res.data})
                })
                .catch((ex) => {
                    console.log(ex)
                    this.setState({isShowSearchingResult: false})
                });
            this.setState({isSearching: false});
        }
    }

    handleCloseSearch() {
        this.setState({
            isShowSearchingResult: false,
            isSearching: false,
            blockedResources: []
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
                                    <CardTitle tag="h4">Поиск</CardTitle>
                                    <Row>
                                        <Col md={"2"}>
                                            <Input type="select" name="type" onChange={this.handleChange}>
                                                <option value="IP">IP адрес</option>
                                                <option value="DOMAIN">Домен</option>
                                            </Input>
                                        </Col>
                                        <Col md={"10"}>
                                            <Input id="inlineFormInputGroup" name="value" placeholder={this.state.type === "IP" ? "Введите IP адрес для поиска" : "Введите домен для поиска"} type="text" onChange={this.handleChange}
                                                   onKeyPress={this.handleSearch}/>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    {this.state.isShowSearchingResult && <SearchComponent blockedResources={this.state.blockedResources} loading={this.state.isSearching}/>}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default Search;
