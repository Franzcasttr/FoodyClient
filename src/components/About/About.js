import styled from 'styled-components';

const About = () => {
  return (
    <AboutWrapper>
      <h2>About us</h2>
      <br />
      <h3>Welcome to Foody!</h3>
      <br />
      <p>
        Foody brings you delicious food you can order even if you're sitting.
        We're dedicated to give the best and fresh variety of food you can find
        on the internet.
      </p>
      <br />

      <p>
        As a part of foody you are helping us to grow more and expand our range
        to serve more customers all over the place.
      </p>
      <br />

      <p>
        Founded in February 19, 2022 by Francis Castro, Foody has come a long
        way from its beginnings. When Francis Castro first started out, his
        passion for Web development and Foods, he turns his passion into
        something people can also enjoy.
      </p>
    </AboutWrapper>
  );
};

const AboutWrapper = styled.div`
  text-align: justify;
`;

export default About;
