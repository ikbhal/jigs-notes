import './App.css';
import { useEffect, useState } from 'react'; 

function NoteTab({id, title, changeNote}){
  return (
    <span className="note-tab"
      onClick={e=>changeNote(id)}
      >
      T: {title}
    </span>
    
  );
}

function Note({id, textProp, saveNote}) {

  var [text,setText] = useState(textProp);
  const textChangeHandler = (e) => {
    console.log("inside textChangeHandler")

    setText(e.target.value);
    // debugger;
    console.log('calling save note with id: ', id, ", text:", text);
    saveNote(id, e.target.value);
  }
  return (
    <div className="note">
      <textarea value={text} 
        onChange={e => textChangeHandler(e)}
      />
    </div>

  );
}

function App() {
  var [notes,setNotes] =useState([]);
  // var [currentNoteId, setCurrentNoteId] = useState(0);
  var [currentNote, setCurrentNote] = useState({id:1, text:''});

  useEffect(()=>{
    addNote(); // start with one note empty
  },[]);
  
  const addNote=()=>{
    var noteId = notes.length+1;
    var note = {
      id:  notes.length+1,
      title: `note ${noteId}`,
      text: ''
    }

    setNotes([...notes,note]);
    setCurrentNote(note);
  };

  var [showNoteSelect, setShowNoteSelect] = useState(false);
  const handleTabMenuClick = () =>{
    console.log("inside handleTabMenuClick");
    setShowNoteSelect(flag => !flag);
  }

  const handleSaveNote = (id, text) =>{
    console.log("inside handleSaveNote id:", id , ";text:", text);

    // notes state
    // debugger;
    var oldNotes = [...notes];
    var note = oldNotes.find(n => n.id == id);
    if(note){
      note.text = text;
      setNotes([...oldNotes]);

      // change current note 
      setCurrentNote(note => note.text = text);
    }
  }

  const changeNote = (id)=>{
    console.log("inside change note to id:", id);
    var note = notes.find(n=> n.id == id);
    console.log("note:", note);
    if(note){
      setCurrentNote({id:note.id, text: note.text, title: note.title});
    }
  }
  return (
    <div className="App">
      <h1>jigs notes</h1>
      <button onClick={addNote}>Add</button>
      <div className="note-tab-list">
        {
          notes.map((n,i)=> <NoteTab key={i} id={n.id} title={n.title} changeNote={changeNote}/>)
        }
        <button className="tab-menu" onClick={handleTabMenuClick}> { showNoteSelect ?'open': 'close'} </button>

        {
          !showNoteSelect && 
          <select className="tab-select">
            {notes.map((n,i) => <option key={i} value={n.id}>{n.title}</option>)}
          </select>
        }
      </div>

      <div id="current-note">
        <Note id={currentNote.id} textProp={currentNote.text} saveNote={handleSaveNote}/>
      </div>
    </div>
  );
}



export default App;
