import { useEffect } from 'react';
import { useState } from 'react';

function SpeedController({ playbackSpeed, changePlaybackSpeed }) {
  return (
    <div className='flex items-center gap-4 mt-4 text-sm'>
      <label htmlFor='speed-controller' className='text-slate-700'>
        Playback speed
      </label>
      <input
        id='speed-controller'
        className='cursor-pointer w-24 md:w-32'
        value={playbackSpeed}
        type='range'
        min={0.25}
        max={2}
        step={0.25}
        onChange={changePlaybackSpeed}
      />
      <span className='text-slate-600 w-4 pr-6'>{playbackSpeed}</span>
    </div>
  );
}

export default function VideoPlayer({ videoRef, currentVideo }) {
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  useEffect(() => {
    setPlaybackSpeed(1);
  }, [currentVideo]);

  function changePlaybackSpeed(event) {
    const newSpeed = parseFloat(event.target.value);
    videoRef.current.playbackRate = newSpeed;
    setPlaybackSpeed(newSpeed);
  }

  return (
    <div className='mb-8 flex-1 object'>
      <div className='bg-black'>
        <video
          ref={videoRef}
          className='w-full aspect-video shadow-2xl'
          src={currentVideo.source}
          controls
          autoPlay
        ></video>
      </div>

      <SpeedController
        playbackSpeed={playbackSpeed}
        changePlaybackSpeed={changePlaybackSpeed}
      />

      <div className='mt-6 flex flex-col gap-2 md:gap-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl md:text-2xl font-bold'>
            {currentVideo.title}
          </h1>
        </div>
        <p className='text-sm md:text-base -inherit text-slate-700'>
          {currentVideo.description}
        </p>
      </div>
    </div>
  );
}
