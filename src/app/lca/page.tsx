'use client';

import { useState, useEffect } from 'react';
import { Leaf, Plus, Trash2, Calculator, BrainCircuit, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Material {
  id: string;
  name: string;
  amount: number; // kg per product
  emissionFactor: number; // kgCO₂e per kg
  source: 'ai' | 'user' | 'database';
}

export default function LcaPage() {
  const [productName, setProductName] = useState('친환경 페트병 500mL');
  const [annualProduction, setAnnualProduction] = useState(100000);
  const [isCalculating, setIsCalculating] = useState(false);

  // 상태 먼저 선언
  const [materials, setMaterials] = useState<Material[]>([
    { id: '1', name: 'PET 수지 (rPET 30% 혼합)', amount: 0.025, emissionFactor: 2.1, source: 'ai' },
    { id: '2', name: 'HDPE 캡', amount: 0.003, emissionFactor: 1.8, source: 'ai' },
    { id: '3', name: '종이 라벨', amount: 0.001, emissionFactor: 1.2, source: 'ai' },
    { id: '4', name: '해상 운송 (중국→한국)', amount: 0.03, emissionFactor: 0.015, source: 'ai' },
  ]);

  // 함수들 (상태 아래에 선언!)
  const addMaterial = () => {
    const newMaterial: Material = {
      id: Date.now().toString(),
      name: '새 원재료 (예: PE 수지)',
      amount: 0.01,
      emissionFactor: 2.0,
      source: 'user',
    };
    setMaterials(prev => [...prev, newMaterial]);
  };

  const removeMaterial = (id: string) => {
    setMaterials(prev => prev.filter(m => m.id !== id));
  };

  const updateMaterial = (id: string, field: 'name' | 'amount' | 'emissionFactor', value: string | number) => {
    setMaterials(prev =>
      prev.map(m =>
        m.id === id
          ? { ...m, [field]: field === 'name' ? value : Number(value) || 0 }
          : m
      )
    );
  };

  // 계산 로직
  const calculateLCA = () => {
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 1800);
  };

  const totalPerUnit = materials.reduce((sum, m) => sum + (m.amount * m.emissionFactor), 0);
  const totalAnnual = totalPerUnit * annualProduction;

  const hotSpots = [...materials]
    .sort((a, b) => (b.amount * b.emissionFactor) - (a.amount * b.emissionFactor))
    .slice(0, 3);

  useEffect(() => {
    calculateLCA();
  }, [materials, annualProduction]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* 왼쪽: 입력 영역 */}
      <div className="w-1/2 overflow-y-auto p-8 space-y-8">
        <div className="bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-10 border border-white/50">
          <div className="flex items-center mb-10">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-5 rounded-3xl shadow-2xl mr-6">
              <Leaf className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800">LCA 자동 산정</h2>
              <p className="text-gray-600 mt-1">제품 1개 → 전과정 탄소배출량 즉시 계산</p>
            </div>
          </div>

          {/* 제품 정보 */}
          <div className="grid grid-cols-2 gap-6 mb-10">
            <div>
              <label className="block text-lg font-bold text-gray-700 mb-3">제품명</label>
              <input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-6 py-5 rounded-2xl border-2 border-gray-300 focus:border-emerald-500 focus:outline-none text-xl font-medium transition-all"
                placeholder="예: 재생페트병 500mL"
              />
            </div>
            <div>
              <label className="block text-lg font-bold text-gray-700 mb-3">연간 생산량</label>
              <input
                type="number"
                value={annualProduction}
                onChange={(e) => setAnnualProduction(Number(e.target.value) || 0)}
                className="w-full px-6 py-5 rounded-2xl border-2 border-gray-300 focus:border-emerald-500 focus:outline-none text-xl font-medium"
              />
              <p className="text-sm text-gray-500 mt-2">개/년</p>
            </div>
          </div>

          {/* 원재료 리스트 */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">원재료 및 공정 구성</h3>
              <button
                onClick={addMaterial}   // 여기 붙였음!!!
                className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Plus className="w-5 h-5" />
                <span>원재료 추가</span>
              </button>
            </div>

            <div className="space-y-4">
              {materials.map((material) => (
                <div key={material.id} className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200 hover:border-emerald-400 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                          {material.source === 'ai' ? 'AI 추천' : '사용자 입력'}
                        </span>
                        <input
                          type="text"
                          value={material.name}
                          onChange={(e) => updateMaterial(material.id, 'name', e.target.value)}
                          className="text-xl font-bold text-gray-800 bg-transparent border-b-2 border-transparent hover:border-emerald-500 focus:border-emerald-600 outline-none transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-6 text-lg">
                        <div>
                          <span className="text-gray-600">사용량 (kg):</span>
                          <input
                            type="number"
                            step="0.0001"
                            value={material.amount}
                            onChange={(e) => updateMaterial(material.id, 'amount', e.target.value)}
                            className="ml-3 w-32 px-3 py-1 border border-emerald-300 rounded-lg focus:border-emerald-600 outline-none font-medium text-emerald-700"
                          />
                        </div>
                        <div>
                          <span className="text-gray-600">배출계수:</span>
                          <input
                            type="number"
                            step="0.1"
                            value={material.emissionFactor}
                            onChange={(e) => updateMaterial(material.id, 'emissionFactor', e.target.value)}
                            className="ml-3 w-32 px-3 py-1 border border-emerald-300 rounded-lg focus:border-emerald-600 outline-none font-medium text-emerald-700"
                          />
                          <span className="text-sm text-gray-500 ml-1">kgCO₂e/kg</span>
                        </div>
                        <div className="font-bold text-red-600 self-center">
                          → {(material.amount * material.emissionFactor).toFixed(4)} kgCO₂e
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeMaterial(material.id)}
                      className="ml-6 text-red-500 hover:text-red-700 hover:scale-125 transition-all"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* AI 추천 버튼 */}
            <div className="mt-8 p-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl text-white text-center cursor-pointer hover:shadow-2xl transform hover:scale-105 transition-all">
              <BrainCircuit className="w-16 h-16 mx-auto mb-4" />
              <p className="text-2xl font-bold">AI로 원재료 자동 추출하기</p>
              <p className="mt-2 opacity-90">BOM, 도면, PDF만 업로드하면 10초 만에 완료</p>
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽: 결과 영역 */}
      <div className="w-1/2 p-8">
        <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl h-full flex flex-col overflow-hidden">
          <div className="p-10 border-b-4 border-emerald-500">
            <h3 className="text-3xl font-bold text-center text-gray-800">실시간 LCA 결과</h3>
            {isCalculating && (
              <div className="mt-6 text-center">
                <Calculator className="w-16 h-16 mx-auto text-emerald-600 animate-spin" />
                <p className="mt-4 text-xl text-emerald-600 font-bold">계산 중...</p>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-10 space-y-10">
            <div className="text-center">
              <p className="text-8xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent animate-pulse">
                {totalPerUnit.toFixed(3)}
              </p>
              <p className="text-3xl text-gray-700 mt-4">kgCO₂e / 제품 1개</p>
              <p className="text-2xl text-gray-600 mt-2">
                연간 총 <strong className="text-red-600">{(totalAnnual / 1000).toFixed(1)}천 톤</strong> 배출
              </p>
            </div>

            <div>
              <h4 className="text-2xl font-bold mb-6 flex items-center">
                <AlertCircle className="w-8 h-8 text-orange-500 mr-3" />
                주요 배출원 (Hotspots)
              </h4>
              <div className="space-y-4">
                {hotSpots.map((m, i) => (
                  <div key={m.id} className="bg-orange-50 border-2 border-orange-300 rounded-2xl p-6">
                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-bold text-orange-600">#{i + 1}</span>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-800">{m.name}</p>
                        <p className="text-3xl font-bold text-orange-600">
                          {totalPerUnit > 0 ? ((m.amount * m.emissionFactor / totalPerUnit) * 100).toFixed(1) : 0}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-2xl font-bold mb-6">단계별 기여도</h4>
              <div className="space-y-6">
                {[
                  { name: '원재료 채취', value: 68, color: 'from-orange-500 to-red-500' },
                  { name: '제조 공정', value: 18, color: 'from-yellow-500 to-orange-500' },
                  { name: '유통/운송', value: 9, color: 'from-blue-500 to-cyan-500' },
                  { name: '사용 및 폐기', value: 5, color: 'from-green-500 to-emerald-500' },
                ].map((stage) => (
                  <div key={stage.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-lg">{stage.name}</span>
                      <span className="font-bold text-gray-700">{stage.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-12 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${stage.color} rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-6 text-white font-bold text-xl shadow-lg`}
                        style={{ width: `${stage.value}%` }}
                      >
                        {stage.value}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 p-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl border-4 border-emerald-300">
              <div className="flex items-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mr-4" />
                <h4 className="text-2xl font-bold text-emerald-800">자동 생성된 보고서 문단</h4>
              </div>
              <p className="text-lg leading-relaxed text-gray-800">
                당사의 주력 제품인 <strong>{productName}</strong>는 전과정평가(LCA)를 통해 
                제품 1개당 <strong>{totalPerUnit.toFixed(3)} kgCO₂e</strong>의 온실가스를 배출하는 것으로 산정되었습니다. 
                이는 연간 생산량 {annualProduction.toLocaleString()}개 기준 총 <strong>{(totalAnnual / 1000).toFixed(1)}천 톤</strong>에 해당합니다. 
                주요 배출원으로는 <strong>{hotSpots[0]?.name || '없음'}</strong>
                {hotSpots[0] && `(${(hotSpots[0].amount * hotSpots[0].emissionFactor / totalPerUnit * 100).toFixed(1)}%)`},
                {hotSpots[1] && <strong> {hotSpots[1].name}</strong>}이 뒤를 이었으며, 
                원재료 채취 단계가 전체 배출의 68%를 차지하여 개선 우선순위로 선정되었습니다.
              </p>
              <button className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
                이 문단을 최종 보고서에 추가하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}