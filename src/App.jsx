import React, { useState, useEffect, useRef } from 'react';

const Api = '/assets/api.json';

const App = () => {
    const [songs, setSongs] = useState([]);
    const [selectedSong, setSelectedSong] = useState(0);
    const audioRef = useRef();

    useEffect(() => {
        fetch(Api)
            .then(response => {
                if (response.ok) {
                    return response.json(); 
                } else {
                    throw new Error('Network response was not ok.'); 
                }
            })
            .then(data => setSongs(data)) 
            .catch(error => console.error("Zepsułeś tutaj:", error)); 
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load();
        }
    }, [selectedSong]);

    const playSong = () => {
        audioRef.current.play();
    };

    const pauseSong = () => {
        audioRef.current.pause();
    };

    if (songs.length < 1) {
        return (<div>Loader...</div>)
    }
  return (
    <div className='min-h-screen bg-gray-900 text-white justify-center items-center flex-col m-auto'>
        <section className='bg-black text-white p-8 text-center'>
            <h1 className="text-3xl font-bold mb-4">
                Spotify
            </h1>
            <div className="bg-red-500 p-4 text-white">Test Tailwind</div>
            <img src={songs[selectedSong].cover} />
            <button className='bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-full cursor-pointer' onClick={playSong}>
                    Play
                </button>
                <button className='bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-full cursor-pointer' onClick={pauseSong}>
                    Pause
                </button>
                <audio ref={audioRef}>
                    <source src={songs[selectedSong].audio} type="audio/mpeg" />
                </audio>
        </section>
      <section>
          <h1 className="text-2xl font-semibold mb-4 text-center">
              Songs:
          </h1>
          <ul className="flex flex-col space-y-2">
              {songs.map((song, index) => (
                  <li key={song.id} onClick={() => setSelectedSong(index)} className={`text-center py-2 px-4 cursor-pointer rounded-lg ${songs[selectedSong].id === song.id ? 'bg-gray-700' : 'bg-gray-800'}`} >
                      {song.title} by {song.author}
                  </li>
              ))}
          </ul>
      </section>
    </div>
  )
}
export default App