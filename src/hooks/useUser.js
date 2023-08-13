import { useCallback, useContext, useState } from "react";
import loginService from "services/login";
import addFavService from "services/addFav";
import removeFavService from "services/removeFav";
import Context from "context/UserContext";

export default function useUser() {
  const { favs, jwt, setFavs, setJWT } = useContext(Context);
  const [state, setState] = useState({ loading: false, error: false });

  const login = useCallback(
    ({ username, password }) => {
      setState({ loading: true, error: false });
      loginService({ username, password })
        .then((jwt) => {
          window.sessionStorage.setItem("jwt", jwt);
          setState({ loading: false, error: false });
          setJWT(jwt);
        })
        .catch((err) => {
          window.sessionStorage.removeItem("jwt");
          setState({ loading: false, error: true });
          console.error(err);
        });
    },[setJWT]);

  const addFav = useCallback(
    ({ id }) => {
    addFavService({ id, jwt })
      .then(setFavs)
      .catch((err) => {
        console.error(err);
      });
    },
    [jwt, setFavs]
  );

  const removeFav = useCallback(
    ({id}) => {
      removeFavService({id,  jwt})
      .then(() => {
        setFavs(favs => {
          return favs.filter(f => f !== id)
        }) 
      })
      .catch(console.error)
    }, [setFavs, jwt])

  const logout = useCallback(() => {
    window.sessionStorage.removeItem("jwt");
    setJWT(null);
  }, [setJWT]);

  return {
    addFav,
    removeFav,
    favs,
    isLogged: Boolean(jwt),
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    login,
    logout,
  };
}
