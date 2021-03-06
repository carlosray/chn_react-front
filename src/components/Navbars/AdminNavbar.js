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

class AdminNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseOpen: false,
            color: "navbar-transparent",
        };
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateColor);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateColor);
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
            </>
        );
    }
}

export default AdminNavbar;
