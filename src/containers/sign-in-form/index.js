import { memo } from "react";

import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

import InputGroup from "../../components/input-group";
import SignInInput from "../../components/sign-in-input";
import SignInFormLayout from "../../components/sign-in-form-layout";

function SignInForm() {
  const store = useStore();

  const select = useSelector((state) => ({
    username: state.user.username,
    password: state.user.password,
    authError: state.user.authError,
  }));

  const callbacks = {
    changeUsername: (e) => store.actions.user.setUsername(e.target.value),
    changePassword: (e) => store.actions.user.setPassword(e.target.value),
    authUser: (e) => {
      e.preventDefault();
      store.actions.user.authUser();
    },
  };

  return (
    <SignInFormLayout>
      <h3>Вход</h3>
      <form onSubmit={callbacks.authUser}>
        <InputGroup>
          <SignInInput
            id="login"
            value={select.username}
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
            value={select.password}
            changeValue={callbacks.changePassword}
          />
        </InputGroup>
        <InputGroup type="error">{select.authError}</InputGroup>
        <input value="Войти" type="submit" />
      </form>
    </SignInFormLayout>
  );
}

export default memo(SignInForm);
