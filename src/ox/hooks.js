import { AsyncSeriesHook, AsyncParallelHook } from '../hook';

export default {
  'config.assign': new AsyncParallelHook(['config', 'hooks']),
  'config.assign.done': new AsyncParallelHook(['config', 'hooks']),
  ready: new AsyncParallelHook(['ox']),
  run: new AsyncSeriesHook(['ox']),
};
