import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/outline";

const ImageUpload = () => {
  return (
    <div className="relative">
      <Image className="rounded-lg" height={350} width={350} src="/huset.jpg" />
      <button className="flex absolute top-2 left-2 bg-white border border-black p-1 rounded-lg">
        <PhotoIcon className="h-6" />
        <p className="ml-2">Ændre billede</p>
      </button>
    </div>
  );
};

export default ImageUpload;
