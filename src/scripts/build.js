process.env.OX_SCRIPT = 'build';
process.env.NODE_ENV = 'production';
/* eslint-disable import/first */
import OX from '../ox';
/* eslint-enable import/first */

const ox = new OX('build', []);
ox.run();
