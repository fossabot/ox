import chalk from 'chalk';

const registedPlugins = {};
export default function registPlugin(plugin, ox) {
  if (plugin) {
    if (typeof plugin.name !== 'string' || plugin.name.trim() === '') {
      console.log(chalk.red('Plugin must has a valid name'));
      process.exit(0);
    }
    if (typeof plugin.apply !== 'function') {
      console.log(
        chalk.red(
          `Plugin '${chalk.green(plugin.name)}' must has a '${chalk.yellow(
            'apply',
          )}' named function`,
        ),
      );
      process.exit(0);
    }
    if (!registedPlugins[plugin.name]) {
      registedPlugins[plugin.name] = true;
      try {
        const dependencies = plugin.getDependencies(ox.config);
        dependencies.forEach(p => registPlugin(p, ox));
        const hooks = plugin.getHooks();
        Object.assign(ox.hooks, hooks);
        plugin.apply(ox);
      } catch (e) {} // eslint-disable-line
    }
  }
}
