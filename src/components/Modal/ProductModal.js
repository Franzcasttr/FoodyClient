import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const ProductModal = () => {
  const { modal } = useSelector((state) => state.product);

  return (
    <Wrapper
      className={`${modal ? 'modal-section show-modal' : 'modal-section'}`}>
      ProductModal
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .modal-section {
    display: block;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 10%;
    height: 100%;
    background: grey;
    transition: all 0.3s linear;
    transform: translate(-100%);
    z-index: -1;
  }
  .show-modal {
    transform: translate(0);
    z-index: 999;
  }
`;
export default ProductModal;
