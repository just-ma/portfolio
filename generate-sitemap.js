const { SitemapStream, streamToPromise } = require("sitemap");

const links = [
  {
    url: "/",
    changefreq: "weekly",
    priority: 1.0,
    lastmod: new Date().toISOString(),
  },
  {
    url: "/about",
    changefreq: "monthly",
    priority: 0.7,
    lastmod: new Date().toISOString(),
  },
  {
    url: "/websites",
    changefreq: "weekly",
    priority: 0.6,
    lastmod: new Date().toISOString(),
  },
  {
    url: "/films",
    changefreq: "weekly",
    priority: 0.5,
    lastmod: new Date().toISOString(),
  },
  {
    url: "/dj",
    changefreq: "weekly",
    priority: 0.4,
    lastmod: new Date().toISOString(),
  },
  {
    url: "/misc",
    changefreq: "weekly",
    priority: 0.3,
    lastmod: new Date().toISOString(),
  },
  {
    url: "/the-apple-murderer",
    changefreq: "yearly",
    priority: 0.1,
    lastmod: new Date().toISOString(),
  },
];

const sitemap = new SitemapStream({ hostname: "https://nit-su-j.online" });

streamToPromise(sitemap).then((data) =>
  require("fs").writeFileSync("./public/sitemap.xml", data.toString())
);

links.forEach((link) => sitemap.write(link));
sitemap.end();
