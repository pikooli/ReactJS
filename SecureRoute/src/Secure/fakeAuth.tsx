const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb: Function){
      this.isAuthenticated = true;
      setTimeout(cb, 100)
    },
    signout(cb : Function){
      this.isAuthenticated = false;
      setTimeout(cb, 100)
    },
  }

  export default fakeAuth 