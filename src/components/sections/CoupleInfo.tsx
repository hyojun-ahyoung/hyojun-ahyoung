"use client";

import { WEDDING_INFO } from "@/constants/wedding-info";
import { usePoliteText } from "@/hooks/usePoliteText";
import { Card } from "@/components/ui/Card";

interface CoupleInfoProps {
  polite: boolean;
}

export function CoupleInfo({ polite }: CoupleInfoProps) {
  const { getText } = usePoliteText(polite);
  const { groom, bride, message } = WEDDING_INFO;

  const PersonCard = ({
    person,
    role,
  }: {
    person: typeof groom;
    role: string;
  }) => (
    <div className="flex-1 text-center">
      <div className="mb-6">
        <p className="text-sm sm:text-base text-gray-500 mb-3">{role}</p>
        <h3 className="text-2xl sm:text-3xl font-light text-gray-800">
          {person.fullName}
        </h3>
      </div>
      {(person.fatherName || person.motherName) && (
        <div className="text-sm sm:text-base text-gray-600 space-y-1 mb-6">
          {person.fatherName && (
            <p>
              {person.fatherName} · {person.motherName}
              {person.isFirstChild ? "의 장남" : "의 차남"}
            </p>
          )}
        </div>
      )}
      {person.phone && (
        <a
          href={`tel:${person.phone}`}
          className="inline-block mt-4 px-6 py-3 text-sm sm:text-base text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          연락하기
        </a>
      )}
    </div>
  );

  return (
    <section className="w-full py-12 md:py-16 px-6 bg-gray-50/50">
      <div className="max-w-4xl mx-auto">
        {/* 인사말 */}
        <div className="text-center mb-12 md:mb-16">
          <Card padding="lg">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base sm:text-lg md:text-xl">
              {getText(message.greeting)}
            </p>
          </Card>
        </div>

        {/* 신랑신부 정보 */}
        <Card padding="lg">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16">
            <PersonCard person={groom} role="신랑" />
            <div className="hidden md:block w-px bg-gray-200" />
            <div className="md:hidden h-px bg-gray-200" />
            <PersonCard person={bride} role="신부" />
          </div>
        </Card>
      </div>
    </section>
  );
}
