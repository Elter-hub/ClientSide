
export interface Message {
  id: number;
  chatId: number;
  senderId: number;
  recipientId: number;
  senderName: string;
  recipientName: string;
  content: string;
  timestamp: Date;
}

export interface Messages {
  message: Message[];
}
