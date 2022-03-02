import React from "react";
import Alert from '@mui/material/Alert';
import { Typography } from "@mui/material";

export class SuccessComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: props.message
        }
    }

    render() {
        return (
            this.state.message ? 
            <Alert severity="success">
                <span style = {{
                    "overflowWrap": "anywhere"
                }}>
                    {this.state.message}
                </span>
            </Alert>
            : <div></div>
        );
    }
}   

export default SuccessComponent;