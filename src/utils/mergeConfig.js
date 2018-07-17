const isJson = obj => Object.prototype.toString.call(obj) === '[object Object]';

const deepMerge = (base, config) => {
  if (isJson(base) && isJson(config)) {
    const result = Object.assign({}, base);
    Object.keys(config).forEach(key => {
      Object.assign(result, { [key]: deepMerge(base[key], config[key]) });
    });
    return result;
  }
  return config;
};

export default function mergeConfig(baseConfig = {}, config) {
  if (isJson(config)) {
    return deepMerge(baseConfig, config);
  }
  return baseConfig;
}
