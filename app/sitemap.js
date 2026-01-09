export default function sitemap() {
    const baseUrl = "https://banana-stamp.pages.dev";
    const lastModified = new Date();

    const routes = ["", "/howto", "/contact", "/terms", "/privacy-policy"].map(
        (route) => ({
            url: `${baseUrl}${route}`,
            lastModified: lastModified,
            changeFrequency: "monthly",
            priority: route === "" ? 1 : 0.8,
        })
    );

    return routes;
}
