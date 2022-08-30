import './App.css';
import { useEffect, useState , useRef} from 'react'; 

function NoteTab({id, title, changeNote, deleteNote}){
  return (
    <span className="note-tab"
      onClick={e=>changeNote(id)}
      >
      {title}

      <span className="tab-close" onClick={e=> deleteNote(id)}>x</span>
    </span>
    
  );
}

/*
not working
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
*/
function App() {
  var [notes,setNotes] =useState([{id: 1, text:'', title: 'note 1'}]);
  // var [currentNoteId, setCurrentNoteId] = useState(0);
  var [currentNote, setCurrentNote] = useState({id:1, text:'', title: 'note 1'});
  var lastNoteId = useRef(1);

  useEffect(()=>{
    // addNote(); // start with one note empty
  },[]);
  
  const addNote=()=>{
    var noteId = lastNoteId.current+1;
    lastNoteId.current = lastNoteId.current + 1;
    var note = {
      id:  noteId,
      title: `note ${noteId}`,
      text: ''
    };

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
      var newCurrentNote = {text: text, id: id};
      setCurrentNote(newCurrentNote);
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

  const deleteNote = (id)=>{
    console.log("inside delete note id:", id);
    var newNotes = notes.filter(n => n.id !=id);
    setNotes([...newNotes]);
    // check if delete note is current note then set current note next note 
    if(currentNote.id  == id){
      var note = notes.find(n => n.id >id);
      if(note){
        setCurrentNote({id: note.id, text: note.text});
      }
    }
  }
  return (
    <div className="App">
      {/* <h1>jigs notes</h1> */}
      
      <button className="tab-menu" onClick={handleTabMenuClick}> { showNoteSelect ?'open': 'close'} </button>
      {
        !showNoteSelect && 
        <select className="tab-select"
          onChange={e=> changeNote(e.target.value)}
          >
          {notes.map((n,i) => 
            <option key={i} 
              value={n.id}
              >
              {n.title}
            </option>)
          }
        </select>
      }
      <button  className="add-btn"
        onClick={addNote}>
        Add
      </button>

      <div className="note-tab-list" >
        {
          notes.map((n,i)=> 
            <NoteTab key={i} id={n.id} title={n.title} 
              changeNote={changeNote}
              deleteNote={deleteNote}/>
          )
        }
        
      </div>

      <div id="current-note">
        {/* <p>current note.id : {currentNote.id}</p> */}
        {/* <p>current note text part: {currentNote.text ?currentNote.text.substring(0, 10):" empty"}</p> */}
        {/* <Note id={currentNote.id} textProp={currentNote.text} saveNote={handleSaveNote}/> */}
        <textarea 
          
          onChange={e => handleSaveNote(currentNote.id, e.target.value)}
          value={currentNote.text}>

        </textarea>
      </div>
    </div>
  );
}



export default App;
