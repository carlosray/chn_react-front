import React, {Component} from "react";
import {GridOverlay} from "@material-ui/data-grid";
import LinearProgress from "@material-ui/core/LinearProgress";

class CustomLoadingOverlay extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <GridOverlay>
            <div style={{ position: 'absolute', top: 0, width: '100%' }}>
                <LinearProgress />
            </div>
            </GridOverlay>
    }
}

export default CustomLoadingOverlay