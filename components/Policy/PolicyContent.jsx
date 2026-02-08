const PolicyContent = ({ content, sectionsRef }) => {
  return (
    <article className="max-w-3xl space-y-20 ">
      {Object.entries(content).map(([id, section]) => (
        <section
          key={id}
          id={id}
          ref={(el) => (sectionsRef.current[id] = el)}
          className="scroll-mt-28"
        >
          {/* ================= TITLE ================= */}
          {section.title && (
            <h2 className="text-[26px] font-medium text-[#3c4043] pb-6">
              {section.title}
            </h2>
          )}

          {/* ================= BODY (INTRO / TERMS HEADER) ================= */}
          {Array.isArray(section.body) && section.body.length > 0 && (
            <div className="space-y-2 text-muted-foreground text-[15px]">
              {section.body
                .filter(Boolean) // removes empty strings
                .map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
            </div>
          )}

          {/* ================= MAIN STEPS ================= */}
          {Array.isArray(section.steps) && section.steps.length > 0 && (
            <div className="space-y-6 pt-6">
              {section.steps.map((step, idx) => (
                <div key={idx} className="rounded-xl py-3">
                  {step.title && (
                    <h3 className="font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                  )}

                  {Array.isArray(step.body) && (
                    <div className="space-y-2 text-muted-foreground text-[15px]">
                      {step.body
                        .filter(Boolean)
                        .map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ================= SMALL CONTENT BLOCKS ================= */}
          {Array.isArray(section.smallContent) &&
            section.smallContent.map((block, blockIdx) => (
              <div key={blockIdx} className="pt-12 space-y-4">
                {block.title && (
                  <h2 className="text-[26px] font-medium text-[#3c4043] pb-4">
                    {block.title}
                  </h2>
                )}

                {block.description && (
                  <p className="text-muted-foreground text-[15px]">
                    {block.description}
                  </p>
                )}

                {Array.isArray(block.steps2) &&
                  block.steps2.map((step, stepIdx) => (
                    <div key={stepIdx} className="rounded-xl py-3">
                      {step.title && (
                        <h3 className="font-semibold text-foreground mb-2">
                          {step.title}
                        </h3>
                      )}

                      <div className="space-y-2 text-muted-foreground text-[15px]">
                        {step.body
                          .filter(Boolean)
                          .map((line, i) => (
                            <p key={i}>{line}</p>
                          ))}
                      </div>
                    </div>
                  ))}

                {block.note && (
                  <p className="text-muted-foreground text-[14px] italic pt-2">
                    {block.note}
                  </p>
                )}
              </div>
            ))}
        </section>
      ))}
    </article>
  );
};

export default PolicyContent;
