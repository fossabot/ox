process.env.OX_SCRIPT = 'plugin';
process.env.NODE_ENV = 'production';
/* eslint-disable import/first */
import OX from '../ox';
import BabelCli from '../plugins/buildIns/BabelCli';
import BuildOXPlugin from '../plugins/buildIns/BuildOXPlugin';
/* eslint-enable import/first */

const ox = new OX('plugin', [new BabelCli(true), new BuildOXPlugin()]);
ox.run();
