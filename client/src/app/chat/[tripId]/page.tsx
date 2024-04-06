"use client";

import { ChatForm } from "@/views";

interface IProps {
  params: {
    tripId: string;
  }  
}

export default function ChatRoom({ params }: IProps) {
  return <ChatForm tripId={params.tripId}/>;
}
