import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { ReactComponent as Arrowleft } from '../assets/arrow-left.svg'
import { Link } from 'react-router-dom'
const NotePage = () => {

  const{ noteID } = useParams();
  let [note, setNote] = useState(null)


  useEffect(() => {
    let getNote = async () => {
      let response = await fetch(`/api/notes/${noteID}`)
      let data = await response.json()
      setNote(data)
    }

    getNote()
  }, [noteID])
    
    let updateNote async () => {
      fetch(`/api/notes/${noteId}/update/`,{
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(note)
      })
    }
    let handleSubmit =()
  return (
    <div className="note" >
      <div className="note-header">
        <h3>
        <Link to ="/">
        <Arrowleft />
        </Link>
        </h3>
        
      </div>
      <textarea onChange={(e) => {setNote({...note, 'body':e.target.value})}} defaultValue={note?.body}></textarea>
    </div>
  )
}

export default NotePage;
