import { FadeLoader } from 'react-spinners';

export default function Loader(props) {
  if (!props?.loading) {
    return <></>;
  }
  return (
    <div
      className="justify-content-center align-items-center"
      style={{
        backgroundColor: '#d4d5d64d',
        position: 'absolute',
        margin: 'auto',
        display: 'flex',
        width: '100%',
        height: 'calc(100vh - 58px)',
        zIndex: 10,
        top: '58px',
      }}
    >
      <FadeLoader
        {...props}
        color={'#18A0FB'}
        cssOverride={{
          position: 'absolute',
          margin: 'auto',
          display: 'flex',
          top: '30%',
          left: '50%',
          opacity: 1,
          zIndex: 20,
        }}
      />
    </div>
  );
}
