import React from 'react';

import langJSON from '../../assets/json/localization.json';
import styles from './ErrorBoundary.module.scss';
import { ErrorBoundary } from 'react-error-boundary';
import { useGetLocalization } from '@/hooks/reduxHooks';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundaryComponent: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const { lang } = useGetLocalization();

  const handleOnCatch = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error(error);
    console.error(errorInfo);
  };

  return (
    <ErrorBoundary
      fallback={
        <>
          <h1 className={styles.h}>{langJSON[lang].errorBoundary}</h1>
          <img className={styles.cat} src="/cat.jpg" alt="cat" />
        </>
      }
      onError={handleOnCatch}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryComponent;
