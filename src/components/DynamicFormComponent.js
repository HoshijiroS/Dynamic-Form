import React from "react";
import { getData } from "../api/EntryService"

export class DynamicFormComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            entryData: [],
            isLoaded: false
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

    handleChange = (event) => {
    };

    handleSubmit = (event) => {
    };

    renderLoading () {
        return (
            <div>Still Loading...</div>
        );
    };

    renderCell(entry) {
        return (
            <label>{entry.fieldName}
                <input
                onChange = {this.handleChange} 
                type={entry.type} value ={entry.value}/>
            </label>
        );
    }

    render() {
        const { isLoaded, entryData } = this.state;

        return (
            <div className = "App">
                <div>
                    {
                        isLoaded?
                        entryData.map(entry => this.renderCell(entry)) :
                        this.renderLoading()
                    }
                </div>
            </div>
        );
    }
}

export default DynamicFormComponent;