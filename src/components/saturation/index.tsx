"use client";
import { memo, useCallback, useMemo } from "react";
import { useBoundingDOMRect } from "@flashmd/hooks/useBoundingDOMRect";
import Colors from "@flashmd/lib/colors";
import { ColorTypesMap } from "@flashmd/types";
import "@flashmd/styles/styles.css";
import { Container } from "../container";

export interface SaturationProps {
  readonly height: number;
  readonly color: ColorTypesMap;
  readonly onChange: (color: ColorTypesMap) => void;
}

const colors = new Colors();

export const Saturation = memo(
  ({ height, color, onChange }: SaturationProps) => {
    const [saturationRef, { width }] =
      useBoundingDOMRect<HTMLDivElement>();

    const position = useMemo(() => {
      const x = (color.hsv.s / 100) * width;
      const y = ((100 - color.hsv.v) / 100) * height;

      return { x, y };
    }, [color.hsv.s, color.hsv.v, width, height]);

    const updateColor = useCallback(
      (x: number, y: number) => {
        const nextColor = colors.convert("hsv", {
          ...color.hsv,
          s: (x / width) * 100,
          v: 100 - (y / height) * 100,
        });

        onChange(nextColor);
      },
      [color.hsv, width, height, onChange],
    );

    const hsl = useMemo(
      () => [color.hsv.h, "100%", "50%"].join(" "),
      [color.hsv.h],
    );
    const rgb = useMemo(
      () => [color.rgb.r, color.rgb.g, color.rgb.b].join(" "),
      [color.rgb.r, color.rgb.g, color.rgb.b],
    );

    return (
      <Container onCoordinateChange={updateColor}>
        <div
          ref={saturationRef}
          style={{ height, backgroundColor: `hsl(${hsl})` }}
          className="rcp-saturation"
        >
          <div
            style={{
              left: position.x,
              top: position.y,
              backgroundColor: `rgb(${rgb})`,
            }}
            className="rcp-saturation-cursor"
          />
        </div>
      </Container>
    );
  },
);
