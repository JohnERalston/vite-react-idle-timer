import { useIdleTimer } from "react-idle-timer";
import { timeout, syncTimers, promptBeforeIdle } from "./app/constants";
import { appApi } from "./app/app";
import { SessionComp } from "./components/SessionComp";
import { Login } from "./components/Login";
import { Prompt } from "./components/Prompt";

function App() {
  const { showPrompt, onMessage, logout } = appApi;
  const { getRemainingTime, message, activate } = useIdleTimer({
    name: "session-idle-timer",
    crossTab: true,
    syncTimers,
    timeout,
    promptBeforeIdle,
    onPrompt: () => {
      showPrompt();
    },
    onIdle: () => {
      console.log("on idle");
    },
    onActive: () => {
      console.log("on active...");
    },
    onMessage: (e) => {
      onMessage(e);
    },
    onPresenceChange: (e) => {
      console.log("on presence change");
    },
    onAction: (e) => {
      console.log("on action");
    },
    debounce: 5000, //debounces the onAction
  });

  appApi.setIdleTimeApi({ getRemainingTime, activate, message });

  return (
    <>
      <div className="text-right mb-5">
        <Login />
      </div>
      <div className="flex flex-col gap-5 h-full">
        <SessionComp />

        <div className="flex justify-center">
          <Prompt />
        </div>
      </div>
    </>
  );
}

export default App;
