import { FC } from "react";
import { appStore } from "../app/app";
import { promptMs, timeoutMs } from "../app/constants";

export const SessionComp: FC = () => {
  const { msRemainingUntilLogout } = appStore.useStore();

  const expiryPercent = 100 - (msRemainingUntilLogout / timeoutMs) * 100;
  const promptPercent = (promptMs / timeoutMs) * 100;

  return (
    <div>
      <h1 className="">to session expiry</h1>
      <div className="bg-slate-200 w-full">
        <div
          className="bg-primary p-3 transition-width duration-1000 ease-linear"
          style={{ width: `${expiryPercent}%` }}
        ></div>
      </div>
      <div
        className="text-right border-r-4 border-right-solid border-r-warning py-4 pr-1"
        style={{ width: `${promptPercent}%` }}
      >
        prompt here ▶️
      </div>
    </div>
  );
};
