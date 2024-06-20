import { useIdleTimer } from "react-idle-timer";
import { timeout, syncTimers, promptBeforeIdle } from "./app/constants";
import { appApi } from "./app/app";
import { SessionComp } from "./components/SessionComp";
import { Login } from "./components/Login";
import { Prompt } from "./components/Prompt";

function App() {
  const { showPrompt } = appApi;
  const { getRemainingTime, start } = useIdleTimer({
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
      console.log("onActive");
    },
  });

  appApi.setIdleTimeApi({ getRemainingTime, start });

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