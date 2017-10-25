const isNotNil = R.compose(R.not, R.isNil);

export class GeneralUpdatePattern {
  constructor(selectNodes, data, dataFn) {
    this.selectNodes = selectNodes;
    this.data = data;
    this.dataFn = dataFn;
  }

  onJoin(fn) {
    this.joinFn = fn;
    return this;
  }

  onEnter(fn) {
    this.enterFn = fn;
    return this;
  }

  onExit(fn) {
    this.exitFn = fn;
    return this;
  }

  run({ returnDetails = false } = {}) {
    const { selectNodes, data, dataFn, joinFn, exitFn, enterFn } = this;

    const selection = R.cond([
      [R.all(isNotNil),            () => selectNodes().data(data, dataFn)],
      [R.compose(R.isNil, R.head), () => selectNodes().data(dataFn)],
      [R.T,                        () => selectNodes().data(data)],
    ])([data, dataFn]);

    if (joinFn) joinFn(selection);

    const exitSelection = selection.exit();
    if (exitFn) exitFn(exitSelection);

    const enterSelection = selection.enter();
    if (enterFn) enterFn(enterSelection);

    if (!returnDetails) return selectNodes();

    return {
      join: selection,
      exit: exitSelection,
      enter: enterSelection,
      all: selectNodes(),
    }
  }
}

export default function generalUpdatePattern() {
  return new GeneralUpdatePattern(...arguments);
}
