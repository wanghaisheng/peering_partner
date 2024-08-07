

import React from 'react';

const ErrorComponent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center w-full text-center p-4">
      <h1 className="text-4xl font-bold p-4">Hang Tight!</h1>
      <h2 className='text-2xl font-bold'>The service is temporarily unavailable</h2>
      <p>The server is busy. This might take a little time, so please try again shortly.</p> 
      <p>Thank you for your patience and understanding! You can also find further resources at <a className='text-blue-500' href='https://peeringpartner.com/'>peeringpartner.com</a></p>
      
    </div>
  );
};

export default ErrorComponent;
