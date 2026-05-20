import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/demo.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
