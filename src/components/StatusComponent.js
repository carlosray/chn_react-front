import React, {Component} from "react";
import CheckIcon from '@material-ui/icons/Check';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import BlockIcon from '@material-ui/icons/Block';
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";

class StatusComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        {
            if (this.props.loading) {
                return <CircularProgress size={25}/>
            } else {
                if (this.props.status !== null && this.props.status !== undefined) {
                    if (this.props.status) {
                        return <Tooltip title="Ресурс заблокирован"><BlockIcon style={{color: "#cb5151"}}/></Tooltip>
                    } else {
                        return <Tooltip title="Ресурс не заблокирован"><CheckIcon style={{color: "#8db55f"}}/></Tooltip>
                    }
                } else {
                    return <Tooltip title="Статус неизвестен"><HelpOutlineIcon style={{color: "#688eb0"}}/></Tooltip>
                }
            }
        }
    }
}

export default StatusComponent