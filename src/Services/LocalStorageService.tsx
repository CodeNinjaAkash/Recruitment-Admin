const storeToken = (value: string) => {
  localStorage.setItem("token", value);
};

const getToken = () => {
  let token = localStorage.getItem("token");
  return token;
};

const removeToken = (value: string) => {
  localStorage.removeItem(value);
};

export { storeToken, getToken, removeToken };
