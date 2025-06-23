"use client";

import Link from "next/link";
import Logout from "./Logout";
import { User } from "@supabase/supabase-js";
import { useState } from "react";

export default function MobileMenu({ user }: { user: User | null }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-700 hover:text-blue-600 focus:outline-none"
      >
        ☰
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
          <Link href="/" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Home</Link>
          <Link href="/" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Find Work</Link>
          <Link href="/" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Post a Job</Link>
          <Link href="/" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Resources</Link>
          <Link href="/private" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">My Account</Link>

          {!user ? (
            <Link href="/login" className="block px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded mx-2 text-center mt-2">
              Login
            </Link>
          ) : (
            <>
              <div className="px-4 py-2 text-sm text-gray-500">{user?.email}</div>
              <div className="px-4">
                <Logout />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
