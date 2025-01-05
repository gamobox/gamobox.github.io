import { useRef, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import Hover from 'wavesurfer.js/dist/plugins/hover.esm.js'
import { MdPause, MdPlayArrow, MdOutlineReplay, MdOutlineVolumeUp, MdOutlineVolumeOff  } from "react-icons/md";

export default ({mp3, cover, title, ...props}) => {
  const id = `audio-${(Math.random() + 1).toString(36).substring(7)}`;
  let wavesurfer;
  const [audio] = useState(new Audio(mp3));
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const formatTime = (time) => {
    return new Date(time * 1000).toISOString().substr(14, 5);
  }

  const linGrad = document.createElement('canvas').getContext('2d').createLinearGradient(0, 0, 480, 40);
    linGrad.addColorStop(0, '#5f72bd'); 
    linGrad.addColorStop(1, '#9b23ea');

  useEffect(() => {
    audio.id = id;
    wavesurfer = WaveSurfer.create({
      container: `#${id}`,
      waveColor: '#a1a1aa',
      progressColor: linGrad,
      url: mp3,
      height: 32,
      plugins: [
        Hover.create({
          lineColor: '#fff',
          lineWidth: 2,
          labelColor: '#fff',
          labelBackground: 'rgba(0, 0, 0, .75)',
          labelSize: '10px',
        })
      ]
    });
    audio.addEventListener('timeupdate', () => setTime(audio.currentTime));
    audio.addEventListener('durationchange', () => setDuration(audio.duration));
    wavesurfer.on('click', (progress) => {
      const time = Math.floor(progress * audio.duration);
      setTime((time));
      audio.currentTime = time;
      isPlaying ? pause() : play();
    })
  }, []);

  function play() {
    setIsPlaying(true);
    audio.play();
  }

  function pause() {
    setIsPlaying(false);
    audio.pause();
  }

  function seek(e) {
    console.log(e.target.value);
  }

  return (
    <div className="no-prose bg-neutral-200 p-3 rounded border-transparent dark:bg-zinc-800 my-8">
      <div className="flex gap-2">
        <img className="size-24 aspect-square object-cover" src={cover} alt={title} />
        <div className="flex-1">
          <div className="text-lg font-bold mb-2">{title}</div>

          <div class="flex gap-2">
            <div>
              {
                isPlaying ?
                  <button type="button" className="size-12 flex border border-zinc-500 rounded-sm items-center justify-center outline-offset-2" onClick={pause} arial-label="Pause">
                    <MdPause size="28" />
                  </button> :
                  <button type="button" className="size-12 flex border border-zinc-500 rounded-sm items-center justify-center outline-offset-2" onClick={play} arial-label="Play">
                    <MdPlayArrow size="28" />
                  </button>
              }
            </div>
            <div class="flex-1">
              <div id={id} />
              <div class="text-right text-xs text-zinc-400 tracking-tight">
                <span>{formatTime(time)}</span>/
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

