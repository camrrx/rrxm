import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	plugins: [
		VitePWA({
			manifest: {
				name: "RRX Movies",
				short_name: "RRXM",
				icons: [
					{
						src: "/logo192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "logo512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
				start_url: "/",
				display: "standalone",
				background_color: "#ffffff",
				theme_color: "#317EFB",
			},
		}),
	],
});
