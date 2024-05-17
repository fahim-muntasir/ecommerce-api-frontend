import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_BASE_URL;

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const location = useLocation();

  useEffect(() => {
    const initializeAuth = async () => {
      // Check if there are URL parameters for token and user
      const params = new URLSearchParams(location.search);
      const tokenOfUrl = params.get('token');
      const userOfUrl = params.get('user');
      const userDecoded = JSON.parse(decodeURIComponent(userOfUrl))

      if (tokenOfUrl && userOfUrl) {
        // set accesstoken and user data in the local store
        localStorage.setItem(
          "auth",
          JSON.stringify({
            accessToken: tokenOfUrl,
            user: userDecoded,
          })
        );

        setUser(userDecoded);
        setAccessToken(tokenOfUrl);
      } else {
        // If no URL parameters, check localStorage for existing auth data
        const auth = JSON.parse(localStorage.getItem("auth"));

        if (auth?.user && auth?.accessToken) {
          setUser(auth.user);
          setAccessToken(auth.accessToken);
        }
      }

      // Set loading to false once initialization is complete
      setLoading(false);
    };

    initializeAuth();
    console.log("llllllllllllllllllll")
  }, [location.search]);
  
  // useEffect(() => {
  //   const auth = JSON.parse(localStorage.getItem("auth"));

  //   if (auth?.user && auth?.accessToken) {
  //     setUser(auth.user);
  //     setAccessToken(auth.accessToken);
  //   }
  //   setLoading(false);
  //   console.log("first effect")
  // }, []);

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const tokenOfUrl = params.get('token');
  //   const userOfUrl = params.get('user');

  //   if (tokenOfUrl && userOfUrl) {
  //     // set accesstoken and user data in the local store
  //     localStorage.setItem(
  //       "auth",
  //       JSON.stringify({
  //         accessToken: tokenOfUrl,
  //         user: userOfUrl,
  //       })
  //     );

  //     setUser(userOfUrl);
  //     setAccessToken(tokenOfUrl);
  //   }

  //   console.log("second effect")
  // }, [location.search])

  const login = async (payload) => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const { data } = await response.json();

      // set accesstoken and user data in the local store
      localStorage.setItem(
        "auth",
        JSON.stringify({
          accessToken: data.token,
          user: data.user,
        })
      );

      setUser(data?.user);
      setAccessToken(data?.token);

      return data;
    } catch (error) {
      console.log("Giriş hatası!", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("auth");

    setUser("");
    setAccessToken("");
  }

  const values = {
    login,
    logout,
    user,
    accessToken,
  };

  return <AuthContext.Provider value={values}>{!loading && children}</AuthContext.Provider>;
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
