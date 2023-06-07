import vladimir from 'assets/img/vladimir.webp';
import jana from 'assets/img/jana.webp';
import svetlana from 'assets/img/svetlana.webp';

import styles from '../WelcomePage.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import langJSON from 'assets/json/localization.json';
import { useGetLocalization } from '@/hooks/reduxHooks';
import { useRef, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export const Team = () => {
  const { lang } = useGetLocalization();
  const vladimirRef = useRef(null);
  const janaRef = useRef(null);
  const svetlanaRef = useRef(null);

  useEffect(() => {
    if (ScrollTrigger.isTouch !== 1) {
      gsap.fromTo(
        svetlanaRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: -5,
          scrollTrigger: {
            trigger: svetlanaRef.current,
            start: '-800',
            end: '0',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      const itemsR = [janaRef, vladimirRef];

      itemsR.forEach((work) => {
        gsap.fromTo(
          work.current,
          { opacity: 0, x: 100 },
          {
            opacity: 1,
            x: 5,
            scrollTrigger: {
              trigger: work.current,
              start: '-800',
              end: '0',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }
  }, []);

  return (
    <>
      <h2 className={styles.common}>{langJSON[lang].team}</h2>
      <div className={styles.gallery__item} id={styles.item__j} ref={janaRef}>
        <div className={styles.text_block}>
          <h2 className={styles.text_block__h}>{langJSON[lang].jana}</h2>
          <p className={styles.text_block__p}>{langJSON[lang].aboutJana}</p>
        </div>
        <img src={jana} alt="Jana" className={styles.img} />
      </div>
      <div className={styles.gallery__item} ref={svetlanaRef}>
        <img src={svetlana} alt="Svetlana" className={styles.img} />
        <div className={styles.text_block}>
          <h2 className={styles.text_block__h}>{langJSON[lang].svetlana}</h2>
          <p className={styles.text_block__p}>{langJSON[lang].aboutSvetlana}</p>
        </div>
      </div>
      <div className={styles.gallery__item} id={styles.item__v} ref={vladimirRef}>
        <div className={styles.text_block}>
          <h2 className={styles.text_block__h}>{langJSON[lang].vladimir}</h2>
          <p className={styles.text_block__p}>{langJSON[lang].aboutVladimir}</p>
        </div>
        <img src={vladimir} alt="Vladimir" className={styles.img} />
      </div>
    </>
  );
};
