import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ['images.unsplash.com'],
		// Opcional: también puedes usar remotePatterns para más control
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				port: '',
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;