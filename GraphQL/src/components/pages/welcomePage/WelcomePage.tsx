import hero from 'assets/svg/hero.svg';
import graphql from 'assets/img/graphql.jpg';
import rsschool from 'assets/img/rsschool.jpg';
import vladimir from 'assets/img/vladimir.jpg';
import yana from 'assets/img/yana.jpg';
import rsreact from 'assets/img/rsreact.jpg';
import svetlana from 'assets/img/svetlana.jpg';

import gsap from 'gsap';
import { useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useGetLocalization } from '@/hooks/reduxHooks';
import langJSON from '../../../assets/json/localization.json';
import styles from './WelcomePage.module.scss';

gsap.registerPlugin(ScrollTrigger);

export default function WelcomePage() {
  const { lang } = useGetLocalization();
  const heroRef = useRef(null);
  const welcomeRef = useRef(null);
  const graphqlRef = useRef(null);
  const rsschoolRef = useRef(null);
  const vladimirRef = useRef(null);
  const yanaRef = useRef(null);
  const rsreactRef = useRef(null);
  const svetlanaRef = useRef(null);
  const textRsRef = useRef(null);
  const textReactRef = useRef(null);
  const textGqRef = useRef(null);
  const textSvetlanaRef = useRef(null);
  const textYanaRef = useRef(null);
  const textVladimirRef = useRef(null);

  useEffect(() => {
    // if (ScrollTrigger.isTouch !== 1) {
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
          start: 'top',
          end: '1500',
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );
    const itemsL = [graphqlRef, textRsRef, rsreactRef, yanaRef, textSvetlanaRef, vladimirRef];

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
            end: '-200',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    const itemsR = [
      textGqRef,
      rsschoolRef,
      textReactRef,
      textYanaRef,
      svetlanaRef,
      textVladimirRef,
    ];

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
            end: '-200',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });
    // }
  }, []);

  return (
    <>
      <section>
        <div className="wrapper">
          <div className={styles.content}>
            <header className={styles.hero_section}>
              <img data-speed="0.9" className={styles.hero} src={hero} alt="Alt" ref={heroRef} />
              <div>
                <div data-speed=".5" className={styles.main_header} ref={welcomeRef}>
                  <h1 className={styles.main_title}>{langJSON[lang].welcomeText}</h1>
                </div>
              </div>
            </header>
            <div className={styles.portfolio}>
              <div className={styles.container}>
                <main className={styles.gallery}>
                  <div data-speed="0.9" className={styles.gallery__left}>
                    <img
                      className={styles.gallery__item}
                      src={graphql}
                      alt="Alt"
                      ref={graphqlRef}
                    />
                    <div className={(styles.text_block, styles.gallery__item)} ref={textRsRef}>
                      <h2 className={styles.text_block__h}>RS School</h2>
                      <p className={styles.text_block__p}>{langJSON[lang].rsSchool}</p>
                    </div>
                    <img
                      className={styles.gallery__item}
                      src={rsreact}
                      alt="Alt"
                      ref={rsreactRef}
                    />
                  </div>

                  <div data-speed="1" className={styles.gallery__right}>
                    <div className={(styles.text_block, styles.gallery__item)} ref={textGqRef}>
                      <h2 className={styles.text_block__h}>GraphQL</h2>
                      <p className={styles.text_block__p}>{langJSON[lang].graphQl}</p>
                    </div>

                    <img
                      className={styles.gallery__item}
                      src={rsschool}
                      alt="Alt"
                      ref={rsschoolRef}
                    />
                    <div className={(styles.text_block, styles.gallery__item)} ref={textReactRef}>
                      <h2 className={styles.text_block__h}>React Course</h2>
                      <p className={styles.text_block__p}>{langJSON[lang].react}</p>
                    </div>
                  </div>
                </main>
                <h2 className={styles.team__h}>{langJSON[lang].team}</h2>
                <div className={styles.gallery}>
                  <div data-speed="0.9" className={styles.gallery__left}>
                    <img className={styles.gallery__item} src={yana} alt="Alt" ref={yanaRef} />
                    <div
                      className={(styles.text_block, styles.gallery__item)}
                      ref={textSvetlanaRef}
                    >
                      <h2 className={styles.text_block__h}>{langJSON[lang].svetlana}</h2>
                      <p className={styles.text_block__p}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam corrupti
                        ut voluptatibus praesentium quae soluta at nesciunt recusandae itaque earum.
                      </p>
                    </div>
                    <img
                      className={styles.gallery__item}
                      src={vladimir}
                      alt="Alt"
                      ref={vladimirRef}
                    />
                  </div>

                  <div data-speed="1" className={styles.gallery__right}>
                    <div className={(styles.text_block, styles.gallery__item)} ref={textYanaRef}>
                      <h2 className={styles.text_block__h}>{langJSON[lang].jana}</h2>
                      <p className={styles.text_block__p}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti dolores
                        suscipit quam nostrum qui ut repellat vel ducimus cum enim.
                      </p>
                    </div>

                    <img
                      className={styles.gallery__item}
                      src={svetlana}
                      alt="Alt"
                      ref={svetlanaRef}
                    />
                    <div
                      className={(styles.text_block, styles.gallery__item)}
                      ref={textVladimirRef}
                    >
                      <h2 className={styles.text_block__h}>{langJSON[lang].vladimir}</h2>
                      <p className={styles.text_block__p}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, iusto.
                        Dolore possimus maiores fugit provident sapiente impedit ipsum inventore
                        quaerat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
