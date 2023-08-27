import './App.css'
import Button from './components/Button/Button'
import { AiFillBackward, AiFillPlayCircle, AiFillForward } from "react-icons/ai";
import { useState, useRef, useEffect } from 'react';

const songsUrl = "https://playground.4geeks.com/apis/fake/sound/";
const soundTrack = useRef("");
const [songs, setSongs] = useState([]);
const [trackStatus, setTrackStatus] = useState('play');
const [activeTrack, setActiveTrack] = useState(-1);
const [nowPlaying, setNowPlaying] = useState([]);


function App() {

  function fetchSongs() {
    fetch(songsUrl + 'songs')
      .then((response) => {
        return response.json()
      })
      .then((track) => { console.log(track); setSongs(track) })
      .catch((error) => console.log(error))
    soundTrack.current.volume = "0.50"
  }

  function songsControl(position, songsUrl, trackName) {
    setTrackStatus("pause")
    setActiveTrack(position)
    setNowPlaying([position, trackName])
    soundTrack.current.src = songsUrl
    soundTrack.current.play()
  }


  const rewind = () => {
    console.log('Rewind');
  }
  const playPause = () => {
    console.log('Play/Pause');
  }
  const forward = () => {
    console.log('Forward');
  }
  return (
    <>
      <div className='App'>
        <div className='music-player-container'>
          <div className='row-tracks'>Aquí van los tracks</div>
          <div className='row-buttons'>
            <Button symbol={<AiFillBackward />}
              clicked={rewind} />
            <Button symbol={<AiFillPlayCircle />}
              clicked={playPause} />
            <Button symbol={<AiFillForward />}
              clicked={forward} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
