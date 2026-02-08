
  
  const SkillsSection = ({ coreSkills, supportingSkills }) => {
    return (
      <section className="bg-muted/30 ">
        <div className="container px-4  py-20 md:py-28 max-w-312 mx-auto">
          <div className="max-w-xl mb-16">
            <p className="text-sm font-medium text-primary-btn uppercase tracking-wider mb-3">
              Skills that matter
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Who should apply here
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              You don't need to be a pure expert. If your skill helps solve these problems, SAYZO can monetize it.
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {/* Core Skills */}
            <div>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
                Core Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {coreSkills.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-4 py-2 text-sm font-medium rounded-full bg-primary-btn/10 text-primary-btn"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
  
            {/* Supporting Skills */}
            <div>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
                Supporting Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {supportingSkills.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-4 py-2 text-sm font-semibold rounded-full bg-background text-muted-foreground border border-border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default SkillsSection;
  