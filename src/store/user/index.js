import StoreModule from "../module";

class User extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      username: "",
      password: "",
      token: "",
      profile: null,
    };
  }

  setUsername(username) {
    return this.setState(
      { ...this.getState(), username },
      "поле Логин изменено"
    );
  }

  setPassword(password) {
    return this.setState(
      { ...this.getState(), password },
      "поле Пароль изменено"
    );
  }

  async authUser() {
    const response = await fetch("/api/v1/users/sign", {
      method: "post",
      headers: { "Content-Type": "application/json", "Accept-Language": "ru" },
      body: JSON.stringify({
        login: this.getState().username,
        password: this.getState().password,
      }),
    });

    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        username: "",
        password: "",
        profile: {
          email: json.result.user.email,
          ...json.result.user.profile,
        },
      },
      "Пользователь успешно авторизовался"
    );
  }

  async signOut() {}
}

export default User;
