"use client";

import { useCallback, useRef, useState } from "react";

export type Snap = "peek" | "half" | "full";

/** Fraction of the viewport each snap point leaves visible. */
export const SNAP_FRACTION: Record<Snap, number> = {
  peek: 0.12,
  half: 0.5,
  full: 0.92,
};

const SHEET_FRACTION = SNAP_FRACTION.full;
const FLICK_VELOCITY = 0.5; // px per ms — above this, follow the gesture direction
const SNAP_ORDER: Snap[] = ["peek", "half", "full"];

type DragState = {
  startY: number;
  startTranslate: number;
  lastY: number;
  lastTime: number;
};

/**
 * Drag-and-snap behaviour for the location sheet.
 * Built on pointer events so it works with touch, mouse and pen alike.
 *
 * The resting position is derived from the snap point, so a resize or a snap
 * change needs no synchronisation; only an in-flight drag overrides it.
 */
export function useBottomSheet(
  viewportHeight: number,
  initialSnap: Snap = "peek",
) {
  const sheetHeight = viewportHeight * SHEET_FRACTION;

  const translateFor = useCallback(
    (snap: Snap) => sheetHeight - viewportHeight * SNAP_FRACTION[snap],
    [sheetHeight, viewportHeight],
  );

  const [snap, setSnap] = useState<Snap>(initialSnap);
  const [dragTranslate, setDragTranslate] = useState<number | null>(null);
  const drag = useRef<DragState | null>(null);

  const translate = dragTranslate ?? translateFor(snap);
  const isDragging = dragTranslate !== null;

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      drag.current = {
        startY: e.clientY,
        startTranslate: translate,
        lastY: e.clientY,
        lastTime: e.timeStamp,
      };
      setDragTranslate(translate);
    },
    [translate],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const state = drag.current;
      if (!state) return;

      const next = state.startTranslate + (e.clientY - state.startY);
      setDragTranslate(
        Math.min(Math.max(next, translateFor("full")), translateFor("peek")),
      );
      state.lastY = e.clientY;
      state.lastTime = e.timeStamp;
    },
    [translateFor],
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      const state = drag.current;
      if (!state) return;
      drag.current = null;

      const elapsed = e.timeStamp - state.lastTime;
      const velocity = elapsed > 0 ? (e.clientY - state.lastY) / elapsed : 0;
      const released = translate;
      setDragTranslate(null);

      // A flick wins over proximity: move one snap in the swipe direction.
      if (Math.abs(velocity) > FLICK_VELOCITY) {
        const index = SNAP_ORDER.indexOf(snap);
        const next = velocity > 0 ? index - 1 : index + 1;
        setSnap(SNAP_ORDER[Math.min(Math.max(next, 0), SNAP_ORDER.length - 1)]);
        return;
      }

      const nearest = SNAP_ORDER.reduce((best, candidate) =>
        Math.abs(translateFor(candidate) - released) <
        Math.abs(translateFor(best) - released)
          ? candidate
          : best,
      );
      setSnap(nearest);
    },
    [snap, translate, translateFor],
  );

  return {
    snap,
    setSnap,
    sheetHeight,
    /** Visible height of the sheet right now — used to keep the FAB above it. */
    visibleHeight: sheetHeight - translate,
    translate,
    isDragging,
    dragHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
    },
  };
}
