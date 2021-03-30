import React, { useState } from 'react';
import styled from 'styled-components';
import RightNav from '../RightNav';
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 39px;
  height: 39px;
  background-color: rgba(208, 208, 208, 0.7);

  /* border-radius: 50%; */
`;
const StyledBurger = styled.div`
  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;
  align-items: center;
  width: 30px;
  height: 30px;
  z-index: 20;
  /* display: none; */

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
    align-items: center;
  }

  div {
    width: 100%;
    height: 0.25rem;
    background-color: ${({ open }) => (open ? '#ccc' : '#333')};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s;

    &:nth-child(1) {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }
    &:nth-child(2) {
      transform: ${({ open }) => (open ? 'translateX(100)' : 'translateX(0)')};
      opacity: ${({ open }) => (open ? '0' : '1')};
    }
    &:nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;
const Burger = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Container>
        <StyledBurger open={open} onClick={() => setOpen(prev => !prev)}>
          <div></div>
          <div></div>
          <div></div>
        </StyledBurger>
      </Container>
      <RightNav open={open} />
    </>
  );
};

export default Burger;
