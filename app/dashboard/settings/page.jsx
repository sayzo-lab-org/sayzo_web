"use client";

import { logoutUser } from "@/lib/firebase";
import { LogOut, Bell, Shield } from "lucide-react";

export default function SettingsPage() {
  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h1>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <Bell className="text-emerald-600 w-5 h-5" />
          <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>
        </div>
        <div className="p-6 space-y-4">
          <label className="flex items-center justify-between cursor-pointer group">
            <div>
              <p className="font-medium text-gray-900 group-hover:text-emerald-700 transition-colors">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive updates about your tasks and applicants.</p>
            </div>
            <input type="checkbox" className="w-5 h-5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" defaultChecked />
          </label>
          <hr className="border-gray-100" />
          <label className="flex items-center justify-between cursor-pointer group">
            <div>
              <p className="font-medium text-gray-900 group-hover:text-emerald-700 transition-colors">SMS Alerts</p>
              <p className="text-sm text-gray-500">Get text messages for urgent task updates.</p>
            </div>
            <input type="checkbox" className="w-5 h-5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" />
          </label>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden text-red-600 mt-8">
        <div className="p-6 border-b border-gray-100 text-gray-900 flex items-center gap-3">
          <Shield className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-semibold">Security & Access</h2>
        </div>
        <div className="p-6 text-left">
          <p className="text-gray-500 mb-6 text-sm">Sign out of your account on this device. You will need to log back in to access your dashboard.</p>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors border border-red-100"
          >
            <LogOut className="w-4 h-4" />
            Log Out Securely
          </button>
        </div>
      </div>
    </div>
  );
}
