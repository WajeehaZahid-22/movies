import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";

function Movie({ handleEdit }) {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("genre"); 

  const movieData = async () => {
    try {
      const querySnapShot = await getDocs(collection(db, "movies"));
      const mapData = querySnapShot.docs.map((doc) => ({
        id: doc.id,
        review: doc.data().review || 0,
        ...doc.data(),
      }));
      setMovies(mapData);
    } catch (err) {
      console.log("error");
    }
  };

  useEffect(() => {
    movieData();
  }, []);

  const updateReview = (id) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, review: movie.review + 1 } : movie
      )
    );
  };

  const renderStars = (count) => {
    const maxStars = 5;
    if (count < 0) {
      count = 0;
    } else if (count > maxStars) {
      count = maxStars;
    }
    const stars = "★".repeat(count);
    const emptyStars = "☆".repeat(maxStars - count);
    return stars + emptyStars;
  };

  async function handleDelete(id) {
    const deleteMovie = await doc(db, "movies", id);
    deleteDoc(deleteMovie);
    setMovies(movies.filter((movie) => movie.id !== id));
  }

  const filteredMovies = movies
    .filter((movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "genre") {
        return a.genre.localeCompare(b.genre);
      }
      return b.rating - a.rating; 
    });

  return (
    <div className="container mx-auto p-8">
      <h5 className="text-3xl font-bold mb-4">Search Movies</h5>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded p-2 mr-2 w-150"
        />
        <label htmlFor="">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded p-2"
        >
          <option value="genre"> Genre</option>
          <option value="rating"> Rating</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMovies.map((data) => (
          <div key={data.id} className="rounded overflow-hidden shadow-lg">
            <div className="font-bold text-xl mb-2">Title: {data.title}</div>
            <img className="w-full" src={data.thumbnail} alt={data.title} />
            <div className="p-4">
              <p className="text-gray-700 text-base">Genre: {data.genre}</p>
              <p className="text-gray-700 text-base">Rating: {data.rating}</p>
              <strong className="text-gray-700 text-base">
                Reviews: {renderStars(data.review || 0)}
              </strong>
              <br />
              <button
                className="text-gray-700 text-base border-2 mt-2 p-1"
                onClick={() => updateReview(data.id)}
              >
                👍 Add Reviews
              </button>
            </div>
            <div className="px-6 pt-4 pb-2 flex justify-between">
              <button
                className="hover:bg-gray-100 border border-black w-16 text-black font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleEdit(data)}
              >
                Edit
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white w-20 py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleDelete(data.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movie;
