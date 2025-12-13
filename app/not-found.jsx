import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Example() {
    return (
        <div className="flex flex-col items-center justify-center text-sm max-md:px-4 py-20 mt-36 sm:mt-24">
            <h1 className="text-4xl md:text-5xl font-bold gradient-title">
                404 Not Found
            </h1>
            <div className="h-px w-80 rounded bg-linear-to-r from-gray-400 to-gray-800 my-5 md:my-7"></div>
            <p className="md:text-xl text-gray-400 max-w-lg text-center">
                The page you are looking for does not exist or has been moved.
            </p>
            <Link href={"/"} className="mt-5">
            <Button>Return Home</Button>
            </Link>
        </div>
    );
};