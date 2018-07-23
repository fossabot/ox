process.env.OX_SCRIPT = 'start';
process.env.NODE_ENV = 'development';
/* eslint-disable import/first */
import OX from '../ox';
/* eslint-enable import/first */

const ox = new OX('start', []);
ox.run();
