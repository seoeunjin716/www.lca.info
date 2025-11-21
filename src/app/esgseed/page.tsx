'use client';

import { useState, useEffect } from 'react';
import { Send, Bot, FileText, Download, CheckCircle, AlertCircle, XCircle, BrainCircuit } from 'lucide-react';
import Link from 'next/link';        // 제일 위에 추가 필수!
import { Leaf } from 'lucide-react';     // 이것도 추가!

interface Message {
  id: number;
  type: 'ai' | 'user';
  text: string;
}

interface Paragraph {
  id: string;
  title: string;
  content: string;
  status: 'complete' | 'incomplete';
  comment?: string;
}

export default function ReportPage() {
  const [activeTab, setActiveTab] = useState<'consult' | 'report'>('consult');
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: 'ai', text: 'TCFD 보고서.pdf가 업로드되어 분석이 완료되었습니다.' },
    { id: 2, type: 'ai', text: 'IFRS S2 기준에 맞춰 부족한 정보를 채워드릴게요!' },
    { id: 3, type: 'ai', text: '질문 (S2-5 거버넌스): 기후 리스크 감독 주체는 누구인가요?' },
    { id: 4, type: 'user', text: '이사회 산하 ‘지속가능경영위원회’가 분기별로 감독합니다.' },
    { id: 5, type: 'ai', text: '감사합니다! S2-5 문단이 우측에 생성되었습니다.\n다음 질문: Scope 1·2 배출량의 기준연도는 언제인가요?' },
  ]);

  const [paragraphs] = useState<Paragraph[]>([
    {
      id: 's2-5',
      title: 'IFRS S2-5: Governance',
      content: `당사는 기후 관련 리스크 및 기회에 대한 효과적인 감독을 위해 <span class="highlight-source">이사회 산하 '지속가능경영위원회'<span class="tooltip">근거: 사용자 입력 (2025.11.19)</span></span>를 설치하여 운영하고 있습니다. <span class="highlight-source">위원회는 분기별<span class="tooltip">근거: TCFD 보고서 p.12</span></span>로 기후 관련 주요 안건을 보고받고 감독합니다.`,
      status: 'complete',
      comment: '기준 충족 완료. 보상 연계 여부를 추가하면 더 완벽합니다.',
    },
    {
      id: 's2-15',
      title: 'IFRS S2-15: Scenario Analysis',
      content: `당사는 NZE 2050, 2도 시나리오 등을 활용하여 분석합니다. <span class="highlight-source bg-red-100 border-b-2 border-red-500">[기준연도 데이터 입력 필요]<span class="tooltip">정량 정보 부족 – 왼쪽에서 입력해주세요</span></span>`,
      status: 'incomplete',
      comment: '기준연도와 정량 데이터를 알려주시면 바로 반영하겠습니다.',
    },
  ]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages(prev => [...prev, { id: prev.length + 1, type: 'user', text: inputValue }]);
    setInputValue('');
    // 실제론 여기서 AI 호출
  };

  useEffect(() => {
    const textarea = document.getElementById('chat-input') as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [inputValue]);

  return (
    <>
      <div className="h-screen flex flex-col bg-gray-50">
        {/* 헤더 */}
        <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
          <div className="max-w-screen-2xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-3 rounded-2xl shadow-xl">
                <BrainCircuit className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">AI ESG Consultant</h1>
                <p className="text-xs text-gray-500">IFRS S2 완전 자동화 컨설턴트</p>
              </div>
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md">
                실시간 생성 중
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">보고서 버전: v1.0</span>
              <Link 
                href="/lca"
                className="flex items-center space-x-3 bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <Leaf className="w-6 h-6" />
                <span className="text-lg">LCA 산정하기</span>
              </Link>

              {activeTab === 'report' && (
                <>
                  <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
                    <Download className="w-5 h-5" />
                    <span>PDF 내보내기</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
                    <FileText className="w-5 h-5" />
                    <span>Word 내보내기</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </header>

        

        {/* 탭 */}
        <div className="pt-20 bg-white border-b border-gray-200">
          <div className="max-w-screen-2xl mx-auto px-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('consult')}
                className={`py-4 px-2 border-b-4 font-semibold text-lg transition-all ${
                  activeTab === 'consult'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                전문가 상담 & 문단 생성
              </button>
              <button
                onClick={() => setActiveTab('report')}
                className={`py-4 px-2 border-b-4 font-semibold text-lg transition-all ${
                  activeTab === 'report'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                최종 보고서
              </button>
            </nav>
          </div>
        </div>

        {/* 컨텐츠 */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'consult' ? (
            <div className="flex h-full">
              {/* 왼쪽: 채팅 */}
              <div className="w-1/2 flex flex-col bg-white border-r border-gray-200">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-200">
                  <h2 className="text-lg font-bold mb-4">IFRS S2 필수 정보 체크리스트</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" /> S2-5: 거버넌스 (감독 주체)</div>
                    <div className="flex items-center"><AlertCircle className="w-5 h-5 text-yellow-600 mr-2" /> S2-7: 리스크 및 기회</div>
                    <div className="flex items-center"><XCircle className="w-5 h-5 text-red-600 mr-2" /> S2-15: 시나리오 분석 (기준 연도)</div>
                    <div className="flex items-center"><XCircle className="w-5 h-5 text-red-600 mr-2" /> Scope 1, 2, 3 배출량</div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {messages.map(msg => (
                    <div key={msg.id} className={msg.type === 'user' ? 'flex justify-end' : 'flex items-start space-x-4'}>
                      {msg.type === 'ai' && (
                        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-4 rounded-3xl shadow-xl">
                          <Bot className="w-7 h-7 text-white" />
                        </div>
                      )}
                      <div className={`max-w-lg ${msg.type === 'ai' ? 'bg-white' : 'bg-blue-100'} p-5 rounded-3xl shadow-lg ${msg.type === 'ai' ? 'rounded-tl-none' : 'rounded-br-none'}`}>
                        <p className="font-bold text-gray-800 mb-1">{msg.type === 'ai' ? 'AI ESG Consultant' : '나'}</p>
                        <p className="text-gray-700 whitespace-pre-wrap">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-white border-t border-gray-200">
                  <div className="flex items-end space-x-4">
                    <textarea
                      id="chat-input"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                      rows={1}
                      className="flex-1 p-4 border border-gray-300 rounded-3xl resize-none focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-inner"
                      placeholder="답변하거나 질문하세요..."
                    />
                    <button
                      onClick={handleSend}
                      className="bg-gradient-to-br from-blue-600 to-cyan-600 p-4 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all"
                    >
                      <Send className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 오른쪽: 프리뷰 */}
              <div className="w-1/2 flex flex-col bg-gray-50">
                <div className="bg-white p-6 border-b border-gray-200 shadow-md flex justify-between items-center">
                  <h2 className="text-xl font-bold flex items-center">
                    <FileText className="w-6 h-6 text-blue-600 mr-2" />
                    실시간 보고서 문단 프리뷰
                  </h2>
                  <span className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-medium flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" /> 자동 저장됨
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                  {paragraphs.map(p => (
                    <div key={p.id} className={`bg-white rounded-3xl shadow-xl p-8 border ${p.status === 'incomplete' ? 'border-red-300 ring-2 ring-red-100' : 'border-gray-200'}`}>
                      <h3 className="text-xl font-bold mb-5">{p.title}</h3>
                      <p className="text-gray-700 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: p.content }} />
                      <div className={`mt-6 p-5 rounded-2xl ${p.status === 'complete' ? 'bg-blue-50 border border-blue-200' : 'bg-red-50 border border-red-200'}`}>
                        <strong className={p.status === 'complete' ? 'text-blue-800' : 'text-red-800'}>AI 코멘트:</strong>
                        <span className={p.status === 'complete' ? 'text-blue-700' : 'text-red-700'}> {p.comment}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full overflow-y-auto bg-gray-100 p-12">
              <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-16 text-center">
                  <h1 className="text-5xl font-bold mb-4">2025 기후 관련 재무정보 공시 보고서</h1>
                  <p className="text-2xl opacity-90">IFRS S2 완전 준수 · AI 자동 생성</p>
                </div>
                <div className="p-16 space-y-20">
                  <section>
                    <h2 className="text-4xl font-bold border-b-4 border-blue-600 inline-block pb-2">1. Governance</h2>
                    <p className="mt-8 text-xl text-gray-700 leading-relaxed">당사는 이사회 산하 ‘지속가능경영위원회’를 통해 기후 리스크를 체계적으로 감독하고 있습니다...</p>
                  </section>
                  {/* 더 많은 섹션 추가 가능 */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .highlight-source {
          position: relative;
          background: #dbeafe;
          padding: 0 4px;
          border-radius: 4px;
          cursor: help;
        }
        .highlight-source:hover .tooltip {
          visibility: visible;
          opacity: 1;
        }
        .tooltip {
          visibility: hidden;
          opacity: 0;
          transition: opacity 0.3s;
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 8px;
          background: #1f2937;
          color: white;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 0.75rem;
          white-space: nowrap;
          z-index: 10;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .tooltip:after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -5px;
          border: 5px solid transparent;
          border-top-color: #1f2937;
        }
      `}</style>
    </>
  );
}