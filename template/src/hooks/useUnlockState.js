import { useState, useEffect } from "react";
/*
  ~ What it does? ~
  Checks whether an address has valid key to a lock.
  ~ How can I use ? ~
  const myConst = useUnlockState(publicLock, address);

  ~ Features ~
  - checks address for valid key to the lock
  - Returns a boolean: true/false
*/

const useUnlockState = () => {
  const [unlockState, setunlockState] = useState('locked');

  useEffect(() => {
    const onUnlockStateChange = (event) => {
      setunlockState(unlockState => {
        return {
          ...unlockState,
          locked: event.detail
        }
      });
    }
    window.addEventListener("unlockProtocol", onUnlockStateChange);
    return () => {
      window.removeEventListener("unlockProtocol", onUnlockStateChange);
    }
  },[]);
};
export default useUnlockState;
