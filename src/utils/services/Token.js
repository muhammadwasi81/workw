
class TokenService {

  getLocalRefreshToken() {
    const { userSlice } = JSON.parse(localStorage.getItem("persist:root"));
    const RT = JSON.parse(userSlice).refreshToken
    // console.log(JSON.parse(userSlice).refreshToken, "getLocalRefreshToken");
    return RT;
  }

  getLocalAccessToken() {

    const { userSlice } = JSON.parse(localStorage.getItem("persist:root"));
    const Token = JSON.parse(userSlice).token
    // console.log(JSON.parse(userSlice).token, "getLocalAccessToken");
    return Token;
  }

  updateLocalAccessToken(token) {
    //   let user = JSON.parse(localStorage.getItem("persist:root"));
    //   console.log(user, "updateAccessToken");
    //  const strObje =  user.accessToken = token;
    //   console.log(JSON.stringify(strObje), "updateAccessToken");
    // localStorage.setItem("persist:root", JSON.stringify(user));

    // console.log(store.getState());
    // return store.getState();
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  setUser(user) {
    console.log(JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user));
  }
  setToken(token) {
    console.log(JSON.stringify(token));
    localStorage.setItem("token1", JSON.stringify(token));
  }

  removeUser() {
    localStorage.removeItem("user");
  }

}



export default new TokenService();
