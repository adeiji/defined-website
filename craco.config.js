module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Fix JSX runtime resolution issues
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        "react/jsx-runtime": require.resolve("react/jsx-runtime"),
        "react/jsx-dev-runtime": require.resolve("react/jsx-dev-runtime")
      };

      // Completely disable code splitting in development
      if (process.env.NODE_ENV === 'development') {
        webpackConfig.optimization.splitChunks = false;
        webpackConfig.optimization.runtimeChunk = false;
      }
      
      return webpackConfig;
    }
  }
};