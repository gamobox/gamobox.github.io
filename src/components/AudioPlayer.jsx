import { useEffect, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import Hover from 'wavesurfer.js/dist/plugins/hover.esm.js'
import { MdPause, MdPlayArrow, MdOutlineReplay, MdOutlineVolumeUp, MdOutlineVolumeOff } from 'react-icons/md'

export default ({ mp3, cover, title, ...props }) => {
  const id = `audio-${(Math.random() + 1).toString(36).substring(7)}`

  const [audio, setAudio] = useState()
  const [isPlaying, setIsPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoaded, setIsLoad] = useState(false)

  function formatTime(seconds) {
    const roundedSeconds = Math.round(seconds)
    const minutes = Math.floor(roundedSeconds / 60)
    const remainingSeconds = roundedSeconds % 60
    const formattedMinutes = String(minutes).padStart(2, '0')
    const formattedSeconds = String(remainingSeconds).padStart(2, '0')

    return `${formattedMinutes}:${formattedSeconds}`
  }

  const linGrad = document.createElement('canvas').getContext('2d').createLinearGradient(0, 0, 480, 40)
  linGrad.addColorStop(0, '#5f72bd')
  linGrad.addColorStop(1, '#9b23ea')

  useEffect(() => {
    const ws = WaveSurfer.create({
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
          labelSize: '10px'
        })
      ]
    })

    ws.on('ready', () => {
      setDuration(ws.getDuration())
      setAudio(ws)
      setIsLoad(true)
    })
    ws.on('timeupdate', () => {
      setTime(ws.getCurrentTime())
    })
    ws.on('click', (progress) => {
      const time = Math.floor(progress * ws.getDuration())
      setTime(time)
      ws.setTime(time)
      isPlaying ? pause() : play()
    })
  }, [])

  function play() {
    if (isLoaded) {
      setIsPlaying(true)
      audio?.play()
    }
  }

  function pause() {
    setIsPlaying(false)
    audio?.pause()
  }

  return (
    <div className="no-prose my-8 rounded border-transparent bg-neutral-200 p-3 dark:bg-zinc-800">
      <div className="flex gap-2">
        <img className="aspect-square size-24 object-cover" src={cover} alt={title} />
        <div className="flex flex-1 flex-col justify-around">
          <div className="mb-2 text-lg font-bold">{title}</div>

          <div className="flex gap-2">
            {isLoaded ? (
              <div>
                {isPlaying ? (
                  <button
                    type="button"
                    className="flex size-12 items-center justify-center rounded-sm border border-zinc-500 outline-offset-2"
                    onClick={pause}
                    aria-label="Pause"
                  >
                    <MdPause size="28" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="flex size-12 items-center justify-center rounded-sm border border-zinc-500 outline-offset-2"
                    onClick={play}
                    aria-label="Play"
                  >
                    <MdPlayArrow size="28" />
                  </button>
                )}
              </div>
            ) : (
              <span>Loading...</span>
            )}
            <div className="flex-1">
              <div id={id} />
              <div className="text-right text-xs tracking-tight text-zinc-400">
                <span>{formatTime(time)}</span>/<span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
