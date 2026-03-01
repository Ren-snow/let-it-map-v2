"use client";

import { useCallback, useEffect, useRef } from "react";

export function Modal({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();

    return () => {
      dialog.close();
    };
  }, []);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) {
        onClose();
      }
    },
    [onClose],
  );

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onCancel={onClose}
      className="fixed inset-0 m-auto w-full max-w-sm rounded-2xl border border-border bg-surface p-0 shadow-xl backdrop:bg-foreground/40 backdrop:backdrop-blur-sm"
    >
      {children}
    </dialog>
  );
}
