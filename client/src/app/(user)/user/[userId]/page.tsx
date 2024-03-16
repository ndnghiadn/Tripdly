import { ProfileView } from "@/views";

interface params{
  params: {
    userId: string;
  }
}

export default function User({ params }: params) {
  return <ProfileView userId={params.userId} />;
}
