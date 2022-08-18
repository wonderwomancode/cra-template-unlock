import { Button } from "rsuite";
import { Paywall } from '@unlock-protocol/paywall';


/*
  ~ What it does? ~
  Displays a UI that allows a user is a member to purchase a membership.
  ~ How can I use? ~
  <UnlockPaywall
    publicLock={publicLock}
    displayText={"YourString"}
    shape={"round"}
    size={"medium"}
    targetNetwork={targetNetwork}
  />

  ~ Features ~
  - publicLock={publicLock} Passes the lockAddress to the paywall
  - displayText={"String"} Configures the text to display on the button
  - shape={"round"} gives a nice round border radius button, omit for default flat button type
  - size={"large"} for a large button size, omit for default medium button size
  - taregtNetwork={targetNework} passes the current network the app is pointing to
*/

const UnlockPaywall = ({ shape, size, publicLock, displayText, targetNetwork }) => {
  const lockAddress = publicLock.id;
  const lockName = publicLock.name;

  // You can add more locks by entering the lock info into the locks object
  // "network" should be the "chainId" specified for the network which your "Lock"
  // is deployed on, see https://docs.unlock-protocol.com/core-protocol/unlock/networks
  // this is currently set to Gnosis Chain which is where Unlock Memberships live.
  // Unlock Memberships are free and open up new Channels in the Discord server
  const locks = {
    [lockAddress]: {
      "network": 100,
      "name": lockName,
    },
  };

  // This is the paywall config and you can
  // read more about what can be done with this here
  // https://docs.unlock-protocol.com/tools/paywall/configuring-checkout#the-paywallconfig-object
  const paywallConfig = {
    "network": 100,
    "pessimistic": true,
    "locks": locks,
    "icon": "https://unlock-protocol.com/images/svg/unlock-word-mark.svg",
    "callToAction": {
      "default": "Join the Unlock Community"
    },
    // This wallet belongs to Angela Steffens aka wonderwomancode
    // and the UDT tokens from these referrals if you leave this will
    // be used to tip community members and developers who help
    // support future development of Unlock Protocol. If you do change
    // this please ensure it is a valid wallet address, not ENS, that
    // can recieve ERC-20 Tokens. For more info on UDT tokens see
    // https://docs.unlock-protocol.com/governance/the-unlock-token/
    "referrer": "0xFf4eC2057A4180A4Cd18FDEA144e53245e39869D",
    "persistentCheckout": false,
    // ,
    //   "metadataInputs": [
    //     {
    //       "name": "Name",
    //       "type": "text",
    //       "required": true
    //     }
    //   ]
  };

  // Configure networks to use
  const networkConfigs = {
    1: {
      readOnlyProvider: targetNetwork.rpcUrl,
      locksmithUri: "https://locksmith.unlock-protocol.com",
      unlockAppUrl: "https://app.unlock-protocol.com",
    },
    100: {
      readOnlyProvider: targetNetwork.rpcUrl,
      locksmithUri: "https://locksmith.unlock-protocol.com",
      unlockAppUrl: "https://app.unlock-protocol.com",
    },
    4: {
      readOnlyProvider: "HTTP PROVIDER",
      locksmithUri: "https://locksmith.unlock-protocol.com",
      unlockAppUrl: "https://app.unlock-protocol.com",
    },
    5: {
      readOnlyProvider: "HTTP PROVIDER",
      locksmithUri: "https://locksmith.unlock-protocol.com",
      unlockAppUrl: "https://app.unlock-protocol.com",
    },
    // etc
  };
  console.log('NETWORK CONFIGS', networkConfigs);
  const paywall = new Paywall(paywallConfig, networkConfigs);
  // You can now call paywall.loadCheckOutModal() at the click of a button to trigger the paywall

  const purchaseMembership = async () => {
    await paywall.loadCheckoutModal();
  };

  return (
    <>
      <div style={{ padding: 8 }}>
        <Button onClick={purchaseMembership}>
          {displayText}
        </Button>
      </div>
    </>
  );
};

export default UnlockPaywall;
