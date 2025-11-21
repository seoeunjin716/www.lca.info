import { create } from 'zustand';
import { createChatSlice, ChatSlice } from './slices/chatSlice';
import { createLcaSlice, LcaSlice } from './slices/lcaSlice';

// 전체 Store 타입 정의 (모든 슬라이스의 합집합)
export type StoreState = ChatSlice & LcaSlice;

// 슬라이스들을 combine하여 단일 store 생성
export const useStore = create<StoreState>()((...a) => ({
  ...createChatSlice(...a),
  ...createLcaSlice(...a),
}));

