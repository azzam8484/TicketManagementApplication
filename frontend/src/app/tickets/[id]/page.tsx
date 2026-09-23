import { TicketDetailPage } from "@/components/tickets/TicketDetailPage";

type TicketDetailRouteProps = {
  params: Promise<{ id: string }>;
};

export default async function TicketDetailRoute({
  params,
}: TicketDetailRouteProps) {
  const { id } = await params;
  return <TicketDetailPage ticketId={id} />;
}
