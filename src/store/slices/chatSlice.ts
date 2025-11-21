import { StateCreator } from 'zustand';
import { Message } from '@/types/store';

export interface ChatSlice {
  // Chat 관련 상태
  messages: Message[];
  input: string;
  
  // Chat 관련 Actions
  addMessage: (message: Message) => void;
  setInput: (input: string) => void;
  clearMessages: () => void;
  setMessages: (messages: Message[]) => void;
}

export const createChatSlice: StateCreator<ChatSlice> = (set) => ({
  // 초기 상태
  messages: [],
  input: '',
  
  // Actions
  addMessage: (message: Message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  
  setInput: (input: string) =>
    set(() => ({
      input,
    })),
  
  clearMessages: () =>
    set(() => ({
      messages: [],
    })),
  
  setMessages: (messages: Message[]) =>
    set(() => ({
      messages,
    })),
});

