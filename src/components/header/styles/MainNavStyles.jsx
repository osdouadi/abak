import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    color: #000;
    font-size: var(--fontsize-simi-md);
    font-weight: 500;
    padding-left: 1rem;
    padding-right: 1rem;

    transition: all 0.3s;
  }
  &:hover {
    color: #19526d;
  }
  @media screen and (max-width: 850px) {
    color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding-top: 1.8rem;
    padding-right: 2rem;
  }
`;

export const UserAccountIcon = styled.div`
  display: none;

  @media screen and (max-width: 850px) {
    display: block;
  }
`;

export const MenuIcon = styled.div`
  display: none;

  @media screen and (max-width: 850px) {
    display: block;
  }
`;
export const MobileMenuIcon = styled.div`
  display: none;

  @media screen and (max-width: 850px) {
    display: flex;
    align-items: center;
    background-color: rgba(33, 98, 129, 0.94);
    border-radius: 0.64rem;
    margin-left: 1.7rem;
    height: 4.3rem;
    width: 4.3rem;
    justify-content: center;
  }
`;
export const NavMenuItemContainer = styled.div`
  @media screen and (max-width: 850px) {
    display: flex;
    flex-direction: column;
  }
`;
export const NavMenuItemTitle = styled.h1`
  font-size: 1.78rem;
  @media screen and (max-width: 850px) {
    padding-bottom: 0.4rem;
    color: var(--color-black-700);
    font-size: 1.56rem;
    font-weight: 600;
  }
`;
export const NavMenuItemDescription = styled.p`
  display: none;
  @media screen and (max-width: 850px) {
    display: block;
    color: rgba(0, 0, 0, 0.5);
    font-size: 1.458rem;
    text-align: right;
  }
`;
