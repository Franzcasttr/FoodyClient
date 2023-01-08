import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import FormRow from '../Form/FormRow';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import { useState } from 'react';
import { changepassword } from '../../actions/user';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const initialValues = {
  oldpassword: '',
  newpassword: '',
  confirmpassword: '',
};

const ChangePasswordModal = () => {
  const { errors, error, success, message } = useSelector(
    (state) => state.user
  );

  const [showHide, setShowHide] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [values, setValues] = useState(initialValues);

  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      setAlertMessage(true);
      setValues(initialValues);
    }
    setTimeout(() => {
      setAlertMessage(false);
    }, 3000);
  }, [success]);

  const handleChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (values.newpassword !== values.confirmpassword) {
      setAlert(true);
    } else {
      setAlert(false);
    }
  }, [values.confirmpassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowHide(false);
    setShowNewPwd(false);
    setShowConfirmPwd(false);
    const { oldpassword, newpassword, confirmpassword } = values;

    const payload = {
      oldpassword,
      newpassword,
      confirmpassword,
    };

    dispatch(changepassword(payload));
  };

  return (
    <>
      <ActionWrapper>
        <AnimatePresence>
          {alertMessage && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
              exit={{ opacity: 0, x: 100, transition: { delay: 0.3 } }}
              className='actions'>
              <span></span>
              <span className='success'>{message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </ActionWrapper>
      <Wrapper>
        <form onSubmit={handleSubmit}>
          <div className='showpass'>
            <FormRow
              labelText='Old Password'
              type={showHide ? 'text' : 'password'}
              name='oldpassword'
              value={values.oldpassword}
              handleChange={handleChange}
            />
            <div className='show-hide' onClick={() => setShowHide(!showHide)}>
              {showHide ? <BsEye /> : <BsEyeSlash />}
            </div>
          </div>

          <div className={`${alert ? 'showpass alert' : 'showpass'}`}>
            <FormRow
              labelText='new password'
              type={showNewPwd ? 'text' : 'password'}
              name='newpassword'
              value={values.newpassword}
              handleChange={handleChange}
            />
            <div
              className='show-hide'
              onClick={() => setShowNewPwd(!showNewPwd)}>
              {showNewPwd ? <BsEye /> : <BsEyeSlash />}
            </div>
          </div>

          <div className={`${alert ? 'showpass alert' : 'showpass'}`}>
            <FormRow
              labelText='confirm new password'
              type={showConfirmPwd ? 'text' : 'password'}
              name='confirmpassword'
              value={values.confirmpassword}
              handleChange={handleChange}
            />
            <div
              className='show-hide'
              onClick={() => setShowConfirmPwd(!showConfirmPwd)}>
              {showConfirmPwd ? <BsEye /> : <BsEyeSlash />}
            </div>
          </div>

          {!success && errors ? (
            <div className='alert'>{error}</div>
          ) : (
            alert && (
              <div className='alert'>
                <p>New password do not match</p>
              </div>
            )
          )}

          <button onClick={handleSubmit} className='btn-save'>
            Save
          </button>
        </form>
      </Wrapper>
    </>
  );
};
const ActionWrapper = styled.div`
  position: relative;
  .actions {
    display: flex;
    justify-content: space-between;
    position: absolute;
    right: 0;
  }
  .success {
    width: fit-content;
    padding: 0.7rem;
    border: 1px solid var(--clr-primary-1);
    color: var(--clr-primary-1);
    text-align: center;
    border-radius: 10px;
    font-size: 1rem;
    background-color: var(--background);
    margin-bottom: 1rem;
  }
  @media (min-width: 768px) {
    .success {
      background-color: white;
    }
  }
`;

const Wrapper = styled.div`
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: var(--light-shadow);
    margin: 2rem 0;
    margin-top: 5rem;
  }

  .alert {
    color: red;
    margin-bottom: 1rem;
  }
  .showpass {
    display: inline-flex;
    align-items: center;

    .show-hide {
      font-size: 1.3rem;
      cursor: pointer;
      color: var(--clr-light-grey);
    }
  }

  button {
    padding: 1rem;
    background-color: var(--clr-primary-1);
    color: white;
    font-size: 1.2rem;
    border: none;
    cursor: pointer;
    border-radius: 19px;
  }

  @media (min-width: 768px) {
    form {
      margin: auto;
      width: fit-content;
      padding: 2rem;
      box-shadow: var(--lightblue-shadow);
    }
  }
`;

export default ChangePasswordModal;
