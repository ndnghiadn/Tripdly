"use client";

import { ChatForm } from "@/views";

export default function ChatRoom({ params }) {
  return <ChatForm tripId={params.tripId} />;
}
