import React, {Component} from 'react';
import { Card } from 'react-bootstrap';
import Note from '../Components/Note';
import Reminder from '../Components/Reminder';
class NoteList extends Component{       
    render(){
    const {titles,onClickReminderIcon,addReminder} = this.props;
    console.log("Inside NoteList :",titles);
    //console.log(onClickReminderIcon);
    
        return(
            <div className="row note-list">
               {
                   titles.map(note => {
                       return<Note 
                       noteId={note.noteId} title={note.title} description={note.description} 
                       onClickReminderIcon={onClickReminderIcon}
                       addReminder={addReminder}
                       />
                   })
               }
            </div>
        );

    }
}
export default NoteList;