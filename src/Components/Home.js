import React , {useState} from 'react';
import Movie from "./movie";
import { db  } from '../config/firebase';
import {collection , addDoc, updateDoc  , doc} from 'firebase/firestore'
const Home = () => {
  const [title , setTitle]=useState('');
  const [genre , setGenre]=useState('');
  const [rating , setRating]=useState('');
  const [thumbnail , setThumbnail]=useState('');
  const [editMode , setEditMode]=useState(false)
  const [editId , setEditId]=useState(null)
  const addMovie=async(movie)=>{
    try{
      await addDoc(collection(db ,'movies'),  {
        title:title,
        genre:genre,
        rating:rating,
        thumbnail:thumbnail,
      })
      setTitle('')
      setRating('')
      setGenre('')
      setThumbnail('')
    }
    catch(err){
      console.log("error")
    }
  }
  function handleEdit(data){
    setEditMode(true)

      setTitle(data.title)
      setRating(data.rating )
      setGenre(data.genre)
      setThumbnail(data.thumbnail)
      setEditId(data.id)
    
  }
  async function handleSave(data){
    const movieRef = doc(db, 'movies', editId);
    try {
      await updateDoc(movieRef, {
        title,
        genre,
        rating,
        thumbnail,
      });
    } catch (err) {
      console.error('Error updating movie:', err);
    }
    setTitle('')
    setGenre('')
    setRating('')
    setThumbnail('')
  }
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Movie App</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl mb-4">Add New Movie</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2"
          >Title</label>
          <input
            name="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
            placeholder="Movie Title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Genre</label>
          <input
            name="genre"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Movie Genre"
            value={genre}
            onChange={(e)=>setGenre(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Rating</label>
          <input
            name="rating"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            placeholder="Rating"
            value={rating}
            onChange={(e)=>setRating(e.target.value)}

          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Thumbnail URL</label>
          <input
            name="thumbnail"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Thumbnail URL"
            onChange={(e)=>setThumbnail(e.target.value)}
            value={thumbnail}
          />
        </div>
{!editMode &&
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={addMovie}
       >
         Add Movie
         
        </button>
}

{
   editMode &&
        <button
          className="bg-blue-500 ml-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={()=>setEditMode(false)}
       >
        Cancel
        </button>
}
{
   editMode &&
        <button
          className="bg-blue-500 ml-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={()=>handleSave()}
       >
        Save
        </button>
}
      </div>
      <Movie handleEdit={handleEdit}/>
      
    </div>
  );
};

export default Home;