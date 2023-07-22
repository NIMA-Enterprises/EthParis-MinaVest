import {
  Field,
  SmartContract,
  state,
  State,
} from 'snarkyjs';

export class MinaVest extends SmartContract {
  @state(Field) num = State<Field>();

  init() {
    super.init();
    this.num.set(Field(3));
  }
}
