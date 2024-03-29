import {useEffect, useState} from 'react';
import {NextPage} from 'next';
import styled from 'styled-components';

import notFoundSubjects, {NotFoundSubject} from '../constants/client/404';

import NotFoundHero from '../components/NotFoundHero';

const Container = styled.main`
  width: 100%;
  height: 100%;

  align-self: stretch;
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const NotFoundPage: NextPage = () => {
  const [notFoundSubject, setNotFoundSubject] = useState<
    NotFoundSubject | Partial<NotFoundSubject>
  >({});

  useEffect(
    () => setNotFoundSubject(notFoundSubjects[Math.floor(Math.random() * notFoundSubjects.length)]),
    []
  );

  return (
    <Container>
      <NotFoundHero subject={notFoundSubject} />
    </Container>
  );
};

export default NotFoundPage;
