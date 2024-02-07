import { json, useLoaderData, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

export default function EventDetailPage() {
  const data = useRouteLoaderData("event-detail");
  const event = data.event;
  return <EventItem event={event} />;
}

export async function loader({ request, params }) {
  const id = params.eventId;

  // return fetch(`http://localhost:8080/events/${id}`);
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    json(
      { message: "Could not fetch details for selected event." },
      { status: 500 }
    );
  } else {
    return response;
  }
}
