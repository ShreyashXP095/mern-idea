import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router'
import api from "../lib/axios.js"
import toast from "react-hot-toast"
import { ArrowLeft, ArrowLeftCircle, LoaderIcon, Trash2Icon } from 'lucide-react'
import Note from '../../../backend/src/models/Note.js'

const NoteDetailPage = () => {
  const [note,setNote] = useState([]);
  const [loading , setLoading] = useState(true);
  const [saving , setSaving] = useState(false);

  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=>{
    const fetchNote = async () =>{

      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data);
        
      } catch (error) {
        toast.error("Failed to load the note");
        console.log("Error in loading the notes in noteDetailpage",error);
      }finally{
        setLoading(false);
      }

    }

    fetchNote();
  },[id]);

  console.log({note});

  if(loading){
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
      <LoaderIcon className='animate-spin size-10'/>
      </div>
    )
  }
  const handleDelete = async () =>{
    if(!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note Delted Succesfully");
      navigate("/");
    } catch (error) {
      console.log("Error in deleting note",error);
      if(error.response.status === 429){
        toast.error("Slow down buddy",{
          icon:"💀"
        })
      }else{
        toast.error("Error in deleting the note");
      }
    }
  }

  const handlesaving = async() =>{
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please provide ntoe title and content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`,note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error in updating the note",error);
      if(error.response.status === 429){
        toast.error("slow down buddy",{
          icon:"💀"
        })
      }else{
        toast.error("Error in updating the note");
      }

    }finally{
      setSaving(false);
    }
  }
  
  return (

    <div className='min-h-screen bg-base-200'>
    <div className='container mx-auto px-4 py-8'>
    <div className='max-w-2xl mx-auto'>

    <div className='flex items-center justify-between mb-6'>
    <Link to="/" className='btn btn-ghost'>
      <ArrowLeftCircle className='size-5'/>
      Back to Notes
    </Link>
    <button className='btn btn-error btn-outline' onClick={handleDelete}> <Trash2Icon className='size-5'/>Delete Note</button>
    </div>

    <div className="card bg-base-200">
      <div className="card-body">
        <div className="form-control mb-4">
          <label className='label'>
            <span className='label-text'>Title</span>
          </label>
          <input type="text"
          placeholder='Note title'
          className='input input-bordered'
          value={note.title}
          onChange={(e)=>setNote({...note , title:e.target.value})}
           />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Content</span>
          </label>
          <textarea
            value={note.content}
            className='textarea textarea-bordered h-32'
            placeholder="Write your note here..."
            onChange={(e)=>setNote({...note , content:e.target.value})}
          />
        </div>

        <div className="card-actions justify-end">
          <button className='btn btn-primary' disabled={saving} onClick={handlesaving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>

    </div>
    </div>
    </div>
  )
}

export default NoteDetailPage
