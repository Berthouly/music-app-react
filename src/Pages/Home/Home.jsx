import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Home.css";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const projects = [
    {
      number: "01",
      title: "Recherche",
      subtitle: "Explorer vos titres préférés",
      text: "Recherche des artistes et découvre des previews audio grâce à Deezer.",
    },
    {
      number: "02",
      title: "Écouter",
      subtitle: "La musique vous suit",
      text: "Écoute un titre pendant que tu navigues entre les pages.",
    },
    {
      number: "03",
      title: "Vos favoris",
      subtitle: "Titres sauvegardés",
      text: "Sauvegarde tes coups de cœur dans ton compte.",
    },
    {
      number: "04",
      title: "Playlists",
      subtitle: "Ta collection",
      text: "Crée tes playlists et organise tes titres préférés.",
    },
    {
      number: "05",
      title: "Compte",
      subtitle: "Inscription / Login",
      text: "N'hésite plus et inscris-toi sur notre plateforme.",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        /*
          Desktop uniquement :
          animation horizontale + pin
        */
        "(min-width: 901px)": function () {
          const getScrollAmount = () => {
            return Math.max(
              0,
              track.scrollWidth - section.offsetWidth
            );
          };

          gsap.to(track, {
            x: () => -getScrollAmount(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${getScrollAmount()}`,
              scrub: 1,
              pin: true,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
        },

        /*
          Mobile / tablette :
          aucune animation GSAP
          layout vertical normal
        */
        "(max-width: 900px)": function () {
          gsap.set(track, {
            clearProps: "all",
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <main className="home-page">
      <section className="home-hero">
        <p className="home-kicker">Music App Experience</p>

        <h1>Une expérience musicale fluide et immersive.</h1>

        <p className="home-description">
          Recherche des tracks, crée tes playlists, sauvegarde tes favoris
          et écoute ta musique dans une interface moderne.
        </p>

        <div className="home-actions">
          <Link to="/search" className="home-btn primary">
            Explorer
          </Link>

          <Link to="/register" className="home-btn secondary">
            Créer un compte
          </Link>
        </div>
      </section>

      <section className="projects-section" ref={sectionRef}>
        <div className="projects-header">
          <p className="home-kicker">Projects</p>

          <h2>Une app pensée comme une expérience musicale complète.</h2>
        </div>

        <div className="projects-track" ref={trackRef}>
          {projects.map((project) => (
            <article className="project-card" key={project.number}>
              <span>{project.number}</span>

              <div>
                <p>{project.subtitle}</p>
                <h3>{project.title}</h3>
              </div>

              <p className="project-text">{project.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;