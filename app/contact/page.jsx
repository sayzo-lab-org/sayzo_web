import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact Us | SAYZO Support",
  description: "Have questions? Talk to our support team. We are here to help you navigate the SAYZO neighborhood economy.",
  openGraph: {
    title: "Contact SAYZO Support",
    description: "Reach out to us for any queries or support regarding our platform.",
    url: "https://sayzo.in/contact",
  },
};

export default function Page() {
  return <ContactClient />;
}