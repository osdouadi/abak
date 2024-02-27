// AuthModal.js
import Login from './Login';
import Signup from './Signup';

const AuthModal = ({ loginModal, signupModal, closeLoginModal, closeSignupModal }) => {
  return (
    <>
      <Login loginModal={loginModal} close={closeLoginModal} />
      <Signup signupModal={signupModal} close={closeSignupModal} />
    </>
  );
};

export default AuthModal;
