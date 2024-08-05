'use client';

const ErrorPage = ({ error }: {error: Error}) => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <div
        dangerouslySetInnerHTML={{ __html: error.message }}
        style={{ padding: '20px', background: 'black', borderRadius: '5px' }}
      />
    </div>
  );
};

export default ErrorPage;
