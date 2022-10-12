import { gql, useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';

interface CountryQuery {
  country: {
    name: string;
    capital: string;
    emoji: string;
  } | null;
}

interface CountryQueryVariables {
  code: string;
}

const COUNTRY_QUERY = gql`
  query CountryQuery($code: ID!) {
    country(code: $code) {
      code
      name
      capital
      emoji
    }
  }
`;

const Country = () => {
  const { code } = useParams<'code'>();
  const { data, loading } = useQuery<CountryQuery, CountryQueryVariables>(
    COUNTRY_QUERY,
    {
      variables: { code: code! },
    }
  );

  if (loading || !data) {
    return <>Loading...</>;
  }

  const { country } = data;

  return country ? (
    <>
      <Link to="/">&larr; Back to all</Link>
      <h1>
        {country.emoji} {country.name}
      </h1>
      <div>
        <strong>Capital:</strong> {country.capital}
      </div>
    </>
  ) : (
    <>Country does not exist!</>
  );
};

export default Country;
