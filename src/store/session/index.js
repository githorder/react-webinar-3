import StoreModule from "../module";

class Session extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      token: "",
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
        { ...this.getState(), token, waiting: false },
        "Сессия загрузилась"
      );

      return json.result;
    }

    return null;
  }

  save(token) {
    localStorage.setItem("token", token);
    this.setState(
      { ...this.getState(), token },
      "Пользователь сохранен в сессии"
    );
  }

  delete() {
    localStorage.removeItem("token");
    this.setState(
      { ...this.getState(), token: "" },
      "Пользователь удален из сессии"
    );
  }
}

export default Session;
