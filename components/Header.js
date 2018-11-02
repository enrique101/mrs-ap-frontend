import Nav from './Nav';
import Link from 'next/link';
import styled from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';
import Cart from './Cart';
import Search from './Search';

Router.onRouteChangeStart = () => {
    NProgress.start();
};
Router.onRouteChangeComplete = () => {
    NProgress.done();
};
Router.onRouteChangeError = () => {
    NProgress.done();
};

const Logo = styled.h1`
    font-size: 4rem;
    margin:0;
    padding: 0;
    position: relative;
    z-index:2;
    a{
        display: grid;
        align-items:center;
        justify-items:center;
        padding: 0;
        text-indent: -999%;
        img{
            width:27rem;
            margin: 2rem 0 2rem 1rem;
        }
    }
    @media (max-width:1300px) {
        margin: 0;
    }
`;

const StyledHeader = styled.header`
  .bar {
    border-bottom: 0.2rem solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
  }
`;

const Header = () => {
    return (
        <StyledHeader>
            <div className="bar no-print">
                <Logo>
                    <Link href="/">
                        <a><img src="/static/assets/logo.jpg" alt="Aeropost" /></a>
                    </Link>
                </Logo>
                <Nav></Nav>
            </div>
            <div className="sub-bar no-print">
                <Search />
            </div>
            <Cart />
        </StyledHeader>
    );
};

export default Header;