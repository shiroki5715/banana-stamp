export const dynamic = "force-static";

export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/_next/static/", "/api/"],
        },
        sitemap: "https://banana-stamp.com/sitemap.xml",
        host: "https://banana-stamp.com",
    };
}
