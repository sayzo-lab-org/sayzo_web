// export const categories = {
//   "Personal Growth": [
//     "Career Counseling",
//     "Career Coaching",
//     "Life Coaching",
//     "Online Tutoring",
//     "Language Lessons",
//     "Language Learning",
//     "AI & GenAI Lessons",
//     "Skill Tutoring",
//     "Fitness Coaching",
//     "Fitness & Wellness",
//     "Nutrition Coaching",
//     "Wellness Coaching",
//     "Mindfulness Coaching",
//     "Mindfulness",
//     "Fashion & Styling Advice",
//     "Game Coaching",
//     "Travel Advice",
//     "Astrology & Psychic Services",
//     "Arts & Crafts",
//     "Hobby Coaching",
//     "Personal Mentorship"
//   ],

//   "Consulting": [
//     "HR Consulting",
//     "AI Consulting",
//     "E-commerce Consulting",
//     "Marketing Strategy",
//     "Content Strategy",
//     "Social Media Strategy",
//     "Influencer Strategy",
//     "Video Marketing Consulting",
//     "SEM Strategy",
//     "PR Strategy",
//     "Data Analytics Consulting",
//     "Database Consulting",
//     "Data Visualization Consulting",
//     "AI Technology Consulting",
//     "Website Consulting",
//     "App Consulting",
//     "Software Consulting",
//     "Mentorship"
//   ],

//   "Data": [
//     "Machine Learning",
//     "Computer Vision",
//     "NLP",
//     "Deep Learning",
//     "Generative Models",
//     "Time Series Analysis",
//     "Data Analytics",
//     "Data Science",
//     "Data Visualization",
//     "Dashboards",
//     "Data Tagging & Annotation",
//     "Data Entry",
//     "Data Typing",
//     "Data Scraping",
//     "Data Formatting",
//     "Data Cleaning",
//     "Data Enrichment",
//     "Data Processing",
//     "Data Governance",
//     "Databases",
//     "Data Engineering"
//   ],

//   "Photography": [
//     "Product Photography",
//     "Food Photography",
//     "Lifestyle Photography",
//     "Fashion Photography",
//     "Portrait Photography",
//     "Event Photography",
//     "Real Estate Photography",
//     "Scenic Photography",
//     "Drone Photography",
//     "Local Photography",
//     "Photography Classes",
//     "Photo Preset Creation",
//     "Editing & Retouching",
//     "Corporate Photography"
//   ],

//   "Graphics & Design": [
//     "Logo & Branding",
//     "Web & App Design",
//     "UI/UX Design",
//     "Illustration",
//     "Image Editing",
//     "Print & Packaging",
//     "Presentation Design",
//     "3D Design",
//     "Fashion & Merchandise Design"
//   ],

//   "Programming & Tech": [
//     "Website Development",
//     "E-Commerce Development",
//     "App Development",
//     "Software Development",
//     "AI Development",
//     "Automation",
//     "Chatbots",
//     "Cloud & DevOps",
//     "Cybersecurity",
//     "Blockchain",
//     "Game Development"
//   ],

//   "Digital Marketing": [
//     "SEO",
//     "GEO",
//     "Social Media Marketing",
//     "Paid Advertising",
//     "Content Marketing",
//     "Email Marketing",
//     "Influencer Marketing",
//     "Marketing Automation",
//     "CRO",
//     "Affiliate Marketing"
//   ],

//   "Video & Animation": [
//     "Video Editing",
//     "Motion Graphics",
//     "Explainer Videos",
//     "Animation",
//     "Product Videos",
//     "Corporate Videos",
//     "UGC Videos",
//     "AI Video"
//   ],

//   "Writing & Translation": [
//     "Content Writing",
//     "Copywriting",
//     "SEO Writing",
//     "Script Writing",
//     "Business Writing",
//     "Resume Writing",
//     "Proofreading & Editing",
//     "Translation",
//     "Transcription",
//     "Documentation"
//   ],

//   "Music & Audio": [
//     "Music Production",
//     "Voice Over",
//     "Audio Editing",
//     "Podcast Production",
//     "Sound Design"
//   ],

//   "Business": [
//     "Business Registration",
//     "Business Consulting",
//     "Market Research",
//     "Virtual Assistance",
//     "Project Management",
//     "Sales & Lead Generation"
//   ],

//   "Finance": [
//     "Accounting",
//     "Bookkeeping",
//     "Tax Services",
//     "Financial Planning",
//     "Fundraising Support"
//   ],

//   "AI Services": [
//     "AI Websites",
//     "AI Apps",
//     "AI Chatbots",
//     "AI Agents",
//     "AI Automation",
//     "AI Consulting"
//   ],

//   "Ask Doubts": [
//     "Business Consulting",
//     "Marketing Consulting",
//     "Tech Consulting",
//     "AI Consulting",
//     "Legal Consulting",
//     "HR Consulting",
//     "Data Consulting",
//     "Mentorship",
//     "Architects",
//     "Interior Designers",
//     "Civil Engineers",
//     "Structural Consultants",
//     "Landscape Designers",
//     "Lawyers",
//     "Contract Drafting",
//     "Startup Compliance",
//     "IP & Trademark",
//     "Corporate Legal Advisory",
//     "Teacher",
//     "Supply Chain Consulting",
//     "School Consultants",
//     "Corporate Education",
//     "Study Abroad Consulting",
//     "Cybersecurity Consulting",
//     "Vastu Consultants",
//     "Youtube Growth",
//     "Social Media"
//   ],

//   "Local Services": [
//     "Home Services",
//     "Repair & Maintenance",
//     "Cleaning Services",
//     "Event Services",
//     "Field Sales",
//     "Beauty & Grooming"
//   ],

//   "Events & Experiences": [
//     "Event Planning",
//     "Corporate Events",
//     "Wedding Professionals",
//     "Exhibitions & Trade Shows",
//     "Brand Activations"
//   ],

//   "Execution & Management": [
//     "Personal Errands",
//     "Relocation Assistance",
//     "Property Scouting",
//     "Vendor Coordination",
//     "Local Research",
//     "Setup & Onboarding",
//     "Personal Assistant (Remote)",
//     "Personal Assistant (On-ground)",
//     "Task Coordination",
//     "Travel Setup & Planning",
//     "Courier drop / pickup",
//     "Queue waiting",
//     "Shifting light furniture (chairs, tables)",
//     "Help during relocation (manual only)"
//   ],

//   "Assembly & Setup (Basic)": [
//     "Furniture assembly (IKEA-type)",
//     "Shelf installation (basic)",
//     "Device unboxing & setup",
//     "Curtain rods / simple fittings"
//   ],

//   "Tech Help (Non-Professional)": [
//     "Mobile setup",
//     "Laptop setup",
//     "App installation",
//     "Email & account setup",
//     "Online form filling",
//     "Basic troubleshooting"
//   ]
// };

// SAYZO Category Data Structure
// Task-first, skill-agnostic, outcome-driven marketplace


// Generate slug from name
const toSlug = (name) => 
  name.toLowerCase().replace(/[&\s]+/g, '-').replace(/[^a-z0-9-]/g, '');

// ============================================================
// PART 1: Personal Growth, Consulting, Data, Photography
// ============================================================

export const categories = [
  {
    name: "Personal Growth",
    slug: "personal-growth",
    description: "Transform lives through coaching, tutoring, and mentorship. Help people reach their potential.",
    icon: "Sparkles",
    color: "from-violet-500 to-purple-600",
    subCategories: [
      {
        name: "Career Counseling",
        slug: "career-counseling",
        description: "Help people navigate career transitions, find their path, and make informed decisions.",
        realTaskStatements: [
          "I'm stuck in my job and don't know what to do next",
          "Need help switching from engineering to product management",
          "Should I take this job offer or wait for better?",
          "Help me figure out my career path after MBA",
          "I'm 35 and want to change my entire career - where do I start?",
          "Need guidance on negotiating my salary for a new role"
        ],
        coreSkills: ["Career Assessment", "Resume Review", "Interview Coaching", "Industry Knowledge", "Career Transition Planning"],
        supportingSkills: ["Psychology Background", "HR Experience", "Recruitment Knowledge", "Communication Skills", "Empathy & Listening"],
        howYouEarn: [
          "Per session counseling (₹500-2000/session)",
          "Career roadmap creation (₹3000-8000)",
          "Resume + LinkedIn optimization package (₹2000-5000)",
          "Interview preparation series (₹5000-15000)",
          "Long-term mentorship (monthly retainer)"
        ],
        taskExamples: [
          { title: "Career transition guidance - Tech to Product", description: "I'm a software engineer with 5 years experience. Want to move into product management. Need a clear roadmap.", budgetRange: "₹3,000 - ₹5,000", duration: "2-3 sessions", skillTags: ["Career Counseling", "Product Management", "Tech Background"] },
          { title: "MBA application strategy session", description: "Help me decide between MBA programs and create application strategy.", budgetRange: "₹2,000 - ₹4,000", duration: "1-2 sessions", skillTags: ["MBA Guidance", "Application Strategy"] },
          { title: "First job guidance for fresh graduate", description: "Just graduated. Confused between startup vs corporate. Need help understanding my options.", budgetRange: "₹500 - ₹1,500", duration: "1 session", skillTags: ["Entry Level", "Career Guidance"] }
        ]
      },
      {
        name: "Life Coaching",
        slug: "life-coaching",
        description: "Guide people through personal challenges, goal-setting, and life transformations.",
        realTaskStatements: [
          "I feel lost and don't know what I want from life",
          "Need help building better habits and discipline",
          "Going through a divorce and need support to rebuild",
          "Want to overcome procrastination and achieve my goals",
          "Help me find work-life balance",
          "I need accountability to stick to my resolutions"
        ],
        coreSkills: ["Goal Setting Frameworks", "Accountability Coaching", "Habit Formation", "Motivational Techniques", "Life Planning"],
        supportingSkills: ["Psychology Knowledge", "Mindfulness Training", "Communication Skills", "Empathy", "Active Listening"],
        howYouEarn: [
          "Weekly coaching sessions (₹1500-4000/session)",
          "30-day transformation programs (₹15000-40000)",
          "Goal-setting workshops (₹2000-5000)",
          "Accountability partner (₹5000-10000/month)",
          "Emergency support sessions (₹1000-2500)"
        ],
        taskExamples: [
          { title: "30-day discipline bootcamp", description: "I want to wake up at 5am, exercise daily, and build a reading habit. Need daily accountability.", budgetRange: "₹8,000 - ₹15,000", duration: "30 days", skillTags: ["Habit Formation", "Accountability"] },
          { title: "Post-breakup life restructuring", description: "Going through a tough breakup. Need help rebuilding my social life and confidence.", budgetRange: "₹5,000 - ₹10,000", duration: "4-6 sessions", skillTags: ["Life Coaching", "Emotional Support"] },
          { title: "Quarter-life crisis navigation", description: "I'm 27, feel like I've achieved nothing. Need clarity on what success means to me.", budgetRange: "₹3,000 - ₹6,000", duration: "2-3 sessions", skillTags: ["Life Purpose", "Self-Discovery"] }
        ]
      },
      {
        name: "Online Tutoring",
        slug: "online-tutoring",
        description: "Share academic knowledge and help students excel in their studies.",
        realTaskStatements: [
          "My son is failing math - need urgent help",
          "Preparing for JEE and need physics concepts cleared",
          "Help my daughter with CBSE Class 12 Chemistry",
          "I'm an adult learning calculus for the first time",
          "Need someone to explain coding concepts to my 10-year-old",
          "Help me prepare for UPSC prelims - need history guidance"
        ],
        coreSkills: ["Subject Expertise", "Curriculum Knowledge", "Exam Preparation", "Concept Simplification", "Student Assessment"],
        supportingSkills: ["Patience", "Communication", "Technology Skills", "Interactive Teaching", "Progress Tracking"],
        howYouEarn: [
          "Per hour tutoring (₹300-1500/hour)",
          "Crash courses before exams (₹3000-10000)",
          "Regular weekly sessions (₹4000-15000/month)",
          "Doubt clearing sessions (₹200-500/session)",
          "Assignment help (₹500-2000/assignment)"
        ],
        taskExamples: [
          { title: "JEE Physics - Mechanics crash course", description: "Exam in 2 months. Need intensive sessions on mechanics. Currently scoring 40%.", budgetRange: "₹8,000 - ₹15,000", duration: "8 weeks", skillTags: ["JEE", "Physics", "Exam Prep"] },
          { title: "Class 6 Math foundations", description: "My daughter is weak in math basics. Need patient tutor to build strong foundation.", budgetRange: "₹4,000 - ₹6,000/month", duration: "Ongoing", skillTags: ["Primary Math", "CBSE"] },
          { title: "Python programming for kid", description: "Want to teach my 12-year-old son basic programming. Make it fun and project-based.", budgetRange: "₹3,000 - ₹5,000", duration: "4 weeks", skillTags: ["Python", "Kids Coding"] }
        ]
      },
      {
        name: "Language Lessons",
        slug: "language-lessons",
        description: "Help people learn new languages or improve their communication skills.",
        realTaskStatements: [
          "I need to learn conversational Japanese for my job",
          "Help me improve my English accent for interviews",
          "Want to learn Spanish before my Europe trip",
          "Need to pass IELTS with 7+ band",
          "My English grammar is weak - need focused help",
          "Want to learn French for Canada immigration"
        ],
        coreSkills: ["Native/Fluent Speaking", "Grammar Expertise", "Pronunciation Training", "Conversation Practice", "Exam Preparation"],
        supportingSkills: ["Cultural Knowledge", "Patience", "Interactive Methods", "Resource Creation", "Progress Assessment"],
        howYouEarn: [
          "Conversation practice sessions (₹300-800/hour)",
          "IELTS/TOEFL prep (₹10000-30000)",
          "Business language training (₹8000-20000)",
          "Accent neutralization (₹5000-15000)",
          "Kids language classes (₹3000-8000/month)"
        ],
        taskExamples: [
          { title: "IELTS Speaking prep - Need 7+", description: "Exam in 6 weeks. Current mock score is 6. Need intensive speaking practice.", budgetRange: "₹8,000 - ₹12,000", duration: "6 weeks", skillTags: ["IELTS", "Speaking", "Exam Prep"] },
          { title: "Japanese for business - N4 level", description: "Starting job at Japanese company. Need conversational level in 3 months.", budgetRange: "₹15,000 - ₹25,000", duration: "3 months", skillTags: ["Japanese", "Business", "JLPT"] },
          { title: "English pronunciation coaching", description: "I speak English well but have strong regional accent. Need neutral pronunciation.", budgetRange: "₹5,000 - ₹8,000", duration: "4-6 weeks", skillTags: ["Pronunciation", "Accent"] }
        ]
      },
      {
        name: "AI & GenAI Lessons",
        slug: "ai-genai-lessons",
        description: "Learn artificial intelligence, machine learning, and generative AI tools from industry practitioners.",
        realTaskStatements: [
          "Teach me how to use ChatGPT effectively for my business",
          "I want to learn prompt engineering from basics",
          "Help me understand how to build AI agents",
          "Need training on Midjourney for my design work",
          "I want to learn machine learning with Python",
          "Teach me how to fine-tune LLMs for custom use cases"
        ],
        coreSkills: ["AI/ML Knowledge", "Prompt Engineering", "Python", "GenAI Tools", "LLM Understanding"],
        supportingSkills: ["Data Science", "API Integration", "Cloud Platforms", "Teaching", "Project-Based Learning"],
        howYouEarn: [
          "Per hour AI tutoring (₹1000-3000/hour)",
          "Complete AI courses (₹5000-20000)",
          "Tool-specific training (₹2000-8000)",
          "Custom project guidance (₹10000-30000)",
          "Corporate AI training (₹25000-100000)"
        ],
        taskExamples: [
          { title: "ChatGPT for business training", description: "Train my team on effective AI usage for marketing and operations.", budgetRange: "₹5,000 - ₹15,000", duration: "3 sessions", skillTags: ["ChatGPT", "Business AI"] },
          { title: "Prompt engineering course", description: "Want to master prompts for various AI tools from beginner level.", budgetRange: "₹8,000 - ₹15,000", duration: "1 month", skillTags: ["Prompt Engineering", "AI Tools"] },
          { title: "Build AI agents tutorial", description: "Hands-on course to build custom AI agents for automation.", budgetRange: "₹15,000 - ₹30,000", duration: "2 months", skillTags: ["AI Agents", "Automation"] }
        ]
      },
      {
        name: "Fitness Coaching",
        slug: "fitness-coaching",
        description: "Help people transform their bodies and build sustainable fitness habits.",
        realTaskStatements: [
          "I want to lose 15kg but don't know where to start",
          "Need a workout plan I can do at home with no equipment",
          "Training for my first marathon - need a coach",
          "Post-pregnancy fitness - help me get back in shape safely",
          "I'm skinny and want to build muscle mass",
          "Need help with my posture and back pain through exercise"
        ],
        coreSkills: ["Workout Programming", "Form Correction", "Progress Tracking", "Injury Prevention", "Motivation & Accountability"],
        supportingSkills: ["Nutrition Knowledge", "Anatomy Understanding", "Sports Psychology", "First Aid", "Video Analysis"],
        howYouEarn: [
          "Custom workout plans (₹2000-8000)",
          "Weekly coaching with form checks (₹4000-10000/month)",
          "1-on-1 virtual training sessions (₹500-1500/session)",
          "Transformation programs 8-12 weeks (₹15000-40000)",
          "Marathon/event preparation (₹10000-25000)"
        ],
        taskExamples: [
          { title: "Home workout plan for busy professional", description: "I work 12 hour days, have 30 mins max. Need effective home workout with no equipment.", budgetRange: "₹2,000 - ₹4,000", duration: "Plan + 2 weeks follow-up", skillTags: ["Home Workouts", "Time-Efficient"] },
          { title: "Wedding transformation - 3 months", description: "Getting married in 3 months. Want to lose weight and tone up.", budgetRange: "₹15,000 - ₹25,000", duration: "12 weeks", skillTags: ["Weight Loss", "Transformation"] },
          { title: "Strength training for beginners", description: "Never lifted weights before. Want to start safely. Virtual coaching preferred.", budgetRange: "₹5,000 - ₹8,000", duration: "4 weeks", skillTags: ["Strength Training", "Beginner"] }
        ]
      },
      {
        name: "Nutrition Coaching",
        slug: "nutrition-coaching",
        description: "Create personalized diet plans and guide healthy eating habits.",
        realTaskStatements: [
          "I'm diabetic and confused about what to eat",
          "Need a diet plan for muscle gain without supplements",
          "Post-pregnancy weight loss diet for breastfeeding mom",
          "My cholesterol is high - need diet intervention",
          "Want to go vegetarian but maintain protein intake",
          "Need help with PCOS-friendly diet plan"
        ],
        coreSkills: ["Nutritional Science", "Meal Planning", "Condition-Specific Diets", "Macro Calculation", "Food Substitution"],
        supportingSkills: ["Cooking Knowledge", "Local Food Knowledge", "Behavior Change", "Medical Nutrition", "Sports Nutrition"],
        howYouEarn: [
          "Custom diet plans (₹2000-6000)",
          "Weekly nutrition coaching (₹4000-10000/month)",
          "Medical condition diet plans (₹5000-12000)",
          "Sports nutrition programs (₹8000-20000)",
          "Family meal planning (₹3000-8000)"
        ],
        taskExamples: [
          { title: "PCOS-friendly diet plan", description: "Diagnosed with PCOS. Need Indian vegetarian diet that helps manage symptoms.", budgetRange: "₹3,000 - ₹5,000", duration: "4-week plan", skillTags: ["PCOS", "Vegetarian", "Weight Loss"] },
          { title: "Budget-friendly muscle gain diet", description: "College student with limited budget. Need high-protein Indian diet.", budgetRange: "₹1,500 - ₹3,000", duration: "Monthly plan", skillTags: ["Muscle Gain", "Budget Diet"] },
          { title: "Kids picky eater meal planning", description: "My 5-year-old refuses vegetables. Need creative, nutritious meal ideas.", budgetRange: "₹2,000 - ₹4,000", duration: "2-week plan", skillTags: ["Kids Nutrition", "Picky Eaters"] }
        ]
      },
      {
        name: "Wellness Coaching",
        slug: "wellness-coaching",
        description: "Achieve holistic well-being through integrated approaches to physical, mental, and emotional health.",
        realTaskStatements: [
          "Help me manage stress from my high-pressure job",
          "I want to improve my sleep quality naturally",
          "Guide me on holistic healing practices",
          "I need help building a sustainable self-care routine",
          "Help me recover from burnout",
          "I want to learn Ayurvedic wellness practices"
        ],
        coreSkills: ["Holistic Health", "Stress Management", "Sleep Science", "Self-Care Planning", "Integrative Wellness"],
        supportingSkills: ["Yoga", "Meditation", "Ayurveda", "Breathwork", "Energy Healing"],
        howYouEarn: [
          "Per wellness session (₹1000-3000)",
          "Monthly wellness programs (₹5000-15000)",
          "Specialized workshops (₹2000-6000)",
          "Corporate wellness programs (₹20000-80000)",
          "Retreat planning and guidance (₹10000-40000)"
        ],
        taskExamples: [
          { title: "Burnout recovery program", description: "Completely burned out from work. Need complete wellness plan for recovery.", budgetRange: "₹10,000 - ₹20,000", duration: "2 months", skillTags: ["Burnout", "Recovery", "Wellness"] },
          { title: "Sleep improvement coaching", description: "Help me fix my disrupted sleep cycle naturally without medication.", budgetRange: "₹4,000 - ₹8,000", duration: "4 weeks", skillTags: ["Sleep", "Natural Remedies"] },
          { title: "Corporate wellness session", description: "Wellness workshop for my team of 20 people.", budgetRange: "₹8,000 - ₹15,000", duration: "2 hours", skillTags: ["Corporate", "Team Wellness"] }
        ]
      },
      {
        name: "Mindfulness Coaching",
        slug: "mindfulness-coaching",
        description: "Guide people through meditation, stress management, and mental wellness practices.",
        realTaskStatements: [
          "I can't sleep due to anxiety - need meditation help",
          "Teach me how to start meditating",
          "Work stress is killing me - need coping strategies",
          "Want to build a daily mindfulness practice",
          "Help me manage anger issues through breathing",
          "Need guided meditation for focus and concentration"
        ],
        coreSkills: ["Meditation Guidance", "Breathing Techniques", "Stress Management", "Mindfulness Practices", "Relaxation Methods"],
        supportingSkills: ["Psychology Knowledge", "Yoga Background", "Calm Communication", "Routine Building", "Crisis Support"],
        howYouEarn: [
          "Guided meditation sessions (₹500-1500)",
          "21-day meditation programs (₹3000-8000)",
          "Corporate stress workshops (₹15000-50000)",
          "1-on-1 mindfulness coaching (₹2000-5000/session)",
          "Sleep improvement programs (₹5000-12000)"
        ],
        taskExamples: [
          { title: "Sleep meditation for chronic insomnia", description: "Haven't slept well in months. Need personalized guided meditations.", budgetRange: "₹4,000 - ₹8,000", duration: "3 weeks", skillTags: ["Sleep", "Meditation", "Insomnia"] },
          { title: "Beginner meditation - 21 day program", description: "Never meditated before. Want to build a daily habit with guidance.", budgetRange: "₹2,000 - ₹4,000", duration: "21 days", skillTags: ["Beginner", "Habit Building"] },
          { title: "Anger management through breathing", description: "I lose my temper easily. Need techniques to calm down.", budgetRange: "₹3,000 - ₹6,000", duration: "4-6 sessions", skillTags: ["Anger Management", "Breathing"] }
        ]
      },
      {
        name: "Fashion & Styling Advice",
        slug: "fashion-styling-advice",
        description: "Get personalized fashion advice, wardrobe consultation, and styling tips from professional stylists.",
        realTaskStatements: [
          "Help me build a professional wardrobe for my new corporate job",
          "I'm getting married, need styling advice for all events",
          "Revamp my wardrobe on a budget",
          "I don't know what colors suit me, need a color analysis",
          "Style me for my professional photoshoot",
          "Help me develop my personal style identity"
        ],
        coreSkills: ["Fashion Styling", "Color Analysis", "Wardrobe Planning", "Personal Shopping", "Image Consulting"],
        supportingSkills: ["Body Type Analysis", "Trend Knowledge", "Budget Styling", "Brand Knowledge", "Accessorizing"],
        howYouEarn: [
          "Wardrobe consultation (₹2000-8000)",
          "Personal styling sessions (₹1000-3000)",
          "Complete style makeovers (₹5000-20000)",
          "Wedding styling packages (₹10000-50000)",
          "Online style guides (₹1500-5000)"
        ],
        taskExamples: [
          { title: "Corporate wardrobe overhaul", description: "Starting new job at consulting firm. Need professional wardrobe built.", budgetRange: "₹5,000 - ₹10,000", duration: "2 sessions", skillTags: ["Corporate", "Wardrobe", "Professional"] },
          { title: "Wedding styling for groom", description: "Style me for all wedding events - mehendi to reception.", budgetRange: "₹15,000 - ₹30,000", duration: "1 month", skillTags: ["Wedding", "Groom Styling"] },
          { title: "Color analysis session", description: "Find my perfect color palette for clothes and makeup.", budgetRange: "₹2,000 - ₹4,000", duration: "1 hour", skillTags: ["Color Analysis", "Personal Style"] }
        ]
      },
      {
        name: "Game Coaching",
        slug: "game-coaching",
        description: "Level up your gaming skills with professional esports coaches and experienced players.",
        realTaskStatements: [
          "Help me improve my Valorant rank from Silver to Diamond",
          "I want to learn advanced strategies in Chess",
          "Coach me for BGMI competitive tournaments",
          "Help me get better at FIFA, I keep losing online",
          "I want to start streaming, teach me gaming + content",
          "Train me for college esports team tryouts"
        ],
        coreSkills: ["Game Expertise", "Strategy Development", "Mechanics Training", "VOD Review", "Mental Coaching"],
        supportingSkills: ["Communication", "Patience", "Content Creation", "Team Coordination", "Analysis Tools"],
        howYouEarn: [
          "Per hour coaching (₹500-2000)",
          "Weekly coaching packages (₹3000-10000)",
          "VOD review sessions (₹1000-3000)",
          "Tournament preparation (₹8000-25000)",
          "Team coaching (₹15000-50000)"
        ],
        taskExamples: [
          { title: "Valorant rank push coaching", description: "Stuck in Silver. Need coaching to reach Diamond in one month.", budgetRange: "₹4,000 - ₹8,000", duration: "2 weeks", skillTags: ["Valorant", "Rank Push"] },
          { title: "Chess improvement for intermediate", description: "I'm rated 1200. Want to reach 1500 with proper training.", budgetRange: "₹3,000 - ₹6,000", duration: "1 month", skillTags: ["Chess", "Strategy"] },
          { title: "BGMI tournament prep", description: "Team coaching for upcoming tournament. Need strategy and coordination.", budgetRange: "₹8,000 - ₹15,000", duration: "3 weeks", skillTags: ["BGMI", "Esports", "Team"] }
        ]
      },
      {
        name: "Travel Advice",
        slug: "travel-advice",
        description: "Plan perfect trips with advice from travel experts and locals who know destinations inside out.",
        realTaskStatements: [
          "Plan a 7-day itinerary for my Ladakh bike trip",
          "Help me plan a budget Europe trip for 2 weeks",
          "I'm traveling to Japan, need local tips and hidden gems",
          "Create a honeymoon itinerary for Maldives",
          "Help me plan a solo backpacking trip in Southeast Asia",
          "Need visa guidance and trip planning for Schengen"
        ],
        coreSkills: ["Travel Planning", "Destination Knowledge", "Itinerary Creation", "Budget Optimization", "Local Insights"],
        supportingSkills: ["Visa Guidance", "Photography Spots", "Safety Tips", "Booking Platforms", "Language Tips"],
        howYouEarn: [
          "Custom itinerary (₹1000-5000)",
          "Consultation calls (₹500-1500)",
          "Complete trip planning (₹2000-8000)",
          "Visa guidance (₹1000-3000)",
          "Group trip planning (₹5000-15000)"
        ],
        taskExamples: [
          { title: "Ladakh road trip itinerary", description: "10-day bike trip with accommodation and route planning.", budgetRange: "₹2,000 - ₹4,000", duration: "3 days", skillTags: ["Ladakh", "Road Trip", "Adventure"] },
          { title: "Europe budget travel plan", description: "14-day backpacking across 5 countries on budget.", budgetRange: "₹5,000 - ₹10,000", duration: "1 week", skillTags: ["Europe", "Budget Travel"] },
          { title: "Japan local experience guide", description: "Off-beat spots, local food, and cultural tips.", budgetRange: "₹3,000 - ₹6,000", duration: "3 days", skillTags: ["Japan", "Local Guide"] }
        ]
      },
      {
        name: "Astrology & Psychic Services",
        slug: "astrology-psychic-services",
        description: "Explore cosmic guidance through astrology readings, tarot, numerology, and spiritual consultations.",
        realTaskStatements: [
          "I want a detailed birth chart analysis",
          "Do a tarot reading for my career prospects",
          "Match kundalis for my upcoming marriage",
          "I need guidance on auspicious dates for my business launch",
          "Help me understand my numerology and life path",
          "I'm going through Saturn return, need astrological guidance"
        ],
        coreSkills: ["Vedic Astrology", "Tarot Reading", "Numerology", "Kundali Matching", "Horoscope Analysis"],
        supportingSkills: ["Counseling", "Spiritual Guidance", "Palmistry", "Vastu", "Crystal Healing"],
        howYouEarn: [
          "Astrology readings (₹500-3000)",
          "Tarot sessions (₹300-1000)",
          "Birth chart analysis (₹1000-5000)",
          "Kundali matching (₹1000-3000)",
          "Annual predictions (₹2000-8000)"
        ],
        taskExamples: [
          { title: "Complete birth chart reading", description: "Detailed analysis with predictions for next 2 years.", budgetRange: "₹2,500 - ₹5,000", duration: "1 session", skillTags: ["Astrology", "Birth Chart"] },
          { title: "Kundali matching for marriage", description: "Match two charts with detailed compatibility analysis.", budgetRange: "₹1,500 - ₹3,000", duration: "2 days", skillTags: ["Kundali", "Marriage"] },
          { title: "Tarot guidance for career", description: "Should I change my job? Need clarity on career path.", budgetRange: "₹800 - ₹1,500", duration: "1 hour", skillTags: ["Tarot", "Career Guidance"] }
        ]
      },
      {
        name: "Arts & Crafts",
        slug: "arts-crafts",
        description: "Learn creative arts and crafts from skilled artisans - painting, pottery, crafting, and more.",
        realTaskStatements: [
          "Teach me watercolor painting from basics",
          "I want to learn pottery on the wheel",
          "Help me make handmade gifts for Diwali",
          "Teach my kids origami and paper crafts",
          "I want to learn resin art for home decor",
          "Guide me to start selling handmade jewelry"
        ],
        coreSkills: ["Art Instruction", "Craft Techniques", "Creative Design", "Material Selection", "Project Planning"],
        supportingSkills: ["Patience", "Online Teaching", "Business Guidance", "Photography", "Packaging"],
        howYouEarn: [
          "Per craft session (₹500-2000)",
          "Complete art courses (₹2000-8000)",
          "Project-based workshops (₹1000-3000)",
          "Kids craft programs (₹3000-8000)",
          "Business mentorship (₹5000-15000)"
        ],
        taskExamples: [
          { title: "Watercolor basics course", description: "Learn watercolor painting from scratch with weekly sessions.", budgetRange: "₹4,000 - ₹8,000", duration: "1 month", skillTags: ["Watercolor", "Painting", "Beginner"] },
          { title: "Diwali craft workshop", description: "Make diyas, rangoli items, and decorations for festive season.", budgetRange: "₹1,500 - ₹3,000", duration: "3 hours", skillTags: ["Diwali", "Crafts", "Festival"] },
          { title: "Resin art beginner class", description: "Learn to make coasters, jewelry, and art pieces.", budgetRange: "₹2,500 - ₹5,000", duration: "2 sessions", skillTags: ["Resin Art", "Home Decor"] }
        ]
      },
      {
        name: "Hobby Coaching",
        slug: "hobby-coaching",
        description: "Develop new hobbies or improve existing ones with guidance from passionate experts.",
        realTaskStatements: [
          "Teach me to play guitar, I have no musical background",
          "I want to learn calligraphy for wedding invites",
          "Help me get better at amateur photography",
          "Teach me baking - I want to start with breads",
          "I want to learn gardening for my balcony",
          "Teach me to solve Rubik's cube quickly"
        ],
        coreSkills: ["Hobby Expertise", "Teaching", "Skill Progression", "Practice Planning", "Motivation"],
        supportingSkills: ["Patience", "Online Instruction", "Resource Curation", "Equipment Guidance", "Community Building"],
        howYouEarn: [
          "Per hobby session (₹400-1500)",
          "Monthly coaching (₹2000-8000)",
          "Crash courses (₹1000-4000)",
          "Equipment consultation (₹500-2000)",
          "Advanced masterclasses (₹5000-15000)"
        ],
        taskExamples: [
          { title: "Guitar lessons for beginner", description: "Learn to play basic songs in 3 months with weekly practice.", budgetRange: "₹3,000 - ₹6,000/month", duration: "3 months", skillTags: ["Guitar", "Music", "Beginner"] },
          { title: "Calligraphy workshop", description: "Modern calligraphy for wedding invitations and cards.", budgetRange: "₹2,000 - ₹4,000", duration: "4 sessions", skillTags: ["Calligraphy", "Art"] },
          { title: "Balcony gardening guide", description: "Start vegetable and herb garden in my balcony.", budgetRange: "₹1,500 - ₹3,000", duration: "2 sessions", skillTags: ["Gardening", "Urban Garden"] }
        ]
      },
      {
        name: "Personal Mentorship",
        slug: "personal-mentorship",
        description: "Get one-on-one guidance from experienced mentors across career, life, and personal development.",
        realTaskStatements: [
          "I need a startup mentor who has built and sold companies",
          "Looking for a mentor in product management",
          "I want guidance from someone in the VC/investing world",
          "Need a mentor to help me transition to tech",
          "Looking for creative industry mentor for my design career",
          "I want a mentor who can help me grow on LinkedIn"
        ],
        coreSkills: ["Industry Experience", "Mentoring", "Strategic Thinking", "Network Access", "Goal Setting"],
        supportingSkills: ["Coaching", "Career Planning", "Business Development", "Personal Branding", "Accountability"],
        howYouEarn: [
          "Per mentorship session (₹2000-10000)",
          "Monthly retainer (₹10000-50000)",
          "Specific project guidance (₹5000-20000)",
          "Career transition programs (₹15000-40000)",
          "Executive coaching (₹25000-100000)"
        ],
        taskExamples: [
          { title: "Startup mentorship needed", description: "Building B2B SaaS. Need experienced founder as mentor.", budgetRange: "₹15,000 - ₹30,000/month", duration: "6 months", skillTags: ["Startup", "Mentorship", "SaaS"] },
          { title: "PM career mentorship", description: "Help me become a better product manager with guidance.", budgetRange: "₹5,000 - ₹10,000/month", duration: "Monthly", skillTags: ["Product Management", "Career"] },
          { title: "LinkedIn growth mentor", description: "Build personal brand from scratch on LinkedIn.", budgetRange: "₹8,000 - ₹15,000", duration: "2 months", skillTags: ["LinkedIn", "Personal Branding"] }
        ]
      }
    ]
  },
  {
    name: "Consulting",
    slug: "consulting",
    description: "Access expert consultants across business, technology, marketing, and strategy to solve your challenges.",
    icon: "Briefcase",
    color: "from-blue-500 to-indigo-600",
    subCategories: [
      {
        name: "HR Consulting",
        slug: "hr-consulting",
        description: "Get expert guidance on hiring, policies, culture building, and all human resource challenges.",
        realTaskStatements: [
          "Help me create an employee handbook for my startup",
          "I need to set up a performance review system",
          "Design compensation and benefits structure for 50 employees",
          "Help me handle a difficult termination situation legally",
          "Create an onboarding process for remote employees",
          "I need help with diversity and inclusion policies"
        ],
        coreSkills: ["HR Strategy", "Policy Design", "Compliance", "Talent Management", "Culture Building"],
        supportingSkills: ["Legal Knowledge", "Change Management", "Training Design", "Conflict Resolution", "HRIS Systems"],
        howYouEarn: [
          "Policy document creation (₹5000-20000)",
          "Per consulting session (₹2000-8000)",
          "Complete HR setup (₹15000-50000)",
          "Ongoing HR advisory (₹10000-30000/month)",
          "Training programs (₹10000-40000)"
        ],
        taskExamples: [
          { title: "Employee handbook creation", description: "Complete policies for 30-person startup including leave, code of conduct.", budgetRange: "₹12,000 - ₹25,000", duration: "2 weeks", skillTags: ["HR Policy", "Startup", "Handbook"] },
          { title: "Performance review system", description: "Design OKR-based review process for engineering team.", budgetRange: "₹8,000 - ₹15,000", duration: "1 week", skillTags: ["Performance Management", "OKRs"] },
          { title: "Termination guidance", description: "Legal and process guidance for performance-based termination.", budgetRange: "₹5,000 - ₹10,000", duration: "2 days", skillTags: ["Legal HR", "Termination"] }
        ]
      },
      {
        name: "AI Consulting",
        slug: "ai-consulting",
        description: "Navigate the AI landscape with experts who can help you implement AI solutions effectively.",
        realTaskStatements: [
          "Help me understand which AI tools can improve my business",
          "I want to implement AI in my customer service workflow",
          "Evaluate if my startup should build or buy AI solutions",
          "Create an AI adoption roadmap for my company",
          "Help me choose between different LLM providers",
          "I need guidance on AI ethics and responsible implementation"
        ],
        coreSkills: ["AI/ML Expertise", "Business Strategy", "Technology Assessment", "Implementation Planning", "Vendor Evaluation"],
        supportingSkills: ["Change Management", "Cost Analysis", "Training", "Risk Assessment", "Data Strategy"],
        howYouEarn: [
          "Per consulting session (₹5000-25000)",
          "AI strategy roadmaps (₹20000-100000)",
          "Tool evaluation reports (₹10000-40000)",
          "Implementation guidance (₹30000-150000)",
          "AI training programs (₹20000-80000)"
        ],
        taskExamples: [
          { title: "AI readiness assessment", description: "Evaluate where AI can help our retail business operations.", budgetRange: "₹25,000 - ₹50,000", duration: "1 week", skillTags: ["AI Strategy", "Assessment"] },
          { title: "LLM provider comparison", description: "Compare OpenAI, Anthropic, Google for our customer service use case.", budgetRange: "₹15,000 - ₹30,000", duration: "5 days", skillTags: ["LLM", "Vendor Selection"] },
          { title: "AI customer service setup", description: "Implement AI chatbot and automation for support team.", budgetRange: "₹50,000 - ₹100,000", duration: "1 month", skillTags: ["AI Implementation", "Chatbot"] }
        ]
      },
      {
        name: "E-commerce Consulting",
        slug: "ecommerce-consulting",
        description: "Grow your online business with expert guidance on platforms, operations, and optimization.",
        realTaskStatements: [
          "Help me choose between Shopify and WooCommerce",
          "I want to expand my D2C brand to marketplaces",
          "Optimize my e-commerce site for better conversions",
          "Help me set up fulfillment and logistics efficiently",
          "I need guidance on e-commerce SEO and marketing",
          "Create a strategy to reduce cart abandonment"
        ],
        coreSkills: ["E-commerce Strategy", "Platform Expertise", "Conversion Optimization", "Operations", "Growth Strategy"],
        supportingSkills: ["Digital Marketing", "Analytics", "Supply Chain", "Customer Experience", "Payment Systems"],
        howYouEarn: [
          "Platform selection consulting (₹5000-20000)",
          "Conversion optimization (₹10000-50000)",
          "Strategy sessions (₹3000-10000)",
          "Complete e-commerce setup (₹30000-100000)",
          "Monthly advisory (₹15000-40000)"
        ],
        taskExamples: [
          { title: "E-commerce platform migration", description: "Move from WooCommerce to Shopify with data migration.", budgetRange: "₹30,000 - ₹60,000", duration: "2 weeks", skillTags: ["Shopify", "Migration"] },
          { title: "Conversion rate optimization", description: "Improve checkout flow and reduce cart abandonment.", budgetRange: "₹20,000 - ₹40,000", duration: "1 month", skillTags: ["CRO", "E-commerce"] },
          { title: "Marketplace expansion strategy", description: "Launch D2C brand on Amazon and Flipkart.", budgetRange: "₹15,000 - ₹30,000", duration: "1 week", skillTags: ["Marketplace", "Amazon"] }
        ]
      },
      {
        name: "Marketing Strategy",
        slug: "marketing-strategy",
        description: "Develop winning marketing strategies with experienced marketing strategists and CMOs.",
        realTaskStatements: [
          "Create a go-to-market strategy for my new product launch",
          "Help me allocate my marketing budget effectively",
          "I need a brand positioning strategy for my startup",
          "Develop a customer acquisition strategy for B2B SaaS",
          "Help me create a marketing strategy for international expansion",
          "I need help with competitor analysis and differentiation"
        ],
        coreSkills: ["Marketing Strategy", "Brand Development", "Market Research", "Budget Planning", "Go-to-Market"],
        supportingSkills: ["Analytics", "Digital Marketing", "Content Strategy", "Customer Research", "Competitive Analysis"],
        howYouEarn: [
          "Marketing strategy documents (₹10000-50000)",
          "Per consulting session (₹5000-20000)",
          "Go-to-market plans (₹20000-100000)",
          "Brand strategy (₹15000-60000)",
          "Monthly CMO advisory (₹30000-100000)"
        ],
        taskExamples: [
          { title: "GTM strategy for app launch", description: "Complete go-to-market for fintech app including channels and messaging.", budgetRange: "₹40,000 - ₹80,000", duration: "2 weeks", skillTags: ["GTM", "Fintech", "Launch"] },
          { title: "Brand positioning workshop", description: "Define brand identity, messaging, and differentiation.", budgetRange: "₹25,000 - ₹50,000", duration: "2 days", skillTags: ["Branding", "Positioning"] },
          { title: "Marketing budget allocation", description: "Optimize ₹50L annual marketing budget across channels.", budgetRange: "₹15,000 - ₹30,000", duration: "1 week", skillTags: ["Budget", "Marketing Planning"] }
        ]
      },
      {
        name: "Content Strategy",
        slug: "content-strategy",
        description: "Build content engines that drive growth with expert content strategists.",
        realTaskStatements: [
          "Create a content calendar for my B2B tech company",
          "Help me develop a thought leadership strategy",
          "I need a content strategy for SEO growth",
          "Build a content repurposing workflow for my team",
          "Help me create a newsletter strategy",
          "Develop a video content strategy for YouTube"
        ],
        coreSkills: ["Content Strategy", "Editorial Planning", "SEO", "Audience Research", "Content Operations"],
        supportingSkills: ["Copywriting", "Analytics", "Social Media", "Brand Voice", "Distribution"],
        howYouEarn: [
          "Content strategy documents (₹10000-40000)",
          "Content audits (₹5000-15000)",
          "Per consulting session (₹3000-10000)",
          "Content calendars (₹5000-20000)",
          "Ongoing content advisory (₹15000-40000/month)"
        ],
        taskExamples: [
          { title: "6-month content strategy", description: "Complete content plan with calendar for SaaS company.", budgetRange: "₹35,000 - ₹70,000", duration: "2 weeks", skillTags: ["Content Strategy", "SaaS"] },
          { title: "Content audit and recommendations", description: "Audit existing blog and suggest improvements for SEO.", budgetRange: "₹12,000 - ₹25,000", duration: "1 week", skillTags: ["Content Audit", "SEO"] },
          { title: "Newsletter strategy", description: "Launch B2B newsletter from scratch with growth plan.", budgetRange: "₹15,000 - ₹30,000", duration: "1 week", skillTags: ["Newsletter", "B2B"] }
        ]
      },
      {
        name: "Social Media Strategy",
        slug: "social-media-strategy",
        description: "Create impactful social media strategies that build audience and drive business results.",
        realTaskStatements: [
          "Create a social media strategy for my D2C brand",
          "Help me choose which platforms to focus on",
          "Develop a community building strategy for Twitter",
          "Create a LinkedIn content strategy for B2B leads",
          "Help me develop an Instagram growth strategy",
          "Build a social media crisis management plan"
        ],
        coreSkills: ["Social Media Strategy", "Platform Expertise", "Community Building", "Content Planning", "Analytics"],
        supportingSkills: ["Paid Social", "Influencer Marketing", "Brand Management", "Crisis Management", "Tool Knowledge"],
        howYouEarn: [
          "Social media strategies (₹10000-35000)",
          "Platform-specific plans (₹5000-15000)",
          "Per consulting session (₹3000-8000)",
          "Monthly social advisory (₹15000-40000)",
          "Social audits (₹8000-20000)"
        ],
        taskExamples: [
          { title: "Instagram growth strategy", description: "From 5K to 50K followers plan for fashion brand.", budgetRange: "₹20,000 - ₹40,000", duration: "1 week", skillTags: ["Instagram", "Growth"] },
          { title: "LinkedIn B2B strategy", description: "Lead generation through LinkedIn for consulting firm.", budgetRange: "₹25,000 - ₹50,000", duration: "2 weeks", skillTags: ["LinkedIn", "B2B", "Leads"] },
          { title: "Multi-platform social strategy", description: "Complete social media overhaul for e-commerce brand.", budgetRange: "₹40,000 - ₹80,000", duration: "2 weeks", skillTags: ["Social Media", "Multi-platform"] }
        ]
      },
      {
        name: "Influencer Strategy",
        slug: "influencer-strategy",
        description: "Navigate influencer marketing with experts who know what works and what doesn't.",
        realTaskStatements: [
          "Create an influencer marketing strategy for my beauty brand",
          "Help me identify the right influencers for my niche",
          "Develop a micro-influencer program for my startup",
          "Help me negotiate and manage influencer contracts",
          "Create an affiliate program with influencers",
          "Measure and optimize my influencer marketing ROI"
        ],
        coreSkills: ["Influencer Marketing", "Partnership Management", "Campaign Strategy", "ROI Analysis", "Talent Identification"],
        supportingSkills: ["Negotiation", "Content Strategy", "Social Media", "Analytics", "Contract Management"],
        howYouEarn: [
          "Influencer strategy (₹10000-40000)",
          "Influencer identification (₹5000-15000)",
          "Campaign management (₹15000-50000)",
          "ROI analysis (₹8000-20000)",
          "Ongoing influencer advisory (₹20000-50000/month)"
        ],
        taskExamples: [
          { title: "Influencer marketing strategy", description: "Complete strategy for fashion D2C brand launch.", budgetRange: "₹30,000 - ₹60,000", duration: "2 weeks", skillTags: ["Influencer", "Fashion", "D2C"] },
          { title: "Influencer identification", description: "Find 50 relevant micro-influencers for skincare brand.", budgetRange: "₹12,000 - ₹25,000", duration: "1 week", skillTags: ["Micro-influencers", "Research"] },
          { title: "Campaign ROI analysis", description: "Analyze past campaigns and optimize future strategy.", budgetRange: "₹8,000 - ₹15,000", duration: "3 days", skillTags: ["ROI", "Analytics"] }
        ]
      },
      {
        name: "Video Marketing Consulting",
        slug: "video-marketing-consulting",
        description: "Develop video marketing strategies that capture attention and drive conversions.",
        realTaskStatements: [
          "Create a YouTube content strategy for my brand",
          "Help me develop a video marketing funnel",
          "Advise on video production for product launches",
          "Create a short-form video strategy for Reels/TikTok",
          "Help me optimize video content for conversions",
          "Develop a webinar strategy for lead generation"
        ],
        coreSkills: ["Video Strategy", "Content Planning", "Platform Knowledge", "Conversion Optimization", "Production Planning"],
        supportingSkills: ["Production Knowledge", "Analytics", "Scriptwriting", "Paid Video Ads", "SEO"],
        howYouEarn: [
          "Video marketing strategies (₹15000-50000)",
          "Per consulting session (₹5000-15000)",
          "Platform-specific plans (₹10000-30000)",
          "Webinar strategy (₹10000-25000)",
          "Video content audits (₹8000-20000)"
        ],
        taskExamples: [
          { title: "YouTube channel strategy", description: "Complete strategy for tech education channel launch.", budgetRange: "₹35,000 - ₹70,000", duration: "2 weeks", skillTags: ["YouTube", "Education", "Strategy"] },
          { title: "Reels content strategy", description: "Short-form video strategy for e-commerce brand.", budgetRange: "₹15,000 - ₹30,000", duration: "1 week", skillTags: ["Reels", "Short-form"] },
          { title: "Video ads strategy", description: "Video advertising strategy for product launch.", budgetRange: "₹25,000 - ₹50,000", duration: "1 week", skillTags: ["Video Ads", "Paid Media"] }
        ]
      },
      {
        name: "SEM Strategy",
        slug: "sem-strategy",
        description: "Maximize search engine marketing ROI with expert PPC and paid search strategies.",
        realTaskStatements: [
          "Audit my Google Ads account and suggest improvements",
          "Create a PPC strategy for my e-commerce store",
          "Help me reduce cost per acquisition on paid search",
          "Develop a search strategy for B2B lead generation",
          "Help me scale my Google Ads while maintaining ROI",
          "Create a strategy for Performance Max campaigns"
        ],
        coreSkills: ["Google Ads", "PPC Strategy", "Keyword Research", "Bid Management", "Campaign Optimization"],
        supportingSkills: ["Analytics", "Landing Page Optimization", "A/B Testing", "Budget Management", "Competitor Analysis"],
        howYouEarn: [
          "SEM audits and strategies (₹10000-40000)",
          "Per consulting session (₹5000-15000)",
          "Campaign restructuring (₹15000-50000)",
          "Monthly SEM advisory (₹20000-60000)",
          "Training and enablement (₹15000-40000)"
        ],
        taskExamples: [
          { title: "Google Ads audit", description: "Audit ₹5L/month ad spend account with recommendations.", budgetRange: "₹15,000 - ₹30,000", duration: "1 week", skillTags: ["Google Ads", "Audit"] },
          { title: "PPC scaling strategy", description: "Scale from ₹2L to ₹10L/month spend profitably.", budgetRange: "₹30,000 - ₹60,000", duration: "2 weeks", skillTags: ["PPC", "Scaling"] },
          { title: "E-commerce SEM strategy", description: "Complete SEM strategy for fashion e-commerce.", budgetRange: "₹25,000 - ₹50,000", duration: "1 week", skillTags: ["E-commerce", "SEM"] }
        ]
      },
      {
        name: "PR Strategy",
        slug: "pr-strategy",
        description: "Build brand reputation and media presence with expert PR strategists.",
        realTaskStatements: [
          "Create a PR strategy for my startup launch",
          "Help me get featured in top tech publications",
          "Develop a crisis communication plan",
          "Build a thought leadership PR strategy for our CEO",
          "Help me prepare for a product announcement",
          "Create a PR calendar for ongoing media presence"
        ],
        coreSkills: ["PR Strategy", "Media Relations", "Crisis Management", "Storytelling", "Message Development"],
        supportingSkills: ["Writing", "Event Planning", "Social Media", "Influencer Relations", "Reputation Management"],
        howYouEarn: [
          "PR strategies (₹15000-60000)",
          "Media outreach campaigns (₹10000-30000)",
          "Per consulting session (₹5000-15000)",
          "Crisis communication plans (₹20000-50000)",
          "Monthly PR advisory (₹25000-80000)"
        ],
        taskExamples: [
          { title: "Startup launch PR strategy", description: "Get coverage in 10+ publications for fintech launch.", budgetRange: "₹40,000 - ₹80,000", duration: "2 weeks", skillTags: ["PR", "Startup", "Launch"] },
          { title: "Crisis communication plan", description: "Prepare for potential PR issues with response playbook.", budgetRange: "₹25,000 - ₹50,000", duration: "1 week", skillTags: ["Crisis PR", "Communications"] },
          { title: "Founder PR strategy", description: "Build CEO's media presence and thought leadership.", budgetRange: "₹35,000 - ₹70,000", duration: "2 weeks", skillTags: ["Thought Leadership", "Executive PR"] }
        ]
      },
      {
        name: "Data Analytics Consulting",
        slug: "data-analytics-consulting",
        description: "Turn data into actionable insights with expert data analytics consultants.",
        realTaskStatements: [
          "Help me set up analytics properly for my business",
          "Create a data strategy and KPI framework",
          "Help me understand what my data is telling me",
          "Set up customer analytics for better segmentation",
          "Create automated reporting dashboards",
          "Help me implement attribution modeling"
        ],
        coreSkills: ["Data Analytics", "Business Intelligence", "Statistical Analysis", "Data Strategy", "KPI Design"],
        supportingSkills: ["SQL", "Visualization Tools", "Machine Learning", "Business Acumen", "Storytelling"],
        howYouEarn: [
          "Analytics setup and strategy (₹15000-50000)",
          "Per consulting session (₹5000-20000)",
          "Complete data infrastructure (₹20000-80000)",
          "Dashboard creation (₹10000-40000)",
          "Monthly analytics advisory (₹20000-60000)"
        ],
        taskExamples: [
          { title: "Analytics infrastructure setup", description: "Set up proper tracking and reporting for SaaS product.", budgetRange: "₹40,000 - ₹80,000", duration: "2 weeks", skillTags: ["Analytics", "Setup"] },
          { title: "KPI framework creation", description: "Define metrics that matter for e-commerce business.", budgetRange: "₹20,000 - ₹40,000", duration: "1 week", skillTags: ["KPIs", "Metrics"] },
          { title: "Customer segmentation analysis", description: "Segment customers for targeted marketing campaigns.", budgetRange: "₹30,000 - ₹60,000", duration: "1 week", skillTags: ["Segmentation", "Customer Analytics"] }
        ]
      },
      {
        name: "Database Consulting",
        slug: "database-consulting",
        description: "Optimize database architecture and performance with expert database consultants.",
        realTaskStatements: [
          "Help me choose the right database for my application",
          "Optimize my slow database queries",
          "Design a scalable database architecture",
          "Help me migrate from MySQL to PostgreSQL",
          "Create a database backup and recovery strategy",
          "Help me implement database security best practices"
        ],
        coreSkills: ["Database Design", "Performance Optimization", "SQL", "Architecture", "Data Modeling"],
        supportingSkills: ["Cloud Platforms", "Security", "Backup Strategies", "Migration", "NoSQL"],
        howYouEarn: [
          "Database consulting projects (₹10000-40000)",
          "Per consulting session (₹5000-15000)",
          "Migrations and optimization (₹20000-80000)",
          "Architecture design (₹30000-100000)",
          "Ongoing database support (₹15000-50000/month)"
        ],
        taskExamples: [
          { title: "Database performance optimization", description: "Fix slow queries in PostgreSQL production database.", budgetRange: "₹25,000 - ₹50,000", duration: "1 week", skillTags: ["PostgreSQL", "Optimization"] },
          { title: "Database architecture design", description: "Design scalable database for new SaaS product.", budgetRange: "₹40,000 - ₹80,000", duration: "2 weeks", skillTags: ["Architecture", "SaaS"] },
          { title: "Database migration", description: "Migrate from MySQL to PostgreSQL with zero downtime.", budgetRange: "₹35,000 - ₹70,000", duration: "2 weeks", skillTags: ["Migration", "MySQL", "PostgreSQL"] }
        ]
      },
      {
        name: "Data Visualization Consulting",
        slug: "data-visualization-consulting",
        description: "Present data compellingly with expert visualization and dashboard consultants.",
        realTaskStatements: [
          "Help me create executive dashboards in Tableau",
          "Design data visualizations for my investor pitch",
          "Create an interactive dashboard for sales reporting",
          "Help me visualize complex research data",
          "Build a real-time analytics dashboard",
          "Train my team on data visualization best practices"
        ],
        coreSkills: ["Data Visualization", "Dashboard Design", "BI Tools", "Storytelling with Data", "UX for Data"],
        supportingSkills: ["Data Analysis", "SQL", "Presentation Skills", "Design Thinking", "Training"],
        howYouEarn: [
          "Dashboard creation (₹15000-50000)",
          "Per consulting session (₹5000-15000)",
          "Visualization projects (₹10000-30000)",
          "Training workshops (₹15000-40000)",
          "Ongoing dashboard support (₹10000-30000/month)"
        ],
        taskExamples: [
          { title: "Executive dashboard in Tableau", description: "Real-time business metrics dashboard for leadership.", budgetRange: "₹35,000 - ₹70,000", duration: "1 week", skillTags: ["Tableau", "Executive Dashboard"] },
          { title: "Investor pitch visualizations", description: "Make data compelling for Series A fundraising.", budgetRange: "₹20,000 - ₹40,000", duration: "5 days", skillTags: ["Investor Deck", "Visualization"] },
          { title: "Sales analytics dashboard", description: "Track team performance and pipeline in Power BI.", budgetRange: "₹30,000 - ₹60,000", duration: "1 week", skillTags: ["Power BI", "Sales"] }
        ]
      },
      {
        name: "AI Technology Consulting",
        slug: "ai-technology-consulting",
        description: "Get deep technical guidance on AI/ML implementation from experienced practitioners.",
        realTaskStatements: [
          "Help me architect an AI solution for my product",
          "Evaluate whether we should build or buy ML capabilities",
          "Guide my team on MLOps best practices",
          "Help me choose the right AI/ML stack",
          "Advise on AI model deployment and scaling",
          "Create a technical AI implementation roadmap"
        ],
        coreSkills: ["ML Engineering", "AI Architecture", "MLOps", "Technical Strategy", "System Design"],
        supportingSkills: ["Cloud Platforms", "Data Engineering", "Software Architecture", "Team Building", "Vendor Evaluation"],
        howYouEarn: [
          "Per consulting engagement (₹15000-60000)",
          "Architecture and roadmaps (₹50000-200000)",
          "Technical reviews (₹10000-30000)",
          "MLOps implementation (₹40000-150000)",
          "AI team advisory (₹30000-100000/month)"
        ],
        taskExamples: [
          { title: "AI architecture review", description: "Review and improve our ML infrastructure for scale.", budgetRange: "₹50,000 - ₹100,000", duration: "1 week", skillTags: ["AI Architecture", "Review"] },
          { title: "MLOps implementation guide", description: "Set up proper ML deployment pipeline on AWS.", budgetRange: "₹40,000 - ₹80,000", duration: "2 weeks", skillTags: ["MLOps", "AWS"] },
          { title: "AI stack selection", description: "Choose tools for computer vision project.", budgetRange: "₹25,000 - ₹50,000", duration: "1 week", skillTags: ["Computer Vision", "Stack Selection"] }
        ]
      },
      {
        name: "Website Consulting",
        slug: "website-consulting",
        description: "Get expert advice on website strategy, technology, performance, and optimization.",
        realTaskStatements: [
          "Audit my website and suggest improvements",
          "Help me choose the right tech stack for my website",
          "Advise on website redesign strategy",
          "Help me improve my website loading speed",
          "Create a website maintenance and update plan",
          "Guide me on accessibility compliance"
        ],
        coreSkills: ["Web Development", "UX/UI", "Performance Optimization", "SEO", "Technology Selection"],
        supportingSkills: ["Analytics", "Security", "Accessibility", "Content Strategy", "Conversion Optimization"],
        howYouEarn: [
          "Website audits (₹10000-40000)",
          "Per consulting session (₹5000-15000)",
          "Strategy documents (₹15000-50000)",
          "Tech stack consulting (₹10000-30000)",
          "Ongoing website advisory (₹15000-40000/month)"
        ],
        taskExamples: [
          { title: "Complete website audit", description: "Technical, UX, and SEO audit for e-commerce site.", budgetRange: "₹25,000 - ₹50,000", duration: "1 week", skillTags: ["Website Audit", "E-commerce"] },
          { title: "Tech stack recommendation", description: "Choose framework for new corporate website.", budgetRange: "₹15,000 - ₹30,000", duration: "3 days", skillTags: ["Tech Stack", "Consulting"] },
          { title: "Speed optimization consulting", description: "Make website load under 3 seconds on mobile.", budgetRange: "₹20,000 - ₹40,000", duration: "1 week", skillTags: ["Performance", "Speed"] }
        ]
      },
      {
        name: "App Consulting",
        slug: "app-consulting",
        description: "Navigate mobile and web app development with expert app strategists and architects.",
        realTaskStatements: [
          "Help me decide between native and cross-platform app",
          "Review my app idea and provide technical feedback",
          "Create a technical specification for my app",
          "Advise on app monetization strategy",
          "Help me plan an app rewrite or modernization",
          "Guide me on app store optimization"
        ],
        coreSkills: ["App Development", "Mobile Strategy", "Technical Architecture", "Product Strategy", "Platform Selection"],
        supportingSkills: ["UX Design", "Analytics", "ASO", "Backend Integration", "Cost Estimation"],
        howYouEarn: [
          "App consulting projects (₹15000-50000)",
          "Per consulting session (₹5000-20000)",
          "Technical specifications (₹20000-80000)",
          "App strategy documents (₹15000-40000)",
          "Ongoing app advisory (₹20000-60000/month)"
        ],
        taskExamples: [
          { title: "Native vs cross-platform decision", description: "Evaluate best approach for fitness tracking app.", budgetRange: "₹15,000 - ₹30,000", duration: "3 days", skillTags: ["Mobile Strategy", "Platform Selection"] },
          { title: "Technical spec creation", description: "Detailed specification for fintech mobile app.", budgetRange: "₹40,000 - ₹80,000", duration: "2 weeks", skillTags: ["Technical Spec", "Fintech"] },
          { title: "App modernization roadmap", description: "Plan to update legacy mobile app to modern stack.", budgetRange: "₹35,000 - ₹70,000", duration: "1 week", skillTags: ["Modernization", "Legacy"] }
        ]
      },
      {
        name: "Software Consulting",
        slug: "software-consulting",
        description: "Get expert guidance on software development, architecture, and engineering practices.",
        realTaskStatements: [
          "Help me choose the right architecture for my SaaS",
          "Review our codebase and suggest improvements",
          "Advise on scaling our software for growth",
          "Help me implement DevOps best practices",
          "Create a technical debt reduction plan",
          "Guide me on API design and integration"
        ],
        coreSkills: ["Software Architecture", "System Design", "DevOps", "Code Review", "Scalability"],
        supportingSkills: ["Cloud Platforms", "Security", "Performance", "Team Processes", "Agile"],
        howYouEarn: [
          "Architecture consulting (₹20000-80000)",
          "Per consulting session (₹10000-30000)",
          "Technical roadmaps (₹30000-100000)",
          "Code audits (₹20000-60000)",
          "CTO advisory (₹40000-150000/month)"
        ],
        taskExamples: [
          { title: "Architecture review", description: "Review and improve SaaS architecture for scale.", budgetRange: "₹50,000 - ₹100,000", duration: "1 week", skillTags: ["Architecture", "SaaS"] },
          { title: "Code quality audit", description: "Identify issues and improvement areas in codebase.", budgetRange: "₹30,000 - ₹60,000", duration: "1 week", skillTags: ["Code Review", "Quality"] },
          { title: "Scaling strategy", description: "Plan for 10x user growth in next year.", budgetRange: "₹40,000 - ₹80,000", duration: "2 weeks", skillTags: ["Scaling", "Growth"] }
        ]
      },
      {
        name: "Mentorship",
        slug: "mentorship",
        description: "Get ongoing guidance and support from experienced professionals in your field.",
        realTaskStatements: [
          "I need a technical mentor for my engineering career",
          "Looking for a business mentor for my startup journey",
          "I want guidance from a senior designer",
          "Need a mentor to help me break into consulting",
          "Looking for a mentor in the VC/PE industry",
          "I need career guidance from a successful entrepreneur"
        ],
        coreSkills: ["Industry Experience", "Coaching", "Strategic Guidance", "Network", "Goal Setting"],
        supportingSkills: ["Communication", "Career Planning", "Problem Solving", "Motivation", "Accountability"],
        howYouEarn: [
          "Per mentorship session (₹5000-25000)",
          "Monthly retainers (₹20000-100000)",
          "Project-based guidance (₹10000-50000)",
          "Career programs (₹30000-100000)",
          "Executive mentorship (₹50000-200000/month)"
        ],
        taskExamples: [
          { title: "Engineering career mentorship", description: "Bi-weekly calls with senior engineer for career growth.", budgetRange: "₹10,000 - ₹20,000/month", duration: "6 months", skillTags: ["Engineering", "Career", "Mentorship"] },
          { title: "Startup mentor needed", description: "Guidance for first-time founder building B2B SaaS.", budgetRange: "₹20,000 - ₹40,000/month", duration: "Ongoing", skillTags: ["Startup", "Founder"] },
          { title: "Design career guidance", description: "Help me transition from UI to UX leadership.", budgetRange: "₹8,000 - ₹15,000", duration: "4 sessions", skillTags: ["Design", "Leadership"] }
        ]
      }
    ]
  },
  {
    name: "Data",
    slug: "data",
    description: "Harness the power of data with experts in analytics, machine learning, data engineering, and operations.",
    icon: "Database",
    color: "from-emerald-500 to-teal-600",
    subCategories: [
      {
        name: "Machine Learning",
        slug: "machine-learning",
        description: "Build intelligent systems with machine learning engineers and data scientists.",
        realTaskStatements: [
          "Build a recommendation engine for my e-commerce site",
          "Create a churn prediction model for my SaaS",
          "Help me implement fraud detection using ML",
          "Build a demand forecasting model for inventory",
          "Create a customer segmentation ML model",
          "Help me deploy my ML model to production"
        ],
        coreSkills: ["Machine Learning", "Python", "Statistical Modeling", "Feature Engineering", "Model Deployment"],
        supportingSkills: ["Deep Learning", "Cloud Platforms", "MLOps", "Data Engineering", "SQL"],
        howYouEarn: [
          "ML model development (₹30000-150000)",
          "Model optimization (₹15000-50000)",
          "Consulting and review (₹10000-40000)",
          "Production deployment (₹20000-80000)",
          "Ongoing model maintenance (₹15000-50000/month)"
        ],
        taskExamples: [
          { title: "Build recommendation system", description: "Product recommendations for e-commerce with 100K products.", budgetRange: "₹80,000 - ₹150,000", duration: "3 weeks", skillTags: ["Recommendations", "E-commerce", "ML"] },
          { title: "Churn prediction model", description: "Predict customer churn for subscription SaaS.", budgetRange: "₹50,000 - ₹100,000", duration: "2 weeks", skillTags: ["Churn", "Prediction", "SaaS"] },
          { title: "ML model deployment", description: "Deploy trained model to AWS with API endpoint.", budgetRange: "₹30,000 - ₹60,000", duration: "1 week", skillTags: ["Deployment", "AWS", "MLOps"] }
        ]
      },
      {
        name: "Computer Vision",
        slug: "computer-vision",
        description: "Build image and video analysis solutions with computer vision experts.",
        realTaskStatements: [
          "Build an object detection system for quality control",
          "Create a face recognition system for attendance",
          "Help me implement image classification for my app",
          "Build a document OCR and extraction pipeline",
          "Create a video analytics solution for retail",
          "Help me with medical image analysis"
        ],
        coreSkills: ["Computer Vision", "Deep Learning", "Image Processing", "Python", "Model Training"],
        supportingSkills: ["TensorFlow/PyTorch", "Edge Deployment", "Cloud ML", "Data Labeling", "Video Processing"],
        howYouEarn: [
          "CV model development (₹50000-200000)",
          "Model fine-tuning (₹20000-80000)",
          "Consulting (₹15000-50000)",
          "Edge deployment (₹30000-100000)",
          "Ongoing CV support (₹25000-80000/month)"
        ],
        taskExamples: [
          { title: "Quality control CV system", description: "Detect defects in manufacturing using cameras.", budgetRange: "₹120,000 - ₹200,000", duration: "1 month", skillTags: ["Quality Control", "Object Detection"] },
          { title: "Document OCR pipeline", description: "Extract data from invoices and receipts automatically.", budgetRange: "₹60,000 - ₹120,000", duration: "2 weeks", skillTags: ["OCR", "Document Processing"] },
          { title: "Face recognition system", description: "Attendance tracking for office using face recognition.", budgetRange: "₹80,000 - ₹150,000", duration: "3 weeks", skillTags: ["Face Recognition", "Attendance"] }
        ]
      },
      {
        name: "NLP",
        slug: "nlp",
        description: "Build text analysis and language understanding solutions with NLP experts.",
        realTaskStatements: [
          "Build a sentiment analysis system for customer reviews",
          "Create a chatbot that understands context",
          "Help me with text classification for support tickets",
          "Build a named entity extraction pipeline",
          "Create a summarization system for long documents",
          "Help me fine-tune an LLM for my use case"
        ],
        coreSkills: ["NLP", "Transformers", "Text Processing", "Python", "Language Models"],
        supportingSkills: ["LLMs", "Deep Learning", "Linguistics", "Data Annotation", "API Development"],
        howYouEarn: [
          "NLP model development (₹40000-150000)",
          "LLM fine-tuning (₹20000-80000)",
          "Consulting (₹15000-50000)",
          "Chatbot development (₹50000-150000)",
          "Ongoing NLP support (₹20000-60000/month)"
        ],
        taskExamples: [
          { title: "Sentiment analysis system", description: "Analyze customer feedback sentiment across channels.", budgetRange: "₹50,000 - ₹100,000", duration: "2 weeks", skillTags: ["Sentiment Analysis", "NLP"] },
          { title: "Custom chatbot development", description: "Context-aware support chatbot for SaaS product.", budgetRange: "₹80,000 - ₹150,000", duration: "3 weeks", skillTags: ["Chatbot", "Conversational AI"] },
          { title: "LLM fine-tuning", description: "Fine-tune for legal document analysis and extraction.", budgetRange: "₹100,000 - ₹200,000", duration: "2 weeks", skillTags: ["LLM", "Fine-tuning", "Legal"] }
        ]
      },
      {
        name: "Deep Learning",
        slug: "deep-learning",
        description: "Build cutting-edge AI solutions with deep learning specialists.",
        realTaskStatements: [
          "Help me build a neural network for my research",
          "Create a generative model for synthetic data",
          "Optimize my deep learning model for inference",
          "Help me implement attention mechanisms",
          "Build a multi-modal learning system",
          "Create a reinforcement learning solution"
        ],
        coreSkills: ["Deep Learning", "Neural Networks", "PyTorch/TensorFlow", "Mathematics", "Model Optimization"],
        supportingSkills: ["GPU Programming", "Research", "MLOps", "Paper Implementation", "Experimentation"],
        howYouEarn: [
          "Deep learning projects (₹50000-200000)",
          "Model optimization (₹30000-100000)",
          "Research assistance (₹20000-80000)",
          "Custom architecture (₹60000-200000)",
          "DL consulting (₹15000-50000/session)"
        ],
        taskExamples: [
          { title: "Custom neural network", description: "Research-grade model development for academic paper.", budgetRange: "₹100,000 - ₹200,000", duration: "1 month", skillTags: ["Research", "Neural Network"] },
          { title: "Model optimization", description: "Make model 5x faster for edge deployment.", budgetRange: "₹40,000 - ₹80,000", duration: "1 week", skillTags: ["Optimization", "Edge AI"] },
          { title: "Generative model", description: "Generate synthetic training data for rare classes.", budgetRange: "₹80,000 - ₹150,000", duration: "3 weeks", skillTags: ["Generative AI", "Synthetic Data"] }
        ]
      },
      {
        name: "Generative Models",
        slug: "generative-models",
        description: "Create content generation systems with generative AI experts.",
        realTaskStatements: [
          "Build a custom image generation model for my brand",
          "Create a text-to-image system for my platform",
          "Help me fine-tune Stable Diffusion for my use case",
          "Build a generative model for product design",
          "Create a music or audio generation system",
          "Help me implement controllable generation"
        ],
        coreSkills: ["Generative AI", "Diffusion Models", "GANs", "Fine-tuning", "Model Training"],
        supportingSkills: ["Image Processing", "Creative AI", "Cloud GPU", "Model Deployment", "UI Integration"],
        howYouEarn: [
          "Generative model projects (₹60000-250000)",
          "Fine-tuning (₹30000-100000)",
          "Consulting (₹20000-60000)",
          "Model deployment (₹25000-80000)",
          "Creative AI solutions (₹50000-200000)"
        ],
        taskExamples: [
          { title: "Custom Stable Diffusion model", description: "Fine-tune for consistent fashion product generation.", budgetRange: "₹150,000 - ₹300,000", duration: "1 month", skillTags: ["Stable Diffusion", "Fashion"] },
          { title: "Image generation API", description: "Build and deploy image generation API for platform.", budgetRange: "₹80,000 - ₹150,000", duration: "2 weeks", skillTags: ["API", "Image Generation"] },
          { title: "Brand-specific image model", description: "Generate on-brand marketing images automatically.", budgetRange: "₹200,000 - ₹400,000", duration: "6 weeks", skillTags: ["Branding", "Marketing AI"] }
        ]
      },
      {
        name: "Time Series Analysis",
        slug: "time-series-analysis",
        description: "Analyze and forecast temporal data with time series specialists.",
        realTaskStatements: [
          "Build a sales forecasting model for my retail business",
          "Create a stock price prediction system",
          "Help me with demand forecasting for inventory",
          "Build an anomaly detection system for IoT data",
          "Create an energy consumption forecasting model",
          "Help me analyze and predict website traffic patterns"
        ],
        coreSkills: ["Time Series", "Forecasting", "Statistical Modeling", "Python", "Feature Engineering"],
        supportingSkills: ["Machine Learning", "SQL", "Domain Knowledge", "Visualization", "Streaming Data"],
        howYouEarn: [
          "Forecasting projects (₹30000-120000)",
          "Analysis and consulting (₹15000-50000)",
          "Model development (₹20000-80000)",
          "Real-time systems (₹40000-150000)",
          "Ongoing forecast support (₹15000-50000/month)"
        ],
        taskExamples: [
          { title: "Sales forecasting model", description: "Predict monthly sales for 50 product SKUs.", budgetRange: "₹60,000 - ₹120,000", duration: "2 weeks", skillTags: ["Sales Forecasting", "Retail"] },
          { title: "Anomaly detection system", description: "Detect unusual patterns in IoT sensor data.", budgetRange: "₹50,000 - ₹100,000", duration: "2 weeks", skillTags: ["Anomaly Detection", "IoT"] },
          { title: "Demand forecasting", description: "Inventory optimization for e-commerce warehouse.", budgetRange: "₹80,000 - ₹150,000", duration: "3 weeks", skillTags: ["Demand Forecasting", "Inventory"] }
        ]
      },
      {
        name: "Data Analytics",
        slug: "data-analytics",
        description: "Extract insights from data with experienced data analysts.",
        realTaskStatements: [
          "Analyze my marketing campaign performance data",
          "Help me understand customer behavior patterns",
          "Create cohort analysis for my SaaS product",
          "Analyze A/B test results and provide recommendations",
          "Help me with funnel analysis for my app",
          "Create a comprehensive business analytics report"
        ],
        coreSkills: ["Data Analysis", "SQL", "Excel", "Statistical Analysis", "Business Intelligence"],
        supportingSkills: ["Python/R", "BI Tools", "Business Acumen", "Presentation", "Visualization"],
        howYouEarn: [
          "Analysis projects (₹10000-50000)",
          "Per analysis session (₹5000-20000)",
          "Comprehensive reports (₹15000-60000)",
          "Dashboard creation (₹10000-40000)",
          "Ongoing analytics (₹15000-50000/month)"
        ],
        taskExamples: [
          { title: "Marketing analytics", description: "Analyze 6 months of campaign data across channels.", budgetRange: "₹25,000 - ₹50,000", duration: "1 week", skillTags: ["Marketing Analytics", "Campaign"] },
          { title: "Customer behavior analysis", description: "Deep dive into user patterns and journey mapping.", budgetRange: "₹35,000 - ₹70,000", duration: "2 weeks", skillTags: ["Customer Analytics", "Behavior"] },
          { title: "A/B test analysis", description: "Analyze experiment results and recommend winner.", budgetRange: "₹15,000 - ₹30,000", duration: "3 days", skillTags: ["A/B Testing", "Statistics"] }
        ]
      },
      {
        name: "Data Visualization",
        slug: "data-visualization",
        description: "Transform data into compelling visual stories with visualization experts.",
        realTaskStatements: [
          "Create interactive dashboards for my business",
          "Design data visualizations for my investor deck",
          "Build a real-time monitoring dashboard",
          "Help me visualize complex research data",
          "Create infographics from my data",
          "Build custom charts for my web application"
        ],
        coreSkills: ["Data Visualization", "Tableau/Power BI", "D3.js", "Design", "Storytelling"],
        supportingSkills: ["Data Analysis", "UX", "SQL", "Web Development", "Presentation"],
        howYouEarn: [
          "Dashboard projects (₹15000-60000)",
          "Individual visualizations (₹5000-20000)",
          "Infographics (₹10000-40000)",
          "Custom charts (₹20000-80000)",
          "Visualization consulting (₹5000-15000/session)"
        ],
        taskExamples: [
          { title: "Executive dashboard", description: "Real-time KPI dashboard for leadership in Tableau.", budgetRange: "₹40,000 - ₹80,000", duration: "1 week", skillTags: ["Tableau", "Dashboard", "KPIs"] },
          { title: "Investor deck visualizations", description: "10 custom charts for Series A fundraising.", budgetRange: "₹20,000 - ₹40,000", duration: "5 days", skillTags: ["Investor Deck", "Charts"] },
          { title: "Interactive web dashboard", description: "D3.js dashboard for SaaS product analytics.", budgetRange: "₹60,000 - ₹120,000", duration: "2 weeks", skillTags: ["D3.js", "Web Dashboard"] }
        ]
      },
      {
        name: "Dashboards",
        slug: "dashboards",
        description: "Build powerful business dashboards with BI and dashboard specialists.",
        realTaskStatements: [
          "Create a sales dashboard in Power BI",
          "Build a marketing performance dashboard",
          "Help me set up Looker for my company",
          "Create a financial reporting dashboard",
          "Build a customer success metrics dashboard",
          "Create an operational monitoring dashboard"
        ],
        coreSkills: ["BI Tools", "Dashboard Design", "SQL", "Data Modeling", "KPI Definition"],
        supportingSkills: ["Data Analysis", "UX", "Automation", "ETL", "Performance Optimization"],
        howYouEarn: [
          "Dashboard projects (₹20000-80000)",
          "Per dashboard (₹10000-30000)",
          "BI setup and training (₹15000-50000)",
          "Dashboard maintenance (₹10000-30000/month)",
          "Custom BI solutions (₹50000-200000)"
        ],
        taskExamples: [
          { title: "Sales dashboard in Power BI", description: "Track pipeline, wins, and team performance.", budgetRange: "₹35,000 - ₹70,000", duration: "1 week", skillTags: ["Power BI", "Sales"] },
          { title: "Marketing dashboard", description: "All marketing channels in one unified view.", budgetRange: "₹40,000 - ₹80,000", duration: "1 week", skillTags: ["Marketing", "Multi-channel"] },
          { title: "Looker implementation", description: "Set up Looker for entire organization.", budgetRange: "₹80,000 - ₹150,000", duration: "3 weeks", skillTags: ["Looker", "Enterprise BI"] }
        ]
      },
      {
        name: "Data Tagging & Annotation",
        slug: "data-tagging-annotation",
        description: "Get high-quality labeled data for your ML projects with annotation experts.",
        realTaskStatements: [
          "Label images for my object detection model",
          "Annotate text data for NER training",
          "Help me create training data for sentiment analysis",
          "Label video frames for action recognition",
          "Annotate medical images for AI training",
          "Create bounding boxes for autonomous driving data"
        ],
        coreSkills: ["Data Annotation", "Attention to Detail", "Domain Knowledge", "Quality Control", "Consistency"],
        supportingSkills: ["Annotation Tools", "ML Understanding", "Data Management", "Speed", "Guidelines Creation"],
        howYouEarn: [
          "Per image annotation (₹2-10)",
          "Batch projects (₹5000-20000)",
          "Specialized annotation (₹10000-50000)",
          "QA and review (₹5000-15000)",
          "Annotation team management (₹20000-60000)"
        ],
        taskExamples: [
          { title: "Image annotation for detection", description: "Label 5000 product images with bounding boxes.", budgetRange: "₹15,000 - ₹30,000", duration: "1 week", skillTags: ["Image Annotation", "Object Detection"] },
          { title: "Text annotation for NLP", description: "NER tagging for 10000 sentences in Hindi.", budgetRange: "₹20,000 - ₹40,000", duration: "2 weeks", skillTags: ["NER", "Hindi", "Text Annotation"] },
          { title: "Medical image labeling", description: "Expert annotation for X-ray classification.", budgetRange: "₹50,000 - ₹100,000", duration: "1 month", skillTags: ["Medical", "Expert Annotation"] }
        ]
      },
      {
        name: "Data Entry",
        slug: "data-entry",
        description: "Get accurate and fast data entry services from experienced professionals.",
        realTaskStatements: [
          "Enter product data into my e-commerce system",
          "Digitize paper records into spreadsheets",
          "Input survey responses into database",
          "Enter financial data from invoices",
          "Update CRM with lead information",
          "Transcribe handwritten forms into digital format"
        ],
        coreSkills: ["Fast Typing", "Accuracy", "Excel", "Attention to Detail", "Data Validation"],
        supportingSkills: ["CRM Systems", "Multi-language", "Research", "Organization", "Time Management"],
        howYouEarn: [
          "Per entry (₹1-5)",
          "Batch projects (₹3000-15000)",
          "Per hour (₹500-1500)",
          "Monthly packages (₹10000-30000)",
          "Specialized entry (₹5000-20000)"
        ],
        taskExamples: [
          { title: "Product data entry", description: "Enter 1000 products with details into Shopify.", budgetRange: "₹8,000 - ₹15,000", duration: "1 week", skillTags: ["E-commerce", "Shopify"] },
          { title: "Survey data digitization", description: "Enter 500 paper survey responses into Excel.", budgetRange: "₹5,000 - ₹10,000", duration: "3 days", skillTags: ["Survey", "Excel"] },
          { title: "CRM data update", description: "Update 2000 contact records with new information.", budgetRange: "₹10,000 - ₹20,000", duration: "1 week", skillTags: ["CRM", "Contacts"] }
        ]
      },
      {
        name: "Data Typing",
        slug: "data-typing",
        description: "Get fast and accurate typing services for various data projects.",
        realTaskStatements: [
          "Type handwritten documents into Word",
          "Transcribe audio recordings into text",
          "Type data from images into spreadsheets",
          "Convert PDFs to editable documents",
          "Type legal documents from scanned copies",
          "Input data from business cards to CRM"
        ],
        coreSkills: ["Fast Typing", "Accuracy", "Word Processing", "Attention to Detail", "Formatting"],
        supportingSkills: ["Audio Transcription", "Multiple Languages", "Proofreading", "OCR Cleanup", "Time Management"],
        howYouEarn: [
          "Per hour typing (₹500-2000)",
          "Per page (₹100-500)",
          "Batch projects (₹3000-10000)",
          "Audio transcription (₹500-1500/hour)",
          "Express delivery (50% premium)"
        ],
        taskExamples: [
          { title: "Handwritten to digital", description: "Type 100 pages of handwritten notes into Word.", budgetRange: "₹6,000 - ₹12,000", duration: "3 days", skillTags: ["Typing", "Handwritten"] },
          { title: "PDF to Word conversion", description: "Convert 50 pages maintaining original formatting.", budgetRange: "₹4,000 - ₹8,000", duration: "2 days", skillTags: ["PDF", "Conversion"] },
          { title: "Audio transcription", description: "Transcribe 10 hours of interview recordings.", budgetRange: "₹8,000 - ₹15,000", duration: "1 week", skillTags: ["Transcription", "Audio"] }
        ]
      },
      {
        name: "Data Scraping",
        slug: "data-scraping",
        description: "Extract data from websites and documents with web scraping experts.",
        realTaskStatements: [
          "Scrape product data from competitor websites",
          "Extract contact information from business directories",
          "Build a scraper for real estate listings",
          "Scrape job postings from multiple sites",
          "Extract reviews and ratings from platforms",
          "Build automated data collection pipeline"
        ],
        coreSkills: ["Web Scraping", "Python", "Data Extraction", "Automation", "API Integration"],
        supportingSkills: ["Proxy Management", "Data Cleaning", "Scheduling", "Anti-detection", "Database"],
        howYouEarn: [
          "Scraping projects (₹5000-30000)",
          "Automated scrapers (₹10000-50000)",
          "One-time extractions (₹3000-10000)",
          "Maintenance (₹5000-15000/month)",
          "Large-scale scraping (₹30000-100000)"
        ],
        taskExamples: [
          { title: "Competitor product scraping", description: "Extract 10000 products with prices from 5 sites.", budgetRange: "₹15,000 - ₹30,000", duration: "1 week", skillTags: ["E-commerce", "Competitor Analysis"] },
          { title: "Business directory extraction", description: "Scrape 5000 business contacts from Yellow Pages.", budgetRange: "₹12,000 - ₹25,000", duration: "5 days", skillTags: ["Directory", "Contacts"] },
          { title: "Real estate listings scraper", description: "Build automated scraper for property listings.", budgetRange: "₹25,000 - ₹50,000", duration: "2 weeks", skillTags: ["Real Estate", "Automated"] }
        ]
      },
      {
        name: "Data Formatting",
        slug: "data-formatting",
        description: "Transform raw data into structured, usable formats.",
        realTaskStatements: [
          "Format messy spreadsheets into clean templates",
          "Convert data between different file formats",
          "Standardize address and contact data",
          "Format financial data for reporting",
          "Structure unstructured text data",
          "Create formatted templates from raw data"
        ],
        coreSkills: ["Excel", "Data Formatting", "Attention to Detail", "Templates", "Standardization"],
        supportingSkills: ["Data Validation", "Automation", "Multiple Formats", "Quality Check", "Scripting"],
        howYouEarn: [
          "Formatting projects (₹3000-15000)",
          "Per hour (₹500-1500)",
          "Template creation (₹5000-20000)",
          "Batch formatting (₹10000-40000)",
          "Automation setup (₹15000-50000)"
        ],
        taskExamples: [
          { title: "Spreadsheet cleanup", description: "Format 20 messy Excel files into standard template.", budgetRange: "₹5,000 - ₹10,000", duration: "2 days", skillTags: ["Excel", "Cleanup"] },
          { title: "Data format conversion", description: "Convert CSV data to structured JSON with validation.", budgetRange: "₹8,000 - ₹15,000", duration: "3 days", skillTags: ["JSON", "Conversion"] },
          { title: "Address standardization", description: "Standardize 10000 addresses to postal format.", budgetRange: "₹10,000 - ₹20,000", duration: "1 week", skillTags: ["Address", "Standardization"] }
        ]
      },
      {
        name: "Data Cleaning",
        slug: "data-cleaning",
        description: "Transform messy data into clean, accurate datasets ready for analysis.",
        realTaskStatements: [
          "Clean and deduplicate my customer database",
          "Fix inconsistencies in my product catalog",
          "Remove invalid entries from my email list",
          "Standardize naming conventions across datasets",
          "Handle missing values in my analytics data",
          "Clean survey data for analysis"
        ],
        coreSkills: ["Data Cleaning", "Excel/Python", "Quality Assurance", "Pattern Recognition", "Deduplication"],
        supportingSkills: ["Automation", "Statistics", "Domain Knowledge", "Validation Rules", "Data Profiling"],
        howYouEarn: [
          "Cleaning projects (₹5000-25000)",
          "Per dataset (₹3000-10000)",
          "Per hour (₹500-1500)",
          "Automated cleaning (₹15000-50000)",
          "Ongoing maintenance (₹10000-30000/month)"
        ],
        taskExamples: [
          { title: "Customer database cleanup", description: "Dedupe and clean 50000 customer records.", budgetRange: "₹15,000 - ₹30,000", duration: "1 week", skillTags: ["Deduplication", "CRM"] },
          { title: "Product catalog cleaning", description: "Standardize 5000 product entries with consistent naming.", budgetRange: "₹12,000 - ₹25,000", duration: "5 days", skillTags: ["Catalog", "Standardization"] },
          { title: "Email list validation", description: "Clean and verify 20000 email addresses.", budgetRange: "₹8,000 - ₹15,000", duration: "3 days", skillTags: ["Email", "Validation"] }
        ]
      },
      {
        name: "Data Enrichment",
        slug: "data-enrichment",
        description: "Enhance your datasets with additional information and insights.",
        realTaskStatements: [
          "Enrich my lead list with company information",
          "Add demographic data to customer records",
          "Append social profiles to contact database",
          "Enrich product data with market information",
          "Add geolocation data to addresses",
          "Enhance business data with financial information"
        ],
        coreSkills: ["Data Research", "API Integration", "Data Matching", "Verification", "Database Management"],
        supportingSkills: ["Web Research", "Automation", "Data Quality", "Tools Knowledge", "Validation"],
        howYouEarn: [
          "Per enriched record (₹2-20)",
          "Enrichment projects (₹10000-50000)",
          "Custom enrichment (₹5000-20000)",
          "API integration (₹15000-50000)",
          "Ongoing enrichment (₹15000-40000/month)"
        ],
        taskExamples: [
          { title: "Lead enrichment", description: "Add company data to 2000 B2B leads.", budgetRange: "₹20,000 - ₹40,000", duration: "1 week", skillTags: ["Lead Enrichment", "B2B"] },
          { title: "Contact database enhancement", description: "Append LinkedIn profiles to 5000 contacts.", budgetRange: "₹15,000 - ₹30,000", duration: "5 days", skillTags: ["LinkedIn", "Contacts"] },
          { title: "Business data enrichment", description: "Add revenue and employee data to company list.", budgetRange: "₹30,000 - ₹60,000", duration: "2 weeks", skillTags: ["Company Data", "Firmographics"] }
        ]
      },
      {
        name: "Data Processing",
        slug: "data-processing",
        description: "Process and transform data at scale with automation experts.",
        realTaskStatements: [
          "Process and combine multiple data sources",
          "Automate recurring data processing tasks",
          "Transform data for import into new system",
          "Process large files that Excel can't handle",
          "Create data processing pipelines",
          "Batch process images or documents"
        ],
        coreSkills: ["Data Processing", "Python", "Automation", "ETL", "Scripting"],
        supportingSkills: ["SQL", "Cloud Platforms", "Big Data", "Parallel Processing", "Error Handling"],
        howYouEarn: [
          "Processing projects (₹10000-50000)",
          "Pipeline development (₹15000-80000)",
          "One-time processing (₹5000-20000)",
          "Automation setup (₹20000-60000)",
          "Ongoing processing (₹10000-40000/month)"
        ],
        taskExamples: [
          { title: "Multi-source data merge", description: "Combine 10 data sources into unified dataset.", budgetRange: "₹20,000 - ₹40,000", duration: "1 week", skillTags: ["Data Merge", "Integration"] },
          { title: "Automated processing pipeline", description: "Daily data processing automation with reporting.", budgetRange: "₹40,000 - ₹80,000", duration: "2 weeks", skillTags: ["Automation", "Pipeline"] },
          { title: "Large file processing", description: "Process 5GB CSV files for analysis.", budgetRange: "₹15,000 - ₹30,000", duration: "3 days", skillTags: ["Big Data", "Processing"] }
        ]
      },
      {
        name: "Data Governance",
        slug: "data-governance",
        description: "Establish data quality, security, and compliance frameworks.",
        realTaskStatements: [
          "Create a data governance policy for my company",
          "Help me comply with GDPR requirements",
          "Establish data quality standards and processes",
          "Create data documentation and catalogs",
          "Implement data access controls",
          "Build a data privacy framework"
        ],
        coreSkills: ["Data Governance", "Compliance", "Policy Creation", "Data Quality", "Security"],
        supportingSkills: ["Documentation", "Process Design", "Training", "Legal Knowledge", "Risk Management"],
        howYouEarn: [
          "Governance frameworks (₹30000-150000)",
          "Policy creation (₹15000-50000)",
          "Consulting (₹10000-40000)",
          "GDPR compliance (₹40000-120000)",
          "Ongoing governance (₹25000-80000/month)"
        ],
        taskExamples: [
          { title: "Data governance framework", description: "Complete governance setup for growing startup.", budgetRange: "₹80,000 - ₹150,000", duration: "1 month", skillTags: ["Governance", "Framework"] },
          { title: "GDPR compliance", description: "Make data practices GDPR compliant.", budgetRange: "₹50,000 - ₹100,000", duration: "2 weeks", skillTags: ["GDPR", "Compliance"] },
          { title: "Data quality standards", description: "Create quality metrics and monitoring processes.", budgetRange: "₹30,000 - ₹60,000", duration: "1 week", skillTags: ["Data Quality", "Standards"] }
        ]
      },
      {
        name: "Databases",
        slug: "databases",
        description: "Design, build, and optimize databases with expert database developers.",
        realTaskStatements: [
          "Design a database schema for my application",
          "Optimize slow database queries",
          "Migrate data from one database to another",
          "Set up database replication for high availability",
          "Create stored procedures and triggers",
          "Help me choose the right database technology"
        ],
        coreSkills: ["Database Design", "SQL", "Performance Tuning", "Data Modeling", "Query Optimization"],
        supportingSkills: ["NoSQL", "Cloud Databases", "Backup/Recovery", "Security", "Replication"],
        howYouEarn: [
          "Database projects (₹20000-100000)",
          "Optimization (₹10000-40000)",
          "Migrations (₹15000-60000)",
          "Schema design (₹20000-80000)",
          "Ongoing support (₹15000-50000/month)"
        ],
        taskExamples: [
          { title: "Database design", description: "Design schema for new SaaS application.", budgetRange: "₹40,000 - ₹80,000", duration: "2 weeks", skillTags: ["Schema Design", "SaaS"] },
          { title: "Query optimization", description: "Fix slow queries in production PostgreSQL.", budgetRange: "₹25,000 - ₹50,000", duration: "1 week", skillTags: ["PostgreSQL", "Performance"] },
          { title: "Database migration", description: "Migrate MySQL to PostgreSQL with data.", budgetRange: "₹50,000 - ₹100,000", duration: "2 weeks", skillTags: ["Migration", "MySQL"] }
        ]
      },
      {
        name: "Data Engineering",
        slug: "data-engineering",
        description: "Build robust data infrastructure and pipelines with data engineers.",
        realTaskStatements: [
          "Build an ETL pipeline for my data warehouse",
          "Set up a data lake architecture",
          "Create real-time data streaming pipelines",
          "Help me implement dbt for transformations",
          "Build data pipelines on Airflow",
          "Design a modern data stack for my company"
        ],
        coreSkills: ["Data Engineering", "ETL/ELT", "SQL", "Python", "Cloud Platforms"],
        supportingSkills: ["Spark", "Streaming", "Data Modeling", "Orchestration", "DevOps"],
        howYouEarn: [
          "Data engineering projects (₹40000-200000)",
          "Pipeline development (₹20000-80000)",
          "Consulting (₹15000-50000)",
          "Architecture design (₹50000-150000)",
          "Ongoing data ops (₹30000-100000/month)"
        ],
        taskExamples: [
          { title: "Data warehouse setup", description: "Build warehouse on Snowflake with ELT pipelines.", budgetRange: "₹100,000 - ₹200,000", duration: "1 month", skillTags: ["Snowflake", "Data Warehouse"] },
          { title: "ETL pipeline development", description: "Ingest data from 5 sources into warehouse.", budgetRange: "₹50,000 - ₹100,000", duration: "2 weeks", skillTags: ["ETL", "Integration"] },
          { title: "Real-time data pipeline", description: "Stream data using Kafka for analytics.", budgetRange: "₹80,000 - ₹150,000", duration: "3 weeks", skillTags: ["Kafka", "Streaming"] }
        ]
      }
    ]
  },
  {
    name: "Photography",
    slug: "photography",
    description: "Capture moments and create visual content with professional photographers across all styles.",
    icon: "Camera",
    color: "from-pink-500 to-rose-600",
    subCategories: [
      {
        name: "Product Photography",
        slug: "product-photography",
        description: "Showcase your products with stunning professional photography for e-commerce and marketing.",
        realTaskStatements: [
          "I need product photos for my Amazon listings",
          "Shoot lifestyle images for my D2C brand website",
          "Create white background product images for catalog",
          "I need 360-degree product photography",
          "Shoot food products for my packaging design",
          "Create product photos for social media ads"
        ],
        coreSkills: ["Product Photography", "Lighting", "Composition", "Post-processing", "E-commerce Standards"],
        supportingSkills: ["Retouching", "Prop Styling", "Color Accuracy", "360 Photography", "Video"],
        howYouEarn: [
          "Per product shot (₹500-3000)",
          "Product shoot sessions (₹5000-25000)",
          "Catalog shoots (₹10000-50000)",
          "Monthly retainer (₹20000-80000)",
          "Lifestyle shoots (₹15000-60000)"
        ],
        taskExamples: [
          { title: "Amazon product photos", description: "Shoot 20 products for Amazon listings with infographics.", budgetRange: "₹15,000 - ₹30,000", duration: "2 days", skillTags: ["Amazon", "E-commerce"] },
          { title: "Lifestyle product shoot", description: "10 products with lifestyle context for D2C website.", budgetRange: "₹30,000 - ₹60,000", duration: "1 day", skillTags: ["Lifestyle", "D2C"] },
          { title: "Jewelry photography", description: "Detailed shots of 30 jewelry pieces.", budgetRange: "₹20,000 - ₹40,000", duration: "1 day", skillTags: ["Jewelry", "Macro"] }
        ]
      },
      {
        name: "Food Photography",
        slug: "food-photography",
        description: "Make food look irresistible with professional food photographers and stylists.",
        realTaskStatements: [
          "Shoot photos for my restaurant menu",
          "Create food images for my food delivery app",
          "I need recipe photos for my cookbook",
          "Shoot product photos for my packaged food brand",
          "Create social media content for my cafe",
          "I need food photos for advertising campaign"
        ],
        coreSkills: ["Food Photography", "Food Styling", "Lighting", "Color Grading", "Composition"],
        supportingSkills: ["Prop Styling", "Recipe Knowledge", "Post-production", "Video", "Social Content"],
        howYouEarn: [
          "Per dish (₹2000-8000)",
          "Full menu shoots (₹15000-50000)",
          "Day sessions (₹10000-40000)",
          "Social content packages (₹20000-60000)",
          "Cookbook shoots (₹50000-200000)"
        ],
        taskExamples: [
          { title: "Restaurant menu shoot", description: "Photograph 40 menu items for new restaurant.", budgetRange: "₹40,000 - ₹80,000", duration: "2 days", skillTags: ["Menu", "Restaurant"] },
          { title: "Food app content", description: "20 dishes for food delivery app listings.", budgetRange: "₹25,000 - ₹50,000", duration: "1 day", skillTags: ["App", "Delivery"] },
          { title: "Packaged food photography", description: "Product shots for FMCG brand packaging.", budgetRange: "₹35,000 - ₹70,000", duration: "2 days", skillTags: ["FMCG", "Packaging"] }
        ]
      },
      {
        name: "Lifestyle Photography",
        slug: "lifestyle-photography",
        description: "Capture authentic lifestyle moments for brands, campaigns, and personal projects.",
        realTaskStatements: [
          "Create lifestyle content for my fashion brand",
          "Shoot day-in-life photos for personal branding",
          "I need lifestyle images for my wellness brand",
          "Create authentic photos for my marketing campaign",
          "Shoot family lifestyle photos for home decor brand",
          "I need influencer-style content for my products"
        ],
        coreSkills: ["Lifestyle Photography", "Natural Lighting", "Direction", "Storytelling", "Authenticity"],
        supportingSkills: ["Model Direction", "Location Scouting", "Editing", "Brand Understanding", "Mood Creation"],
        howYouEarn: [
          "Per session (₹10000-40000)",
          "Brand shoots (₹20000-80000)",
          "Content packages (₹15000-50000)",
          "Campaign shoots (₹50000-200000)",
          "Day rates (₹25000-80000)"
        ],
        taskExamples: [
          { title: "Brand lifestyle shoot", description: "Full day lifestyle content for skincare brand.", budgetRange: "₹50,000 - ₹100,000", duration: "1 day", skillTags: ["Skincare", "Brand"] },
          { title: "Personal branding photos", description: "Professional lifestyle portraits for entrepreneur.", budgetRange: "₹20,000 - ₹40,000", duration: "3 hours", skillTags: ["Personal Brand", "Portrait"] },
          { title: "Campaign content creation", description: "Complete lifestyle campaign for fashion label.", budgetRange: "₹80,000 - ₹150,000", duration: "2 days", skillTags: ["Campaign", "Fashion"] }
        ]
      },
      {
        name: "Fashion Photography",
        slug: "fashion-photography",
        description: "Create stunning fashion imagery for lookbooks, campaigns, and e-commerce.",
        realTaskStatements: [
          "Shoot my fashion brand's new collection lookbook",
          "Create e-commerce photos for my clothing line",
          "I need editorial fashion photos for magazine",
          "Shoot model portfolio for my agency",
          "Create social media content for fashion brand",
          "I need campaign images for fashion week"
        ],
        coreSkills: ["Fashion Photography", "Model Direction", "Lighting", "Styling", "Editorial Vision"],
        supportingSkills: ["Retouching", "Trend Awareness", "Team Coordination", "Color Theory", "Post-production"],
        howYouEarn: [
          "Per shoot day (₹20000-100000)",
          "Lookbook projects (₹30000-150000)",
          "Campaigns (₹50000-300000)",
          "E-commerce rates (₹15000-50000)",
          "Editorial (₹40000-150000)"
        ],
        taskExamples: [
          { title: "Collection lookbook", description: "50 looks for new season fashion lookbook.", budgetRange: "₹80,000 - ₹150,000", duration: "2 days", skillTags: ["Lookbook", "Collection"] },
          { title: "E-commerce fashion shoot", description: "30 products on model for online store.", budgetRange: "₹40,000 - ₹80,000", duration: "1 day", skillTags: ["E-commerce", "Model"] },
          { title: "Editorial fashion shoot", description: "Magazine-quality editorial for feature.", budgetRange: "₹100,000 - ₹200,000", duration: "1 day", skillTags: ["Editorial", "Magazine"] }
        ]
      },
      {
        name: "Portrait Photography",
        slug: "portrait-photography",
        description: "Capture personality and character with professional portrait photography.",
        realTaskStatements: [
          "I need professional headshots for LinkedIn",
          "Shoot family portraits for our anniversary",
          "Create author photos for my book launch",
          "I need portrait photos for my dating profile",
          "Shoot team headshots for company website",
          "Create artistic portraits for my personal project"
        ],
        coreSkills: ["Portrait Photography", "Lighting", "Posing", "Expression Capture", "Connection"],
        supportingSkills: ["Retouching", "Studio Setup", "Natural Light", "Communication", "Wardrobe Guidance"],
        howYouEarn: [
          "Headshot sessions (₹3000-15000)",
          "Portrait sessions (₹5000-25000)",
          "Team/corporate (₹10000-50000)",
          "Family portraits (₹8000-30000)",
          "Artistic portraits (₹15000-60000)"
        ],
        taskExamples: [
          { title: "LinkedIn headshots", description: "Professional headshots with 3 looks and backgrounds.", budgetRange: "₹5,000 - ₹10,000", duration: "1 hour", skillTags: ["Headshot", "Corporate"] },
          { title: "Family portrait session", description: "Family of 5 with indoor and outdoor shots.", budgetRange: "₹15,000 - ₹30,000", duration: "2 hours", skillTags: ["Family", "Portrait"] },
          { title: "Corporate team photos", description: "Headshots for 25 team members.", budgetRange: "₹35,000 - ₹70,000", duration: "Half day", skillTags: ["Team", "Corporate"] }
        ]
      },
      {
        name: "Event Photography",
        slug: "event-photography",
        description: "Document events professionally from corporate conferences to intimate gatherings.",
        realTaskStatements: [
          "Need a photographer for our corporate conference",
          "Cover my product launch event",
          "Photograph our annual company party",
          "I need photos of my seminar and workshop",
          "Cover a networking event for social media",
          "Photograph our trade show booth and activities"
        ],
        coreSkills: ["Event Photography", "Candid Shots", "Low Light", "Quick Editing", "Moment Capture"],
        supportingSkills: ["Crowd Management", "Key Moments", "Equipment Backup", "Networking", "Speed"],
        howYouEarn: [
          "Half-day coverage (₹10000-30000)",
          "Full-day coverage (₹20000-60000)",
          "Per hour (₹5000-15000)",
          "Multi-day events (₹50000-150000)",
          "Express delivery (premium)"
        ],
        taskExamples: [
          { title: "Corporate conference coverage", description: "Full day conference with 200 attendees.", budgetRange: "₹40,000 - ₹80,000", duration: "Full day", skillTags: ["Conference", "Corporate"] },
          { title: "Product launch event", description: "Evening launch event with VIPs and media.", budgetRange: "₹25,000 - ₹50,000", duration: "4 hours", skillTags: ["Launch", "Event"] },
          { title: "Trade show photography", description: "2-day booth and activities coverage.", budgetRange: "₹35,000 - ₹70,000", duration: "2 days", skillTags: ["Trade Show", "Exhibition"] }
        ]
      },
      {
        name: "Real Estate Photography",
        slug: "real-estate-photography",
        description: "Showcase properties with professional real estate and architectural photography.",
        realTaskStatements: [
          "Photograph my apartment for rental listing",
          "Shoot property photos for real estate sale",
          "I need photos of my hotel rooms",
          "Create virtual tour photos for my property",
          "Photograph commercial space for lease listing",
          "Shoot construction progress photos"
        ],
        coreSkills: ["Architectural Photography", "Wide Angle", "HDR", "Virtual Tours", "Composition"],
        supportingSkills: ["Drone Photography", "Twilight Shots", "Staging Tips", "360 Photos", "Video"],
        howYouEarn: [
          "Per property (₹5000-20000)",
          "Commercial properties (₹15000-50000)",
          "Virtual tours (₹10000-30000)",
          "Hotel photography (₹30000-100000)",
          "Construction documentation (₹15000-50000)"
        ],
        taskExamples: [
          { title: "Residential property shoot", description: "3BHK apartment for sale with all rooms.", budgetRange: "₹10,000 - ₹20,000", duration: "2 hours", skillTags: ["Residential", "Real Estate"] },
          { title: "Hotel room photography", description: "15 room types and all amenities.", budgetRange: "₹40,000 - ₹80,000", duration: "1 day", skillTags: ["Hotel", "Hospitality"] },
          { title: "Commercial property", description: "Office space with drone shots for lease.", budgetRange: "₹25,000 - ₹50,000", duration: "Half day", skillTags: ["Commercial", "Drone"] }
        ]
      },
      {
        name: "Scenic Photography",
        slug: "scenic-photography",
        description: "Capture stunning landscapes and natural scenery for commercial and artistic uses.",
        realTaskStatements: [
          "I need landscape photos for my travel website",
          "Shoot scenic images for calendar production",
          "Create nature photography for my resort",
          "I need stock-worthy landscape images",
          "Photograph scenic locations for tourism board",
          "Create fine art prints of natural landscapes"
        ],
        coreSkills: ["Landscape Photography", "Natural Light", "Composition", "Weather Timing", "Patience"],
        supportingSkills: ["Long Exposure", "Panoramas", "HDR", "Post-processing", "Location Knowledge"],
        howYouEarn: [
          "Per project (₹10000-50000)",
          "Per location (₹5000-20000)",
          "Destination shoots (₹15000-80000)",
          "Stock licensing (ongoing)",
          "Fine art prints (₹5000-50000)"
        ],
        taskExamples: [
          { title: "Resort scenic photography", description: "Capture property and surrounding natural beauty.", budgetRange: "₹30,000 - ₹60,000", duration: "2 days", skillTags: ["Resort", "Landscape"] },
          { title: "Calendar landscape photos", description: "12 stunning landscapes for annual calendar.", budgetRange: "₹50,000 - ₹100,000", duration: "1 week", skillTags: ["Calendar", "Landscapes"] },
          { title: "Tourism campaign", description: "Multiple locations in hill station region.", budgetRange: "₹80,000 - ₹150,000", duration: "1 week", skillTags: ["Tourism", "Destination"] }
        ]
      },
      {
        name: "Drone Photography",
        slug: "drone-photography",
        description: "Get stunning aerial perspectives with professional drone photography services.",
        realTaskStatements: [
          "Capture aerial shots of my property",
          "I need drone photos for my real estate listing",
          "Shoot aerial coverage of our event",
          "Create bird's eye view images of construction site",
          "I need aerial photos of my farm/land",
          "Capture drone shots for my resort marketing"
        ],
        coreSkills: ["Drone Operation", "Aerial Photography", "Flight Planning", "Regulations", "Safety"],
        supportingSkills: ["Video", "HDR", "Mapping", "Post-processing", "Weather Assessment"],
        howYouEarn: [
          "Per session (₹5000-20000)",
          "Commercial projects (₹15000-50000)",
          "Full coverage (₹10000-40000)",
          "Video + stills (₹20000-60000)",
          "Mapping/surveying (₹25000-80000)"
        ],
        taskExamples: [
          { title: "Real estate aerial shots", description: "Property and neighborhood aerial views.", budgetRange: "₹12,000 - ₹25,000", duration: "2 hours", skillTags: ["Real Estate", "Aerial"] },
          { title: "Event aerial coverage", description: "Outdoor wedding venue from above.", budgetRange: "₹25,000 - ₹50,000", duration: "Half day", skillTags: ["Event", "Wedding"] },
          { title: "Construction progress", description: "Monthly aerial documentation of site.", budgetRange: "₹20,000 - ₹40,000/month", duration: "Monthly", skillTags: ["Construction", "Documentation"] }
        ]
      },
      {
        name: "Local Photography",
        slug: "local-photography",
        description: "Connect with photographers in your area for on-location shoots and quick turnarounds.",
        realTaskStatements: [
          "Need a photographer in my city for quick shoot",
          "Find someone to photograph my event nearby",
          "I need on-location portraits today",
          "Looking for photographer familiar with local spots",
          "Need same-day photography service",
          "Find photographer who knows my neighborhood"
        ],
        coreSkills: ["Local Knowledge", "Quick Response", "Versatility", "Location Scouting", "Flexibility"],
        supportingSkills: ["Multiple Styles", "Equipment", "Communication", "Time Management", "Networking"],
        howYouEarn: [
          "Per hour (₹2000-10000)",
          "Quick projects (₹5000-20000)",
          "Day rates (₹10000-40000)",
          "Rush fees (premium)",
          "Local packages (₹15000-50000)"
        ],
        taskExamples: [
          { title: "Same-day portrait session", description: "Quick professional photos needed today.", budgetRange: "₹5,000 - ₹10,000", duration: "1 hour", skillTags: ["Urgent", "Portrait"] },
          { title: "Local event coverage", description: "Birthday party in South Mumbai.", budgetRange: "₹15,000 - ₹30,000", duration: "3 hours", skillTags: ["Event", "Local"] },
          { title: "City location shoot", description: "Fashion shoot at iconic city spots.", budgetRange: "₹20,000 - ₹40,000", duration: "3 hours", skillTags: ["Fashion", "Location"] }
        ]
      },
      {
        name: "Photography Classes",
        slug: "photography-classes",
        description: "Learn photography from professionals through personalized lessons and workshops.",
        realTaskStatements: [
          "Teach me basics of DSLR photography",
          "I want to learn mobile photography",
          "Help me master portrait lighting",
          "Conduct a workshop for my team",
          "Teach me photo editing in Lightroom",
          "I want to learn food photography techniques"
        ],
        coreSkills: ["Teaching", "Photography Expertise", "Curriculum Design", "Patience", "Demonstration"],
        supportingSkills: ["Editing Software", "Equipment Knowledge", "Critique", "Inspiration", "Simplification"],
        howYouEarn: [
          "Per class hour (₹1000-5000)",
          "Course packages (₹5000-20000)",
          "Workshops (₹15000-50000)",
          "Corporate training (₹30000-100000)",
          "1-on-1 mentorship (₹10000-40000/month)"
        ],
        taskExamples: [
          { title: "DSLR basics course", description: "Learn camera fundamentals in 4 sessions.", budgetRange: "₹8,000 - ₹15,000", duration: "4 sessions", skillTags: ["DSLR", "Beginner"] },
          { title: "Corporate photography workshop", description: "Product photography for marketing team.", budgetRange: "₹25,000 - ₹50,000", duration: "Full day", skillTags: ["Corporate", "Workshop"] },
          { title: "Lightroom editing class", description: "Master photo editing in 2 sessions.", budgetRange: "₹5,000 - ₹10,000", duration: "2 sessions", skillTags: ["Lightroom", "Editing"] }
        ]
      },
      {
        name: "Photo Preset Creation",
        slug: "photo-preset-creation",
        description: "Get custom Lightroom presets and editing styles created for your brand.",
        realTaskStatements: [
          "Create custom Lightroom presets for my brand",
          "Match this editing style for my Instagram",
          "Build a preset pack for my photography business",
          "Create presets that work for my product photos",
          "Help me develop a consistent editing look",
          "Design presets for wedding photography"
        ],
        coreSkills: ["Color Grading", "Lightroom", "Visual Style", "Consistency", "Brand Understanding"],
        supportingSkills: ["Color Theory", "Export Formats", "Documentation", "Training", "Adaptability"],
        howYouEarn: [
          "Per custom preset (₹2000-10000)",
          "Preset packs (₹5000-25000)",
          "Brand preset systems (₹10000-40000)",
          "Style matching (₹3000-15000)",
          "Preset with training (₹15000-50000)"
        ],
        taskExamples: [
          { title: "Brand preset creation", description: "5 presets matching brand colors and mood.", budgetRange: "₹15,000 - ₹30,000", duration: "1 week", skillTags: ["Brand", "Presets"] },
          { title: "Instagram style presets", description: "Recreate influencer editing style.", budgetRange: "₹8,000 - ₹15,000", duration: "3 days", skillTags: ["Instagram", "Style Match"] },
          { title: "Wedding preset pack", description: "Complete wedding photography editing system.", budgetRange: "₹20,000 - ₹40,000", duration: "2 weeks", skillTags: ["Wedding", "Preset Pack"] }
        ]
      },
      {
        name: "Editing & Retouching",
        slug: "editing-retouching",
        description: "Professional photo editing and retouching services for all types of images.",
        realTaskStatements: [
          "Retouch my product photos for e-commerce",
          "Edit and color grade my wedding photos",
          "Remove background from product images",
          "Fix and enhance old damaged photos",
          "Batch edit my real estate photos",
          "Professional retouching for my portraits"
        ],
        coreSkills: ["Photoshop", "Lightroom", "Retouching", "Color Correction", "Background Removal"],
        supportingSkills: ["Speed", "Consistency", "Attention to Detail", "Style Matching", "Batch Processing"],
        howYouEarn: [
          "Per image (₹50-500)",
          "Batch projects (₹5000-20000)",
          "Complex editing (₹10000-40000)",
          "Monthly packages (₹15000-50000)",
          "Rush delivery (premium)"
        ],
        taskExamples: [
          { title: "Product photo editing", description: "Edit 100 product images for e-commerce.", budgetRange: "₹10,000 - ₹20,000", duration: "1 week", skillTags: ["Product", "E-commerce"] },
          { title: "Wedding photo editing", description: "Edit and color grade 500 wedding photos.", budgetRange: "₹25,000 - ₹50,000", duration: "2 weeks", skillTags: ["Wedding", "Color Grading"] },
          { title: "Portrait retouching", description: "Professional retouch for 20 portraits.", budgetRange: "₹8,000 - ₹15,000", duration: "3 days", skillTags: ["Portrait", "Retouching"] }
        ]
      },
      {
        name: "Corporate Photography",
        slug: "corporate-photography",
        description: "Professional photography for corporate needs from headshots to office documentation.",
        realTaskStatements: [
          "Photograph our entire team for website",
          "Capture photos of our new office space",
          "Create corporate event documentation",
          "Shoot photos for our annual report",
          "I need professional executive portraits",
          "Document our company culture for recruiting"
        ],
        coreSkills: ["Corporate Photography", "Professional Lighting", "Direction", "Consistency", "Brand Alignment"],
        supportingSkills: ["Event Coverage", "Quick Turnaround", "Brand Guidelines", "Flexibility", "Team Management"],
        howYouEarn: [
          "Team shoots (₹20000-80000)",
          "Office documentation (₹15000-50000)",
          "Executive portraits (₹10000-40000)",
          "Annual report (₹30000-100000)",
          "Retainer packages (₹40000-150000/month)"
        ],
        taskExamples: [
          { title: "Team headshots", description: "50 employees for website and LinkedIn.", budgetRange: "₹50,000 - ₹100,000", duration: "1 day", skillTags: ["Team", "Headshots"] },
          { title: "Office space photography", description: "Document new office for PR and recruiting.", budgetRange: "₹25,000 - ₹50,000", duration: "Half day", skillTags: ["Office", "Interiors"] },
          { title: "Annual report photos", description: "Various shots for corporate annual report.", budgetRange: "₹40,000 - ₹80,000", duration: "2 days", skillTags: ["Annual Report", "Corporate"] }
        ]
      }
    ]
  },
  // ============================================================
  // PART 2: Graphics & Design, Programming & Tech, Digital Marketing, Video & Animation
  // ============================================================
  {
    name: "Graphics & Design",
    slug: "graphics-design",
    description: "Visual creativity that makes brands stand out. From logos to packaging to digital experiences.",
    icon: "Palette",
    color: "from-pink-500 to-rose-600",
    subCategories: [
      {
        name: "Logo & Branding",
        slug: "logo-branding",
        description: "Create memorable brand identities that resonate with audiences and stand the test of time.",
        realTaskStatements: [
          "I'm starting a business and need a logo that stands out",
          "Our brand looks outdated - need a complete refresh",
          "Create a brand identity for my new startup",
          "Need brand guidelines so my team stays consistent",
          "Design a logo that works on both digital and print",
          "Help me develop a visual identity for my personal brand"
        ],
        coreSkills: ["Logo Design", "Brand Strategy", "Typography", "Color Theory", "Visual Identity"],
        supportingSkills: ["Market Research", "Competitor Analysis", "Presentation Skills", "Print Knowledge", "Digital Design"],
        howYouEarn: [
          "Logo design packages (₹5000-50000)",
          "Complete brand identity (₹25000-150000)",
          "Brand guidelines document (₹15000-40000)",
          "Brand refresh projects (₹20000-80000)",
          "Personal branding (₹10000-30000)"
        ],
        taskExamples: [
          { title: "Startup logo design", description: "Need a modern, minimal logo for my fintech startup. Should convey trust and innovation.", budgetRange: "₹8,000 - ₹20,000", duration: "1 week", skillTags: ["Logo Design", "Fintech", "Minimal"] },
          { title: "Complete brand identity", description: "New D2C brand needs logo, colors, typography, patterns, and brand guidelines.", budgetRange: "₹40,000 - ₹80,000", duration: "2-3 weeks", skillTags: ["Brand Identity", "D2C", "Guidelines"] },
          { title: "Restaurant rebranding", description: "10-year-old restaurant needs modern look while keeping heritage feel.", budgetRange: "₹25,000 - ₹50,000", duration: "2 weeks", skillTags: ["Rebranding", "Restaurant", "Heritage"] }
        ]
      },
      {
        name: "Web & App Design",
        slug: "web-app-design",
        description: "Design beautiful, functional digital experiences that users love.",
        realTaskStatements: [
          "Design a website that converts visitors to customers",
          "My app needs a UI that's intuitive and modern",
          "Create mockups for my SaaS product",
          "Need a landing page that looks professional",
          "Design an e-commerce site that builds trust",
          "Help me redesign my outdated website"
        ],
        coreSkills: ["Web Design", "App Design", "Responsive Design", "Visual Design", "Prototyping"],
        supportingSkills: ["UX Principles", "Design Systems", "Figma/Sketch", "Animation", "Frontend Knowledge"],
        howYouEarn: [
          "Landing page design (₹10000-40000)",
          "Full website design (₹30000-150000)",
          "App UI design (₹40000-200000)",
          "Design system creation (₹50000-200000)",
          "Redesign projects (₹25000-100000)"
        ],
        taskExamples: [
          { title: "SaaS dashboard design", description: "Design a clean, data-rich dashboard for our analytics product.", budgetRange: "₹30,000 - ₹60,000", duration: "2 weeks", skillTags: ["Dashboard", "SaaS", "Data Visualization"] },
          { title: "E-commerce website design", description: "Design a premium fashion e-commerce site with unique browsing experience.", budgetRange: "₹50,000 - ₹100,000", duration: "3 weeks", skillTags: ["E-commerce", "Fashion", "Premium"] },
          { title: "Mobile app redesign", description: "Modernize our 5-year-old fitness app design.", budgetRange: "₹40,000 - ₹80,000", duration: "2 weeks", skillTags: ["Mobile", "Fitness", "Redesign"] }
        ]
      },
      {
        name: "UI/UX Design",
        slug: "ui-ux-design",
        description: "Create user-centered designs backed by research and validated through testing.",
        realTaskStatements: [
          "Users are abandoning our checkout flow - fix the UX",
          "Need user research to understand why engagement is low",
          "Create wireframes for my new product idea",
          "Run usability testing on our prototype",
          "Design a user flow that reduces friction",
          "Help me create a design system for consistency"
        ],
        coreSkills: ["User Research", "Wireframing", "Prototyping", "Usability Testing", "Information Architecture"],
        supportingSkills: ["Visual Design", "Data Analysis", "Psychology", "Communication", "Documentation"],
        howYouEarn: [
          "User research projects (₹30000-100000)",
          "UX audit (₹20000-60000)",
          "Wireframing packages (₹15000-50000)",
          "Usability testing (₹25000-80000)",
          "End-to-end UX design (₹60000-250000)"
        ],
        taskExamples: [
          { title: "E-commerce UX audit", description: "Find and fix UX issues causing cart abandonment on our site.", budgetRange: "₹25,000 - ₹50,000", duration: "1 week", skillTags: ["UX Audit", "E-commerce", "Conversion"] },
          { title: "User research for new feature", description: "Conduct research to validate our new feature idea before development.", budgetRange: "₹40,000 - ₹80,000", duration: "2 weeks", skillTags: ["User Research", "Validation", "Interviews"] },
          { title: "Complete UX for fintech app", description: "End-to-end UX design for a peer-to-peer payments app.", budgetRange: "₹80,000 - ₹150,000", duration: "4 weeks", skillTags: ["Fintech", "Mobile UX", "Payments"] }
        ]
      },
      {
        name: "Illustration",
        slug: "illustration",
        description: "Custom illustrations that bring stories, brands, and ideas to life.",
        realTaskStatements: [
          "Need custom illustrations for my children's book",
          "Create brand illustrations for our website",
          "Design character illustrations for our app",
          "I need editorial illustrations for my article",
          "Create an illustrated infographic for complex data",
          "Design icon set that matches our brand"
        ],
        coreSkills: ["Digital Illustration", "Character Design", "Conceptual Art", "Style Development", "Storytelling"],
        supportingSkills: ["Color Theory", "Anatomy", "Animation", "Brand Understanding", "Typography"],
        howYouEarn: [
          "Single illustrations (₹3000-20000)",
          "Illustration sets (₹15000-60000)",
          "Character design (₹10000-40000)",
          "Book illustration (₹50000-200000)",
          "Icon design (₹5000-25000)"
        ],
        taskExamples: [
          { title: "Website illustration set", description: "10 custom illustrations for SaaS website in flat, modern style.", budgetRange: "₹25,000 - ₹50,000", duration: "2 weeks", skillTags: ["Web Illustration", "SaaS", "Flat Style"] },
          { title: "Children's book illustrations", description: "15 full-page illustrations for a picture book about friendship.", budgetRange: "₹60,000 - ₹120,000", duration: "4-6 weeks", skillTags: ["Children's Book", "Character", "Story"] },
          { title: "Brand mascot design", description: "Create a friendly mascot character for our education startup.", budgetRange: "₹15,000 - ₹30,000", duration: "1 week", skillTags: ["Mascot", "Character Design", "Education"] }
        ]
      },
      {
        name: "Image Editing",
        slug: "image-editing",
        description: "Professional photo editing, retouching, and manipulation services.",
        realTaskStatements: [
          "Remove backgrounds from 200 product photos",
          "Retouch my headshots for LinkedIn",
          "Color correct photos from my wedding",
          "Create composite images for marketing",
          "Fix old family photos that are damaged",
          "Edit product photos for e-commerce listing"
        ],
        coreSkills: ["Photoshop", "Photo Retouching", "Color Correction", "Background Removal", "Photo Manipulation"],
        supportingSkills: ["Lightroom", "Batch Processing", "Color Theory", "Attention to Detail", "Quick Turnaround"],
        howYouEarn: [
          "Background removal (₹10-50/image)",
          "Photo retouching (₹200-1000/image)",
          "Color correction (₹100-500/image)",
          "Photo manipulation (₹500-5000/image)",
          "Bulk editing packages (₹5000-30000)"
        ],
        taskExamples: [
          { title: "E-commerce product editing", description: "Background removal and color correction for 300 product images.", budgetRange: "₹15,000 - ₹30,000", duration: "1 week", skillTags: ["Product Photos", "Background Removal", "Bulk"] },
          { title: "Wedding photo editing", description: "Color grade and retouch 500 wedding photos with consistent style.", budgetRange: "₹25,000 - ₹50,000", duration: "2 weeks", skillTags: ["Wedding", "Color Grading", "Retouching"] },
          { title: "Old photo restoration", description: "Restore and colorize 20 damaged family photos from the 1950s.", budgetRange: "₹10,000 - ₹20,000", duration: "1 week", skillTags: ["Restoration", "Colorization", "Family"] }
        ]
      },
      {
        name: "Print & Packaging",
        slug: "print-packaging",
        description: "Design for the physical world - packaging, print materials, and merchandise.",
        realTaskStatements: [
          "Design packaging for my new food product",
          "Create business cards and letterhead",
          "Need a brochure design for our services",
          "Design labels for my cosmetic line",
          "Create a product catalog for our range",
          "Design merchandise for our brand"
        ],
        coreSkills: ["Packaging Design", "Print Design", "Dieline Creation", "Pre-press Knowledge", "Material Understanding"],
        supportingSkills: ["Brand Design", "Typography", "Color Management", "Production Knowledge", "Sustainability Awareness"],
        howYouEarn: [
          "Packaging design (₹15000-80000)",
          "Business stationery (₹5000-20000)",
          "Brochure design (₹8000-30000)",
          "Label design (₹5000-25000)",
          "Catalog design (₹20000-80000)"
        ],
        taskExamples: [
          { title: "Food product packaging", description: "Design packaging for organic snack brand - 5 SKU variants.", budgetRange: "₹40,000 - ₹80,000", duration: "2-3 weeks", skillTags: ["Packaging", "Food", "Organic"] },
          { title: "Corporate stationery set", description: "Business cards, letterhead, envelope, and folder design.", budgetRange: "₹10,000 - ₹20,000", duration: "1 week", skillTags: ["Stationery", "Corporate", "Print"] },
          { title: "Cosmetic label designs", description: "Label designs for 12-product skincare line with premium feel.", budgetRange: "₹25,000 - ₹50,000", duration: "2 weeks", skillTags: ["Labels", "Cosmetics", "Premium"] }
        ]
      },
      {
        name: "Presentation Design",
        slug: "presentation-design",
        description: "Create compelling presentations that communicate ideas effectively.",
        realTaskStatements: [
          "Design a pitch deck for investor meeting",
          "Make my boring slides look professional",
          "Create a template for our sales team",
          "Design a keynote presentation for conference",
          "Turn my data into visual stories",
          "Need an animated presentation for webinar"
        ],
        coreSkills: ["Presentation Design", "Data Visualization", "Storytelling", "PowerPoint/Keynote", "Visual Hierarchy"],
        supportingSkills: ["Animation", "Icon Design", "Infographics", "Business Understanding", "Copywriting"],
        howYouEarn: [
          "Pitch deck design (₹15000-60000)",
          "Presentation template (₹10000-30000)",
          "Sales deck (₹12000-40000)",
          "Keynote presentations (₹20000-80000)",
          "Data presentations (₹15000-50000)"
        ],
        taskExamples: [
          { title: "Startup pitch deck", description: "15-slide investor pitch deck with compelling visuals and data.", budgetRange: "₹20,000 - ₹40,000", duration: "1 week", skillTags: ["Pitch Deck", "Startup", "Investor"] },
          { title: "Sales presentation template", description: "Flexible template for sales team with 30+ slide layouts.", budgetRange: "₹15,000 - ₹25,000", duration: "1 week", skillTags: ["Template", "Sales", "Corporate"] },
          { title: "Conference keynote", description: "30-minute keynote with animations for tech conference.", budgetRange: "₹30,000 - ₹60,000", duration: "2 weeks", skillTags: ["Keynote", "Conference", "Animation"] }
        ]
      },
      {
        name: "3D Design",
        slug: "3d-design",
        description: "Three-dimensional modeling, rendering, and visualization services.",
        realTaskStatements: [
          "Create 3D renders of my product for marketing",
          "Model my product before manufacturing",
          "Need architectural visualization for my project",
          "Create 3D assets for my game or app",
          "Design 3D packaging mockups",
          "Make an animated 3D product video"
        ],
        coreSkills: ["3D Modeling", "Rendering", "Texturing", "Lighting", "Animation"],
        supportingSkills: ["CAD Software", "Sculpting", "Rigging", "Product Knowledge", "Technical Drawing"],
        howYouEarn: [
          "Product modeling (₹10000-50000)",
          "Product renders (₹5000-30000)",
          "Architectural visualization (₹30000-150000)",
          "3D animation (₹20000-100000)",
          "Game assets (₹5000-40000)"
        ],
        taskExamples: [
          { title: "Product 3D renders", description: "Photorealistic renders of furniture product from 5 angles.", budgetRange: "₹15,000 - ₹30,000", duration: "1 week", skillTags: ["Product", "Photorealistic", "Furniture"] },
          { title: "Architectural visualization", description: "Interior renders for 3-bedroom apartment design.", budgetRange: "₹40,000 - ₹80,000", duration: "2 weeks", skillTags: ["Architecture", "Interior", "Visualization"] },
          { title: "3D character for app", description: "Stylized 3D character with basic animations for mobile app.", budgetRange: "₹25,000 - ₹50,000", duration: "2 weeks", skillTags: ["Character", "Animation", "Mobile"] }
        ]
      },
      {
        name: "Fashion & Merchandise Design",
        slug: "fashion-merchandise-design",
        description: "Design apparel, accessories, and branded merchandise.",
        realTaskStatements: [
          "Design t-shirts for my clothing brand",
          "Create merchandise for my YouTube channel",
          "Need tech pack for manufacturing my designs",
          "Design a collection for my fashion startup",
          "Create patterns for fabric printing",
          "Design accessories like bags and caps"
        ],
        coreSkills: ["Fashion Design", "Graphic Design for Apparel", "Tech Pack Creation", "Pattern Design", "Trend Awareness"],
        supportingSkills: ["Illustration", "Manufacturing Knowledge", "Material Understanding", "Brand Design", "Mockup Creation"],
        howYouEarn: [
          "T-shirt designs (₹2000-10000/design)",
          "Merchandise collection (₹15000-60000)",
          "Tech packs (₹3000-15000/style)",
          "Pattern design (₹5000-25000)",
          "Full collection design (₹50000-200000)"
        ],
        taskExamples: [
          { title: "Streetwear collection", description: "Design 10 unique t-shirt graphics for streetwear brand.", budgetRange: "₹20,000 - ₹50,000", duration: "2 weeks", skillTags: ["Streetwear", "T-shirt", "Graphics"] },
          { title: "YouTuber merchandise", description: "Hoodie, t-shirt, and cap designs for gaming YouTuber.", budgetRange: "₹15,000 - ₹30,000", duration: "1 week", skillTags: ["Merchandise", "Gaming", "YouTuber"] },
          { title: "Fashion tech packs", description: "Detailed tech packs for 5 garment styles for production.", budgetRange: "₹20,000 - ₹40,000", duration: "2 weeks", skillTags: ["Tech Pack", "Manufacturing", "Fashion"] }
        ]
      }
    ]
  },
  {
    name: "Programming & Tech",
    slug: "programming-tech",
    description: "Build the digital future with code, apps, and technology solutions.",
    icon: "Code",
    color: "from-blue-500 to-cyan-600",
    subCategories: [
      {
        name: "Website Development",
        slug: "website-development",
        description: "Build modern, responsive websites that work flawlessly across all devices.",
        realTaskStatements: [
          "Build a website for my new business",
          "My website is slow and needs optimization",
          "Convert my Figma design to a working website",
          "Add new features to my existing website",
          "Need a landing page that converts",
          "Fix bugs on my WordPress/React site"
        ],
        coreSkills: ["HTML/CSS", "JavaScript", "React/Vue/Angular", "Responsive Design", "CMS Development"],
        supportingSkills: ["SEO", "Performance Optimization", "UI/UX Understanding", "API Integration", "Git"],
        howYouEarn: [
          "Landing pages (₹10000-40000)",
          "Business websites (₹30000-150000)",
          "E-commerce sites (₹50000-300000)",
          "Website maintenance (₹5000-20000/month)",
          "Bug fixes (₹2000-15000)"
        ],
        taskExamples: [
          { title: "React business website", description: "Build 8-page business website from Figma designs with contact form.", budgetRange: "₹40,000 - ₹80,000", duration: "2-3 weeks", skillTags: ["React", "Business", "Figma to Code"] },
          { title: "WordPress optimization", description: "Speed up slow WordPress site and fix mobile responsiveness.", budgetRange: "₹15,000 - ₹30,000", duration: "1 week", skillTags: ["WordPress", "Performance", "Mobile"] },
          { title: "Landing page development", description: "High-converting landing page with A/B testing integration.", budgetRange: "₹15,000 - ₹30,000", duration: "1 week", skillTags: ["Landing Page", "Conversion", "A/B Testing"] }
        ]
      },
      {
        name: "E-Commerce Development",
        slug: "e-commerce-development",
        description: "Build online stores that drive sales and provide seamless shopping experiences.",
        realTaskStatements: [
          "Build an online store for my products",
          "Migrate my store from WooCommerce to Shopify",
          "Add payment gateway to my website",
          "Create a multi-vendor marketplace",
          "Integrate inventory management system",
          "Fix checkout flow issues on my store"
        ],
        coreSkills: ["Shopify/WooCommerce/Magento", "Payment Integration", "Cart Development", "Inventory Systems", "E-commerce SEO"],
        supportingSkills: ["UX for E-commerce", "Analytics", "Security", "API Integration", "Database Management"],
        howYouEarn: [
          "Basic store setup (₹20000-60000)",
          "Custom e-commerce development (₹80000-400000)",
          "Platform migration (₹30000-100000)",
          "Payment integration (₹10000-40000)",
          "Ongoing maintenance (₹10000-40000/month)"
        ],
        taskExamples: [
          { title: "Shopify store setup", description: "Complete Shopify store with 50 products, payment, and shipping.", budgetRange: "₹30,000 - ₹60,000", duration: "2 weeks", skillTags: ["Shopify", "Setup", "Payment"] },
          { title: "Custom marketplace", description: "Multi-vendor marketplace like Etsy with seller dashboards.", budgetRange: "₹200,000 - ₹400,000", duration: "8-12 weeks", skillTags: ["Marketplace", "Multi-vendor", "Custom"] },
          { title: "WooCommerce to Shopify migration", description: "Migrate 500 products and order history to Shopify.", budgetRange: "₹40,000 - ₹80,000", duration: "2 weeks", skillTags: ["Migration", "WooCommerce", "Shopify"] }
        ]
      },
      {
        name: "App Development",
        slug: "app-development",
        description: "Build mobile applications for iOS and Android platforms.",
        realTaskStatements: [
          "Build an app for my startup idea",
          "Convert my website to a mobile app",
          "Add push notifications to my existing app",
          "Fix crashes and bugs in my app",
          "Build an MVP to test my concept",
          "Need a cross-platform app for iOS and Android"
        ],
        coreSkills: ["React Native/Flutter", "iOS (Swift)", "Android (Kotlin)", "API Integration", "App Architecture"],
        supportingSkills: ["UI/UX for Mobile", "Push Notifications", "App Store Optimization", "Testing", "Performance"],
        howYouEarn: [
          "MVP development (₹80000-250000)",
          "Full app development (₹200000-1000000)",
          "Feature additions (₹20000-100000)",
          "Bug fixes (₹5000-30000)",
          "App maintenance (₹20000-60000/month)"
        ],
        taskExamples: [
          { title: "Food delivery MVP", description: "Basic food ordering app with restaurant listing and cart.", budgetRange: "₹150,000 - ₹300,000", duration: "6-8 weeks", skillTags: ["MVP", "Food Delivery", "React Native"] },
          { title: "Fitness tracking app", description: "iOS app with workout logging, progress charts, and reminders.", budgetRange: "₹200,000 - ₹400,000", duration: "8-10 weeks", skillTags: ["Fitness", "iOS", "Health"] },
          { title: "Bug fixes for Flutter app", description: "Fix critical bugs causing crashes on Android devices.", budgetRange: "₹15,000 - ₹40,000", duration: "1 week", skillTags: ["Flutter", "Bug Fix", "Android"] }
        ]
      },
      {
        name: "Software Development",
        slug: "software-development",
        description: "Build custom software solutions for business needs.",
        realTaskStatements: [
          "Build a CRM tailored to my business",
          "Create an internal tool for my team",
          "Automate our manual workflows",
          "Build an inventory management system",
          "Need a booking/scheduling software",
          "Create a dashboard for our data"
        ],
        coreSkills: ["Backend Development", "Database Design", "API Development", "System Architecture", "Full-stack Development"],
        supportingSkills: ["Cloud Services", "Security", "DevOps", "Testing", "Documentation"],
        howYouEarn: [
          "Custom CRM/ERP (₹200000-1000000)",
          "Internal tools (₹50000-300000)",
          "Workflow automation (₹30000-150000)",
          "API development (₹40000-200000)",
          "Software maintenance (₹30000-100000/month)"
        ],
        taskExamples: [
          { title: "Custom CRM development", description: "Lead management CRM with pipeline, tasks, and reporting.", budgetRange: "₹200,000 - ₹400,000", duration: "8-12 weeks", skillTags: ["CRM", "Custom", "Sales"] },
          { title: "Employee management system", description: "Internal tool for attendance, leaves, and performance tracking.", budgetRange: "₹100,000 - ₹200,000", duration: "6-8 weeks", skillTags: ["HR", "Internal Tool", "Employee"] },
          { title: "Booking system", description: "Online appointment booking with calendar sync and payments.", budgetRange: "₹80,000 - ₹150,000", duration: "4-6 weeks", skillTags: ["Booking", "Calendar", "Payments"] }
        ]
      },
      {
        name: "AI Development",
        slug: "ai-development",
        description: "Build AI-powered features and applications.",
        realTaskStatements: [
          "Add AI chat to my customer support",
          "Build a recommendation engine for my app",
          "Create an AI that analyzes documents",
          "Integrate GPT into my application",
          "Build a custom AI model for my use case",
          "Add voice/speech recognition to my app"
        ],
        coreSkills: ["Machine Learning", "Python", "LLM Integration", "NLP", "AI APIs"],
        supportingSkills: ["Data Engineering", "Cloud AI Services", "Model Training", "Prompt Engineering", "Backend Development"],
        howYouEarn: [
          "AI chatbot integration (₹30000-150000)",
          "Custom AI features (₹50000-300000)",
          "ML model development (₹100000-500000)",
          "LLM application development (₹80000-400000)",
          "AI consulting (₹5000-20000/hour)"
        ],
        taskExamples: [
          { title: "AI customer support bot", description: "GPT-powered chatbot trained on our documentation.", budgetRange: "₹60,000 - ₹120,000", duration: "3-4 weeks", skillTags: ["Chatbot", "GPT", "Support"] },
          { title: "Product recommendation engine", description: "ML-based recommendations for e-commerce platform.", budgetRange: "₹100,000 - ₹200,000", duration: "6-8 weeks", skillTags: ["ML", "Recommendations", "E-commerce"] },
          { title: "Document analysis AI", description: "Extract and summarize information from PDFs and contracts.", budgetRange: "₹80,000 - ₹150,000", duration: "4-6 weeks", skillTags: ["NLP", "Document AI", "Extraction"] }
        ]
      },
      {
        name: "Automation",
        slug: "automation",
        description: "Automate repetitive tasks and streamline business processes.",
        realTaskStatements: [
          "Automate data entry from emails to spreadsheet",
          "Connect my apps to work together automatically",
          "Create automated reports that run daily",
          "Build a workflow that triggers on form submission",
          "Automate social media posting",
          "Set up automated email sequences"
        ],
        coreSkills: ["Zapier/Make", "Python Automation", "API Integration", "Workflow Design", "Scripting"],
        supportingSkills: ["Process Analysis", "Database Knowledge", "Cloud Functions", "Error Handling", "Documentation"],
        howYouEarn: [
          "Simple automations (₹5000-20000)",
          "Complex workflows (₹20000-80000)",
          "Process automation (₹30000-150000)",
          "Automation audits (₹10000-30000)",
          "Maintenance retainers (₹10000-30000/month)"
        ],
        taskExamples: [
          { title: "Lead capture automation", description: "Capture leads from multiple sources and add to CRM with scoring.", budgetRange: "₹15,000 - ₹30,000", duration: "1 week", skillTags: ["Lead Capture", "CRM", "Zapier"] },
          { title: "Report automation", description: "Daily automated reports combining data from 5 different sources.", budgetRange: "₹20,000 - ₹40,000", duration: "1-2 weeks", skillTags: ["Reporting", "Data", "Automation"] },
          { title: "E-commerce workflow", description: "Automate order processing, inventory updates, and notifications.", budgetRange: "₹30,000 - ₹60,000", duration: "2 weeks", skillTags: ["E-commerce", "Workflow", "Orders"] }
        ]
      },
      {
        name: "Chatbots",
        slug: "chatbots",
        description: "Build intelligent chatbots for customer service and engagement.",
        realTaskStatements: [
          "Create a WhatsApp bot for customer queries",
          "Build a chatbot for my website",
          "Need a bot that can book appointments",
          "Create an FAQ bot for our product",
          "Build a lead qualification chatbot",
          "Integrate chatbot with our CRM"
        ],
        coreSkills: ["Chatbot Platforms", "Conversation Design", "NLP Integration", "API Integration", "Dialog Flow"],
        supportingSkills: ["Customer Service Knowledge", "UX Writing", "Analytics", "Testing", "AI/ML Basics"],
        howYouEarn: [
          "Basic FAQ bots (₹15000-50000)",
          "Advanced conversational bots (₹50000-200000)",
          "WhatsApp/Telegram bots (₹30000-100000)",
          "Chatbot customization (₹10000-40000)",
          "Bot maintenance (₹10000-30000/month)"
        ],
        taskExamples: [
          { title: "WhatsApp business bot", description: "Customer service bot with FAQ, order tracking, and human handoff.", budgetRange: "₹40,000 - ₹80,000", duration: "2-3 weeks", skillTags: ["WhatsApp", "Customer Service", "Bot"] },
          { title: "Website lead bot", description: "Conversational bot that qualifies leads and books meetings.", budgetRange: "₹30,000 - ₹60,000", duration: "2 weeks", skillTags: ["Lead Gen", "Website", "Booking"] },
          { title: "E-commerce support bot", description: "Handle order queries, returns, and product recommendations.", budgetRange: "₹50,000 - ₹100,000", duration: "3 weeks", skillTags: ["E-commerce", "Support", "Returns"] }
        ]
      },
      {
        name: "Cloud & DevOps",
        slug: "cloud-devops",
        description: "Set up, manage, and optimize cloud infrastructure.",
        realTaskStatements: [
          "Migrate my app to AWS/GCP/Azure",
          "Set up CI/CD pipeline for our team",
          "My server costs are too high - optimize them",
          "Configure auto-scaling for traffic spikes",
          "Set up monitoring and alerting",
          "Dockerize my application"
        ],
        coreSkills: ["AWS/GCP/Azure", "Docker/Kubernetes", "CI/CD", "Linux Administration", "Infrastructure as Code"],
        supportingSkills: ["Networking", "Security", "Cost Optimization", "Monitoring", "Scripting"],
        howYouEarn: [
          "Cloud migration (₹50000-300000)",
          "CI/CD setup (₹30000-100000)",
          "Infrastructure optimization (₹40000-150000)",
          "DevOps consulting (₹5000-15000/hour)",
          "Managed DevOps (₹40000-150000/month)"
        ],
        taskExamples: [
          { title: "AWS migration", description: "Migrate monolithic app to AWS with proper architecture.", budgetRange: "₹100,000 - ₹200,000", duration: "4-6 weeks", skillTags: ["AWS", "Migration", "Architecture"] },
          { title: "CI/CD pipeline setup", description: "Complete GitHub Actions pipeline with testing and deployment.", budgetRange: "₹40,000 - ₹80,000", duration: "2 weeks", skillTags: ["CI/CD", "GitHub", "Automation"] },
          { title: "Cost optimization", description: "Audit and reduce monthly AWS spend (currently $5000/month).", budgetRange: "₹50,000 - ₹100,000", duration: "2 weeks", skillTags: ["AWS", "Cost", "Optimization"] }
        ]
      },
      {
        name: "Cybersecurity",
        slug: "cybersecurity",
        description: "Protect applications and data from security threats.",
        realTaskStatements: [
          "Test my application for security vulnerabilities",
          "We had a breach - help us recover and secure",
          "Set up security best practices for our startup",
          "Conduct security audit of our systems",
          "Implement authentication and authorization properly",
          "Help us become compliant with security standards"
        ],
        coreSkills: ["Penetration Testing", "Security Auditing", "Vulnerability Assessment", "Incident Response", "Compliance"],
        supportingSkills: ["Networking", "Scripting", "Cloud Security", "Documentation", "Risk Assessment"],
        howYouEarn: [
          "Security audit (₹50000-200000)",
          "Penetration testing (₹80000-300000)",
          "Incident response (₹30000-150000)",
          "Security consulting (₹5000-20000/hour)",
          "Managed security (₹50000-200000/month)"
        ],
        taskExamples: [
          { title: "Web app penetration test", description: "Full security assessment of our e-commerce platform.", budgetRange: "₹80,000 - ₹150,000", duration: "2 weeks", skillTags: ["Pentest", "Web App", "E-commerce"] },
          { title: "Security audit for startup", description: "Assess and improve security posture for Series A startup.", budgetRange: "₹100,000 - ₹200,000", duration: "3 weeks", skillTags: ["Audit", "Startup", "Compliance"] },
          { title: "Incident response", description: "Help recover from data breach and prevent future incidents.", budgetRange: "₹100,000 - ₹250,000", duration: "2-4 weeks", skillTags: ["Incident", "Breach", "Recovery"] }
        ]
      },
      {
        name: "Blockchain",
        slug: "blockchain",
        description: "Build blockchain applications, smart contracts, and Web3 solutions.",
        realTaskStatements: [
          "Create a smart contract for my token",
          "Build an NFT marketplace",
          "Audit my smart contract for vulnerabilities",
          "Integrate crypto payments into my app",
          "Build a DeFi application",
          "Create a DAO for our community"
        ],
        coreSkills: ["Solidity/Rust", "Smart Contracts", "Web3 Development", "DeFi Protocols", "Blockchain Architecture"],
        supportingSkills: ["Frontend (React)", "Security", "Tokenomics", "Community Building", "Documentation"],
        howYouEarn: [
          "Smart contract development (₹50000-300000)",
          "NFT projects (₹100000-500000)",
          "Smart contract audit (₹80000-400000)",
          "DeFi development (₹200000-1000000)",
          "Blockchain consulting (₹5000-25000/hour)"
        ],
        taskExamples: [
          { title: "ERC-20 token creation", description: "Create and deploy token with vesting and staking features.", budgetRange: "₹80,000 - ₹150,000", duration: "2-3 weeks", skillTags: ["Token", "ERC-20", "Staking"] },
          { title: "NFT marketplace", description: "Build NFT marketplace with minting, buying, and auctions.", budgetRange: "₹200,000 - ₹400,000", duration: "6-8 weeks", skillTags: ["NFT", "Marketplace", "Web3"] },
          { title: "Smart contract audit", description: "Security audit of DeFi protocol smart contracts.", budgetRange: "₹150,000 - ₹300,000", duration: "2-3 weeks", skillTags: ["Audit", "Security", "DeFi"] }
        ]
      },
      {
        name: "Game Development",
        slug: "game-development",
        description: "Create games for mobile, web, and desktop platforms.",
        realTaskStatements: [
          "Build a simple mobile game for my brand",
          "Create educational games for kids",
          "Need a multiplayer game backend",
          "Port my game to another platform",
          "Create game assets and animations",
          "Fix performance issues in my Unity game"
        ],
        coreSkills: ["Unity/Unreal", "Game Design", "C#/C++", "Mobile Game Dev", "Multiplayer Networking"],
        supportingSkills: ["3D Modeling", "Animation", "Sound Design", "UI/UX for Games", "Monetization"],
        howYouEarn: [
          "Casual games (₹100000-500000)",
          "Educational games (₹150000-600000)",
          "Game features (₹30000-150000)",
          "Multiplayer systems (₹100000-400000)",
          "Game maintenance (₹30000-100000/month)"
        ],
        taskExamples: [
          { title: "Branded mobile game", description: "Simple puzzle game with brand integration for marketing.", budgetRange: "₹150,000 - ₹300,000", duration: "6-8 weeks", skillTags: ["Mobile", "Puzzle", "Branded"] },
          { title: "Educational kids game", description: "Math learning game for ages 5-8 with progress tracking.", budgetRange: "₹200,000 - ₹400,000", duration: "8-10 weeks", skillTags: ["Educational", "Kids", "Math"] },
          { title: "Unity game optimization", description: "Improve frame rate and loading times for existing game.", budgetRange: "₹40,000 - ₹80,000", duration: "2 weeks", skillTags: ["Unity", "Performance", "Optimization"] }
        ]
      }
    ]
  },
  {
    name: "Digital Marketing",
    slug: "digital-marketing",
    description: "Grow businesses through strategic online marketing and advertising.",
    icon: "TrendingUp",
    color: "from-green-500 to-emerald-600",
    subCategories: [
      {
        name: "SEO",
        slug: "seo",
        description: "Improve search engine rankings and drive organic traffic.",
        realTaskStatements: [
          "My website doesn't show up on Google",
          "Need to rank higher for my target keywords",
          "Do a complete SEO audit of my site",
          "Build backlinks to improve authority",
          "Optimize my e-commerce site for search",
          "Fix technical SEO issues hurting my rankings"
        ],
        coreSkills: ["On-page SEO", "Technical SEO", "Link Building", "Keyword Research", "SEO Tools (Ahrefs, SEMrush)"],
        supportingSkills: ["Content Strategy", "Analytics", "HTML/CSS Basics", "Local SEO", "Competitor Analysis"],
        howYouEarn: [
          "SEO audit (₹15000-60000)",
          "Monthly SEO retainer (₹20000-100000/month)",
          "Link building campaigns (₹30000-150000)",
          "Technical SEO fixes (₹20000-80000)",
          "Local SEO setup (₹15000-50000)"
        ],
        taskExamples: [
          { title: "Complete SEO audit", description: "Technical, on-page, and content audit with action plan.", budgetRange: "₹25,000 - ₹50,000", duration: "1 week", skillTags: ["SEO Audit", "Technical", "Strategy"] },
          { title: "Link building campaign", description: "Acquire 20 high-quality backlinks for SaaS website.", budgetRange: "₹50,000 - ₹100,000", duration: "1 month", skillTags: ["Link Building", "Outreach", "SaaS"] },
          { title: "E-commerce SEO optimization", description: "Optimize 100 product pages for search visibility.", budgetRange: "₹40,000 - ₹80,000", duration: "2-3 weeks", skillTags: ["E-commerce", "Product SEO", "On-page"] }
        ]
      },
      {
        name: "GEO",
        slug: "geo",
        description: "Generative Engine Optimization - optimize for AI search and LLMs.",
        realTaskStatements: [
          "Make my brand appear in ChatGPT recommendations",
          "Optimize content for AI-powered search",
          "How do I rank in Perplexity and Gemini?",
          "Create content strategy for LLM visibility",
          "Audit my brand's presence in AI responses",
          "Build authority that AI systems recognize"
        ],
        coreSkills: ["AI Search Optimization", "Content Strategy", "Structured Data", "Entity Building", "Citation Optimization"],
        supportingSkills: ["Traditional SEO", "Content Creation", "PR/Digital PR", "Analytics", "Research"],
        howYouEarn: [
          "GEO audit (₹20000-60000)",
          "GEO strategy (₹30000-100000)",
          "Content optimization for AI (₹25000-80000/month)",
          "Entity building (₹40000-150000)",
          "Consulting (₹5000-15000/hour)"
        ],
        taskExamples: [
          { title: "GEO audit", description: "Analyze brand visibility across ChatGPT, Perplexity, and Gemini.", budgetRange: "₹25,000 - ₹50,000", duration: "1 week", skillTags: ["GEO", "AI Search", "Audit"] },
          { title: "AI search optimization", description: "Optimize website and content to appear in AI recommendations.", budgetRange: "₹50,000 - ₹100,000", duration: "1 month", skillTags: ["GEO", "Content", "Optimization"] },
          { title: "Entity and authority building", description: "Build brand authority recognized by AI systems.", budgetRange: "₹80,000 - ₹150,000", duration: "2-3 months", skillTags: ["Entity", "Authority", "Digital PR"] }
        ]
      },
      {
        name: "Social Media Marketing",
        slug: "social-media-marketing",
        description: "Build brand presence and engagement on social platforms.",
        realTaskStatements: [
          "Manage my brand's social media accounts",
          "Create a content strategy for Instagram",
          "Grow my LinkedIn following organically",
          "Build an engaged community on Twitter",
          "Create viral content for my brand",
          "Need a social media calendar and strategy"
        ],
        coreSkills: ["Platform Expertise", "Content Strategy", "Community Management", "Social Analytics", "Trend Awareness"],
        supportingSkills: ["Copywriting", "Graphic Design", "Video Editing", "Influencer Relations", "Customer Service"],
        howYouEarn: [
          "Social media management (₹20000-100000/month)",
          "Strategy development (₹25000-80000)",
          "Content creation (₹15000-60000/month)",
          "Community building (₹20000-80000/month)",
          "Platform-specific growth (₹30000-100000)"
        ],
        taskExamples: [
          { title: "Instagram growth strategy", description: "Strategy to grow from 5K to 50K followers organically.", budgetRange: "₹30,000 - ₹60,000", duration: "Strategy + 1 month", skillTags: ["Instagram", "Growth", "Organic"] },
          { title: "Full social media management", description: "Manage Instagram, LinkedIn, and Twitter with daily content.", budgetRange: "₹50,000 - ₹100,000", duration: "Per month", skillTags: ["Management", "Multi-platform", "Content"] },
          { title: "LinkedIn thought leadership", description: "Build founder's personal brand on LinkedIn.", budgetRange: "₹40,000 - ₹80,000", duration: "Per month", skillTags: ["LinkedIn", "Personal Brand", "Founder"] }
        ]
      },
      {
        name: "Paid Advertising",
        slug: "paid-advertising",
        description: "Run profitable ad campaigns on Google, Facebook, and other platforms.",
        realTaskStatements: [
          "Set up Google Ads for my business",
          "My Facebook ads aren't profitable - fix them",
          "Create and manage ad campaigns for product launch",
          "Reduce my cost per acquisition",
          "Scale my ads while maintaining ROAS",
          "Need help with retargeting campaigns"
        ],
        coreSkills: ["Google Ads", "Facebook/Meta Ads", "Campaign Strategy", "Analytics", "A/B Testing"],
        supportingSkills: ["Copywriting", "Landing Page Optimization", "Audience Research", "Budget Management", "Creative Strategy"],
        howYouEarn: [
          "Campaign setup (₹15000-50000)",
          "Monthly management (₹25000-150000/month)",
          "Audit and optimization (₹20000-60000)",
          "Platform-specific expertise (₹30000-100000)",
          "Consulting (₹3000-10000/hour)"
        ],
        taskExamples: [
          { title: "Google Ads setup", description: "Complete Google Ads setup for e-commerce with search and shopping.", budgetRange: "₹25,000 - ₹50,000", duration: "1-2 weeks", skillTags: ["Google Ads", "E-commerce", "Setup"] },
          { title: "Facebook ads optimization", description: "Audit and improve failing Facebook campaigns for D2C brand.", budgetRange: "₹30,000 - ₹60,000", duration: "2 weeks", skillTags: ["Facebook Ads", "D2C", "Optimization"] },
          { title: "Full-funnel ad management", description: "Manage Google and Meta ads with $10K/month budget.", budgetRange: "₹50,000 - ₹80,000", duration: "Per month", skillTags: ["Multi-platform", "Full-funnel", "Management"] }
        ]
      },
      {
        name: "Content Marketing",
        slug: "content-marketing",
        description: "Create valuable content that attracts and converts customers.",
        realTaskStatements: [
          "Create a content strategy for my blog",
          "Write SEO-optimized articles for my site",
          "Build a content calendar for the quarter",
          "Create lead magnets that convert",
          "Repurpose my content across channels",
          "Need case studies and whitepapers"
        ],
        coreSkills: ["Content Strategy", "SEO Writing", "Editorial Planning", "Content Distribution", "Analytics"],
        supportingSkills: ["Copywriting", "Research", "Social Media", "Email Marketing", "Design Basics"],
        howYouEarn: [
          "Content strategy (₹30000-100000)",
          "Blog posts (₹3000-15000/post)",
          "Monthly content retainer (₹40000-200000/month)",
          "Lead magnets (₹15000-50000)",
          "Case studies (₹20000-60000)"
        ],
        taskExamples: [
          { title: "Content strategy development", description: "3-month content strategy with topics, calendar, and KPIs.", budgetRange: "₹40,000 - ₹80,000", duration: "2 weeks", skillTags: ["Strategy", "Planning", "Content"] },
          { title: "SEO blog content", description: "8 long-form SEO articles per month for SaaS blog.", budgetRange: "₹60,000 - ₹100,000", duration: "Per month", skillTags: ["SEO", "Blog", "SaaS"] },
          { title: "Lead magnet creation", description: "Create ebook and checklist as lead magnets with landing page copy.", budgetRange: "₹25,000 - ₹50,000", duration: "2 weeks", skillTags: ["Lead Magnet", "Ebook", "Conversion"] }
        ]
      },
      {
        name: "Email Marketing",
        slug: "email-marketing",
        description: "Build and nurture email lists that drive conversions.",
        realTaskStatements: [
          "Set up email automation for my e-commerce",
          "Design email templates for my campaigns",
          "Write email sequences that convert",
          "Improve my email open and click rates",
          "Build a newsletter strategy",
          "Migrate to a new email platform"
        ],
        coreSkills: ["Email Automation", "Copywriting", "Segmentation", "A/B Testing", "Email Platforms (Mailchimp, Klaviyo)"],
        supportingSkills: ["Design", "Analytics", "List Management", "Deliverability", "CRM Integration"],
        howYouEarn: [
          "Email setup and flows (₹20000-80000)",
          "Monthly management (₹20000-80000/month)",
          "Email copywriting (₹2000-8000/email)",
          "Template design (₹5000-20000/template)",
          "Platform migration (₹20000-60000)"
        ],
        taskExamples: [
          { title: "E-commerce email flows", description: "Set up welcome, abandoned cart, and post-purchase flows.", budgetRange: "₹40,000 - ₹80,000", duration: "2 weeks", skillTags: ["E-commerce", "Automation", "Flows"] },
          { title: "Newsletter strategy and setup", description: "Weekly newsletter with content strategy and template.", budgetRange: "₹30,000 - ₹60,000", duration: "2 weeks + ongoing", skillTags: ["Newsletter", "Strategy", "Content"] },
          { title: "Email campaign optimization", description: "Audit and optimize existing campaigns for better performance.", budgetRange: "₹25,000 - ₹50,000", duration: "1-2 weeks", skillTags: ["Optimization", "A/B Testing", "Conversion"] }
        ]
      },
      {
        name: "Influencer Marketing",
        slug: "influencer-marketing",
        description: "Partner with influencers to reach and engage target audiences.",
        realTaskStatements: [
          "Find influencers for my product launch",
          "Manage influencer campaigns end-to-end",
          "Create an influencer marketing strategy",
          "Negotiate deals with creators",
          "Track and measure influencer ROI",
          "Build long-term influencer partnerships"
        ],
        coreSkills: ["Influencer Research", "Campaign Management", "Negotiation", "Relationship Building", "ROI Tracking"],
        supportingSkills: ["Content Strategy", "Social Media Knowledge", "Analytics", "Contract Management", "Trend Awareness"],
        howYouEarn: [
          "Influencer research (₹15000-50000)",
          "Campaign management (₹40000-200000)",
          "Strategy development (₹30000-100000)",
          "Ongoing management (₹50000-200000/month)",
          "Performance-based fees (10-20% of spend)"
        ],
        taskExamples: [
          { title: "Product launch campaign", description: "Find and manage 20 influencers for new skincare launch.", budgetRange: "₹80,000 - ₹150,000", duration: "1 month", skillTags: ["Launch", "Beauty", "Campaign"] },
          { title: "Influencer identification", description: "Curated list of 50 relevant micro-influencers with data.", budgetRange: "₹20,000 - ₹40,000", duration: "1 week", skillTags: ["Research", "Micro-influencers", "Data"] },
          { title: "Ambassador program", description: "Set up ongoing brand ambassador program with 10 creators.", budgetRange: "₹100,000 - ₹200,000", duration: "2 months", skillTags: ["Ambassador", "Long-term", "Program"] }
        ]
      },
      {
        name: "Marketing Automation",
        slug: "marketing-automation",
        description: "Automate marketing workflows for efficiency and scale.",
        realTaskStatements: [
          "Set up HubSpot/Marketo for my company",
          "Create automated lead nurturing workflows",
          "Integrate marketing tools with CRM",
          "Build scoring and qualification automation",
          "Automate reporting and dashboards",
          "Migrate to a new marketing automation platform"
        ],
        coreSkills: ["HubSpot/Marketo/Pardot", "Workflow Automation", "CRM Integration", "Lead Scoring", "Analytics"],
        supportingSkills: ["Email Marketing", "Data Management", "Segmentation", "API Knowledge", "Strategy"],
        howYouEarn: [
          "Platform setup (₹50000-200000)",
          "Workflow creation (₹20000-80000)",
          "Integration projects (₹30000-120000)",
          "Ongoing management (₹40000-150000/month)",
          "Training and consulting (₹5000-15000/hour)"
        ],
        taskExamples: [
          { title: "HubSpot implementation", description: "Complete HubSpot setup with workflows, scoring, and reporting.", budgetRange: "₹100,000 - ₹200,000", duration: "4-6 weeks", skillTags: ["HubSpot", "Setup", "Automation"] },
          { title: "Lead nurturing automation", description: "Create multi-stage nurturing workflows for B2B sales.", budgetRange: "₹40,000 - ₹80,000", duration: "2-3 weeks", skillTags: ["Nurturing", "B2B", "Workflows"] },
          { title: "Marketing-sales integration", description: "Connect marketing automation with Salesforce CRM.", budgetRange: "₹60,000 - ₹120,000", duration: "3-4 weeks", skillTags: ["Integration", "Salesforce", "CRM"] }
        ]
      },
      {
        name: "CRO",
        slug: "cro",
        description: "Conversion Rate Optimization - turn more visitors into customers.",
        realTaskStatements: [
          "My landing page doesn't convert - help!",
          "Run A/B tests to improve conversion",
          "Audit my website for conversion issues",
          "Optimize checkout flow for more sales",
          "Improve lead generation form performance",
          "Reduce bounce rate on key pages"
        ],
        coreSkills: ["A/B Testing", "Analytics", "User Research", "Landing Page Optimization", "Data Analysis"],
        supportingSkills: ["UX Knowledge", "Copywriting", "Psychology", "Heatmaps/Session Recording", "Statistical Analysis"],
        howYouEarn: [
          "Conversion audit (₹20000-60000)",
          "A/B testing program (₹40000-150000/month)",
          "Landing page optimization (₹25000-80000)",
          "Checkout optimization (₹40000-120000)",
          "Consulting (₹5000-15000/hour)"
        ],
        taskExamples: [
          { title: "E-commerce CRO audit", description: "Full conversion audit of e-commerce site with recommendations.", budgetRange: "₹30,000 - ₹60,000", duration: "1-2 weeks", skillTags: ["Audit", "E-commerce", "Conversion"] },
          { title: "Landing page optimization", description: "A/B testing program for high-traffic landing pages.", budgetRange: "₹50,000 - ₹100,000", duration: "Per month", skillTags: ["Landing Page", "A/B Testing", "Optimization"] },
          { title: "Checkout flow optimization", description: "Reduce cart abandonment through UX improvements.", budgetRange: "₹40,000 - ₹80,000", duration: "3-4 weeks", skillTags: ["Checkout", "Cart", "UX"] }
        ]
      },
      {
        name: "Affiliate Marketing",
        slug: "affiliate-marketing",
        description: "Build and manage affiliate programs that drive sales.",
        realTaskStatements: [
          "Set up an affiliate program for my product",
          "Recruit quality affiliates for my program",
          "Manage existing affiliate relationships",
          "Create affiliate marketing strategy",
          "Track and optimize affiliate performance",
          "Build affiliate landing pages and creatives"
        ],
        coreSkills: ["Affiliate Platforms", "Recruitment", "Program Management", "Performance Tracking", "Relationship Management"],
        supportingSkills: ["Marketing Strategy", "Analytics", "Negotiation", "Content Creation", "Compliance"],
        howYouEarn: [
          "Program setup (₹30000-100000)",
          "Affiliate recruitment (₹20000-80000)",
          "Ongoing management (₹40000-150000/month)",
          "Strategy development (₹25000-80000)",
          "Performance-based fees (5-15% of revenue)"
        ],
        taskExamples: [
          { title: "Affiliate program setup", description: "Set up affiliate program with tracking, payouts, and portal.", budgetRange: "₹50,000 - ₹100,000", duration: "2-3 weeks", skillTags: ["Setup", "Platform", "Tracking"] },
          { title: "Affiliate recruitment", description: "Identify and recruit 50 quality affiliates for SaaS product.", budgetRange: "₹40,000 - ₹80,000", duration: "1 month", skillTags: ["Recruitment", "Outreach", "SaaS"] },
          { title: "Program optimization", description: "Audit and optimize underperforming affiliate program.", budgetRange: "₹30,000 - ₹60,000", duration: "2 weeks", skillTags: ["Optimization", "Audit", "Performance"] }
        ]
      }
    ]
  },
  {
    name: "Video & Animation",
    slug: "video-animation",
    description: "Create compelling video content that captures attention and drives action.",
    icon: "Video",
    color: "from-red-500 to-orange-600",
    subCategories: [
      {
        name: "Video Editing",
        slug: "video-editing",
        description: "Professional video editing for all types of content.",
        realTaskStatements: [
          "Edit my YouTube videos professionally",
          "Create engaging social media video clips",
          "Edit footage from my event/wedding",
          "Add graphics and effects to my video",
          "Create a highlight reel from raw footage",
          "Edit my podcast into video format"
        ],
        coreSkills: ["Premiere Pro/Final Cut", "Color Grading", "Audio Sync", "Pacing & Storytelling", "Motion Graphics"],
        supportingSkills: ["Sound Design", "Thumbnail Creation", "Subtitling", "Format Optimization", "Trend Awareness"],
        howYouEarn: [
          "Short-form editing (₹1000-5000/video)",
          "Long-form editing (₹5000-25000/video)",
          "Monthly retainer (₹30000-150000/month)",
          "Event footage editing (₹20000-80000)",
          "Rush delivery premium (25-50% extra)"
        ],
        taskExamples: [
          { title: "YouTube video editing", description: "Edit 20-30 min video with graphics, music, and captions.", budgetRange: "₹8,000 - ₹15,000", duration: "3-5 days", skillTags: ["YouTube", "Long-form", "Graphics"] },
          { title: "Weekly content package", description: "Edit 8 short-form videos per week for social media.", budgetRange: "₹40,000 - ₹70,000", duration: "Per month", skillTags: ["Short-form", "Social", "Package"] },
          { title: "Wedding video edit", description: "Create 10-min highlight film from 8 hours of footage.", budgetRange: "₹25,000 - ₹50,000", duration: "2 weeks", skillTags: ["Wedding", "Highlight", "Cinematic"] }
        ]
      },
      {
        name: "Motion Graphics",
        slug: "motion-graphics",
        description: "Create animated graphics and visual effects.",
        realTaskStatements: [
          "Create animated logo for my brand",
          "Add motion graphics to my video",
          "Design animated social media content",
          "Create kinetic typography video",
          "Design animated infographics",
          "Build animated presentation visuals"
        ],
        coreSkills: ["After Effects", "Animation Principles", "Typography Animation", "Visual Effects", "Compositing"],
        supportingSkills: ["Illustration", "3D Basics", "Sound Sync", "Storyboarding", "Brand Understanding"],
        howYouEarn: [
          "Logo animation (₹5000-25000)",
          "Motion graphics video (₹15000-80000)",
          "Social media animations (₹3000-15000)",
          "Infographic animation (₹10000-40000)",
          "Lower thirds/graphics pack (₹10000-40000)"
        ],
        taskExamples: [
          { title: "Animated logo", description: "Create 5-second animated logo reveal for video intros.", budgetRange: "₹8,000 - ₹15,000", duration: "3-5 days", skillTags: ["Logo", "Animation", "Intro"] },
          { title: "Data visualization video", description: "Animate company statistics and achievements.", budgetRange: "₹25,000 - ₹50,000", duration: "1-2 weeks", skillTags: ["Data", "Infographic", "Corporate"] },
          { title: "Social media pack", description: "10 animated templates for Instagram stories.", budgetRange: "₹20,000 - ₹40,000", duration: "1 week", skillTags: ["Social", "Templates", "Instagram"] }
        ]
      },
      {
        name: "Explainer Videos",
        slug: "explainer-videos",
        description: "Create videos that explain products, services, or concepts clearly.",
        realTaskStatements: [
          "Create an explainer video for my SaaS product",
          "Make a video explaining our services",
          "Animated video for our mobile app",
          "Training videos for our employees",
          "Explainer for complex technical concept",
          "Onboarding video for new customers"
        ],
        coreSkills: ["Scriptwriting", "Storyboarding", "Animation", "Voice-over Direction", "Storytelling"],
        supportingSkills: ["Motion Graphics", "Character Animation", "Sound Design", "Brand Alignment", "Pacing"],
        howYouEarn: [
          "60-second explainer (₹30000-80000)",
          "2-3 minute explainer (₹60000-150000)",
          "Whiteboard animation (₹25000-60000)",
          "Screencast explainer (₹15000-40000)",
          "Series of videos (package pricing)"
        ],
        taskExamples: [
          { title: "SaaS product explainer", description: "90-second animated explainer for B2B software.", budgetRange: "₹50,000 - ₹100,000", duration: "2-3 weeks", skillTags: ["SaaS", "B2B", "Animation"] },
          { title: "App walkthrough", description: "2-minute video showing mobile app features and benefits.", budgetRange: "₹40,000 - ₹80,000", duration: "2 weeks", skillTags: ["App", "Walkthrough", "Features"] },
          { title: "Training video series", description: "5 training videos for employee onboarding.", budgetRange: "₹100,000 - ₹200,000", duration: "4-6 weeks", skillTags: ["Training", "Series", "Corporate"] }
        ]
      },
      {
        name: "Animation",
        slug: "animation",
        description: "Bring characters and stories to life through animation.",
        realTaskStatements: [
          "Create animated characters for my brand",
          "Make an animated short film",
          "Animate my children's book",
          "Create animated series for YouTube",
          "Character animation for game/app",
          "2D animation for music video"
        ],
        coreSkills: ["2D Animation", "Character Animation", "Rigging", "Storyboarding", "Animation Software"],
        supportingSkills: ["Illustration", "Sound Design", "Voice Acting Direction", "Storytelling", "Timing"],
        howYouEarn: [
          "Character design + animation (₹25000-100000)",
          "Short animation (₹50000-200000)",
          "Animated series episodes (₹80000-300000/episode)",
          "Music video animation (₹100000-400000)",
          "Loop/GIF animation (₹5000-20000)"
        ],
        taskExamples: [
          { title: "Brand character animation", description: "Animate mascot character with 5 expressions and actions.", budgetRange: "₹40,000 - ₹80,000", duration: "2 weeks", skillTags: ["Character", "Mascot", "Brand"] },
          { title: "Animated music video", description: "3-minute 2D animated music video for indie artist.", budgetRange: "₹150,000 - ₹300,000", duration: "6-8 weeks", skillTags: ["Music Video", "2D", "Indie"] },
          { title: "Children's content series", description: "5 episodes of 3-minute educational animation.", budgetRange: "₹250,000 - ₹500,000", duration: "10-12 weeks", skillTags: ["Educational", "Kids", "Series"] }
        ]
      },
      {
        name: "Product Videos",
        slug: "product-videos",
        description: "Showcase products through compelling video content.",
        realTaskStatements: [
          "Create a product demo video",
          "Make 360-degree product showcase",
          "Shoot and edit product for e-commerce",
          "Create unboxing style video",
          "Comparison video with competitors",
          "Lifestyle product video for ads"
        ],
        coreSkills: ["Product Videography", "Lighting", "Product Staging", "Post-production", "Commercial Storytelling"],
        supportingSkills: ["3D Animation", "Sound Design", "Copywriting", "Platform Optimization", "Color Grading"],
        howYouEarn: [
          "Simple product video (₹15000-50000)",
          "Commercial quality video (₹50000-200000)",
          "E-commerce product videos (₹5000-20000/product)",
          "3D product animation (₹40000-150000)",
          "Campaign video series (package pricing)"
        ],
        taskExamples: [
          { title: "E-commerce product videos", description: "30-second videos for 10 products with lifestyle shots.", budgetRange: "₹80,000 - ₹150,000", duration: "2 weeks", skillTags: ["E-commerce", "Lifestyle", "Batch"] },
          { title: "Tech product demo", description: "2-minute demo video for new gadget launch.", budgetRange: "₹60,000 - ₹120,000", duration: "2 weeks", skillTags: ["Tech", "Demo", "Launch"] },
          { title: "3D product animation", description: "Photorealistic 3D animation of product with exploded view.", budgetRange: "₹80,000 - ₹150,000", duration: "2-3 weeks", skillTags: ["3D", "Technical", "Animation"] }
        ]
      },
      {
        name: "Corporate Videos",
        slug: "corporate-videos",
        description: "Professional video content for corporate communication.",
        realTaskStatements: [
          "Create a company culture video",
          "Make a corporate presentation video",
          "Video for our annual conference",
          "CEO message video production",
          "CSR initiative documentation",
          "Corporate anniversary celebration video"
        ],
        coreSkills: ["Corporate Videography", "Interview Techniques", "Script Development", "Professional Editing", "Brand Alignment"],
        supportingSkills: ["Motion Graphics", "Voice-over Production", "Drone Footage", "Event Coverage", "Storytelling"],
        howYouEarn: [
          "Corporate interviews (₹30000-80000)",
          "Company profile video (₹80000-300000)",
          "Event coverage (₹50000-200000)",
          "Internal communication videos (₹30000-100000)",
          "Annual report video (₹100000-400000)"
        ],
        taskExamples: [
          { title: "Company culture video", description: "3-minute video showcasing workplace culture for recruiting.", budgetRange: "₹100,000 - ₹200,000", duration: "3-4 weeks", skillTags: ["Culture", "Recruiting", "Corporate"] },
          { title: "Annual conference coverage", description: "Full-day event coverage with highlight reel.", budgetRange: "₹80,000 - ₹150,000", duration: "2 weeks post-event", skillTags: ["Event", "Conference", "Coverage"] },
          { title: "Leadership message series", description: "Quarterly CEO update videos - 4 per year.", budgetRange: "₹60,000 - ₹100,000", duration: "Per quarter", skillTags: ["Leadership", "CEO", "Communication"] }
        ]
      },
      {
        name: "UGC Videos",
        slug: "ugc-videos",
        description: "Create authentic user-generated style content for brands.",
        realTaskStatements: [
          "Create UGC-style videos for my ads",
          "Need testimonial-style product reviews",
          "Authentic content for TikTok/Reels",
          "Lifestyle content featuring my product",
          "Before/after transformation videos",
          "Day-in-the-life content with product integration"
        ],
        coreSkills: ["Authentic Content Creation", "Social Media Trends", "Product Integration", "Storytelling", "Platform Optimization"],
        supportingSkills: ["On-camera Presence", "Editing", "Scripting", "Trend Awareness", "Brand Voice"],
        howYouEarn: [
          "Single UGC video (₹5000-25000)",
          "Video package (₹30000-100000 for 5-10 videos)",
          "Monthly content creation (₹50000-150000/month)",
          "Testimonial videos (₹10000-30000)",
          "Platform-specific content (₹8000-20000/video)"
        ],
        taskExamples: [
          { title: "Product review UGC", description: "5 authentic-style review videos for skincare brand.", budgetRange: "₹30,000 - ₹60,000", duration: "1 week", skillTags: ["UGC", "Review", "Skincare"] },
          { title: "TikTok content package", description: "15 trending-style videos for monthly TikTok content.", budgetRange: "₹50,000 - ₹100,000", duration: "Per month", skillTags: ["TikTok", "Trending", "Package"] },
          { title: "Transformation content", description: "Before/after videos showing product results.", budgetRange: "₹25,000 - ₹50,000", duration: "1 week", skillTags: ["Transformation", "Results", "Authentic"] }
        ]
      },
      {
        name: "AI Video",
        slug: "ai-video",
        description: "Create videos using AI tools and technologies.",
        realTaskStatements: [
          "Create AI-generated videos for my content",
          "Use AI avatars for training videos",
          "AI voiceover for my videos",
          "Automate video creation for product listings",
          "Create multilingual versions with AI",
          "AI-enhanced video editing"
        ],
        coreSkills: ["AI Video Tools", "Prompt Engineering", "AI Avatar Platforms", "Video Editing", "AI Voice Synthesis"],
        supportingSkills: ["Traditional Video Editing", "Scripting", "Quality Control", "Tool Evaluation", "Workflow Design"],
        howYouEarn: [
          "AI video creation (₹5000-30000/video)",
          "AI avatar videos (₹8000-40000)",
          "Localization packages (₹20000-80000)",
          "Bulk AI video production (custom pricing)",
          "Workflow setup consulting (₹20000-60000)"
        ],
        taskExamples: [
          { title: "AI training video series", description: "10 training videos using AI avatars and voiceover.", budgetRange: "₹80,000 - ₹150,000", duration: "2 weeks", skillTags: ["AI Avatar", "Training", "Series"] },
          { title: "Product video automation", description: "AI workflow to generate videos from product data.", budgetRange: "₹50,000 - ₹100,000", duration: "2 weeks", skillTags: ["Automation", "Product", "Workflow"] },
          { title: "Multilingual video creation", description: "Create 5-language versions of existing video using AI.", budgetRange: "₹30,000 - ₹60,000", duration: "1 week", skillTags: ["Multilingual", "Localization", "AI Voice"] }
        ]
      }
    ]
  },
  // ============================================================
  // PART 3: Writing & Translation, Music & Audio, Business, Finance
  // ============================================================
  {
    name: "Writing & Translation",
    slug: "writing-translation",
    description: "Words that inform, persuade, and connect across languages and cultures.",
    icon: "PenTool",
    color: "from-amber-500 to-yellow-600",
    subCategories: [
      {
        name: "Content Writing",
        slug: "content-writing",
        description: "Create valuable written content that engages and informs audiences.",
        realTaskStatements: [
          "Write blog posts for my company website",
          "Need articles for my content marketing",
          "Create thought leadership content",
          "Write newsletter content weekly",
          "Need website copy that converts",
          "Create content for my industry publication"
        ],
        coreSkills: ["Blog Writing", "Article Writing", "Research", "SEO Writing", "Storytelling"],
        supportingSkills: ["Industry Knowledge", "Editing", "Content Strategy", "Interviewing", "Deadline Management"],
        howYouEarn: [
          "Blog posts (₹2000-10000/post)",
          "Long-form articles (₹5000-20000)",
          "Monthly content retainer (₹25000-100000/month)",
          "Website copy (₹15000-60000)",
          "Newsletter writing (₹3000-10000/issue)"
        ],
        taskExamples: [
          { title: "Tech blog content", description: "8 SEO-optimized blog posts per month for SaaS company.", budgetRange: "₹40,000 - ₹80,000", duration: "Per month", skillTags: ["Tech", "SEO", "Blog"] },
          { title: "Healthcare content", description: "Well-researched articles on medical topics for health portal.", budgetRange: "₹8,000 - ₹15,000", duration: "Per article", skillTags: ["Healthcare", "Research", "Medical"] },
          { title: "Startup website copy", description: "Complete website copy for 10-page startup site.", budgetRange: "₹30,000 - ₹60,000", duration: "2 weeks", skillTags: ["Website", "Startup", "Conversion"] }
        ]
      },
      {
        name: "Copywriting",
        slug: "copywriting",
        description: "Persuasive writing that drives action and conversions.",
        realTaskStatements: [
          "Write copy for my landing page that converts",
          "Create ad copy for my campaigns",
          "Need email sequences that sell",
          "Write product descriptions that convert",
          "Sales page copy for my course launch",
          "Taglines and slogans for my brand"
        ],
        coreSkills: ["Persuasive Writing", "Sales Copy", "Ad Copywriting", "Email Copy", "Conversion Optimization"],
        supportingSkills: ["Consumer Psychology", "A/B Testing", "Brand Voice", "Research", "Editing"],
        howYouEarn: [
          "Landing page copy (₹10000-50000)",
          "Ad copy sets (₹5000-25000)",
          "Email sequences (₹15000-60000)",
          "Sales pages (₹25000-100000)",
          "Product descriptions (₹500-2000/product)"
        ],
        taskExamples: [
          { title: "High-converting landing page", description: "Landing page copy for SaaS product launch.", budgetRange: "₹20,000 - ₹40,000", duration: "1 week", skillTags: ["Landing Page", "SaaS", "Conversion"] },
          { title: "Facebook ad copy", description: "20 ad variations for e-commerce campaign.", budgetRange: "₹15,000 - ₹30,000", duration: "1 week", skillTags: ["Ads", "E-commerce", "Facebook"] },
          { title: "Course sales page", description: "Long-form sales page for online course launch.", budgetRange: "₹40,000 - ₹80,000", duration: "2 weeks", skillTags: ["Sales Page", "Course", "Long-form"] }
        ]
      },
      {
        name: "SEO Writing",
        slug: "seo-writing",
        description: "Content optimized for search engines without sacrificing readability.",
        realTaskStatements: [
          "Write content that ranks on Google",
          "Create SEO-optimized product descriptions",
          "Need pillar content and topic clusters",
          "Optimize existing content for better rankings",
          "Write meta titles and descriptions",
          "Create SEO content strategy"
        ],
        coreSkills: ["Keyword Research", "On-page SEO", "Content Optimization", "Search Intent", "SEO Tools"],
        supportingSkills: ["Content Writing", "Analytics", "Competitor Analysis", "Link Building Basics", "Technical SEO Understanding"],
        howYouEarn: [
          "SEO articles (₹3000-12000/article)",
          "Product SEO descriptions (₹300-1000/product)",
          "Content optimization (₹2000-8000/article)",
          "Meta content (₹100-500/page)",
          "SEO content strategy (₹25000-80000)"
        ],
        taskExamples: [
          { title: "SEO blog strategy", description: "Create 20 SEO-optimized articles targeting specific keywords.", budgetRange: "₹60,000 - ₹120,000", duration: "1 month", skillTags: ["SEO", "Blog", "Keywords"] },
          { title: "E-commerce SEO content", description: "SEO descriptions for 200 products.", budgetRange: "₹40,000 - ₹80,000", duration: "2 weeks", skillTags: ["E-commerce", "Product", "SEO"] },
          { title: "Content refresh", description: "Optimize 30 existing articles for better rankings.", budgetRange: "₹30,000 - ₹60,000", duration: "2 weeks", skillTags: ["Optimization", "Refresh", "Rankings"] }
        ]
      },
      {
        name: "Script Writing",
        slug: "script-writing",
        description: "Write scripts for videos, podcasts, and presentations.",
        realTaskStatements: [
          "Write scripts for my YouTube channel",
          "Need a podcast script outline",
          "Script for my explainer video",
          "Write dialogue for animated content",
          "Webinar presentation script",
          "Ad script for my commercial"
        ],
        coreSkills: ["Video Scripting", "Dialogue Writing", "Storytelling", "Pacing", "Format Knowledge"],
        supportingSkills: ["Research", "Voice Matching", "Audio/Visual Understanding", "Presentation Skills", "Editing"],
        howYouEarn: [
          "YouTube scripts (₹3000-15000/video)",
          "Explainer video scripts (₹5000-25000)",
          "Podcast outlines (₹2000-8000/episode)",
          "Ad scripts (₹5000-30000)",
          "Presentation scripts (₹10000-40000)"
        ],
        taskExamples: [
          { title: "YouTube video scripts", description: "Weekly scripts for educational YouTube channel.", budgetRange: "₹20,000 - ₹40,000", duration: "Per month", skillTags: ["YouTube", "Educational", "Weekly"] },
          { title: "Explainer video script", description: "2-minute script for SaaS product explainer.", budgetRange: "₹8,000 - ₹15,000", duration: "1 week", skillTags: ["Explainer", "SaaS", "Video"] },
          { title: "Podcast series scripts", description: "Outlines and scripts for 10-episode podcast series.", budgetRange: "₹40,000 - ₹80,000", duration: "3 weeks", skillTags: ["Podcast", "Series", "Outline"] }
        ]
      },
      {
        name: "Business Writing",
        slug: "business-writing",
        description: "Professional writing for business communication and documentation.",
        realTaskStatements: [
          "Write a business proposal for a client",
          "Create a professional business plan",
          "Need SOPs documented for my team",
          "Write executive summary and reports",
          "Create investor pitch documents",
          "Write professional email templates"
        ],
        coreSkills: ["Business Communication", "Report Writing", "Proposal Writing", "Documentation", "Professional Tone"],
        supportingSkills: ["Research", "Data Analysis", "Formatting", "Editing", "Industry Knowledge"],
        howYouEarn: [
          "Business proposals (₹10000-50000)",
          "Business plans (₹25000-100000)",
          "SOP documentation (₹5000-20000/process)",
          "Reports and summaries (₹8000-30000)",
          "Pitch decks content (₹15000-50000)"
        ],
        taskExamples: [
          { title: "Investor pitch document", description: "Business plan and pitch deck content for Series A.", budgetRange: "₹50,000 - ₹100,000", duration: "2 weeks", skillTags: ["Investor", "Pitch", "Business Plan"] },
          { title: "SOP documentation", description: "Document 15 business processes for operations team.", budgetRange: "₹40,000 - ₹80,000", duration: "3 weeks", skillTags: ["SOP", "Process", "Documentation"] },
          { title: "RFP response", description: "Comprehensive proposal response for government tender.", budgetRange: "₹30,000 - ₹60,000", duration: "1 week", skillTags: ["RFP", "Proposal", "Government"] }
        ]
      },
      {
        name: "Resume Writing",
        slug: "resume-writing",
        description: "Create resumes and profiles that get interviews.",
        realTaskStatements: [
          "Rewrite my resume to get more interviews",
          "Create a LinkedIn profile that stands out",
          "Need a resume for career change",
          "Executive bio and resume for C-level role",
          "Cover letters for job applications",
          "Portfolio description and bio"
        ],
        coreSkills: ["Resume Writing", "LinkedIn Optimization", "ATS Optimization", "Personal Branding", "Career Positioning"],
        supportingSkills: ["Industry Knowledge", "Interviewing", "Career Coaching", "Editing", "Keyword Optimization"],
        howYouEarn: [
          "Resume writing (₹3000-15000)",
          "LinkedIn optimization (₹2000-10000)",
          "Resume + LinkedIn package (₹5000-20000)",
          "Executive profiles (₹15000-40000)",
          "Cover letters (₹1000-5000)"
        ],
        taskExamples: [
          { title: "Tech professional resume", description: "ATS-optimized resume for senior software engineer.", budgetRange: "₹5,000 - ₹10,000", duration: "3-5 days", skillTags: ["Tech", "Resume", "ATS"] },
          { title: "Career change resume", description: "Resume repositioning from finance to product management.", budgetRange: "₹8,000 - ₹15,000", duration: "1 week", skillTags: ["Career Change", "Repositioning", "PM"] },
          { title: "Executive profile package", description: "Resume, LinkedIn, and executive bio for CXO job search.", budgetRange: "₹25,000 - ₹50,000", duration: "2 weeks", skillTags: ["Executive", "C-Suite", "Package"] }
        ]
      },
      {
        name: "Proofreading & Editing",
        slug: "proofreading-editing",
        description: "Polish and perfect written content for clarity and correctness.",
        realTaskStatements: [
          "Proofread my book before publishing",
          "Edit my thesis for submission",
          "Need copy editing for my website",
          "Developmental editing for my manuscript",
          "Proofread legal documents",
          "Edit translated content for quality"
        ],
        coreSkills: ["Proofreading", "Copy Editing", "Grammar", "Style Consistency", "Attention to Detail"],
        supportingSkills: ["Subject Matter Expertise", "Style Guides", "Formatting", "Fact-checking", "Track Changes"],
        howYouEarn: [
          "Proofreading (₹1-3/word)",
          "Copy editing (₹2-5/word)",
          "Developmental editing (₹5-10/word)",
          "Document review (₹500-2000/page)",
          "Rush rates (50-100% premium)"
        ],
        taskExamples: [
          { title: "Book manuscript editing", description: "Copy editing for 80,000-word fiction novel.", budgetRange: "₹80,000 - ₹150,000", duration: "3-4 weeks", skillTags: ["Book", "Fiction", "Copy Edit"] },
          { title: "Academic thesis editing", description: "Proofread and format PhD thesis.", budgetRange: "₹20,000 - ₹40,000", duration: "1-2 weeks", skillTags: ["Academic", "Thesis", "PhD"] },
          { title: "Website content editing", description: "Edit and improve copy across 50-page website.", budgetRange: "₹25,000 - ₹50,000", duration: "1 week", skillTags: ["Website", "Copy Edit", "Improvement"] }
        ]
      },
      {
        name: "Translation",
        slug: "translation",
        description: "Translate content between languages accurately and naturally.",
        realTaskStatements: [
          "Translate my website to Hindi/regional languages",
          "Need legal documents translated",
          "Localize my app for Indian markets",
          "Translate marketing content to multiple languages",
          "Technical manual translation",
          "Subtitle translation for my videos"
        ],
        coreSkills: ["Language Proficiency", "Translation Tools", "Cultural Adaptation", "Industry Terminology", "Accuracy"],
        supportingSkills: ["Subject Matter Knowledge", "Localization", "Proofreading", "CAT Tools", "Quality Assurance"],
        howYouEarn: [
          "General translation (₹2-5/word)",
          "Technical translation (₹4-8/word)",
          "Legal translation (₹5-10/word)",
          "Localization projects (custom pricing)",
          "Subtitle translation (₹3000-8000/video)"
        ],
        taskExamples: [
          { title: "Website Hindi translation", description: "Translate 30-page English website to Hindi.", budgetRange: "₹30,000 - ₹60,000", duration: "2 weeks", skillTags: ["Hindi", "Website", "Translation"] },
          { title: "Legal document translation", description: "Translate contracts and agreements to English.", budgetRange: "₹15,000 - ₹30,000", duration: "1 week", skillTags: ["Legal", "Contracts", "English"] },
          { title: "App localization", description: "Localize mobile app for 5 Indian languages.", budgetRange: "₹80,000 - ₹150,000", duration: "3 weeks", skillTags: ["App", "Localization", "Regional"] }
        ]
      },
      {
        name: "Transcription",
        slug: "transcription",
        description: "Convert audio and video content to accurate written text.",
        realTaskStatements: [
          "Transcribe my podcast episodes",
          "Need interview recordings transcribed",
          "Transcribe meeting recordings",
          "Convert video content to text",
          "Legal deposition transcription",
          "Medical transcription services"
        ],
        coreSkills: ["Typing Speed", "Listening Accuracy", "Formatting", "Time-stamping", "Industry Terminology"],
        supportingSkills: ["Transcription Software", "Audio Editing", "Research", "Language Skills", "Quality Control"],
        howYouEarn: [
          "General transcription (₹500-1500/audio hour)",
          "Technical transcription (₹1000-2500/audio hour)",
          "Legal/medical transcription (₹1500-4000/audio hour)",
          "Verbatim transcription (premium rates)",
          "Rush delivery (50-100% extra)"
        ],
        taskExamples: [
          { title: "Podcast transcription", description: "Transcribe 20 podcast episodes (1 hour each).", budgetRange: "₹20,000 - ₹40,000", duration: "2 weeks", skillTags: ["Podcast", "Batch", "Transcription"] },
          { title: "Research interview transcription", description: "Transcribe 50 research interviews with time stamps.", budgetRange: "₹40,000 - ₹80,000", duration: "3 weeks", skillTags: ["Research", "Interviews", "Academic"] },
          { title: "Meeting notes transcription", description: "Regular transcription of weekly board meetings.", budgetRange: "₹8,000 - ₹15,000", duration: "Per month", skillTags: ["Meetings", "Corporate", "Regular"] }
        ]
      },
      {
        name: "Documentation",
        slug: "documentation",
        description: "Create technical documentation, user guides, and help content.",
        realTaskStatements: [
          "Write documentation for my software",
          "Create user guides for my product",
          "Need API documentation",
          "Write help center articles",
          "Create onboarding documentation",
          "Technical specs documentation"
        ],
        coreSkills: ["Technical Writing", "Documentation Tools", "Information Architecture", "User-focused Writing", "Process Documentation"],
        supportingSkills: ["Technical Knowledge", "Visual Documentation", "Version Control", "User Research", "Editing"],
        howYouEarn: [
          "User documentation (₹15000-60000)",
          "API documentation (₹25000-100000)",
          "Help center content (₹3000-10000/article)",
          "Technical guides (₹20000-80000)",
          "Documentation maintenance (₹15000-50000/month)"
        ],
        taskExamples: [
          { title: "SaaS documentation", description: "Complete user documentation for B2B software platform.", budgetRange: "₹60,000 - ₹120,000", duration: "4-6 weeks", skillTags: ["SaaS", "User Docs", "B2B"] },
          { title: "API documentation", description: "Developer documentation for REST API with examples.", budgetRange: "₹40,000 - ₹80,000", duration: "2-3 weeks", skillTags: ["API", "Developer", "Technical"] },
          { title: "Help center setup", description: "50 help articles organized in knowledge base.", budgetRange: "₹50,000 - ₹100,000", duration: "3-4 weeks", skillTags: ["Help Center", "Knowledge Base", "Support"] }
        ]
      }
    ]
  },
  {
    name: "Music & Audio",
    slug: "music-audio",
    description: "Create, edit, and produce audio content that sounds professional.",
    icon: "Music",
    color: "from-purple-500 to-indigo-600",
    subCategories: [
      {
        name: "Music Production",
        slug: "music-production",
        description: "Create original music, beats, and compositions.",
        realTaskStatements: [
          "Produce background music for my video",
          "Create a jingle for my brand",
          "Need beats for my album",
          "Compose music for my game/app",
          "Mix and master my tracks",
          "Create custom music for my podcast"
        ],
        coreSkills: ["Music Composition", "Beat Making", "Mixing", "Mastering", "DAW Proficiency"],
        supportingSkills: ["Music Theory", "Sound Design", "Instrument Playing", "Genre Knowledge", "Arrangement"],
        howYouEarn: [
          "Custom tracks (₹10000-50000)",
          "Jingles (₹15000-60000)",
          "Album production (₹100000-500000)",
          "Mixing/mastering (₹3000-15000/track)",
          "Royalty-free music (₹5000-25000)"
        ],
        taskExamples: [
          { title: "Brand jingle creation", description: "30-second memorable jingle for food brand.", budgetRange: "₹25,000 - ₹50,000", duration: "1-2 weeks", skillTags: ["Jingle", "Brand", "Commercial"] },
          { title: "Podcast intro music", description: "Custom intro and outro music with variations.", budgetRange: "₹10,000 - ₹20,000", duration: "1 week", skillTags: ["Podcast", "Intro", "Custom"] },
          { title: "Game soundtrack", description: "10 original tracks for mobile game.", budgetRange: "₹100,000 - ₹200,000", duration: "6-8 weeks", skillTags: ["Game", "Soundtrack", "Original"] }
        ]
      },
      {
        name: "Voice Over",
        slug: "voice-over",
        description: "Professional voice recording for various projects.",
        realTaskStatements: [
          "Need a voice over for my explainer video",
          "Record IVR messages for my business",
          "Voice over for my e-learning course",
          "Narration for my audiobook",
          "Character voices for my animation",
          "Voice over for my advertisement"
        ],
        coreSkills: ["Voice Acting", "Clear Diction", "Tone Control", "Script Interpretation", "Recording Quality"],
        supportingSkills: ["Audio Editing", "Character Work", "Language Skills", "Home Studio Setup", "Direction Taking"],
        howYouEarn: [
          "Explainer videos (₹5000-20000)",
          "IVR/phone systems (₹3000-15000)",
          "E-learning narration (₹100-500/minute)",
          "Audiobook narration (₹200-800/finished hour)",
          "Commercial voice over (₹10000-50000)"
        ],
        taskExamples: [
          { title: "Explainer video VO", description: "2-minute voice over for corporate explainer.", budgetRange: "₹8,000 - ₹15,000", duration: "2-3 days", skillTags: ["Explainer", "Corporate", "Professional"] },
          { title: "E-learning course narration", description: "5 hours of e-learning content narration.", budgetRange: "₹30,000 - ₹60,000", duration: "2 weeks", skillTags: ["E-learning", "Educational", "Narration"] },
          { title: "Character voices", description: "5 unique character voices for animated series.", budgetRange: "₹40,000 - ₹80,000", duration: "2 weeks", skillTags: ["Character", "Animation", "Acting"] }
        ]
      },
      {
        name: "Audio Editing",
        slug: "audio-editing",
        description: "Professional editing and enhancement of audio content.",
        realTaskStatements: [
          "Clean up my podcast audio",
          "Remove background noise from recording",
          "Edit and enhance my voice recordings",
          "Sync audio with video content",
          "Create audio from separate tracks",
          "Fix audio quality issues"
        ],
        coreSkills: ["Audio Editing Software", "Noise Reduction", "EQ and Effects", "Mixing", "Audio Restoration"],
        supportingSkills: ["Music Knowledge", "Sound Design", "Quality Control", "Format Conversion", "Mastering Basics"],
        howYouEarn: [
          "Podcast editing (₹1500-5000/episode)",
          "Audio cleanup (₹1000-5000/file)",
          "Mixing services (₹3000-15000/project)",
          "Audio restoration (₹2000-10000)",
          "Monthly retainer (₹15000-50000/month)"
        ],
        taskExamples: [
          { title: "Weekly podcast editing", description: "Edit and produce 4 podcast episodes per month.", budgetRange: "₹15,000 - ₹30,000", duration: "Per month", skillTags: ["Podcast", "Weekly", "Editing"] },
          { title: "Audio restoration", description: "Restore and clean old family audio recordings.", budgetRange: "₹8,000 - ₹15,000", duration: "1 week", skillTags: ["Restoration", "Old Audio", "Family"] },
          { title: "Webinar audio cleanup", description: "Clean and enhance audio from 10 recorded webinars.", budgetRange: "₹15,000 - ₹30,000", duration: "1 week", skillTags: ["Webinar", "Cleanup", "Corporate"] }
        ]
      },
      {
        name: "Podcast Production",
        slug: "podcast-production",
        description: "End-to-end podcast production services.",
        realTaskStatements: [
          "Launch and produce my new podcast",
          "Edit and publish my podcast weekly",
          "Create podcast branding and intro",
          "Help grow my podcast audience",
          "Produce a branded podcast for my company",
          "Convert my podcast for video platforms"
        ],
        coreSkills: ["Podcast Editing", "Show Production", "Publishing Platforms", "Audio Quality", "Show Notes"],
        supportingSkills: ["Content Strategy", "Marketing", "Interviewing", "Guest Management", "Analytics"],
        howYouEarn: [
          "Full episode production (₹5000-20000/episode)",
          "Launch packages (₹30000-100000)",
          "Monthly production (₹25000-80000/month)",
          "Podcast branding (₹15000-40000)",
          "Video podcast editing (₹8000-25000/episode)"
        ],
        taskExamples: [
          { title: "Podcast launch", description: "Complete setup with branding, trailer, and first 3 episodes.", budgetRange: "₹50,000 - ₹100,000", duration: "3-4 weeks", skillTags: ["Launch", "Setup", "Branding"] },
          { title: "Weekly podcast production", description: "Full production of weekly interview podcast.", budgetRange: "₹40,000 - ₹70,000", duration: "Per month", skillTags: ["Weekly", "Interview", "Production"] },
          { title: "Corporate podcast", description: "Monthly branded podcast for internal communications.", budgetRange: "₹60,000 - ₹100,000", duration: "Per month", skillTags: ["Corporate", "Branded", "Internal"] }
        ]
      },
      {
        name: "Sound Design",
        slug: "sound-design",
        description: "Create custom sounds and audio experiences.",
        realTaskStatements: [
          "Design sound effects for my game",
          "Create UI sounds for my app",
          "Sound design for my film/video",
          "Create immersive audio experience",
          "Design alert sounds for my product",
          "Foley and ambient sound creation"
        ],
        coreSkills: ["Sound Creation", "Foley", "Audio Software", "Creative Sound Design", "Technical Audio"],
        supportingSkills: ["Music Production", "Recording", "Field Recording", "Audio Implementation", "Game Audio"],
        howYouEarn: [
          "Sound effect packages (₹10000-50000)",
          "UI sound design (₹15000-60000)",
          "Film sound design (₹50000-200000)",
          "Game audio (₹30000-150000)",
          "Custom sounds (₹2000-10000/sound)"
        ],
        taskExamples: [
          { title: "Mobile game sounds", description: "Complete sound effect package for casual mobile game.", budgetRange: "₹30,000 - ₹60,000", duration: "2 weeks", skillTags: ["Game", "Mobile", "Effects"] },
          { title: "App UI sounds", description: "UI sound design for fintech mobile app.", budgetRange: "₹20,000 - ₹40,000", duration: "1 week", skillTags: ["UI", "App", "Fintech"] },
          { title: "Short film sound design", description: "Complete sound design for 15-minute short film.", budgetRange: "₹40,000 - ₹80,000", duration: "2-3 weeks", skillTags: ["Film", "Short", "Complete"] }
        ]
      }
    ]
  },
  {
    name: "Business",
    slug: "business",
    description: "Business services to help companies start, grow, and operate efficiently.",
    icon: "Briefcase",
    color: "from-slate-500 to-gray-600",
    subCategories: [
      {
        name: "Business Registration",
        slug: "business-registration",
        description: "Help with company formation and legal registration.",
        realTaskStatements: [
          "Register my startup as private limited",
          "Help me get GST registration",
          "Register my trademark",
          "Complete MSME registration",
          "Set up my business legally in India",
          "Help with company compliance filings"
        ],
        coreSkills: ["Company Law", "Registration Procedures", "Documentation", "Compliance Knowledge", "Government Portals"],
        supportingSkills: ["Tax Knowledge", "Legal Documentation", "Advisory", "Process Management", "Communication"],
        howYouEarn: [
          "Pvt Ltd registration (₹8000-25000)",
          "GST registration (₹2000-5000)",
          "Trademark registration (₹5000-15000)",
          "MSME registration (₹1000-3000)",
          "Compliance packages (₹10000-30000/year)"
        ],
        taskExamples: [
          { title: "Startup company registration", description: "Complete Pvt Ltd registration with all documentation.", budgetRange: "₹12,000 - ₹20,000", duration: "2-3 weeks", skillTags: ["Pvt Ltd", "Startup", "Registration"] },
          { title: "GST and compliance setup", description: "GST registration and first quarter filing setup.", budgetRange: "₹5,000 - ₹10,000", duration: "1 week", skillTags: ["GST", "Tax", "Compliance"] },
          { title: "Brand trademark", description: "Trademark registration for brand name and logo.", budgetRange: "₹8,000 - ₹15,000", duration: "Filing + monitoring", skillTags: ["Trademark", "Brand", "IP"] }
        ]
      },
      {
        name: "Business Consulting",
        slug: "business-consulting",
        description: "Strategic advice to grow and improve your business.",
        realTaskStatements: [
          "Help me create a business strategy",
          "Advise on scaling my startup",
          "Business model validation",
          "Operational efficiency consulting",
          "Go-to-market strategy advice",
          "Help me pivot my business"
        ],
        coreSkills: ["Business Strategy", "Market Analysis", "Financial Modeling", "Operations", "Growth Strategy"],
        supportingSkills: ["Industry Experience", "Presentation", "Research", "Problem Solving", "Leadership"],
        howYouEarn: [
          "Strategy sessions (₹5000-25000/hour)",
          "Business plans (₹30000-150000)",
          "GTM strategy (₹50000-200000)",
          "Operational consulting (₹40000-150000)",
          "Advisory retainer (₹50000-200000/month)"
        ],
        taskExamples: [
          { title: "Startup strategy session", description: "3-hour deep dive on business model and growth strategy.", budgetRange: "₹15,000 - ₹30,000", duration: "Half day", skillTags: ["Startup", "Strategy", "Session"] },
          { title: "Market entry strategy", description: "Go-to-market strategy for new market expansion.", budgetRange: "₹80,000 - ₹150,000", duration: "3-4 weeks", skillTags: ["GTM", "Expansion", "Market"] },
          { title: "Operations improvement", description: "Analyze and improve business operations for efficiency.", budgetRange: "₹60,000 - ₹120,000", duration: "4 weeks", skillTags: ["Operations", "Efficiency", "Process"] }
        ]
      },
      {
        name: "Market Research",
        slug: "market-research",
        description: "Research and insights to make informed business decisions.",
        realTaskStatements: [
          "Research my target market and competitors",
          "Conduct customer surveys and interviews",
          "Analyze industry trends for my sector",
          "Validate my product idea with research",
          "Create customer personas with data",
          "Competitive analysis for my business"
        ],
        coreSkills: ["Research Methods", "Data Analysis", "Survey Design", "Competitive Analysis", "Market Sizing"],
        supportingSkills: ["Industry Knowledge", "Interviewing", "Report Writing", "Presentation", "Statistics"],
        howYouEarn: [
          "Competitor analysis (₹15000-60000)",
          "Market research report (₹30000-150000)",
          "Customer surveys (₹20000-80000)",
          "Industry analysis (₹25000-100000)",
          "Ongoing research (₹40000-150000/month)"
        ],
        taskExamples: [
          { title: "Competitor deep dive", description: "Detailed analysis of 10 competitors with positioning map.", budgetRange: "₹25,000 - ₹50,000", duration: "2 weeks", skillTags: ["Competitor", "Analysis", "Positioning"] },
          { title: "Customer research", description: "Interviews and survey of 100 target customers.", budgetRange: "₹40,000 - ₹80,000", duration: "3-4 weeks", skillTags: ["Customer", "Research", "Interviews"] },
          { title: "Market opportunity analysis", description: "Market size, trends, and opportunity assessment.", budgetRange: "₹50,000 - ₹100,000", duration: "3 weeks", skillTags: ["Market Size", "Opportunity", "Trends"] }
        ]
      },
      {
        name: "Virtual Assistance",
        slug: "virtual-assistance",
        description: "Remote administrative and operational support.",
        realTaskStatements: [
          "Need a VA to manage my emails",
          "Handle my calendar and scheduling",
          "Research and data entry tasks",
          "Manage my social media posting",
          "Customer support for my business",
          "Administrative tasks for my startup"
        ],
        coreSkills: ["Administrative Skills", "Communication", "Organization", "Time Management", "Tech Proficiency"],
        supportingSkills: ["Research", "Social Media", "Customer Service", "Data Entry", "Project Management"],
        howYouEarn: [
          "Hourly support (₹300-800/hour)",
          "Part-time VA (₹15000-40000/month)",
          "Full-time VA (₹30000-80000/month)",
          "Specialized VA (₹40000-100000/month)",
          "Task-based pricing (varies)"
        ],
        taskExamples: [
          { title: "Executive VA support", description: "Full-time remote support for startup founder.", budgetRange: "₹40,000 - ₹60,000", duration: "Per month", skillTags: ["Executive", "Full-time", "Startup"] },
          { title: "Social media management", description: "Daily posting and engagement across 3 platforms.", budgetRange: "₹20,000 - ₹35,000", duration: "Per month", skillTags: ["Social Media", "Daily", "Engagement"] },
          { title: "Research and data entry", description: "10 hours/week of research and data compilation.", budgetRange: "₹12,000 - ₹20,000", duration: "Per month", skillTags: ["Research", "Data", "Part-time"] }
        ]
      },
      {
        name: "Project Management",
        slug: "project-management",
        description: "Lead and manage projects to successful completion.",
        realTaskStatements: [
          "Manage my product development project",
          "Need a PM for my website redesign",
          "Coordinate my marketing campaign launch",
          "Set up project management systems",
          "Manage remote team projects",
          "Agile/Scrum implementation help"
        ],
        coreSkills: ["Project Planning", "Team Coordination", "Risk Management", "PM Tools", "Agile/Scrum"],
        supportingSkills: ["Communication", "Problem Solving", "Stakeholder Management", "Documentation", "Leadership"],
        howYouEarn: [
          "Project management (₹50000-200000/project)",
          "PM consulting (₹3000-10000/hour)",
          "Monthly PM retainer (₹40000-150000/month)",
          "PM system setup (₹20000-80000)",
          "Agile coaching (₹30000-100000)"
        ],
        taskExamples: [
          { title: "App development PM", description: "Manage 3-month mobile app development project.", budgetRange: "₹100,000 - ₹180,000", duration: "3 months", skillTags: ["App", "Development", "Tech"] },
          { title: "Website redesign coordination", description: "Coordinate designers and developers for site revamp.", budgetRange: "₹50,000 - ₹100,000", duration: "6-8 weeks", skillTags: ["Website", "Redesign", "Coordination"] },
          { title: "Agile transformation", description: "Implement Agile processes for 10-person team.", budgetRange: "₹80,000 - ₹150,000", duration: "6-8 weeks", skillTags: ["Agile", "Scrum", "Training"] }
        ]
      },
      {
        name: "Sales & Lead Generation",
        slug: "sales-lead-generation",
        description: "Generate leads and support sales processes.",
        realTaskStatements: [
          "Generate qualified leads for my B2B business",
          "Set up my outbound sales process",
          "Create sales materials and scripts",
          "Book meetings with potential clients",
          "Build prospect lists for outreach",
          "Train my sales team"
        ],
        coreSkills: ["Lead Generation", "Prospecting", "Sales Outreach", "CRM Management", "Sales Process"],
        supportingSkills: ["Communication", "Research", "Cold Calling", "Email Outreach", "Negotiation"],
        howYouEarn: [
          "Lead list building (₹10-50/lead)",
          "Lead generation (₹500-2000/qualified lead)",
          "Appointment setting (₹1000-5000/meeting)",
          "Sales consulting (₹5000-20000/hour)",
          "Monthly retainer (₹40000-150000/month)"
        ],
        taskExamples: [
          { title: "B2B lead generation", description: "Generate 50 qualified leads per month for SaaS product.", budgetRange: "₹40,000 - ₹80,000", duration: "Per month", skillTags: ["B2B", "SaaS", "Qualified"] },
          { title: "Sales process setup", description: "Create outbound sales process with scripts and templates.", budgetRange: "₹50,000 - ₹100,000", duration: "3-4 weeks", skillTags: ["Process", "Outbound", "Setup"] },
          { title: "Meeting booking campaign", description: "Book 20 demo meetings with target accounts.", budgetRange: "₹30,000 - ₹60,000", duration: "1 month", skillTags: ["Meetings", "Demos", "Outreach"] }
        ]
      }
    ]
  },
  {
    name: "Finance",
    slug: "finance",
    description: "Financial services for individuals and businesses.",
    icon: "IndianRupee",
    color: "from-emerald-500 to-teal-600",
    subCategories: [
      {
        name: "Accounting",
        slug: "accounting",
        description: "Professional accounting services for businesses.",
        realTaskStatements: [
          "Manage my company's accounts",
          "Prepare financial statements",
          "Monthly bookkeeping for my business",
          "Accounts payable/receivable management",
          "Year-end accounting and closure",
          "Audit preparation support"
        ],
        coreSkills: ["Accounting Standards", "Financial Statements", "Tally/QuickBooks", "Compliance", "Reconciliation"],
        supportingSkills: ["Tax Knowledge", "Industry Expertise", "Excel", "Reporting", "Analysis"],
        howYouEarn: [
          "Monthly accounting (₹10000-50000/month)",
          "Financial statements (₹15000-60000)",
          "Year-end closure (₹20000-80000)",
          "Audit support (₹30000-100000)",
          "One-time cleanup (₹20000-80000)"
        ],
        taskExamples: [
          { title: "Monthly accounting", description: "Complete monthly accounting for 50-100 transaction company.", budgetRange: "₹15,000 - ₹25,000", duration: "Per month", skillTags: ["Monthly", "SME", "Regular"] },
          { title: "Financial statement preparation", description: "Annual financial statements with schedules.", budgetRange: "₹25,000 - ₹50,000", duration: "2 weeks", skillTags: ["Financial Statements", "Annual", "Compliance"] },
          { title: "Books cleanup", description: "Clean up 2 years of messy accounting records.", budgetRange: "₹40,000 - ₹80,000", duration: "4-6 weeks", skillTags: ["Cleanup", "Historical", "Reconciliation"] }
        ]
      },
      {
        name: "Bookkeeping",
        slug: "bookkeeping",
        description: "Day-to-day financial record keeping.",
        realTaskStatements: [
          "Record daily transactions for my business",
          "Reconcile bank and credit card statements",
          "Manage invoices and payments",
          "Track expenses and receipts",
          "Set up accounting software",
          "Weekly/monthly bookkeeping support"
        ],
        coreSkills: ["Transaction Recording", "Bank Reconciliation", "Invoice Management", "Accounting Software", "Data Entry"],
        supportingSkills: ["Attention to Detail", "Organization", "Reporting", "Communication", "Time Management"],
        howYouEarn: [
          "Part-time bookkeeping (₹8000-20000/month)",
          "Full-time bookkeeping (₹20000-50000/month)",
          "Transaction-based (₹50-200/transaction)",
          "Software setup (₹10000-30000)",
          "Catch-up bookkeeping (₹15000-50000)"
        ],
        taskExamples: [
          { title: "Weekly bookkeeping", description: "Weekly transaction recording and categorization.", budgetRange: "₹10,000 - ₹18,000", duration: "Per month", skillTags: ["Weekly", "Recording", "Regular"] },
          { title: "E-commerce bookkeeping", description: "Daily sales and expense tracking for online store.", budgetRange: "₹15,000 - ₹30,000", duration: "Per month", skillTags: ["E-commerce", "Daily", "Sales"] },
          { title: "Accounting software setup", description: "Set up and configure Zoho Books for new business.", budgetRange: "₹15,000 - ₹25,000", duration: "1 week", skillTags: ["Setup", "Zoho", "Configuration"] }
        ]
      },
      {
        name: "Tax Services",
        slug: "tax-services",
        description: "Tax planning, preparation, and filing services.",
        realTaskStatements: [
          "File my income tax return",
          "GST return filing monthly",
          "Tax planning for my business",
          "Handle tax notice from department",
          "International tax advisory",
          "TDS compliance and filing"
        ],
        coreSkills: ["Tax Law", "ITR Filing", "GST Compliance", "Tax Planning", "Tax Software"],
        supportingSkills: ["Accounting", "Documentation", "Communication", "Research", "Problem Solving"],
        howYouEarn: [
          "ITR filing (₹1000-10000)",
          "GST returns (₹2000-8000/month)",
          "Tax planning (₹10000-50000)",
          "Notice handling (₹5000-30000)",
          "Annual tax compliance (₹30000-150000/year)"
        ],
        taskExamples: [
          { title: "Business ITR filing", description: "Income tax return for Pvt Ltd company.", budgetRange: "₹10,000 - ₹25,000", duration: "1-2 weeks", skillTags: ["ITR", "Company", "Filing"] },
          { title: "Monthly GST compliance", description: "GSTR-1, GSTR-3B filing monthly.", budgetRange: "₹5,000 - ₹10,000", duration: "Per month", skillTags: ["GST", "Monthly", "Compliance"] },
          { title: "Tax notice resolution", description: "Handle income tax scrutiny notice.", budgetRange: "₹15,000 - ₹40,000", duration: "Varies", skillTags: ["Notice", "Scrutiny", "Resolution"] }
        ]
      },
      {
        name: "Financial Planning",
        slug: "financial-planning",
        description: "Personal and business financial planning advisory.",
        realTaskStatements: [
          "Create a financial plan for retirement",
          "Investment portfolio advice",
          "Business financial projections",
          "Personal budgeting and savings plan",
          "Insurance planning advisory",
          "Wealth management guidance"
        ],
        coreSkills: ["Financial Planning", "Investment Analysis", "Risk Assessment", "Retirement Planning", "Goal Setting"],
        supportingSkills: ["Tax Knowledge", "Insurance", "Estate Planning", "Communication", "Analytical Skills"],
        howYouEarn: [
          "Financial plan creation (₹10000-50000)",
          "Investment advisory (₹5000-20000/session)",
          "Business projections (₹20000-80000)",
          "Ongoing advisory (₹5000-25000/month)",
          "Comprehensive planning (₹50000-200000)"
        ],
        taskExamples: [
          { title: "Retirement planning", description: "Complete retirement plan with investment strategy.", budgetRange: "₹20,000 - ₹40,000", duration: "2-3 sessions", skillTags: ["Retirement", "Investment", "Long-term"] },
          { title: "Startup financial model", description: "3-year financial projections for investor pitch.", budgetRange: "₹30,000 - ₹60,000", duration: "2 weeks", skillTags: ["Startup", "Projections", "Model"] },
          { title: "Personal finance review", description: "Complete review of finances with action plan.", budgetRange: "₹10,000 - ₹25,000", duration: "1-2 sessions", skillTags: ["Personal", "Review", "Budget"] }
        ]
      },
      {
        name: "Fundraising Support",
        slug: "fundraising-support",
        description: "Help startups raise funding from investors.",
        realTaskStatements: [
          "Prepare pitch deck for investors",
          "Create financial model for fundraising",
          "Connect me with relevant investors",
          "Help negotiate term sheets",
          "Due diligence preparation",
          "Fundraising strategy advice"
        ],
        coreSkills: ["Pitch Deck Creation", "Financial Modeling", "Investor Relations", "Valuation", "Term Sheet Knowledge"],
        supportingSkills: ["Storytelling", "Negotiation", "Network", "Market Research", "Presentation"],
        howYouEarn: [
          "Pitch deck creation (₹30000-150000)",
          "Financial model (₹40000-150000)",
          "Fundraising advisory (₹50000-300000)",
          "Investor introductions (success-based)",
          "Due diligence prep (₹50000-200000)"
        ],
        taskExamples: [
          { title: "Seed fundraising package", description: "Pitch deck, financial model, and investor list for seed round.", budgetRange: "₹80,000 - ₹150,000", duration: "3-4 weeks", skillTags: ["Seed", "Pitch", "Complete"] },
          { title: "Investor pitch deck", description: "Compelling pitch deck for Series A fundraise.", budgetRange: "₹40,000 - ₹80,000", duration: "2 weeks", skillTags: ["Pitch Deck", "Series A", "Design"] },
          { title: "Financial model for fundraise", description: "Detailed 5-year financial model with scenarios.", budgetRange: "₹50,000 - ₹100,000", duration: "2-3 weeks", skillTags: ["Financial Model", "Projections", "Detailed"] }
        ]
      }
    ]
  },
  // ============================================================
  // PART 4: AI Services, Ask Doubts, Local Services, Events & Experiences
  // ============================================================
  {
    name: "AI Services",
    slug: "ai-services",
    description: "Leverage AI to build smarter products and automate workflows.",
    icon: "Bot",
    color: "from-violet-500 to-purple-600",
    subCategories: [
      {
        name: "AI Websites",
        slug: "ai-websites",
        description: "Build websites with AI-powered features and capabilities.",
        realTaskStatements: [
          "Build a website with AI chatbot integration",
          "Create AI-powered search for my site",
          "Add AI content recommendations to my platform",
          "Build a website that uses GPT for features",
          "Create an AI tool as a web application",
          "Add AI image generation to my website"
        ],
        coreSkills: ["Web Development", "AI Integration", "API Development", "LLM APIs", "Frontend Development"],
        supportingSkills: ["UI/UX Design", "Database Design", "Cloud Services", "Performance Optimization", "Security"],
        howYouEarn: [
          "AI website development (₹100000-500000)",
          "AI feature integration (₹30000-150000)",
          "AI tool websites (₹80000-400000)",
          "Maintenance and updates (₹20000-80000/month)",
          "Consulting (₹5000-20000/hour)"
        ],
        taskExamples: [
          { title: "AI writing tool website", description: "Web app with GPT-powered writing assistance features.", budgetRange: "₹150,000 - ₹300,000", duration: "6-8 weeks", skillTags: ["GPT", "Writing Tool", "SaaS"] },
          { title: "AI-powered e-commerce", description: "E-commerce site with AI product recommendations and search.", budgetRange: "₹200,000 - ₹400,000", duration: "8-10 weeks", skillTags: ["E-commerce", "Recommendations", "Search"] },
          { title: "Chatbot integration", description: "Add AI customer support chatbot to existing website.", budgetRange: "₹50,000 - ₹100,000", duration: "2-3 weeks", skillTags: ["Chatbot", "Integration", "Support"] }
        ]
      },
      {
        name: "AI Apps",
        slug: "ai-apps",
        description: "Build mobile applications powered by artificial intelligence.",
        realTaskStatements: [
          "Create a mobile app with AI features",
          "Build an AI assistant app",
          "Add AI photo editing to my app",
          "Create voice-powered AI app",
          "Build health app with AI analysis",
          "Develop AI fitness coaching app"
        ],
        coreSkills: ["Mobile Development", "AI/ML Integration", "API Integration", "App Architecture", "LLM APIs"],
        supportingSkills: ["UI/UX Design", "Cloud Services", "Performance Optimization", "Testing", "Security"],
        howYouEarn: [
          "AI app development (₹200000-800000)",
          "AI feature addition (₹50000-200000)",
          "App maintenance (₹30000-100000/month)",
          "Consulting (₹5000-20000/hour)",
          "MVP development (₹100000-300000)"
        ],
        taskExamples: [
          { title: "AI photo editing app", description: "Mobile app with AI-powered photo enhancement and filters.", budgetRange: "₹250,000 - ₹500,000", duration: "10-12 weeks", skillTags: ["Photo", "AI Enhancement", "Mobile"] },
          { title: "AI language learning app", description: "App with AI conversation practice and feedback.", budgetRange: "₹300,000 - ₹600,000", duration: "12-16 weeks", skillTags: ["Language", "Conversation AI", "Education"] },
          { title: "Voice assistant feature", description: "Add voice AI assistant to existing mobile app.", budgetRange: "₹80,000 - ₹150,000", duration: "4-6 weeks", skillTags: ["Voice", "Assistant", "Integration"] }
        ]
      },
      {
        name: "AI Chatbots",
        slug: "ai-chatbots",
        description: "Build intelligent conversational AI chatbots.",
        realTaskStatements: [
          "Build a customer service AI chatbot",
          "Create a chatbot trained on my company data",
          "WhatsApp AI bot for my business",
          "Build a lead qualification chatbot",
          "Create an AI sales assistant",
          "Internal knowledge base chatbot"
        ],
        coreSkills: ["Chatbot Development", "LLM Fine-tuning", "Conversation Design", "API Integration", "NLP"],
        supportingSkills: ["Customer Service Knowledge", "UX Writing", "Analytics", "Testing", "Documentation"],
        howYouEarn: [
          "Custom chatbot development (₹50000-300000)",
          "WhatsApp/Telegram bots (₹40000-150000)",
          "Knowledge base chatbots (₹60000-200000)",
          "Chatbot training and optimization (₹30000-100000)",
          "Maintenance (₹15000-50000/month)"
        ],
        taskExamples: [
          { title: "Customer support chatbot", description: "AI chatbot trained on product documentation for support.", budgetRange: "₹80,000 - ₹150,000", duration: "4-6 weeks", skillTags: ["Support", "Documentation", "Training"] },
          { title: "Sales qualification bot", description: "AI bot that qualifies leads and books meetings.", budgetRange: "₹60,000 - ₹120,000", duration: "3-4 weeks", skillTags: ["Sales", "Lead Qual", "Booking"] },
          { title: "WhatsApp business AI", description: "AI-powered WhatsApp bot for e-commerce support.", budgetRange: "₹50,000 - ₹100,000", duration: "3-4 weeks", skillTags: ["WhatsApp", "E-commerce", "AI"] }
        ]
      },
      {
        name: "AI Agents",
        slug: "ai-agents",
        description: "Build autonomous AI agents that complete tasks independently.",
        realTaskStatements: [
          "Build an AI agent for research tasks",
          "Create autonomous workflow agents",
          "Develop AI agents for data processing",
          "Build multi-agent systems",
          "Create AI agent for content creation",
          "Develop decision-making AI agents"
        ],
        coreSkills: ["AI Agent Frameworks", "LLM APIs", "Tool Integration", "Workflow Design", "Python"],
        supportingSkills: ["Prompt Engineering", "System Design", "API Development", "Testing", "Monitoring"],
        howYouEarn: [
          "Custom AI agent development (₹80000-400000)",
          "Agent workflow setup (₹50000-200000)",
          "Multi-agent systems (₹150000-600000)",
          "Agent optimization (₹40000-150000)",
          "Consulting (₹8000-25000/hour)"
        ],
        taskExamples: [
          { title: "Research AI agent", description: "Agent that researches topics and creates reports automatically.", budgetRange: "₹100,000 - ₹200,000", duration: "4-6 weeks", skillTags: ["Research", "Autonomous", "Reports"] },
          { title: "Content creation agent", description: "AI agent that creates and publishes content based on briefs.", budgetRange: "₹80,000 - ₹150,000", duration: "4-5 weeks", skillTags: ["Content", "Publishing", "Automation"] },
          { title: "Data processing agent", description: "Agent that processes, analyzes, and reports on data automatically.", budgetRange: "₹120,000 - ₹250,000", duration: "6-8 weeks", skillTags: ["Data", "Analysis", "Autonomous"] }
        ]
      },
      {
        name: "AI Automation",
        slug: "ai-automation",
        description: "Automate business processes with AI intelligence.",
        realTaskStatements: [
          "Automate document processing with AI",
          "Create AI-powered email automation",
          "Build intelligent workflow automation",
          "Automate data extraction and entry",
          "AI-powered content moderation",
          "Intelligent scheduling automation"
        ],
        coreSkills: ["AI Integration", "Automation Platforms", "API Development", "Workflow Design", "LLM APIs"],
        supportingSkills: ["Process Analysis", "Python", "No-code Tools", "Documentation", "Testing"],
        howYouEarn: [
          "AI automation projects (₹50000-300000)",
          "Document processing (₹40000-150000)",
          "Workflow automation (₹30000-120000)",
          "Ongoing optimization (₹20000-80000/month)",
          "Consulting (₹5000-15000/hour)"
        ],
        taskExamples: [
          { title: "Invoice processing automation", description: "AI system to extract and process invoice data automatically.", budgetRange: "₹80,000 - ₹150,000", duration: "4-6 weeks", skillTags: ["Invoice", "OCR", "Processing"] },
          { title: "Email triage automation", description: "AI-powered email categorization and response suggestions.", budgetRange: "₹50,000 - ₹100,000", duration: "3-4 weeks", skillTags: ["Email", "Categorization", "AI"] },
          { title: "Content moderation", description: "AI system to moderate user-generated content.", budgetRange: "₹60,000 - ₹120,000", duration: "4-5 weeks", skillTags: ["Moderation", "UGC", "Safety"] }
        ]
      },
      {
        name: "AI Consulting",
        slug: "ai-consulting",
        description: "Strategic advice on AI adoption and implementation.",
        realTaskStatements: [
          "Help me understand how AI can help my business",
          "Create an AI strategy for my company",
          "Evaluate AI tools and vendors for my needs",
          "AI readiness assessment",
          "Build AI roadmap for digital transformation",
          "Train my team on AI tools"
        ],
        coreSkills: ["AI Knowledge", "Business Strategy", "Technology Assessment", "Change Management", "Training"],
        supportingSkills: ["Industry Expertise", "Project Management", "Communication", "Research", "Presentation"],
        howYouEarn: [
          "AI strategy consulting (₹50000-300000)",
          "AI readiness assessment (₹30000-100000)",
          "Vendor evaluation (₹40000-150000)",
          "AI training workshops (₹25000-100000)",
          "Ongoing advisory (₹50000-200000/month)"
        ],
        taskExamples: [
          { title: "AI strategy development", description: "Comprehensive AI strategy for mid-size company.", budgetRange: "₹100,000 - ₹200,000", duration: "4-6 weeks", skillTags: ["Strategy", "Roadmap", "Planning"] },
          { title: "AI tool evaluation", description: "Evaluate and recommend AI tools for marketing team.", budgetRange: "₹40,000 - ₹80,000", duration: "2-3 weeks", skillTags: ["Evaluation", "Tools", "Marketing"] },
          { title: "Team AI training", description: "Workshop series on using AI tools effectively.", budgetRange: "₹50,000 - ₹100,000", duration: "2-4 sessions", skillTags: ["Training", "Workshop", "Adoption"] }
        ]
      }
    ]
  },
  {
    name: "Ask Doubts",
    slug: "ask-doubts",
    description: "Get expert advice and quick consultations across various domains.",
    icon: "HelpCircle",
    color: "from-cyan-500 to-blue-600",
    subCategories: [
      {
        name: "Business Consulting",
        slug: "business-consulting-doubts",
        description: "Quick business advice and strategy consultations.",
        realTaskStatements: [
          "Should I pivot my business model?",
          "How do I price my product?",
          "Need advice on entering new market",
          "How to handle cash flow issues?",
          "Is my business idea viable?",
          "Help me make a critical business decision"
        ],
        coreSkills: ["Business Strategy", "Problem Solving", "Market Knowledge", "Financial Understanding", "Decision Making"],
        supportingSkills: ["Industry Experience", "Communication", "Analytical Thinking", "Listening", "Mentoring"],
        howYouEarn: [
          "Quick consultations (₹1000-5000/30 min)",
          "Deep dive sessions (₹5000-15000/hour)",
          "Written advice (₹3000-10000)",
          "Follow-up support (₹2000-8000)",
          "Retainer advisory (₹20000-80000/month)"
        ],
        taskExamples: [
          { title: "Pricing strategy advice", description: "30-minute call to discuss pricing for new SaaS product.", budgetRange: "₹2,000 - ₹5,000", duration: "30 minutes", skillTags: ["Pricing", "SaaS", "Quick Call"] },
          { title: "Business model review", description: "Review and feedback on current business model.", budgetRange: "₹5,000 - ₹10,000", duration: "1 hour", skillTags: ["Business Model", "Review", "Feedback"] },
          { title: "Market entry decision", description: "Advice on whether to expand to new geography.", budgetRange: "₹8,000 - ₹15,000", duration: "1-2 hours", skillTags: ["Expansion", "Market", "Decision"] }
        ]
      },
      {
        name: "Marketing Consulting",
        slug: "marketing-consulting-doubts",
        description: "Quick marketing advice and campaign feedback.",
        realTaskStatements: [
          "Is my marketing strategy working?",
          "Which channel should I focus on?",
          "Review my ad campaigns",
          "How to improve my conversion rates?",
          "Should I invest in influencer marketing?",
          "Help me set marketing budget"
        ],
        coreSkills: ["Marketing Strategy", "Channel Expertise", "Analytics", "Campaign Management", "Budget Planning"],
        supportingSkills: ["Creative Thinking", "Data Analysis", "Industry Knowledge", "Communication", "Trend Awareness"],
        howYouEarn: [
          "Quick consultations (₹1000-5000/30 min)",
          "Campaign reviews (₹5000-15000)",
          "Strategy sessions (₹8000-25000/hour)",
          "Written feedback (₹3000-10000)",
          "Monthly advisory (₹25000-80000/month)"
        ],
        taskExamples: [
          { title: "Marketing strategy review", description: "Review current marketing approach and suggest improvements.", budgetRange: "₹5,000 - ₹10,000", duration: "1 hour", skillTags: ["Strategy", "Review", "Improvements"] },
          { title: "Ad campaign feedback", description: "Quick feedback on Facebook/Google ad campaigns.", budgetRange: "₹3,000 - ₹6,000", duration: "30-45 minutes", skillTags: ["Ads", "Feedback", "Quick"] },
          { title: "Channel prioritization", description: "Advice on which marketing channels to prioritize.", budgetRange: "₹4,000 - ₹8,000", duration: "45 minutes", skillTags: ["Channels", "Priority", "Budget"] }
        ]
      },
      {
        name: "Tech Consulting",
        slug: "tech-consulting-doubts",
        description: "Quick technology advice and architecture guidance.",
        realTaskStatements: [
          "Which tech stack should I use?",
          "Review my system architecture",
          "Is my code approach correct?",
          "Should I build or buy?",
          "Help me debug a complex issue",
          "Advice on scaling my application"
        ],
        coreSkills: ["Technical Architecture", "Multiple Tech Stacks", "Problem Solving", "System Design", "Best Practices"],
        supportingSkills: ["Communication", "Teaching", "Documentation", "Code Review", "Security Knowledge"],
        howYouEarn: [
          "Quick consultations (₹2000-8000/30 min)",
          "Architecture reviews (₹10000-30000)",
          "Code reviews (₹5000-20000)",
          "Deep dive sessions (₹8000-25000/hour)",
          "Technical advisory (₹40000-150000/month)"
        ],
        taskExamples: [
          { title: "Tech stack decision", description: "Advise on best tech stack for my startup idea.", budgetRange: "₹5,000 - ₹10,000", duration: "1 hour", skillTags: ["Tech Stack", "Startup", "Decision"] },
          { title: "Architecture review", description: "Review system architecture and identify issues.", budgetRange: "₹15,000 - ₹30,000", duration: "2-3 hours", skillTags: ["Architecture", "Review", "Issues"] },
          { title: "Scaling advice", description: "How to scale my app for 10x more users.", budgetRange: "₹8,000 - ₹15,000", duration: "1 hour", skillTags: ["Scaling", "Performance", "Growth"] }
        ]
      },
      {
        name: "Legal Consulting",
        slug: "legal-consulting-doubts",
        description: "Quick legal advice for business and personal matters.",
        realTaskStatements: [
          "Review my contract before signing",
          "Is this legal structure right for me?",
          "What are my options in this dispute?",
          "Help me understand these terms",
          "Am I legally protected?",
          "Quick legal opinion on my situation"
        ],
        coreSkills: ["Legal Knowledge", "Contract Review", "Risk Assessment", "Regulatory Understanding", "Advisory"],
        supportingSkills: ["Communication", "Documentation", "Research", "Problem Solving", "Attention to Detail"],
        howYouEarn: [
          "Quick consultations (₹2000-8000/30 min)",
          "Contract reviews (₹5000-25000)",
          "Legal opinions (₹10000-40000)",
          "Document review (₹3000-15000)",
          "Retainer advisory (₹30000-100000/month)"
        ],
        taskExamples: [
          { title: "Contract review", description: "Quick review of vendor agreement before signing.", budgetRange: "₹5,000 - ₹12,000", duration: "1-2 hours", skillTags: ["Contract", "Review", "Vendor"] },
          { title: "Legal structure advice", description: "Which legal structure is best for my startup?", budgetRange: "₹3,000 - ₹8,000", duration: "45 minutes", skillTags: ["Structure", "Startup", "Advice"] },
          { title: "IP protection query", description: "How to protect my idea/brand legally?", budgetRange: "₹4,000 - ₹10,000", duration: "1 hour", skillTags: ["IP", "Protection", "Brand"] }
        ]
      },
      {
        name: "HR Consulting",
        slug: "hr-consulting-doubts",
        description: "Quick HR advice for hiring, policies, and people matters.",
        realTaskStatements: [
          "How should I structure compensation?",
          "Review my employment contract",
          "Advice on handling difficult employee",
          "Should I hire or outsource?",
          "Help me create HR policies",
          "How to do performance reviews?"
        ],
        coreSkills: ["HR Knowledge", "Employment Law", "Compensation Design", "Policy Development", "People Management"],
        supportingSkills: ["Communication", "Conflict Resolution", "Documentation", "Empathy", "Organizational Design"],
        howYouEarn: [
          "Quick consultations (₹1500-5000/30 min)",
          "Policy reviews (₹5000-20000)",
          "Compensation advice (₹8000-25000)",
          "Document templates (₹3000-15000)",
          "HR advisory (₹25000-80000/month)"
        ],
        taskExamples: [
          { title: "Compensation benchmarking", description: "Advice on competitive salary for senior developer.", budgetRange: "₹3,000 - ₹6,000", duration: "30 minutes", skillTags: ["Compensation", "Benchmarking", "Tech"] },
          { title: "HR policy review", description: "Review and improve our leave and WFH policies.", budgetRange: "₹8,000 - ₹15,000", duration: "2-3 hours", skillTags: ["Policy", "WFH", "Leave"] },
          { title: "Hiring process advice", description: "How to structure hiring process for scale.", budgetRange: "₹5,000 - ₹10,000", duration: "1 hour", skillTags: ["Hiring", "Process", "Scaling"] }
        ]
      },
      {
        name: "Data Consulting",
        slug: "data-consulting-doubts",
        description: "Quick data and analytics advice.",
        realTaskStatements: [
          "How should I structure my data?",
          "Which analytics tools should I use?",
          "Help me interpret this data",
          "Am I measuring the right metrics?",
          "How to build a data team?",
          "Data architecture advice needed"
        ],
        coreSkills: ["Data Strategy", "Analytics Tools", "Data Architecture", "Metrics Design", "Data Interpretation"],
        supportingSkills: ["Communication", "Teaching", "Business Understanding", "Visualization", "Problem Solving"],
        howYouEarn: [
          "Quick consultations (₹2000-8000/30 min)",
          "Data architecture review (₹15000-50000)",
          "Analytics setup advice (₹10000-30000)",
          "Dashboard review (₹5000-15000)",
          "Data advisory (₹40000-120000/month)"
        ],
        taskExamples: [
          { title: "Analytics stack advice", description: "Which analytics tools for e-commerce startup?", budgetRange: "₹4,000 - ₹8,000", duration: "45 minutes", skillTags: ["Analytics", "Tools", "E-commerce"] },
          { title: "Dashboard review", description: "Review our metrics dashboard and suggest improvements.", budgetRange: "₹8,000 - ₹15,000", duration: "1-2 hours", skillTags: ["Dashboard", "Metrics", "Review"] },
          { title: "Data team planning", description: "How to structure our first data hire/team.", budgetRange: "₹6,000 - ₹12,000", duration: "1 hour", skillTags: ["Team", "Hiring", "Data"] }
        ]
      },
      {
        name: "Mentorship",
        slug: "mentorship-doubts",
        description: "Career and professional growth mentorship.",
        realTaskStatements: [
          "Guide me on my career path",
          "Help me transition to new role",
          "Advice on starting my own business",
          "How to grow as a leader?",
          "Help me navigate workplace challenges",
          "Long-term career planning"
        ],
        coreSkills: ["Career Development", "Leadership", "Industry Experience", "Coaching", "Goal Setting"],
        supportingSkills: ["Active Listening", "Empathy", "Communication", "Problem Solving", "Networking"],
        howYouEarn: [
          "Single sessions (₹1500-6000)",
          "Monthly mentorship (₹8000-30000/month)",
          "Career planning package (₹15000-50000)",
          "Executive coaching (₹25000-100000/month)",
          "Group mentorship (₹3000-10000/person)"
        ],
        taskExamples: [
          { title: "Career transition guidance", description: "Monthly mentorship for moving from corporate to startup.", budgetRange: "₹10,000 - ₹20,000", duration: "Per month", skillTags: ["Transition", "Startup", "Monthly"] },
          { title: "Leadership development", description: "Coaching for first-time manager.", budgetRange: "₹15,000 - ₹30,000", duration: "Per month", skillTags: ["Leadership", "Management", "Coaching"] },
          { title: "Entrepreneurship guidance", description: "Mentor session for someone starting their business.", budgetRange: "₹3,000 - ₹8,000", duration: "1 hour", skillTags: ["Entrepreneurship", "Startup", "Guidance"] }
        ]
      },
      {
        name: "Architects",
        slug: "architects-doubts",
        description: "Quick architectural advice for building projects.",
        realTaskStatements: [
          "Review my house plans",
          "Is this floor plan efficient?",
          "Advice on building permits",
          "How to maximize this plot?",
          "Material selection guidance",
          "Vastu compliance review"
        ],
        coreSkills: ["Architectural Design", "Building Codes", "Space Planning", "Construction Knowledge", "Materials"],
        supportingSkills: ["Visualization", "Communication", "Local Regulations", "Cost Estimation", "Sustainability"],
        howYouEarn: [
          "Quick consultations (₹2000-8000/30 min)",
          "Plan reviews (₹5000-20000)",
          "Site visits (₹8000-25000)",
          "Detailed advice (₹15000-50000)",
          "Project advisory (₹30000-100000/month)"
        ],
        taskExamples: [
          { title: "Floor plan review", description: "Review house floor plan for efficiency and flow.", budgetRange: "₹5,000 - ₹10,000", duration: "1 hour", skillTags: ["Floor Plan", "Review", "Residential"] },
          { title: "Plot maximization", description: "Advice on best use of 200 sq yard corner plot.", budgetRange: "₹8,000 - ₹15,000", duration: "1-2 hours", skillTags: ["Plot", "Optimization", "Design"] },
          { title: "Renovation advice", description: "Ideas for renovating 20-year-old apartment.", budgetRange: "₹6,000 - ₹12,000", duration: "1 hour", skillTags: ["Renovation", "Apartment", "Ideas"] }
        ]
      },
      {
        name: "Interior Designers",
        slug: "interior-designers-doubts",
        description: "Quick interior design advice and consultations.",
        realTaskStatements: [
          "Help me design my living room",
          "What furniture should I buy?",
          "Color scheme advice for my home",
          "Space planning for small apartment",
          "Office interior guidance",
          "Budget-friendly design ideas"
        ],
        coreSkills: ["Interior Design", "Space Planning", "Color Theory", "Furniture Selection", "Styling"],
        supportingSkills: ["Visualization", "Budget Planning", "Vendor Knowledge", "Trends", "Communication"],
        howYouEarn: [
          "Quick consultations (₹1500-5000/30 min)",
          "Room design advice (₹5000-20000)",
          "Full home consultation (₹15000-50000)",
          "Shopping guidance (₹3000-10000)",
          "Design packages (₹30000-150000)"
        ],
        taskExamples: [
          { title: "Living room makeover advice", description: "Ideas for refreshing living room with existing furniture.", budgetRange: "₹3,000 - ₹6,000", duration: "45 minutes", skillTags: ["Living Room", "Makeover", "Budget"] },
          { title: "Home office design", description: "Design advice for productive home office setup.", budgetRange: "₹4,000 - ₹8,000", duration: "1 hour", skillTags: ["Home Office", "WFH", "Productivity"] },
          { title: "Color consultation", description: "Help choose color palette for entire apartment.", budgetRange: "₹5,000 - ₹10,000", duration: "1-2 hours", skillTags: ["Color", "Palette", "Apartment"] }
        ]
      },
      {
        name: "Lawyers",
        slug: "lawyers-doubts",
        description: "Legal consultations for various matters.",
        realTaskStatements: [
          "Need legal advice for my startup",
          "Review my partnership agreement",
          "Help with property documentation",
          "Legal opinion on business dispute",
          "Consumer rights advice",
          "Employment law questions"
        ],
        coreSkills: ["Legal Expertise", "Document Review", "Legal Research", "Advisory", "Dispute Resolution"],
        supportingSkills: ["Communication", "Negotiation", "Documentation", "Industry Knowledge", "Risk Assessment"],
        howYouEarn: [
          "Consultations (₹2000-10000/30 min)",
          "Document review (₹5000-30000)",
          "Legal opinions (₹10000-50000)",
          "Drafting (₹10000-100000)",
          "Retainer (₹30000-150000/month)"
        ],
        taskExamples: [
          { title: "Startup legal advice", description: "Legal considerations for launching new startup.", budgetRange: "₹5,000 - ₹12,000", duration: "1 hour", skillTags: ["Startup", "Legal", "Advice"] },
          { title: "Agreement review", description: "Review client agreement before signing.", budgetRange: "₹8,000 - ₹20,000", duration: "2-3 hours", skillTags: ["Agreement", "Review", "Client"] },
          { title: "Property dispute advice", description: "Legal options for property boundary dispute.", budgetRange: "₹6,000 - ₹15,000", duration: "1 hour", skillTags: ["Property", "Dispute", "Options"] }
        ]
      },
      {
        name: "Contract Drafting",
        slug: "contract-drafting-doubts",
        description: "Help with creating and reviewing contracts.",
        realTaskStatements: [
          "Draft a service agreement",
          "Create NDA for my business",
          "Partnership deed drafting",
          "Employment contract template",
          "Review and modify contract",
          "Terms and conditions for my app"
        ],
        coreSkills: ["Contract Drafting", "Legal Writing", "Terms & Conditions", "Compliance", "Risk Assessment"],
        supportingSkills: ["Industry Knowledge", "Negotiation", "Communication", "Attention to Detail", "Research"],
        howYouEarn: [
          "Simple contracts (₹5000-15000)",
          "Complex agreements (₹15000-60000)",
          "Terms & privacy policies (₹10000-30000)",
          "Contract review (₹5000-25000)",
          "Template packages (₹20000-80000)"
        ],
        taskExamples: [
          { title: "Service agreement draft", description: "Create service agreement for consulting business.", budgetRange: "₹8,000 - ₹15,000", duration: "3-5 days", skillTags: ["Service", "Agreement", "Consulting"] },
          { title: "NDA template", description: "Standard NDA template for tech company.", budgetRange: "₹5,000 - ₹10,000", duration: "2-3 days", skillTags: ["NDA", "Template", "Tech"] },
          { title: "App legal documents", description: "Terms of service and privacy policy for mobile app.", budgetRange: "₹15,000 - ₹25,000", duration: "1 week", skillTags: ["App", "Terms", "Privacy"] }
        ]
      },
      {
        name: "Startup Compliance",
        slug: "startup-compliance-doubts",
        description: "Compliance and regulatory guidance for startups.",
        realTaskStatements: [
          "What compliances does my startup need?",
          "Help with annual filings",
          "RBI compliance for fintech",
          "DPIIT startup registration",
          "ESOP documentation help",
          "Regulatory guidance for my industry"
        ],
        coreSkills: ["Startup Regulations", "Compliance Management", "Filing Procedures", "Regulatory Knowledge", "Documentation"],
        supportingSkills: ["Legal Knowledge", "Industry Expertise", "Process Management", "Communication", "Advisory"],
        howYouEarn: [
          "Compliance consultations (₹3000-10000)",
          "Filing assistance (₹5000-25000)",
          "Compliance packages (₹20000-100000/year)",
          "ESOP documentation (₹25000-100000)",
          "Regulatory advisory (₹30000-120000/month)"
        ],
        taskExamples: [
          { title: "Startup compliance checklist", description: "Complete list of compliances for funded startup.", budgetRange: "₹5,000 - ₹10,000", duration: "1-2 hours", skillTags: ["Checklist", "Funded", "Startup"] },
          { title: "Annual compliance filing", description: "Help with annual ROC and other filings.", budgetRange: "₹15,000 - ₹30,000", duration: "2-3 weeks", skillTags: ["Annual", "ROC", "Filings"] },
          { title: "ESOP setup", description: "Create ESOP pool and documentation.", budgetRange: "₹40,000 - ₹80,000", duration: "3-4 weeks", skillTags: ["ESOP", "Documentation", "Setup"] }
        ]
      },
      {
        name: "IP & Trademark",
        slug: "ip-trademark-doubts",
        description: "Intellectual property protection guidance.",
        realTaskStatements: [
          "Should I trademark my brand?",
          "How to patent my invention?",
          "Copyright registration process",
          "Is my idea protectable?",
          "Someone copied my brand",
          "IP strategy for my startup"
        ],
        coreSkills: ["IP Law", "Trademark Filing", "Patent Process", "Copyright", "IP Strategy"],
        supportingSkills: ["Research", "Documentation", "Communication", "Enforcement", "Advisory"],
        howYouEarn: [
          "IP consultations (₹3000-10000)",
          "Trademark filing (₹8000-25000)",
          "Patent advisory (₹15000-50000)",
          "IP strategy (₹25000-100000)",
          "Enforcement advice (₹10000-40000)"
        ],
        taskExamples: [
          { title: "Trademark registration", description: "File trademark for brand name and logo.", budgetRange: "₹10,000 - ₹20,000", duration: "Filing + monitoring", skillTags: ["Trademark", "Registration", "Brand"] },
          { title: "IP protection strategy", description: "Comprehensive IP strategy for tech startup.", budgetRange: "₹25,000 - ₹50,000", duration: "2 weeks", skillTags: ["Strategy", "Tech", "Protection"] },
          { title: "Infringement advice", description: "Someone using similar brand - what are my options?", budgetRange: "₹8,000 - ₹15,000", duration: "1-2 hours", skillTags: ["Infringement", "Options", "Brand"] }
        ]
      },
      {
        name: "Corporate Legal Advisory",
        slug: "corporate-legal-advisory-doubts",
        description: "Legal advice for corporate matters.",
        realTaskStatements: [
          "Legal structure for new venture",
          "Board resolution drafting",
          "Shareholder agreement review",
          "M&A legal considerations",
          "Corporate restructuring advice",
          "Compliance for listed companies"
        ],
        coreSkills: ["Corporate Law", "Company Structures", "M&A", "Securities Law", "Governance"],
        supportingSkills: ["Documentation", "Negotiation", "Due Diligence", "Advisory", "Regulatory Knowledge"],
        howYouEarn: [
          "Consultations (₹5000-20000/hour)",
          "Document drafting (₹15000-80000)",
          "M&A advisory (₹100000-500000)",
          "Restructuring (₹50000-300000)",
          "Retainer (₹50000-200000/month)"
        ],
        taskExamples: [
          { title: "Shareholder agreement", description: "Draft shareholder agreement for co-founders.", budgetRange: "₹25,000 - ₹50,000", duration: "1-2 weeks", skillTags: ["SHA", "Founders", "Agreement"] },
          { title: "Investment documentation", description: "Legal docs for angel investment round.", budgetRange: "₹40,000 - ₹80,000", duration: "2-3 weeks", skillTags: ["Investment", "Angel", "Docs"] },
          { title: "Board structure advice", description: "Setting up proper board governance.", budgetRange: "₹15,000 - ₹30,000", duration: "2-3 hours", skillTags: ["Board", "Governance", "Structure"] }
        ]
      },
      {
        name: "Teacher",
        slug: "teacher-doubts",
        description: "Academic help and tutoring consultations.",
        realTaskStatements: [
          "Help my child with math concepts",
          "Explain physics problems",
          "Language learning doubts",
          "Exam preparation guidance",
          "Homework help needed",
          "Concept clarification in science"
        ],
        coreSkills: ["Subject Expertise", "Teaching", "Explanation Skills", "Patience", "Curriculum Knowledge"],
        supportingSkills: ["Communication", "Adaptability", "Assessment", "Motivation", "Technology"],
        howYouEarn: [
          "Quick doubt sessions (₹200-800)",
          "Hourly tutoring (₹500-2000/hour)",
          "Exam prep packages (₹5000-25000)",
          "Monthly tutoring (₹4000-20000/month)",
          "Concept workshops (₹2000-8000)"
        ],
        taskExamples: [
          { title: "Math doubt clearing", description: "30-minute session to clear calculus doubts.", budgetRange: "₹300 - ₹600", duration: "30 minutes", skillTags: ["Math", "Calculus", "Quick"] },
          { title: "Board exam prep", description: "Weekly sessions for Class 12 physics preparation.", budgetRange: "₹6,000 - ₹12,000", duration: "Per month", skillTags: ["Physics", "Board Exam", "Class 12"] },
          { title: "Concept session", description: "One-time session to explain organic chemistry basics.", budgetRange: "₹800 - ₹1,500", duration: "1 hour", skillTags: ["Chemistry", "Organic", "Basics"] }
        ]
      },
      {
        name: "Study Abroad Consulting",
        slug: "study-abroad-consulting-doubts",
        description: "Guidance for international education.",
        realTaskStatements: [
          "Which country is best for my studies?",
          "Help with university selection",
          "SOP and application guidance",
          "Visa process advice",
          "Scholarship opportunities",
          "Compare MS programs for me"
        ],
        coreSkills: ["International Education", "University Knowledge", "Application Process", "Visa Requirements", "Scholarship Info"],
        supportingSkills: ["Communication", "Research", "Writing Guidance", "Country Knowledge", "Career Advisory"],
        howYouEarn: [
          "Consultations (₹1000-5000)",
          "University shortlisting (₹5000-15000)",
          "Full application support (₹25000-100000)",
          "SOP guidance (₹5000-20000)",
          "Visa support (₹10000-30000)"
        ],
        taskExamples: [
          { title: "MS program comparison", description: "Compare CS programs in USA, Canada, and Germany.", budgetRange: "₹3,000 - ₹6,000", duration: "1 hour", skillTags: ["MS", "Comparison", "CS"] },
          { title: "University shortlisting", description: "Create target list of 10 universities for MBA.", budgetRange: "₹8,000 - ₹15,000", duration: "1 week", skillTags: ["MBA", "Universities", "Shortlist"] },
          { title: "SOP review", description: "Review and provide feedback on statement of purpose.", budgetRange: "₹4,000 - ₹8,000", duration: "2-3 days", skillTags: ["SOP", "Review", "Feedback"] }
        ]
      },
      {
        name: "Cybersecurity Consulting",
        slug: "cybersecurity-consulting-doubts",
        description: "Quick cybersecurity advice and assessments.",
        realTaskStatements: [
          "Is my website secure?",
          "Help me after a security breach",
          "Security best practices advice",
          "Review our security setup",
          "What security do I need for compliance?",
          "Protect my business from cyber threats"
        ],
        coreSkills: ["Security Assessment", "Threat Analysis", "Best Practices", "Incident Response", "Compliance"],
        supportingSkills: ["Technical Knowledge", "Communication", "Documentation", "Risk Management", "Training"],
        howYouEarn: [
          "Quick consultations (₹3000-10000)",
          "Security assessments (₹25000-100000)",
          "Incident response (₹20000-80000)",
          "Best practices review (₹15000-50000)",
          "Security advisory (₹40000-150000/month)"
        ],
        taskExamples: [
          { title: "Quick security review", description: "Basic security assessment of website and systems.", budgetRange: "₹15,000 - ₹30,000", duration: "1 week", skillTags: ["Review", "Website", "Assessment"] },
          { title: "Incident response", description: "Help after suspected security breach.", budgetRange: "₹25,000 - ₹60,000", duration: "Immediate", skillTags: ["Incident", "Breach", "Response"] },
          { title: "Security setup advice", description: "Security recommendations for new startup.", budgetRange: "₹8,000 - ₹15,000", duration: "1-2 hours", skillTags: ["Startup", "Setup", "Recommendations"] }
        ]
      },
      {
        name: "Vastu Consultants",
        slug: "vastu-consultants-doubts",
        description: "Vastu Shastra consultations for homes and offices.",
        realTaskStatements: [
          "Is my home Vastu compliant?",
          "Vastu for new office space",
          "Remedies for Vastu defects",
          "Which direction for pooja room?",
          "Vastu for shop opening",
          "Review floor plan as per Vastu"
        ],
        coreSkills: ["Vastu Shastra", "Spatial Analysis", "Remedy Suggestions", "Direction Analysis", "Traditional Knowledge"],
        supportingSkills: ["Communication", "Visualization", "Practical Solutions", "Client Relations", "Documentation"],
        howYouEarn: [
          "Consultations (₹1500-5000)",
          "Home Vastu analysis (₹5000-20000)",
          "Office Vastu (₹8000-30000)",
          "Site visits (₹10000-40000)",
          "Remedy consultation (₹3000-10000)"
        ],
        taskExamples: [
          { title: "Home Vastu review", description: "Complete Vastu analysis of 3BHK apartment.", budgetRange: "₹5,000 - ₹10,000", duration: "1-2 hours", skillTags: ["Home", "Apartment", "Analysis"] },
          { title: "New office Vastu", description: "Vastu consultation for new office setup.", budgetRange: "₹10,000 - ₹20,000", duration: "Half day", skillTags: ["Office", "New", "Setup"] },
          { title: "Floor plan review", description: "Review proposed floor plan for Vastu compliance.", budgetRange: "₹4,000 - ₹8,000", duration: "1 hour", skillTags: ["Floor Plan", "Review", "Compliance"] }
        ]
      },
      {
        name: "YouTube Growth",
        slug: "youtube-growth-doubts",
        description: "Advice on growing YouTube channel.",
        realTaskStatements: [
          "Why isn't my channel growing?",
          "Review my YouTube strategy",
          "How to get more subscribers?",
          "Advice on video optimization",
          "Should I change my niche?",
          "Monetization strategy help"
        ],
        coreSkills: ["YouTube Algorithm", "Content Strategy", "Analytics", "SEO for YouTube", "Audience Growth"],
        supportingSkills: ["Video Production Knowledge", "Trend Awareness", "Thumbnail Strategy", "Community Building", "Monetization"],
        howYouEarn: [
          "Quick consultations (₹1000-4000)",
          "Channel audits (₹5000-20000)",
          "Growth strategy (₹10000-40000)",
          "Monthly coaching (₹15000-50000/month)",
          "Content strategy (₹8000-25000)"
        ],
        taskExamples: [
          { title: "Channel audit", description: "Full audit of YouTube channel with growth recommendations.", budgetRange: "₹8,000 - ₹15,000", duration: "2-3 days", skillTags: ["Audit", "Growth", "Recommendations"] },
          { title: "Strategy session", description: "1-hour call to discuss channel growth strategy.", budgetRange: "₹3,000 - ₹6,000", duration: "1 hour", skillTags: ["Strategy", "Call", "Growth"] },
          { title: "SEO optimization advice", description: "Optimize titles, descriptions, and tags for better reach.", budgetRange: "₹5,000 - ₹10,000", duration: "Per video batch", skillTags: ["SEO", "Optimization", "Reach"] }
        ]
      },
      {
        name: "Social Media",
        slug: "social-media-doubts",
        description: "Social media strategy and growth consultations.",
        realTaskStatements: [
          "How to grow my Instagram?",
          "Review my social media strategy",
          "Which platforms should I focus on?",
          "Help with content ideas",
          "Why is engagement dropping?",
          "Personal brand building advice"
        ],
        coreSkills: ["Platform Expertise", "Content Strategy", "Analytics", "Trend Awareness", "Audience Building"],
        supportingSkills: ["Content Creation", "Copywriting", "Community Management", "Paid Ads Knowledge", "Branding"],
        howYouEarn: [
          "Quick consultations (₹1000-4000)",
          "Strategy sessions (₹5000-20000)",
          "Profile audits (₹3000-12000)",
          "Monthly coaching (₹10000-40000/month)",
          "Content planning (₹8000-25000)"
        ],
        taskExamples: [
          { title: "Instagram growth strategy", description: "Strategy to grow from 1K to 10K followers.", budgetRange: "₹6,000 - ₹12,000", duration: "1-2 sessions", skillTags: ["Instagram", "Growth", "Strategy"] },
          { title: "Profile audit", description: "Review and improve LinkedIn profile for visibility.", budgetRange: "₹3,000 - ₹6,000", duration: "1-2 hours", skillTags: ["LinkedIn", "Audit", "Profile"] },
          { title: "Content strategy session", description: "Plan content calendar and themes for quarter.", budgetRange: "₹8,000 - ₹15,000", duration: "2 hours", skillTags: ["Content", "Calendar", "Planning"] }
        ]
      }
    ]
  },
  {
    name: "Local Services",
    slug: "local-services",
    description: "Local, on-ground services for homes and events.",
    icon: "MapPin",
    color: "from-orange-500 to-amber-600",
    subCategories: [
      {
        name: "Home Services",
        slug: "home-services",
        description: "General home improvement and maintenance services.",
        realTaskStatements: [
          "Need help with home organization",
          "Deep cleaning for my apartment",
          "Kitchen renovation coordination",
          "Home painting required",
          "Pest control service needed",
          "Home maintenance tasks"
        ],
        coreSkills: ["Home Maintenance", "Cleaning", "Organization", "Coordination", "Quality Check"],
        supportingSkills: ["Vendor Management", "Scheduling", "Communication", "Problem Solving", "Attention to Detail"],
        howYouEarn: [
          "Deep cleaning (₹3000-15000)",
          "Home organization (₹5000-25000)",
          "Painting coordination (₹10000-50000)",
          "Pest control (₹2000-10000)",
          "Maintenance packages (₹5000-20000/month)"
        ],
        taskExamples: [
          { title: "Deep cleaning", description: "Full apartment deep cleaning - 3BHK.", budgetRange: "₹5,000 - ₹10,000", duration: "1 day", skillTags: ["Cleaning", "Deep", "Apartment"] },
          { title: "Home organization", description: "Declutter and organize all closets and storage.", budgetRange: "₹8,000 - ₹15,000", duration: "1-2 days", skillTags: ["Organization", "Declutter", "Closets"] },
          { title: "Painting supervision", description: "Coordinate and supervise home painting project.", budgetRange: "₹10,000 - ₹20,000", duration: "1 week", skillTags: ["Painting", "Supervision", "Coordination"] }
        ]
      },
      {
        name: "Repair & Maintenance",
        slug: "repair-maintenance",
        description: "Repair and fix things around your home.",
        realTaskStatements: [
          "AC not cooling properly",
          "Leaking tap needs fixing",
          "Electrical issues in my home",
          "Washing machine repair",
          "Furniture repair needed",
          "General handyman work"
        ],
        coreSkills: ["Appliance Repair", "Plumbing", "Electrical", "Carpentry", "Troubleshooting"],
        supportingSkills: ["Diagnosis", "Parts Sourcing", "Safety", "Customer Service", "Time Management"],
        howYouEarn: [
          "AC service (₹500-3000)",
          "Plumbing fixes (₹300-2000)",
          "Electrical work (₹500-5000)",
          "Appliance repair (₹500-5000)",
          "Handyman visits (₹500-2000)"
        ],
        taskExamples: [
          { title: "AC service and repair", description: "AC not cooling - needs diagnosis and repair.", budgetRange: "₹1,000 - ₹3,000", duration: "Same day", skillTags: ["AC", "Repair", "Cooling"] },
          { title: "Plumbing fixes", description: "Fix leaking taps and running toilet.", budgetRange: "₹500 - ₹1,500", duration: "2-3 hours", skillTags: ["Plumbing", "Leaks", "Bathroom"] },
          { title: "Electrical troubleshooting", description: "Fix electrical issues causing power trips.", budgetRange: "₹1,000 - ₹3,000", duration: "Half day", skillTags: ["Electrical", "Troubleshooting", "Safety"] }
        ]
      },
      {
        name: "Cleaning Services",
        slug: "cleaning-services",
        description: "Professional cleaning services for homes and offices.",
        realTaskStatements: [
          "Regular maid service needed",
          "One-time deep cleaning",
          "Office cleaning services",
          "Post-construction cleanup",
          "Move-out cleaning",
          "Carpet and sofa cleaning"
        ],
        coreSkills: ["Cleaning Techniques", "Time Management", "Attention to Detail", "Equipment Usage", "Organization"],
        supportingSkills: ["Reliability", "Physical Fitness", "Customer Service", "Flexibility", "Trustworthiness"],
        howYouEarn: [
          "Regular cleaning (₹8000-25000/month)",
          "Deep cleaning (₹3000-15000)",
          "Office cleaning (₹10000-50000/month)",
          "Move-out cleaning (₹5000-15000)",
          "Specialty cleaning (₹3000-20000)"
        ],
        taskExamples: [
          { title: "Daily maid service", description: "Daily cleaning for 3BHK apartment.", budgetRange: "₹10,000 - ₹18,000", duration: "Per month", skillTags: ["Daily", "Maid", "Regular"] },
          { title: "Post-renovation cleaning", description: "Deep clean after home renovation.", budgetRange: "₹8,000 - ₹15,000", duration: "1-2 days", skillTags: ["Post-renovation", "Deep", "Thorough"] },
          { title: "Office daily cleaning", description: "Daily cleaning for 2000 sq ft office.", budgetRange: "₹15,000 - ₹25,000", duration: "Per month", skillTags: ["Office", "Daily", "Commercial"] }
        ]
      },
      {
        name: "Event Services",
        slug: "event-services",
        description: "On-ground support for events and gatherings.",
        realTaskStatements: [
          "Need helpers for house party",
          "Event setup and cleanup",
          "Waiters for private dinner",
          "Birthday party support",
          "Valet parking for event",
          "Catering service coordination"
        ],
        coreSkills: ["Event Support", "Service Skills", "Setup/Cleanup", "Coordination", "Customer Service"],
        supportingSkills: ["Presentation", "Reliability", "Physical Fitness", "Problem Solving", "Flexibility"],
        howYouEarn: [
          "Event helpers (₹500-1500/person/event)",
          "Waiters (₹800-2000/person/event)",
          "Setup/cleanup (₹2000-10000)",
          "Valet parking (₹5000-20000)",
          "Full event support (₹15000-60000)"
        ],
        taskExamples: [
          { title: "House party helpers", description: "2 helpers for setup, serving, and cleanup.", budgetRange: "₹3,000 - ₹6,000", duration: "6-8 hours", skillTags: ["Party", "Helpers", "Home"] },
          { title: "Birthday party support", description: "Complete support for kid's birthday party.", budgetRange: "₹8,000 - ₹15,000", duration: "Half day", skillTags: ["Birthday", "Kids", "Support"] },
          { title: "Private dinner service", description: "2 trained waiters for dinner party of 12.", budgetRange: "₹4,000 - ₹8,000", duration: "Evening", skillTags: ["Dinner", "Waiters", "Private"] }
        ]
      },
      {
        name: "Field Sales",
        slug: "field-sales",
        description: "On-ground sales and distribution support.",
        realTaskStatements: [
          "Distribute flyers in specific area",
          "Field sales for my product",
          "Retail store visits for my brand",
          "On-ground brand activation",
          "Door-to-door marketing",
          "Collect market feedback locally"
        ],
        coreSkills: ["Sales Skills", "Communication", "Local Knowledge", "Persistence", "Reporting"],
        supportingSkills: ["Physical Fitness", "Time Management", "Data Collection", "Problem Solving", "Reliability"],
        howYouEarn: [
          "Flyer distribution (₹500-2000/day)",
          "Field sales (₹1000-3000/day + commission)",
          "Store visits (₹800-2500/day)",
          "Market research (₹1000-3000/day)",
          "Activations (₹1500-5000/day)"
        ],
        taskExamples: [
          { title: "Flyer distribution", description: "Distribute 1000 flyers in residential area.", budgetRange: "₹2,000 - ₹4,000", duration: "1 day", skillTags: ["Flyers", "Distribution", "Local"] },
          { title: "Retail store visits", description: "Visit 30 stores to pitch new product.", budgetRange: "₹4,000 - ₹8,000", duration: "2 days", skillTags: ["Retail", "Visits", "Pitch"] },
          { title: "Market feedback collection", description: "Collect feedback from 50 local shops.", budgetRange: "₹3,000 - ₹6,000", duration: "1-2 days", skillTags: ["Feedback", "Market", "Research"] }
        ]
      },
      {
        name: "Beauty & Grooming",
        slug: "beauty-grooming",
        description: "Beauty and grooming services at home.",
        realTaskStatements: [
          "Bridal makeup at home",
          "Hair styling for event",
          "Regular salon services at home",
          "Men's grooming at home",
          "Party makeup",
          "Mehendi for wedding"
        ],
        coreSkills: ["Beauty Services", "Makeup", "Hair Styling", "Skincare", "Mehendi"],
        supportingSkills: ["Customer Service", "Hygiene", "Time Management", "Trend Awareness", "Communication"],
        howYouEarn: [
          "Basic services (₹500-2000)",
          "Party makeup (₹3000-10000)",
          "Bridal packages (₹15000-60000)",
          "Hair services (₹500-5000)",
          "Mehendi (₹2000-20000)"
        ],
        taskExamples: [
          { title: "Bridal makeup", description: "Complete bridal makeup with hair styling.", budgetRange: "₹20,000 - ₹40,000", duration: "4-5 hours", skillTags: ["Bridal", "Makeup", "Hair"] },
          { title: "Party makeup at home", description: "Makeup for evening party - self.", budgetRange: "₹3,000 - ₹6,000", duration: "1-2 hours", skillTags: ["Party", "Makeup", "Home"] },
          { title: "Wedding mehendi", description: "Mehendi for bride and family.", budgetRange: "₹8,000 - ₹20,000", duration: "4-6 hours", skillTags: ["Mehendi", "Wedding", "Bridal"] }
        ]
      }
    ]
  },
  {
    name: "Events & Experiences",
    slug: "events-experiences",
    description: "Plan, organize, and execute memorable events.",
    icon: "PartyPopper",
    color: "from-pink-500 to-rose-600",
    subCategories: [
      {
        name: "Event Planning",
        slug: "event-planning",
        description: "Complete event planning and coordination services.",
        realTaskStatements: [
          "Plan my wedding from scratch",
          "Organize a corporate retreat",
          "Birthday party planning",
          "Anniversary celebration planning",
          "House warming event",
          "Baby shower organization"
        ],
        coreSkills: ["Event Planning", "Vendor Management", "Budget Management", "Timeline Creation", "Coordination"],
        supportingSkills: ["Creativity", "Problem Solving", "Negotiation", "Communication", "Attention to Detail"],
        howYouEarn: [
          "Small events (₹15000-50000)",
          "Medium events (₹50000-200000)",
          "Large events (₹200000-1000000)",
          "Consulting (₹5000-15000/session)",
          "Percentage of event budget (10-20%)"
        ],
        taskExamples: [
          { title: "Wedding planning", description: "Complete planning for 200-guest wedding.", budgetRange: "₹200,000 - ₹500,000", duration: "3-6 months", skillTags: ["Wedding", "Complete", "Planning"] },
          { title: "Birthday celebration", description: "Plan themed birthday party for 50 guests.", budgetRange: "₹30,000 - ₹60,000", duration: "2-4 weeks", skillTags: ["Birthday", "Themed", "Party"] },
          { title: "Baby shower", description: "Organize memorable baby shower for 30 guests.", budgetRange: "₹20,000 - ₹40,000", duration: "2-3 weeks", skillTags: ["Baby Shower", "Celebration", "Family"] }
        ]
      },
      {
        name: "Corporate Events",
        slug: "corporate-events",
        description: "Professional corporate event management.",
        realTaskStatements: [
          "Annual day celebration for company",
          "Team offsite organization",
          "Product launch event",
          "Corporate conference setup",
          "Award ceremony planning",
          "Company anniversary celebration"
        ],
        coreSkills: ["Corporate Event Planning", "Vendor Management", "AV Coordination", "Timeline Management", "Stakeholder Management"],
        supportingSkills: ["Presentation", "Budget Management", "Negotiation", "Problem Solving", "Professional Communication"],
        howYouEarn: [
          "Small corporate events (₹50000-200000)",
          "Team offsites (₹100000-500000)",
          "Conferences (₹200000-1500000)",
          "Product launches (₹300000-2000000)",
          "Consulting (₹10000-30000/day)"
        ],
        taskExamples: [
          { title: "Annual day event", description: "Plan annual day for 500 employees.", budgetRange: "₹500,000 - ₹1,000,000", duration: "2-3 months", skillTags: ["Annual Day", "Large", "Corporate"] },
          { title: "Team offsite", description: "2-day team offsite for 50 people.", budgetRange: "₹300,000 - ₹600,000", duration: "4-6 weeks", skillTags: ["Offsite", "Team", "Retreat"] },
          { title: "Product launch", description: "Launch event for new product with media.", budgetRange: "₹400,000 - ₹800,000", duration: "6-8 weeks", skillTags: ["Launch", "Product", "Media"] }
        ]
      },
      {
        name: "Wedding Professionals",
        slug: "wedding-professionals",
        description: "Specialized wedding services and vendors.",
        realTaskStatements: [
          "Need a wedding photographer",
          "Looking for wedding decorator",
          "Choreographer for sangeet",
          "Wedding invitation design",
          "Mehendi artist for wedding",
          "Wedding catering services"
        ],
        coreSkills: ["Wedding Specialization", "Service Excellence", "Coordination", "Timeline Adherence", "Quality Delivery"],
        supportingSkills: ["Client Management", "Creativity", "Flexibility", "Problem Solving", "Team Coordination"],
        howYouEarn: [
          "Photography (₹50000-500000)",
          "Decoration (₹100000-1000000)",
          "Choreography (₹30000-150000)",
          "Invitations (₹20000-100000)",
          "Catering (₹800-3000/plate)"
        ],
        taskExamples: [
          { title: "Wedding photography", description: "Complete wedding photography for 2-day event.", budgetRange: "₹100,000 - ₹250,000", duration: "2 days + editing", skillTags: ["Photography", "Wedding", "Complete"] },
          { title: "Sangeet choreography", description: "Choreograph 8 performances for sangeet.", budgetRange: "₹50,000 - ₹100,000", duration: "3-4 weeks", skillTags: ["Choreography", "Sangeet", "Dance"] },
          { title: "Wedding decoration", description: "Complete decor for wedding venue.", budgetRange: "₹200,000 - ₹500,000", duration: "Event day", skillTags: ["Decoration", "Venue", "Complete"] }
        ]
      },
      {
        name: "Exhibitions & Trade Shows",
        slug: "exhibitions-trade-shows",
        description: "Exhibition setup, stall design, and trade show management.",
        realTaskStatements: [
          "Design and build exhibition stall",
          "Manage our trade show presence",
          "Booth staff for exhibition",
          "Lead capture at trade show",
          "Exhibition logistics management",
          "Trade show marketing support"
        ],
        coreSkills: ["Exhibition Design", "Stall Construction", "Event Logistics", "Lead Generation", "Trade Show Management"],
        supportingSkills: ["Project Management", "Vendor Coordination", "Marketing", "Customer Engagement", "Reporting"],
        howYouEarn: [
          "Stall design (₹30000-150000)",
          "Stall construction (₹100000-800000)",
          "Trade show management (₹100000-500000)",
          "Booth staffing (₹2000-5000/person/day)",
          "Lead capture (₹50000-200000)"
        ],
        taskExamples: [
          { title: "Exhibition stall design", description: "Design 3x3m exhibition stall for tech conference.", budgetRange: "₹50,000 - ₹100,000", duration: "2-3 weeks", skillTags: ["Stall", "Design", "Tech"] },
          { title: "Trade show management", description: "Complete management of 3-day trade show presence.", budgetRange: "₹200,000 - ₹400,000", duration: "3 days + prep", skillTags: ["Trade Show", "Management", "Complete"] },
          { title: "Booth staffing", description: "Trained staff for 2-day exhibition.", budgetRange: "₹20,000 - ₹40,000", duration: "2 days", skillTags: ["Staffing", "Booth", "Exhibition"] }
        ]
      },
      {
        name: "Brand Activations",
        slug: "brand-activations",
        description: "On-ground brand activation and experiential marketing.",
        realTaskStatements: [
          "Mall activation for product launch",
          "College campus activation",
          "Street marketing campaign",
          "Pop-up store setup",
          "Brand sampling activity",
          "Interactive brand experience"
        ],
        coreSkills: ["Activation Planning", "Brand Marketing", "Experiential Design", "Team Management", "Execution"],
        supportingSkills: ["Creativity", "Logistics", "Vendor Management", "Reporting", "Customer Engagement"],
        howYouEarn: [
          "Small activations (₹50000-200000)",
          "Mall activations (₹150000-600000)",
          "Campus activations (₹100000-400000)",
          "Pop-up stores (₹200000-1000000)",
          "Multi-city campaigns (₹500000-3000000)"
        ],
        taskExamples: [
          { title: "Mall brand activation", description: "Weekend activation in premium mall for FMCG brand.", budgetRange: "₹200,000 - ₹400,000", duration: "2 days", skillTags: ["Mall", "FMCG", "Weekend"] },
          { title: "Campus activation", description: "Activation across 5 engineering colleges.", budgetRange: "₹300,000 - ₹500,000", duration: "2 weeks", skillTags: ["Campus", "College", "Multi-location"] },
          { title: "Product sampling", description: "Sampling activity in residential societies.", budgetRange: "₹100,000 - ₹200,000", duration: "1 week", skillTags: ["Sampling", "Residential", "FMCG"] }
        ]
      }
    ]
  },
  // ============================================================
  // PART 5: Execution & Management, Assembly & Setup, Tech Help
  // ============================================================
  {
    name: "Execution & Management",
    slug: "execution-management",
    description: "Get things done with reliable personal assistance and task coordination.",
    icon: "CheckCircle",
    color: "from-teal-500 to-cyan-600",
    subCategories: [
      {
        name: "Personal Errands",
        slug: "personal-errands",
        description: "Get help running personal errands and tasks.",
        realTaskStatements: [
          "Pick up documents from government office",
          "Stand in line for passport appointment",
          "Buy and deliver gifts for someone",
          "Return items to multiple stores",
          "Collect prescriptions from pharmacy",
          "Run multiple errands in one trip"
        ],
        coreSkills: ["Time Management", "Local Navigation", "Communication", "Reliability", "Problem Solving"],
        supportingSkills: ["Organization", "Flexibility", "Customer Service", "Trustworthiness", "Physical Fitness"],
        howYouEarn: [
          "Simple errands (₹300-800)",
          "Complex errands (₹800-2000)",
          "Multi-stop errands (₹1000-3000)",
          "Full day assistance (₹2000-5000)",
          "Monthly retainer (₹8000-20000)"
        ],
        taskExamples: [
          { title: "Document collection", description: "Collect passport from passport office.", budgetRange: "₹500 - ₹1,000", duration: "2-4 hours", skillTags: ["Documents", "Government", "Collection"] },
          { title: "Gift shopping and delivery", description: "Buy birthday gift and deliver across city.", budgetRange: "₹800 - ₹1,500", duration: "3-4 hours", skillTags: ["Shopping", "Delivery", "Gift"] },
          { title: "Multiple errands", description: "Bank, post office, and store visits in one trip.", budgetRange: "₹1,000 - ₹2,000", duration: "Half day", skillTags: ["Multiple", "Errands", "Efficient"] }
        ]
      },
      {
        name: "Relocation Assistance",
        slug: "relocation-assistance",
        description: "Help with moving and settling into new location.",
        realTaskStatements: [
          "Help me coordinate my house move",
          "Supervise packers and movers",
          "Set up new home after moving",
          "Find and arrange utilities in new city",
          "Help with intercity relocation",
          "Coordinate office relocation"
        ],
        coreSkills: ["Coordination", "Vendor Management", "Organization", "Problem Solving", "Communication"],
        supportingSkills: ["Local Knowledge", "Negotiation", "Physical Assistance", "Planning", "Attention to Detail"],
        howYouEarn: [
          "Move supervision (₹2000-5000)",
          "Full relocation coordination (₹10000-30000)",
          "Utility setup (₹2000-5000)",
          "Office relocation (₹20000-80000)",
          "Intercity coordination (₹15000-50000)"
        ],
        taskExamples: [
          { title: "Move day supervision", description: "Supervise packers and movers on moving day.", budgetRange: "₹2,500 - ₹5,000", duration: "Full day", skillTags: ["Moving", "Supervision", "Day-of"] },
          { title: "New home setup", description: "Set up new apartment - utilities, internet, essentials.", budgetRange: "₹5,000 - ₹10,000", duration: "2-3 days", skillTags: ["Setup", "Utilities", "New Home"] },
          { title: "Full relocation support", description: "End-to-end support for moving to new city.", budgetRange: "₹15,000 - ₹30,000", duration: "1-2 weeks", skillTags: ["Relocation", "Full", "New City"] }
        ]
      },
      {
        name: "Property Scouting",
        slug: "property-scouting",
        description: "Find and evaluate properties on your behalf.",
        realTaskStatements: [
          "Scout rental apartments for me",
          "Visit and report on properties",
          "Find office space options",
          "Check out properties before I visit",
          "Research neighborhoods for me",
          "Evaluate property conditions"
        ],
        coreSkills: ["Property Evaluation", "Research", "Reporting", "Local Knowledge", "Negotiation Basics"],
        supportingSkills: ["Photography", "Communication", "Attention to Detail", "Transportation", "Documentation"],
        howYouEarn: [
          "Property visits (₹500-1500/property)",
          "Area scouting (₹2000-5000)",
          "Full property search (₹10000-30000)",
          "Commercial space scouting (₹15000-50000)",
          "Detailed reports (₹2000-5000/property)"
        ],
        taskExamples: [
          { title: "Apartment scouting", description: "Visit and report on 10 rental apartments.", budgetRange: "₹5,000 - ₹10,000", duration: "2-3 days", skillTags: ["Rental", "Apartments", "Scouting"] },
          { title: "Office space search", description: "Find and evaluate 5 office spaces in IT corridor.", budgetRange: "₹8,000 - ₹15,000", duration: "1 week", skillTags: ["Office", "Commercial", "Search"] },
          { title: "Neighborhood research", description: "Research 3 neighborhoods for family relocation.", budgetRange: "₹4,000 - ₹8,000", duration: "3-4 days", skillTags: ["Neighborhood", "Research", "Family"] }
        ]
      },
      {
        name: "Vendor Coordination",
        slug: "vendor-coordination",
        description: "Manage and coordinate with service vendors.",
        realTaskStatements: [
          "Coordinate home renovation vendors",
          "Manage multiple service providers",
          "Supervise contractor work",
          "Coordinate event vendors",
          "Get quotes from multiple vendors",
          "Handle vendor scheduling and payments"
        ],
        coreSkills: ["Vendor Management", "Coordination", "Negotiation", "Quality Control", "Communication"],
        supportingSkills: ["Documentation", "Scheduling", "Problem Solving", "Local Knowledge", "Budget Management"],
        howYouEarn: [
          "Simple coordination (₹2000-5000)",
          "Project coordination (₹10000-30000)",
          "Ongoing management (₹15000-40000/month)",
          "Event vendor coordination (₹10000-30000)",
          "Renovation supervision (₹20000-60000)"
        ],
        taskExamples: [
          { title: "Home renovation coordination", description: "Coordinate carpenter, painter, and electrician for renovation.", budgetRange: "₹15,000 - ₹30,000", duration: "2-4 weeks", skillTags: ["Renovation", "Multiple Vendors", "Home"] },
          { title: "Event vendor management", description: "Coordinate catering, decoration, and music vendors.", budgetRange: "₹10,000 - ₹20,000", duration: "2 weeks", skillTags: ["Event", "Vendors", "Coordination"] },
          { title: "Quote collection", description: "Get quotes from 5 vendors for office interior work.", budgetRange: "₹3,000 - ₹6,000", duration: "1 week", skillTags: ["Quotes", "Comparison", "Office"] }
        ]
      },
      {
        name: "Local Research",
        slug: "local-research",
        description: "On-ground research and information gathering.",
        realTaskStatements: [
          "Research local market for my product",
          "Visit and document competitor stores",
          "Find local suppliers and vendors",
          "Gather local market intelligence",
          "Mystery shopping visits",
          "Survey local customers"
        ],
        coreSkills: ["Research", "Observation", "Documentation", "Communication", "Analysis"],
        supportingSkills: ["Photography", "Local Knowledge", "Interviewing", "Report Writing", "Attention to Detail"],
        howYouEarn: [
          "Store visits (₹500-1500/visit)",
          "Market research (₹5000-20000)",
          "Mystery shopping (₹1000-3000/visit)",
          "Supplier finding (₹5000-15000)",
          "Customer surveys (₹3000-10000)"
        ],
        taskExamples: [
          { title: "Competitor store visits", description: "Visit and document 10 competitor retail stores.", budgetRange: "₹8,000 - ₹15,000", duration: "1 week", skillTags: ["Competitor", "Retail", "Documentation"] },
          { title: "Local supplier search", description: "Find 5 potential suppliers for packaging materials.", budgetRange: "₹6,000 - ₹12,000", duration: "1 week", skillTags: ["Supplier", "Local", "Search"] },
          { title: "Mystery shopping", description: "Mystery shop our 5 franchise locations.", budgetRange: "₹10,000 - ₹18,000", duration: "1 week", skillTags: ["Mystery Shop", "Quality", "Franchise"] }
        ]
      },
      {
        name: "Setup & Onboarding",
        slug: "setup-onboarding",
        description: "Help set up offices, stores, and new operations.",
        realTaskStatements: [
          "Set up our new office space",
          "Help onboard new employees",
          "Set up retail store for opening",
          "Configure systems and processes",
          "Create documentation and SOPs",
          "Training support for new team"
        ],
        coreSkills: ["Setup & Organization", "Process Design", "Training", "Documentation", "Project Management"],
        supportingSkills: ["Technical Skills", "Communication", "Problem Solving", "Attention to Detail", "Flexibility"],
        howYouEarn: [
          "Office setup (₹15000-50000)",
          "Store setup (₹20000-80000)",
          "Onboarding support (₹10000-30000)",
          "SOP creation (₹15000-50000)",
          "Training delivery (₹5000-15000/day)"
        ],
        taskExamples: [
          { title: "Office setup", description: "Complete setup of 10-person office space.", budgetRange: "₹25,000 - ₹50,000", duration: "1-2 weeks", skillTags: ["Office", "Setup", "Complete"] },
          { title: "Store opening support", description: "Help set up and open new retail store.", budgetRange: "₹30,000 - ₹60,000", duration: "2 weeks", skillTags: ["Retail", "Opening", "Store"] },
          { title: "Team onboarding", description: "Onboard and train 5 new employees.", budgetRange: "₹15,000 - ₹30,000", duration: "1 week", skillTags: ["Onboarding", "Training", "New Hires"] }
        ]
      },
      {
        name: "Personal Assistant (Remote)",
        slug: "personal-assistant-remote",
        description: "Remote personal assistance for executives and busy professionals.",
        realTaskStatements: [
          "Manage my calendar and scheduling",
          "Handle my emails and correspondence",
          "Research and compile information",
          "Book travel and accommodations",
          "Personal task management",
          "Administrative support remotely"
        ],
        coreSkills: ["Calendar Management", "Email Management", "Research", "Travel Planning", "Organization"],
        supportingSkills: ["Communication", "Discretion", "Tech Proficiency", "Problem Solving", "Time Management"],
        howYouEarn: [
          "Part-time PA (₹15000-35000/month)",
          "Full-time PA (₹35000-70000/month)",
          "Executive PA (₹50000-120000/month)",
          "Hourly support (₹400-1000/hour)",
          "Project-based (varies)"
        ],
        taskExamples: [
          { title: "Executive remote PA", description: "Full-time remote PA for startup founder.", budgetRange: "₹45,000 - ₹70,000", duration: "Per month", skillTags: ["Executive", "Full-time", "Remote"] },
          { title: "Part-time calendar support", description: "Manage calendar and scheduling 20 hours/week.", budgetRange: "₹20,000 - ₹35,000", duration: "Per month", skillTags: ["Calendar", "Part-time", "Scheduling"] },
          { title: "Travel planning", description: "Plan and book international business trip.", budgetRange: "₹5,000 - ₹10,000", duration: "1 week", skillTags: ["Travel", "International", "Planning"] }
        ]
      },
      {
        name: "Personal Assistant (On-ground)",
        slug: "personal-assistant-on-ground",
        description: "Physical personal assistance for daily tasks.",
        realTaskStatements: [
          "Accompany me for appointments",
          "Drive me to multiple meetings",
          "Handle in-person tasks for me",
          "Be my hands and feet locally",
          "Personal assistance throughout day",
          "Manage my daily local tasks"
        ],
        coreSkills: ["Physical Presence", "Driving", "Time Management", "Communication", "Problem Solving"],
        supportingSkills: ["Local Navigation", "Flexibility", "Discretion", "Reliability", "Customer Service"],
        howYouEarn: [
          "Daily assistance (₹2000-5000/day)",
          "Half-day (₹1000-2500)",
          "Monthly retainer (₹30000-70000/month)",
          "Hourly (₹300-800/hour)",
          "Event/trip support (₹3000-8000/day)"
        ],
        taskExamples: [
          { title: "Day-long assistance", description: "Full day personal assistance for busy professional.", budgetRange: "₹3,000 - ₹5,000", duration: "Full day", skillTags: ["Full Day", "Personal", "Assistance"] },
          { title: "Meeting accompaniment", description: "Drive to and accompany for 4 meetings across city.", budgetRange: "₹2,000 - ₹4,000", duration: "Half day", skillTags: ["Meetings", "Driving", "Accompany"] },
          { title: "Monthly PA service", description: "Regular on-ground assistance 3 days/week.", budgetRange: "₹40,000 - ₹60,000", duration: "Per month", skillTags: ["Monthly", "Regular", "On-ground"] }
        ]
      },
      {
        name: "Task Coordination",
        slug: "task-coordination",
        description: "Coordinate and manage multiple tasks and projects.",
        realTaskStatements: [
          "Coordinate my home renovation project",
          "Manage multiple parallel tasks",
          "Keep track of all my pending tasks",
          "Follow up with various parties",
          "Project coordination support",
          "Keep things moving on schedule"
        ],
        coreSkills: ["Project Coordination", "Follow-up", "Organization", "Communication", "Time Management"],
        supportingSkills: ["Documentation", "Problem Solving", "Prioritization", "Flexibility", "Attention to Detail"],
        howYouEarn: [
          "Task coordination (₹10000-30000/project)",
          "Ongoing coordination (₹20000-50000/month)",
          "Event coordination (₹15000-40000)",
          "Follow-up services (₹8000-20000/month)",
          "Hourly coordination (₹500-1200/hour)"
        ],
        taskExamples: [
          { title: "Home renovation coordination", description: "Coordinate 3-month home renovation project.", budgetRange: "₹30,000 - ₹50,000", duration: "3 months", skillTags: ["Renovation", "Coordination", "Long-term"] },
          { title: "Wedding task coordination", description: "Track and follow up on all wedding tasks.", budgetRange: "₹20,000 - ₹40,000", duration: "2-3 months", skillTags: ["Wedding", "Tasks", "Follow-up"] },
          { title: "Monthly task management", description: "Manage and follow up on all personal projects.", budgetRange: "₹15,000 - ₹25,000", duration: "Per month", skillTags: ["Monthly", "Management", "Personal"] }
        ]
      },
      {
        name: "Travel Setup & Planning",
        slug: "travel-setup-planning",
        description: "Plan and organize travel arrangements.",
        realTaskStatements: [
          "Plan my family vacation",
          "Create detailed travel itinerary",
          "Book flights, hotels, and activities",
          "Research travel destinations",
          "Handle travel documentation",
          "Plan honeymoon trip"
        ],
        coreSkills: ["Travel Planning", "Itinerary Creation", "Booking Management", "Research", "Budget Planning"],
        supportingSkills: ["Destination Knowledge", "Communication", "Problem Solving", "Negotiation", "Documentation"],
        howYouEarn: [
          "Simple trip planning (₹3000-8000)",
          "Complex itineraries (₹10000-30000)",
          "International trip planning (₹15000-50000)",
          "Group travel (₹20000-60000)",
          "Concierge service (₹25000-80000)"
        ],
        taskExamples: [
          { title: "Family vacation planning", description: "Plan 7-day Kerala trip for family of 5.", budgetRange: "₹8,000 - ₹15,000", duration: "1 week", skillTags: ["Family", "Kerala", "Domestic"] },
          { title: "Honeymoon planning", description: "Complete honeymoon planning - Maldives.", budgetRange: "₹15,000 - ₹30,000", duration: "2 weeks", skillTags: ["Honeymoon", "International", "Luxury"] },
          { title: "Business trip coordination", description: "Arrange 5-city business trip with meetings.", budgetRange: "₹10,000 - ₹20,000", duration: "1 week", skillTags: ["Business", "Multi-city", "Meetings"] }
        ]
      },
      {
        name: "Courier Drop/Pickup",
        slug: "courier-drop-pickup",
        description: "Document and package pickup and delivery.",
        realTaskStatements: [
          "Pick up documents from office",
          "Deliver package across city",
          "Collect items from multiple locations",
          "Same-day document delivery",
          "Regular pickup/drop service",
          "Courier coordination"
        ],
        coreSkills: ["Logistics", "Time Management", "Navigation", "Reliability", "Communication"],
        supportingSkills: ["Vehicle Handling", "Customer Service", "Problem Solving", "Flexibility", "Trustworthiness"],
        howYouEarn: [
          "Single pickup/drop (₹200-600)",
          "Same-day delivery (₹400-1000)",
          "Multi-stop service (₹600-1500)",
          "Regular service (₹5000-15000/month)",
          "Urgent delivery (₹500-1500)"
        ],
        taskExamples: [
          { title: "Document delivery", description: "Urgent document delivery across city.", budgetRange: "₹400 - ₹800", duration: "2-3 hours", skillTags: ["Document", "Urgent", "Same-day"] },
          { title: "Multi-stop pickup", description: "Collect packages from 4 different locations.", budgetRange: "₹800 - ₹1,500", duration: "Half day", skillTags: ["Multi-stop", "Collection", "Pickup"] },
          { title: "Weekly courier service", description: "Regular weekly pickup and delivery for small business.", budgetRange: "₹4,000 - ₹8,000", duration: "Per month", skillTags: ["Weekly", "Regular", "Business"] }
        ]
      },
      {
        name: "Queue Waiting",
        slug: "queue-waiting",
        description: "Wait in queues and lines on your behalf.",
        realTaskStatements: [
          "Wait in line at government office",
          "Hold spot for passport appointment",
          "Queue for event tickets",
          "Stand in line for registration",
          "Wait at bank for my turn",
          "Hospital/clinic queue waiting"
        ],
        coreSkills: ["Patience", "Time Management", "Communication", "Reliability", "Problem Solving"],
        supportingSkills: ["Documentation", "Flexibility", "Physical Stamina", "Updates/Reporting", "Trustworthiness"],
        howYouEarn: [
          "Short queues (₹300-600)",
          "Long queues (₹600-1500)",
          "Full day waiting (₹1500-3000)",
          "VIP/special queues (₹1000-2500)",
          "Multiple queue trips (₹2000-4000)"
        ],
        taskExamples: [
          { title: "Passport office queue", description: "Wait in queue at passport office for document submission.", budgetRange: "₹600 - ₹1,200", duration: "3-5 hours", skillTags: ["Passport", "Government", "Queue"] },
          { title: "Bank work", description: "Complete bank work that requires waiting.", budgetRange: "₹500 - ₹1,000", duration: "2-4 hours", skillTags: ["Bank", "Waiting", "Transaction"] },
          { title: "Hospital registration", description: "Stand in line for hospital OPD registration.", budgetRange: "₹400 - ₹800", duration: "2-3 hours", skillTags: ["Hospital", "Registration", "OPD"] }
        ]
      },
      {
        name: "Shifting Light Furniture",
        slug: "shifting-light-furniture",
        description: "Help moving furniture and household items.",
        realTaskStatements: [
          "Help move furniture within home",
          "Rearrange room furniture",
          "Move items to storage",
          "Help with small move",
          "Shift furniture between rooms",
          "Assembly and placement of new furniture"
        ],
        coreSkills: ["Physical Fitness", "Careful Handling", "Spatial Awareness", "Team Coordination", "Safety"],
        supportingSkills: ["Time Management", "Communication", "Problem Solving", "Reliability", "Flexibility"],
        howYouEarn: [
          "Small moves (₹500-1500)",
          "Room rearrangement (₹800-2000)",
          "Half-day help (₹1500-3000)",
          "Full-day labor (₹2500-5000)",
          "Team labor (₹4000-10000)"
        ],
        taskExamples: [
          { title: "Room rearrangement", description: "Rearrange living room furniture for new layout.", budgetRange: "₹800 - ₹1,500", duration: "2-3 hours", skillTags: ["Rearrange", "Living Room", "Furniture"] },
          { title: "Move to storage", description: "Move items from home to nearby storage unit.", budgetRange: "₹1,500 - ₹3,000", duration: "Half day", skillTags: ["Storage", "Move", "Items"] },
          { title: "New furniture placement", description: "Unbox and place new furniture in rooms.", budgetRange: "₹1,000 - ₹2,000", duration: "2-4 hours", skillTags: ["New", "Placement", "Setup"] }
        ]
      },
      {
        name: "Help During Relocation",
        slug: "help-during-relocation",
        description: "Manual help during house moving.",
        realTaskStatements: [
          "Help the movers on moving day",
          "Extra hands during relocation",
          "Supervise and assist with packing",
          "Help unload at new place",
          "Assist with heavy lifting",
          "Support during house shift"
        ],
        coreSkills: ["Physical Labor", "Coordination", "Careful Handling", "Teamwork", "Endurance"],
        supportingSkills: ["Communication", "Problem Solving", "Reliability", "Safety Awareness", "Flexibility"],
        howYouEarn: [
          "Helper for move (₹1000-2500/person)",
          "Full day help (₹2000-4000/person)",
          "Team of helpers (₹4000-10000)",
          "Supervision + help (₹3000-6000)",
          "Multi-day support (₹5000-12000)"
        ],
        taskExamples: [
          { title: "Moving day helper", description: "One person to help movers throughout the day.", budgetRange: "₹2,000 - ₹3,500", duration: "Full day", skillTags: ["Moving Day", "Helper", "Labor"] },
          { title: "Unloading assistance", description: "Help unload truck and place items at new home.", budgetRange: "₹1,500 - ₹3,000", duration: "4-6 hours", skillTags: ["Unloading", "New Home", "Placement"] },
          { title: "Packing assistance", description: "Help with packing and boxing items.", budgetRange: "₹1,500 - ₹2,500", duration: "Half day", skillTags: ["Packing", "Boxing", "Assistance"] }
        ]
      }
    ]
  },
  {
    name: "Assembly & Setup (Basic)",
    slug: "assembly-setup-basic",
    description: "Basic assembly and installation that doesn't require professional certification.",
    icon: "Wrench",
    color: "from-gray-500 to-slate-600",
    subCategories: [
      {
        name: "Furniture Assembly (IKEA-type)",
        slug: "furniture-assembly-ikea-type",
        description: "Assemble flat-pack and ready-to-assemble furniture.",
        realTaskStatements: [
          "Assemble my new IKEA furniture",
          "Put together flat-pack wardrobe",
          "Assemble office desk and chair",
          "Set up new bed frame",
          "Assemble multiple furniture pieces",
          "Furniture assembly for new home"
        ],
        coreSkills: ["Furniture Assembly", "Tool Usage", "Instruction Following", "Spatial Awareness", "Attention to Detail"],
        supportingSkills: ["Physical Fitness", "Patience", "Problem Solving", "Organization", "Time Management"],
        howYouEarn: [
          "Simple items (₹300-800)",
          "Medium complexity (₹800-1500)",
          "Large items (₹1500-3000)",
          "Multiple items (₹2000-6000)",
          "Full home assembly (₹5000-15000)"
        ],
        taskExamples: [
          { title: "IKEA wardrobe assembly", description: "Assemble PAX wardrobe system.", budgetRange: "₹1,500 - ₹3,000", duration: "3-5 hours", skillTags: ["IKEA", "Wardrobe", "PAX"] },
          { title: "Office furniture setup", description: "Assemble desk, chair, and bookshelf.", budgetRange: "₹1,200 - ₹2,500", duration: "3-4 hours", skillTags: ["Office", "Desk", "Chair"] },
          { title: "Bed frame assembly", description: "Assemble king-size bed with storage.", budgetRange: "₹1,000 - ₹2,000", duration: "2-3 hours", skillTags: ["Bed", "King-size", "Storage"] }
        ]
      },
      {
        name: "Shelf Installation (Basic)",
        slug: "shelf-installation-basic",
        description: "Install wall shelves and basic fixtures.",
        realTaskStatements: [
          "Mount floating shelves in living room",
          "Install kitchen wall shelves",
          "Put up bookshelf brackets",
          "Mount bathroom shelves",
          "Install display shelves",
          "Wall bracket installation"
        ],
        coreSkills: ["Wall Mounting", "Drill Usage", "Level Reading", "Weight Assessment", "Safety"],
        supportingSkills: ["Measurement", "Attention to Detail", "Clean Work", "Problem Solving", "Wall Knowledge"],
        howYouEarn: [
          "Single shelf (₹300-600)",
          "Multiple shelves (₹800-2000)",
          "Complete room (₹1500-4000)",
          "Kitchen shelving (₹1500-3500)",
          "Complex installations (₹2000-5000)"
        ],
        taskExamples: [
          { title: "Living room shelves", description: "Install 3 floating shelves in living room.", budgetRange: "₹800 - ₹1,500", duration: "2 hours", skillTags: ["Floating", "Living Room", "Wall Mount"] },
          { title: "Kitchen wall shelves", description: "Install 4 kitchen wall shelves with brackets.", budgetRange: "₹1,200 - ₹2,000", duration: "2-3 hours", skillTags: ["Kitchen", "Brackets", "Storage"] },
          { title: "Bookshelf mounting", description: "Mount heavy bookshelf securely to wall.", budgetRange: "₹600 - ₹1,200", duration: "1-2 hours", skillTags: ["Bookshelf", "Heavy", "Secure"] }
        ]
      },
      {
        name: "Device Unboxing & Setup",
        slug: "device-unboxing-setup",
        description: "Unbox and set up new electronic devices.",
        realTaskStatements: [
          "Set up my new TV",
          "Unbox and set up home theater",
          "Configure new gaming console",
          "Set up smart home devices",
          "Install new router and WiFi",
          "Set up new computer"
        ],
        coreSkills: ["Device Setup", "Cable Management", "Basic Configuration", "Tech Familiarity", "Instruction Following"],
        supportingSkills: ["Patience", "Problem Solving", "Communication", "Clean Work", "Attention to Detail"],
        howYouEarn: [
          "Simple device setup (₹300-600)",
          "TV/home theater (₹600-1500)",
          "Computer setup (₹800-2000)",
          "Smart home setup (₹1000-3000)",
          "Full home tech setup (₹3000-8000)"
        ],
        taskExamples: [
          { title: "TV setup", description: "Mount TV and set up cable box and speakers.", budgetRange: "₹1,000 - ₹2,000", duration: "2-3 hours", skillTags: ["TV", "Mount", "Setup"] },
          { title: "Smart home installation", description: "Set up smart lights, plugs, and assistant.", budgetRange: "₹1,500 - ₹3,000", duration: "3-4 hours", skillTags: ["Smart Home", "IoT", "Configuration"] },
          { title: "Home office tech setup", description: "Set up computer, printer, and accessories.", budgetRange: "₹1,200 - ₹2,500", duration: "2-3 hours", skillTags: ["Home Office", "Computer", "Printer"] }
        ]
      },
      {
        name: "Curtain Rods / Simple Fittings",
        slug: "curtain-rods-simple-fittings",
        description: "Install curtain rods, hooks, and simple fixtures.",
        realTaskStatements: [
          "Install curtain rods in all rooms",
          "Put up picture hooks and frames",
          "Install towel rods in bathroom",
          "Mount mirror on wall",
          "Install basic fixtures",
          "Hang curtains and blinds"
        ],
        coreSkills: ["Fixture Installation", "Drill Usage", "Measurement", "Level Reading", "Wall Mounting"],
        supportingSkills: ["Attention to Detail", "Clean Work", "Problem Solving", "Patience", "Safety"],
        howYouEarn: [
          "Single rod (₹200-500)",
          "Multiple rods (₹600-1500)",
          "Full home curtains (₹2000-5000)",
          "Picture hanging (₹300-800)",
          "Bathroom fixtures (₹500-1500)"
        ],
        taskExamples: [
          { title: "Full home curtain rods", description: "Install curtain rods in 4 rooms.", budgetRange: "₹1,500 - ₹3,000", duration: "3-4 hours", skillTags: ["Curtain Rods", "All Rooms", "Installation"] },
          { title: "Mirror and frame hanging", description: "Mount large mirror and 5 picture frames.", budgetRange: "₹800 - ₹1,500", duration: "2 hours", skillTags: ["Mirror", "Frames", "Hanging"] },
          { title: "Bathroom fittings", description: "Install towel rod, soap holder, and hooks.", budgetRange: "₹600 - ₹1,200", duration: "1-2 hours", skillTags: ["Bathroom", "Fittings", "Accessories"] }
        ]
      }
    ]
  },
  {
    name: "Tech Help (Non-Professional)",
    slug: "tech-help-non-professional",
    description: "Basic tech support and help that doesn't require IT expertise.",
    icon: "Smartphone",
    color: "from-blue-500 to-indigo-600",
    subCategories: [
      {
        name: "Mobile Setup",
        slug: "mobile-setup",
        description: "Help setting up and configuring mobile phones.",
        realTaskStatements: [
          "Set up my new smartphone",
          "Transfer data from old to new phone",
          "Configure apps on parent's phone",
          "Set up email and accounts on mobile",
          "Help with iPhone/Android setup",
          "Configure phone for elderly parent"
        ],
        coreSkills: ["Mobile OS Knowledge", "Data Transfer", "Account Setup", "App Installation", "Patient Teaching"],
        supportingSkills: ["Communication", "Problem Solving", "Security Basics", "Backup Knowledge", "Patience"],
        howYouEarn: [
          "Basic setup (₹300-600)",
          "Data transfer (₹500-1000)",
          "Full configuration (₹800-1500)",
          "Senior-friendly setup (₹600-1200)",
          "Multi-device setup (₹1000-2500)"
        ],
        taskExamples: [
          { title: "New phone setup", description: "Complete setup of new Android phone with data transfer.", budgetRange: "₹600 - ₹1,200", duration: "1-2 hours", skillTags: ["Android", "Setup", "Transfer"] },
          { title: "Parent's phone help", description: "Set up phone for elderly parent with essential apps.", budgetRange: "₹500 - ₹1,000", duration: "1-2 hours", skillTags: ["Senior", "Simple", "Essential"] },
          { title: "iPhone migration", description: "Transfer everything from old iPhone to new iPhone.", budgetRange: "₹600 - ₹1,000", duration: "1-2 hours", skillTags: ["iPhone", "Migration", "iCloud"] }
        ]
      },
      {
        name: "Laptop Setup",
        slug: "laptop-setup",
        description: "Help setting up and configuring laptops.",
        realTaskStatements: [
          "Set up my new laptop",
          "Configure laptop for work",
          "Install required software",
          "Set up backup and security",
          "Configure laptop for student",
          "Help migrate to new laptop"
        ],
        coreSkills: ["OS Configuration", "Software Installation", "Account Setup", "Basic Security", "Data Migration"],
        supportingSkills: ["Communication", "Teaching", "Problem Solving", "Patience", "Documentation"],
        howYouEarn: [
          "Basic setup (₹500-1000)",
          "Full configuration (₹1000-2000)",
          "Data migration (₹800-1500)",
          "Work laptop setup (₹1200-2500)",
          "Software installation (₹500-1200)"
        ],
        taskExamples: [
          { title: "New laptop configuration", description: "Set up new laptop with required software and accounts.", budgetRange: "₹1,000 - ₹2,000", duration: "2-3 hours", skillTags: ["New Laptop", "Software", "Configuration"] },
          { title: "Work laptop setup", description: "Configure laptop for work with VPN and tools.", budgetRange: "₹1,200 - ₹2,000", duration: "2-3 hours", skillTags: ["Work", "VPN", "Tools"] },
          { title: "Old to new migration", description: "Migrate all data and settings to new laptop.", budgetRange: "₹1,000 - ₹1,800", duration: "2-4 hours", skillTags: ["Migration", "Data", "Settings"] }
        ]
      },
      {
        name: "App Installation",
        slug: "app-installation",
        description: "Help installing and configuring applications.",
        realTaskStatements: [
          "Install software on my computer",
          "Help with app installation issues",
          "Configure apps for my workflow",
          "Install and set up productivity apps",
          "Help with app permissions and settings",
          "Install apps on multiple devices"
        ],
        coreSkills: ["Software Installation", "Configuration", "Troubleshooting", "App Knowledge", "Following Instructions"],
        supportingSkills: ["Patience", "Communication", "Problem Solving", "Security Awareness", "Teaching"],
        howYouEarn: [
          "Simple installation (₹200-500)",
          "Multiple apps (₹500-1200)",
          "Complex software (₹800-1500)",
          "Full productivity suite (₹1000-2000)",
          "Troubleshooting (₹500-1200)"
        ],
        taskExamples: [
          { title: "Office suite setup", description: "Install and configure Microsoft Office on laptop.", budgetRange: "₹500 - ₹1,000", duration: "1 hour", skillTags: ["Office", "Microsoft", "Setup"] },
          { title: "Creative software", description: "Install and configure Adobe Creative Suite.", budgetRange: "₹800 - ₹1,500", duration: "2 hours", skillTags: ["Adobe", "Creative", "Install"] },
          { title: "Productivity apps", description: "Install and set up 10 productivity apps with sync.", budgetRange: "₹800 - ₹1,500", duration: "2 hours", skillTags: ["Productivity", "Apps", "Sync"] }
        ]
      },
      {
        name: "Email & Account Setup",
        slug: "email-account-setup",
        description: "Help setting up email and online accounts.",
        realTaskStatements: [
          "Set up email on all my devices",
          "Create and configure Gmail account",
          "Help with Microsoft account setup",
          "Configure email for my domain",
          "Set up social media accounts",
          "Help with password management"
        ],
        coreSkills: ["Email Configuration", "Account Creation", "Multi-device Sync", "Security Setup", "Password Management"],
        supportingSkills: ["Communication", "Patience", "Teaching", "Documentation", "Privacy Awareness"],
        howYouEarn: [
          "Single account setup (₹200-500)",
          "Email on all devices (₹500-1000)",
          "Multiple accounts (₹600-1500)",
          "Domain email setup (₹800-2000)",
          "Password manager (₹500-1200)"
        ],
        taskExamples: [
          { title: "Email sync setup", description: "Set up email on phone, laptop, and tablet.", budgetRange: "₹500 - ₹1,000", duration: "1-2 hours", skillTags: ["Email", "Sync", "Multi-device"] },
          { title: "Business email", description: "Configure business email on all devices.", budgetRange: "₹800 - ₹1,500", duration: "1-2 hours", skillTags: ["Business", "Email", "Configuration"] },
          { title: "Account organization", description: "Organize and secure all online accounts.", budgetRange: "₹1,000 - ₹2,000", duration: "2-3 hours", skillTags: ["Accounts", "Security", "Organization"] }
        ]
      },
      {
        name: "Online Form Filling",
        slug: "online-form-filling",
        description: "Help filling out online forms and applications.",
        realTaskStatements: [
          "Help fill visa application form",
          "Complete government form online",
          "Fill university application",
          "Help with insurance form",
          "Complete tax filing forms",
          "Fill out registration forms"
        ],
        coreSkills: ["Form Navigation", "Data Entry", "Attention to Detail", "Document Preparation", "Process Knowledge"],
        supportingSkills: ["Patience", "Communication", "Problem Solving", "Documentation", "Accuracy"],
        howYouEarn: [
          "Simple forms (₹200-500)",
          "Complex applications (₹500-1500)",
          "Visa applications (₹800-2000)",
          "Multiple forms (₹1000-3000)",
          "Form + documentation (₹1500-4000)"
        ],
        taskExamples: [
          { title: "Visa application", description: "Complete online visa application form.", budgetRange: "₹800 - ₹1,500", duration: "1-2 hours", skillTags: ["Visa", "Application", "Travel"] },
          { title: "University admission", description: "Fill out college admission applications.", budgetRange: "₹1,000 - ₹2,000", duration: "2-3 hours", skillTags: ["University", "Admission", "Application"] },
          { title: "Government forms", description: "Complete Aadhaar update and passport forms.", budgetRange: "₹600 - ₹1,200", duration: "1-2 hours", skillTags: ["Government", "Aadhaar", "Passport"] }
        ]
      },
      {
        name: "Basic Troubleshooting",
        slug: "basic-troubleshooting",
        description: "Help with common tech issues and problems.",
        realTaskStatements: [
          "My computer is running slow",
          "Help fix internet connection issues",
          "Phone not working properly",
          "Printer not connecting",
          "App keeps crashing",
          "Can't access my account"
        ],
        coreSkills: ["Problem Diagnosis", "Basic Fixes", "Reset Procedures", "Connection Troubleshooting", "Patience"],
        supportingSkills: ["Communication", "Teaching", "Documentation", "Research", "Logical Thinking"],
        howYouEarn: [
          "Quick fixes (₹300-600)",
          "Diagnosis + fix (₹600-1200)",
          "Multiple issues (₹1000-2500)",
          "Remote support (₹400-1000)",
          "On-site visit (₹800-2000)"
        ],
        taskExamples: [
          { title: "Slow computer fix", description: "Diagnose and fix slow computer performance.", budgetRange: "₹600 - ₹1,200", duration: "1-2 hours", skillTags: ["Slow", "Computer", "Performance"] },
          { title: "WiFi issues", description: "Fix WiFi connection problems at home.", budgetRange: "₹500 - ₹1,000", duration: "1 hour", skillTags: ["WiFi", "Connection", "Router"] },
          { title: "Printer setup", description: "Get printer working with computer and phone.", budgetRange: "₹500 - ₹1,000", duration: "1 hour", skillTags: ["Printer", "Setup", "Connection"] }
        ]
      }
    ]
  }
];

export const getCategoryBySlug = (slug)=> {
  return categories.find(c => c.slug === slug);
};

export const getSubCategoryBySlug = (categorySlug, subCategorySlug) => {
  const category = getCategoryBySlug(categorySlug);
  return category?.subCategories.find(sc => sc.slug === subCategorySlug);
};

export const getAllSubCategories = ()=> {
  return categories.flatMap(c => c.subCategories);
};
