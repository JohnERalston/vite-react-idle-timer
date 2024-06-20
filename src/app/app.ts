import { createStore } from "outer-state";
import { promptBeforeIdle, promptMs, timeout, timeoutMs } from "./constants";

type miliseconds = number;

interface IdleTimerSubset {
  getRemainingTime: () => miliseconds;
  start: () => boolean;
}

interface AppStore {
  msRemainingUntilLogout: number;
  msRemainingUntilPrompt: number;
  prompt: boolean;
  loggedin: boolean;
}

const defaultsecondsRemainingUntilLogout = timeout;
const defaultSecondsRemainingUntilPrompt = promptBeforeIdle;

export const appStore = createStore<AppStore>({
  msRemainingUntilLogout: defaultsecondsRemainingUntilLogout,
  msRemainingUntilPrompt: defaultSecondsRemainingUntilPrompt,
  loggedin: false,
  prompt: false,
});
const { data, updateStore } = appStore;

export const appApi = appApiFn();

function appApiFn() {
  const idleTimerApi = {
    getRemainingTime: () => 0,
    start: () => true,
  };

  tick();

  return {
    setIdleTimeApi,
    login,
    logout,
    showPrompt,
    extendSesion,
  };

  function showPrompt() {
    updateStore({ prompt: true });
  }

  function extendSesion() {
    idleTimerApi.start();
    updateStore({ prompt: false });
  }

  function login() {
    updateStore({
      loggedin: true,
      prompt: false,
      msRemainingUntilLogout: defaultsecondsRemainingUntilLogout,
      msRemainingUntilPrompt: defaultSecondsRemainingUntilPrompt,
    });
  }

  function logout() {
    updateStore({
      loggedin: false,
      prompt: false,
      msRemainingUntilLogout: defaultsecondsRemainingUntilLogout,
      msRemainingUntilPrompt: defaultSecondsRemainingUntilPrompt,
    });
  }

  function setIdleTimeApi({ getRemainingTime, start }: IdleTimerSubset) {
    idleTimerApi.getRemainingTime = getRemainingTime;
    idleTimerApi.start = start;
  }

  function tick() {
    setInterval(() => {
      if (data().loggedin) {
        whenLoggedIn();
      }
    }, 1000);

    function whenLoggedIn() {
      const msToLogout = idleTimerApi.getRemainingTime();
      const delta = msToLogout - promptMs;
      const msToPrompt = delta > 0 ? delta : 0;
      updateStore({
        msRemainingUntilLogout: msToLogout,
        msRemainingUntilPrompt: msToPrompt,
      });
    }
  }
}

export function toSeconds(miliseconds: number) {
  return Math.floor(miliseconds / 1000);
}
