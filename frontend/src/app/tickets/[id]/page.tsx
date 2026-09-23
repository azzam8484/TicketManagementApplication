import { TicketDetailPlaceholder } from "@/components/tickets/TicketDetailPlaceholder";

type TicketDetailRouteProps = {
  params: Promise<{ id: string }>;
};

export default async function TicketDetailRoute({
  params,
}: TicketDetailRouteProps) {
  const { id } = await params;
  return <TicketDetailPlaceholder ticketId={id} />;
}
