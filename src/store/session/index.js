import StoreModule from "../module";

class Session extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      token: "",
      name: "",
      waiting: false,
    };
  }

  async load() {
    const token = localStorage.getItem("token");

    if (token) {
      this.setState(
        { ...this.getState(), token, waiting: true },
        "Загружается сессия"
      );

      const response = await fetch("/api/v1/users/self?fields=*", {
        headers: { "Content-Type": "application/json", "X-Token": token },
      });
      const json = await response.json();

      this.setState(
        {
          ...this.getState(),
          token,
          waiting: false,
          name: json.result.profile.name,
        },
        "Сессия загрузилась"
      );

      return json.result;
    }

    return null;
  }

  save(data) {
    localStorage.setItem("token", data.token);
    this.setState(
      { ...this.getState(), token: data.token, name: data.user.profile.name },
      "Пользователь сохранен в сессии"
    );
  }

  delete() {
    localStorage.removeItem("token");
    this.setState(
      { ...this.getState(), token: "", name: "" },
      "Пользователь удален из сессии"
    );
  }
}

export default Session;
