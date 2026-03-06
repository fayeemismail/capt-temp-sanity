export const footerDataQuery = `
*[_type == "globalSettings"][0]{
  footer{
    heading,
    email,
    phoneNumbers,
    copyrightText,

    ctaButton{
      text,
      variant,
      url
    },

    navigationLinks[]{
      text,
      variant,
      url
    },

    legalLinks[]{
      text,
      variant,
      url
    },

    socialLinks[]{
      platform,
      url,
      "icon": icon.asset->url
    }
  }
}.footer
`;


export type FooterButton = {
  text: string;
  variant: "primary" | "secondary";
  url?: string;
};

export type FooterSocialLink = {
  platform: "Instagram" | "Whatsapp" | "Linkedin";
  url: string | null;
  icon: string | null;
};

export type FooterData = {
  heading: string;
  email: string;
  phoneNumbers: string[];
  copyrightText: string;

  ctaButton: FooterButton | null;

  navigationLinks: FooterButton[];
  legalLinks: FooterButton[];

  socialLinks: FooterSocialLink[];
};