"use client";

export default function ComingSoon({ title, message, icon: Icon }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <Icon className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        <p className="mx-auto mt-3 max-w-md whitespace-pre-line text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
}
