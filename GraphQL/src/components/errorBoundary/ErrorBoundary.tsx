import React from 'react';
import langJSON from '../../assets/json/localization.json';
import styles from './ErrorBoundary.module.scss';
import { ErrorBoundary } from 'react-error-boundary';
import { useGetLocalization } from '@/hooks/reduxHooks';
import { Modal } from 'antd';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundaryComponent: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const { lang } = useGetLocalization();

  const handleOnCatch = (error: Error, errorInfo: React.ErrorInfo) => {
    Modal.error({
      title: langJSON[lang].errorBoundary,
      content: (
        <div>
          <p>{error.message}</p>
          <p>{errorInfo.componentStack}</p>
        </div>
      ),
    });
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
