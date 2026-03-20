"use client";

import { useRole } from "@/context/RoleContext";
import { useRouter , usePathname } from "next/navigation";

export default function Toggle() {
  const router = useRouter();
  const pathname = usePathname();
  const { role, setRole } = useRole();
  const isGiver = role === "giver";

    const handleToggle = () => {
        const newRole = isGiver ? "doer" : "giver";
        setRole(newRole);

        //check if user is on task-related pages
        if(
            pathname.includes("/dashboard/my-tasks")
           || pathname.includes("/dashboard/applied-tasks") 
        )
        if( newRole ==="giver"){
            router.push("/dashboard/my-tasks");
        }
        else{
            router.push("/dashboard/applied-tasks");
        }
    }

  return (
    <button
      onClick={handleToggle}
      aria-label={`Switch to ${isGiver ? "Doer" : "Giver"} mode`}
      className={`relative w-[72px] h-7 rounded-full border transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-gray-400 ${
        isGiver ? "bg-[#10A37F] border-gray-300" : "bg-black border-gray-900"
      }`}
    >
      {/* Sliding knob */}
      <div
        className={`absolute top-[3px] left-[3px] w-10 h-5 rounded-full shadow-md flex items-center justify-center text-[11px] font-semibold transition-transform duration-300 ease-out tracking-wide ${
          isGiver
            ? "translate-x-0 text-[#10A37F] bg-white"
            : "translate-x-6 bg-white text-gray-900"
        }`}
      >
        {isGiver ? "Giver" : "Doer"}
      </div>
    </button>
  );
}
