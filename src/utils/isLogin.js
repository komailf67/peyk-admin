const isLogin = () => {
  const accessToken = localStorage.getItem('access_token');
  return !!accessToken;
};
export default isLogin;
