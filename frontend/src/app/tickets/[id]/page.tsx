import { TicketDetailPage } from "@/components/tickets/TicketDetailPage";

type TicketDetailRouteProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ edit?: string }>;
};

export default async function TicketDetailRoute({
  params,
  searchParams,
}: TicketDetailRouteProps) {
  const { id } = await params;
  const query = await searchParams;
  return (
    <TicketDetailPage
      ticketId={id}
      initialEditing={query.edit === "1"}
    />
  );
}
