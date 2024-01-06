import ChatForm from "@/components/chat/chat-form";

export default function ChatRoom({ params }) {
  return <ChatForm roomId={params.roomId} />;
}
