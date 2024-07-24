'use client';
import React from 'react';
import styles from './loading.module.css'

const Loading = () => {
  return (
    <div className="hidden lg:flex items-center justify-center h-full w-full mx-auto bg-white">
      <div className={`${styles.animateSpin} rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500`}></div>
      <style jsx>{`
        .
      `}</style>
    </div>
  );
};

export default Loading;
