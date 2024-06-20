import { appApi, appStore } from "../app/app";

export const Prompt = () => {
  const { prompt } = appStore.useStore();
  const { extendSesion, logout } = appApi;

  if (prompt) {
    return (
      <div className="card w-7/12 mt-12 bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">session expiry</h2>
          <p>yoyr session will soon expire</p>
          <div className="card-actions justify-end">
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
