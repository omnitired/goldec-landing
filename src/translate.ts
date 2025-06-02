import messages from '../messages/fa.json';

export function t(key: string): string {
  return messages[key] || key;
} 