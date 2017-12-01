// @flow
import React from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Link } from 'react-router-dom';

import variables from './variables';

import { NavButton } from './ui';

import Logo from './Logo';

const Container = styled.div`
  overflow: hidden;
  position: fixed;
  z-index: ${variables.zIndexHeader};
  width: 100%;
  padding: 0 24px;
  background: ${props =>
    props.withBackground ? 'rgba(255, 255, 255, .9)' : 'transparent'};
  box-shadow: ${props =>
    props.withBackground ? variables.boxShadowNeutralSmall : 'none'};
  transition: all 0.3s;
  ${({ theme }) => breakpoint('tablet', theme.breakpoints)`
    padding: 0 48px;
  `};
`;

const InnerContainer = styled.div`
  height: 72px;
  display: flex;
  align-items: center;
  ${({ theme }) => breakpoint('tablet', theme.breakpoints)`
  `};
  '${({ theme }) => breakpoint('tablet', theme.breakpoints)`
    height: 96px;
  `};
`;

const LogoContainer = styled.div`
  ${({ theme }) => breakpoint('tablet', theme.breakpoints)`
    flex: 10%;
    margin-right: 24px;
  `};
`;

const LeftNavContainer = styled.div`
  display: none;
  ${({ theme }) => breakpoint('tablet', theme.breakpoints)`
    flex: 40%;
    display: flex;
    justify-content: flex-start;
  `};
`;

const RightNavContainer = styled.div`
  display: none;
  ${({ theme }) => breakpoint('tablet', theme.breakpoints)`
    flex: 50%;
    display: flex;
    justify-content: flex-end;
  `};
`;

const Nav = styled.div``;

const NavItem = styled.div`
  display: inline-block;
  margin-left: ${props => (props.marginLeft ? '12px' : '0')};
`;

const NavLink = styled(Link)`
  color: ${props =>
    props.color === 'blue' ? variables.colorBlue : variables.colorNeutral};
  font-size: ${variables.fontSizeSmall};
  padding: 12px 12px;
  ${({ theme }) => breakpoint('tablet', theme.breakpoints)`
    padding: 12px 18px;
    &:hover {
      color: ${props =>
        props.blue ? variables.colorBlueDark : variables.colorNeutralDark};
      text-decoration: none;
    }
  `};
`;

type Props = {
  location: Object,
  withBackground: ?boolean,
};

type State = {
  forceBackground: boolean,
};

class Header extends React.Component<Props, State> {
  state = {
    forceBackground: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const forceBackground =
      this.props.location.pathname !== '/landing' &&
      this.props.location.pathname !== '/';

    if (prevState.forceBackground !== forceBackground) {
      this.setState({ forceBackground });
    }
  }

  render() {
    return (
      <Container
        withBackground={this.props.withBackground || this.state.forceBackground}
      >
        <InnerContainer>
          <LogoContainer>
            <Link to="/landing">
              <Logo />
            </Link>
          </LogoContainer>

          <LeftNavContainer>
            <Nav>
              <NavItem>
                <NavLink to="/landing#wallet">Wallet</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/landing#card">Card</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/landing#marketplace">Marketplace</NavLink>
              </NavItem>
            </Nav>
          </LeftNavContainer>

          <RightNavContainer>
            <Nav>
              <NavItem>
                <NavLink to="/careers" color="blue">
                  We are hiring!
                </NavLink>
              </NavItem>
              <NavItem marginLeft>
                <NavButton to="/landing#wallet" color="blue" size="small">
                  Sign up
                </NavButton>
              </NavItem>
            </Nav>
          </RightNavContainer>
        </InnerContainer>
      </Container>
    );
  }
}

export default withRouter(Header);
