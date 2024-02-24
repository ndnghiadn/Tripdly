'use client'
import ChatForm from "@/components/chat/chat-form";

export default function ChatRoom({ params }) {
  return <ChatForm tripId={params.tripId}/>;
}
