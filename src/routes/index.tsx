import { gql, useQuery } from '@apollo/client';

interface AllCountriesQuery {
  countries: {
    code: string;
    name: string;
  }[];
}

const ALL_COUNTRIES_QUERY = gql`
  query AllCountriesQuery {
    countries {
      code
      name
    }
  }
`;

const Index = () => {
  const { data, loading } = useQuery<AllCountriesQuery>(ALL_COUNTRIES_QUERY);

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <ul>
      {data?.countries.map((country) => (
        <li key={country.code}>
          {country.code} - {country.name}
        </li>
      ))}
    </ul>
  );
};

export default Index;
