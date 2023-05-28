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
    


    let createNote = async ()=> {
      fetch(`/api/notes/create/`,{
        method:"POST",
        'headers' :{
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(note)
      })
    }



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
    let deleteNote = async()=>{
      fetch(`/api/notes/${noteID}/delete/`,{
        method:"DELETE",
        'headers' :{
            'Content-Type': 'application/json'

        }
      })
      navigate('/')
    }

   // let DoneNote = async()=>{
   //   navigate('/')
   // }

    let handleSubmit = async () => {
      if(noteID !== 'new' && note.body === '' ){
        await deleteNote()// if no note trigger delete
      } else if (noteID !== 'new'){
        await updateNote()
      } else if(noteID === 'new' && note.body !== null){
        await createNote()
      }
      navigate('/')
    }
////
    let handleChange=(value)=>{
      setNote(prevNote =>({...prevNote, 'body': value}))
      console.log('Hnadle Change', note)
    }
////
  return (
    <div className="note" >
      <div className="note-header">
        <h3>
        <Arrowleft onClick={handleSubmit} />
        </h3>
        {noteID !== 'new' ? (
          <button onClick={deleteNote}>Delete</button>
        ): (
            <button onClick={handleSubmit}>Done</button>
        )}

      </div>
      <textarea onChange={(e) => { handleChange(e.target.value) }} value={note?.body}></textarea>

    </div>
  )
}

export default NotePage;