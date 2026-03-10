// /Users/mayanksaini/Desktop/GitHub/sayzo_web/app/dashboard/chats/page.jsx

export default function ChatsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] bg-white rounded-xl border border-gray-200 border-dashed">
      <div className="p-4 bg-gray-50 rounded-full mb-4">
        <span className="text-4xl">💬</span>
      </div>
      <h3 className="text-lg font-medium text-gray-900">No conversations yet</h3>
      <p className="text-gray-500 mt-1">
        Your conversations will appear here
      </p>
    </div>
  );
}
