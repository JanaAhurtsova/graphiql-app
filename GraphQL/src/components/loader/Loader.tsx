import style from './Loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <section className={style.loader__wrapper}>
      <div className={style.loader}>
        <div className={style.dot1}></div>
        <div className={style.dot2}></div>
        <div className={style.dot3}></div>
      </div>
    </section>
  );
};
