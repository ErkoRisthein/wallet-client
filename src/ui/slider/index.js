// @flow
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import SlickSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { PrimaryButton } from '../buttons';
import { BlueTheme } from '../theme';

const settings = {
  dots: true,
  autoplay: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

const Slide = styled.div`
  padding: 1em;
  width: 100vw;
  height: 30vh;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h1`
  font-size: 30px;
  font-weight: bold;
  line-height: 1.2;
  letter-spacing: -0.8px;
  text-align: center;
`;

const Paragraph = styled.p`
  font-size: 18px;
  line-height: 1.33;
  text-align: center;
`;

const ActionButton = PrimaryButton.extend`
  background-color: ${props => props.theme.text};
  display: inline;
  width: fit-content;
  padding: 0 33px 0 33px;
`;

const SliderWithStyles = styled(SlickSlider)`
  background-color: ${props => props.theme.background};
  .slick-dots {
    bottom: 0;
  }
`;

export default () => (
  <SliderWithStyles {...settings}>
    <div>
      <Slide>
        <Heading>Congratulations</Heading>
        <Paragraph>Your account is now ready</Paragraph>
        <ActionButton>Cool, what next</ActionButton>
      </Slide>
    </div>
    <div>
      <ThemeProvider theme={BlueTheme}>
        <Slide>
          <Heading>Order your card</Heading>
          <Paragraph>
            Make everyday purchases with Bitcoin and other cryptocurrencies
          </Paragraph>
          <ActionButton>Order here</ActionButton>
        </Slide>
      </ThemeProvider>
    </div>
    <div>
      <Slide>
        <Heading>Deposit funds</Heading>
        <Paragraph>Start by depositing Bitcoin to your account</Paragraph>
        <ActionButton>Learn more</ActionButton>
      </Slide>
    </div>
  </SliderWithStyles>
);
