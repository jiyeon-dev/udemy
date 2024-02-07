import { Await, defer, json, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

export default function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
  // // if (data.isError) {
  // //   return <p>{data.message}</p>;
  // // }
  // const events = data.events;

  // return (
  //   <>
  //     <EventsList events={events} />
  //   </>
  // );
}

const loadEvents = async () => {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    // return { isError: true, message: "Could not fetch events" };
    // throw { message: "Could not fetch events" };
    // throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
    //   status: 500,
    // });
    // throw new Error("Could not fetch");
    throw json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    // return response;

    const resData = await response.json();
    return resData.events;

    // const resData = await response.json();
    // const res = new Response(resData.events, { status: 201 });
    // return res;
  }
};

export function loader() {
  return defer({
    events: loadEvents(),
  });
}
