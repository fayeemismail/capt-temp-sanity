export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Font Creative Studio",
    url: "https://www.fontcreativestudio.com",
    logo: "https://cdn.sanity.io/images/offgjs63/production/a682b289522190675a4ac94b56b1c74ff1165ffc-1024x347.png",
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