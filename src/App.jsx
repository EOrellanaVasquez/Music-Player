import './App.css';
import Button from './components/Button/Button';
import Track from './components/Track/Track';
import Title from './components/Title/Title';
import { AiFillBackward, AiFillPlayCircle, AiFillPauseCircle, AiFillForward } from "react-icons/ai";
import { useState, useRef, useEffect } from 'react';

const songsUrl = "https://playground.4geeks.com/apis/fake/sound/";

async function fetchSongs() {
  try {
    const response = await fetch(songsUrl + 'songs');
    const tracks = await response.json();
    console.log(tracks);
    return tracks;
  } catch (error) {
    console.log(error);
    return [];
  }
}

function App() {
  const soundTrack = useRef(null);
  const [songs, setSongs] = useState([]);
  const [trackStatus, setTrackStatus] = useState('pause');
  const [activeTrack, setActiveTrack] = useState(-1);
  const [nowPlaying, setNowPlaying] = useState([]);

  useEffect(() => {
    async function initializeSongs() {
      const tracks = await fetchSongs();
      setSongs(tracks);
    }

    initializeSongs();
  }, []);

  function songsControl(position, songsUrl, trackName) {
    setTrackStatus("play");
    setActiveTrack(position);
    setNowPlaying([position, trackName]);
    soundTrack.current.src = songsUrl;
    soundTrack.current.play();
  }

  const changeTrack = (delta) => {
    let newTrackIndex;
    if (nowPlaying.length === 0) {
      newTrackIndex = delta === -1 ? songs.length - 1 : 1;
    } else {
      newTrackIndex = (nowPlaying[0] + delta + songs.length) % songs.length;
    }
    songsControl(newTrackIndex, songsUrl + songs[newTrackIndex].url, songs[newTrackIndex].name);
  };

  const rewind = () => {
    changeTrack(-1);
  };

  const playPause = () => {
    if (trackStatus === "play") {
      soundTrack.current.pause();
      setTrackStatus("pause");
    } else {
      if (activeTrack === -1) {
        songsControl(0, songsUrl + songs[0].url, songs[0].name);
      } else {
        soundTrack.current.play();
        setTrackStatus("play");
      }
    }
  };
  const forward = () => {
    changeTrack(1);
  };

  return (
    <>
      <div className='App'>
        <Title />
        <div className='music-player-container'>
          <div className='row-tracks'>
            {songs.map((song, index) => (
              <Track
                key={index}
                name={song.name}
                clicked={() => songsControl(index, songsUrl + song.url, song.name)}
                isActive={index === activeTrack}
              />
            ))}
          </div>
          <div className='row-buttons'>
            <Button symbol={<AiFillBackward />} clicked={rewind} />
            <Button
              symbol={trackStatus === "play" ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
              clicked={playPause}
            />
            <Button symbol={<AiFillForward />} clicked={forward} />
          </div>
        </div>
      </div>
      <audio ref={soundTrack} src="" onEnded={forward} type="audio/mpeg" hidden></audio>
    </>
  );
}

export default App;