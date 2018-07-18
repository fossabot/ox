import OX from '../ox';
import BabelCliPlugin from '../plugins/buildIns/BabelCliPlugin';

const ox = new OX([new BabelCliPlugin()]);
ox.run();
