const logined = false;
export default fn => {
  if (logined) {
    return fn();
  }
  return 'not login';
};
