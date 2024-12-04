import ClientChat from '../components/Chat';

export default function ChatPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Chat with AI Assistant
      </h1>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <ClientChat />
      </div>
    </div>
  );
}
