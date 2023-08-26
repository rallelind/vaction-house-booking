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
  const dynamicHeight = height || "10";
  const dynamicWidth = width || "10";

  return (
    <div
      className={`bg-orange-200 rounded-lg object-cover h-${dynamicHeight} w-${dynamicWidth} flex items-center justify-center`}
    >
      {!avatarUrl ? (
        <UserIcon className={`h-6`} />
      ) : (
        <img
          alt="avatar"
          className={`rounded-lg h-${dynamicHeight} object-cover w-${dynamicWidth}`}
          src={avatarUrl}
        />
      )}
    </div>
  );
};

export default Avatar;
