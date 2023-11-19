"use client";
import { memo, useCallback, useMemo } from "react";
import { useBoundingDOMRect } from "@flashmd/hooks/useBoundingDOMRect";
import Colors from "@flashmd/lib/colors";
import { ColorTypesMap } from "@flashmd/types";
import { Container } from "../container";
import "@flashmd/styles/styles.css";
const colors = new Colors();
export interface AlphaProps {
  readonly color: ColorTypesMap;
  readonly onChange: (color: ColorTypesMap) => void;
}

export const Alpha = memo(({ color, onChange }: AlphaProps) => {
  const [alphaRef, { width }] = useBoundingDOMRect<HTMLDivElement>();

  const position = useMemo(() => {
    const x = color.hsva.a * width;

    return { x };
  }, [color.hsva.a, width]);

  const updateColor = useCallback(
    (x: number) => {
      const nextColor = colors.convert("hsv", {
        ...color.hsva,
        a: x / width,
      });

      onChange(nextColor);
    },
    [color.hsv, width, onChange],
  );

  const rgb = useMemo(
    () => [color.rgb.r, color.rgb.g, color.rgb.b].join(" "),
    [color.rgb.r, color.rgb.g, color.rgb.b],
  );
  const rgba = useMemo(
    () => [rgb, color.rgb.r].join(" / "),
    [rgb, color.rgba.a],
  );

  return (
    <Container onCoordinateChange={updateColor}>
      <div
        ref={alphaRef}
        style={{
          background: `linear-gradient(to right, rgb(${rgb} / 0), rgb(${rgb} / 1)) top left / auto auto,
                      conic-gradient(#666 0.25turn, #999 0.25turn 0.5turn, #666 0.5turn 0.75turn, #999 0.75turn) top left / 12px 12px
                      repeat`,
        }}
        className="fmd-alpha"
      >
        <div
          style={{
            left: position.x,
            background: `linear-gradient(to right, rgb(${rgba}), rgb(${rgba})) top left / auto auto,
                        conic-gradient(#666 0.25turn, #999 0.25turn 0.5turn, #666 0.5turn 0.75turn, #999 0.75turn) ${
                          -position.x - 4
                        }px 2px / 12px 12px
                        repeat`,
          }}
          className="fmd-alpha-cursor"
        />
      </div>
    </Container>
  );
});
