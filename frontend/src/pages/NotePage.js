import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { ReactComponent as Arrowleft } from '../assets/arrow-left.svg'
//import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
const NotePage = () => {

  const{ noteID } = useParams();
  const navigate = useNavigate();
  let [note, setNote] = useState(null)


  useEffect(() => {
    let getNote = async () => {
      let response = await fetch(`/api/notes/${noteID}`)
      let data = await response.json()
      setNote(data)
    }

    getNote()
  }, [noteID])
    
    let updateNote = async () => {
      try{
      const response = await fetch(`/api/notes/${noteID}/update/`,{
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(note)
      })
      if (response.ok){
        console.log('Note updated successfully!')
      } else {
        console.error('Failed to update note', response.status)
      }
    } catch(error){
      console.error('Error updating note', error)
    }  

    }

    let handleSubmit = async () => {
      await updateNote()
      navigate('/')
    }

  return (
    <div className="note" >
      <div className="note-header">
        <h3>
        <Arrowleft onClick={handleSubmit} />
        </h3>
        
      </div>
      <textarea onChange={(e) => {setNote({...note, 'body':e.target.value})}} defaultValue={note?.body}></textarea>
    </div>
  )
}

export default NotePage;