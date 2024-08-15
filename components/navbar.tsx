import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.backgroundColor = 'gray'
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.backgroundColor = ''
    }
  }, [showMenu]);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:block w-64 h-screen bg-white shadow-md fixed text-black rounded-lg">
        <div className="flex flex-col align-start h-full justify-between p-6">
          <div>
            <Image src="/icon.svg" width={180} height={24} alt="Tesla" />
            <ul className="mt-8 space-y-4 mb-8">
              <li className="p-2 flex pl-4 rounded hover:bg-regal-blue/10 hover:text-regal-blue cursor-pointer">
                <div className="flex">
                  <img src="/icons/vector.svg" alt="Reports" className="h-5 w-5" />
                  <a href="#" className="pl-4 text-sm">Reports</a>
                </div>
              </li>
              <li className="p-2 flex pl-4 rounded hover:bg-regal-blue/10 hover:text-regal-blue cursor-pointer">
                <div className="flex">
                  <img src="/icons/quiz.svg" alt="Library" className="h-5 w-5" />
                  <a href="#" className="pl-4 text-sm">Library</a>
                </div>
              </li>
              <li className="p-2 flex pl-4 rounded hover:bg-regal-blue/10 hover:text-regal-blue cursor-pointer">
                <div className="flex">
                  <img src="/icons/people.svg" alt="People" className="h-5 w-5" />
                  <a href="#" className="pl-4 text-sm">People</a>
                </div>
              </li>
              <li className="p-2 flex pl-4 rounded hover:bg-regal-blue/10 hover:text-regal-blue cursor-pointer">
                <div className="flex">
                  <img src="/icons/assignments.svg" alt="Activities" className="h-5 w-5" />
                  <a href="#" className="pl-4 text-sm">Activities</a>
                </div>
              </li>
            </ul>

            <h5 className="pt-6 text-black/50">Support</h5>
            <ul className="mt-2 space-y-4">
              <li className="p-2 flex pl-4 rounded hover:bg-regal-blue/10 hover:text-regal-blue cursor-pointer">
                <div className="flex">
                  <img src="/icons/bulb.svg" alt="Get Started" className="h-5 w-5" />
                  <a href="#" className="pl-4 text-sm">Get Started</a>
                </div>
              </li>
              <li className="p-2 flex pl-4 rounded hover:bg-regal-blue/10 hover:text-regal-blue cursor-pointer">
                <div className="flex">
                  <img src="/icons/settings.svg" alt="Settings" className="h-5 w-5" />
                  <a href="#" className="pl-4 text-sm">Settings</a>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <div className="p-4">
              <div className="border-b border-black/10"></div>
            </div>
            <div className="flex items-center space-x-4">
              <Image src="/photo.png" width={35} height={35} className="rounded-full px-1" alt="Profile" />
              <div className="text-sm">
                <h3 className="font-bold">John Doe</h3>
                <p className="text-black/50">johndoe@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="block md:hidden bg-gray-800 text-white p-1">
        <button
          className="p-2 focus:outline-none"
          onClick={() => setShowMenu(!showMenu)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="bg-white text-black p-4 fixed inset-0 z-20 md:hidden h-full" style={{ 'zIndex': 20 }}>
          <div className="flex flex-col space-y-4">
            <button
              className="p-2 focus:outline-none self-end"
              onClick={() => setShowMenu(false)}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <a href="#" className="p-2 text-sm block hover:bg-gray-200 rounded">
              Reports
            </a>
            <a href="#" className="p-2 text-sm block hover:bg-gray-200 rounded">
              Library
            </a>
            <a href="#" className="p-2 text-sm block hover:bg-gray-200 rounded">
              People
            </a>
            <a href="#" className="p-2 text-sm block hover:bg-gray-200 rounded">
              Activities
            </a>
            <a href="#" className="p-2 text-sm block hover:bg-gray-200 rounded">
              Get Started
            </a>
            <a href="#" className="p-2 text-sm block hover:bg-gray-200 rounded">
              Settings
            </a>
          </div>
        </div>
      )}
    </>
  );
}
