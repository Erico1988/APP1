export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  timestamp: string;
  attachments?: Attachment[];
  readBy: string[];
}

export interface Conversation {
  id: string;
  type: 'direct' | 'group';
  participants: string[];
  name?: string;
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Attachment {
  id: string;
  type: 'image' | 'document' | 'link';
  url: string;
  name: string;
  size?: number;
}

export interface ChatState {
  conversations: Conversation[];
  activeConversation: string | null;
  messages: { [conversationId: string]: Message[] };
  loading: boolean;
  error: string | null;
}