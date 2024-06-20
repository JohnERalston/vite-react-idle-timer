import { appApi, appStore } from "../app/app";

export const Login = () => {
  const { loggedin } = appStore.useStore();
  const { login } = appApi;

  if (loggedin) {
    return <div className="h-[100px]">hey there logged in person 👋</div>;
  }

  if (!loggedin) {
    return (
      <div className="h-[100px]">
        <button className="btn btn-outline" onClick={login}>
          Login
        </button>
      </div>
    );
  }
};
