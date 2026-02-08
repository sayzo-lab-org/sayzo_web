export const mapJob = (job) => {
    const isOnline = job.type?.toLowerCase() === "online";
  
    return {
      id: job.id,
  
      title: `${job.title}`,
      description: job.description,
  
      company: job.company,
  
      budget: job.budget,
  
      category: isOnline ? "Online Tasks" : "Offline Tasks",
      duration: job.deadline,
      experienceLevel: "Entry-level",
  
      tags: job.skills || [],
  
      location: isOnline ? "Remote" : "Local",
  
      postedAt: "Just now",
      applicants: Math.floor(Math.random() * 20) + 1,
      isUrgent:
        job.deadline?.includes("hour") ||
        job.deadline?.includes("minute"),
  
      status: "open",
    };
  };
  