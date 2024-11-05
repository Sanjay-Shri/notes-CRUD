import React ,{useState,useEffect} from 'react'
import NoteCard from '../Component/NoteCard'
import MyNavbar from '../Component/MyNavbar'
import Example from '../Component/CreateNote'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'




const Home = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  const handleCreate= async (title,description,handleClose)=>{
    try{
      const apiURL = "http://localhost:5000/api/note/create";
      const response = await axios.post(apiURL,{
        title,
        description,
      },
      {
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`,

        },
      }
    );
    if(response.data.success){
      handleClose();
      navigate("/")
    }

  } catch (err){
    console.log(err);
  }
};
useEffect(() => {
  const fetchNotes = async () => {
    try {
      const apiURL = "http://localhost:5000/api/note/";
      const response = await axios.get(apiURL);
      if (response.data.success) {
        setNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchNotes();
}, []);

  return (
    <div>
      <h1>This is home page</h1>
      <MyNavbar/>
      <div className="container mt-2">
      <Example handleCreate={handleCreate}/>
      <div className="notes d-flex gap-3 mt-2 flex-wrap">
          {notes.map((note) => (
            <NoteCard note={note} key={note._id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
