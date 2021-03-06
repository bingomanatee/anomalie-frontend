import { ValueStream } from '@wonderlandlabs/looking-glass-engine';

export default (props) => {
  const BetaStore = new ValueStream('betaStore')
    .method('inc', (s) => s.setCount(s.my.count + 1))
    .property('count', 1, 'integer');

  return BetaStore;
};
