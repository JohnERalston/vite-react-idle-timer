import { appApi, appStore } from "../app/app";

export const Prompt = () => {
  const { prompt } = appStore.useStore();
  const { extendSesion, logout } = appApi;

  if (prompt) {
    return (
      <div className="card w-7/12 mt-12 bg-neutral text-neutral-content shadow-2xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title mb-5">session expiry</h2>
          <p>your session will soon expire</p>
          <div className="card-actions justify-end mt-5">
            <button className="btn btn-primary" onClick={extendSesion}>
              Keep me logged in
            </button>
            <button className="btn btn-ghost" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    );

    return null;
  }
};
