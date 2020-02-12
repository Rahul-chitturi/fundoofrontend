import React, { useState, useRef } from 'react';
import {Modal, InputGroup, Button, FormControl} from 'react-bootstrap';
import MaterialIcon from "react-google-material-icons";
import {addUserLabel} from '../Controller/labelController';
export default function AddLabel(props) {
    const [show, setShow] = useState({model: false, editIcon: "label"});
    const inRef = useRef(null);
    const [ic, setIc] = useState("add");
    const [labels, setLables] = useState(props.labelList);
    const [error, setError] = useState("");

    const focusInput = () => {
        if (ic === "add") {
            inRef.current.focus();
            inRef.current.classList.remove("border-bottom-0","outline-none");
            setIc("close");
        } else {
            inRef.current.classList.add("border-bottom-0");
            setIc("add");
        }
    };

    const addLabel = () => {
        if (inRef.current.value !== "") {
            console.log("REF :",inRef.current.value);
            var labelName = inRef.current.value;
            addUserLabel(labelName).then(response =>{
                console.log("Message :",response.data.message);
            })
            .catch(error => {
                console.log("Error :",response);
            })
            setLables([...labels, inRef.current.value]);
            inRef.current.value = "";
        }
    };

    const editLabel = (labelName) => {
        const newLabelList = labels.map(label => {
            if (label === labelName) {
                return document.getElementById(labelName).value
            }
            return label
        });
        setLables(newLabelList);
    };

    const showDelete = (id) => {
        document.getElementById(id).getElementsByTagName("i")[0].innerText = "delete"
    };
    const hideDelete = (id) => {
        document.getElementById(id).getElementsByTagName("i")[0].innerText = "label"
    };

    const deleteLabel = (id) => {
        if (window.confirm("Are you sure? label will be permanently deleted")) {
            const newLabelList = labels.filter(label => {
                return label !== id;
            });
            setLables(newLabelList);
        }
    };
    return (
        <Modal size="sm" show={show} onHide={props.hide} centered>
        <InputGroup className="p-2">
            <Button className="navBtn" size="sm" variant={"light"} onClick={focusInput}><MaterialIcon icon={ic} size={20}/></Button>
            <FormControl className="border-top-0 border-left-0 border-right-0 border-bottom-0 mx-1" ref={inRef}
                         placeholder={"Create new label"} onFocus={focusInput}/>
            <Button className="navBtn" size="sm" variant={"light"} onClick={addLabel}><MaterialIcon
                icon={"check"} size={20}/></Button>
        </InputGroup>
        {labels.map(label => (
            <div key={label} onMouseOver={() => showDelete(label + "icon")}
                 onMouseLeave={() => hideDelete(label + "icon")}>
                <InputGroup className="p-2">
                    <Button id={label + "icon"} className="navBtn" size="sm" variant={"light"}
                            onClick={() => deleteLabel(label)}><MaterialIcon
                        icon={"label"} size={20}/></Button>
                    <FormControl id={label}
                                 className="border-top-0 border-left-0 border-right-0 border-bottom-0 mx-1"
                                 defaultValue={label}/>
                    <Button name={label} className="navBtn" size="sm" variant={"light"} onClick={() => editLabel(label)}>
                        <MaterialIcon icon={"edit"} size={20}/></Button>
                </InputGroup>
            </div>
        ))}
        <div className="text-right p-2">
            <Button variant={"light"} onClick={props.hide}>Done</Button>
        </div>
    </Modal>
    )
}
