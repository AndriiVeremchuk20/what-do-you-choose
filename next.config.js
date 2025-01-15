/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: false,
  images: {
    minimumCacheTTL: 60,
    domains: [
      "files.oaiusercontent.com",
      "imgcdn.stablediffusionweb.com",
      "example.com",
      "ik.imagekit.io",
      "oaidalleapiprodscus.blob.core.windows.net",
    ],
    loader: "default",
  },
  webpack(config) {
    /* eslint-disable */
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });

    return config;
    /* eslint-enable */
  },
};

export default config;
