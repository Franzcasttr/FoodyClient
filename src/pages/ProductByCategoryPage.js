import { useEffect } from 'react';
import { Navbar, SingleFooter } from '../components';
import CategoryProducts from '../components/Products/ProductByCategory';

const ProductByCategory = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Navbar />

      <CategoryProducts />
      <SingleFooter />
    </>
  );
};

export default ProductByCategory;
