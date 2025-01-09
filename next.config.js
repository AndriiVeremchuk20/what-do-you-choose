/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
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
};

export default config;
