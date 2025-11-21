import { StateCreator } from 'zustand';

export type TabType = 'consult' | 'report';

export interface LcaSlice {
  // UI 상태
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  
  // ConsultView 상태
  chatInput: string;
  setChatInput: (input: string) => void;
  
  // ReportView 상태 (필요시 추가)
  // ...
}

export const createLcaSlice: StateCreator<LcaSlice> = (set) => ({
  // 초기 상태
  activeTab: 'consult',
  chatInput: '',
  
  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setChatInput: (input) => set({ chatInput: input }),
});

