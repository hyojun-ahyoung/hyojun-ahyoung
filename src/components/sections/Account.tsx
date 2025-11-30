"use client";

import { useState } from "react";
import { ACCOUNT_INFO } from "@/constants/wedding-info";
import { copyToClipboard } from "@/utils/text";

export function Account() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [groomOpen, setGroomOpen] = useState(false);
  const [brideOpen, setBrideOpen] = useState(false);

  const handleCopy = async (accountNumber: string, bank: string) => {
    const text = `${bank} ${accountNumber}`;
    const success = await copyToClipboard(text);

    if (success) {
      setCopiedAccount(accountNumber);
      setTimeout(() => setCopiedAccount(null), 2000);
    }
  };

  return (
    <section className="w-full bg-white py-12 px-6">
      <div className="max-w-md mx-auto">
        {/* 상단 안내 문구 */}
        <div
          className="text-center mb-8 text-[#111111]"
          style={{ fontFamily: "var(--font-gamtan)" }}
        >
          <p className="text-base leading-relaxed">
            멀리서도 저희를 축하해주시는 마음, 감사히 받겠습니다.
          </p>
          <p className="text-base leading-relaxed">참석이 어려운 분들을 위해</p>
          <p className="text-base leading-relaxed">
            마음을 전할 수 있는 곳을 함께 안내드립니다.
          </p>
        </div>

        {/* 신랑측 계좌 */}
        <div className="mb-6">
          {/* 신랑측 타이틀 - 사용자가 디자인할 부분 */}
          <button
            onClick={() => setGroomOpen(!groomOpen)}
            className="w-full py-4 px-6 rounded-full border-2 border-[#628869] flex items-center justify-between text-[#628869] mb-4"
            style={{
              fontFamily: "var(--font-gamtan)",
              filter: "url(#squiggly-account)",
            }}
          >
            <span className="flex-1 text-center text-lg font-medium">
              신랑측 계좌번호
            </span>
            <span className="text-xl">{groomOpen ? "↑" : "↓"}</span>
          </button>

          {/* 신랑측 계좌 목록 */}
          {groomOpen && (
            <div className="space-y-0">
              {ACCOUNT_INFO.groom.map((account, index) => (
                <div
                  key={index}
                  className="py-4 border-b-2 border-[#628869]"
                  style={{
                    borderImage:
                      "linear-gradient(90deg, #628869, #628869) 1",
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <span
                        className="text-sm text-[#628869] w-10"
                        style={{ fontFamily: "var(--font-gamtan)" }}
                      >
                        {account.role}
                      </span>
                      <div style={{ fontFamily: "var(--font-gamtan)" }}>
                        <p className="text-base font-medium text-[#111111]">
                          {account.name}
                        </p>
                        <p className="text-sm text-[#111111]">
                          {account.accountNumber} {account.bank}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        handleCopy(account.accountNumber, account.bank)
                      }
                      className="px-4 py-1.5 bg-[#628869] text-white text-sm rounded-md"
                      style={{ fontFamily: "var(--font-gamtan)" }}
                    >
                      {copiedAccount === account.accountNumber ? "복사됨" : "복사"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 신부측 계좌 */}
        <div>
          {/* 신부측 타이틀 - 사용자가 디자인할 부분 */}
          <button
            onClick={() => setBrideOpen(!brideOpen)}
            className="w-full py-4 px-6 rounded-full border-2 border-[#E8A4B8] flex items-center justify-between text-[#E8A4B8] mb-4"
            style={{
              fontFamily: "var(--font-gamtan)",
              filter: "url(#squiggly-account)",
            }}
          >
            <span className="flex-1 text-center text-lg font-medium">
              신부측 계좌번호
            </span>
            <span className="text-xl">{brideOpen ? "↑" : "↓"}</span>
          </button>

          {/* 신부측 계좌 목록 */}
          {brideOpen && (
            <div className="space-y-0">
              {ACCOUNT_INFO.bride.map((account, index) => (
                <div
                  key={index}
                  className="py-4 border-b-2 border-[#E8A4B8]"
                  style={{
                    borderImage:
                      "linear-gradient(90deg, #E8A4B8, #E8A4B8) 1",
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <span
                        className="text-sm text-[#E8A4B8] w-10"
                        style={{ fontFamily: "var(--font-gamtan)" }}
                      >
                        {account.role}
                      </span>
                      <div style={{ fontFamily: "var(--font-gamtan)" }}>
                        <p className="text-base font-medium text-[#111111]">
                          {account.name}
                        </p>
                        <p className="text-sm text-[#111111]">
                          {account.accountNumber} {account.bank}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        handleCopy(account.accountNumber, account.bank)
                      }
                      className="px-4 py-1.5 bg-[#E8A4B8] text-white text-sm rounded-md"
                      style={{ fontFamily: "var(--font-gamtan)" }}
                    >
                      {copiedAccount === account.accountNumber ? "복사됨" : "복사"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 지글지글 필터 */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <filter id="squiggly-account">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.02"
                numOctaves="3"
                seed="1"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="2"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </section>
  );
}
