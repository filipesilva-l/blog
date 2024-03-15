import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://filipelsilva.com/",
  author: "Filipe Silva",
  desc: "Alguns pensamentos aleatórios sobre tecnologia, o que eu penso e outras coisas que eu achar legal escrever.",
  title: "Filipe Silva's Blog",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 5,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "pt-BR",
  langTag: ["pt-BR"],
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/filipesilva-l",
    linkTitle: `Github`,
    active: true,
  },
];
