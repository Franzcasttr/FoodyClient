import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import { Footer, Navbar } from '../components';
import { singleproduct, singleproductreview } from '../actions/product';
import SingleProduct from '../components/Products/SingleProduct';

const SingleProductPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();

  const dispatch = useDispatch();

  const { single_product } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(singleproduct(id));
    dispatch(singleproductreview(id));
  }, [dispatch, id]);

  return (
    <>
      <Nav>
        <Navbar />
      </Nav>
      {single_product.map((item, index) => {
        return <SingleProduct key={index} product={item} />;
      })}

      <SingleFooter>
        <Footer />
      </SingleFooter>
    </>
  );
};
const SingleFooter = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
`;

const Nav = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
`;

export default SingleProductPage;
