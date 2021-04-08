import React, {Component} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import {DataGrid, GridCellParams, GridToolbar} from '@material-ui/data-grid';
import CustomNoRowsOverlay from 'components/CustomNoRowsOverlay';
import CustomLoadingOverlay from 'components/CustomLoadingOverlay';

class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {field: 'ip', headerName: 'IP адреса', width: 300
                },
                {field: 'id', headerName: 'Домен', width: 200},
                {field: 'reason', headerName: 'Причина блокировки', width: 150},
                {field: 'dateOfBlock', headerName: 'Дата блокировки', width: 150},
                {field: 'additionalParams', headerName: 'Доп. инфо', width: 300}]
        }
    }

    render() {
        if (this.props.loading) {
            return <CircularProgress size={25}/>
        } else {
            return <div style={{width: '100%'}}>
                <DataGrid className={"text-white"} autoHeight
                          getRowId={(row) => row.domain}
                          sortModel={[
                              {
                                  field: 'id',
                                  sort: 'asc',
                              },
                          ]}
                          components={{
                              Toolbar: GridToolbar,
                              NoRowsOverlay: CustomNoRowsOverlay,
                              LoadingOverlay: CustomLoadingOverlay,
                          }} rows={this.props.blockedResources} columns={this.state.columns} pageSize={15}/>
            </div>
        }
    }
}

export default SearchComponent