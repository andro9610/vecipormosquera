export type NavBarRoute = {
  to: string;
  label: string;
  icon: string;
  end?: boolean;
};

export const navBarRoutes: NavBarRoute[] = [
  { to: "/tools", label: "Herramientas", icon: "handyman", end: false },
  { to: "/bylaws", label: "Estatutos", icon: "gavel", end: false },
];
