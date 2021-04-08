import React, {Component} from "react";
import {GridOverlay} from "@material-ui/data-grid";

class CustomNoRowsOverlay extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <GridOverlay style={{backgroundColor: "#26293c"}}>
                Не найдено записей
            </GridOverlay>
    }
}

export default CustomNoRowsOverlay