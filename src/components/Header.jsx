import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <>
      <header className="bg-slate-200 shadow-md">
        <div className="flex p-3 max-w-6xl mx-auto items-center justify-between">
          <Link href="/">
            <h1 className="font-bold text-sm sm:text-xl flex-wrap flex">
              <span className="text-slate-500">Next</span>
              <span className="text-slate-800">Next</span>
            </h1>
          </Link>
          <form className="bg-slate-100 flex items-center  rounded-lg">
            <input
              type="text"
              placeholder="Search"
              className="w-24 p-3 sm:w-64 bg-transparent focus:outline-none"
            />
            <button>
              <FaSearch className="text-slate-600 m-3" />
            </button>
          </form>

          <ul className="flex gap-4">
            <Link href="/">
              <li className="hover:underline md:inline hidden">Home</li>
            </Link>

            <Link href="/about">
              <li className="hover:underline md:inline hidden">About</li>
            </Link>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in">
                <li className="hover:underline md:inline hidden">Sign In</li>
              </Link>
            </SignedOut>
          </ul>
        </div>
      </header>
    </>
  );
}
