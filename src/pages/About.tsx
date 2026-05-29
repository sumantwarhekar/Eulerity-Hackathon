import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--text-main);
  margin-bottom: 1.5rem;
`;

const Content = styled.div`
  font-size: 1.125rem;
  color: var(--text-muted);
  line-height: 1.8;

  p {
    margin-bottom: 1.5rem;
  }
`;

export const About: React.FC = () => {
  return (
    <AboutContainer>
      <Title>About PetBrowser</Title>
      <Content>
        <p>
          Welcome to PetBrowser, a beautiful front-end application built for the Eulerity Take-Home Challenge.
          This project demonstrates modern web development practices using React, TypeScript, and Vite.
        </p>
        <p>
          Key features include:
        </p>
        <ul>
          <li>Responsive grid layout tailored for Mobile, Tablet, and Desktop.</li>
          <li>Global state management preserving your selections across dynamic routes.</li>
          <li>File size estimations and bulk image downloading via JSZip.</li>
          <li>Optimized infinite scrolling powered by Intersection Observers.</li>
          <li>Glassmorphism UI elements built with styled-components.</li>
        </ul>
        <p style={{ marginTop: '2rem' }}>
          Thank you for reviewing my submission!
        </p>
      </Content>
    </AboutContainer>
  );
};
