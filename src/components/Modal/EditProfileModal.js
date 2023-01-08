import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { updateuser } from '../../actions/user';
import FormRow from '../Form/FormRow';

const EditProfileModal = ({ user }) => {
  const dispatch = useDispatch();
  const [fullname, setFullname] = useState(user.name);
  const [images, setImages] = useState();

  const handleChange = (e) => {
    setFullname(e.target.value);
  };

  const handlePictureChange = (e) => {
    setImages(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('fullname', fullname);
    form.append('image', images);
    dispatch(updateuser(form));
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <FormRow
          labelText='Full Name'
          type='text'
          name='fullname'
          value={fullname}
          handleChange={handleChange}
        />
        <label>Change Profile</label>
        <input type='file' name='image' onChange={handlePictureChange} />
        <button onClick={handleSubmit} className='btn-save'>
          Update
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.2rem 2rem;

    input[type='text'] {
      height: 40px;
      outline: none;
      border: 1px solid var(--clr-primary-1);
      border-radius: 2rem;
      padding: 1rem;
      font-size: 14px;
      background: var(--background);
      margin-bottom: 1.5rem;
      margin-top: 0.4rem;
    }
    input[type='file'] {
      margin-bottom: 1.5rem;
      margin-top: 0.4rem;
    }

    p {
      font-size: 1rem;
    }
    .form-flex {
      display: flex;
      flex-direction: row;
      gap: 4rem;
      margin-bottom: 2rem;
      font-size: 1rem;

      .home-address {
        padding: 1rem;
        box-shadow: var(--shadow);
        background: var(--clr-secondary-3);
        color: white;
        border-radius: 1rem;
        cursor: pointer;
      }
      .work-address {
        padding: 1rem;
        box-shadow: var(--shadow);
        background: var(--clr-primary-2);
        color: white;
        border-radius: 1rem;
        cursor: pointer;
      }

      label {
        margin-left: 1rem;
        cursor: pointer;
      }
    }
  }
  .btn-save {
    padding: 1rem;
    color: white;
    background: var(--clr-primary-1);
    border: none;
    outline: none;
    font-size: 1rem;
    border-radius: 1rem;
    width: 6rem;
    cursor: pointer;
  }
  @media (min-width: 768px) {
    /* form {
      display: grid;
      grid-template-columns: 1fr 1fr;
    } */
    input[type='text'] {
      background: #fff !important;
      height: 40px !important;
      font-size: 18px !important;
      border-radius: 0 !important;
    }
    input[type='number'] {
      background: #fff !important;
      height: 40px !important;
      font-size: 18px !important;
      border-radius: 0 !important;
    }
  }
`;
export default EditProfileModal;
