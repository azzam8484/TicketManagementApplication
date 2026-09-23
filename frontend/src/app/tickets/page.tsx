"use client";

import { TicketListPage } from "@/components/tickets/TicketListPage";
import { Suspense } from "react";
import { LoadingState } from "@/components/common";

export default function TicketsPage() {
  return (
    <Suspense fallback={<LoadingState label="Loading tickets…" />}>
      <TicketListPage />
    </Suspense>
  );
}
