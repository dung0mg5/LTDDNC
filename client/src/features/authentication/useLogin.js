import {useAuth} from '../../context/AuthContext';

export default function useLogin() {
  const {handleLogin, handleLogout, authInfo} = useAuth();
  const {isLoading, profile} = authInfo;

  return {isLoading, handleLogin, handleLogout, profile};
}
