// @flow
import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import variables from './variables';

const Container = styled.div`
  color: ${variables.colorWhite};
  width: 230px;
  height: 230px;
  padding: 24px 24px;
  background: ${props => (props.color ? props.color : null)};
  ${({ theme }) => breakpoint('tablet', theme.breakpoints)`
    width: 288px;
    height: 288px;
  `};
`;

const Title = styled.div`
  font-family: ${variables.fontSecondary};
  font-size: ${variables.fontSizeLarger};
  line-height: 1.1;
  margin-bottom: 9px;
`;

const Description = styled.div`
  font-family: ${variables.fontSecondary};
  line-height: 1.4;
`;

type Props = {
  title: string,
  description: string,
  color?: string,
};

export const MarketplaceCard = (props: Props) => (
  <Container color={props.color}>
    <Title>{props.title}</Title>
    <Description>{props.description}</Description>
  </Container>
);

export default MarketplaceCard;