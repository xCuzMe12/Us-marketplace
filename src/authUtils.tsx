export const isLoggedIn = () => {
  return sessionStorage.getItem("isLoggedIn") === "true";
};

export const getUser = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const logInAsk = () => {
  return "Prijavite se!";
};