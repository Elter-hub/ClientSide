export interface Message {
  message: string;
  messageId: number;
  subject: string;
  type: string;
}

export interface Messages {
  message: Message[];
}
