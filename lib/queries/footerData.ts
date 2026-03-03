export const footerDataQuery = `
  *[_type == "globalSettings"][0]{
    footer{
      heading,
      texts,
      phoneNumbers,
      buttons[]{
        text,
        variant
      },
      contactButton{
        text,
        variant
      },
      socialLinks[]{
        platform,
        url,
        "icon": icon.asset->url
        },
      logo{
        asset->{
          _id,
          url
        }
      }
    }
  }.footer
`;


export type FooterButton = {
    text: string;
    variant: "primary" | "secondary";
};

export type FooterSocialLink = {
    platform: "Instagram" | "Whatsapp" | "Linkedin";
    url: string | null;
    icon: string | null
};

export type FooterLogo = {
    asset: {
        _id: string;
        url: string;
    };
};

export type FooterData = {
    heading: string[];
    texts: string[];
    phoneNumbers: string[];
    buttons: FooterButton[];
    contactButton: FooterButton | null
    socialLinks: FooterSocialLink[];
    logo: FooterLogo;
};