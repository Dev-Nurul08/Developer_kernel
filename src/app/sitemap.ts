import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "http://localhost:3001"; // Default dev server URL, normally replaced in production

  const routes = [
    "",
    "/skills",
    "/projects",
    "/experience",
    "/certificates",
    "/contact",
    "/resume"
  ];

  const staticUrls = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticUrls, ...projectUrls];
}
