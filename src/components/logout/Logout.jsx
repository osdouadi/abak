import { logout } from '../../../../Admin/src/services/index/admin';
import doneSound from './../../../public/sounds/success_four.mp3';
import errorSound from './../../../public/sounds/error.mp3';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../../Admin/src/store/reducers/userReducers';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../../Admin/src/components/loaders/Spinner';
import { isPending } from '@reduxjs/toolkit';

function Logout() {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const token = userState?.userInfo?.access_token;
  const navigate = useNavigate();
  const {
    mutate: logoutMutate,
    isPending: logoutPending,
    isError: logoutError,
  } = useMutation({
    mutationFn: () => {
      return logout({ token });
    },
    onSuccess: (data) => {
      console.log(data)
      const audio = new Audio(doneSound);
      audio.onended = () => {
        close();
      };
      audio.play();
      dispatch(userActions.resetUserInfo(data));
      localStorage.removeItem('account', JSON.stringify());
      navigate('/login');
    },
    onError: (error) => {
      const audio = new Audio(errorSound);
      audio.play();
      console.log(error);
    },
  });

  const logoutHandler = () => {
    logoutMutate({ token });
  };
  return (
    <div className="logout-popup" onClick={logoutHandler}>
      {isPending ? (
        <svg
          className="svg-logout"
          id="Layer_1"
          enableBackground="new 0 0 512 512"
          height="512"
          viewBox="0 0 512 512"
          width="512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipRule="evenodd" fillRule="evenodd">
            <circle cx="256" cy="256" fill="#fafafe" r="256" />

            <g fill="#816b32">
              <path d="m275 269s0-146.5 0-159.7h-37.9v159.7z" />
              <path d="m348.1 180.4-26.8 26.8c35.9 36 36 94.8 0 130.7-17.4 17.5-40.7 27.1-65.3 27.1-24.7 0-47.9-9.6-65.3-27.1-36-36-35.9-94.8 0-130.7l-26.8-26.8c-50.9 50.9-50.9 133.5 0 184.4 24.5 24.5 57.5 38.1 92.2 38.1 34.7 0 67.7-13.6 92.2-38.1 50.7-50.9 50.7-133.7-.2-184.4z" />
            </g>
          </g>
        </svg>
      ) : (
        <svg
          enableBackground="new 0 0 24 24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="grid_system" display="none" />
          <g id="_icons">
            <g>
              <path
                d="m12 7c-.6 0-1-.4-1-1v-3c0-.6.4-1 1-1s1 .4 1 1v3c0 .6-.4 1-1 1z"
                fill="#FAFAFA"
              />
            </g>
            <g>
              <path
                d="m15 7.8c-.2 0-.3 0-.5-.1-.5-.3-.6-.9-.4-1.4l1.5-2.6c.3-.5.9-.6 1.4-.4.5.3.6.9.4 1.4l-1.5 2.6c-.2.3-.6.5-.9.5z"
                fill="#FAFAFA"
              />
            </g>
            <g>
              <path
                d="m20.3 8.4-2.6 1.5c-.2.1-.3.1-.5.1-.4 0-.7-.2-.9-.5-.3-.5-.1-1.1.4-1.4l2.6-1.5c.5-.3 1.1-.1 1.4.4.2.5.1 1.1-.4 1.4z"
                fill="#FAFAFA"
              />
            </g>
            <g>
              <path
                d="m22 12c0 .6-.5 1-1 1h-3c-.5 0-1-.5-1-1 0-.6.5-1 1-1h3c.5 0 1 .5 1 1z"
                fill="#FAFAFA"
              />
            </g>
            <g>
              <path
                d="m20.7 17c-.2.3-.5.5-.9.5-.2 0-.3 0-.5-.1l-2.6-1.5c-.5-.3-.6-.9-.4-1.4.3-.5.9-.6 1.4-.4l2.6 1.5c.5.3.6.9.4 1.4z"
                fill="#FAFAFA"
              />
            </g>
            <g>
              <path
                d="m17 20.7c-.2.1-.3.1-.5.1-.3 0-.7-.2-.9-.5l-1.5-2.6c-.3-.5-.1-1.1.4-1.4s1.1-.1 1.4.4l1.5 2.6c.2.5.1 1.1-.4 1.4z"
                fill="#FAFAFA"
              />
            </g>
            <g>
              <path
                d="m13 18v3c0 .6-.5 1-1 1-.6 0-1-.5-1-1v-3c0-.6.5-1 1-1s1 .5 1 1z"
                fill="#FAFAFA"
              />
            </g>
            <g>
              <path
                d="m9.8 17.7-1.5 2.6c-.2.3-.5.5-.9.5-.2 0-.4 0-.5-.1-.5-.3-.6-.9-.4-1.4l1.5-2.6c.4-.5 1-.7 1.5-.4s.6.9.3 1.4z"
                fill="#FAFAFA"
              />
            </g>
            <g>
              <path
                d="m4.2 17.5c-.3 0-.7-.2-.9-.5-.3-.5-.1-1.1.4-1.4l2.6-1.5c.5-.3 1.1-.1 1.4.4s.1 1.1-.4 1.4l-2.6 1.5c-.2 0-.4.1-.5.1z"
                fill="#FAFAFA"
              />
            </g>
            <g>
              <path
                d="m6 13h-3c-.6 0-1-.5-1-1s.5-1 1-1h3c.6 0 1 .5 1 1s-.5 1-1 1z"
                fill="#FAFAFA"
              />
            </g>
            <g>
              <path
                d="m6.8 10c-.2 0-.3 0-.5-.1l-2.6-1.6c-.4-.3-.6-.9-.3-1.4s.9-.6 1.4-.4l2.6 1.5c.4.4.6 1 .3 1.5-.2.3-.5.5-.9.5z"
                fill="#FAFAFA"
              />
            </g>
            <path
              d="m9.8 17.7-1.5 2.6c-.2.3-.5.5-.9.5-.2 0-.4 0-.5-.1-.5-.3-.6-.9-.4-1.4l1.5-2.6c.4-.5 1-.7 1.5-.4s.6.9.3 1.4z"
              opacity=".1"
            />
            <path
              d="m13 18v3c0 .6-.5 1-1 1-.6 0-1-.5-1-1v-3c0-.6.5-1 1-1s1 .5 1 1z"
              opacity=".1"
            />
            <path
              d="m17.3 19.3c.3.5.1 1.1-.4 1.4-.2.1-.3.1-.5.1-.3 0-.7-.2-.9-.5l-1.5-2.6c-.3-.5-.1-1.1.4-1.4s1.1-.1 1.4.4z"
              opacity=".1"
            />
            <path
              d="m20.7 17c-.2.3-.5.5-.9.5-.2 0-.3 0-.5-.1l-2.6-1.5c-.5-.3-.6-.9-.4-1.4.3-.5.9-.6 1.4-.4l2.6 1.5c.5.3.6.9.4 1.4z"
              opacity=".1"
            />
            <path
              d="m16.3 9.5c-.3-.5-.1-1.1.4-1.4l2.6-1.5c.5-.3 1.1-.1 1.4.4s.1 1.1-.4 1.4l-2.6 1.5c-.2.1-.3.1-.5.1-.4 0-.7-.2-.9-.5z"
              opacity=".1"
            />
            <path
              d="m22 12c0 .6-.5 1-1 1h-3c-.5 0-1-.5-1-1 0-.6.5-1 1-1h3c.5 0 1 .5 1 1z"
              opacity=".1"
            />
          </g>
          <g id="Color_pallett" />
        </svg>
      )}
    </div>
  );
}

export default Logout;
