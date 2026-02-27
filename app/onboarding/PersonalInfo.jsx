const PersonalInfo = ({ onNext, initialData }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-zinc-900">Welcome to Sayzo!</h1>
        <p className="text-zinc-500 mt-2">Let's start with your basic details.</p>
      </div>

      <div className="space-y-6">

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-zinc-700">Full Name</label>
            <input 
              type="text" 
              placeholder="e.g. Mayank Saini"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-zinc-200 focus:border-[#0ca37f] focus:ring-1 focus:ring-[#0ca37f] outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700">Phone Number</label>
            <div className="flex gap-2 mt-1">
              <span className="px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-500">+91</span>
              <input 
                type="tel" 
                className="flex-1 px-4 py-3 rounded-xl border border-zinc-200 focus:border-[#0ca37f] focus:ring-1 focus:ring-[#0ca37f] outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <button 
          onClick={() => onNext({ name: 'Mayank' })}
          className="w-full py-4 bg-black text-white rounded-xl font-semibold hover:bg-[#0ca37f] transition-all active:scale-[0.98]"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default PersonalInfo;