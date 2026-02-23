import CareersClient from "./CareersClient";

export const metadata = {
  title: "Jobs at SAYZO | Build the Future of Local Services With Us",
  description: "Want to shape how neighborhoods connect? Explore open roles at SAYZO and join a team building India's leading local task marketplace.",
  openGraph: {
    title: "Jobs at SAYZO | Build the Future of Local Services",
    description: "Explore open roles and join a team building India's leading local task marketplace.",
    url: "https://sayzo.in/careers",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jobs at SAYZO",
    description: "Join a team building India's leading local task marketplace.",
  },
};

export default function Page() {
  return <CareersClient />;
}