import React, { useState, useContext } from "react";
import CartContext from "./cart-context";

import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const history = useHistory();
  const cookies = Cookies.get("jwt");
  const userIsLoggedIn = !!cookies;

  const cartCtx = useContext(CartContext);

  const [token, setToken] = useState(cookies);

  const logoutHandler = () => {
    Cookies.remove("jwt");
    setToken(null);
    cartCtx.clearCart();
    localStorage.removeItem("userId");
    history.replace("/");
  };

  const loginHandler = (token) => {
    Cookies.set("jwt", token, { expires: 7, path: "/" });
    setToken(token);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
