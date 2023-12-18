import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";

import useStore from "../../hooks/use-store";

import InputGroup from "../../components/input-group";
import SignInInput from "../../components/sign-in-input";
import SignInFormLayout from "../../components/sign-in-form-layout";
import { useLocation } from "react-router-dom";

function SignInForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(null);

  const location = useLocation();
  const to =
    location.search.length === 0
      ? "/"
      : location.search.split("?")[1].split("=")[1];

  const store = useStore();

  const callbacks = {
    changeUsername: (e) => setUsername(e.target.value),
    changePassword: (e) => setPassword(e.target.value),
    authUser: async (e) => {
      e.preventDefault();
      const res = await store.actions.auth.authUser(username, password);

      if (res.error) {
        setAuthError(res.error?.data?.issues[0].message);
      } else {
        store.actions.profile.setProfile(res.result.user);
        store.actions.session.save(res.result);
        navigate(to);
      }
    },
  };

  return (
    <SignInFormLayout>
      <h3>Вход</h3>
      <form onSubmit={callbacks.authUser}>
        <InputGroup>
          <SignInInput
            id="login"
            value={username}
            label="Логин"
            changeValue={callbacks.changeUsername}
            type="text"
          />
        </InputGroup>
        <InputGroup>
          <SignInInput
            type="password"
            label="Пароль"
            id="password"
            value={password}
            changeValue={callbacks.changePassword}
          />
        </InputGroup>
        {authError && <InputGroup type="error">{authError}</InputGroup>}
        <input value="Войти" type="submit" />
      </form>
    </SignInFormLayout>
  );
}

export default memo(SignInForm);
