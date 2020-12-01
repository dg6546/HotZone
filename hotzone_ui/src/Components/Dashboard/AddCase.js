import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import config from "../../config";
import {makeStyles} from "@material-ui/core/styles";
import AddCaseTable from "./AddCaseTable";

import SearchField from 'react-search-field';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    // container: {
    //     height: '70vh',
    //     width: '50vw'
    // },
    loginFormLegend: {
        width: '14rem',
        background: '#dee2e6'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const AddCaseForm = (props) => {
    const styles = useStyles();
    const {case_number, handleModalClose} = props;
    const [searchGeodata, setSearchGeodata] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState([]);
    const [selectNewLocation, setSelectNewLocation] = useState(false);

    const handleSearch = (value) => {
        console.log(value);
    }

    const handleGeodataSearch = (value) => {

        try {
            fetch(`https://geodata.gov.hk/gs/api/v1.0.0/locationSearch?q=${value}`, {
                method: "GET",
                mode: "cors"
            })
                .then((res) => {
                    if (!res.ok) {
                        setError('Not Entry Found!');
                    }
                    return res.json();
                })
                .then((data) => {
                    setData(data);
                })
                .catch(e => {
                    setError('Not Entry Found!')
                })
        } catch (e) {
            setError('Not Entry Found!')
        }

    }

    const handleNewLocationRecord = (value) => {
        if (value===0 || value){
            setSelectNewLocation(true);
        }
        else{
            setSelectNewLocation(false);
        }
    }

    const handleGeodataOpen = () => {
        setSearchGeodata(true);
    }


    return (
        <div
            className={`${styles.container}  align-items-center justify-content-center`}
        >
            <fieldset className="border p-3 rounded">

                <legend
                    className={`${styles.loginFormLegend} border rounded p-1 text-center`}
                >
                    Add Visits for Case Number: {case_number}
                </legend>

                {!searchGeodata ? <div>
                        <div className={'form-group'}>
                            {"Search Location: "}
                            <SearchField
                                placeholder=''
                                onSearchClick={handleSearch}
                                onEnter={handleSearch}
                            />
                        </div>

                        <div className={'form-group'}>
                            <form noValidate>
                                <TextField
                                    id="date-1"
                                    label="Entry Date"
                                    type="date"
                                    defaultValue="2020-05-24"
                                    className={styles.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    id="date-2"
                                    label="Exit Date"
                                    type="date"
                                    defaultValue="2020-05-24"
                                    className={styles.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </form>
                        </div>
                        <button type="submit" className="btn btn-outline-primary m-2">
                            Add Existing Location
                        </button>

                        <button type="submit" className="btn btn-outline-primary m-2" onClick={handleGeodataOpen}>
                            Add a New Location
                        </button>

                        <button type="submit" className="btn btn-outline-primary" onClick={handleModalClose}>
                            View Cases
                        </button>
                    </div>
                    : <div className={'form-group'}>
                        {error && (
                            <div
                                className={`alert d-flex alert-danger`}
                            >
                                {error}
                                <span
                                    className="ml-auto"
                                    style={{cursor: "pointer"}}
                                    onClick={() => setError(null)}
                                >
                                    &times;
                                </span>
                            </div>
                        )}
                        {"Search Location on Geodata: "}
                        <SearchField
                            placeholder=''
                            onSearchClick={handleGeodataSearch}
                            onEnter={handleGeodataSearch}
                        />
                        {data.length !== 0 &&
                        <div>
                            <AddCaseTable onSelect={handleNewLocationRecord} data={data}/>
                            {selectNewLocation &&
                            <button type="submit" className="btn btn-outline-primary">
                                Add Selected Location
                            </button>
                            }

                        </div>
                        }
                    </div>

                }


            </fieldset>

        </div>
    );
};

export default AddCaseForm;