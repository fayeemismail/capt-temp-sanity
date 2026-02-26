export type SidebarImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
};

export type SidebarLink = {
  _key: string;
  _type: "sidebarLink";
  text: string;
  url?: string;
  image?: SidebarImage;
  imageUrl?: string; 
};