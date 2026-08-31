import { useEffect, useMemo, useState } from "react";
import "./App.css";

const data = {
  artist: "DEL´ØRT",
  title: "PRESSKIT",
  tagline: "Musica electronica - Zona norte, Buenos Aires, Argentina",

  bio: `Agustin Obregon aka OBREGON es un DJ de 25 años de edad, proveniente de Buenos Aires, Argentina.

Su historia comienza como raver y su motivación nace de sus ganas de estudiar el arte del Djing.
Con el tiempo pudo desarrollar un sonido techno cautivador, lleno de entretenimiento y sobrado groove, el cuál puede también combinar con un sonido más serio y underground para así presentar sesiones de tipo eclécticas, que aseguran diversidad musical y sobre todo un alto intercambio de energía.

Actualmente es residente de colission, ciclo que ya ha podido representar en diferentes cabinas de zona norte.`,

  videos: [
    {
      title: "Registro analord x colission",
      url: "https://youtu.be/-s_YLK-VAJ4?si=KgWIZU8ooKo9r41v",
    },
    {
      title: "TCQ VIDEO SET",
      url: "https://youtu.be/XqNPA7cqDCc?si=ahpgv0uJBGTamBiY",
    },
    {
      title: "Video set b2b Dj CMR",
      url: "https://youtu.be/o682VFtddT0?si=RY_z0xeLV7IGB066",
    },
  ],

  soundcloud: {
    title: "Podcast x Arzaffel",
    url: "https://soundcloud.com/arzaffel/delort-podcast-079?ref=clipboard&p=a&c=0&si=5609e6b344ff4292a7ed47176db2029b&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
  },

  contact: [
    {
      label: "SoundCloud",
      image: "/presskit/sound.jpg",
      url: "https://on.soundcloud.com/pG5311gf3LX5lfVlZn",
    },
    {
      label: "Instagram",
      image: "/presskit/inst.jpg",
      url: "https://www.instagram.com/del.0rt?igsh=dDM4ZjZxY3hqbGEw",
    },
  ],
};

const galleryTop = [
  "/presskit/pic1.jpg",
  "/presskit/pic2.jpg",
  "/presskit/pic3.jpg",
];

const galleryBottom = [
  "/presskit/pic4.jpg",
  "/presskit/pic5.jpg",
  "/presskit/hero.jpg",
];

export default function App() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 520);
  const [mobileSlide, setMobileSlide] = useState(0);

  const allGalleryImages = useMemo(() => [...galleryTop, ...galleryBottom], []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 520);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const openModalBySrc = (src) => {
    const idx = allGalleryImages.findIndex((img) => img === src);
    setActiveIndex(idx >= 0 ? idx : 0);
  };

  const closeModal = () => setActiveIndex(null);

  const goPrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? allGalleryImages.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    setActiveIndex((prev) =>
      prev === allGalleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const goMobilePrev = () => {
    setMobileSlide((prev) =>
      prev === 0 ? allGalleryImages.length - 1 : prev - 1
    );
  };

  const goMobileNext = () => {
    setMobileSlide((prev) =>
      prev === allGalleryImages.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  return (
    <main className="epk">
      <nav className="nav card">
        <a href="#inicio">INICIO</a>
        <a href="#biografia">BIOGRAFIA</a>
        <a href="#galeria">GALERIA</a>
        <a href="#videos">VIDEOS</a>
        <a href="#soundcloud">SOUNDCLOUD</a>
        <a href="#contacto">CONTACTO</a>
      </nav>

      <section id="inicio" className="hero card">
        <div className="hero-left">
          <p className="kicker">{data.title}</p>
          <h1>{data.artist}</h1>
          <p className="tagline">{data.tagline}</p>
        </div>
        <div className="hero-right">
          <img src="/presskit/hero.jpg" alt="DEL´ØRT hero" />
        </div>
      </section>

      <section id="galeria" className="section card">
        <h2>GALERIA</h2>

        {!isMobile ? (
          <Gallery images={allGalleryImages} onOpen={openModalBySrc} />
        ) : (
          <MobileCarousel
            images={allGalleryImages}
            index={mobileSlide}
            onPrev={goMobilePrev}
            onNext={goMobileNext}
            onOpen={openModalBySrc}
          />
        )}

        <p className="residency-note">Residente de Colission</p>
      </section>

      <section id="biografia" className="section card">
        <h2>BIOGRAFIA</h2>
        <p className="bio-text">{data.bio}</p>
      </section>

      <section id="videos" className="section card">
        <h2>VIDEOS</h2>
        <div className="videos-stack">
          {data.videos.map((video) => (
            <article className="video-card" key={video.url}>
              <h3>{video.title}</h3>
              <YouTubeEmbed url={video.url} title={video.title} />
            </article>
          ))}
        </div>
      </section>

      <section id="soundcloud" className="section card">
        <h2>SOUNDCLOUD</h2>
        <article className="video-card">
          <h3>{data.soundcloud.title}</h3>
          <SoundCloudEmbed
            url={data.soundcloud.url}
            title={data.soundcloud.title}
          />
        </article>
      </section>

      <section id="contacto" className="section card">
        <h2>CONTACTO</h2>
        <div className="contact-grid">
          {data.contact.map((item) => (
            <a
              key={item.label}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="contact-card"
              aria-label={item.label}
            >
              <img src={item.image} alt={item.label} />
            </a>
          ))}
        </div>
      </section>

      {activeIndex !== null && (
        <div className="modal" onClick={closeModal} role="dialog" aria-modal="true">
          <button className="modal-btn close" onClick={closeModal} aria-label="Cerrar">
            ✕
          </button>

          <button
            className="modal-btn prev"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Anterior"
          >
            ‹
          </button>

          <img
            className="modal-image"
            src={allGalleryImages[activeIndex]}
            alt={`Imagen ${activeIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="modal-btn next"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Siguiente"
          >
            ›
          </button>
        </div>
      )}
    </main>
  );
}

function Gallery({ images, onOpen }) {
  return (
    <div className="gallery3">
      {images.map((src, i) => (
        <button
          key={`${src}-${i}`}
          className="gallery-btn"
          onClick={() => onOpen(src)}
          aria-label={`Abrir imagen ${i + 1}`}
        >
          <img src={src} alt={`Galeria ${i + 1}`} />
        </button>
      ))}
    </div>
  );
}

function MobileCarousel({ images, index, onPrev, onNext, onOpen }) {
  return (
    <div className="mobile-carousel">
      <button className="mobile-carousel-btn" onClick={onPrev} aria-label="Anterior">
        ‹
      </button>

      <button
        className="mobile-carousel-image-wrap"
        onClick={() => onOpen(images[index])}
        aria-label={`Abrir imagen ${index + 1}`}
      >
        <img src={images[index]} alt={`Galeria ${index + 1}`} className="mobile-carousel-image" />
      </button>

      <button className="mobile-carousel-btn" onClick={onNext} aria-label="Siguiente">
        ›
      </button>

      <p className="mobile-carousel-counter">
        {index + 1} / {images.length}
      </p>
    </div>
  );
}

function YouTubeEmbed({ url, title }) {
  const id = getYouTubeId(url);

  if (!id) {
    return (
      <a href={url} target="_blank" rel="noreferrer">
        Ver video
      </a>
    );
  }

  return (
    <div className="embed-wrapper">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

function SoundCloudEmbed({ url, title }) {
  const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    url
  )}&color=%23000000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;

  return (
    <div className="embed-wrapper soundcloud">
      <iframe
        title={title}
        width="100%"
        height="300"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={embedUrl}
      />
    </div>
  );
}

function getYouTubeId(url) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "");
    }

    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    }

    return null;
  } catch {
    return null;
  }
}