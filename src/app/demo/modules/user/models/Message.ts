export interface Message {
  message: string;
  messageId: number;
  subject: string;
  type: string;
  userEmail: string;
  recipient: string;
  responded: boolean;
}

export interface Messages {
  message: Message[];
}
