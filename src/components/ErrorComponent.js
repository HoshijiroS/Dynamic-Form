import React from "react";
import Alert from '@mui/material/Alert';

export class ErrorComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: props.errorMessage
        }
    }

    render() {
        return (
            this.state.errorMessage ? 
            <Alert severity="error">
                <span style = {{"overflowWrap": "anywhere"}}>
                    {this.state.errorMessage}
                </span>
            </Alert>
            : <div></div>
        );
    }
}   

export default ErrorComponent;