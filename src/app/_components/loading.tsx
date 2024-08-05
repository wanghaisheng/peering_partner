'use client';
import React from 'react';
import styles from './loading.module.css'

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[75vh] w-full mx-auto bg-white">
      <div className={`${styles.animateSpin} rounded-full h-16 w-16 lg:h-32 lg:w-32 border-t-2 border-b-2 border-blue-500`}></div>
      <style jsx>{`
        .
      `}</style>
    </div>
  );
};

export default Loading;
