import OX from '../ox';
import AutoAssignConfigPlugin from '../plugins/buildIns/AutoAssignConfigPlugin';
import BabelCliPlugin from '../plugins/buildIns/BabelCliPlugin';

const ox = new OX([new AutoAssignConfigPlugin(), new BabelCliPlugin()]);
ox.run();
