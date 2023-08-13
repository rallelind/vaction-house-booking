import { UserIcon } from "@heroicons/react/24/outline";

const Avatar = ({
  avatarUrl,
  height,
  width,
}: {
  avatarUrl?: string;
  height?: string;
  width?: string;
}) => {
  return (
    <div
      className={`bg-orange-200 rounded-lg h-${!!height ? height : "10"} w-${
        !!width ? width : "10"
      } flex items-center justify-center`}
    >
      {!avatarUrl ? (
        <UserIcon className="h-6" />
      ) : (
        <img
          alt="avatar"
          className={`rounded-lg h-${!!height ? height : "10"} w-${
            !!width ? width : "10"
          }`}
          src={avatarUrl}
        />
      )}
    </div>
  );
};

export default Avatar;
