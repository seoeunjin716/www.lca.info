export function ReportView() {
  return (
    <div className="h-full overflow-y-auto bg-white">
      <div className="max-w-4xl mx-auto p-8 lg:p-12">
        <h1 className="text-3xl text-gray-900 mb-4">
          연간 기후 공시 보고서 (IFRS S2 기반)
        </h1>
        <p className="text-gray-600 mb-8">
          본 보고서는 AI ESG Consultant와의 대화형 정보 수집 및 검증을 통해
          생성되었습니다. (버전: v1.0)
        </p>

        {/* 섹션 1 */}
        <section className="mb-10">
          <h2 className="text-2xl text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">
            1. Governance (S2-5)
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              당사는 기후 관련 리스크 및 기회에 대한 효과적인 감독을 위해
              이사회 산하 &apos;지속가능경영위원회&apos;를 설치하여 운영하고 있습니다.
              위원회는 분기별로 기후 관련 주요 안건을 보고받고, 관련 전략 및
              성과를 감독합니다.
            </p>
            <p>
              경영진은 위원회에서 승인된 기후 전략을 이행하며, 기후 리스크
              식별 및 평가에 대한 책임을 집니다.
            </p>
          </div>
        </section>

        {/* 섹션 2 */}
        <section className="mb-10">
          <h2 className="text-2xl text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">
            2. Risks & Opportunities (S2-7)
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              당사는 단기, 중기, 장기에 걸쳐 식별된 주요 기후 관련 리스크와
              기회를 관리합니다. 주요 전환 리스크로는 탄소 배출 규제 강화가
              있으며, 물리적 리스크로는 극한 기후 현상 증가를 식별하였습니다.
            </p>
            <p>
              기회 요인으로는 저탄소 제품 및 서비스 시장 확대를 식별하고, 관련
              기술 개발에 R&D 투자를 집중하고 있습니다.
            </p>
          </div>
        </section>

        {/* 섹션 3 */}
        <section className="mb-10">
          <h2 className="text-2xl text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">
            3. Metrics & Targets (S2-15)
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              당사의 온실가스 배출량은 2023년(기준연도) 대비 2030년까지 Scope
              1, 2 배출량을 40% 감축하는 것을 목표로 합니다.
            </p>
            <p className="text-gray-800">주요 지표:</p>
            <ul className="list-disc pl-5">
              <li>Scope 1 배출량 (tCO2e)</li>
              <li>Scope 2 배출량 (Market-based, tCO2e)</li>
              <li>기후 관련 전환 리스크에 노출된 자산 (금액)</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
