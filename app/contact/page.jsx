import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact SAYZO Support | Get Help Within 24 Hours",
  description: "Have a question or issue? Our support team responds within 24 hours. Get help with tasks, payments, or account issues—we're here for you.",
  openGraph: {
    title: "Contact SAYZO Support | Get Help Within 24 Hours",
    description: "Our support team responds within 24 hours. Get help with tasks, payments, or account issues.",
    url: "https://sayzo.in/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact SAYZO Support",
    description: "Our support team responds within 24 hours. We're here to help you.",
  },
};

export default function Page() {
  return <ContactClient />;
}