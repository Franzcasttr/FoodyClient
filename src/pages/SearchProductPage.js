import { Navbar, SingleFooter } from '../components';
import SearchProducts from '../components/Products/SearchProduct';

const SearchProductPage = () => {
  return (
    <>
      <Navbar />

      <SearchProducts />
      <SingleFooter />
    </>
  );
};

export default SearchProductPage;
