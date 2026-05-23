import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlurCircle from "../components/BlurCircle";
import { PlayCircleIcon, StarIcon } from "lucide-react";
import timeFormate from "../lib/timeFormate";
import Loading from "../components/Loading";
import { useAppContext } from "../context/appContext";

const ReleaseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const { axios, image_base_url } = useAppContext();

  const getMovieDetails = async () => {
    try {
      const { data } = await axios.get(`/api/show/tmdb/${id}`);
      if (data.success) {
        setMovie(data.movie);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, [id]);

  return loading ? (
    <Loading />
  ) : movie ? (
    <div className="px-6 md:px-16 lg:px-15 pt-30 md:pt-40">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        {movie.poster_path ? (
          <img
            src={image_base_url + movie.poster_path}
            alt={movie.title}
            className="max-md:mx-auto rounded-xl h-104 max-w-70 object-cover"
          />
        ) : (
          <div className="max-md:mx-auto rounded-xl h-104 w-70 bg-gray-800 flex items-center justify-center text-gray-500">
            No Poster
          </div>
        )}
        <div className="relative flex flex-col gap-3">
          <BlurCircle top="-100px" left="-100px" />
          <p className="text-primary">{movie.original_language?.toUpperCase() || "ENGLISH"}</p>
          <h1 className="text-4xl font-semibold max-w-96 text-balance text-white">
            {movie.title}
          </h1>
          {movie.vote_average > 0 && (
            <div className="flex items-center gap-2 text-gray-300">
              <StarIcon className="w-5 h-5 text-primary fill-primary" />
              {movie.vote_average.toFixed(1)} User Rating
            </div>
          )}
          <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
            {movie.overview}
          </p>
          <p className="text-gray-300">
            {movie.runtime ? `${timeFormate(movie.runtime)} · ` : ""}
            {movie.genres?.map((genre) => genre.name).join(", ")}
            {movie.release_date ? ` · ${movie.release_date.split("-")[0]}` : ""}
          </p>
          <p className="text-primary font-semibold mt-2">
            Release Date: {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : "TBA"}
          </p>
          <div className="flex items-center flex-wrap gap-4 mt-4">
            <button className="flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95 text-white">
              <PlayCircleIcon className="w-5 h-5" />
              Watch Trailer
            </button>
          </div>
        </div>
      </div>

      {movie.casts && movie.casts.length > 0 && (
        <>
          <p className="text-lg font-medium mt-20 text-white">Cast</p>
          <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
            <div className="flex items-center gap-4 w-max px-4">
              {movie.casts.slice(0, 12).map((cast, index) => (
                <div key={index} className="flex flex-col items-center text-center w-24">
                  {cast.profile_path ? (
                    <img
                      src={image_base_url + cast.profile_path}
                      alt={cast.name}
                      className="rounded-full h-20 w-20 object-cover"
                    />
                  ) : (
                    <div className="rounded-full h-20 w-20 bg-gray-700 flex items-center justify-center text-xs text-gray-400">
                      No Image
                    </div>
                  )}
                  <p className="mt-2 text-sm text-gray-300 truncate w-full">{cast.name}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="flex justify-center mt-20 mb-20">
        <button
          onClick={() => {
            navigate("/releases");
            scrollTo(0, 0);
          }}
          className="px-10 py-3 text-sm bg-gray-800 hover:bg-gray-700 text-white transition rounded-md font-medium cursor-pointer"
        >
          Back to Releases
        </button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <h1 className="text-2xl font-bold text-center text-white">Movie not found</h1>
    </div>
  );
};

export default ReleaseDetails;
