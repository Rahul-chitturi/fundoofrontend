import React, { Component } from "react";
import { Card } from "react-bootstrap";
import NoteController from "../Controller/NoteController";
import ModalBox from "./ModalBox";
import Icon from "./Icon";
import MyTag from "./myTag";
import {IoMdTime} from "react-icons/io";

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      condition: false,
      //iconShow: false,
      isPinned: false,
      show: false,
      note: props.fnote,
      colors: [
        "white",
        "#ffcdd2",
        "#ffe0b2",
        "#fff59d",
        "#e6ee9c",
        "#e1f5fe",
        "#d7ccc8",
        "#e1bee7",
        "#f1f8e9"
      ]
    };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  handleClick() {
    this.setState(oldState => ({ condition: !oldState.condition }));
  }
  handleTrash = () => {
    NoteController.deleteNote(this.props.noteId)
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.log(error.data.message);
      });
  };
  render() {
    const { title, description, noteId } = this.props;
    return (
      <div>
        <div>
          <Card
            className="my-2 mr-2"
            style={{ width: "15rem", borderRadius: "7px" }}
          >
            <Card.Body>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }} onClick={this.handleShow}>
                  {title}
                </div>
                <div className="pin-icon">
                  <i
                    className="fa fa-thumb-tack"
                    aria-hidden="true"
                    onClick={this.props.onPinClick}
                  ></i>
                </div>
              </div>
              <div onClick={this.handleShow}>{description}</div>
              <div className="row ml-1 p-2 w-100">
                {
                  (this.props.fnote.reminder !== null && this.props.fnote.reminder !== "") ?
                  <MyTag icon={<IoMdTime/>} id={"reminder"+this.props.noteId}
                  data={(this.props.fnote.reminder !== null ? this.props.fnote.reminder : "")}
                  onCloseIconClick={this.removeReminder}
                  />
                  : <div />
                }</div>
              <div style={{ marginTop: "30px" }}>
                <Icon
                  handleClick={this.handleClick}
                  handleArchive={this.props.handleArchive}
                  handleTrash={this.props.handleTrash}
                  noteId={noteId}
                />
              </div>
            </Card.Body>
          </Card>
        </div>
        <ModalBox
          show={this.state.show}
          onHide={this.handleClose}
          note={this.props.fnote}
        />
      </div>
    );
  }
}
export default Note;
