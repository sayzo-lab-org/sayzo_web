/* ===========================
   TOP NAVBAR ITEMS
=========================== */

export const NAV_ITEMS = [
  { id: 'terms-and-condition', label: 'Terms and Condition' },
  { id: 'privacy-policy', label: 'Privacy Policy' },
  { id: 'usermanual', label: 'User Manual' },
  { id: 'REFUND-&-CANCELLATION', label: 'REFUND & CANCELLATION' },
  { id: 'faq', label: 'FAQ' },
  { id: 'PROHIBITED-TASKS-&-BLACKLIST-CATEGORIES', label: 'PROHIBITED ASKS & BLACKLIST CATEGORIES' },
  { id: 'Trust-&-Safety', label: 'Trust & Safety' },
];

/* ===========================
   MOCK DATA - COMPLETE SAYZO MANUAL
=========================== */

export const MOCK_DATA = {
  /* ================= TERMS AND CONDITIONS ================= */
  'terms-and-condition': {
    sidebar: [
      { id: 'intro', label: 'Introduction' },
      { id: 'definitions', label: 'Definitions' },
      { id: 'intermediary', label: 'Role of SAYZO' },
      { id: 'eligibility', label: 'Eligibility & Account' },
      { id: 'verification', label: 'Identity Verification' },
      { id: 'task-posting', label: 'Task Posting & Execution' },
      { id: 'payments', label: 'Payments, Escrow & Fees' },
      { id: 'off-platform', label: 'Off-Platform Transactions' },
      { id: 'ratings', label: 'Ratings & Reviews' },
      { id: 'suspension', label: 'Suspension & Termination' },
      { id: 'employment', label: 'No Employment Relationship' },
      { id: 'disclaimer', label: 'Disclaimer of Warranties' },
      { id: 'liability', label: 'Limitation of Liability' },
      { id: 'indemnification', label: 'Indemnification' },
      { id: 'force-majeure', label: 'Force Majeure' },
      { id: 'communication', label: 'Communication Consent' },
      { id: 'dispute-resolution', label: 'Dispute Resolution' },
      { id: 'governing-law', label: 'Governing Law' },
      { id: 'policy-hierarchy', label: 'Policy Hierarchy' },
      { id: 'changes', label: 'Changes to Terms' },
      { id: 'contact', label: 'Contact & Grievance' },
    ],
    content: {
      intro: {
        title: 'SAYZO – TERMS & CONDITIONS',
        body: [
          'Effective Date: 29 Jan 2026',
          'Entity: SAYZO PLATFORMS PRIVATE LIMITED',
          'Jurisdiction: India',
          '',
          'These Terms & Conditions ("Terms") govern access to and use of the SAYZO platform, including the website, mobile applications, and related services (collectively, the "Platform"). By accessing or using SAYZO, you agree to be bound by these Terms. If you do not agree, you must not use the Platform.',
        ],
      },
      definitions: {
        title: ' DEFINITIONS',
        steps: [
          {
            title: '',
            body: [
              '"SAYZO" refers to SAYZO PLATFORMS PRIVATE LIMITED.',
              '"User" means any individual or entity accessing or using the Platform.',
              '"Task Giver" means a verified user who posts a task on the Platform.',
              '"Task Doer" means a verified user who accepts and performs a task.',
              '"Task" means any service, job, or work posted by a Task Giver.',
              '"Platform Fee" means the fee charged by SAYZO for facilitating access to the Platform.',
              'These definitions apply throughout these Terms.',
            ],
          },
        ],
      },
      intermediary: {
        title: ' ROLE OF SAYZO (INTERMEDIARY STATUS)',
        steps: [
          {
            title: 'SAYZO is a technology intermediary platform.',
            body: [
              'SAYZO is a technology intermediary only:',
              '• SAYZO does not provide services directly',
              '• SAYZO does not employ Task Doers',
              '• SAYZO does not supervise, direct, or control task execution',
              '',
              'All tasks are performed solely between Task Givers and Task Doers. SAYZO\'s role is limited to enabling discovery, communication, payment facilitation, and dispute resolution.',
              '',
              'Nothing in these Terms shall be construed as creating an employment, agency, partnership, or joint venture relationship between SAYZO and any User.',
            ],
          },
        ],
      },
      eligibility: {
        title: ' ELIGIBILITY & ACCOUNT CREATION',
        steps: [
          {
            title: '',
            body: [
              '• Users must be at least 18 years old',
              '• Users must be legally competent under Indian law',
              '• Each user may maintain only one account',
              '',
              'Providing false, misleading, or incomplete information may result in suspension or permanent termination.',
            ],
          },
        ],
      },
      verification: {
        title: ' IDENTITY VERIFICATION (MANDATORY)',
        steps: [
          {
            title: '',
            body: [
              'Identity verification is mandatory to:',
              '• Post tasks',
              '• Accept or perform tasks',
              '• Receive payments or payouts',
              '',
              'Verification may require government-issued identification including Aadhaar, PAN, Passport, Driving License, or Voter ID.',
              '',
              'Unverified users may browse the Platform but cannot post or accept tasks. SAYZO may deny access or terminate accounts if verification fails or false information is provided.',
            ],
          },
        ],
      },
      'task-posting': {
        title: ' TASK POSTING & EXECUTION',
        steps: [
          {
            title: 'Obligations of Task Givers',
            body: [
              'Task Givers must:',
              '• Post lawful, safe, and accurate tasks',
              '• Clearly define scope, pricing, and timelines',
              '• Avoid misleading or deceptive descriptions',
            ],
          },
          {
            title: 'Obligations of Task Doers',
            body: [
              'Task Doers must:',
              '• Accept only tasks they can realistically complete',
              '• Perform tasks lawfully and professionally',
              '• Follow the agreed scope and Platform rules',
              'SAYZO may remove or restrict any task or account at any time. ',
              'Such actions do not constitute supervision, direction, or control over task execution.'
            ],
          },
          {
            title: 'Prohibited & Restricted Tasks',
            body: [
              'Tasks involving illegal, unsafe, regulated, deceptive, or licensed activities are prohibited, including but not limited to criminal activity, medical or legal services, financial advisory, hazardous work, sexual services, child-related activities, weapons, political campaigning, gambling, or any activity requiring regulatory licenses.',
              '',
              'SAYZO retains absolute discretion to enforce these restrictions.',
            ],
          },
        ],
      },
      payments: {
        title: ' PAYMENTS, ESCROW & PLATFORM FEES',
        steps: [
          {
            title: '',
            body: [
              'Payments may be collected prior to task commencement. Funds may be held in escrow until task completion or dispute resolution.',
            ],
          },
          {
            title: 'Platform Fees & GST',
            body: [
              '• SAYZO charges a Platform Fee for facilitating access',
              '• GST is charged only on the Platform Fee, as applicable',
              '• SAYZO does not charge GST on task value unless legally required',
            ],
          },
          {
            title: 'Refunds',
            body: [
              'Refunds, if any, are processed on a case-by-case basis in accordance with SAYZO\'s Refund & Cancellation Policy, based on available evidence, user conduct, and platform rules.',
            ],
          },
        ],
      },
      'off-platform': {
        title: ' OFF-PLATFORM TRANSACTIONS',
        steps: [
          {
            title: '',
            body: [
              'Users are prohibited from conducting payments outside the Platform.',
              '',
              '• First violation → Warning',
              '• Repeated violations → Suspension or permanent termination',
              '',
              'SAYZO provides no protection, dispute resolution, or liability coverage for off-platform dealings.',
            ],
          },
        ],
      },
      ratings: {
        title: ' RATINGS, REVIEWS & CONTENT',
        steps: [
          {
            title: '',
            body: [
              'Users may submit ratings, reviews, and content after task completion. Users must not post false, misleading, retaliatory, or manipulated content.',
              '',
              'SAYZO may remove or moderate content at its discretion.',
            ],
          },
        ],
      },
      suspension: {
        title: ' SUSPENSION & TERMINATION',
        steps: [
          {
            title: '',
            body: [
              'SAYZO may suspend or terminate accounts for policy violations, fraud, misuse, repeated disputes, or illegal activity.',
              '',
              'Termination may apply across accounts, devices, and payment methods. SAYZO is under no obligation to reinstate accounts.',
            ],
          },
        ],
      },
      employment: {
        title: ' NO EMPLOYMENT RELATIONSHIP',
        steps: [
          {
            title: '',
            body: [
              'Task Doers are independent contractors and not employees, agents, or representatives of SAYZO.',
              '',
              'SAYZO is not responsible for wages, taxes, insurance, benefits, or statutory compliance of Task Doers.',
            ],
          },
        ],
      },
      disclaimer: {
        title: ' DISCLAIMER OF WARRANTIES',
        steps: [
          {
            title: '',
            body: [
              'The Platform is provided "as is" and "as available." SAYZO makes no warranties regarding platform availability, task completion, task quality, or user conduct.',
              '',
              'Use of the Platform is at the user\'s own risk.',
            ],
          },
        ],
      },
      liability: {
        title: ' LIMITATION OF LIABILITY',
        steps: [
          {
            title: '',
            body: [
              'To the maximum extent permitted by law:',
              '• SAYZO shall not be liable for indirect, incidental, or consequential damages',
              '• SAYZO\'s total liability shall not exceed the Platform Fees paid by the user in the preceding six (6) months',
            ],
          },
        ],
      },
      indemnification: {
        title: ' INDEMNIFICATION',
        steps: [
          {
            title: '',
            body: [
              'Users agree to indemnify and hold harmless SAYZO from any claims, losses, damages, or expenses arising from their use of the Platform, their tasks, or their violation of law or these Terms.',
            ],
          },
        ],
      },
      'force-majeure': {
        title: ' FORCE MAJEURE',
        steps: [
          {
            title: '',
            body: [
              'SAYZO shall not be liable for failure or delay caused by events beyond reasonable control, including internet outages, payment gateway failures, government actions, or natural disasters.',
            ],
          },
        ],
      },
      communication: {
        title: ' COMMUNICATION CONSENT',
        steps: [
          {
            title: '',
            body: [
              'Users consent to receive transactional, security, and service communications via SMS, WhatsApp, email, calls, and in-app notifications, subject to applicable law.',
            ],
          },
        ],
      },
      'dispute-resolution': {
        title: ' DISPUTE RESOLUTION',
        steps: [
          {
            title: '',
            body: [
              'All disputes shall be resolved through binding arbitration under the Arbitration & Conciliation Act, 1996:',
              '• Seat & venue: New Delhi, India',
              '• Language: English',
              '',
              'Courts at New Delhi shall have jurisdiction solely for interim relief.',
            ],
          },
        ],
      },
      'governing-law': {
        title: ' GOVERNING LAW',
        steps: [
          {
            title: '',
            body: [
              'These Terms are governed by the laws of India.',
            ],
          },
        ],
      },
      'policy-hierarchy': {
        title: ' POLICY HIERARCHY',
        steps: [
          {
            title: '',
            body: [
              'These Terms prevail over all other SAYZO policies unless expressly stated otherwise. Offline interactions are additionally governed by SAYZO\'s Offline Safety Guidelines, which form part of these Terms.',
            ],
          },
        ],
      },
      changes: {
        title: ' CHANGES TO TERMS',
        steps: [
          {
            title: '',
            body: [
              'SAYZO may update these Terms at any time. Continued use of the Platform constitutes acceptance.',
            ],
          },
        ],
      },
      contact: {
        title: ' CONTACT & GRIEVANCE REDRESSAL',
        steps: [
          {
            title: 'Support : support@sayzo.co.in',
            body: [
              'Grievance Officer: Ayan Srivastav',
              'Email: ayan@sayzo.in',
              'Address: DPT 808B, F-79&80, DLF Prime Tower, Okhla Phase-1, New Delhi – 110020',
              '',
              'Response SLA:',
              '• Acknowledgement within 24 hours',
              '• Resolution within 15 business days',
            ],
          },
        ],
      },
    },
  },

  /* ================= PRIVACY ================= */
 "privacy-policy": {
    sidebar: [
      { id: 'privacy-intro', label: 'Introduction' },
      { id: 'who-applies', label: 'Who This Policy Applies To' },
      { id: 'role-sayzo', label: 'Role of SAYZO' },
      { id: 'information-collected', label: 'Information We Collect' },
      { id: 'data-usage', label: 'How We Use Data' },
      { id: 'data-sharing', label: 'Data Sharing' },
      { id: 'user-visibility', label: 'User-to-User Visibility' },
      { id: 'legal-disclosure', label: 'Legal Disclosure' },
      { id: 'data-retention', label: 'Data Retention' },
      { id: 'account-deletion', label: 'Account Deletion' },
      { id: 'user-rights', label: 'User Rights (DPDP Act)' },
      { id: 'cookies-tracking', label: 'Cookies & Tracking' },
      { id: 'security', label: 'Data Security' },
      { id: 'data-breach', label: 'Data Breach Response' },
      { id: 'communications', label: 'Communications' },
      { id: 'childrens-data', label: 'Children\'s Data' },
      { id: 'changes', label: 'Changes to Policy' },
      { id: 'contact', label: 'Contact & Grievance' },
    ],
    content: {
      'privacy-intro': {
        title: 'SAYZO – PRIVACY POLICY',
        body: [
          'Effective Date: 29 Jan 2026',
          'Entity: SAYZO PLATFORMS PRIVATE LIMITED',
          'Jurisdiction: India',
          '',
          'This Privacy Policy explains how SAYZO collects, uses, stores, shares, and protects personal data when you access or use the SAYZO platform, including the website, mobile applications, and related services (collectively, the "Platform").',
          '',
          'By accessing or using SAYZO, you agree to this Privacy Policy. If you do not agree, please do not use the Platform.',
        ],
      },
      'who-applies': {
        title: 'WHO THIS POLICY APPLIES TO',
        steps: [
          {
            title: '',
            body: [
              'This Privacy Policy applies to:',
              '• Visitors to the SAYZO platform',
              '• Registered users',
              '• Task Givers (users who post tasks)',
              '• Task Doers (users who perform tasks)',
            ],
          },
        ],
      },
      'role-sayzo': {
        title: 'ROLE OF SAYZO',
        steps: [
          {
            title: 'SAYZO operates as an online marketplace platform.',
            body: [
              '• SAYZO does not provide services directly',
              '• SAYZO does not employ Task Doers',
              '• SAYZO processes personal data only to operate, secure, and manage the Platform',
              '',
              'All services are performed solely between Task Givers and Task Doers.',
            ],
          },
        ],
      },
      'information-collected': {
        title: 'INFORMATION WE COLLECT',
        steps: [
          {
            title: 'A. Information You Provide Directly',
            body: [
              'We may collect the following information when you use the Platform:',
              '• Phone number (mandatory for OTP-based authentication)',
              '• Email address (optional, for communication and account recovery)',
              '• Profile information (name, skills, preferences)',
              '• Task-related information (task descriptions, requirements, location details)',
              '• In-app chat messages',
              '• Ratings and reviews',
              '',
              'Government-Issued Identification (Conditional):',
              'Government-issued identification may be requested only when required for identity verification, fraud prevention, payouts, or certain offline or high-risk tasks.',
              '',
              'Accepted documents may include Aadhaar, PAN, Passport, Driving License, or Voter ID.',
              '',
              'Government IDs:',
              '• Are not used for marketing',
              '• Are not publicly displayed',
              '• Are collected strictly for safety, verification, and legal compliance',
            ],
          },
          {
            title: 'B. Information Collected Automatically',
            body: [
              'When you access or use the Platform, we automatically collect:',
              '• IP address',
              '• Device information (operating system, app/browser version)',
              '• Approximate location (city or area level only)',
              '• Session data, logs, and security events',
              '• Essential cookies',
              '',
              'SAYZO:',
              '• Does not use continuous GPS tracking',
              '• Does not use advertising or profiling cookies',
            ],
          },
          {
            title: 'C. Payment Information',
            body: [
              'For payment processing, we collect:',
              '• Transaction amount',
              '• Payment status',
              '• Reference IDs',
              '• Timestamps',
              '',
              'SAYZO does not store:',
              '• Card numbers',
              '• CVV',
              '• UPI PINs',
              '• Bank credentials',
              '',
              'All payments are processed through PCI-DSS compliant third-party payment gateways.',
            ],
          },
        ],
      },
      'data-usage': {
        title: 'WHY WE COLLECT AND USE DATA',
        steps: [
          {
            title: '',
            body: [
              'We collect and use personal data to:',
              '• Authenticate users securely',
              '• Prevent fraud, misuse, and duplicate accounts',
              '• Enable task posting, matching, and execution',
              '• Process payments, refunds, and escrow settlements',
              '• Resolve disputes between users',
              '• Maintain transaction, audit, and compliance records',
              '• Ensure platform security, stability, and performance',
              '• Comply with legal, tax, and regulatory obligations',
              '• Establish, exercise, or defend legal claims, including responding to disputes, court proceedings, regulatory inquiries, or law enforcement requests',
              '',
              'We do not use personal data for:',
              '• Selling to third parties',
              '• Behavioral advertising',
              '• User profiling for ads',
            ],
          },
        ],
      },
      'data-sharing': {
        title: 'DATA SHARING',
        steps: [
          {
            title: 'We share personal data only when necessary and only to the minimum extent required.',
            body: [
              '',
            ],
          },
          {
            title: 'A. Payment Gateways',
            body: [
              'Limited data required to process payments and refunds.',
            ],
          },
          {
            title: 'B. Cloud & Infrastructure Providers',
            body: [
              'For ',
              '• hosting', 
              '• storage',
              ' • backups', 
              ' • system reliability',
            ],
          },
          {
            title: 'C. Analytics Providers (If Used)',
            body: [
              'Only',
               '• aggregated',
                '• anonymized',
                 '• non-identifiable usage data.',
              'No phone numbers, government IDs, or payment credentials are shared.',
            ],
          },
          {
            title: 'D. Marketing Platforms',
            body: [
              'SAYZO does not share personal user data with advertising or marketing platforms.',
            ],
          },
          {
            title: 'Cross-Border Data Processing',
            body: [
              'Personal data may be stored or processed in India or other jurisdictions where SAYZO or its service providers operate.',
              '',
              'In all cases, data is processed in accordance with applicable laws and reasonable security standards.',
            ],
          },
        ],
      },
      'user-visibility': {
        title: 'USER-TO-USER DATA VISIBILITY',
        steps: [
          {
            title: 'Task Doers may see:',
            body: [
              '• Task details',
              '• Display name',
              '• Approximate location',
              '• In-app chat messages',
            ],
          },
          {
            title: 'Task Givers may see:',
            body: [
              '• Task Doer profile and skills',
              '• Ratings and reviews',
              '• In-app chat messages',
            ],
          },
          {
            title: '',
            body: [
              'Sensitive data such as phone numbers, government IDs, and payment details is not shared unless explicitly permitted by the user or required for task completion.',
            ],
          },
        ],
      },
      'legal-disclosure': {
        title: 'GOVERNMENT & LAW ENFORCEMENT DISCLOSURE',
        steps: [
          {
            title: '',
            body: [
              'We may disclose personal data only when legally required, including:',
              '• Court orders',
              '• Legal obligations',
              '• Regulatory requirements',
              '• Fraud or criminal investigations',
              '',
              'Only the minimum necessary data is disclosed.',
            ],
          },
        ],
      },
      'data-retention': {
        title: 'DATA RETENTION',
        steps: [
          {
            title: '',
            body: [
              '• Personal data is retained only as long as necessary for the purposes described in this Policy',
              '• Financial and legal records are retained as required by law',
              '• Inactive or obsolete data is periodically reviewed and deleted or anonymized',
            ],
          },
        ],
      },
      'account-deletion': {
        title: 'ACCOUNT DELETION',
        steps: [
          {
            title: '',
            body: [
              'When a user deletes their account:',
              '• Personal data is deleted or anonymized',
              '• Data required for legal, tax, audit, or dispute resolution purposes may be retained as required by law',
            ],
          },
        ],
      },
      'user-rights': {
        title: 'USER RIGHTS (INDIA – DPDP ACT)',
        steps: [
          {
            title: '',
            body: [
              'Users have the right to:',
              '• Access their personal data',
              '• Correct inaccurate or outdated data',
              '• Request deletion of personal data (subject to legal requirements)',
              '• Withdraw consent for non-essential data processing',
              '• Opt out of marketing communications',
              '',
              'Important:',
              'Withdrawal of consent for certain data processing may limit or prevent access to features of the Platform where such data is required for operation, security, compliance, or dispute resolution.',
              '',
              'Requests can be made via support@sayzo.co.in.',
            ],
          },
        ],
      },
      'cookies-tracking': {
        title: 'COOKIES & TRACKING',
        steps: [
          {
            title: '',
            body: [
              '• Essential cookies are used for authentication and security',
              '• Non-essential cookies can be disabled via browser settings',
              '• Disabling essential cookies may affect platform functionality',
            ],
          },
        ],
      },
      'security': {
        title: 'DATA SECURITY',
        steps: [
          {
            title: '',
            body: [
              'SAYZO implements reasonable security practices, including:',
              '• Encryption in transit (HTTPS / TLS)',
              '• Access controls',
              '• Secure cloud infrastructure',
              '• Monitoring and logging',
              '',
              'No system is completely secure, but we take data protection seriously.',
            ],
          },
        ],
      },
      'data-breach': {
        title: 'DATA BREACH RESPONSE',
        steps: [
          {
            title: '',
            body: [
              'In the event of a data breach:',
              '• Immediate containment measures will be taken',
              '• Affected users will be notified where legally required',
              '• Regulatory authorities will be informed as applicable',
            ],
          },
        ],
      },
      'communications': {
        title: 'COMMUNICATIONS',
        steps: [
          {
            title: '',
            body: [
              'By using SAYZO, users consent to receive:',
              '• SMS',
              '• WhatsApp messages',
              '• Emails',
              '• Calls',
              '• In-app notifications',
              '',
              'Transactional, service, and security communications are mandatory. Marketing communications include opt-out options.',
            ],
          },
        ],
      },
      'childrens-data': {
        title: 'CHILDREN\'S DATA',
        steps: [
          {
            title: '',
            body: [
              'SAYZO does not knowingly collect personal data from individuals under 18 years of age.',
            ],
          },
        ],
      },
      'changes': {
        title: 'CHANGES TO THIS POLICY',
        steps: [
          {
            title: '',
            body: [
              'This Privacy Policy may be updated from time to time.',
              '',
              'Material changes will be communicated via:',
              '• In-app notifications',
              '• Email',
              '• Platform notices',
              '',
              'Continued use of the Platform constitutes acceptance of the updated Policy.',
            ],
          },
        ],
      },
      'contact': {
        title: 'CONTACT & GRIEVANCE REDRESSAL',
        steps: [
          {
            title: 'Support / Privacy : support@sayzo.co.in',
            body: [
              'Grievance Officer: Ayan Srivastav',
              'Email: ayan@sayzo.in',
              'Address: DPT 808B, F-79&80, DLF Prime Tower, Okhla Phase-1, New Delhi – 110020, India',
              '',
              'Response SLA:',
              '• Acknowledgement within 24 hours',
              '• Resolution within 15 business days',
            ],
          },
        ],
      },
    },
  },

  /* ================= USER MANUAL - COMPLETE ================= */
  usermanual: {
    sidebar: [
      { id: 'posting-task', label: 'Posting a task on SAYZO' },
      { id: 'accepting-task', label: 'Accepting a task on SAYZO' },
      { id: 'payments-security', label: 'Payments, security, and disputes' },
      { id: 'get-more-tasks', label: 'How to get more tasks' },
      { id: 'disputes-blocking', label: 'Disputes and blocking' },
      { id: 'trust-safety', label: 'Trust and safety' },
      { id: 'community-guidelines', label: 'Community guidelines' },
      { id: 'location-privacy', label: 'Location and privacy' },
      { id: 'support-help', label: 'Support and help access' },
    ],

    content: {
      /* ========================================
         POSTING A TASK ON SAYZO
      ======================================== */
      'posting-task': {
        title: 'Posting a Task on SAYZO',
        steps: [
          {
            title: 'How to Post an Offline Task',
            body: [
              'Offline tasks are jobs that require someone to be physically present.',
            ],
          },
          {
            title: 'Step 1: Switch to Task Giver Mode',
            body: ['From the home screen, switch to Giver at the top.'],
          },
          {
            title: 'Step 2: Select "Post an Offline Task"',
            body: ['Tap Post an Offline Task.'],
          },
          {
            title: 'Step 3: Enter Task Name',
            body: [
              'Write a short title for your task.',
              'Example: Fix kitchen tap or Assemble wardrobe.',
            ],
          },
          {
            title: 'Step 4: Add Location',
            body: ['Enter the address or area where the task will take place.'],
          },
          {
            title: 'Step 5: Describe the Task',
            body: [
              'Write a short overview.',
              'You may:',
              '• Let our AI expand your brief description, or',
              '• Enter all details yourself.',
              'Include what needs to be done, when, and any tools required.',
            ],
          },
          {
            title: 'Step 6: Select Category',
            body: [
              'Choose the type of task (repair, cleaning, moving, tutoring, etc.).',
            ],
          },
          {
            title: 'Step 7: Set Budget',
            body: [
              'Choose Fixed Price, then enter the amount you are willing to pay.',
            ],
          },
          {
            title: 'Step 8: Select Duration',
            body: [
              'Choose how long the task will take',
              'Example: Less than one week.',
            ],
          },
          {
            title: 'Step 9: Add Skills Required',
            body: [
              'List skills needed.',
              'Example: Plumbing, carpentry, basic electrical.',
            ],
          },
          {
            title: 'Step 10: Choose Experience Level',
            body: [
              'Select the required level (Entry, Intermediate, Expert).',
            ],
          },
          {
            title: 'Step 11: Save',
            body: ['Tap Save.'],
          },
        ],
        smallContent: [
          {
            title: 'How to Post an Online Task',
            description: 'Online tasks can be done remotely.',
            steps2: [
              {
                title: 'Step 1: Switch to Giver Mode',
                body: ['Switch to Giver from the home screen.'],
              },
              {
                title: 'Step 2: Select "Post an Online Task"',
                body: ['Tap Post an Online Task.'],
              },
              {
                title: 'Step 3: Enter Task Name',
                body: [
                  'Write a short title for your task.',
                  'Example: Website content writing.',
                ],
              },
              {
                title: 'Step 4: Describe the Task',
                body: ['Write a brief overview or let the AI expand it.'],
              },
              {
                title: 'Step 5: Select Category',
                body: [
                  'Choose the type of task (tutoring, website development, data analysis, etc.).',
                ],
              },
              {
                title: 'Step 6: Set Budget',
                body: ['Choose Fixed Price and enter the amount.'],
              },
              {
                title: 'Step 7: Add Skills Required',
                body: [
                  'List the skills needed for the task.',
                  'Example: Node.js, MongoDB.',
                ],
              },
              {
                title: 'Step 8: Choose Experience Level',
                body: ['Select the required level (Entry, Intermediate, Expert).'],
              },
              {
                title: 'Step 9: Save',
                body: ['Tap Save.'],
              },
            ],
          },
          {
            title: 'Learn About the Other Steps',
            description: '',
            steps2: [
              {
                title: 'Step 1: Review Your Task',
                body: [
                  'Check the title, description, skills, budget, location, and timing.',
                ],
              },
              {
                title: 'Step 2: Choose Visibility',
                body: [
                  'Decide who can see your task:',
                  '• Public: anyone can view it',
                  '• Private: only selected people can view it',
                ],
              },
              {
                title: 'Step 3: Schedule the Task',
                body: [
                  'Choose whether your task should go live now or at a later date and time.',
                ],
              },
              {
                title: 'Step 4: Confirm Posting',
                body: [
                  'Once everything looks correct, your task will be published and visible based on your settings.',
                ],
              },
            ],
          },
          {
            title: 'Understand Rules Before Posting',
            description: '',
            steps2: [
              {
                title: 'Step 1: Be Clear',
                body: ['Write exactly what you need and when you need it.'],
              },
              {
                title: 'Step 2: Be Honest',
                body: ['Do not misrepresent the task or payment.'],
              },
              {
                title: 'Step 3: Set a Fair Budget',
                body: ['Choose an amount that matches the effort and skill required.'],
              },
              {
                title: 'Step 4: Follow Community Guidelines',
                body: [
                  'Do not post illegal, unsafe, or harmful tasks.',
                  '[link to community guidelines]',
                ],
              },
            ],
          },
          {
            title: 'Why Scheduling Tasks',
            description: '',
            steps2: [
              {
                title: 'Step 1: Choose When Your Task Goes Live',
                body: ['Decide whether your task should be visible now or later.'],
              },
              {
                title: 'Step 2: Select a Date',
                body: ['Pick the day your task should be posted.'],
              },
              {
                title: 'Step 3: Select a Time',
                body: ['Choose the exact time your task becomes active.'],
              },
              {
                title: 'Step 4: Let the System Handle It',
                body: ['Your task will appear automatically at the scheduled time.'],
              },
            ],
          },
          {
            title: 'Use of Private Posting',
            description: '',
            steps2: [
              {
                title: 'Step 1: Select Private Visibility',
                body: ['Choose the private option when setting visibility.'],
              },
              {
                title: 'Step 2: Choose Who Can See It',
                body: ['Select the people you want to share the task with.'],
              },
              {
                title: 'Step 3: Post Securely',
                body: ['Only chosen users will be able to view and respond.'],
              },
              {
                title: 'Step 4: Switch to Public Anytime',
                body: ['You can change visibility later if needed.'],
              },
            ],
          },
          {
            title: 'Communicating with the Task Doer',
            description: '',
            steps2: [
              {
                title: 'Step 1: Open the Chat',
                body: ['Use the in-app messaging to ask questions.'],
              },
              {
                title: 'Step 2: Confirm Details',
                body: [
                  'Clarify timing, location, or expectations before the task begins.',
                ],
              },
            ],
          },
          {
            title: 'Completing the Task',
            description: '',
            steps2: [
              {
                title: 'Step 1: Review the Work',
                body: ['Check that the task has been completed as agreed.'],
              },
              {
                title: 'Step 2: Mark as Completed',
                body: ['Confirm that the work is finished.'],
              },
            ],
          },
          {
            title: 'Making Payment',
            description: '',
            steps2: [
              {
                title: 'Step 1: Payment Held Safely',
                body: [
                  'The amount is taken and held in an Escrow when the task is confirmed.',
                ],
              },
              {
                title: 'Step 2: Payment Released',
                body: [
                  'Once you mark the task complete, the money is sent to the task doer.',
                ],
              },
            ],
          },
          {
            title: 'Handling Cancellations',
            description: '',
            steps2: [
              {
                title: 'Step 1: Inform Early',
                body: ['Let the task doer know if you cannot continue.'],
              },
              {
                title: 'Step 2: Follow Platform Rules',
                body: ['The system will guide refunds or adjustments.'],
              },
            ],
          },
          {
            title: 'Understanding Ratings and Reviews',
            description: '',
            steps2: [
              {
                title: '',
                body: [
                  'After completion, both sides can leave feedback.',
                  'This helps others make better choices.',
                ],
              },
            ],
          },
        ],
      },

      /* ========================================
         ACCEPTING A TASK ON SAYZO
      ======================================== */
      'accepting-task': {
        title: 'Accepting a Task on SAYZO',
        steps: [
          {
            title: 'How to Accept an Offline Task',
            body: ['Offline tasks are jobs that require someone to be physically present near you.'],
          },
          {
            title: 'Step 1: Switch to Doer Mode',
            body: ['Switch to Doer from the home screen.'],
          },
          {
            title: 'Step 2: Select Offline',
            body: ['Choose the Offline option to view physical jobs near you.'],
          },
          {
            title: 'Step 3: Set Your Location',
            body: [
              'Add your address or use your current location to see nearby tasks.',
            ],
          },
          {
            title: 'Step 4: Search and Filter',
            body: [
              'Use the search bar or filters like Best Matches, All Tasks, or Recently Uploaded.',
            ],
          },
          {
            title: 'Step 5: Open a Task',
            body: ['Tap a task card to view full details.'],
          },
        ],
        smallContent: [
          {
            title: 'How to Accept an Online Task',
            description: '',
            steps2: [
              {
                title: 'Step 1: Switch to Doer Mode',
                body: ['Switch to Doer from the home screen.'],
              },
              {
                title: 'Step 2: Select Online',
                body: ['Choose the Online option to view remote tasks.'],
              },
              {
                title: 'Step 3: Search and Filter',
                body: [
                  'Use the search bar or filters to find tasks that match your skills.',
                ],
              },
              {
                title: 'Step 4: Open a Task',
                body: ['Tap a task to see full details.'],
              },
            ],
          },
          {
            title: 'Understanding Task Details',
            description: 'Learn what each task detail means before you accept or apply.',
            steps2: [
              {
                title: 'Task Summary',
                body: [
                  'A short description of what needs to be done and the main goal of the task.',
                ],
              },
              {
                title: 'Budget and Budget Type',
                body: [
                  'Shows how much the task pays and whether it is a fixed price or flexible amount.',
                ],
              },
              {
                title: 'Category',
                body: [
                  'Tells you what type of work the task belongs to, such as design, repair, or delivery.',
                ],
              },
              {
                title: 'Duration',
                body: ['Indicates how long the task is expected to take.'],
              },
              {
                title: 'Experience Level',
                body: [
                  'Shows the level of skill required, such as entry, intermediate, or expert.',
                ],
              },
              {
                title: 'Skills Required',
                body: [
                  'Lists the specific abilities or tools needed to complete the task.',
                ],
              },
              {
                title: 'Client Details',
                body: [
                  'Basic information about the person who posted the task, including their profile and rating.',
                ],
              },
            ],
            note: 'Review these carefully before applying.',
          },
          {
            title: 'Sending an Offer',
            description: '',
            steps2: [
              {
                title: 'Step 1: Set Your Price',
                body: ['Use the amount controls to choose how much you want to earn.'],
              },
              {
                title: 'Step 2: Write a Short Note',
                body: ['Explain briefly why you are a good fit.'],
              },
              {
                title: 'Step 3: Submit Your Offer',
                body: ['Your application will be sent to the task giver.'],
              },
            ],
          },
          {
            title: 'Accepting and Confirming a Task',
            description: '',
            steps2: [
              {
                title: 'Step 1: Wait for Approval',
                body: ['The task giver reviews your offer.'],
              },
              {
                title: 'Step 2: Get Confirmation',
                body: ['If accepted, the task will move to your active jobs.'],
              },
            ],
          },
          {
            title: 'Communicating with the Task Giver',
            description: '',
            steps2: [
              {
                title: 'Step 1: Open the Chat',
                body: ['Use the in-app messaging to ask questions.'],
              },
              {
                title: 'Step 2: Confirm Details',
                body: ['Clarify timing, location, or expectations before starting.'],
              },
            ],
          },
          {
            title: 'Completing the Task',
            description: '',
            steps2: [
              {
                title: 'Step 1: Perform the Work',
                body: ['Complete the task as agreed.'],
              },
              {
                title: 'Step 2: Mark as Completed',
                body: ['Confirm that the work is finished.'],
              },
            ],
          },
          {
            title: 'Getting Paid',
            description: '',
            steps2: [
              {
                title: 'Step 1: Payment Held Safely',
                body: ['The amount is secured when the task is confirmed.'],
              },
              {
                title: 'Step 2: Payment Released',
                body: [
                  'Once the task is marked complete, the money is sent to your account.',
                ],
              },
            ],
          },
          {
            title: 'Handling Cancellations',
            description: '',
            steps2: [
              {
                title: 'Step 1: Inform Early',
                body: ['Let the task giver know if you cannot continue.'],
              },
              {
                title: 'Step 2: Follow Platform Rules',
                body: ['The system will guide refunds or adjustments.'],
              },
            ],
          },
          {
            title: 'Understanding Ratings and Reviews',
            description: '',
            steps2: [
              {
                title: '',
                body: [
                  'After completion, both sides can leave feedback.',
                  'This helps others make better choices.',
                ],
              },
            ],
          },
        ],
      },

      /* ========================================
         PAYMENTS, SECURITY, AND DISPUTES
      ======================================== */
      'payments-security': {
        title: 'Payments, Security, and Disputes',
        steps: [
          {
            title: 'How Payments Work',
            body: [''],
          },
          {
            title: 'Step 1: Task Confirmation',
            body: [
              'When a task is accepted, the amount is taken and held in an Escrow.',
            ],
          },
          {
            title: 'Step 2: Work in Progress',
            body: ['The funds remain in Escrow while the task is being completed.'],
          },
          {
            title: 'Step 3: Task Completion',
            body: [
              'Once the task is marked as complete, the Escrow releases the payment.',
            ],
          },
        ],
        smallContent: [
          {
            title: 'Payment Status',
            description: '',
            steps2: [
              {
                title: 'Pending',
                body: ['The payment is in Escrow and the task has not started.'],
              },
              {
                title: 'In Progress',
                body: ['The task is active and the Escrow remains locked.'],
              },
              {
                title: 'Released',
                body: ['The payment has been sent to the task doer.'],
              },
            ],
          },
          {
            title: 'Security for Task Givers',
            description: '',
            steps2: [
              {
                title: 'Payment Protection',
                body: ['Your money is not released until the task is completed.'],
              },
              {
                title: 'Dispute Coverage',
                body: [
                  'If there is an issue, the funds remain in Escrow while the case is reviewed.',
                ],
              },
            ],
          },
          {
            title: 'Security for Task Doers',
            description: '',
            steps2: [
              {
                title: 'Guaranteed Funds',
                body: [
                  'The amount is taken and held in an Escrow before you begin.',
                ],
              },
              {
                title: 'Fair Release',
                body: [
                  'Once the task is completed, the Escrow releases your payment.',
                ],
              },
            ],
          },
          {
            title: 'Refunds and Cancellations',
            description: '',
            steps2: [
              {
                title: 'Before Work Starts',
                body: [
                  'If a task is cancelled before work begins, the amount in Escrow is refunded.',
                ],
              },
              {
                title: 'After Work Starts',
                body: [
                  'If a task is cancelled after work begins, the Escrow is held until a fair outcome is decided.',
                ],
              },
            ],
          },
          {
            title: 'Raising a Dispute',
            description: '',
            steps2: [
              {
                title: 'Step 1: Report the Issue',
                body: [
                  'Open a dispute from the task screen and explain the problem.',
                ],
              },
              {
                title: 'Step 2: Review',
                body: ['The task details, messages, and proof are reviewed.'],
              },
              {
                title: 'Step 3: Decision',
                body: [
                  'The Escrow is released, partially refunded, or returned based on the outcome.',
                ],
              },
            ],
          },
          {
            title: 'Platform Fees',
            description: '',
            steps2: [
              {
                title: 'Fee Visibility',
                body: ['Any platform fee is shown before you confirm the task.'],
              },
              {
                title: 'Non-Refundable',
                body: ['Platform fees are not returned if a task is cancelled.'],
              },
            ],
          },
          {
            title: 'Payment Safety Rules',
            description: '',
            steps2: [
              {
                title: 'Keep Payments In-App',
                body: ['All payments must stay inside SAYZO.'],
              },
              {
                title: 'Avoid Off-Platform Transfers',
                body: ['Moving payments outside removes all protection.'],
              },
            ],
          },
        ],
      },

      /* ========================================
         HOW TO GET MORE TASKS
      ======================================== */
      'get-more-tasks': {
        title: 'How to Get More Tasks',
        steps: [
          {
            title: 'Complete Your Profile',
            body: [''],
          },
          {
            title: 'Step 1: Add Clear Skills',
            body: ['List the exact skills you can offer.'],
          },
          {
            title: 'Step 2: Write a Simple Bio',
            body: ['Explain briefly what you do and your experience.'],
          },
          {
            title: 'Step 3: Add a Profile Photo',
            body: ['Use a clear, professional-looking photo.'],
          },
        ],
        smallContent: [
          {
            title: 'Choose the Right Tasks',
            description: '',
            steps2: [
              {
                title: 'Step 1: Read Task Details',
                body: ['Check the skills, budget, and timeline.'],
              },
              {
                title: 'Step 2: Apply Only When You Match',
                body: ['Focus on tasks you can complete well.'],
              },
            ],
          },
          {
            title: 'Respond Quickly',
            description: '',
            steps2: [
              {
                title: 'Step 1: Enable Notifications',
                body: ['Turn on alerts for new tasks.'],
              },
              {
                title: 'Step 2: Apply Early',
                body: ['Send your offer as soon as a task appears.'],
              },
            ],
          },
          {
            title: 'Send Better Offers',
            description: '',
            steps2: [
              {
                title: 'Step 1: Set a Fair Price',
                body: ['Choose a realistic amount for the work.'],
              },
              {
                title: 'Step 2: Write a Short Message',
                body: ['Explain why you are a good fit and when you can start.'],
              },
            ],
          },
          {
            title: 'Communicate Clearly',
            description: '',
            steps2: [
              {
                title: 'Step 1: Ask Questions',
                body: ['Clarify details before starting.'],
              },
              {
                title: 'Step 2: Stay Responsive',
                body: ['Reply quickly to messages.'],
              },
            ],
          },
          {
            title: 'Deliver Quality Work',
            description: '',
            steps2: [
              {
                title: 'Step 1: Follow the Task Scope',
                body: ['Complete exactly what was agreed.'],
              },
              {
                title: 'Step 2: Finish on Time',
                body: ['Meet the deadline.'],
              },
            ],
          },
          {
            title: 'Build Trust',
            description: '',
            steps2: [
              {
                title: 'Step 1: Ask for Reviews',
                body: ['Request feedback after completion.'],
              },
              {
                title: 'Step 2: Maintain High Ratings',
                body: ['Good reviews increase your chances of being chosen.'],
              },
            ],
          },
          {
            title: 'Stay Active',
            description: '',
            steps2: [
              {
                title: 'Step 1: Check Tasks Daily',
                body: ['New work is posted regularly.'],
              },
              {
                title: 'Step 2: Update Your Profile',
                body: ['Keep your skills and availability current.'],
              },
            ],
          },
        ],
      },

      /* ========================================
         DISPUTES AND BLOCKING
      ======================================== */
      'disputes-blocking': {
        title: 'Disputes and Blocking',
        steps: [
          {
            title: 'When to Raise a Dispute',
            body: [''],
          },
          {
            title: 'Step 1: Identify a Problem',
            body: [
              'Raise a dispute if the task is not completed as agreed, if there is a payment issue, or if communication breaks down.',
            ],
          },
          {
            title: 'Step 2: Try to Resolve First',
            body: ['Use chat to clarify or fix the issue before opening a dispute.'],
          },
        ],
        smallContent: [
          {
            title: 'How to Raise a Dispute',
            description: '',
            steps2: [
              {
                title: 'Step 1: Open the Task',
                body: ['Go to the task where the issue occurred.'],
              },
              {
                title: 'Step 2: Report the Issue',
                body: ['Select the dispute option and describe what happened.'],
              },
              {
                title: 'Step 3: Submit Evidence',
                body: ['Attach messages, photos, or files if needed.'],
              },
            ],
          },
          {
            title: 'What Happens After',
            description: '',
            steps2: [
              {
                title: 'Step 1: Escrow is Locked',
                body: [
                  'The amount is taken and held in an Escrow while the case is reviewed.',
                ],
              },
              {
                title: 'Step 2: Case Review',
                body: ['SAYZO reviews the task details, messages, and evidence.'],
              },
              {
                title: 'Step 3: Final Decision',
                body: [
                  'The Escrow is released, partially refunded, or returned based on the outcome.',
                ],
              },
            ],
          },
          {
            title: 'Blocking a User',
            description: '',
            steps2: [
              {
                title: 'Step 1: Open the Profile',
                body: ['Go to the profile of the person you want to block.'],
              },
              {
                title: 'Step 2: Block the User',
                body: ['They will no longer be able to contact you.'],
              },
            ],
          },
          {
            title: 'What Blocking Does',
            description: '',
            steps2: [
              {
                title: 'Step 1: Stops Communication',
                body: ['The blocked user cannot message you.'],
              },
              {
                title: 'Step 2: Hides Tasks',
                body: ["You will not see each other's future tasks."],
              },
            ],
          },
          {
            title: 'Reporting Abuse',
            description: '',
            steps2: [
              {
                title: 'Step 1: Report the User',
                body: ['Submit a report with details.'],
              },
              {
                title: 'Step 2: Platform Review',
                body: ['The account may be warned, restricted, or removed.'],
              },
            ],
          },
          {
            title: 'Cancellation During Disputes',
            description: '',
            steps2: [
              {
                title: 'Step 1: Pause the Task',
                body: ['The task is placed on hold.'],
              },
              {
                title: 'Step 2: Wait for Resolution',
                body: ['The Escrow remains locked until a final decision is made.'],
              },
            ],
          },
          {
            title: 'Repeat Offenders',
            description: '',
            steps2: [
              {
                title: 'Step 1: Track Behavior',
                body: ['Accounts with repeated issues are flagged.'],
              },
              {
                title: 'Step 2: Account Action',
                body: ['Warnings, suspensions, or permanent bans may apply.'],
              },
            ],
          },
          {
            title: 'Safety Concerns',
            description: '',
            steps2: [
              {
                title: 'Step 1: Report Immediately',
                body: ['Use the app to report unsafe behavior.'],
              },
              {
                title: 'Step 2: Get Support',
                body: ['The team reviews and responds quickly.'],
              },
            ],
          },
          {
            title: 'Staying Protected',
            description: '',
            steps2: [
              {
                title: 'Step 1: Keep Everything In-App',
                body: ['This ensures records are available.'],
              },
              {
                title: 'Step 2: Do Not Share Personal Payment Details',
                body: ['This helps prevent fraud.'],
              },
            ],
          },
        ],
      },

      /* ========================================
         TRUST AND SAFETY
      ======================================== */
      'trust-safety': {
        title: 'Trust and Safety',
        steps: [
          {
            title: 'Account Verification',
            body: [''],
          },
          {
            title: 'Step 1: Submit Your Details',
            body: ['Provide the required information to verify your identity.'],
          },
          {
            title: 'Step 2: Verification Review',
            body: [
              'Your information is reviewed before you can post or accept tasks.',
            ],
          },
          {
            title: 'Step 3: Keep It Updated',
            body: ['Outdated details may restrict your account.'],
          },
        ],
        smallContent: [
          {
            title: 'Identity and Profile Safety',
            description: '',
            steps2: [
              {
                title: 'Step 1: Use Your Real Name',
                body: ['Profiles must reflect real individuals.'],
              },
              {
                title: 'Step 2: Keep Your Account Secure',
                body: ['Do not share your login details.'],
              },
            ],
          },
          {
            title: 'Offline Safety Guidelines',
            description: '',
            steps2: [
              {
                title: 'Step 1: Meet Only for Confirmed Tasks',
                body: ['Only meet someone after the task is accepted in the app.'],
              },
              {
                title: 'Step 2: Choose Safe Locations',
                body: ['Meet in public or well-known places when possible.'],
              },
              {
                title: 'Step 3: Stay Aware',
                body: ['If something feels unsafe, leave and report it.'],
              },
            ],
          },
          {
            title: 'Reporting Unsafe Behavior',
            description: '',
            steps2: [
              {
                title: 'Step 1: Open the Task or Profile',
                body: ['Go to the task or user profile where the issue occurred.'],
              },
              {
                title: 'Step 2: Report the Issue',
                body: ['Describe what happened clearly.'],
              },
              {
                title: 'Step 3: Platform Action',
                body: ['SAYZO reviews and may warn, suspend, or remove the account.'],
              },
            ],
          },
          {
            title: 'Fraud Prevention',
            description: '',
            steps2: [
              {
                title: 'Step 1: Keep Payments In-App',
                body: [
                  'The amount is taken and held in an Escrow when the task is confirmed.',
                ],
              },
              {
                title: 'Step 2: Avoid Off-Platform Requests',
                body: ['Do not send or receive money outside SAYZO.'],
              },
              {
                title: 'Step 3: Report Suspicious Activity',
                body: ['Flag anyone asking for personal or payment details.'],
              },
            ],
          },
          {
            title: 'Location Safety',
            description: '',
            steps2: [
              {
                title: 'Step 1: Control Your Location',
                body: ['Only share your location when needed for a task.'],
              },
              {
                title: 'Step 2: Update Your Radius',
                body: ['Change your service area anytime.'],
              },
            ],
          },
          {
            title: 'Emergency Support',
            description: '',
            steps2: [
              {
                title: 'Step 1: Exit the Task',
                body: ['Leave immediately if you feel unsafe.'],
              },
              {
                title: 'Step 2: Contact Support',
                body: ['Report the situation through the app for quick review.'],
              },
            ],
          },
        ],
      },

      /* ========================================
         COMMUNITY GUIDELINES
      ======================================== */
      'community-guidelines': {
        title: 'Community Guidelines',
        steps: [
          {
            title: 'Respectful Communication',
            body: [''],
          },
          {
            title: 'Step 1: Be Polite',
            body: ['Speak respectfully in all messages.'],
          },
          {
            title: 'Step 2: Avoid Harassment',
            body: ['Do not threaten, abuse, or intimidate others.'],
          },
          {
            title: 'Step 3: Keep It Professional',
            body: ['Treat every task as a real agreement.'],
          },
        ],
        smallContent: [
          {
            title: 'Honest Task Posting',
            description: '',
            steps2: [
              {
                title: 'Step 1: Be Clear',
                body: ['Describe the task honestly and fully.'],
              },
              {
                title: 'Step 2: Do Not Change Scope',
                body: ['Do not add extra work after someone accepts.'],
              },
              {
                title: 'Step 3: Use Fair Budgets',
                body: ['Set a realistic price for the task.'],
              },
            ],
          },
          {
            title: 'Fair Work Standards',
            description: '',
            steps2: [
              {
                title: 'Step 1: Respect Agreements',
                body: ['Follow the terms agreed in the task.'],
              },
              {
                title: 'Step 2: No Forced Changes',
                body: ['Do not pressure the other person to accept new terms.'],
              },
            ],
          },
          {
            title: 'No Off-Platform Payments',
            description: '',
            steps2: [
              {
                title: 'Step 1: Use SAYZO Only',
                body: ['All payments must happen inside the app.'],
              },
              {
                title: 'Step 2: Understand Protection',
                body: [
                  'The amount is taken and held in an Escrow when the task is confirmed.',
                ],
              },
            ],
          },
          {
            title: 'No Illegal or Unsafe Tasks',
            description: '',
            steps2: [
              {
                title: 'Step 1: Follow the Law',
                body: ['Do not post or accept illegal tasks.'],
              },
              {
                title: 'Step 2: Avoid Dangerous Work',
                body: ['Tasks that could result in any kind of danger are not allowed.'],
              },
            ],
          },
          {
            title: 'Prohibited Content and Services',
            description: '',
            steps2: [
              {
                title: 'Step 1: No Adult or Exploitative Content',
                body: ['Sexual or harmful tasks are not allowed.'],
              },
              {
                title: 'Step 2: No Licensed Services',
                body: ['Do not offer medical, legal, or financial advice.'],
              },
            ],
          },
          {
            title: 'Identity and Account Integrity',
            description: '',
            steps2: [
              {
                title: 'Step 1: Use One Account',
                body: ['Multiple accounts are not allowed.'],
              },
              {
                title: 'Step 2: Do Not Impersonate',
                body: ['Pretending to be someone else is prohibited.'],
              },
            ],
          },
          {
            title: 'Data and Privacy Respect',
            description: '',
            steps2: [
              {
                title: 'Step 1: Protect Personal Data',
                body: ['Do not misuse private information.'],
              },
              {
                title: 'Step 2: No Recording Without Consent',
                body: ['Respect privacy during offline tasks.'],
              },
            ],
          },
          {
            title: 'Ratings and Reviews',
            description: '',
            steps2: [
              {
                title: 'Step 1: Be Honest',
                body: ['Leave feedback based on real experience.'],
              },
              {
                title: 'Step 2: No Manipulation',
                body: ['Do not threaten or bribe for reviews.'],
              },
            ],
          },
          {
            title: 'Platform Enforcement',
            description: '',
            steps2: [
              {
                title: 'Step 1: Warnings',
                body: ['First violations may result in warnings.'],
              },
              {
                title: 'Step 2: Restrictions',
                body: ['Serious issues may limit access.'],
              },
              {
                title: 'Step 3: Permanent Ban',
                body: ['Repeated abuse may lead to removal.'],
              },
            ],
          },
        ],
      },

      /* ========================================
         LOCATION AND PRIVACY
      ======================================== */
      'location-privacy': {
        title: 'Location and Privacy',
        steps: [
          {
            title: 'Setting Your Location',
            body: [''],
          },
          {
            title: 'Step 1: Add Your Address',
            body: ['Enter your city or service area to see nearby tasks.'],
          },
          {
            title: 'Step 2: Use Current Location',
            body: [
              'You may allow the app to use your device location to show tasks around you.',
            ],
          },
          {
            title: 'Step 3: Update Anytime',
            body: ['You can change your location whenever needed.'],
          },
        ],
        note: 'SAYZO only uses location to match you with relevant tasks and does not sell your data.',
        smallContent: [
          {
            title: 'Changing Your Radius',
            description: '',
            steps2: [
              {
                title: 'Step 1: Choose Distance Range',
                body: ['Set how far you are willing to travel for offline tasks.'],
              },
              {
                title: 'Step 2: Save Preferences',
                body: ['Only tasks within this range will be shown.'],
              },
            ],
            note: 'This helps limit unnecessary exposure to areas you do not want to work in.',
          },
          {
            title: 'What Others Can See',
            description: '',
            steps2: [
              {
                title: 'Step 1: Limited Location Visibility',
                body: [
                  'Other users only see an approximate area, not your exact address.',
                ],
              },
              {
                title: 'Step 2: Task-Based Sharing',
                body: ['Your exact location is shared only after a task is confirmed.'],
              },
            ],
            note: 'This protects your privacy while allowing tasks to be completed safely.',
          },
          {
            title: 'Data Protection',
            description: '',
            steps2: [
              {
                title: 'Step 1: Secure Storage',
                body: ['Your personal and location data is stored securely.'],
              },
              {
                title: 'Step 2: Platform Use Only',
                body: ['Data is used only to operate SAYZO and improve safety.'],
              },
            ],
            note: 'SAYZO does not claim ownership of your personal data and uses it only as required to provide the service.',
          },
          {
            title: 'Privacy During Offline Tasks',
            description: '',
            steps2: [
              {
                title: 'Step 1: Share Only What Is Needed',
                body: ['Do not share personal details outside the task requirements.'],
              },
              {
                title: 'Step 2: Keep Communication In-App',
                body: ['This creates a record and protects both sides.'],
              },
            ],
            note: 'SAYZO cannot support issues that happen off-platform.',
          },
          {
            title: 'Recording and Consent',
            description: '',
            steps2: [
              {
                title: 'Step 1: Ask Before Recording',
                body: ['Do not record audio, video, or photos without permission.'],
              },
              {
                title: 'Step 2: Respect Personal Space',
                body: [
                  'Any misuse of data or recordings may lead to account suspension.',
                ],
              },
            ],
          },
          {
            title: 'Your Rights',
            description: '',
            steps2: [
              {
                title: 'Step 1: Request Access',
                body: ['You may request to see what data SAYZO holds.'],
              },
              {
                title: 'Step 2: Request Deletion',
                body: [
                  'You may ask for your data to be removed when closing your account.',
                ],
              },
            ],
            note: 'These rights are subject to legal and operational requirements.',
          },
        ],
      },

      /* ========================================
         SUPPORT AND HELP ACCESS
      ======================================== */
      'support-help': {
        title: 'Support and Help Access',
        steps: [
          {
            title: 'When to Contact Support',
            body: [''],
          },
          {
            title: 'Step 1: Identify the Issue',
            body: [
              'Contact support if you cannot complete a task, see a payment problem, or face technical errors.',
            ],
          },
          {
            title: 'Step 2: Check the Manual First',
            body: ['Use the Help Center to find answers before reaching out.'],
          },
        ],
        smallContent: [
          {
            title: 'How to Contact Support',
            description: '',
            steps2: [
              {
                title: 'Step 1: Open the Help Menu',
                body: ['Go to the support section inside the app.'],
              },
              {
                title: 'Step 2: Submit a Request',
                body: [
                  'Describe your issue clearly and include any relevant details.',
                ],
              },
            ],
          },
          {
            title: 'What to Include in Your Request',
            description: '',
            steps2: [
              {
                title: 'Step 1: Task Information',
                body: ['Share the task name and date.'],
              },
              {
                title: 'Step 2: Description',
                body: ['Explain what went wrong.'],
              },
              {
                title: 'Step 3: Proof',
                body: ['Attach screenshots or messages if available.'],
              },
            ],
          },
          {
            title: 'Response Time',
            description: '',
            steps2: [
              {
                title: 'Initial Review',
                body: ['Most requests are reviewed within a reasonable time.'],
              },
              {
                title: 'Follow Up',
                body: ['You will be notified when there is an update.'],
              },
            ],
          },
          {
            title: 'Support vs Disputes',
            description: '',
            steps2: [
              {
                title: 'Use Support for Technical Issues',
                body: [
                  'Contact support for app errors, login problems, or general questions.',
                ],
              },
              {
                title: 'Use Disputes for Task Issues',
                body: [
                  'Raise a dispute when the problem is about task completion or payment.',
                ],
              },
            ],
          },
          {
            title: 'Emergency Guidance',
            description: '',
            steps2: [
              {
                title: 'Step 1: Exit the Situation',
                body: ['Leave immediately if you feel unsafe.'],
              },
              {
                title: 'Step 2: Contact Local Help',
                body: ['Reach out to local emergency services if required.'],
              },
              {
                title: 'Step 3: Report in App',
                body: ['Inform SAYZO after you are safe.'],
              },
            ],
          },
        ],
      },
    },
  },

  /* ================= TECHNOLOGIES ================= */
 'REFUND-&-CANCELLATION': {
    sidebar: [
      { id: 'intro', label: 'Introduction' },
      { id: 'role-sayzo', label: 'Role of SAYZO' },
      { id: 'platform-fees', label: 'Platform Fees' },
      { id: 'giver-cancellation', label: 'Cancellation by Task Giver' },
      { id: 'doer-cancellation', label: 'Cancellation by Task Doer' },
      { id: 'disputes', label: 'Disputes & Refunds' },
      { id: 'non-refundable', label: 'Non-Refundable Situations' },
      { id: 'off-platform', label: 'Off-Platform Transactions' },
      { id: 'failed-transactions', label: 'Failed or Duplicate Transactions' },
      { id: 'timelines', label: 'Refund Timelines' },
      { id: 'chargebacks', label: 'Chargebacks & Reversals' },
      { id: 'force-majeure', label: 'Force Majeure' },
      { id: 'final-authority', label: 'Final Authority' },
      { id: 'contact', label: 'Contact & Support' },
    ],
    content: {
      intro: {
        title: 'SAYZO – REFUND & CANCELLATION POLICY',
        body: [
          'Effective Date: 29 Jan 2026',
          '',
          'This Refund & Cancellation Policy ("Policy") governs cancellations, refunds, failed transactions, chargebacks, and payment reversals on the SAYZO platform.',
          '',
          'This Policy forms an integral part of SAYZO\'s Terms & Conditions and is legally binding on all users.',
          '',
          'By using the SAYZO platform, you agree to this Policy.',
        ],
      },
      'role-sayzo': {
        title: 'ROLE OF SAYZO (IMPORTANT)',
        steps: [
          {
            title: '',
            body: [
              'SAYZO is a technology intermediary',
              '',
              '• SAYZO does not provide services',
              '• SAYZO does not control or supervise task execution',
              '• SAYZO does not guarantee task outcomes',
              '',
              'All refunds relate only to platform-facilitated transactions and are subject strictly to this Policy.',
            ],
          },
        ],
      },
      'platform-fees': {
        title: 'PLATFORM FEES (NON-REFUNDABLE)',
        steps: [
          {
            title: '',
            body: [
              'SAYZO charges a Platform Fee for providing access to the Platform, including task discovery, communication tools, payment facilitation, and dispute resolution.',
              '',
              'Once these services are provided:',
              '• Platform Fees are non-refundable',
              '• Payment gateway charges are non-refundable',
              '• Taxes (including GST) are non-refundable, except where required by law',
              '',
              'Platform Fees are charged independently of task completion and are payable for platform usage, not task outcomes.',
            ],
          },
        ],
      },
      'giver-cancellation': {
        title: 'CANCELLATION BY TASK GIVER',
        steps: [
          {
            title: 'Before Task Acceptance',
            body: [
              '• Task Givers may cancel a task before it is accepted by a Task Doer',
              '• If payment was made, only the task amount may be refunded',
              '• Platform Fees, payment gateway charges, and taxes are not refundable',
            ],
          },
          {
            title: 'After Task Acceptance (Before Work Starts)',
            body: [
              'Cancellation may be allowed only if:',
              '• The Task Doer agrees, or',
              '• SAYZO determines that work has not commenced',
              '',
              'Refunds, if any:',
              '• Are processed on a case-by-case basis',
              '• Apply only to the task amount',
              '• Exclude Platform Fees, gateway charges, and taxes',
            ],
          },
          {
            title: 'After Work Has Started',
            body: [
              '• No automatic refund applies',
              '• Refunds, if any, depend on:',
              '  - Work already completed',
              '  - Evidence provided',
              '  - Dispute outcome under platform rules',
              '',
              'Platform Fees remain non-refundable in all cases.',
            ],
          },
        ],
      },
      'doer-cancellation': {
        title: 'CANCELLATION BY TASK DOER',
        steps: [
          {
            title: '',
            body: [
              'If a Task Doer cancels:',
              '',
              '• Before work starts → the task amount may be refunded to the Task Giver',
              '• After work starts → refund, if any, depends on work completed and dispute outcome',
              '',
              'Repeated cancellations by Task Doers may result in account restrictions.',
            ],
          },
        ],
      },
      disputes: {
        title: 'DISPUTES & REFUNDS',
        steps: [
          {
            title: '',
            body: [
              '• Disputes must be raised through the SAYZO platform',
              '• Funds may remain in escrow during investigation',
              '• Both parties must provide accurate and timely evidence',
              '',
              'Refund decisions:',
              '• Are made case-by-case',
              '• Are based on available evidence and user conduct',
              '• Follow SAYZO\'s platform rules',
              '',
              'SAYZO\'s role is limited to dispute facilitation and does not constitute a guarantee of refund.',
            ],
          },
        ],
      },
      'non-refundable': {
        title: 'NON-REFUNDABLE SITUATIONS',
        steps: [
          {
            title: '',
            body: [
              'Refunds will not be provided in cases including but not limited to:',
              '',
              '• Change of mind after work has started',
              '• Dissatisfaction without objective or verifiable evidence',
              '• Delays or failure caused by the Task Giver',
              '• Partial completion where usable work is delivered',
              '• Off-platform communication or payments',
              '• Violation of SAYZO policies',
              '• Force majeure events',
              '',
              'Platform Fees remain non-refundable in all such cases.',
            ],
          },
        ],
      },
      'off-platform': {
        title: 'OFF-PLATFORM TRANSACTIONS',
        steps: [
          {
            title: '',
            body: [
              'Payments made outside the SAYZO platform are not eligible for:',
              '• Refunds',
              '• Dispute support',
              '• Chargeback assistance',
              '',
              'SAYZO bears no responsibility for off-platform transactions.',
            ],
          },
        ],
      },
      'failed-transactions': {
        title: 'FAILED OR DUPLICATE TRANSACTIONS',
        steps: [
          {
            title: '',
            body: [
              'In case of:',
              '• Failed payments',
              '• Duplicate debits',
              '',
              'The amount debited may be refunded to the original payment method after verification, subject to payment gateway timelines.',
              '',
              'Platform Fees already charged may not be refundable where services were provided.',
            ],
          },
        ],
      },
      timelines: {
        title: 'REFUND TIMELINES',
        steps: [
          {
            title: '',
            body: [
              'If a refund is approved:',
              '• Processing time: 5 – 7 business days',
              '• Actual credit time depends on banks or payment gateways',
              '',
              'SAYZO is not responsible for third-party delays.',
            ],
          },
        ],
      },
      chargebacks: {
        title: 'CHARGEBACKS & PAYMENT REVERSALS',
        steps: [
          {
            title: '',
            body: [
              'Users must not:',
              '• Initiate chargebacks without first raising a dispute on SAYZO',
              '• Misuse banking or payment reversal mechanisms',
              '',
              'Unauthorized chargebacks may result in:',
              '• Refund denial',
              '• Account suspension or termination',
            ],
          },
        ],
      },
      'force-majeure': {
        title: 'FORCE MAJEURE',
        steps: [
          {
            title: '',
            body: [
              'Refund obligations may be delayed or suspended due to events beyond SAYZO\'s reasonable control, including internet outages, payment gateway failures, government actions, or natural disasters.',
            ],
          },
        ],
      },
      'final-authority': {
        title: 'FINAL AUTHORITY',
        steps: [
          {
            title: '',
            body: [
              'All refund and cancellation decisions are subject to:',
              '• This Policy',
              '• SAYZO\'s Terms & Conditions',
              '• Applicable law',
              '',
              'Nothing in this Policy creates an obligation to issue a refund unless legally required.',
            ],
          },
        ],
      },
      contact: {
        title: 'CONTACT & SUPPORT',
        steps: [
          {
            title: '',
            body: [
              'For refund or cancellation queries:',
              'Email: support@sayzo.co.in',
            ],
          },
        ],
      },
    },
  },

  /* ================= FAQ - COMPLETE ================= */
  faq: {
    sidebar: [
      { id: 'faq-2', label: 'How does negotiation work?' },
      { id: 'faq-3', label: 'What if the user is late?' },
      { id: 'faq-4', label: 'What if work quality is bad?' },
      { id: 'faq-5', label: 'What if user never shows up?' },
      { id: 'faq-6', label: 'Why is my payment on hold?' },
      { id: 'faq-7', label: 'Can I cancel my task?' },
      { id: 'faq-8', label: 'How does SAYZO verify users?' },
      { id: 'faq-9', label: 'How do ratings work?' },
      { id: 'faq-10', label: 'What tasks are allowed?' },
      { id: 'faq-11', label: 'How do disputes work?' },
      { id: 'faq-12', label: 'Can I talk outside SAYZO?' },
      { id: 'faq-13', label: 'What if I feel unsafe?' },
      { id: 'faq-14', label: 'Safety in offline tasks' },
      { id: 'faq-15', label: 'What if someone cheats?' },
    ],
    content: {
      'faq-2': {
        title: 'How does negotiation work on SAYZO?',
        body: [
          'SAYZO allows negotiation only when the taskgiver chooses to allow it. Negotiation is controlled by the platform. This page explains how it works in very simple words.',
        ],
        steps: [
          {
            title: '1. What is negotiation?',
            body: [
              'Negotiation means both users can talk and change task terms before starting work.',
              'This can include:',
              '• Price',
              '• Time',
              '• Work scope',
              '• Method of work',
              'Negotiation happens only before escrow payment is locked. After escrow is locked, no negotiation is allowed.',
            ],
          },
          {
            title: '2. Two modes of tasks on SAYZO',
            body: [
              'Every task is posted in one of two modes:',
              'Fixed Mode: The taskgiver is not open to negotiation',
              'Negotiation Mode: The taskgiver is open to discussion',
              'The taskgiver selects this while posting the task.',
            ],
          },
          {
            title: '3. What happens in Fixed Mode?',
            body: [
              'In Fixed Mode, the rules are simple.',
              'SAYZO AI sends your task only to users who match your requirements.',
              'They receive a message: "This task matches you. This is the budget and time. Do you want to do this task?"',
              'They get two buttons:',
              '• Accept',
              '• Decline',
              'There is no chat. There is no negotiation.',
              'If they Accept, they fully agree to your terms.',
              'Then you can lock escrow and work can begin.',
            ],
          },
          {
            title: '4. What happens in Negotiation Mode?',
            body: [
              'In Negotiation Mode, discussion is allowed.',
              'SAYZO AI sends the task with this message: "This taskgiver is open to negotiation."',
              'Users get two buttons:',
              '• Negotiate',
              '• Decline',
              'When they press Negotiate:',
              '• Chat opens',
              '• You can discuss',
              '• You can change price',
              '• You can change time',
              '• You can change work scope',
              'But work does not start yet.',
            ],
          },
          {
            title: '5. When does Accept unlock?',
            body: [
              'In Negotiation Mode, Accept button stays locked.',
              'Only after both users agree in chat, Accept unlocks.',
              'Then escrow payment is locked.',
              'Only after escrow is locked:',
              '• Private calling unlocks',
              '• Google Meet unlocks',
              '• Work can begin',
            ],
          },
          {
            title: '6. Why is this system strict?',
            body: [
              'Because SAYZO is not a chat app.',
              'It is a trust and contract system.',
              'This system prevents:',
              '• Fake accepts',
              '• Time wasting',
              '• Off-platform leakage',
              '• Price shopping abuse',
              '• Refund misuse',
            ],
          },
          {
            title: '7. Can negotiation happen after escrow?',
            body: [
              'No.',
              'After escrow is locked:',
              '• No price changes',
              '• No time changes',
              '• No scope changes',
              'Only disputes are allowed.',
            ],
          },
          {
            title: '8. What if users still try to change terms?',
            body: [
              'If a user tries to change terms after escrow:',
              '• Their trust score goes down',
              '• Repeated abuse can block accounts',
            ],
          },
          {
            title: '9. Why SAYZO designed it this way',
            body: [
              'This design:',
              '• Keeps tasks serious',
              '• Keeps work clean',
              '• Keeps refunds predictable',
              '• Keeps trust high',
              'This is how SAYZO avoids drama.',
              'SAYZO does not allow "maybe".',
              'It allows only clear contracts.',
              'Clear agreements create fast work. Fast work builds trust.',
            ],
          },
        ],
      },
      'faq-3': {
        title: 'What if the user who accepted my task is late?',
        body: [
          'Time is money. Time is trust. On SAYZO, time is treated seriously.',
          'This page explains what happens when a user does not deliver work on time.',
        ],
        steps: [
          {
            title: '1. Every task has a clear deadline',
            body: [
              'When you post a task, you choose:',
              '• When work must start',
              '• When work must finish',
              'These times are locked once escrow is confirmed.',
              'They cannot be changed.',
            ],
          },
          {
            title: '2. Why deadlines matter',
            body: [
              'Deadlines help both sides.',
              'They make sure:',
              '• Work does not drag forever',
              '• Users stay serious',
              '• Money does not get stuck',
              '• Disputes stay clean',
            ],
          },
          {
            title: '3. What happens when a user is late?',
            body: [
              'If the doer does not complete the work on time:',
              '• Their trust score drops',
              '• Their profile visibility reduces',
              '• They may lose future opportunities',
              'This affects their ranking.',
            ],
          },
          {
            title: '4. Your rights as a taskgiver',
            body: [
              'If the doer is late, you can:',
              '• Request refund',
              '• Ask for reassignment',
              '• Open a dispute',
              'You are not forced to wait.',
            ],
          },
          {
            title: '5. Grace window',
            body: [
              'SAYZO provides a small grace period.',
              'If work is not done even after grace:',
              '• You become eligible for refund',
              '• Penalties apply to the doer',
            ],
          },
          {
            title: '6. Repeated delays',
            body: [
              'Users who are late many times:',
              '• Get lower ranking',
              '• Lose task invitations',
              '• Can be blocked permanently',
            ],
          },
          {
            title: '7. Why SAYZO is strict',
            body: [
              'Because slow marketplaces die.',
              'Late delivery breaks trust.',
              'SAYZO chooses discipline over drama.',
            ],
          },
        ],
      },
      'faq-4': {
        title: 'What if the work quality is bad?',
        body: [
          'SAYZO is built to protect your money and your time.',
          'This page explains what happens when the work you receive is not good.',
        ],
        steps: [
          {
            title: '1. What is "bad quality"?',
            body: [
              'Bad quality means:',
              '• Work is incomplete',
              '• Work is wrong',
              '• Work is rushed',
              '• Work does not match what was agreed',
              '• Work is unusable',
            ],
          },
          {
            title: '2. First step – Ask for rework',
            body: [
              'Inside the protection time, you can ask the doer to fix the issue.',
              'Most honest users will fix it.',
            ],
          },
          {
            title: '3. What if rework is still bad?',
            body: [
              'You can raise a dispute.',
              'You will be asked to:',
              '• Explain what is wrong',
              '• Upload proof',
              '• Submit the case',
            ],
          },
          {
            title: '4. What SAYZO does',
            body: [
              'SAYZO checks:',
              '• Task description',
              '• Chat history',
              '• Proof uploaded',
              '• Delivery quality',
              'Then SAYZO decides:',
              '• Full refund',
              '• Partial refund',
              '• Rework order',
            ],
          },
          {
            title: '5. How this affects the doer',
            body: [
              'Poor quality:',
              '• Drops trust score',
              '• Reduces visibility',
              '• Can block account if repeated',
            ],
          },
          {
            title: '6. Why SAYZO protects quality',
            body: [
              'Because users must trust the platform.',
              'Trust creates repeat business.',
            ],
          },
        ],
      },
      'faq-5': {
        title: 'What if the user accepts my task but never shows up?',
        body: [
          'This is one of the most painful problems in any marketplace. SAYZO is designed to stop this completely.',
        ],
        steps: [
          {
            title: '1. What does "not showing up" mean?',
            body: [
              'Not showing up means:',
              '• The user accepted your task',
              '• Escrow was locked',
              '• But they never started the work',
              '• Or they stopped replying',
              '• Or they disappeared',
            ],
          },
          {
            title: '2. What should you do?',
            body: [
              'You should open a dispute.',
              'You simply:',
              '• Select "User did not start work"',
              '• Submit',
              'You do not need to beg. You do not need to chase.',
            ],
          },
          {
            title: '3. What SAYZO does',
            body: [
              'SAYZO checks:',
              '• Time logs',
              '• Chat history',
              '• Activity records',
              'If no real work is found:',
              '• The task is cancelled',
              '• The doer\'s wallet is frozen',
              '• You get a full refund',
              '• Their trust score drops heavily',
            ],
          },
          {
            title: '4. Why SAYZO is strict',
            body: [
              'Because ghosting destroys trust.',
              'SAYZO removes such users fast.',
            ],
          },
        ],
      },
      'faq-6': {
        title: 'Why is my payment on hold in SAYZO?',
        body: [
          'Many users ask:',
          '"Why is my money not going directly to the other person?"',
          '"Why is my payment locked?"',
          '"Why can\'t I just pay and finish?"',
          'This page explains that in very simple words.',
        ],
        steps: [
          {
            title: '1. Your money is not "stuck". It is protected.',
            body: [
              'When you lock your payment into escrow, your money is not lost.',
              'Your money is not taken by the other person.',
              'Your money is kept inside a safe lock wallet controlled by SAYZO.',
              'This wallet keeps your money safe until the work is done.',
            ],
          },
          {
            title: '2. Why SAYZO does this',
            body: [
              'If money goes directly to the other user, then:',
              '• They can disappear',
              '• They can give bad work',
              '• They can ignore you',
              '• You will have no control',
              'Escrow removes this risk.',
            ],
          },
          {
            title: '3. What escrow protects',
            body: [
              'Escrow protects:',
              '• Your money',
              '• Your time',
              '• Your trust',
              '• SAYZO\'s fairness',
            ],
          },
          {
            title: '4. When is your money released?',
            body: [
              'Your money is released only when:',
              '• You mark the work as completed',
              '• Or the protection time ends with no dispute',
              'No work = No payment.',
            ],
          },
          {
            title: '5. Why this helps honest users',
            body: [
              'Doers also feel safe because:',
              'They know money is already locked.',
              'They know they will be paid if they do honest work.',
            ],
          },
          {
            title: '6. Escrow builds discipline',
            body: [
              'People behave better when rules are strict.',
              'Escrow makes SAYZO safe.',
            ],
          },
        ],
      },
      'faq-7': {
        title: 'Can I cancel my task? What happens to my money?',
        body: [
          'This page explains in very simple words what happens to your money when you cancel a task and how you get your refund.',
        ],
        steps: [
          {
            title: '1. Your money is not "stuck". It is protected.',
            body: [
              'When you lock your payment into escrow, your money is not lost.',
              'Your money is not taken by the other person.',
              'Your money is kept inside a safe lock wallet controlled by SAYZO.',
              'This wallet keeps your money safe until the work is done.',
            ],
          },
          {
            title: '2. Before escrow payment',
            body: [
              'Before you lock money into escrow:',
              '• You can talk to users',
              '• You can negotiate',
              '• You can reject applicants',
              '• You can walk away',
              'At this stage:',
              '• No money is taken',
              '• No refund is needed',
              '• Nothing is locked',
              'You are free.',
            ],
          },
          {
            title: '3. After escrow payment (but work has NOT started)',
            body: [
              'Once you lock your payment into escrow:',
              'Your money is now kept in SAYZO\'s secure wallet.',
              'Private calling and Google Meet become active.',
              'Now real system cost is involved.',
              'So SAYZO applies a commitment fee.',
              'If you cancel here:',
              'You will get 90% of your money back.',
              'The remaining 10% is kept by SAYZO as system and seriousness fee.',
            ],
          },
          {
            title: '4. After work has started',
            body: [
              'If work has already started:',
              'SAYZO checks:',
              '• How much work is done',
              '• Proof of work',
              '• Time spent',
              'Based on this, SAYZO decides:',
              '• Partial refund',
              '• Or no refund',
              'This keeps things fair.',
            ],
          },
          {
            title: '5. How do you cancel?',
            body: [
              'To cancel:',
              '• Open your task',
              '• Click "Cancel Task"',
              '• Select your reason',
              '• Submit',
              'No calls needed. No begging needed.',
            ],
          },
          {
            title: '6. How does your money come back?',
            body: [
              'When SAYZO approves your refund:',
              '• Money is sent back to your original payment method',
              '• This can be UPI, card, wallet, or bank account',
              '• You do not need to do anything else',
            ],
          },
          {
            title: '7. How long does the refund take?',
            body: [
              'Refund usually takes:',
              '• 3 to 7 working days',
              '• Depending on your bank or payment app',
              'SAYZO processes refunds immediately, as per SAYZO Terms and Conditions.',
              'Banks take the rest of the time.',
            ],
          },
          {
            title: '8. Where will your money come?',
            body: [
              'Your refund always goes back to:',
              '• The same UPI',
              '• The same card',
              '• The same bank',
              '• The same wallet',
              'From where you paid.',
            ],
          },
          {
            title: '9. Why SAYZO does this',
            body: [
              'If money goes directly to the other user, then:',
              '• They can disappear',
              '• They can give bad work',
              '• They can ignore you',
              '• You will have no control',
              'Escrow removes this risk.',
            ],
          },
          {
            title: '10. Why SAYZO is strict',
            body: [
              'Because free cancellation destroys trust.',
              'SAYZO rewards serious users only.',
            ],
          },
        ],
      },
      'faq-8': {
        title: 'How does SAYZO verify users?',
        body: [
          'SAYZO is not an open chat group. SAYZO is a trust network.',
          'This page explains how SAYZO checks every user and why it matters.',
        ],
        steps: [
          {
            title: '1. Why verification is needed',
            body: [
              'Without verification:',
              '• Fake people enter',
              '• Fraud happens',
              '• Money is lost',
              '• Good users suffer',
              'So SAYZO verifies everyone.',
            ],
          },
          {
            title: '2. What every user must complete',
            body: [
              'Every user must finish:',
              '• Mobile number verification',
              '• Identity proof',
              '• Face match',
              '• Basic personal details',
              'Only after this, users can post tasks and accept work.',
            ],
          },
          {
            title: '3. What SAYZO checks',
            body: [
              'SAYZO checks:',
              '• Real identity',
              '• One person, one account',
              '• Past activity',
              '• Behavior patterns',
              'This removes fake and duplicate accounts.',
            ],
          },
          {
            title: '4. What happens to unverified users?',
            body: [
              'Unverified users:',
              '• Cannot access tasks',
              '• Cannot withdraw money',
              '• Cannot take work',
            ],
          },
          {
            title: '5. Why this protects you',
            body: [
              'Because you are never dealing with unknown people.',
              'You are dealing with verified humans.',
            ],
          },
          {
            title: '6. What happens to bad users?',
            body: [
              'Bad users:',
              '• Get warnings',
              '• Lose visibility',
              '• Get blocked permanently',
              'SAYZO protects real people. SAYZO removes fake people.',
            ],
          },
        ],
      },
      'faq-9': {
        title: 'How do ratings and trust scores work on SAYZO?',
        body: [
          'On SAYZO, your name is your asset.',
          'Your rating and trust score decide:',
          '• How many tasks you see',
          '• How much money you can earn',
          '• Whether people trust you',
          '• Whether SAYZO keeps you or removes you',
          'This page explains everything in very simple words.',
        ],
        steps: [
          {
            title: '1. What is a rating?',
            body: [
              'After every task, both users can rate each other.',
              'Rating is given in stars and short feedback.',
              'This shows:',
              '• Was the person honest',
              '• Was the work done well',
              '• Was the person on time',
              '• Was the behavior good',
            ],
          },
          {
            title: '2. What is a trust score?',
            body: [
              'Trust score is SAYZO\'s internal safety number.',
              'It is not just stars. It is deeper.',
              'It checks:',
              '• How many tasks you complete',
              '• How often you cancel',
              '• How often you are late',
              '• How many disputes you face',
              '• How many refunds happen because of you',
              'Your trust score decides your future on SAYZO.',
            ],
          },
          {
            title: '3. Why ratings and trust scores matter',
            body: [
              'High trust users:',
              '• Get more task invites',
              '• Get higher paying work',
              '• Get faster payments',
              '• Get priority support',
              'Low trust users:',
              '• Get fewer tasks',
              '• Get less visibility',
              '• Can be restricted',
              '• Can be permanently blocked',
            ],
          },
          {
            title: '4. What lowers your trust score?',
            body: [
              '• Late delivery',
              '• Bad quality',
              '• Disputes',
              '• Ghosting',
              '• Fake accepts',
              '• Repeated cancellations',
              '• Abuse reports',
            ],
          },
          {
            title: '5. Can your trust score improve?',
            body: [
              'Yes.',
              'If you:',
              '• Work honestly',
              '• Deliver on time',
              '• Avoid disputes',
              '• Respect users',
              'Your trust score slowly improves.',
            ],
          },
          {
            title: '6. Why SAYZO is strict',
            body: [
              'Because trust is your real currency.',
              'SAYZO protects honest users and removes cheaters.',
            ],
          },
        ],
      },
      'faq-10': {
        title: 'What kind of tasks are allowed on SAYZO?',
        body: [
          'SAYZO is for help, guidance, micro-work, and short-term assistance.',
          'It is not a deep-service or contract marketplace.',
          'You can post tasks like:',
        ],
        steps: [
          {
            title: 'Allowed Tasks',
            body: [
              '• Urban help and guidance',
              '• Digital work and micro-tasks',
              '• Short-term assistance',
              '• Knowledge-based help',
              '• Tech support and guidance',
              '• Content and creative work',
              '• Data entry and analysis',
              '• Design and media help',
            ],
          },
          {
            title: 'Mandatory Platform Boundary (Very Important)',
            body: [
              'Every task in this category must show:',
              'This is short-term assistance and coordination help.',
              'This is not an employment contract.',
              'No employer-employee relationship is created.',
            ],
          },
          {
            title: '🚫 What is NOT Allowed on SAYZO',
            body: [
              'SAYZO is built for urban help, digital work, and guidance-based assistance.',
              'It is not a domestic labour app, not a risky service platform, and not a licensed professional marketplace.',
              'To protect users, safety, and the future of SAYZO, the following types of work are strictly not allowed:',
            ],
          },
          {
            title: '1. Domestic Worker & Servant-Type Jobs (Blocked)',
            body: [
              'You cannot use SAYZO to find:',
              '• Maids',
              '• Full-day home servants',
              '• Mopping, sweeping, or dishwashing workers',
              '• Cooking helpers',
              '• Laundry workers',
              '• Caretakers',
              '• Babysitters',
              '• Nannies',
              '• Dog walkers',
              '• Pet sitters',
              '• Garden labourers',
              '• House help on monthly or daily basis',
              'SAYZO does not operate as a domestic staffing platform.',
            ],
          },
          {
            title: '2. Hazardous, Dangerous & High-Risk Physical Work (Blocked)',
            body: [
              'You cannot post tasks involving:',
              '• Electrical rewiring',
              '• Gas pipeline handling',
              '• Water tank or septic cleaning',
              '• Heavy construction or demolition',
              '• Welding or metal cutting',
              '• High-rise exterior work',
              '• Chemical handling',
              '• Fire-risk activities',
              '• Industrial machinery operation',
              '• Heavy vehicle or mechanical repairs',
              'These tasks are blocked to protect human life.',
            ],
          },
          {
            title: '3. Medical, Therapy & Mental Health Services (Blocked)',
            body: [
              'You cannot use SAYZO for:',
              '• Doctor consultations',
              '• Diagnosis or treatment',
              '• Prescribing medicines',
              '• Therapy or counselling sessions',
              '• Emergency medical help',
              '• Mental health crisis handling',
              '• Pregnancy or child medical care',
            ],
          },
          {
            title: '4. Legal, Financial & Compliance Services (Blocked)',
            body: [
              'You cannot post tasks for:',
              '• Legal representation',
              '• Court filing or legal notices',
              '• Case strategy or opinions',
              '• Investment advice',
              '• Tax filing, audits, or compliance',
              '• Financial management services',
            ],
          },
          {
            title: '5. Child, Elder & Patient Care (Blocked)',
            body: [
              'You cannot use SAYZO to find:',
              '• Babysitters',
              '• Elder care helpers',
              '• Patient attendants',
              '• Nursing helpers',
            ],
          },
          {
            title: '6. Security, Policing & Surveillance (Blocked)',
            body: [
              'You cannot post tasks for:',
              '• Security guards',
              '• Bouncers',
              '• Crowd control',
              '• Surveillance or spying',
              '• Law enforcement work',
            ],
          },
          {
            title: '7. Driving & Transport Services (Blocked)',
            body: [
              'You cannot use SAYZO for:',
              '• Cab or driver hiring',
              '• Delivery riders',
              '• Transport services',
              '• Long-distance driving',
            ],
          },
          {
            title: '8. Illegal, Unethical or Harmful Work (Blocked)',
            body: [
              'You cannot post:',
              '• Drugs, weapons, fraud',
              '• Hacking or data theft',
              '• Fake documents',
              '• Bribery or blackmail',
              '• Academic cheating',
              '• Adult or exploitative content',
              '• Hate or abusive work',
            ],
          },
          {
            title: 'Why SAYZO is strict',
            body: [
              'These categories create:',
              '• Safety risk',
              '• Legal liability',
              '• Labour law risk',
              '• Insurance nightmares',
              '• Platform misuse',
              'SAYZO is building a premium, safe, and scalable urban help & knowledge economy - not a labour contractor app.',
            ],
          },
        ],
      },
      'faq-11': {
        title: 'How do disputes work on SAYZO?',
        body: [
          'Sometimes things do not go as planned.',
          'A user may be late.',
          'A user may not do the work properly.',
          'A user may stop replying.',
          'A user may try to cheat.',
          'SAYZO has a dispute system to protect both sides.',
          'This page explains how it works in very simple words.',
        ],
        steps: [
          {
            title: '1. What is a dispute?',
            body: [
              'A dispute is a request you raise when something goes wrong.',
              'It tells SAYZO:',
              '"Something is not right. Please check and protect my money."',
              'Disputes stop fraud.',
              'Disputes stop cheating.',
              'Disputes protect honest users.',
            ],
          },
          {
            title: '2. When can you raise a dispute?',
            body: [
              'You can raise a dispute when:',
              '• Work is late',
              '• Work is not started',
              '• Work quality is bad',
              '• User is not replying',
              '• User is misbehaving',
              '• Terms are being broken',
            ],
          },
          {
            title: '3. How do you raise a dispute?',
            body: [
              'You open your task.',
              'You click "Raise Dispute".',
              'You select the reason.',
              'You upload proof like:',
              '• Screenshots',
              '• Chat messages',
              '• Photos or videos',
              '• Files',
              'Then you submit.',
              'No calls. No arguments. No chasing.',
            ],
          },
          {
            title: '4. What happens after dispute is raised?',
            body: [
              'As soon as dispute is raised:',
              '• Task is locked',
              '• Money is frozen in escrow',
              '• The other user cannot withdraw money',
              '• SAYZO starts reviewing',
            ],
          },
          {
            title: '5. How does SAYZO decide?',
            body: [
              'SAYZO checks:',
              '• Task details',
              '• Chat history',
              '• Proof uploaded',
              '• System logs',
              '• Time records',
              'Then SAYZO makes a fair decision.',
            ],
          },
          {
            title: '6. What can SAYZO decide?',
            body: [
              'SAYZO can decide:',
              '• Full refund',
              '• Partial refund',
              '• Rework order',
              '• Task cancellation',
              '• Account penalty',
              '• Account blocking',
            ],
          },
          {
            title: '7. How long does dispute resolution take?',
            body: [
              'Most disputes are resolved within:',
              '48 to 72 hours.',
            ],
          },
          {
            title: '8. Why SAYZO is strict',
            body: [
              'Because disputes protect honest users.',
              'Cheaters lose.',
              'Honest users win.',
            ],
          },
        ],
      },
      'faq-12': {
        title: 'Can I talk or pay outside SAYZO? What happens if I do?',
        body: [
          'Short answer: No.',
          'Long answer: This rule exists to protect your money, your safety, and SAYZO itself.',
        ],
        steps: [
          {
            title: '1. Why SAYZO blocks outside dealing',
            body: [
              'If users move outside the app:',
              '• Money protection disappears',
              '• Disputes cannot be handled',
              '• Fake promises happen',
              '• People get cheated',
              '• SAYZO cannot protect anyone',
              'So SAYZO does not allow outside payments or communication.',
            ],
          },
          {
            title: '2. What is considered "outside dealing"?',
            body: [
              'Outside dealing means:',
              '• Sharing phone numbers before escrow',
              '• Sharing WhatsApp or Telegram',
              '• Asking to pay directly by UPI',
              '• Sending Google Meet links before escrow',
              '• Asking for cash payments',
              '• Moving the deal outside SAYZO',
            ],
          },
          {
            title: '3. What happens if someone tries?',
            body: [
              'If someone tries:',
              '• Their account trust score drops',
              '• Their task visibility reduces',
              '• They can be warned',
              '• Repeated attempts lead to permanent ban',
            ],
          },
          {
            title: '4. What if you already went outside?',
            body: [
              'If you go outside SAYZO:',
              '• Your protection is removed',
              '• Refund rights are cancelled',
              '• SAYZO cannot help you',
              '• Money loss is your responsibility',
            ],
          },
          {
            title: '5. Why SAYZO is strict',
            body: [
              'SAYZO chooses safety over convenience.',
            ],
          },
        ],
      },
      'faq-13': {
        title: 'What if I feel unsafe, harassed, or threatened on SAYZO?',
        body: [
          'Your safety is more important than any task, money, or rating.',
          'SAYZO has zero tolerance for abuse, threats, or unsafe behavior.',
          'This page explains what to do if you feel unsafe.',
        ],
        steps: [
          {
            title: '1. What is considered unsafe or abusive behavior?',
            body: [
              'Unsafe or abusive behavior includes:',
              '• Threatening messages',
              '• Forcing work outside task scope',
              '• Asking for personal photos',
              '• Sexual messages',
              '• Abuse or bad language',
              '• Repeated unwanted calls',
              '• Pressuring for outside payment',
              '• Intimidation',
              '• Racist or hateful words',
            ],
          },
          {
            title: '2. What should you do immediately?',
            body: [
              'Open your task.',
              'Tap Report / Safety Button.',
              'You do not need to reply to the person. Do not argue.',
              'Just report.',
            ],
          },
          {
            title: '3. What happens after you report?',
            body: [
              'As soon as you report:',
              '• The other user is frozen',
              '• They cannot take new tasks',
              '• Their wallet is locked',
              '• SAYZO reviews the case',
            ],
          },
          {
            title: '4. What actions can SAYZO take?',
            body: [
              'Depending on severity, SAYZO can:',
              '• Warn the user',
              '• Restrict their account',
              '• Permanently ban them',
              '• Block their identity from returning',
            ],
          },
          {
            title: '5. Emergency cases',
            body: [
              'If there is real danger:',
              '• Contact local emergency services',
              '• Then report inside SAYZO',
              'SAYZO cooperates with authorities when needed.',
            ],
          },
          {
            title: '6. Why SAYZO is strict',
            body: [
              'Because no one should feel unsafe while getting help.',
              'Safety first.',
            ],
          },
        ],
      },
      'faq-14': {
        title: 'How does SAYZO protect my safety in offline (on-ground) tasks?',
        body: [
          'When people meet in the real world, safety becomes more important than anything.',
          'SAYZO takes offline safety very seriously.',
          'This page explains how SAYZO protects you and what you must do to protect yourself.',
          'Please read this carefully before doing any offline task.',
        ],
        steps: [
          {
            title: '1. Only verified users can do offline tasks',
            body: [
              'No one is allowed to do offline tasks unless they are fully verified.',
              'This means every user must complete:',
              '• Mobile number verification',
              '• Identity proof',
              '• Face verification',
              '• Behavior checks',
              'This removes fake and dangerous accounts from the system.',
            ],
          },
          {
            title: '2. Location and time are always recorded',
            body: [
              'When an offline task is accepted:',
              '• Task address is recorded',
              '• Task time is recorded',
              '• Activity logs are saved by the system',
              'This creates a digital safety trail.',
              'If anything goes wrong, SAYZO can see what really happened.',
            ],
          },
          {
            title: '3. One-tap Safety & Emergency button',
            body: [
              'Inside every offline task screen there is a Safety / Emergency Button.',
              'If you feel unsafe at any time:',
              '• Tap the safety button',
              '• The other user is frozen instantly',
              '• SAYZO starts reviewing immediately',
              'Your safety comes first.',
            ],
          },
          {
            title: '4. What happens when you report a safety issue?',
            body: [
              'As soon as you report:',
              '• The task is locked',
              '• The other user\'s wallet is frozen',
              '• They cannot take new tasks',
              '• SAYZO reviews the case quickly',
              'Serious cases lead to permanent ban.',
            ],
          },
          {
            title: '5. Personal Safety Checklist (Very Important)',
            body: [
              'Before you go for any offline task, SAYZO strongly asks you to follow these rules.',
              'These steps protect your life.',
            ],
          },
          {
            title: 'Always confirm the work by call',
            body: [
              'Before leaving your home:',
              '• Do a proper call with the other user',
              '• Confirm what work is needed',
              '• Confirm the address',
              '• Confirm the time',
              '• Confirm who you will meet',
              'Never go blind.',
            ],
          },
          {
            title: 'Avoid evening and night visits',
            body: [
              'For your safety:',
              '• Do not go late in the evening',
              '• Do not go at night',
              '• Prefer daytime tasks only',
              'Dark hours increase risk.',
            ],
          },
          {
            title: 'Share your live location with someone you trust',
            body: [
              'Before leaving:',
              '• Share your location with a family member or friend',
              '• Tell them where you are going',
              '• Tell them when you will return',
            ],
          },
          {
            title: 'Keep your phone ready',
            body: [
              '• Keep your phone fully charged',
              '• Keep internet turned on',
              '• Keep emergency contacts ready',
            ],
          },
          {
            title: 'Do not go alone if you feel unsafe',
            body: [
              'If a task feels risky:',
              '• Take someone with you',
              '• Or decline the task',
              'Your life is more important than money.',
            ],
          },
          {
            title: 'Leave immediately if anything feels wrong',
            body: [
              'If you feel uncomfortable:',
              '• Leave the place',
              '• Open SAYZO',
              '• Report immediately',
              'You will never be punished for choosing safety.',
            ],
          },
          {
            title: '6. Why SAYZO is strict',
            body: [
              'Because no work is worth your life.',
              'SAYZO protects humans first.',
            ],
          },
        ],
      },
      'faq-15': {
        title: 'What happens if someone lies, cheats, or tries to game the SAYZO system?',
        body: [
          'SAYZO is built for honest people who want to work and get help.',
          'Some people may try to cheat the system.',
          'Some may lie.',
          'Some may try to misuse refunds or ratings.',
          'SAYZO has strong rules to stop such behavior.',
        ],
        steps: [
          {
            title: '1. What is considered cheating on SAYZO?',
            body: [
              'Cheating includes:',
              '• Accepting tasks with no intention to work',
              '• Asking for money outside SAYZO',
              '• Repeated fake cancellations',
              '• Uploading fake proof',
              '• Delivering copied or stolen work',
              '• Misleading task descriptions',
              '• Harassing or threatening users',
              '• Creating fake accounts',
              '• Manipulating ratings',
              '• Trying to bypass escrow',
            ],
          },
          {
            title: '2. How SAYZO detects cheating',
            body: [
              'SAYZO uses:',
              '• AI behavior monitoring',
              '• Activity logs',
              '• Pattern detection',
              '• User reports',
              '• System audits',
              'Cheating behavior is detected even if no one reports it.',
            ],
          },
          {
            title: '3. What actions SAYZO can take',
            body: [
              'Depending on severity, SAYZO can:',
              '• Freeze wallets',
              '• Block withdrawals',
              '• Reduce visibility',
              '• Cancel tasks',
              '• Remove accounts permanently',
              '• Ban identity and devices',
            ],
          },
          {
            title: '4. Can banned users return?',
            body: [
              'No.',
              'Once permanently banned, the identity is blocked forever.',
            ],
          },
          {
            title: '5. Why SAYZO is strict',
            body: [
              'Because cheating destroys trust.',
              'SAYZO protects honest users.',
            ],
          },
        ],
      },
    },
  },

  
    'PROHIBITED-TASKS-&-BLACKLIST-CATEGORIES': {
      sidebar: [
        { id: 'pt-intro', label: 'Introduction' },
        { id: 'pt-core', label: 'Core Principle' },
        { id: 'pt-prohibited', label: 'Strictly Prohibited Tasks' },
        { id: 'pt-identity', label: 'Identity & No Endorsement' },
        { id: 'pt-offline', label: 'Offline Tasks & Risk' },
        { id: 'pt-pilot', label: 'Pilot Phase Flexibility' },
        { id: 'pt-enforcement', label: 'Enforcement & Discretion' },
        { id: 'pt-liability', label: 'No Liability & Guarantee' },
        { id: 'pt-law', label: 'Governing Law' },
        { type: 'divider' },
        { id: 'bl-illegal', label: 'Illegal & Criminal Tasks' },
        { id: 'bl-adult', label: 'Sexual / Adult Services' },
        { id: 'bl-medical', label: 'Medical & Health Services' },
        { id: 'bl-children', label: 'Child-related Work' },
        { id: 'bl-construction', label: 'Construction & Heavy Labour' },
        { id: 'bl-hazard', label: 'Hazardous / Risk Work' },
        { id: 'bl-financial', label: 'Financial & Legal Advisory' },
        { id: 'bl-religious', label: 'Religious / Political Activities' },
        { id: 'bl-mlm', label: 'MLM / Pyramid Schemes' },
        { id: 'bl-gambling', label: 'Gambling / Crypto Trading' },
        { id: 'bl-weapons', label: 'Weapons & Security' },
        { id: 'bl-political-survey', label: 'Political Survey Work' },
      ],
      content: {
        'pt-intro': {
          title: 'SAYZO – PROHIBITED TASKS & USE POLICY',
          body: [
            'Effective Date: 29 Jan 2026',
            '',
            'SAYZO is a peer-to-peer platform that enables users to request or offer help directly to one another.',
            'SAYZO does not pre-define task categories or limit the type of lawful help users may seek or offer.',
            'Users are free to post or accept any lawful task, subject only to the restrictions set out in this Policy.',
            'This Policy forms an integral part of SAYZO\'s Terms & Conditions and applies to all users.',
          ],
        },
        'pt-core': {
          title: 'CORE PRINCIPLE',
          body: [
            'SAYZO exists to facilitate peer-to-peer coordination of help.',
            '',
            '• Users define what "help" means for their specific need',
            '• SAYZO does not curate, classify, or endorse task types',
            '• SAYZO intervenes only to prevent illegal, unsafe, or high-risk activity',
          ],
          
        },
        'pt-prohibited': {
  title: 'STRICTLY PROHIBITED TASKS',
  body: [
    'Users must not post, request, accept, or perform tasks involving the following categories:',
  ],
  steps: [
    {
      title: 'A. Illegal or Criminal Activity',
      body: [
        '• Any activity prohibited under applicable law',
        '• Fraud, scams, impersonation, or misrepresentation',
        '• Hacking, data theft, cybercrime, or privacy violations',
      ],
    },
    {
      title: 'B. Regulated or Licensed Professions',
      body: [
        '• Medical diagnosis, treatment, or healthcare services',
        '• Legal advice, representation, or documentation',
        '• Financial, investment, or trading advice',
        '• Accounting, auditing, or tax filing services',
        '(These activities require statutory licenses and are not permitted on SAYZO)',
      ],
    },
    {
      title: 'C. High-Risk or Hazardous Activities',
      body: [
        '• Industrial, construction, or heavy machinery work',
        '• Handling of hazardous or dangerous materials',
        '• Tasks requiring mandatory safety certifications',
      ],
    },
    {
      title: 'D. Sexual, Exploitative, or Abusive Activities',
      body: [
        '• Sexual or adult services',
        '• Exploitation, coercion, or harassment',
        '• Any form of abusive or threatening conduct',
      ],
    },
    {
      title: 'E. Minors & Vulnerable Individuals',
      body: [
        '• Tasks involving minors without lawful authorization',
        '• Childcare, supervision, or guardianship services',
      ],
    },
    {
      title: 'F. Weapons, Drugs & Restricted Goods',
      body: [
        '• Firearms, ammunition, explosives, or weapons',
        '• Illegal drugs, controlled substances, or trafficking',
        '• Sale or distribution of restricted goods',
      ],
    },
    {
      title: 'G. Political, Religious & Gambling Activities',
      body: [
        '• Political campaigning, lobbying, or election activities',
        '• Religious solicitation or proselytization',
        '• Gambling, betting, or lottery-related tasks',
      ],
    },
  ],
}
,
        'pt-identity': {
          title: 'IDENTITY VERIFICATION & NO ENDORSEMENT',
          body: [
            'SAYZO may conduct identity verification of users using government-issued identification documents solely for:',
            '• User authentication',
            '• Fraud prevention',
            '• Regulatory compliance',
            '• Platform integrity',
            '',
            'Such verification:',
            '• Confirms only the identity of a user',
            '• Does not constitute endorsement, certification, or approval',
            '• Does not guarantee skill, intent, conduct, safety, or outcomes',
            '',
            'SAYZO does not verify professional qualifications or task capabilities.',
          ],
        },
        'pt-offline': {
          title: 'OFFLINE TASKS & RISK ASSUMPTION',
          body: [
            'For any offline interaction:',
            '• SAYZO does not supervise or monitor on-ground activity',
            '• Users engage at their own risk',
            '• Offline interactions are governed by SAYZO\'s Offline Safety Guidelines',
          ],
        },
        'pt-pilot': {
          title: 'PILOT PHASE FLEXIBILITY',
          body: [
            'During the pilot phase:',
            '• SAYZO may observe user behaviour and emerging use cases',
            '• Certain task types may be restricted, paused, or reviewed based on legal, safety, or risk considerations',
            '',
            'This does not constitute endorsement or platform curation.',
          ],
        },
        'pt-enforcement': {
          title: 'ENFORCEMENT & DISCRETION',
          body: [
            'SAYZO reserves the right to:',
            '• Remove tasks that violate this Policy',
            '• Restrict, suspend, or terminate user accounts',
            '• Modify or update this Policy as required',
            '',
            'Such actions are taken solely for legal compliance and platform safety and do not imply supervision or liability.',
          ],
        },
        'pt-liability': {
          title: 'NO LIABILITY & NO GUARANTEE',
          body: [
            '• SAYZO does not guarantee legality, safety, or outcomes of tasks',
            '• SAYZO does not endorse any task or user',
            '• Users assume full responsibility for their interactions',
          ],
        },
        'pt-law': {
          title: 'GOVERNING LAW',
          body: [
            'This Policy shall be governed by the laws of India and read together with SAYZO\'s Terms & Conditions.',
          ],
        },
        'bl-illegal': {
          title: 'Illegal & Criminal Tasks',
          body: [
            'Anything violating Indian law, including:',
            '• Drug buying / selling',
            '• Fake documents',
            '• Hacking / cybercrime',
            '• Bribes',
            '• Theft',
            '• Smuggling',
            '• Fake certificates',
            '• Scam calls',
            '• SIM card misuse',
            '• Identity misuse',
            '• Money laundering',
            '• Forgery',
            '• Selling stolen goods',
          ],
        },
        'bl-adult': {
          title: 'Sexual / Escort / Adult Services',
          body: [
            '• Escorting',
            '• Prostitution',
            '• Companion services',
            '• Massage with extras',
            '• Sugar dating',
            '• Pornographic work',
            '• OnlyFans-type work',
            '• Webcam / video sex',
          ],
        },
        'bl-medical': {
          title: 'Medical & Health Services',
          body: [
            '• Nursing',
            '• Injections',
            '• Home doctor visits',
            '• Therapy / counselling',
            '• Mental health services',
            '• Ayurveda / homeopathy',
            '• Physiotherapy',
            '• Medical advice',
            '• Lab sample collection',
          ],
        },
        'bl-children': {
          title: 'Child-related Work (Hard Ban)',
          body: [
            '• Babysitting',
            '• Child caretaking',
            '• Child modelling',
            '• Any task involving minors',
          ],
        },
        'bl-construction': {
          title: 'Construction / Heavy Labour / Industrial Work',
          body: [
            '• Welding',
            '• Electric line work (Heavy Work only)',
            '• Heavy machinery',
            '• Plumbing (large scale only)',
            '• Civil construction',
            '• Factory labour',
          ],
        },
        'bl-hazard': {
          title: 'Hazardous / Risk Work',
          body: [
            '• Climbing towers',
            '• Working on roofs',
            '• Tree cutting',
            '• Gas line work',
            '• Deep cleaning sewage',
            '• Fire-related jobs',
            '• Chemical handling',
          ],
        },
        'bl-financial': {
          title: 'Financial & Legal Advisory',
          body: [
            '• CA / audit',
            '• Tax filing',
            '• Legal advice',
            '• Court filing',
            '• Loan brokering',
            '• Debt recovery',
            '• Collection agents',
          ],
        },
        'bl-religious': {
          title: 'Religious / Political Activities',
          body: [
            '• Political campaigns',
            '• Party promotions',
            '• Religious rituals',
            '• Donations',
            '• Temple / mosque services',
          ],
        },
        'bl-mlm': {
          title: 'MLM / Pyramid / Commission Recruitment',
          body: [
            '• Network marketing',
            '• Agent recruitment',
            '• "Earn ₹50k/week" jobs',
            '• Commission chains',
          ],
        },
        'bl-gambling': {
          title: 'Gambling / Betting / Crypto Trading',
          body: [
            '• Satta',
            '• Online betting',
            '• Fantasy money games',
            '• Crypto trading tasks',
            '• Signal selling',
          ],
        },
        'bl-weapons': {
          title: 'Weapons / Self-defence / Security',
          body: [
            '• Bouncers',
            '• Bodyguards',
            '• Gun training',
            '• Weapon sales',
            '• Martial combat jobs',
          ],
        },
        'bl-political-survey': {
          title: 'Political Survey',
          body: [
            '• Election surveys',
            '• Political canvassing',
            '• Cold sales visits',
            '• Pamphlet distribution for politics',
          ],
        },
      },
    
  },
  'Trust-&-Safety': {
  sidebar: [
    { id: 'ts-intro', label: 'Overview' },
    { id: 'tg-terms', label: 'Task Giver Terms & Conditions' },
    { id: 'td-terms', label: 'Task Doer Terms & Conditions' },
    { id: 'trust-safety', label: 'Trust, Safety & How SAYZO Works' },
    { id: 'tg-guidelines', label: 'Task Giver Guidelines' },
    { id: 'td-guidelines', label: 'Task Doer Guidelines' },
    { id: 'independent', label: 'Independent Contractor Declaration' },
    { id: 'intermediary', label: 'Intermediary Status Declaration' },
    { id: 'grievance', label: 'Grievance Redressal Policy' },
    { id: 'tg-usecases', label: 'User Tasks' },
  ],

  content: {
    /* =============================
       OVERVIEW
    ============================== */
    'ts-intro': {
      title: 'SAYZO – TRUST & SAFETY FRAMEWORK',
      body: [
        'Effective Date: 29 Jan 2026',
        '',
        'This section explains how SAYZO works, how trust and safety are enforced, and what SAYZO does and does not guarantee.',
        'All users must read and understand these documents before posting or accepting tasks.',
      ],
    },

    /* =============================
       TASK GIVER TERMS & CONDITIONS
    ============================== */
    'tg-terms': {
      title: 'TASK GIVER TERMS & CONDITIONS',
      steps: [
        {
          title: '1. Role of SAYZO & Platform Nature',
          body: [
            'SAYZO is a technology intermediary platform.',
            '• SAYZO does not provide services',
            '• SAYZO does not employ, supervise, or control Task Doers',
            '• SAYZO does not guarantee task completion, quality, pricing, or outcomes',
            '',
            'All tasks are executed solely between the Task Giver and the Task Doer. SAYZO\'s role is limited to facilitating discovery, communication, payment handling, and dispute resolution.',
          ],
        },
        {
          title: '2. Task Giver Eligibility',
          body: [
            'To post tasks, you must:',
            '• Be at least 18 years of age',
            '• Be legally competent under Indian law',
            '• Complete identity verification as required by SAYZO',
            '',
            'SAYZO may deny, restrict, suspend, or terminate access if eligibility or verification requirements are not met.',
          ],
        },
        {
          title: '3. Identity Verification & No Endorsement',
          body: [
            'SAYZO may conduct identity verification using government-issued identification documents solely for:',
            '• User authentication',
            '• Fraud prevention',
            '• Regulatory compliance',
            '• Platform integrity',
            '',
            'Such verification:',
            '• Confirms only the identity of the Task Giver',
            '• Does not constitute endorsement, certification, recommendation, or approval by SAYZO',
            '• Does not guarantee honesty, conduct, safety, or task outcomes',
            '',
            'SAYZO does not assess or guarantee the intent or behaviour of any user.',
          ],
        },
        {
          title: '4. Task Posting Obligations',
          body: [
            'Task Givers must:',
            '• Post lawful, accurate, and complete task descriptions',
            '• Clearly specify scope, deliverables, pricing, location (if offline), and timelines',
            '• Ensure tasks comply with applicable laws and SAYZO policies',
            '',
            'Task Givers must not:',
            '• Post misleading, deceptive, unsafe, or illegal tasks',
            '• Change scope after acceptance without mutual agreement',
            '• Misrepresent requirements or conditions',
            '',
            'Misrepresentation constitutes platform abuse.',
          ],
        },
        {
          title: '5. Prohibited Tasks',
          body: [
            'Task Givers shall not post tasks involving:',
            '• Illegal or criminal activity',
            '• Medical, legal, or financial advisory services',
            '• Hazardous, industrial, or regulated work',
            '• Sexual or adult services',
            '• Activities involving minors',
            '• Political campaigning, gambling, weapons, or licensed services',
            '',
            'SAYZO may remove any task or restrict access at its discretion to enforce policies or legal compliance.',
          ],
        },
        {
          title: '6. Payments, Escrow & Platform Fees',
          body: [
            '• Task Givers may be required to make payment before task commencement',
            '• Funds may be held in escrow until task completion or dispute resolution',
            '• SAYZO charges a Platform Fee for facilitating access to the platform',
            '',
            'Task Givers acknowledge that:',
            '• SAYZO does not control task pricing',
            '• Platform Fees are non-refundable once platform services are provided (except where required by law)',
            '• SAYZO is not responsible for payment disputes beyond platform rules',
            '',
            'GST is charged only on the Platform Fee, as applicable.',
          ],
        },
        {
          title: '7. Task Completion & Confirmation',
          body: [
            'Task Givers must:',
            '• Confirm task completion honestly',
            '• Release payment upon legitimate completion',
            '',
            'Task Givers must not:',
            '• Delay confirmation to avoid payment',
            '• Abuse the dispute or escrow system',
            '• Initiate chargebacks without valid grounds',
            '',
            'Such conduct may result in:',
            '• Refund denial',
            '• Account suspension',
            '• Permanent termination',
          ],
        },
        {
          title: '8. Disputes & Refunds',
          body: [
            '• Disputes must be raised through the SAYZO platform',
            '• Task Givers must cooperate and provide accurate evidence',
            '',
            'Refunds, if any, are processed on a case-by-case basis in accordance with SAYZO\'s Refund & Cancellation Policy, based on evidence and user conduct.',
            '',
            'SAYZO\'s role in disputes is limited to facilitation, subject to applicable law.',
          ],
        },
        {
          title: '9. Off-Platform Transactions',
          body: [
            'Task Givers are strictly prohibited from:',
            '• Making payments outside the SAYZO platform',
            '• Moving communication off-platform to bypass SAYZO',
            '',
            'SAYZO provides no protection, dispute support, or refunds for off-platform transactions.',
            '',
            'Violations may result in suspension or permanent termination.',
          ],
        },
        {
          title: '10. Ratings, Reviews & Conduct',
          body: [
            'Task Givers may submit reviews after task completion.',
            '',
            'Reviews must be honest and experience-based.',
            '',
            'Task Givers must not:',
            '• Post false, misleading, or retaliatory reviews',
            '• Threaten Task Doers with negative ratings',
            '',
            'SAYZO may moderate or remove reviews at its discretion.',
          ],
        },
        {
          title: '11. Offline Tasks & Safety',
          body: [
            'For offline tasks:',
            '• SAYZO does not supervise or monitor on-ground activity',
            '• Task Givers engage in offline interactions at their own risk',
            '',
            'Offline interactions are governed by SAYZO\'s Offline Safety Guidelines, which form part of these Terms.',
          ],
        },
        {
          title: '12. No Warranties',
          body: [
            'SAYZO makes no warranties regarding:',
            '• Task completion',
            '• Task quality',
            '• User conduct',
            '',
            'Use of the platform is at the Task Giver\'s own risk.',
          ],
        },
        {
          title: '13. Limitation of Liability',
          body: [
            'To the maximum extent permitted by law:',
            '• SAYZO shall not be liable for indirect, incidental, or consequential damages',
            '• SAYZO\'s total liability shall not exceed Platform Fees paid by the Task Giver in the preceding six (6) months',
          ],
        },
        {
          title: '14. Indemnification',
          body: [
            'Task Givers agree to indemnify and hold harmless SAYZO from any claims, losses, damages, or liabilities arising from:',
            '• Their tasks',
            '• Their conduct or omissions',
            '• Their violation of law or these Terms',
          ],
        },
        {
          title: '15. Suspension & Termination',
          body: [
            'SAYZO may suspend or terminate Task Giver access for:',
            '• Policy violations',
            '• Abuse of disputes or payments',
            '• Fraud or illegal activity',
            '',
            'Termination may apply across accounts, devices, and payment methods.',
          ],
        },
        {
          title: '16. Governing Law & Dispute Resolution',
          body: [
            'These Terms are governed by the laws of India.',
            '',
            'Disputes shall be resolved through arbitration under the Arbitration & Conciliation Act, 1996:',
            '• Seat & venue: New Delhi',
            '• Language: English',
          ],
        },
        {
          title: '17. Acknowledgement',
          body: [
            'By posting a task on SAYZO, you acknowledge that:',
            '• SAYZO is an intermediary platform',
            '• Identity verification does not constitute endorsement or guarantee',
            '• SAYZO does not control Task Doers or task outcomes',
            '• You agree to these Task Giver Terms & Conditions',
          ],
        },
      ],
    },

    /* =============================
       TASK DOER TERMS & CONDITIONS
    ============================== */
    'td-terms': {
     
      'td-terms': {
      title:   'TASK DOER TERMS & CONDITIONS',
      body: [
        'Effective Date: 29 Jan 2026',
        '',
        'This section explains how SAYZO works, how trust and safety are enforced, and what SAYZO does and does not guarantee.',
        'All users must read and understand these documents before posting or accepting tasks.',
      ],
    },
      steps: [
        {
          title: '1. Role of SAYZO & Platform Nature',
          body: [
            'SAYZO is a technology intermediary platform.',
            '• SAYZO does not provide services',
            '• SAYZO does not employ Task Doers',
            '• SAYZO does not supervise, direct, or control task execution',
            '',
            'All tasks are performed directly between Task Givers and Task Doers. SAYZO\'s role is limited to facilitating discovery, communication, payments, and dispute resolution.',
          ],
        },
        {
          title: '2. Task Doer Eligibility',
          body: [
            'To act as a Task Doer, you must:',
            '• Be at least 18 years of age',
            '• Be legally competent under Indian law',
            '• Complete identity verification as required by SAYZO',
            '',
            'SAYZO may deny, restrict, suspend, or terminate access if eligibility or verification requirements are not met.',
          ],
        },
        {
          title: '3. Identity Verification & No Endorsement',
          body: [
            'SAYZO may conduct identity verification using government-issued identification documents solely for:',
            '• User authentication',
            '• Fraud prevention',
            '• Regulatory compliance',
            '• Platform integrity',
            '',
            'Such verification:',
            '• Confirms only the identity of the Task Doer',
            '• Does not constitute endorsement, certification, recommendation, or approval',
            '• Does not guarantee skills, qualifications, conduct, safety, reliability, or task outcomes',
            '',
            'SAYZO does not assess or guarantee the capability, intent, or performance of any Task Doer.',
          ],
        },
        {
          title: '4. Independent Contractor Status (Critical)',
          body: [
            'Task Doers acknowledge and agree that:',
            '• They act as independent contractors',
            '• They are not employees, agents, partners, or representatives of SAYZO',
            '• No employment, agency, partnership, or joint venture relationship exists',
            '',
            'Task Doers:',
            '• Are free to accept or reject tasks',
            '• Control how, when, and where tasks are performed',
            '• May provide services to others, including competitors',
            '',
            'SAYZO does not:',
            '• Set working hours',
            '• Mandate task acceptance',
            '• Provide tools, equipment, or uniforms',
          ],
        },
        {
          title: '5. Taxes, Compliance & Insurance',
          body: [
            'Task Doers are solely responsible for:',
            '• Income tax, GST, and statutory filings',
            '• Licenses or permits, if required',
            '• Compliance with applicable laws',
            '• Personal insurance, health insurance, or accident coverage',
            '',
            'SAYZO has no obligation to:',
            '• Deduct or pay taxes',
            '• Provide insurance or benefits',
            '• Provide statutory employment protections',
          ],
        },
        {
          title: '6. Task Acceptance & Execution',
          body: [
            'Task Doers must:',
            '• Accept only tasks they can realistically complete',
            '• Perform tasks lawfully, professionally, and in good faith',
            '• Follow the agreed scope and timelines',
            '',
            'Task Doers must not:',
            '• Misrepresent skills or qualifications',
            '• Accept tasks requiring licensed services unless legally authorized',
            '• Engage in illegal, unsafe, or prohibited activities',
            '',
            'SAYZO may remove tasks or restrict accounts to enforce policies. Such actions do not constitute supervision or control.',
          ],
        },
        {
          title: '7. Payments, Escrow & Fees',
          body: [
            'Payments may be released upon:',
            '• Task completion confirmation, or',
            '• Dispute resolution under platform rules',
            '',
            'Task Doers acknowledge that:',
            '• SAYZO does not guarantee payment timing',
            '• Payment release depends on task status and disputes',
            '• SAYZO does not control task pricing',
            '',
            'SAYZO is not liable for payment disputes beyond platform rules.',
          ],
        },
        {
          title: '8. Disputes',
          body: [
            'If a dispute arises:',
            '• Task Doers must cooperate and provide accurate information',
            '• Decisions are based on platform policies and available evidence',
            '',
            'Repeated disputes, false claims, or misuse may result in:',
            '• Payment holds',
            '• Suspension',
            '• Permanent termination',
          ],
        },
        {
          title: '9. Off-Platform Transactions',
          body: [
            'Task Doers are strictly prohibited from:',
            '• Accepting payments outside the SAYZO platform',
            '• Moving communication off-platform to bypass SAYZO',
            '',
            'SAYZO provides no protection, dispute support, or payment assistance for off-platform dealings.',
            '',
            'Violations may result in immediate termination.',
          ],
        },
        {
          title: '10. Offline Tasks & Safety',
          body: [
            'For offline tasks:',
            '• SAYZO does not supervise or monitor on-ground activity',
            '• Task Doers perform tasks at their own risk',
            '',
            'Task Doers must follow SAYZO\'s Offline Safety Guidelines, which form part of these Terms.',
          ],
        },
        {
          title: '11. Ratings, Reviews & Conduct',
          body: [
            'Task Doers may receive ratings and reviews.',
            '',
            'Task Doers must not:',
            '• Manipulate ratings or reviews',
            '• Solicit fake feedback',
            '• Threaten users regarding ratings',
            '',
            'SAYZO may moderate or remove content at its discretion.',
          ],
        },
        {
          title: '12. No Warranties',
          body: [
            'SAYZO makes no warranties regarding:',
            '• Task availability',
            '• Earnings or income levels',
            '• Task frequency or continuity',
            '',
            'Use of the platform is at the Task Doer\'s own risk.',
          ],
        },
        {
          title: '13. Limitation of Liability',
          body: [
            'To the maximum extent permitted by law:',
            '• SAYZO shall not be liable for indirect or consequential damages',
            '• SAYZO\'s total liability shall not exceed Platform Fees earned from the Task Doer in the preceding six (6) months',
          ],
        },
        {
          title: '14. Indemnification',
          body: [
            'Task Doers agree to indemnify and hold harmless SAYZO from any claims, losses, damages, or liabilities arising from:',
            '• Their tasks or services',
            '• Their conduct or omissions',
            '• Their violation of law or these Terms',
          ],
        },
        {
          title: '15. Suspension & Termination',
          body: [
            'SAYZO may suspend or terminate Task Doer access for:',
            '• Policy violations',
            '• Fraud or misuse',
            '• Illegal or unsafe activity',
            '• Repeated disputes or complaints',
            '',
            'Termination may apply across accounts, devices, and payment methods.',
          ],
        },
        {
          title: '16. Governing Law & Dispute Resolution',
          body: [
            'These Terms are governed by the laws of India.',
            '',
            'Disputes shall be resolved through arbitration under the Arbitration & Conciliation Act, 1996:',
            '• Seat & venue: New Delhi',
            '• Language: English',
          ],
        },
        {
          title: '17. Acknowledgement',
          body: [
            'By accepting or performing a task on SAYZO, you acknowledge that:',
            '• You are an independent contractor',
            '• Identity verification does not constitute endorsement or guarantee',
            '• SAYZO does not control or supervise your work',
            '• You agree to these Task Doer Terms & Conditions',
          ],
        },
      ],
    },

    /* =============================
       TRUST, SAFETY & HOW IT WORKS
    ============================== */
    'trust-safety': {
      title: 'SAYZO – TRUST, SAFETY & HOW IT WORKS',
      steps: [
        {
          title: '1. What SAYZO Is (And Is Not)',
          body: [
            'SAYZO is a marketplace platform:',
            '• SAYZO connects Task Givers (who post tasks) with Task Doers (who perform tasks)',
            '• SAYZO does not provide services directly',
            '• SAYZO does not employ Task Doers',
            '• SAYZO does not supervise task execution',
            '',
            'All tasks, agreements, and outcomes are the responsibility of the users.',
          ],
        },
        {
          title: '2. Who Can Use SAYZO',
          body: [
            '• Anyone can browse SAYZO',
            '• Only verified users can post or accept tasks',
            '',
            'This is a non-negotiable rule to maintain trust and safety on the platform.',
          ],
        },
        {
          title: '3. Identity Verification (Mandatory)',
          body: [
            'Identity verification is mandatory to:',
            '• Post tasks as a Task Giver',
            '• Accept or perform tasks as a Task Doer',
            '• Receive payments or payouts',
            '• Participate in offline tasks',
            '• Participate in high-value or sensitive tasks',
            '',
            'Verification may require submission of valid government-issued identification such as:',
            '• Aadhaar',
            '• PAN',
            '• Passport',
            '• Driving License',
            '• Voter ID',
            '',
            'Important clarifications:',
            '• Unverified users cannot post or accept tasks',
            '• Government ID information:',
            '  - Is used only for verification, fraud prevention, and compliance',
            '  - Is never shown publicly',
            '  - Is never used for marketing',
            '',
            'SAYZO reserves the right to restrict, suspend, or permanently block access if identity verification fails or false information is provided.',
          ],
        },
        {
          title: '4. How SAYZO Works',
          body: [
            'For Task Givers:',
            '1. Complete identity verification',
            '2. Post a task with clear details and expectations',
            '3. Review interested Task Doers',
            '4. Confirm the task and make payment',
            '5. Funds are held securely until task completion or dispute resolution',
            '6. Release payment after completion',
            '',
            'For Task Doers:',
            '1. Complete identity verification',
            '2. Create a profile and list your skills',
            '3. Browse or receive matching tasks',
            '4. Accept tasks you can realistically complete',
            '5. Complete the task professionally',
            '6. Receive payment after confirmation',
          ],
        },
        {
          title: '5. Payments & Escrow (Important)',
          body: [
            '• Payments are collected before work begins',
            '• Funds may be held securely until:',
            '  - Task completion, or',
            '  - Dispute resolution',
            '• SAYZO charges a platform fee',
            '• Applicable GST is charged only on the platform fee',
            '',
            'What this means:',
            '• SAYZO does not own the task',
            '• SAYZO does not control service delivery',
            '• SAYZO facilitates payment flow and dispute handling only',
          ],
        },
        {
          title: '6. Disputes & Resolution',
          body: [
            'If a task does not go as expected:',
            '1. Users should first communicate via in-app chat',
            '2. If unresolved, a dispute can be raised on the platform',
            '3. SAYZO may review:',
            '   - Task details',
            '   - In-app communications',
            '   - Submitted evidence',
            '4. Refunds or payouts are decided case-by-case',
            '',
            'SAYZO\'s role is to facilitate resolution, not to guarantee outcomes.',
          ],
        },
        {
          title: '7. User Responsibilities',
          body: [
            'Task Givers must:',
            '• Post lawful, safe, and accurate tasks',
            '• Clearly define scope and timelines',
            '• Avoid misleading or illegal requests',
            '',
            'Task Doers must:',
            '• Accept only tasks they can complete',
            '• Perform work professionally and lawfully',
            '• Follow safety norms and platform rules',
            '',
            'Violations may result in suspension or permanent ban.',
          ],
        },
        {
          title: '8. What SAYZO Does Not Guarantee',
          body: [
            'SAYZO does not guarantee:',
            '• Task quality or completion',
            '• User conduct or behavior',
            '• Physical safety during offline tasks',
            '• Accuracy of user-provided information',
            '',
            'Users participate at their own risk.',
          ],
        },
        {
          title: '9. Off-Platform Transactions (Strong Warning)',
          body: [
            'For your protection:',
            '• Keep communication and payments within SAYZO',
            '• Off-platform transactions are discouraged',
            '',
            'If users move transactions outside SAYZO:',
            '• Platform protections may not apply',
            '• Disputes may not be supported',
            '• Accounts may be restricted or banned',
          ],
        },
        {
          title: '10. Ratings, Reviews & Enforcement',
          body: [
            '• Ratings and reviews can be submitted after task completion',
            '• Fake reviews, manipulation, or coercion are prohibited',
            '',
            'SAYZO may:',
            '• Remove content',
            '• Restrict tasks',
            '• Suspend or permanently ban users',
            '',
            'These actions may be taken with or without prior notice if required for safety or compliance.',
          ],
        },
        {
          title: '11. When SAYZO Steps In',
          body: [
            'SAYZO may intervene if:',
            '• A dispute is raised',
            '• Fraud or misuse is suspected',
            '• Platform rules are violated',
            '• Legal, safety, or compliance risks are identified',
            '',
            'SAYZO may remove tasks or restrict accounts to protect users and the platform.',
          ],
        },
        {
          title: '12. Support & Reporting',
          body: [
            'Contact SAYZO support if:',
            '• You face payment issues',
            '• A task goes wrong',
            '• You feel unsafe',
            '• You suspect fraud or misuse',
            '',
            'Email: support@sayzo.co.in',
          ],
        },
        {
          title: 'Final Note (Read This Carefully)',
          body: [
            'SAYZO is built to enable trust - not to replace personal judgment.',
            '',
            '• Verify details',
            '• Communicate clearly',
            '• Use platform protections',
            '• Follow the rules',
            '',
            'Identity verification is mandatory because trust is not optional in a real marketplace.',
          ],
        },
      ],
    },

    /* =============================
       TASK GIVER GUIDELINES
    ============================== */
    'tg-guidelines': {
      title: 'SAYZO – TASK GIVER GUIDELINES (READ FIRST)',
      steps: [
        {
          title: '1. Who A Task Giver Is',
          body: [
            'A Task Giver is a verified user who:',
            '• Posts a task on SAYZO',
            '• Engages an independent Task Doer to perform the task',
            '• Is not a client of SAYZO, but of the Task Doer',
            '',
            'SAYZO is a marketplace platform only. All task outcomes are between you and the Task Doer.',
          ],
        },
        {
          title: '2. Identity Verification Is Mandatory',
          body: [
            'You must complete identity verification to:',
            '• Post tasks',
            '• Assign tasks',
            '• Release payments',
            '',
            'If you are not verified:',
            '• You cannot post tasks',
            '• Platform protections may not apply',
            '',
            'Providing false, borrowed, or misleading identity information will result in a permanent ban.',
          ],
        },
        {
          title: '3. Post Tasks Clearly & Honestly',
          body: [
            'When posting a task, you must:',
            '• Clearly describe the scope of work',
            '• Mention timelines, location (if offline), and deliverables',
            '• Set realistic expectations and pricing',
            '',
            'You must NOT:',
            '• Post vague or misleading tasks',
            '• Hide requirements and reveal them later',
            '• Change scope after a Task Doer accepts without mutual agreement',
            '',
            'Misrepresentation is treated as platform abuse.',
          ],
        },
        {
          title: '4. Fair Pricing & Scope Control',
          body: [
            'You must:',
            '• Offer fair and reasonable compensation',
            '• Respect the agreed scope of work',
            '',
            'You must NOT:',
            '• Add unpaid work after acceptance',
            '• Threaten bad reviews to extract more work',
            '• Force renegotiation after work has started',
            '',
            'This behaviour is a common abuse pattern and will be penalized.',
          ],
        },
        {
          title: '5. Communication Rules',
          body: [
            '• Communicate only through SAYZO chat',
            '• Be professional, respectful, and responsive',
            '',
            'STRICTLY PROHIBITED:',
            '• Asking Task Doers to move communication off-platform',
            '• Requesting direct UPI, cash, or external payments',
            '• Sharing personal contact details to bypass SAYZO',
            '',
            'Violations may lead to immediate suspension.',
          ],
        },
        {
          title: '6. Payments & Escrow (Important)',
          body: [
            '• Payment is required before work starts',
            '• Funds may be held securely until:',
            '  - Task completion, or',
            '  - Dispute resolution',
            '',
            'You must:',
            '• Confirm completion honestly',
            '• Release payment after legitimate completion',
            '• Raise disputes only when there is a genuine issue',
            '',
            'You must NOT:',
            '• Delay confirmation to avoid payment',
            '• Abuse the dispute system',
            '• Initiate chargebacks without valid reasons',
          ],
        },
        {
          title: '7. Disputes & Refunds',
          body: [
            'If something goes wrong:',
            '• Raise a dispute through the platform',
            '• Provide clear and honest evidence',
            '• Cooperate during investigation',
            '',
            'Refunds (full or partial) are decided case-by-case.',
            '',
            'False disputes or repeated misuse may result in:',
            '• Refund denial',
            '• Account restrictions',
            '• Permanent ban',
          ],
        },
        {
          title: '8. Ratings, Reviews & Conduct',
          body: [
            'After task completion:',
            '• Leave honest, experience-based reviews',
            '',
            'You must NOT:',
            '• Leave false or retaliatory reviews',
            '• Threaten Task Doers with bad ratings',
            '• Offer incentives for fake reviews',
            '',
            'Review manipulation damages trust and will be penalized.',
          ],
        },
        {
          title: '9. Prohibited & Restricted Tasks',
          body: [
            'You must NOT post tasks that are:',
            '• Illegal, unsafe, or high-risk',
            '• Medical, legal, or financial advisory in nature',
            '• Hazardous, industrial, or regulated',
            '• Sexual, escort, or adult services',
            '• Involving children or minors',
            '• Political, gambling, or weapons-related',
            '',
            'SAYZO may remove any task at its discretion, even if a category is not explicitly listed.',
          ],
        },
        {
          title: '10. Off-Platform Transactions (Strong Warning)',
          body: [
            'For your own protection:',
            '• Keep all communication and payments on SAYZO',
            '',
            'If you move off-platform:',
            '• Platform protection may not apply',
            '• Disputes may not be supported',
            '• Refunds may be denied',
            '• Your account may be suspended or banned',
          ],
        },
        {
          title: '11. Account Actions & Enforcement',
          body: [
            'SAYZO may:',
            '• Remove tasks',
            '• Issue warnings',
            '• Suspend accounts',
            '• Permanently ban users',
            '',
            'Actions may be taken with or without prior notice to protect users and the platform.',
          ],
        },
        {
          title: '12. Final Notice (Read This)',
          body: [
            'SAYZO works only when both sides act responsibly.',
            '',
            'If you:',
            '• Post clear tasks',
            '• Pay fairly and on time',
            '• Respect Task Doers',
            '',
            'You will:',
            '• Get faster responses',
            '• Attract better Task Doers',
            '• Complete tasks smoothly',
            '',
            'If you attempt to exploit Task Doers or the system - you will lose access.',
          ],
        },
        {
          title: 'Acknowledgement',
          body: [
            'By posting a task on SAYZO, you confirm that you:',
            '• Have read these guidelines',
            '• Understand them',
            '• Agree to follow them',
          ],
        },
      ],
    },

    /* =============================
       TASK DOER GUIDELINES
    ============================== */
    'td-guidelines': {
      title: 'SAYZO – TASK DOER GUIDELINES (READ FIRST)',
      steps: [
        {
          title: '1. Who A Task Doer Is',
          body: [
            'A Task Doer is a verified user who:',
            '• Accepts tasks posted by Task Givers',
            '• Performs services independently',
            '• Is not an employee of SAYZO',
            '',
            'You are responsible for how you accept, perform, and complete tasks.',
          ],
        },
        {
          title: '2. Identity Verification Is Mandatory',
          body: [
            'You must complete identity verification to:',
            '• Receive tasks',
            '• Accept tasks',
            '• Get paid',
            '',
            'If your identity is not verified:',
            '• You cannot receive tasks',
            '• You cannot accept tasks',
            '• You cannot withdraw earnings',
            '',
            'Providing fake, misleading, or borrowed identity details will result in a permanent ban.',
          ],
        },
        {
          title: '3. Accept Tasks Responsibly',
          body: [
            'Before accepting a task:',
            '• Read the task description carefully',
            '• Understand scope, timeline, and expectations',
            '• Accept only tasks you can realistically complete',
            '',
            'Do NOT accept a task if:',
            '• You are unsure about requirements',
            '• You lack the required skills',
            '• You cannot meet the timeline',
            '',
            'Accepting a task and then abandoning it is a serious violation.',
          ],
        },
        {
          title: '4. Communication Rules',
          body: [
            '• Communicate only through SAYZO chat',
            '• Be professional, respectful, and clear',
            '• Do not harass, threaten, or abuse Task Givers',
            '• Do not spam or send irrelevant messages',
            '',
            'STRICTLY PROHIBITED:',
            '• Sharing phone numbers to move conversations off-platform',
            '• Asking for direct UPI/cash payments',
            '• Pressuring Task Givers to bypass SAYZO',
            '',
            'These actions can lead to immediate suspension.',
          ],
        },
        {
          title: '5. Task Execution Standards',
          body: [
            'While performing a task, you must:',
            '• Follow agreed scope and instructions',
            '• Work safely and lawfully',
            '• Respect the Task Giver\'s property, privacy, and time',
            '',
            'You must NOT:',
            '• Change pricing mid-task without agreement',
            '• Demand extra payment outside the platform',
            '• Perform illegal or unsafe activities',
            '',
            'You are fully responsible for how you perform the task.',
          ],
        },
        {
          title: '6. Payments & Earnings',
          body: [
            '• Payments are released only after task completion or dispute resolution',
            '',
            'SAYZO may hold or delay payouts if:',
            '• A dispute is raised',
            '• Fraud is suspected',
            '• Guidelines are violated',
            '',
            'Important:',
            '• SAYZO does not guarantee earnings',
            '• SAYZO does not pay wages or salaries',
            '• You are responsible for your own taxes, if applicable',
          ],
        },
        {
          title: '7. Ratings, Reviews & Performance',
          body: [
            'After task completion:',
            '• Task Givers can leave ratings and reviews',
            '• Reviews must reflect actual experience',
            '',
            'You must NOT:',
            '• Ask for fake or forced reviews',
            '• Offer incentives for positive ratings',
            '• Manipulate ratings in any way',
            '',
            'Repeated poor ratings or complaints may result in reduced visibility or removal.',
          ],
        },
        {
          title: '8. Off-Platform Transactions (Zero Tolerance)',
          body: [
            'You must not:',
            '• Accept payments outside SAYZO',
            '• Complete tasks without platform confirmation',
            '• Move transactions off-platform',
            '',
            'If you do:',
            '• SAYZO protection does not apply',
            '• Disputes may not be supported',
            '• Account may be permanently banned',
          ],
        },
        {
          title: '9. Prohibited Behavior (Non-Negotiable)',
          body: [
            'You will be permanently banned for:',
            '• Fraud, scams, or fake task completion',
            '• Harassment, threats, or coercion',
            '• Sexual misconduct or physical harm',
            '• Illegal activities (drugs, weapons, hacking, etc.)',
            '• Impersonation or identity misuse',
            '• Attempting to manipulate the platform',
            '',
            'There are no second chances for these violations.',
          ],
        },
        {
          title: '10. Disputes & Investigations',
          body: [
            'If a dispute is raised:',
            '• Cooperate honestly',
            '• Provide requested evidence',
            '• Respond within required timelines',
            '',
            'Failure to cooperate may result in:',
            '• Loss of payout',
            '• Account suspension',
            '• Permanent ban',
            '',
            'SAYZO\'s decision in disputes is final.',
          ],
        },
        {
          title: '11. Account Actions & Bans',
          body: [
            'SAYZO may:',
            '• Issue warnings',
            '• Temporarily suspend your account',
            '• Permanently ban your account',
            '',
            'Bans may apply across:',
            '• Your account',
            '• Linked devices',
            '• Payment methods',
            '',
            'Creating new accounts after a ban is prohibited.',
          ],
        },
        {
          title: '12. Final Warning (Read This)',
          body: [
            'SAYZO is built on trust and discipline.',
            '',
            'If you:',
            '• Deliver good work',
            '• Communicate honestly',
            '• Follow the rules',
            '',
            'You will:',
            '• Get more tasks',
            '• Build a strong reputation',
            '• Earn consistently',
            '',
            'If you try to game the system - you will be removed.',
          ],
        },
        {
          title: 'Acknowledgement',
          body: [
            'By accepting or performing tasks on SAYZO, you confirm that you:',
            '• Have read these guidelines',
            '• Understand them',
            '• Agree to follow them',
          ],
        },
      ],
    },

    /* =============================
       INDEPENDENT CONTRACTOR DECLARATION
    ============================== */
    'independent': {
      title: 'SAYZO – INDEPENDENT CONTRACTOR DECLARATION',
      steps: [
        {
          title: '1. Independent Contractor Status',
          body: [
            'I acknowledge and agree that:',
            '• I am an independent contractor',
            '• I am not an employee, agent, partner, or representative of SAYZO',
            '• No employment relationship exists between me and SAYZO',
            '',
            'Nothing in my use of the SAYZO platform creates:',
            '• Employer–employee relationship',
            '• Agency or partnership',
            '• Joint venture',
          ],
        },
        {
          title: '2. Control & Autonomy',
          body: [
            'I confirm that:',
            '• I am free to accept or reject any task',
            '• I control how, when, and where I perform tasks',
            '• SAYZO does not supervise, direct, or control my work',
            '• SAYZO does not require minimum working hours or task acceptance',
          ],
        },
        {
          title: '3. Tools, Expenses & Risk',
          body: [
            'I acknowledge that:',
            '• I provide my own tools, equipment, and resources',
            '• I bear all costs and expenses related to task performance',
            '• I assume all risks arising from task execution',
          ],
        },
        {
          title: '4. Taxes, Compliance & Insurance',
          body: [
            'I confirm that I am solely responsible for:',
            '• Income tax, GST, and statutory filings',
            '• Licenses or permits (if applicable)',
            '• Personal insurance, health insurance, or accident coverage',
            '',
            'SAYZO has no obligation to:',
            '• Deduct taxes',
            '• Provide insurance',
            '• Provide employment benefits',
          ],
        },
        {
          title: '5. No Exclusivity',
          body: [
            'I acknowledge that:',
            '• I may provide services to others, including competitors',
            '• SAYZO does not impose exclusivity or non-compete restrictions',
          ],
        },
        {
          title: '6. Waiver of Employment Claims',
          body: [
            'I expressly waive and release SAYZO from any claims related to:',
            '• Employment',
            '• Wages, overtime, or benefits',
            '• Provident Fund (PF), ESIC, gratuity',
            '• Workers\' compensation or employment insurance',
          ],
        },
        {
          title: '7. Binding Effect',
          body: [
            'This Declaration is binding upon me from the moment I accept or perform any task on the SAYZO platform, whether electronically or otherwise.',
          ],
        },
        {
          title: '8. Governing Law',
          body: [
            'This Declaration shall be governed by the laws of India.',
            '',
            'Any disputes shall be resolved in accordance with SAYZO\'s arbitration provisions.',
          ],
        },
        {
          title: '9. Acknowledgement',
          body: [
            'By continuing to use SAYZO as a Task Doer, I confirm that:',
            '• I have read and understood this Declaration',
            '• I voluntarily agree to its terms',
          ],
        },
      ],
    },

    /* =============================
       INTERMEDIARY STATUS DECLARATION
    ============================== */
    'intermediary': {
      title: 'SAYZO – INTERMEDIARY STATUS DECLARATION',
      steps: [
        {
          title: '1. Intermediary Status',
          body: [
            'SAYZO is a technology intermediary platform within the meaning of Section 2(1)(w) of the Information Technology Act, 2000.',
            '',
            'SAYZO:',
            '• Provides a digital platform that enables users to connect, communicate, and transact',
            '• Does not initiate, create, select, modify, or control user-generated content',
            '• Does not provide, endorse, guarantee, or deliver services offered by users',
            '',
            'All tasks, content, communications, and transactions are generated and conducted solely by users.',
          ],
        },
        {
          title: '2. Limited Role of SAYZO',
          body: [
            'SAYZO\'s role is strictly limited to:',
            '• Facilitating task discovery and user connections',
            '• Providing communication tools',
            '• Facilitating payments and escrow through third-party gateways',
            '• Facilitating dispute handling in accordance with platform policies',
            '',
            'SAYZO does not:',
            '• Supervise or monitor task execution',
            '• Direct how, when, or where tasks are performed',
            '• Control pricing, outcomes, or quality of services',
            '',
            'Any enforcement actions taken by SAYZO are for policy compliance and legal obligations only and do not amount to control or participation.',
          ],
        },
        {
          title: '3. User Responsibility',
          body: [
            'Users are solely responsible for:',
            '• Tasks posted or accepted',
            '• Content shared or communicated',
            '• Compliance with applicable laws',
            '• Their conduct, actions, and omissions',
            '',
            'SAYZO shall not be liable for:',
            '• User-generated content',
            '• Task outcomes, quality, or performance',
            '• Losses or damages arising from user interactions',
          ],
        },
        {
          title: '4. Identity Verification (No Endorsement)',
          body: [
            'SAYZO may conduct identity verification using government-issued identification documents solely for the purposes of:',
            '• User authentication',
            '• Fraud prevention',
            '• Regulatory compliance',
            '• Platform integrity',
            '',
            'Such identity verification:',
            '• Confirms only the identity of the user',
            '• Does not constitute endorsement, certification, recommendation, or approval by SAYZO',
            '• Does not guarantee:',
            '  - Skills or qualifications',
            '  - Professional competence',
            '  - Conduct or behaviour',
            '  - Safety, reliability, or trustworthiness',
            '  - Task completion, service quality, or outcomes',
            '',
            'SAYZO does not assess, verify, or guarantee the capability, intent, or performance of any user.',
          ],
        },
        {
          title: '5. Safe Harbour Protection',
          body: [
            'In accordance with Section 79 of the Information Technology Act, 2000, SAYZO claims safe harbour protection as an intermediary and shall not be liable for any third-party information, data, or communication made available or hosted on the platform, provided that SAYZO observes due diligence as required under applicable law.',
          ],
        },
        {
          title: '6. Content Moderation & Takedown',
          body: [
            'SAYZO may:',
            '• Act upon actual knowledge of unlawful content',
            '• Remove or disable access to content or tasks upon receiving:',
            '  - User complaints',
            '  - Legal notices',
            '  - Court or government orders',
            '',
            'SAYZO is not obligated to proactively monitor content and acts in accordance with applicable law and its Content Moderation & Notice-and-Takedown Policy.',
          ],
        },
        {
          title: '7. Prohibited Use',
          body: [
            'Users shall not use the platform to:',
            '• Post illegal, unlawful, or prohibited content',
            '• Engage in fraudulent, abusive, or harmful conduct',
            '• Violate applicable laws or regulations',
            '',
            'Violations may result in content removal, account suspension, or termination.',
          ],
        },
        {
          title: '8. No Endorsement or Guarantee',
          body: [
            'SAYZO does not endorse, recommend, certify, or guarantee:',
            '• Any user',
            '• Any task',
            '• Any service quality or outcome',
            '',
            'User interactions and transactions are undertaken entirely at the users\' own risk.',
          ],
        },
        {
          title: '9. Limitation of Liability',
          body: [
            'To the maximum extent permitted by law:',
            '• SAYZO shall not be liable for user-generated content',
            '• SAYZO shall not be liable for damages arising from user interactions or transactions',
            '',
            'This Declaration operates in addition to the limitation of liability provisions set out in SAYZO\'s Terms & Conditions.',
          ],
        },
        {
          title: '10. Governing Law & Dispute Resolution',
          body: [
            'This Declaration shall be governed by the laws of India.',
            '',
            'Any disputes shall be resolved in accordance with the arbitration and dispute resolution provisions contained in SAYZO\'s Terms & Conditions.',
          ],
        },
        {
          title: '11. Acknowledgement',
          body: [
            'By accessing or using the SAYZO platform, users acknowledge that:',
            '• SAYZO acts solely as a technology intermediary',
            '• SAYZO does not provide services or control task execution',
            '• Identity verification does not constitute endorsement or guarantee',
            '• All interactions are undertaken at the user\'s own risk',
          ],
        },
      ],
    },

    /* =============================
       GRIEVANCE REDRESSAL POLICY
    ============================== */
    'grievance': {
      title: 'SAYZO – GRIEVANCE REDRESSAL POLICY & SOP',
      steps: [
        {
          title: '1. Purpose',
          body: [
            'This Policy establishes a transparent and time-bound mechanism for users to raise grievances related to the SAYZO platform and outlines the process for acknowledgment, review, and resolution.',
            '',
            'This Policy is issued in compliance with the Consumer Protection Act, 2019 and the Consumer Protection (E-Commerce) Rules, 2020.',
          ],
        },
        {
          title: '2. Role of SAYZO',
          body: [
            'SAYZO is a technology intermediary:',
            '• SAYZO does not provide services',
            '• SAYZO does not control or supervise task execution',
            '• SAYZO facilitates grievance handling and policy enforcement',
            '',
            'Grievances are addressed strictly in accordance with platform policies and applicable law.',
          ],
        },
        {
          title: '3. Grievance Officer Details',
          body: [
            'Name: Ayan Srivastav',
            'Designation: Grievance Officer',
            'Email: grievance@sayzo.com',
            '',
            'Address:',
            'DPT 808B, F-79&80, DLF Prime Tower,',
            'Okhla Phase-1, New Delhi – 110020, India',
          ],
        },
        {
          title: '4. Who Can Raise a Grievance',
          body: [
            'Grievances may be raised by:',
            '• Registered users (Task Givers or Task Doers)',
            '• Consumers as defined under applicable law',
            '',
            'Anonymous grievances may not be entertained.',
          ],
        },
        {
          title: '5. How to Raise a Grievance',
          body: [
            'Grievances may be submitted via:',
            '• Email to the Grievance Officer',
            '• In-app grievance or support feature (if available)',
            '',
            'Each grievance should include:',
            '• User identification details',
            '• Description of the issue',
            '• Relevant task or transaction reference',
            '• Supporting documents or evidence (if any)',
          ],
        },
        {
          title: '6. Acknowledgement & Resolution Timelines',
          body: [
            '• Acknowledgement: Within 24 hours of receipt',
            '• Resolution: Within 15 business days from acknowledgement',
            '',
            'Timelines may be extended where:',
            '• Additional information is required',
            '• The grievance involves third-party systems or regulatory authorities',
            '',
            'Users will be informed of any such extensions.',
          ],
        },
        {
          title: '7. Grievance Review Process',
          body: [
            'Upon receipt of a grievance:',
            '1. The grievance is logged and reviewed',
            '2. Relevant records and evidence are examined',
            '3. Parties may be contacted for clarification',
            '4. A resolution is determined based on:',
            '   - SAYZO\'s policies',
            '   - Available evidence',
            '   - Applicable law',
            '',
            'SAYZO\'s role is limited to facilitation and enforcement of platform rules.',
          ],
        },
        {
          title: '8. Limitations',
          body: [
            'SAYZO will not entertain grievances relating to:',
            '• Off-platform transactions',
            '• Matters outside SAYZO\'s reasonable control',
            '• Issues already adjudicated by courts or tribunals',
            '',
            'This Policy does not override arbitration or legal remedies available under law.',
          ],
        },
        {
          title: '9. False, Frivolous or Abusive Complaints',
          body: [
            'Grievances that are false, malicious, repetitive, or abusive may result in:',
            '• Closure of the grievance',
            '• Account restrictions',
            '• Suspension or termination of access',
          ],
        },
        {
          title: '10. Record Maintenance',
          body: [
            'SAYZO may maintain records of grievances and resolutions for:',
            '• Regulatory compliance',
            '• Audit purposes',
            '• Internal monitoring and improvement',
          ],
        },
        {
          title: '11. Changes to Policy',
          body: [
            'SAYZO may modify this Policy from time to time.',
            '',
            'Continued use of the platform constitutes acceptance of the updated Policy.',
          ],
        },
        {
          title: '12. Escalation & Legal Remedies',
          body: [
            'If a user is not satisfied with the resolution provided:',
            '• The user may pursue remedies available under applicable law, including arbitration as specified in SAYZO\'s Terms & Conditions',
            '',
            'This grievance mechanism does not limit or waive any legal rights available to users under applicable law.',
          ],
        },
      ],
    },
    'tg-usecases': {
      title: '20 Knowledge-Based Task Giver Use Cases for SAYZO',
      steps: [
        {
          title: '1) Local Restaurant Owner',
          body: [
            'Needs someone in 5mins to:',
            '• Audit their Zomato menu pricing',
            '• Fix bad item descriptions',
            '• Recommend best-selling combos',
            '',
            'Task: "Optimize my Zomato menu for higher order"'
          ],
        },
        {
          title: '2) New D2C Founder',
          body: [
            'Needs someone to:',
            '• Write 10 high-conversion product descriptions',
            '• In their niche',
            '• Within 60 minutes',
            '',
            'Task: "Write descriptions that reduce"'
          ],
        },
        {
          title: '3) Real Estate Broker',
          body: [
            'Needs:',
            '• Quick property listing write-up',
            '• With legal-safe wording',
            '• And good sales framing',
            '',
            'Task: "Rewrite this listing to sell"'
          ],
        },
        {
          title: '4) Café Owner',
          body: [
            'Needs:',
            '• Instagram content plan for next 7 days',
            '• Based on footfall timings',
            '',
            'Task: "Make me a posting plan that drives evening"'
          ],
        },
        {
          title: '5) Local Gym Owner',
          body: [
            'Needs:',
            '• WhatsApp sales script for trial conversions',
            '• Not generic — specific to his gym',
            '',
            'Task: "Write a closing script for my"'
          ],
        },
        {
          title: '6) Boutique Clothing Store',
          body: [
            'Needs:',
            '• Trend analysis for next 2 weeks',
            '• Based on local demand',
            '',
            'Task: "Tell me what styles will sell in my"'
          ],
        },
        {
          title: '7) Kirana Store Upgrading to Online',
          body: [
            'Needs:',
            '• Help setting up catalog',
            '• Naming products properly',
            '• Structuring categories',
            '',
            'Task: "Organize my store"'
          ],
        },
        {
          title: '8) Coaching Center Owner',
          body: [
            'Needs:',
            '• Google review responses written',
            '• Professional but local tone',
            '',
            'Task: "Reply to these 15"'
          ],
        },
        {
          title: '9) Freelancer Designer',
          body: [
            'Needs:',
            '• Quick proposal template',
            '• That wins clients',
            '',
            'Task: "Write a winning client"'
          ],
        },
        {
          title: '10) Doctor Clinic',
          body: [
            'Needs:',
            '• Simple patient FAQ content',
            '• For reception desk',
            '',
            'Task: "Write 10 FAQs patients ask"'
          ],
        },
        {
          title: '11) Small Manufacturer',
          body: [
            'Needs:',
            '• Price breakdown for B2B quotation',
            '• Professionally structured',
            '',
            'Task: "Format my quote in a proper business"'
          ],
        },
        {
          title: '12) Wedding Photographer',
          body: [
            'Needs:',
            '• Instagram caption for 10 photos',
            '• In romantic, premium style',
            '',
            'Task: "Write 10 captions that sell my"'
          ],
        },
        {
          title: '13) School Teacher',
          body: [
            'Needs:',
            '• Lesson plan for tomorrow',
            '• For Class 8 Science',
            '',
            'Task: "Make a 1-hour teaching"'
          ],
        },
        {
          title: '14) Salon Owner',
          body: [
            'Needs:',
            '• Offers wording for festival promotion',
            '• That sounds premium, not cheap',
            '',
            'Task: "Write my Diwali offer"'
          ],
        },
        {
          title: '15) Local Politician / NGO',
          body: [
            'Needs:',
            '• Speech for community meeting',
            '• Simple, persuasive, local language',
            '',
            'Task: "Write a 3-minute"'
          ],
        },
        {
          title: '16) Startup Founder (You)',
          body: [
            'Needs:',
            '• Pitch email rewritten',
            '• More direct, less fluff',
            '',
            'Task: "Fix my investor"'
          ],
        },
        {
          title: '17) Retail Shop Owner',
          body: [
            'Needs:',
            '• Staff training script',
            '• For handling angry customers',
            '',
            'Task: "Write conflict resolution"'
          ],
        },
        {
          title: '18) YouTube Creator',
          body: [
            'Needs:',
            '• Video script outline',
            '• 8 minutes, hook + retention',
            '',
            'Task: "Structure my video"'
          ],
        },
        {
          title: '19) Home Baker',
          body: [
            'Needs:',
            '• Pricing strategy',
            '• Based on ingredient cost + margin',
            '',
            'Task: "Help me price my"'
          ],
        },
        {
          title: '20 Small Importer',
          body: [
            'Needs:',
            '• Email to supplier',
            '• Negotiating better rates',
            '',
            'Task: "Write a negotiation"'
          ],
        },
      ],
    }
    
  },
},

  

};