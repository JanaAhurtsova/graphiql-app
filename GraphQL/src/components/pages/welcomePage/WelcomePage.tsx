import hero from 'assets/svg/hero.svg';
import graphql from 'assets/img/graphql.webp';
import rsschool from 'assets/img/rsschool.webp';
import vladimir from 'assets/img/vladimir.webp';
import jana from 'assets/img/jana.webp';
import rsreact from 'assets/img/rsreact.webp';
import svetlana from 'assets/img/svetlana.webp';
import space1 from 'assets/img/space1.webp';

import styles from './WelcomePage.module.scss';
import gsap from 'gsap';
import { useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGetLocalization } from '@/hooks/reduxHooks';
import langJSON from '../../../assets/json/localization.json';
import { Parallax } from 'react-parallax';

gsap.registerPlugin(ScrollTrigger);

export default function WelcomePage() {
  const { lang } = useGetLocalization();
  const heroRef = useRef(null);
  const welcomeRef = useRef(null);
  const graphqlRef = useRef(null);
  const rsschoolRef = useRef(null);
  const vladimirRef = useRef(null);
  const janaRef = useRef(null);
  const rsreactRef = useRef(null);
  const svetlanaRef = useRef(null);
  const pageContainerRef = useRef(null);

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

      const itemsL = [graphqlRef, rsreactRef, svetlanaRef];

      itemsL.forEach((work) => {
        gsap.fromTo(
          work.current,
          { opacity: 0, x: -100 },
          {
            opacity: 1,
            x: -5,
            scrollTrigger: {
              trigger: work.current,
              start: '-800',
              end: '100',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      const itemsR = [rsschoolRef, janaRef, vladimirRef];

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
              end: '100',
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
      <section ref={pageContainerRef}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <Parallax className={styles.space1} bgImage={space1} strength={600}>
              <header className={styles.hero_section}>
                <img data-speed="0.1" className={styles.hero} src={hero} alt="Alt" ref={heroRef} />
                <div>
                  <div data-speed=".5" className={styles.main_header} ref={welcomeRef}>
                    <h1 className={styles.main_title}>{langJSON[lang].welcomeText}</h1>
                  </div>
                </div>
              </header>
            </Parallax>
            <p className={styles.common}>{langJSON[lang].commonInformation}</p>
            <main className={styles.gallery}>
              <div className={styles.gallery__item} ref={graphqlRef}>
                <img src={graphql} alt="Alt" className={styles.img} />
                <div className={styles.text_block}>
                  <h2 className={styles.text_block__h}>GraphQL</h2>
                  <p className={styles.text_block__p}>{langJSON[lang].graphQl}</p>
                </div>
              </div>
              <div className={styles.gallery__item} id={styles.item__rs} ref={rsschoolRef}>
                <div className={styles.text_block}>
                  <h2 className={styles.text_block__h}>RS School</h2>
                  <p className={styles.text_block__p}>{langJSON[lang].rsSchool}</p>
                </div>
                <img src={rsschool} alt="Alt" className={styles.img} />
              </div>
              <div className={styles.gallery__item} ref={rsreactRef}>
                <img src={rsreact} alt="Alt" className={styles.img} />
                <div className={styles.text_block}>
                  <h2 className={styles.text_block__h}>React Course</h2>
                  <p className={styles.text_block__p}>{langJSON[lang].react}</p>
                </div>
              </div>
              <h2 className={styles.common}>{langJSON[lang].team}</h2>
              <div className={styles.gallery__item} id={styles.item__j} ref={janaRef}>
                <div className={styles.text_block}>
                  <h2 className={styles.text_block__h}>{langJSON[lang].jana}</h2>
                  <p className={styles.text_block__p}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti dolores
                    suscipit quam nostrum qui ut repellat vel ducimus cum enim.
                  </p>
                </div>
                <img src={jana} alt="Alt" className={styles.img} />
              </div>
              <div className={styles.gallery__item} ref={svetlanaRef}>
                <img src={svetlana} alt="Alt" className={styles.img} />
                <div className={styles.text_block}>
                  <h2 className={styles.text_block__h}>{langJSON[lang].svetlana}</h2>
                  <p className={styles.text_block__p}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam corrupti ut
                    voluptatibus praesentium quae soluta at nesciunt recusandae itaque earum.
                  </p>
                </div>
              </div>
              <div className={styles.gallery__item} id={styles.item__v} ref={vladimirRef}>
                <div className={styles.text_block}>
                  <h2 className={styles.text_block__h}>{langJSON[lang].vladimir}</h2>
                  <p className={styles.text_block__p}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, iusto. Dolore
                    possimus maiores fugit provident sapiente impedit ipsum inventore quaerat.
                  </p>
                </div>
                <img src={vladimir} alt="Alt" className={styles.img} />
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
}
