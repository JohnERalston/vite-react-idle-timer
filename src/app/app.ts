import { createStore } from "outer-state";
import {
  loggedinLskey,
  promptBeforeIdle,
  promptMs,
  timeout,
  timeoutMs,
} from "./constants";

interface MessageData {
  sessionRenewed: boolean;
  loggedOut: boolean;
}

type miliseconds = number;

interface IdleTimerSubset {
  getRemainingTime: () => miliseconds;
  activate: () => boolean;
  message: (data: MessageData) => void;
}

interface AppStore {
  msRemainingUntilLogout: number;
  msRemainingUntilPrompt: number;
  prompt: boolean;
}

const defaultsecondsRemainingUntilLogout = timeout;
const defaultSecondsRemainingUntilPrompt = promptBeforeIdle;

export const appStore = createStore<AppStore>({
  msRemainingUntilLogout: defaultsecondsRemainingUntilLogout,
  msRemainingUntilPrompt: defaultSecondsRemainingUntilPrompt,
  prompt: false,
});
const { data, updateStore } = appStore;

export const appApi = appApiFn();

if (localStorage.getItem(loggedinLskey) !== "true") {
  window.location.href = "/login";
}

// onActive is what i need to initiate the logout
// as for the debounced api call to keep the session alive... that's manual
// shoudl be able to debounce it every time the timer is reset

function appApiFn() {
  const idleTimerApi: IdleTimerSubset = {
    getRemainingTime: () => 0,
    activate: () => true,
    message: (data: MessageData) => {},
  };

  tick();
  setTimeout(() => {
    idleTimerApi.message({ sessionRenewed: true, loggedOut: false });
  }, 2000);

  return {
    setIdleTimeApi,
    logout,
    showPrompt,
    extendSesion,
    onMessage,
  };

  function onMessage(data: MessageData) {
    if (data.loggedOut) {
      window.location.href = "/login";
    } else if (data.sessionRenewed) {
      updateStore({ prompt: false });
    }
  }

  function showPrompt() {
    updateStore({ prompt: true });
  }

  function extendSesion() {
    idleTimerApi.activate();
    updateStore({ prompt: false });
    idleTimerApi.message({ loggedOut: false, sessionRenewed: true });
  }

  function logout() {
    localStorage.removeItem(loggedinLskey);
    idleTimerApi.message({ loggedOut: true, sessionRenewed: false });
    window.location.href = "/login";
  }

  function setIdleTimeApi({
    getRemainingTime,
    activate,
    message,
  }: IdleTimerSubset) {
    idleTimerApi.getRemainingTime = getRemainingTime;
    idleTimerApi.activate = activate;
    idleTimerApi.message = message;
  }

  function tick() {
    setInterval(() => {
      countdown();
      handleTimedout();
    }, 1000);

    function countdown() {
      const msToLogout = idleTimerApi.getRemainingTime();
      const delta = msToLogout - promptMs;
      const msToPrompt = delta > 0 ? delta : 0;
      updateStore({
        msRemainingUntilLogout: msToLogout,
        msRemainingUntilPrompt: msToPrompt,
      });
    }

    function handleTimedout() {
      if (data().msRemainingUntilLogout <= 0) {
        logout();
      }
    }
  }
}

export function toSeconds(miliseconds: number) {
  return Math.floor(miliseconds / 1000);
}
