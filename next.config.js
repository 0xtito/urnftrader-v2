module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@zerodevapp", "@web3"],
  async redirects() {
    return [
      {
        source: "/",
        destination: "/app/home",
        permanent: true,
      },
      {
        source: "/app",
        destination: "/app/home",
        permanent: true,
      },
    ];
  },
};
