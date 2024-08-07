import React from 'react';
import Aref from '../../../public/aref.png'; 

const ErrorComponent: React.FC = () => {
  return (
    <div className='min-h-screen w-full bg-white'>
      <div className='h-16 w-full bg-blue-600'>
        <img 
          className='pt-1 pl-5' 
          src={(Aref as { src: string }).src}
          alt="Error Icon"
          
        />
      </div>
      <div className="min-h-screen text-black flex flex-col justify-center items-center w-full text-center p-4">
        <h1 className="text-4xl font-bold p-4">Hang Tight!</h1>
        <h2 className='text-2xl font-bold'>The service is temporarily unavailable</h2>
        <p>The server is busy. This might take a little time, so please try again shortly.</p>
        <p>Thank you for your patience and understanding! You can also find further resources at <a className='text-blue-500' href='https://peeringpartner.com/'>peeringpartner.com</a></p>
      </div>
    </div>
  );
};

export default ErrorComponent;
