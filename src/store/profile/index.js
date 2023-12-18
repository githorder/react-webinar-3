import StoreModule from "../module";

class Profile extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      profile: null,
    };
  }

  setProfile(user) {
    this.setState(
      {
        ...this.getState(),
        profile: {
          email: user.email,
          ...user.profile,
        },
      },
      "Профиль пользователя получен"
    );
  }

  deleteProfile() {
    this.setState({ ...this.getState(), profile: null }, "Профиль удален");
  }
}

export default Profile;
