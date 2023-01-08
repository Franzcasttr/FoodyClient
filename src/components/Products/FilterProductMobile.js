import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Hr } from '..';
import { fetchProductBySearch2 } from '../../actions/product';
import { ImCross } from 'react-icons/im';

function useQuery() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}

const FilterProductMobile = (props) => {
  const { categories } = useSelector((state) => state.category);
  const { products } = useSelector((state) => state.product);
  const [catalog, setCatalog] = useState('');

  const query = useQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const search = query.get('searchQuery');
  const sort = query.get('sort');
  // const catalogs = query.get('catalog');
  // console.log(catalog);

  // const handleClick = (name) => {
  //   setCategory(name);
  //   if (category === name) {
  //     navigate(
  //       `/products/search?searchQuery=${search}&catalog=${category}&sort=${sort}`
  //     );
  //     dispatch(fetchProductBySearch2({ search, sort, catalog }));
  //   }
  // };

  useEffect(() => {
    dispatch(fetchProductBySearch2({ search, sort, catalog }));
    navigate(
      `/products/search?searchQuery=${search}&catalog=${catalog}&sort=${sort}`
    );
  }, [catalog]);

  const handleChange = async (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setCatalog(e.target.value);
    }
  };

  return (
    <Wrapper>
      <div className='close'>
        <ImCross onClick={() => props.setToggleFilter(false)} />
      </div>
      <div className='container'>
        <p>Filter</p>
      </div>
      <div className='option'>
        <div className='category'>
          <p>Category</p>
          {categories.map((categories, index) => {
            const name = categories.name;

            return (
              <div className='checkInput' key={index}>
                <label className='checkBox' htmlFor='checkBoxcategory'>
                  <input
                    type='checkbox'
                    name='category'
                    // id='checkBoxcategory'
                    value={name}
                    onChange={(e) => handleChange(e)}
                  />
                  {name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  padding: 1rem;
  box-shadow: var(--shadow);
  border-radius: 1rem;
  /* background: var(--background); */
  background: white;
  width: 15rem;
  height: 100vh;
  z-index: 1;
  top: 0;
  .close {
    display: flex;
    justify-content: end;
    margin-bottom: 2rem;
    color: red;
    font-size: 1rem;
    cursor: pointer;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .reset {
      color: var(--clr-primary-1);
      cursor: pointer;
    }
  }

  .option {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .checkInput {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    padding: 0.5rem;
    background: var(--clr-light-grey2);
    border-radius: 10px;
    cursor: pointer;

    button {
      cursor: pointer;
    }

    .checkBox {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      gap: 1rem;
    }
  }
  @media (min-width: 768px) {
    display: none !important;
  }
`;
export default FilterProductMobile;
