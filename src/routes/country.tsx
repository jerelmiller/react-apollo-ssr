import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { graphql } from '../gql';

import Tabs from '../Tabs';

const COUNTRY_QUERY = graphql(/* GraphQL */ `
  query CountryQuery($code: ID!) {
    country(code: $code) {
      code
      name
      capital
      emoji
    }
  }
`);

const Country = () => {
  const [selectedTab, setSelectedTab] = useState('states');
  const { code } = useParams<'code'>();
  const { data, loading } = useQuery(COUNTRY_QUERY, {
    variables: { code: code! },
  });

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
      <Tabs onChange={(value) => setSelectedTab(value)} value={selectedTab}>
        <Tabs.TabItem title="States" value="states">
          <States countryCode={country.code} />
        </Tabs.TabItem>
        <Tabs.TabItem title="Languages" value="languages">
          <Languages countryCode={country.code} />
        </Tabs.TabItem>
      </Tabs>
    </>
  ) : (
    <>Country does not exist!</>
  );
};

const LANGUAGES_QUERY = graphql(/* GraphQL */ `
  query LanguagesQuery($countryCode: ID!) {
    country(code: $countryCode) {
      code
      languages {
        code
        name
      }
    }
  }
`);

interface LanguagesProps {
  countryCode: string;
}

const Languages = ({ countryCode }: LanguagesProps) => {
  const { data, loading } = useQuery(LANGUAGES_QUERY, {
    variables: { countryCode },
  });

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <ul>
      {data?.country?.languages.map((language) => (
        <li key={language.code}>{language.name}</li>
      ))}
    </ul>
  );
};

const STATES_QUERY = graphql(/* GraphQL */ `
  query StatesQuery($countryCode: ID!) {
    country(code: $countryCode) {
      code
      states {
        name
      }
    }
  }
`);

interface StatesProps {
  countryCode: string;
}

const States = ({ countryCode }: StatesProps) => {
  const { data, loading } = useQuery(STATES_QUERY, {
    variables: { countryCode },
  });

  if (loading) {
    return <>Loading...</>;
  }

  const states = data?.country?.states ?? [];

  return states.length ? (
    <ul>
      {states.map((state) => (
        <li key={state.name}>{state.name}</li>
      ))}
    </ul>
  ) : (
    <>No states</>
  );
};

export default Country;
