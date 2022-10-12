import { useParams } from 'react-router-dom';

const Country = () => {
  const { code } = useParams<'code'>();

  return <div>{code}</div>;
};

export default Country;
