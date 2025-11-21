# lca ??frontend ?µí•© ë°??¨ì¼ Zustand Store ?„ëµ

## ?“‹ ?„ì¬ ?íƒœ ë¶„ì„

### frontend (Next.js App Router)
- ??Zustand ?¬ë¼?´ìŠ¤ ?¨í„´?¼ë¡œ êµ¬ì„±??(`store/slices/chatSlice.ts`)
- ???¨ì¼ store: `store/useStore.ts`
- ???€???•ì˜: `types/store.ts`
- ???„ì¬ ?˜ì´ì§€: `app/page.tsx` (ChatGPT ?¤í???ì±„íŒ…)

### lca (Vite React)
- ?“¦ Vite ê¸°ë°˜ ?…ë¦½ ??
- ?“¦ ??ê¸°ë°˜ UI: `consult` / `report`
- ?“¦ ì£¼ìš” ì»´í¬?ŒíŠ¸:
  - `App.tsx` - ë©”ì¸ ??(???„í™˜)
  - `ConsultView.tsx` - ?„ë¬¸ê°€ ?ë‹´ ë·?
  - `ReportView.tsx` - ìµœì¢… ë³´ê³ ??ë·?
  - `Header.tsx` - ?¤ë” ì»´í¬?ŒíŠ¸
  - `components/ui/*` - shadcn/ui ì»´í¬?ŒíŠ¸??(48ê°?
- ?“¦ ?íƒœ ê´€ë¦? `useState`ë¡?ë¡œì»¬ ?íƒœë§??¬ìš©
- ?“¦ ?¼ìš°?? react-router ë¯¸ì‚¬??(?¨ìˆœ ???„í™˜)

---

## ?¯ ëª©í‘œ ?íƒœ

1. **?¨ì¼ ??*: `frontend`ê°€ ìµœì¢… SPA??ì§„ì…??
2. **?¨ì¼ Store**: Zustand ?¬ë¼?´ìŠ¤ ?¨í„´?¼ë¡œ ëª¨ë“  ?íƒœ ê´€ë¦?
3. **ì»´í¬?ŒíŠ¸ ?µí•©**: lca ì»´í¬?ŒíŠ¸ë¥?`features/lca`ë¡??´ë™
4. **?¼ìš°??*: Next.js App Routerë¡?lca ?˜ì´ì§€ ë§¤í•‘

---

## ?“ ?µí•© ???”ë ‰? ë¦¬ êµ¬ì¡°

```
frontend/
  src/
    app/
      layout.tsx                    # ë£¨íŠ¸ ?ˆì´?„ì›ƒ (?œë²„ ì»´í¬?ŒíŠ¸)
      page.tsx                       # ??(ChatGPT ?¤í???
      lca/
        page.tsx                     # lca ë©”ì¸ ?˜ì´ì§€
        consult/
          page.tsx                   # ?„ë¬¸ê°€ ?ë‹´ ?˜ì´ì§€
        report/
          page.tsx                   # ë³´ê³ ???˜ì´ì§€
    
    store/
      index.ts                       # ?¨ì¼ store export
      useStore.ts                    # ?¬ë¼?´ìŠ¤ combine
      slices/
        chatSlice.ts                 # ì±„íŒ… ê´€???¬ë¼?´ìŠ¤
        lcaSlice.ts              # lca ê´€???¬ë¼?´ìŠ¤ (? ê·œ)
    
    features/
      lca/
        components/                  # lca ?œìˆ˜ ì»´í¬?ŒíŠ¸
          Header.tsx
          ConsultView.tsx
          ReportView.tsx
          ChatBubble.tsx
          ChecklistItem.tsx
          ui/                         # shadcn/ui ì»´í¬?ŒíŠ¸??
            button.tsx
            card.tsx
            ... (48ê°?
    
    types/
      store.ts                       # ê¸°ë³¸ ?€???•ì˜
    
    lib/
      api.ts                         # ë°±ì—”??API ? í‹¸ë¦¬í‹°
```

---

## ?”„ ?¨ê³„ë³??µí•© ?„ëµ

### Phase 1: Zustand Store ?•ì¥ (?¬ë¼?´ìŠ¤ ?¨í„´)

#### 1.1 lcaSlice ?ì„±

**?Œì¼**: `frontend/src/store/slices/lcaSlice.ts`

```typescript
import { StateCreator } from 'zustand';

export type TabType = 'consult' | 'report';

export interface lcaSlice {
  // UI ?íƒœ
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  
  // ConsultView ?íƒœ
  chatInput: string;
  setChatInput: (input: string) => void;
  
  // ReportView ?íƒœ (?„ìš”??ì¶”ê?)
  // ...
}

export const createlcaSlice: StateCreator<lcaSlice> = (set) => ({
  // ì´ˆê¸° ?íƒœ
  activeTab: 'consult',
  chatInput: '',
  
  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setChatInput: (input) => set({ chatInput: input }),
});
```

#### 1.2 useStore??lcaSlice ?µí•©

**?Œì¼**: `frontend/src/store/useStore.ts`

```typescript
import { create } from 'zustand';
import { createChatSlice, ChatSlice } from './slices/chatSlice';
import { createlcaSlice, lcaSlice } from './slices/lcaSlice';

// ?„ì²´ Store ?€???•ì˜ (ëª¨ë“  ?¬ë¼?´ìŠ¤???©ì§‘??
export type StoreState = ChatSlice & lcaSlice;

// ?¬ë¼?´ìŠ¤?¤ì„ combine?˜ì—¬ ?¨ì¼ store ?ì„±
export const useStore = create<StoreState>()((...a) => ({
  ...createChatSlice(...a),
  ...createlcaSlice(...a),
}));
```

---

### Phase 2: lca ì»´í¬?ŒíŠ¸ ?´ê?

#### 2.1 ?œìˆ˜ UI ì»´í¬?ŒíŠ¸ ?´ë™

**?€??*: `lca/src/components/ui/*` (48ê°?shadcn/ui ì»´í¬?ŒíŠ¸)

**?‘ì—…**:
1. `lca/src/components/ui/*` ??`frontend/src/features/lca/components/ui/*`
2. Vite ?„ìš© ì½”ë“œ ?œê±° (?†ìŒ - ?œìˆ˜ React ì»´í¬?ŒíŠ¸)
3. import ê²½ë¡œ ?•ë¦¬:
   - `@/features/lca/components/ui/button` ?•íƒœë¡??µì¼

#### 2.2 ì»¤ìŠ¤?€ ì»´í¬?ŒíŠ¸ ?´ë™

**?€??*: 
- `Header.tsx`
- `ConsultView.tsx`
- `ReportView.tsx`
- `ChatBubble.tsx`
- `ChecklistItem.tsx`
- `figma/ImageWithFallback.tsx`

**?‘ì—…**:
1. `lca/src/components/*` ??`frontend/src/features/lca/components/*`
2. `useState` ??`useStore`ë¡?ë§ˆì´ê·¸ë ˆ?´ì…˜
3. import ê²½ë¡œ ?•ë¦¬

#### 2.3 ?¤í????Œì¼ ?µí•©

**?€??*: `lca/src/styles/globals.css`, `lca/src/index.css`

**?‘ì—…**:
1. Tailwind ?¤ì •???™ì¼?œì? ?•ì¸
2. ?„ìš”???¤í??¼ì„ `frontend/src/app/globals.css`???µí•©

---

### Phase 3: Next.js ?¼ìš°???¤ì •

#### 3.1 lca ë©”ì¸ ?˜ì´ì§€

**?Œì¼**: `frontend/src/app/lca/page.tsx`

```typescript
'use client';

import { useStore } from '@/store';
import { Header } from '@/features/lca/components/Header';
import { ConsultView } from '@/features/lca/components/ConsultView';
import { ReportView } from '@/features/lca/components/ReportView';

export default function lcaPage() {
  const activeTab = useStore((state) => state.activeTab);
  const setActiveTab = useStore((state) => state.setActiveTab);

  const handleExportPDF = () => {
    console.log('Exporting to PDF...');
    alert('PDF ?´ë³´?´ê¸° ê¸°ëŠ¥???¸ì¶œ?˜ì—ˆ?µë‹ˆ??');
  };

  const handleExportWord = () => {
    console.log('Exporting to Word...');
    alert('Word ?´ë³´?´ê¸° ê¸°ëŠ¥???¸ì¶œ?˜ì—ˆ?µë‹ˆ??');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header
        showExportButtons={activeTab === 'report'}
        onExportPDF={handleExportPDF}
        onExportWord={handleExportWord}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-gray-200">
          <nav className="-mb-px flex max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setActiveTab('consult')}
              className={`whitespace-nowrap py-3 px-4 border-b-2 text-sm transition-colors ${
                activeTab === 'consult'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              ?„ë¬¸ê°€ ?ë‹´ ë°?ë¬¸ë‹¨ ?ì„±
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`whitespace-nowrap py-3 px-4 border-b-2 text-sm transition-colors ${
                activeTab === 'report'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              ìµœì¢… ë³´ê³ ??ì¡°í•©
            </button>
          </nav>
        </div>
        <div className="flex-1 overflow-hidden">
          {activeTab === 'consult' ? <ConsultView /> : <ReportView />}
        </div>
      </main>
    </div>
  );
}
```

#### 3.2 ê°œë³„ ?¼ìš°??(? íƒ?¬í•­)

?„ìš”??`/lca/consult`, `/lca/report`ë¡?ë¶„ë¦¬ ê°€??

---

### Phase 4: ì»´í¬?ŒíŠ¸ ë§ˆì´ê·¸ë ˆ?´ì…˜ (useState ??useStore)

#### 4.1 ConsultView.tsx ë§ˆì´ê·¸ë ˆ?´ì…˜

**Before**:
```typescript
const [chatInput, setChatInput] = useState('');
```

**After**:
```typescript
const chatInput = useStore((state) => state.chatInput);
const setChatInput = useStore((state) => state.setChatInput);
```

#### 4.2 App.tsx ë¡œì§??page.tsxë¡??´ë™

- `App.tsx`?????„í™˜ ë¡œì§??`app/lca/page.tsx`ë¡??´ë™
- `activeTab` ?íƒœ??`useStore`?ì„œ ê´€ë¦?

---

### Phase 5: ?˜ì¡´???µí•©

#### 5.1 package.json ?µí•©

**?‘ì—…**:
1. `lca/package.json`??dependencies ?•ì¸
2. `frontend/package.json`???„ë½???¨í‚¤ì§€ ì¶”ê?:
   - `@radix-ui/*` ?¨í‚¤ì§€??(shadcn/ui)
   - `lucide-react`
   - `recharts`
   - `react-hook-form`
   - `sonner`
   - `next-themes`
   - ê¸°í? lca ?„ìš© ?¨í‚¤ì§€

#### 5.2 Tailwind ?¤ì • ?µí•©

**?•ì¸?¬í•­**:
- `tailwind.config.ts`??shadcn/ui ?¤ì • ?¬í•¨ ?¬ë?
- `postcss.config.mjs` ?¤ì • ?¼ì¹˜ ?¬ë?

---

### Phase 6: ? íƒ??React Context ?˜í¼ (?„ìš”??

**?„ì¬??ë¶ˆí•„??*: lcaê°€ `useContext`ë¥??¬ìš©?˜ì? ?ŠìŒ

**?¥í›„ ?„ìš”??*:
- `store/AppContext.tsx` ?ì„±
- Zustand storeë¥?Contextë¡??˜í•‘
- `app/layout.tsx`??Provider ì¶”ê?

---

## ??ì²´í¬ë¦¬ìŠ¤??

### Store ê´€??
- [ ] `store/slices/lcaSlice.ts` ?ì„±
- [ ] `store/useStore.ts`??lcaSlice ?µí•©
- [ ] `types/store.ts`???„ìš”???€??ì¶”ê?

### ì»´í¬?ŒíŠ¸ ?´ê?
- [ ] `features/lca/components/ui/*` ?´ë™ (48ê°?
- [ ] `features/lca/components/*` ?´ë™ (ì»¤ìŠ¤?€ ì»´í¬?ŒíŠ¸)
- [ ] ëª¨ë“  ì»´í¬?ŒíŠ¸??import ê²½ë¡œ ?•ë¦¬

### ?íƒœ ë§ˆì´ê·¸ë ˆ?´ì…˜
- [ ] `ConsultView.tsx`??`useState` ??`useStore`
- [ ] `App.tsx`??`activeTab` ??`useStore`
- [ ] ê¸°í? ë¡œì»¬ ?íƒœ ??storeë¡??´ë™

### ?¼ìš°???¤ì •
- [ ] `app/lca/page.tsx` ?ì„±
- [ ] (? íƒ) `app/lca/consult/page.tsx` ?ì„±
- [ ] (? íƒ) `app/lca/report/page.tsx` ?ì„±

### ?˜ì¡´???µí•©
- [ ] `package.json`??lca ?˜ì¡´??ì¶”ê?
- [ ] `npm install` ?¤í–‰
- [ ] Tailwind ?¤ì • ?µí•© ?•ì¸

### ?¤í????µí•©
- [ ] `globals.css` ?µí•©
- [ ] Tailwind ?´ë˜??ì¶©ëŒ ?•ì¸

### ?ŒìŠ¤??
- [ ] `npm run dev` ?¤í–‰
- [ ] `/lca` ?¼ìš°???™ì‘ ?•ì¸
- [ ] Zustand DevToolsë¡??íƒœ ?•ì¸
- [ ] ???„í™˜ ?™ì‘ ?•ì¸
- [ ] ì»´í¬?ŒíŠ¸ ?Œë”ë§??•ì¸

---

## ?? ?¤í–‰ ?œì„œ (ê¶Œì¥)

1. **Store ?•ì¥** (Phase 1)
   - lcaSlice ?ì„± ë°??µí•©
   
2. **?˜ì¡´???µí•©** (Phase 5.1)
   - package.json ?µí•© ë°??¤ì¹˜
   
3. **ì»´í¬?ŒíŠ¸ ?´ë™** (Phase 2)
   - UI ì»´í¬?ŒíŠ¸ ??ì»¤ìŠ¤?€ ì»´í¬?ŒíŠ¸ ?œì„œë¡??´ë™
   
4. **?íƒœ ë§ˆì´ê·¸ë ˆ?´ì…˜** (Phase 4)
   - ê°?ì»´í¬?ŒíŠ¸??useState ??useStore
   
5. **?¼ìš°???¤ì •** (Phase 3)
   - Next.js ?˜ì´ì§€ ?ì„±
   
6. **?ŒìŠ¤??ë°?ê²€ì¦?* (Phase 6)

---

## ?“ ì£¼ì˜?¬í•­

1. **?¨ì¼ Store ?ì¹™ ? ì?**
   - ëª¨ë“  ?íƒœ??`useStore`ë¥??µí•´?œë§Œ ê´€ë¦?
   - ?ˆë¡œ???¬ë¼?´ìŠ¤??`store/slices/`??ì¶”ê?

2. **?¬ë¼?´ìŠ¤ ?¨í„´ ì¤€??*
   - ê°??„ë©”?¸ë³„ë¡??¬ë¼?´ìŠ¤ ë¶„ë¦¬
   - `StateCreator` ?€???¬ìš©

3. **?€???ˆì •??*
   - ëª¨ë“  ?¬ë¼?´ìŠ¤??TypeScript ?¸í„°?˜ì´?¤ë¡œ ?•ì˜
   - `StoreState`??ëª¨ë“  ?¬ë¼?´ìŠ¤???©ì§‘??

4. **?ì§„??ë§ˆì´ê·¸ë ˆ?´ì…˜**
   - ??ë²ˆì— ëª¨ë“  ê²ƒì„ ??¸°ì§€ ë§ê³  ?¨ê³„?ìœ¼ë¡?ì§„í–‰
   - ê°??¨ê³„ë§ˆë‹¤ ?ŒìŠ¤??

5. **Vite ?¤ì • ?œê±°**
   - lca??`vite.config.ts`, `index.html`, `main.tsx`??ë³´ê?
   - ?¥í›„ ì°¸ê³ ?©ìœ¼ë¡?? ì??˜ê±°???? œ

---

## ?” ì°¸ê³ ?¬í•­

- lca??react-routerë¥??¬ìš©?˜ì? ?Šìœ¼ë¯€ë¡??¼ìš°??ë§ˆì´ê·¸ë ˆ?´ì…˜ ë¶ˆí•„??
- ëª¨ë“  ì»´í¬?ŒíŠ¸ê°€ ?œìˆ˜ React?´ë?ë¡?Next.js?€ ?¸í™˜ ê°€??
- shadcn/ui ì»´í¬?ŒíŠ¸???´ë? Next.js?€ ?¸í™˜??

