import { loggedinLskey } from "./app/constants";

function login() {
  localStorage.setItem(loggedinLskey, "true");
  window.location.href = "/";
}

export const LoginApp = () => {
  return (
    <div className="mt-16 mx-10 text-center">
      <h1 className="mb-10">This is onehealthcare</h1>
      <button className="btn btn-outline w-full" onClick={login}>
        Login
      </button>
    </div>
  );
};
