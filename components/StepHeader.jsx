const StepHeader = ({ step }) => {
    const labels = ["Personal Details", "Professional Info", "Commitment"];
  
    return (
      <div className="space-y-4">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-1.5 w-6 rounded-full ${
                  step >= i ? "bg-white" : "bg-white/20"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-zinc-400">
            STEP {step + 1} OF 3
          </span>
        </div>
  
        <h2 className="text-3xl font-semibold text-white">
          {labels[step]}
        </h2>
      </div>
    );
  };
  
  switch (step) {
    /* ---------------- STEP 1 ---------------- */
    case FormStep.PERSONAL_DETAILS:
      return (
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-6">
            <StepHeader step={0} />
  
            <input
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full rounded-2xl bg-zinc-900 px-5 py-4 text-white placeholder:text-zinc-500 outline-none"
            />
  
            <input
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full rounded-2xl bg-zinc-900 px-5 py-4 text-white placeholder:text-zinc-500 outline-none"
            />
  
            <input
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-2xl bg-zinc-900 px-5 py-4 text-white placeholder:text-zinc-500 outline-none"
            />
          </div>
  
          <button
            onClick={nextStep}
            className="mt-8 w-full rounded-full bg-white py-4 font-semibold text-black"
          >
            Continue
          </button>
        </div>
      );
  
    /* ---------------- STEP 2 ---------------- */
    case FormStep.PROFESSIONAL_INFO:
      return (
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-6">
            <StepHeader step={1} />
  
            <input
              name="linkedIn"
              placeholder="LinkedIn Profile"
              value={formData.linkedIn}
              onChange={handleInputChange}
              className="w-full rounded-2xl bg-zinc-900 px-5 py-4 text-white placeholder:text-zinc-500 outline-none"
            />
  
            <input
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full rounded-2xl bg-zinc-900 px-5 py-4 text-white placeholder:text-zinc-500 outline-none"
            />
  
            <div className="space-y-3">
              <p className="text-xs text-zinc-400 tracking-wide">
                SKILLS*
              </p>
              <PillSelector
                options={SKILL_OPTIONS}
                selected={formData.skills}
                onChange={(v) =>
                  setFormData((p) => ({ ...p, skills: v }))
                }
              />
            </div>
  
            <div className="space-y-3">
              <p className="text-xs text-zinc-400 tracking-wide">
                OCCUPATION*
              </p>
              <PillSelector
                options={OCCUPATION_OPTIONS}
                selected={formData.occupation}
                onChange={(v) =>
                  setFormData((p) => ({ ...p, occupation: v }))
                }
              />
            </div>
          </div>
  
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => setStep(FormStep.PERSONAL_DETAILS)}
              className="flex-1 rounded-full border border-white/20 py-4 text-white"
            >
              ‹ Back
            </button>
            <button
              onClick={nextStep}
              className="flex-1 rounded-full bg-white py-4 font-semibold text-black"
            >
              Next
            </button>
          </div>
        </div>
      );
  
    /* ---------------- STEP 3 ---------------- */
    case FormStep.RESOURCE_ALLOCATION:
      return (
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-8">
            <StepHeader step={2} />
  
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Hours per week</span>
                <span className="text-white font-semibold">
                  {formData.hoursPerWeek}h
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={formData.hoursPerWeek}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    hoursPerWeek: Number(e.target.value),
                  }))
                }
                className="w-full accent-white"
              />
            </div>
  
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">
                  Outsourcing budget
                </span>
                <span className="text-white font-semibold">
                  ${formData.outsourcingBudget}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={formData.outsourcingBudget}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    outsourcingBudget: Number(e.target.value),
                  }))
                }
                className="w-full accent-white"
              />
            </div>
          </div>
  
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => setStep(FormStep.PROFESSIONAL_INFO)}
              className="flex-1 rounded-full border border-white/20 py-4 text-white"
            >
              ‹ Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 rounded-full bg-white py-4 font-semibold text-black disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Join Waitlist"}
            </button>
          </div>
        </div>
      );
  
    /* ---------------- SUMMARY ---------------- */
    case FormStep.SUMMARY:
      return (
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-white">
            Welcome to Sayzo
          </h2>
          <p className="text-zinc-400">{geminiResponse}</p>
          <button
            onClick={resetForm}
            className="w-full rounded-full bg-white py-4 font-semibold text-black"
          >
            Done
          </button>
        </div>
      );
  }
  