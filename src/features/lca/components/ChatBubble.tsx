import { MessageSquare } from 'lucide-react';

interface ChatBubbleProps {
  type: 'ai' | 'user' | 'system';
  children: React.ReactNode;
}

export function ChatBubble({ type, children }: ChatBubbleProps) {
  if (type === 'system') {
    return (
      <div className="flex justify-center">
        <button className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm">
          {children}
        </button>
      </div>
    );
  }

  if (type === 'user') {
    return (
      <div className="flex justify-end">
        <div className="chat-bubble-user p-4 rounded-lg rounded-br-none max-w-lg">
          <p className="text-gray-800">사용자</p>
          <div className="text-gray-700">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0 bg-blue-600 p-2 rounded-full">
        <MessageSquare className="text-white" size={20} />
      </div>
      <div className="chat-bubble-ai p-4 rounded-lg rounded-tl-none max-w-lg">
        <p className="text-blue-800">AI ESG Consultant</p>
        <div className="text-gray-700">{children}</div>
      </div>
    </div>
  );
}
