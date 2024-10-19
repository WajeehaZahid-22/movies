import React , {useEffect, useState} from 'react';
import Api from './Api'
import {db} from '../config/firebase'
import { getDocs , collection } from 'firebase/firestore';
const Home = () => {
  const [movies, setMovies]=useState()
  const [title , setTitle]=useState('')
  const [genre , setGenre]=useState('')
  const [rating , setRating]=useState('')
  useEffect(()=>{
    const fetchMovies=async()=>{
      try{
        const querySnapshot=await getDocs(collection(db , 'movies'),{
          title:title,
          genre:genre,
          rating:rating,
        })
        const mapData=querySnapshot.docs.map((doc)=>({
          id:doc.id,
          ...doc.data()
        }
      ))
      setMovies(mapData)
      setTitle('')
      setGenre('')
      setRating('')
        
      }
      catch(err){
console.log('error')
      }
    }
    fetchMovies()
},[])
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Movie App</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl mb-4">Add New Movie</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            name="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
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
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Rating</label>
          <input
            name="rating"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            placeholder="Rating"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Thumbnail URL</label>
          <input
            name="thumbnail"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Thumbnail URL"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Movie
        </button>
      </div>
      <h2 className="text-2xl mb-4">Movies</h2>
      <div className="grid grid-cols-3 gap-4">
        {
          movies.map((movie , index)=>(
          <div  className="rounded overflow-hidden shadow-lg">
              <div className="font-bold text-xl mb-2"
              value={title}
              >{movie.title}</div>

            <img className="w-full " src={movie.thumbnail} alt='Mypic' />
            <div className="">
              <p className="text-gray-700 text-base"
              value={genre}
              >
                Genre: {movie.genre}
              </p>
              <p className="text-gray-700 text-base"
              value={rating}
              >Rating: {movie.rating}</p>
              <strong className="text-gray-700 text-base">Reviews : </strong> <br/>
              <button className="text-gray-700 text-base border-2"> 👍Add Reviews</button><br/>

            </div>
            <div className="px-6 pt-4 pb-2 flex justify-between">
              <button className=" hover:bg-gray-100 border border-black w-16  text-black font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                Edit
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white w-20 py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </div>
          </div>
          ))
        }
      </div>
    </div>
  );
};

export default Home;
