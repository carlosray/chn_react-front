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
// nodejs library that concatenates classes
import classNames from "classnames";

// reactstrap components
import {Row, Col, Button, Collapse, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, Modal, Nav, Navbar, NavbarBrand, NavLink, UncontrolledDropdown, Table} from "reactstrap";
import RestService from "../../service/RestService";
import ValidatorService from "../../service/ValidatorService";
import IconButton from "@material-ui/core/IconButton";
import SearchComponent from "../SearchComponent";

class AdminNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseOpen: false,
            modalSearch: false,
            color: "navbar-transparent",
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

    componentDidMount() {
        window.addEventListener("resize", this.updateColor);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateColor);
    }

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

    logout() {
        RestService.logout();
    }

    // function that adds color white/transparent to the navbar on resize (this is for the collapse)
    updateColor = () => {
        if (window.innerWidth < 993 && this.state.collapseOpen) {
            this.setState({
                color: "bg-white"
            });
        } else {
            this.setState({
                color: "navbar-transparent"
            });
        }
    };
    // this function opens and closes the collapse on small devices
    toggleCollapse = () => {
        if (this.state.collapseOpen) {
            this.setState({
                color: "navbar-transparent"
            });
        } else {
            this.setState({
                color: "bg-white"
            });
        }
        this.setState({
            collapseOpen: !this.state.collapseOpen
        });
    };
    // this function is to open the Search modal
    toggleModalSearch = () => {
        this.setState({
            modalSearch: !this.state.modalSearch
        });
    };

    render() {
        return (
            <>
                <Navbar
                    className={classNames("navbar-absolute", this.state.color)}
                    expand="lg"
                >
                    <Container fluid>
                        <div className="navbar-wrapper">
                            <div
                                className={classNames("navbar-toggle d-inline", {
                                    toggled: this.props.sidebarOpened
                                })}
                            >
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    onClick={this.props.toggleSidebar}
                                >
                                    <span className="navbar-toggler-bar bar1"/>
                                    <span className="navbar-toggler-bar bar2"/>
                                    <span className="navbar-toggler-bar bar3"/>
                                </button>
                            </div>
                            <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                                {this.props.brandText}
                            </NavbarBrand>
                        </div>
                        <button
                            aria-expanded={false}
                            aria-label="Toggle navigation"
                            className="navbar-toggler"
                            data-target="#navigation"
                            data-toggle="collapse"
                            id="navigation"
                            type="button"
                            onClick={this.toggleCollapse}
                        >
                            <span className="navbar-toggler-bar navbar-kebab"/>
                            <span className="navbar-toggler-bar navbar-kebab"/>
                            <span className="navbar-toggler-bar navbar-kebab"/>
                        </button>
                        <Collapse navbar isOpen={this.state.collapseOpen}>
                            <Nav className="ml-auto" navbar>
                                <InputGroup className="search-bar">
                                    <Button
                                        color="link"
                                        data-target="#searchModal"
                                        data-toggle="modal"
                                        id="search-button"
                                        onClick={this.toggleModalSearch}
                                    >
                                        <i className="tim-icons icon-zoom-split"/>
                                        <span className="d-lg-none d-md-block">Поиск</span>
                                    </Button>
                                </InputGroup>
                                <UncontrolledDropdown nav>
                                    <DropdownToggle
                                        caret
                                        color="default"
                                        data-toggle="dropdown"
                                        nav
                                        onClick={e => e.preventDefault()}
                                    >
                                        <div className="photo">
                                            <img alt="..." src={require("assets/img/anime3.png")}/>
                                        </div>
                                        <b className="caret d-none d-lg-block d-xl-block"/>
                                        <p className="d-lg-none">Выйти</p>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-navbar" right tag="ul">
                                        <NavLink tag="li">
                                            <DropdownItem className="nav-item">Профиль</DropdownItem>
                                        </NavLink>
                                        <DropdownItem divider tag="li"/>
                                        <NavLink tag="li">
                                            <DropdownItem href="/" className="nav-item" onClick={this.logout}>Выйти</DropdownItem>
                                        </NavLink>
                                        <DropdownItem divider tag="li"/>
                                        <NavLink tag="li">
                                            <DropdownItem className="nav-item">Логин: {RestService.getLoggedInUserName()}</DropdownItem>
                                            <DropdownItem className="nav-item">Версия: 1.1</DropdownItem>
                                        </NavLink>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <li className="separator d-lg-none"/>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
                <Modal
                    modalClassName="modal-search"
                    isOpen={this.state.modalSearch}
                    toggle={this.toggleModalSearch}
                    onClosed={this.handleCloseSearch}
                >
                    <div className="modal-header">
                        <Col>
                            <Input type="select" name="type" onChange={this.handleChange}>
                                <option value="IP">IP адрес</option>
                                <option value="DOMAIN">Домен</option>
                            </Input>
                        </Col>
                        <Input id="inlineFormInputGroup" name="value" placeholder={this.state.type === "IP" ? "Введите IP адрес для поиска" : "Введите домен для поиска"} type="text" onChange={this.handleChange} onKeyPress={this.handleSearch}/>

                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={this.toggleModalSearch}
                        >
                            <i className="tim-icons icon-simple-remove"/>
                        </button>
                    </div>
                    {this.state.isShowSearchingResult && <SearchComponent blockedResources={this.state.blockedResources} loading={this.state.isSearching}/>}
                </Modal>
            </>
        );
    }
}

export default AdminNavbar;
