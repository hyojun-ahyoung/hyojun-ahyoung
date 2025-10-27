"use client";

import { useState } from "react";
import { ACCOUNT_INFO } from "@/constants/wedding-info";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { copyToClipboard } from "@/utils/text";
import { AccountInfo } from "@/types";

export function Account() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const handleCopy = async (account: AccountInfo) => {
    const text = `${account.bank} ${account.accountNumber}`;
    const success = await copyToClipboard(text);

    if (success) {
      setCopiedAccount(account.accountNumber);
      setTimeout(() => setCopiedAccount(null), 2000);
    }
  };

  const AccountCard = ({
    title,
    accounts,
  }: {
    title: string;
    accounts: AccountInfo[];
  }) => (
    <div className="flex-1">
      <h3 className="text-xl sm:text-2xl font-medium text-gray-800 mb-6 text-center">
        {title}
      </h3>
      <div className="space-y-4">
        {accounts.map((account, index) => (
          <div key={index} className="p-5 bg-gray-50 rounded-xl">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base text-gray-600 mb-2">
                  {account.holder}
                </p>
                <p className="text-base sm:text-lg font-medium text-gray-800 mb-1">
                  {account.bank}
                </p>
                <p className="text-sm sm:text-base text-gray-700 font-mono break-all">
                  {account.accountNumber}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCopy(account)}
                className="ml-2 whitespace-nowrap shrink-0 touch-manipulation min-h-11"
              >
                {copiedAccount === account.accountNumber ? "복사됨" : "복사"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="w-full py-12 md:py-16 px-6 bg-gray-50/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center text-gray-800 mb-4">
          마음 전하실 곳
        </h2>
        <p className="text-sm sm:text-base text-gray-500 text-center mb-8 md:mb-10">
          참석이 어려우신 분들을 위해 계좌번호를 안내드립니다
        </p>

        <Card padding="lg">
          <div className="flex flex-col md:flex-row gap-10 md:gap-12">
            <AccountCard title="신랑측" accounts={ACCOUNT_INFO.groom} />
            <div className="hidden md:block w-px bg-gray-200" />
            <div className="md:hidden h-px bg-gray-200" />
            <AccountCard title="신부측" accounts={ACCOUNT_INFO.bride} />
          </div>
        </Card>
      </div>
    </section>
  );
}
