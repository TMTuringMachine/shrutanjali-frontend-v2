interface IHeaderOption {
  name: string;
  icon: string;
  link: string;
}

export const headerOptions: IHeaderOption[] = [
  {
    name: "home",
    icon: "material-symbols:home-rounded",
    link: "/home",
  },
  {
    name: "explore",
    icon: "material-symbols:explore",
    link: "/explore",
  },
  {
    name: "music",
    icon: "material-symbols:headphones",
    link: "/dadajisongs",
  },
  {
    name: "books",
    icon: "ph:books-bold",
    link: "/dadajisongs",
  },
  {
    name: "about",
    icon: "material-symbols:info",
    link: "/about",
  },
];
