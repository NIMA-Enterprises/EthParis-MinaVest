import {
  Field,
  SmartContract,
  UInt64,
  Bool,
  state,
  State,
  method,
  DeployArgs,
  Permissions,
  Signature,
  PublicKey,
  Poseidon,
  MerkleMapWitness,
  Reducer,
  Struct,
  Provable,
  CircuitString,
} from 'snarkyjs';

class WithdrawAction extends Struct({
  user: PublicKey,
  portion: Field,
  amount: UInt64,
}) {}

export class MinaVest extends SmartContract {
  // @notice merkle map where userPublicKey:isMember is key:value scheme
  // scalable solution for storing users
  @state(Field) usersMerkleMapRoot = State<Field>();
  // @notice updated every 5 blocks by the backend if there were actions detected in between
  @state(Field) withdrawActionState = State<Field>();
  // @notice merkle map where publicKey:isVerified is key:value scheme
  // verified public keys are accepted multi-signature verification keys
  @state(Field) verifiedKeysMerkleMapRoot = State<Field>();
  // @notice contract owner / manager / creator
  @state(PublicKey) owner = State<PublicKey>();

  reducer = Reducer({ actionType: WithdrawAction });

  deploy(args: DeployArgs) {
    super.deploy(args);
    this.account.permissions.set({
      ...Permissions.default(),
      editState: Permissions.proofOrSignature(),
    });
  }

  /**
   * @notice Function to initialize 'MinaVest' smart contract
   * @param usersMerkleMapRoot is root of a merkle tree of users
   * @param verifiedKeysMerkleMapRoot is root of a merkle tree of verified keys
   */
  @method initialize(usersMerkleMapRoot: Field, verifiedKeysMerkleMapRoot: Field) {
    // Disable private key owner from manipulating contract after initialization
    this.account.permissions.set({
      ...Permissions.default(),
      send: Permissions.proof(),
      setDelegate: Permissions.proof(),
      setPermissions: Permissions.impossible(),
      setVerificationKey: Permissions.impossible(),
      setZkappUri: Permissions.impossible(),
      setTokenSymbol: Permissions.impossible(),
    });

    // Set initial action state
    this.withdrawActionState.set(Reducer.initialActionState);

    // Set owner
    const owner = this.owner.get();
    this.owner.assertEquals(owner);
    this.owner.set(this.sender);

    // Set root of users merkle map
    const _usersMerkleMapRoot: Field = this.usersMerkleMapRoot.get();
    this.usersMerkleMapRoot.assertEquals(_usersMerkleMapRoot);
    _usersMerkleMapRoot.equals(0).assertTrue('Users merkle map root already initialized.');
    usersMerkleMapRoot.equals(0).assertFalse('Invalid users merkle map root invalid value.');
    this.usersMerkleMapRoot.set(usersMerkleMapRoot);

    // Set root of verified keys merkle map
    const _verifiedKeysMerkleMapRoot: Field = this.verifiedKeysMerkleMapRoot.get();
    this.verifiedKeysMerkleMapRoot.assertEquals(_verifiedKeysMerkleMapRoot);
    _verifiedKeysMerkleMapRoot.equals(0).assertTrue('Verified keys merkle map root already initialized.');
    verifiedKeysMerkleMapRoot.equals(0).assertFalse('Invalid verified keys merkle map root.');
    this.verifiedKeysMerkleMapRoot.set(verifiedKeysMerkleMapRoot);

    // Require zkApp signature
    this.requireSignature();
  }

  /**
   * @notice Function to add new user
   */
  @method addUser(userWitness: MerkleMapWitness) {
    // Make sure owner is caller
    this.onlyOwner();
    // Verify user's presence in a merkle map
    const usersMerkleMapRoot: Field = this.usersMerkleMapRoot.get();
    this.usersMerkleMapRoot.assertEquals(usersMerkleMapRoot);

    const [userWitnessRoot, userWitnessKey] = userWitness.computeRootAndKey(Field(0));
    usersMerkleMapRoot.assertEquals(userWitnessRoot, 'Invalid users merkle map root.');
    userWitnessKey.assertEquals(userWitnessKey, 'Invalid user witness key.');

    // Compute new users merkle map root
    const [newUsersMerkleMapRoot] = userWitness.computeRootAndKey(Field(1));
    // Set new users merkle map root
    this.usersMerkleMapRoot.set(newUsersMerkleMapRoot);
  }

  /**
   * @notice Function to withdraw tokens of a single portion
   */
  @method withdrawRequest(
    userWitness: MerkleMapWitness,
    signature: Signature,
    signer: PublicKey,
    signerWitness: MerkleMapWitness,
    deadline: UInt64,
    portion: Field,
    amount: UInt64
  ) {
    // Verify signer's presence in verifiedKeysMerkleMapRoot
    const verifiedKeysMerkleMapRoot: Field = this.verifiedKeysMerkleMapRoot.get();
    this.verifiedKeysMerkleMapRoot.assertEquals(verifiedKeysMerkleMapRoot);

    const [signerWitnessRoot, signerWitnessKey] = signerWitness.computeRootAndKey(Field(1));
    verifiedKeysMerkleMapRoot.assertEquals(signerWitnessRoot, 'Invalid verified keys merkle map root.');
    signerWitnessKey.assertEquals(signerWitnessKey, 'Invalid signer witness key.');

    // Verify user's presence in verifiedKeysMerkleMapRoot
    const usersMerkleMapRoot: Field = this.usersMerkleMapRoot.get();
    this.usersMerkleMapRoot.assertEquals(usersMerkleMapRoot);

    const [userWitnessRoot, userWitnessKey] = userWitness.computeRootAndKey(Field(1));
    usersMerkleMapRoot.assertEquals(userWitnessRoot, 'Invalid users merkle map root.');
    userWitnessKey.assertEquals(userWitnessKey, 'Invalid user witness key.');

    // Check that network timestamp is not crossing the deadline
    this.network.timestamp.get().assertLessThan(deadline);

    // Compute message hash
    const msgHash = Poseidon.hash([
        ...CircuitString.fromString('withdraw').toFields(),
        ...this.address.toFields(),
        ...this.sender.toFields(),
        ...deadline.toFields(),
        ...amount.toFields(),
        portion
    ]);

    // Verify signature
    signature.verify(signer, [msgHash]).assertTrue('Invalid signature.');

    // Reduce to check that signature was not used already
    const withdrawActionState = this.withdrawActionState.get();
    this.withdrawActionState.assertEquals(withdrawActionState);
    // Reduce actions to check if signature is used
    const { state: isSignatureUsed } = this.reducer.reduce(
      this.reducer.getActions({ fromActionState: withdrawActionState }),
      Field,
      (state: Field, action: WithdrawAction) => {
        return Provable.if(
          action.user.equals(this.sender),
          Field(1),
          Field(0)
        );
      },
      { state: Field(0), actionState: withdrawActionState }
    );
    isSignatureUsed.assertEquals(Field(0), "Signature already used.");

    // Dispatch new withdraw action
    this.reducer.dispatch(
      new WithdrawAction({
        user: this.sender,
        portion,
        amount,
      })
    );
  }

  /**
   * @notice function to checksum that caller is contract owner
   */
  onlyOwner() {
    const owner = this.owner.get();
    this.owner.assertEquals(owner);
    owner.equals(this.sender).assertTrue('Caller is not the owner.');
  }
}
