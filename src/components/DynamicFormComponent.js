import React from "react";
import { getData, submitData } from "../api/EntryService"

export class DynamicFormComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            entryData: [],
            isLoaded: false,
            payloadMessage: ""
        }
    }

    componentDidMount() {
        this.refreshData();
    }

    refreshData() {
        getData().then(
            (result) => {
            this.setState({
                isLoaded: true,
                entryData: result.data
            });
            },
            (error) => {
            this.setState({
                isLoaded: true,
                error
            });
            }
        )
    }

    formatData(){
        let obj = {};

        this.state.entryData.map((entry) => {
            obj[entry.fieldName] = entry.value;
        });

        return obj;
    }

    handleChange = (event, index) => {
        this.state.entryData[index].value = event.target.value
        this.setState({entryData: this.state.entryData});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        submitData(this.formatData()).then((message) => {
            this.setState({payloadMessage: JSON.stringify(message)});
        });
    };


    renderLoading () {
        return (
            <div>Still Loading...</div>
        );
    };

    renderCell(entry, index) {
        return (
            <label>{entry.fieldName}
                <input
                type = {entry.type} value = {entry.value}
                onChange = {e => this.handleChange(e, index)}/>
            </label>
        );
    }

    renderForm() {
        return (
        <form>{this.state.entryData.map((entry, currIndex) => this.renderCell(entry, currIndex))}
        <button onClick = {this.handleSubmit}>Submit</button>
        </form>
        );
    }

    render() {
        return (
            <div className = "App">
                {this.state.isLoaded ? this.renderForm() : this.renderLoading()}
                <div>{this.state.payloadMessage}</div>
            </div>
        );
    }
}

export default DynamicFormComponent;