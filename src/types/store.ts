export interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

// StoreState는 useStore.ts에서 슬라이스들의 합집합으로 정의됩니다

