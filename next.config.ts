import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `pg` is a native Node driver; keep it out of the bundler so it runs as-is.
  serverExternalPackages: ["pg"],
};

export default nextConfig;
