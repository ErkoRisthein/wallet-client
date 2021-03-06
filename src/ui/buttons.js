// @flow
import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

type Props = {
  alt: ?boolean,
  inline: ?boolean,
  children: any,
};

const ButtonBase = ({ alt, inline, ...props }: Props) => (
  <button {...props}>{props.children}</button>
);

export const Button = styled(ButtonBase)`
  display: ${props => (props.inline ? 'inline' : 'block')};
  width: ${props => (props.inline ? 'fit-content' : '100%')};
  padding: 0 2em 0 2em;
  height: 44px;
  border-radius: 49px;
  background-color: #ffffff;
  color: #02bda5;
  border: 0;
  margin-bottom: 6px;
  font-size: 16px;
  text-transform: uppercase;

  &:hover {
    cursor: pointer;
  }
`;

export const Link = styled(RouterLink)`
  color: inherit;
  &:hover {
    text-decoration: none;
  }
`;

export const PrimaryButton = Button.extend`
  color: white;
  background-color: ${props =>
    props.alt ? props.theme.alt : props.theme.main};
  box-shadow: 0 2px 6px 0 rgba(2, 189, 165, 0.4);
  text-transform: uppercase;

  &:disabled {
    background-color: #a1a1a1;
  }
`;

PrimaryButton.displayName = 'PrimaryButton';

export const LinkButton = Button.extend`
  color: #a1a1a1;
  font-size: 14px;
  text-transform: none;
`;

LinkButton.displayName = 'LinkButton';

export default { Button, PrimaryButton, Link };
