import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

interface ChecklistItemProps {
  status: 'complete' | 'in-progress' | 'incomplete';
  text: string;
}

export function ChecklistItem({ status, text }: ChecklistItemProps) {
  const getIcon = () => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="text-green-500 mr-2" size={16} />;
      case 'in-progress':
        return <AlertCircle className="text-yellow-500 mr-2" size={16} />;
      case 'incomplete':
        return <XCircle className="text-red-500 mr-2" size={16} />;
    }
  };

  const getTextClass = () => {
    switch (status) {
      case 'complete':
        return 'text-gray-600';
      case 'in-progress':
        return 'text-gray-900';
      case 'incomplete':
        return 'text-gray-500';
    }
  };

  return (
    <li className="flex items-center text-sm">
      {getIcon()}
      <span className={getTextClass()}>{text}</span>
    </li>
  );
}
