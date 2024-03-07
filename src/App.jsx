import { useEffect, useRef, useState } from 'react';
import videosData from '/src/assets/videos';
import Playlist from './components/Playlist';
import VideoPlayer from './components/VideoPlayer';

function App() {
  const videoRef = useRef(null);
  const [videos, setVideos] = useState(videosData);
  const [currentVideo, setCurrentVideo] = useState(videos[0]);

  // Setting the title of the document to the video title
  useEffect(() => {
    document.title = currentVideo.title + ' - FooTube';
  }, [currentVideo]);

  // Play next video when current finishes playing
  useEffect(() => {
    const handleVideoEnded = () => {
      setCurrentVideo((prevVideo) => {
        const currentIndex = videos.findIndex(
          (video) => video.id === prevVideo.id
        );
        const nextIndex = (currentIndex + 1) % videos.length;
        return videos[nextIndex];
      });
    };

    videoRef.current.addEventListener('ended', handleVideoEnded);
    return () => {
      videoRef.current.removeEventListener('ended', handleVideoEnded);
    };
  }, [videos]);

  function changeCurrentVideo(e, index) {
    setCurrentVideo(videos[index]);
  }

  return (
    <main className='text-slate-900'>
      <header className='text-lg py-2 px-4 font-bold'>
        <a href='.'>FooTube</a>
      </header>

      <section className='lg:flex gap-6 pt-4 justify-center mx-4 lg:mx-10'>
        <VideoPlayer videoRef={videoRef} currentVideo={currentVideo} />
        <Playlist
          videos={videos}
          setVideos={setVideos}
          currentVideo={currentVideo}
          changeCurrentVideo={changeCurrentVideo}
        />
      </section>

      <footer className='text-md font-medium mt-12 mb-4 flex justify-center text-center'>
        <div className='flex flex-col gap-1'>
          <p>FooTube, {new Date().getFullYear()}</p>
          <p>
            <a
              className='hover:text-slate-600'
              href='https://alabhyajindal.com/'
            >
              Alabhya Jindal
            </a>
          </p>
          <p></p>
        </div>
      </footer>
    </main>
  );
}

export default App;
