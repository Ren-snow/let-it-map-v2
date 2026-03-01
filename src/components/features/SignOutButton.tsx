"use client";

import { useState } from "react";
import { SignOutModal } from "./SignOutModal";

export function SignOutButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="cursor-pointer rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all hover:opacity-90 active:scale-[0.98]"
      >
        Sign Out
      </button>
      {showModal && <SignOutModal onClose={() => setShowModal(false)} />}
    </>
  );
}
