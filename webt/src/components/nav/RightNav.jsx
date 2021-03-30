import React from 'react';
import styled from 'styled-components';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }

  @media (max-width: 768px) {
    display: none;
    flex-flow: column nowrap;
    background-color: #0d2538;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 30%;
    padding-top: 3.5rem;

    li {
      color: #fff;
    }
  } ;
`;
const RightNav = () => {
  return (
    <Ul>
      <li>Home</li>
      <li>About Us</li>
      <li>Contact Us</li>
      <li>Sign In</li>
      <li>Sugn Up</li>
    </Ul>
  );
};

export default RightNav;
