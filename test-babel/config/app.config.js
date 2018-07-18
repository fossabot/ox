module.exports = (baseConfig, { waitDependencies }) => {
  console.log({ appBase: JSON.stringify(baseConfig) });
  return waitDependencies(['runtime']).then(([runtime]) => {
    console.log({ runtime: JSON.stringify(runtime) });
    return { runtime };
  });
};
