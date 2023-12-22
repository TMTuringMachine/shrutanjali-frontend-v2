interface IHeaderOption {
  name: string;
  icon: string;
  link: string;
}

export const headerOptions: IHeaderOption[] = [
  {
    name: "Home",
    icon: "material-symbols:home-rounded",
    link: "/home",
  },
  {
    name: "Explore",
    icon: "material-symbols:explore",
    link: "/explore",
  },
  {
    name: "Music",
    icon: "material-symbols:headphones",
    link: "/dadajisongs",
  },
  {
    name: "Books",
    icon: "ph:books-bold",
    link: "/dadajisongs",
  },
  {
    name: "About",
    icon: "material-symbols:info",
    link: "/about",
  },
];
