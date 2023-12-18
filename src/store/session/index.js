import StoreModule from "../module";

class Session extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      token: "",
    };
  }

  async load() {
    const token = localStorage.getItem("token");
    this.setState({ ...this.getState(), token }, "Токен получен");

    if (token) {
      const response = await fetch("/api/v1/users/self?fields=*", {
        headers: { "Content-Type": "application/json", "X-Token": token },
      });
      const json = await response.json();
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
