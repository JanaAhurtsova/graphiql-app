import hero from 'assets/svg/hero.svg';

import styles from '../WelcomePage.module.scss';
import gsap from 'gsap';
import { useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGetLocalization } from '@/hooks/reduxHooks';
import langJSON from 'assets/json/localization.json';

gsap.registerPlugin(ScrollTrigger);

export const Welcome = () => {
  const { lang } = useGetLocalization();
  const heroRef = useRef<HTMLImageElement | null>(null);
  const welcomeRef = useRef(null);

  useEffect(() => {
    if (ScrollTrigger.isTouch !== 1) {
      gsap.fromTo(
        heroRef.current,
        { rotate: 0 },
        {
          rotate: 360,
          scrollTrigger: {
            trigger: heroRef.current,
            start: '-200',
            end: '1500',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
      gsap.fromTo(
        welcomeRef.current,
        { opacity: 1 },
        {
          opacity: 0.2,
          scrollTrigger: {
            trigger: welcomeRef.current,
            start: 'bottom',
            end: '1500',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }
  }, []);

  const backgroundImageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      if (backgroundImageRef.current) {
        backgroundImageRef.current.style.transform = `translateY(${scrollPosition * 0.8}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.parallaxContainer}>
      <div className={styles.backgroundImage} ref={backgroundImageRef}></div>
      <header className={styles.hero_section}>
        <img data-speed="0.1" className={styles.hero} src={hero} alt="Alt" ref={heroRef} />
        <h1 data-speed=".5" ref={welcomeRef} className={styles.main_title} data-testid="main_title">
          {langJSON[lang].welcomeText}
        </h1>
      </header>
    </div>
  );
};
