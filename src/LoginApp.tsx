import { loggedinLskey } from "./app/constants";

function login() {
  localStorage.setItem(loggedinLskey, "true");
  window.location.href = "/";
}

export const LoginApp = () => {
  return (
    <div className="mt-16">
      <button className="btn btn-outline" onClick={login}>
        Login
      </button>
    </div>
  );
};
