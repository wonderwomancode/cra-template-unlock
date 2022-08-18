import { Panel } from "rsuite";
import UnlockPaywall from "./UnlockPaywall";
import { useUnlockState } from "../hooks";
import { useAccount } from "wagmi";


/*
  ~ What it does? ~
  Displays a UI that reveals content based on whether a user is a member or not.
  ~ How can I use? ~
  <LockedContent
    address={address}
    publicLock={publicLock}
    targetNetwork={targetNetwork}
  />

  ~ Features ~
  - address={address} passes active user's address to the component to check whether they are members or not
  - publicLock={publicLock} passes the specific lock to check for the user's membership
  - targetNetwork={targetNetwork} passes the current app network to the <UnlockPaywall /> to determine the network to connect to
*/


const LockedContent = ({ publicLock, targetNetwork }) => {
  const unlockState = useUnlockState();

  const previewContent = (
    <>
      <div style={{ padding: 8, marginTop: 32, maxWidth: 592, margin: "auto" }}>
        <Panel title="Preview Content" bordered>
          <div style={{ padding: 8 }}>
            This is the part of the content that you can get without the
            membership. A sneak peak if you like. It's also okay to just
            make this a message that is maybe hidden afterwards. It's up
            to you what you want the user experience to be.
            <UnlockPaywall
              shape={"round"}
              size={"large"}
              displayText={"Become a member OR Login"}
              targetNetwork={targetNetwork}
              publicLock={publicLock}
            />
          </div>
        </Panel>
      </div>
    </>
  );

  const lockedContent = (
    <>
      <div style={{ padding: 8, marginTop: 32, maxWidth: 592, margin: "auto" }}>
          <Panel title="Locked Content" bordered>
              YOU NOW HAVE ACCESS TO THE LOCKED CONTENT
          </Panel>
      </div>
    </>
  );

  return (
    <>
      <Panel bordered>
          { unlockState !== "locked"
            ? lockedContent
            : previewContent
          }
      </Panel>
    </>
  );
};

export default LockedContent;
