import React from "react";
import { getData, submitData } from "../api/EntryService";
import ErrorComponent from "./ErrorComponent";
import SuccessComponent from "./SuccessComponent";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export class DynamicFormComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            entryData: [],
            isLoaded: false,
            isSuccessful: false,
            payloadMessage: "",
            hasError: false,
            errorMessage: "",
            invalid: false
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
                entryData: result.data,
                hasError: false
            });
            },
            (error) => {
            this.setState({
                isLoaded: true,
                hasError: true,
                errorMessage: error.message
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

    handleChange = (event, index, type, name) => {
        this.state.entryData[index].value = event.target.value
        this.state.entryData[index]['validationMessage'] = this.fetchValidationMessage(event.target.value, type, name);
        this.setState({entryData: this.state.entryData});

        this.checkIfValid();
    };

    handleSubmit = (event) => {
        this.setState({isLoaded: false});
        event.preventDefault();
        submitData(this.formatData()).then((message) => {
            this.setState({
                isLoaded: true, 
                isSuccessful: true,
                hasError: false,
                payloadMessage: JSON.stringify(message)
            });
        })
        .catch((error) => {
            this.setState({
                isLoaded: true, 
                isSuccessful: false,
                hasError: true, 
                errorMessage: error.message
            });
        });
    };

    checkIfValid() {
        this.state.entryData.map((entry) => {
            if(entry.validationMessage !== "") {
                this.setState({invalid: true})
            }

            this.setState({invalid: false});
        });
    }

    fetchValidationMessage(value, type, name) {
        if(name !== "gender" && name !== "age" !== name !== "testimonial") {
            if(value === "") {
                return "Required field cannot be empty."
            }

            else {
                switch (type) {
                    case "number":
                        if(!/^\d+$/.test(value)) {
                            return "Number field cannot contain letters."
                        }
                        
        
                    case "email":
                        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                            return "Email must be valid."
                        }
        
                }

                return null;
            }
        }
    }

    renderLoading () {
        return (
            <div>Still Loading...</div>
        );
    };

    renderOption(opt) {
        return (<MenuItem value={opt}>{opt}</MenuItem>);
    }

    renderCell(entry, index) {
        if(entry.type === "select") {
            return (
            <FormControl fullWidth>
                <InputLabel id="simple-select-label">{entry.fieldname}</InputLabel>
                <Select
                    required={entry.fieldName !== "gender" && entry.fieldName !== "age" !== entry.fieldName !== "testimonial"}
                    labelId="simple-select-label"
                    id="simple-select"
                    value={entry.value}
                    label={entry.fieldname}
                    onChange={e => this.handleChange(e, index, entry.type, entry.fieldName)}
                >
                    {entry.options.map(option => this.renderOption(option))}
                </Select>
            </FormControl>
            );
        }

        return (
            <TextField
            fullWidth
            id="outlined-flexible"
            label={entry.fieldName}
            type={entry.type}
            required={entry.fieldName !== "gender" && entry.fieldName !== "age" !== entry.fieldName !== "testimonial"}
            multiline
            maxRows={4}
            value={entry.value}
            error={entry.validationMessage}
            helperText={entry.validationMessage}
            id="margin-normal" margin="normal"
            onChange = {e => this.handleChange(e, index, entry.type, entry.fieldName)}
            />
        );
    }

    renderForm() {
        return (
            <Container maxWidth="md" >
                <Typography sx={{marginTop: 5}} variant="h5" align="left">Dynamic Form</Typography>
                {this.state.entryData.map((entry, currIndex) => this.renderCell(entry, currIndex))}

                {this.state.hasError ? <ErrorComponent errorMessage = {this.state.errorMessage}></ErrorComponent> : <div></div>}
                {this.state.isSuccessful ? <SuccessComponent message = {this.state.payloadMessage}></SuccessComponent> : <div></div>}

                <Button disabled = {this.state.invalid} sx={{marginTop: 5}} variant="contained" onClick = {this.handleSubmit}>Submit</Button>
            </Container>
        );
    }

    render() {
        return (
            <div className = "App">
                {this.state.isLoaded ? this.renderForm() : this.renderLoading()}
            </div>
        );
    }
}

export default DynamicFormComponent;