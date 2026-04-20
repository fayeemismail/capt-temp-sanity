export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Font Creative Studio",
    url: "https://www.fontcreativestudio.com",
    logo: "https://cdn.sanity.io/images/offgjs63/production/ea9a0ec1660543edc65af8ea5a9527298a3bea37-698x149.svg",
    description:
      "Font Creative Studio is an advertising and branding company helping businesses grow through strategy and design.",
    foundingDate: "2019",
    sameAs: [
      // add socials later (important)
      "https://www.instagram.com/font.creativestudio/",
      "https://www.linkedin.com/company/font-creative-studio/",
      "https://wa.me/97450959525",
    ],
  };
}