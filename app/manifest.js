export default function manifest() {
    return {
        name: "NanoBanana Pro",
        short_name: "NanoBanana",
        description: "LINEスタンプ作成を、3秒で。クリエイターのための最強時短ツール。",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#FDE047",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
        ],
    };
}
