import StoreModule from "../module";

class Auth extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {};
  }

  async authUser(login, password) {
    const response = await fetch("/api/v1/users/sign", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "ru",
      },
      body: JSON.stringify({
        login,
        password,
      }),
    });

    const json = await response.json();
    return json;
  }

  async signOut(token) {
    await fetch("/api/v1/users/sign", {
      method: "delete",
      headers: { "Content-Type": "application/json", "X-Token": token },
    });
  }
}

export default Auth;
