import { ScaleLoader } from 'react-spinners';

export default function Loading(props) {
  if (props?.children) {
    return (
      <div className="d-flex flex-col justify-content-center align-items-center gap-1">
        <ScaleLoader height={25} color={'#18A0FB'} {...props} />
        <strong>{props?.children}</strong>
      </div>
    );
  }

  return <ScaleLoader height={25} color={'#18A0FB'} {...props} />;
}
