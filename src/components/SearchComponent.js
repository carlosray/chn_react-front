import React, {Component} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import StatusComponent from "./StatusComponent";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {Table} from "reactstrap";

class SearchComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.loading) {
            return <CircularProgress size={25}/>
        } else {
            if (this.props.blockedResources && this.props.blockedResources.length > 0) {
                return <div className="modal-body white-content"><Table className="tablesorter" responsive>
                    <thead className="text-primary">
                    <tr>
                        <th>IP адреса</th>
                        <th>Домен</th>
                        <th>Причина блокировки</th>
                        <th>Дата блокировки</th>
                        <th>Доп. инфо</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.blockedResources.map((listValue, index) => {
                        return (
                            <tr key={index}>
                                <td>{listValue.ip.map((val) =>
                                    <li key={val}>{val}</li>)}</td>
                                <td>{listValue.domain}</td>
                                <td>{listValue.reason}</td>
                                <td>{listValue.dateOfBlock}</td>
                                <td>{listValue.additionalParams.map((val) =>
                                    <li key={val}>{val}</li>)}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </Table></div>
            } else {
                return <div className="modal-body white-content"><p>Не найдено заблокированных ресурсов</p></div>
            }
        }
    }
}

export default SearchComponent