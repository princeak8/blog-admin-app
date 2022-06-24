import { createContext, useCallback, useEffect, useState } from "react";

let logoutTimer;

const AuthContext = createContext({
  token: "",
  domain: "",
  email: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjustedExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjustedExpirationTime - currentTime;

  return remainingDuration;
};

const reteriveStoredToken = () => {
  const storedEmail = localStorage.getItem("email");
  const storedDomain = localStorage.getItem("domain");
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    localStorage.removeItem("email");
    localStorage.removeItem("domain");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    email: storedEmail,
    domain: storedDomain,
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthProvider = (props) => {
  const tokenData = reteriveStoredToken();
  let initialToken;
  let initialEmail;
  let initialDomain;
  if (tokenData) {
    initialToken = tokenData.token;
    initialEmail = tokenData.email;
    initialDomain = tokenData.domain;
  }
  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail);
  const [domain, setDomain] = useState(initialDomain);

  const userIsLoggedIn = !!token;

  const handleLogout = useCallback(() => {
    setToken(null);
    setEmail("");
    setDomain("");
    localStorage.removeItem("email");
    localStorage.removeItem("domain");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const handleLogin = (email, domain, token, expirationTime) => {
    setToken(token);
    setEmail(email);
    setDomain(domain);
    localStorage.setItem("email", email);
    localStorage.setItem("domain", domain);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(handleLogout, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(handleLogout, tokenData.duration);
    }
  }, [tokenData, handleLogout]);

  const contextValue = {
    token: token,
    email: email,
    domain: domain,
    isLoggedIn: userIsLoggedIn,
    login: handleLogin,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
