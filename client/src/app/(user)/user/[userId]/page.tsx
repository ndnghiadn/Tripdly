import UserPage from "@/components/user/user-page";

export default function User({ params }) {
  return <UserPage userId={params.userId} />;
}
