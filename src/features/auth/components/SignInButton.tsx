"use client";

import { useState } from "react";
import { SignInModal } from "./SignInModal";

export function SignInButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="cursor-pointer rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all hover:opacity-90 active:scale-[0.98]"
      >
        Sign In
      </button>
      {showModal && <SignInModal onClose={() => setShowModal(false)} />}
    </>
  );
}
