import HomeUpload from "@/components/homeUpload/HomeUpload";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="w-fit pt-[15px] mx-auto text-center">
        <h1 className="text-xl font-semibold">Send me a photo!</h1>
        <p>Whatever photo you upload will save in this website!</p>
      </div>
      <HomeUpload></HomeUpload>
    </div>
  );
}
