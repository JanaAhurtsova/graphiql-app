import graphql from 'assets/img/graphql.webp';
import rsschool from 'assets/img/rsschool.webp';
import rsreact from 'assets/img/rsreact.webp';

import styles from '../WelcomePage.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import langJSON from 'assets/json/localization.json';
import { useGetLocalization } from '@/hooks/reduxHooks';
import { useRef, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export const CommonSection = () => {
  const { lang } = useGetLocalization();
  const graphqlRef = useRef(null);
  const rsschoolRef = useRef(null);
  const rsreactRef = useRef(null);

  useEffect(() => {
    if (ScrollTrigger.isTouch !== 1) {
      const itemsL = [graphqlRef, rsreactRef];

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
              end: '0',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      gsap.fromTo(
        rsschoolRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 5,
          scrollTrigger: {
            trigger: rsschoolRef.current,
            start: '-800',
            end: '0',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }
  }, []);

  return (
    <>
      <h2 className={styles.common} data-testid="common">
        {langJSON[lang].commonInformation}
      </h2>
      <div className={styles.gallery__item} ref={graphqlRef}>
        <img src={graphql} alt="Alt" className={styles.img} />
        <div className={styles.text_block}>
          <h2 className={styles.text_block__h} data-testid="graph">
            GraphQL
          </h2>
          <p className={styles.text_block__p} data-testid="graph-desc">
            {langJSON[lang].graphQl}
          </p>
        </div>
      </div>
      <div className={styles.gallery__item} id={styles.item__rs} ref={rsschoolRef}>
        <div className={styles.text_block}>
          <h2 className={styles.text_block__h} data-testid="rs">
            RS School
          </h2>
          <p className={styles.text_block__p} data-testid="rs-desc">
            {langJSON[lang].rsSchool}
          </p>
        </div>
        <img src={rsschool} alt="Alt" className={styles.img} />
      </div>
      <div className={styles.gallery__item} ref={rsreactRef}>
        <img src={rsreact} alt="Alt" className={styles.img} />
        <div className={styles.text_block}>
          <h2 className={styles.text_block__h} data-testid="react">
            React Course
          </h2>
          <p className={styles.text_block__p} data-testid="react-desc">
            {langJSON[lang].react}
          </p>
        </div>
      </div>
    </>
  );
};
