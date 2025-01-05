(async () => {
  const { defineConfig } = await import('@vue/cli-service');

  module.exports = defineConfig({
    transpileDependencies: true,
    css: {
      loaderOptions: {
        sass: {
          implementation: await import('sass'),
        },
      },
    },
  });
})();
