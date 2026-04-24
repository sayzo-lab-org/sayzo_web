// Admin email configuration
const ADMIN_EMAILS = ["sayzoindia@gmail.com", 'mayanksaini0416@gmail.com' ,'' ];

// Check if an email belongs to admin
export const isAdminEmail = (email) => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
};

// Format email for display (mask middle part)
export const formatEmail = (email) => {
  if (!email) return "";
  const [local, domain] = email.split("@");
  if (local.length <= 2) return email;
  return `${local[0]}${"*".repeat(Math.min(local.length - 2, 4))}${local[local.length - 1]}@${domain}`;
};
