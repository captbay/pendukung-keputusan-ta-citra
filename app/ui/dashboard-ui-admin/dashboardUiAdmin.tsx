"use client"

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import UserTable from "@/app/components/user-table/userTable";
import AHPResultTable from "@/app/components/ahp-result-table/ahpResultTable";
import { HeaderTabelResultMaturity } from "@/lib/actions";
import MaturityRecapTable, { TableRowMaturity, User } from "@/app/components/maturity-recap-table/maturityRecapTable";

interface DashboardProps {
  session: any;
  data: Array<{
    id: string;
    name?: string;
    email?: string;
    avatar?: string;
    role?: string;
    jabatan?: string | null;
    status?: string;
  }> | undefined;
  ahpResult: Array<{
    category?: {
      key?: string | null;
    } | null;
    value?: number;
  }> | undefined;
  maturityResult?: {
    header: HeaderTabelResultMaturity[],
    data: any[];
  } | undefined;
}

const DashboardUiAdmin: React.FC<DashboardProps> = ({ session, data, ahpResult, maturityResult }) => {
  const router = useRouter();
  const maturityResultData = maturityResult!.data as TableRowMaturity[];
  const maturityResultHeader = maturityResult!.header as User[];

  useEffect(() => {
    if (session?.user.jabatan === "Admin") {
      router.replace("/dashboard-admin");
    }
  }, [session, router]);

  return (
    <main className="flex flex-col w-full min-h-screen items-center py-10">
      <div className="max-lg:mt-20 mb-[-30px] rounded-2xl max-lg:mx-6">
        <h1 className="text-3xl font-bold text-tertiary max-lg:text-2xl text-center p-4">Risk Management Maturity Measurement Dashboard</h1>
      </div>
      <div className="flex flex-row max-lg:flex-col max-lg:gap-10 w-[70%] max-lg:w-[90%] justify-center items-center mt-10">
        <AHPResultTable
          ahpResult={ahpResult}
          session={session}
        />
      </div>
      <MaturityRecapTable
        users={maturityResultHeader}
        data={maturityResultData}
        session={session}
      />
    </main>
  );
}

export default DashboardUiAdmin;