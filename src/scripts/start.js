import OX from '../ox';
import AutoAssignConfigPlugin from '../plugins/buildIns/AutoAssignConfigPlugin';

const ox = new OX([new AutoAssignConfigPlugin()]);
ox.run();
