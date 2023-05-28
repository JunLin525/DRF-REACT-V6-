import React, { useState, useEffect } from 'react'
import ListItem from '../components/Listitem'
import AddButton from '../components/AddButton'
const NoteListPage = () => {

    let [notes, setNotes] = useState([])
    useEffect(() => {
        getNotes()
    }, [])

    let getNotes = async () => {
        let response = await fetch('/api/notes/')//package.json have proxy so no need full ip or url
        let data = await response.json()
        setNotes(data)
    }

  return (
    <div className="notes">
      <div className="notes-header">
          <p className="notes-count">Total is  {notes.length}  Notes </p>
      </div>
      <div className="notes-list">
            {notes.map((note, index) =>(
                <ListItem key={index} note={note} />
            ))}
      </div>
      <AddButton />
    </div>
  )
}

export default NoteListPage;
