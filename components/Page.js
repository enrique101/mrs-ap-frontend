import React, { Component } from 'react';
import Header from './Header';
import Meta from './Meta';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';

const theme = {
  red: '#253f8a',
  black: '#333e48',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1200px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
  desKBrk : '900px',
};

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

injectGlobal`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: "Open Sans",Arial,Helvetica,sans-serif;
  }
  ul{
    padding: 0;
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
  button {  font-family: "Open Sans",Arial,Helvetica,sans-serif; }
  @media print
  {    
      .no-print, .no-print *
      {
          display: none !important;
      }
  }
`;

export default class Page extends Component {
  render() {
    return (
      <ThemeProvider theme= {theme}>
        <StyledPage>
            <Meta />
            <Header/>
            <Inner>
              {this.props.children}
            </Inner>
        </StyledPage>
      </ThemeProvider>
    )
  }
}
