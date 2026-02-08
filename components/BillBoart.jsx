import Link from "next/link";
import { Button } from "./ui/button";

const BillBoart = () => {
  return (
    <div
      className="
        my-20.5 mx-5
        max-w-full
        sm:max-w-[720px]
        lg:max-w-350
        sm:mx-auto
        bg-black rounded-2xl

        px-6 py-8
        sm:px-10 sm:py-10
        lg:px-11.5 lg:py-11

        flex flex-col gap-6
        lg:flex-row lg:items-center lg:justify-between
      "
    >
      {/* TEXT */}
      <div
        className="
          text-white font-medium
          text-lg
          sm:text-xl
          lg:text-2xl
          text-center
          lg:text-left
        "
      >
        Be among the first to use Sayzo and help shape how it’s built.
      </div>

      {/* BUTTON */}
      <div className="flex justify-center lg:justify-end">
      <Link href="https://chat.whatsapp.com/LWT16zuqwdxDbBdAxGbLce" target="black">
        <Button
          className="
            bg-black border border-primary-btn
            px-10 py-3
            sm:px-14 sm:py-3.5
            lg:px-20 lg:py-5
            hover:bg-primary-btn 
            font-semibold
          "
        >
          Whatsapp Community
        </Button>
        </Link>
      </div>
    </div>
  );
};

export default BillBoart;
