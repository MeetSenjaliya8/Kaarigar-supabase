import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Logout from "./Logout";
import React from "react";
import MobileMenu from "./MobileMenu";

const Navbar = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <nav className="bg-[#dbdfd5] border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo or Brand */}
          <div className="flex-shrink-0 text-lg font-semibold text-gray-800">
            <Link href="/">RecruiterApp</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="text-gray-700 hover:text-blue-700 transition">Home</Link>
            <Link href="/" className="text-gray-700 hover:text-blue-700 transition">Find Work</Link>
            <Link href="/" className="text-gray-700 hover:text-blue-700 transition">Post a Job</Link>
            <Link href="/" className="text-gray-700 hover:text-blue-700 transition">Resources</Link>
            <Link href="/private" className="text-gray-700 hover:text-blue-700 transition">My Account</Link>
          </div>

          {/* Auth & User */}
          <div className="hidden md:flex items-center gap-x-4">
            {!user ? (
              <Link href="/login">
                <div className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition">
                  Login
                </div>
              </Link>
            ) : (
              <>
                <div className="text-sm text-gray-700">{user?.email}</div>
                <Logout />
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <MobileMenu user={user} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
