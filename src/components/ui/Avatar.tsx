import { UserIcon } from "@heroicons/react/24/outline";

const Avatar = ({ avatarUrl }: { avatarUrl?: string }) => {
  return (
    <div className="bg-orange-200 rounded-lg h-10 w-10 flex items-center justify-center">
      {!avatarUrl ? (
        <UserIcon className="h-6" />
      ) : (
        <img alt="avatar" className="rounded-lg" src={avatarUrl} />
      )}
    </div>
  );
};

export default Avatar;
