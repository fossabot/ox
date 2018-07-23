process.env.OX_SCRIPT = 'babel';
process.env.NODE_ENV = 'production';
/* eslint-disable import/first */
import OX from '../ox';
import BabelCli from '../plugins/buildIns/BabelCli';
/* eslint-enable import/first */

const ox = new OX('babel', [new BabelCli()]);
ox.run();
