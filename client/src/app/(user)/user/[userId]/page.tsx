import { ProfileView } from "@/views";

export default function User({ params }) {
  return <ProfileView userId={params.userId} />;
}
