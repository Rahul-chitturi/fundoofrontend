import React, { Component } from "react";
import NoteController from "../Controller/NoteController";
import Header from "../Components/Header";
import SideDrawer from "../Components/SideDrawer";
import CreateNote from "./CreateNote";
import NoteList from "../Components/NoteList";
import "../App.css";

export default class Dashboard extends Component {
  state = {
    titles: [],
    descriptions: [],
    title: "",
    description: "",
    listOfNotes: [],
    openNote: false,
    addReminder: false,
    editLabel: false,
    archive: false,
    trash: false,
    active: true,
    edit:false
  };

  handleActive = () => {
    this.setState({ active: true, archive: false, trash: false });
  };
  /*-------Archive---------*/
  handleArchive = () => {
    this.setState({ active: false, archive: true, trash: false });
  };

  /*-------Trash--------*/
  handleTrash = () => {
    this.setState({ active: false, archive: false, trash: true });
  };
  /*-----Edit Label---------*/
  onClickEditLabel = () => {
    this.setState({ editLabel: !this.state.editLabel });
  };
  /*-----Add Reminder---------*/
  onClickReminderIcon = () => {
    this.setState({ addReminder: true });
  };
  handleClickOpen = () => {
    this.setState({
      openNote: true
    });
  };
  onChangeTitle = e => {
    this.setState({ title: e.target.value });
  };
  onChangeDescription = e => {
    this.setState({ description: e.target.value });
  };
  onClose = e => {
    e.preventDefault();
    if (this.state.title === "" && this.state.description === "") {
      this.setState({ openNote: false });
    } else {
      const notes = {
        title: this.state.title,
        description: this.state.description
      };
      NoteController.createNote(notes)
        .then(response => {
          this.setState({
            listOfNotes: [...this.state.listOfNotes, notes],
            title: "",
            description: "",
            createNote: true,
            openNote: false
          });
    
        })
        .catch(err => {
          console.log("error", err.response.data);
        });
    }
  };

  render() {
    
    return (
      <div className="App">
        <div className="">
          <div className="new-nav">
            <Header />
          </div>
        </div>
        <div className="side-main">
          <div className="side-bar">
            <div className="side-bar-content">
              <SideDrawer
                onClickArchive={this.handleArchive}
                onClickTrash={this.handleTrash}
                onClickActive={this.handleActive}
              />
            </div>
          </div>
          <div className="content-main">
            {this.state.active ? (
              <div className="note-create">
                <div className="note-create-content">
                  <CreateNote
                    title={this.state.title}
                    description={this.state.description}
                    openNote={this.state.openNote}
                    handleClickOpen={this.handleClickOpen}
                    onChangeTitle={this.onChangeTitle}
                    onChangeDescription={this.onChangeDescription}
                    onClose={this.onClose}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="notelist">
              <div className="notelist-content">
                <NoteList
                  status={{
                    active: this.state.active,
                    archive: this.state.archive,
                    trash: this.state.trash
                  }}
                  addReminder={this.state.addReminder}
                  onClickReminderIcon={this.onClickReminderIcon}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}