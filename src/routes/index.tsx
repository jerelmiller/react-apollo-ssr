import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { graphql } from '../gql';

const ALL_COUNTRIES_QUERY = graphql(/* GraphQL */ `
  query AllCountriesQuery {
    countries {
      code
      name
    }
  }
`);

const Index = () => {
  const { data, loading } = useQuery(ALL_COUNTRIES_QUERY);

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <ul className="list-style-none">
      {data?.countries.map((country) => (
        <li key={country.code}>
          <Link to={`/countries/${country.code}`}>
            {country.code} - {country.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Index;
