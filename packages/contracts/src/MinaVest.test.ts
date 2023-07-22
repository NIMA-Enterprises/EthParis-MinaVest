import { MinaVest } from './MinaVest';
import {
  Field,
  Mina,
  PrivateKey,
  PublicKey,
  AccountUpdate,
  Signature,
  CircuitString,
  UInt64,
  MerkleMap,
  MerkleMapWitness,
  Poseidon,
} from 'snarkyjs';


let proofsEnabled: boolean = false;

function createLocalBlockchain(): PrivateKey {
  const Local = Mina.LocalBlockchain({ proofsEnabled });
  Mina.setActiveInstance(Local);
  return Local.testAccounts[0].privateKey;
}

async function localDeploy(
  zkAppInstance: MinaVest,
  zkAppPrivateKey: PrivateKey,
  deployerAccount: PrivateKey
) {
  const deployerPublicKey = deployerAccount.toPublicKey();
  const txn = await Mina.transaction(deployerPublicKey, () => {
    AccountUpdate.fundNewAccount(deployerPublicKey);
    zkAppInstance.deploy({ zkappKey: zkAppPrivateKey });
  });
  await txn.prove();
  txn.sign([deployerAccount, zkAppPrivateKey]);
  await txn.send();
}

describe('MinaVest Contract Tests', () => {
  let deployerAccount: PrivateKey,
    deployerAddress: PublicKey,
    zkAppAddress: PublicKey,
    zkAppPrivateKey: PrivateKey,
    zkAppInstance: MinaVest;

  beforeAll(async () => {
    deployerAccount = createLocalBlockchain();
    deployerAddress = deployerAccount.toPublicKey();
    zkAppPrivateKey = PrivateKey.random();
    zkAppAddress = zkAppPrivateKey.toPublicKey();

    if (proofsEnabled) {
      console.log('compile');
      console.time('compile');
      await MinaVest.compile();
      console.timeEnd('compile');
    }
    zkAppInstance = new MinaVest(zkAppAddress);
  });

  describe('', () => {
    it('generates and deploys the `MinaVest` smart contract', async () => {
      // Deploy zkApp
      await localDeploy(zkAppInstance, zkAppPrivateKey, deployerAccount);
    });
  });
});
