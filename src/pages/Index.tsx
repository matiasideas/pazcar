import { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Encabezado from '@/components/Encabezado';
import SeccionPrincipal from '@/components/SeccionPrincipal';
import CatalogoVehiculos from '@/components/CatalogoVehiculos';
import VehiculosDestacados from '@/components/VehiculosDestacados';
import QuienesSomos from '@/components/QuienesSomos';
import PiePagina from '@/components/PiePagina';
import BotonWhatsApp from '@/components/BotonWhatsApp';
import VendeTuAuto from '@/components/VendeTuAuto';

const videos = [
  '/videos/video-a.mp4',
  '/videos/video-b.mp4',
  '/videos/video-c.mp4',
];

const Index = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentVideo((prev) => {
        const next = (prev + 1) % videos.length;
        const vid = videoRefs.current[next];
        if (vid) { vid.currentTime = 0; vid.play(); }
        return next;
      });
    }, 5000);
  }, []);

  const changeVideo = useCallback((next: number) => {
    setCurrentVideo(next);
    const vid = videoRefs.current[next];
    if (vid) { vid.currentTime = 0; vid.play(); }
    startTimer();
  }, [startTimer]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  return (
    <main className="min-h-screen bg-background pt-16">
      <Encabezado />
      <div className="w-full aspect-[1920/814] overflow-hidden relative bg-black">
        {videos.map((src, i) => (
          <video
            key={src}
            ref={(el) => { videoRefs.current[i] = el; }}
            src={src}
            autoPlay={i === 0}
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === currentVideo ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        {/* Arrows */}
        <button
          onClick={() => changeVideo((currentVideo - 1 + videos.length) % videos.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-red-600/80 hover:bg-red-700 text-white rounded-full p-2 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => changeVideo((currentVideo + 1) % videos.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-red-600/80 hover:bg-red-700 text-white rounded-full p-2 transition-all"
        >
          <ChevronRight size={24} />
        </button>
        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => changeVideo(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === currentVideo ? 'bg-white scale-110' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
      <SeccionPrincipal />
      <div id="destacados">
        <VehiculosDestacados />
      </div>
      <CatalogoVehiculos />
      <VendeTuAuto />
      <QuienesSomos />
      <div id="footer">
        <PiePagina />
      </div>
      <BotonWhatsApp />
    </main>
  );
};

export default Index;
