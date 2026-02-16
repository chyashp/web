"use client";

import { useState } from "react";
import Link from "next/link";
import { Dialog, Menu } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import SignUpModal from "./SignUpModal";
import ContactModal from "./ContactModal";
import { useAuth } from "@/contexts/AuthContext";

const navigation = [
  { name: "home", href: "/" },
  { name: "services", href: "/services" },
  { name: "about", href: "/about" },
  { name: "portfolio", href: "/projects" },
  { name: "blog", href: "/blog" },
];

const communityLinks = [
  { name: "missions", href: "/missions" },
  { name: "tutorials", href: "/tutorials" },
  { name: "how it works", href: "/how-it-works" },
  { name: "faq", href: "/faq" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-sm">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold tracking-tight text-primary-500">
              nanushi.
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-navy-500"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12 lg:items-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-base font-semibold leading-6 text-navy-500 hover:text-primary-500 transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-x-1 text-base font-semibold leading-6 text-navy-500 hover:text-primary-500 transition-colors">
              community
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              {communityLinks.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <Link
                      href={item.href}
                      className={`block px-4 py-2 text-sm font-semibold ${
                        active
                          ? "bg-primary-50 text-primary-500"
                          : "text-navy-500"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-8">
          {user ? (
            <>
              <button
                onClick={() => setIsContactOpen(true)}
                className="rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-5 py-2.5 text-base font-semibold text-white shadow-lg hover:shadow-primary-500/30 hover:scale-105 transition-all"
              >
                contact us
              </button>
              <button
                onClick={signOut}
                className="text-base font-semibold leading-6 text-navy-500 hover:opacity-80 transition-opacity"
              >
                sign out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsSignInOpen(true)}
                className="text-base font-semibold leading-6 text-navy-500 hover:opacity-80 transition-opacity"
              >
                sign in
              </button>
              <button
                onClick={() => setIsContactOpen(true)}
                className="rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-5 py-2.5 text-base font-semibold text-white shadow-lg hover:shadow-primary-500/30 hover:scale-105 transition-all"
              >
                contact us
              </button>
            </>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold tracking-tight text-primary-500">
                nanushi.
              </span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-navy-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-navy-500 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="-mx-3 px-3 py-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                    Community
                  </div>
                  {communityLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-navy-500 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="py-6">
                {user ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setIsContactOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="-mx-3 block w-full rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-3 py-2 text-base font-semibold leading-7 text-white shadow-lg hover:shadow-primary-500/30 hover:scale-105 transition-all"
                    >
                      contact us
                    </button>
                    <button
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }}
                      className="-mx-3 block w-full rounded-lg px-3 py-2 text-base font-semibold leading-7 text-navy-500 hover:bg-gray-50"
                    >
                      sign out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setIsSignInOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="-mx-3 block w-full rounded-lg px-3 py-2 text-base font-semibold leading-7 text-navy-500 hover:bg-gray-50"
                    >
                      sign in
                    </button>
                    <button
                      onClick={() => {
                        setIsContactOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="-mx-3 block w-full rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-3 py-2 text-base font-semibold leading-7 text-white shadow-lg hover:shadow-primary-500/30 hover:scale-105 transition-all"
                    >
                      contact us
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
      <SignUpModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        initialMode="signin"
      />
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        initialMode="signup"
      />
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </header>
  );
}
