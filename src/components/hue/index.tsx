"use client";
import { memo, useCallback, useMemo } from "react";
import { useBoundingDOMRect } from "@flashmd/hooks/useBoundingDOMRect";
import Colors from "@flashmd/lib/colors";
import { ColorTypesMap } from "@flashmd/types";
import { Container } from "@flashmd/components/container";
import "@flashmd/styles/styles.css";
const colors = new Colors();
export interface HueProps {
  readonly color: ColorTypesMap;
  readonly onChange: (color: ColorTypesMap) => void;
}

export const Hue = memo(({ color, onChange }: HueProps) => {
  const [hueRef, { width }] = useBoundingDOMRect<HTMLDivElement>();

  const position = useMemo(() => {
    const x = (color.hsv.h / 360) * width;

    return { x };
  }, [color.hsv.h, width]);

  const updateColor = useCallback(
    (x: number) => {
      const nextColor = colors.convert("hsv", {
        ...color.hsv,
        h: (x / width) * 360,
      });

      onChange(nextColor);
    },
    [color.hsv, width, onChange],
  );

  const hsl = useMemo(
    () => [color.hsv.h, "100%", "50%"].join(" "),
    [color.hsv.h],
  );

  return (
    <Container onCoordinateChange={updateColor}>
      <div ref={hueRef} className="fmd-hue">
        <div
          style={{ left: position.x, backgroundColor: `hsl(${hsl})` }}
          className="fmd-hue-cursor"
        />
      </div>
    </Container>
  );
});
