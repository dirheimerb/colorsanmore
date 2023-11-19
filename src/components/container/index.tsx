"use client";
import React, { memo, useCallback } from "react";
import { useBoundingDOMRect } from "@flashmd/hooks/useBoundingDOMRect";
import Colors from "@flashmd/lib/colors";
import "@flashmd/styles/styles.css";
const colors = new Colors();

export interface ContainerProps {
  readonly onCoordinateChange: (x: number, y: number) => void;
  readonly children: React.ReactNode;
}

export const Container = memo(
  ({ onCoordinateChange, children }: ContainerProps) => {
    const [interactiveRef, { width, height }, getPosition] =
      useBoundingDOMRect<HTMLDivElement>();

    const move = useCallback(
      (event: React.PointerEvent<HTMLDivElement> | PointerEvent) => {
        const { left, top } = getPosition();

        const x = colors.clamp({
          value: event.clientX - left,
          min: 0,
          max: width,
        });
        const y = colors.clamp({
          value: event.clientY - top,
          min: 0,
          max: height,
        });

        onCoordinateChange(x, y);
      },
      [width, height, getPosition, onCoordinateChange],
    );

    const onPointerDown = useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        if (event.button !== 0) return;

        move(event);

        const onPointerMove = (event: PointerEvent) => {
          move(event);
        };

        const onPointerUp = (event: PointerEvent) => {
          move(event);

          document.removeEventListener(
            "pointermove",
            onPointerMove,
            false,
          );
          document.removeEventListener(
            "pointerup",
            onPointerUp,
            false,
          );
        };

        document.addEventListener(
          "pointermove",
          onPointerMove,
          false,
        );
        document.addEventListener("pointerup", onPointerUp, false);
      },
      [move],
    );

    return (
      <div
        ref={interactiveRef}
        className="fmd-interactive"
        onPointerDown={onPointerDown}
      >
        {children}
      </div>
    );
  },
);
