"use client";
import { memo } from "react";
import { isHidden } from "@flashmd/utils/isHidden";
import { ColorTypesMap } from "@flashmd/types";
import { Alpha } from "../alpha";
import { Fields } from "../fields";
import { Hue } from "../hue";
import { Saturation } from "../saturation";
import "@flashmd/styles/styles.css";
export interface ColorPickerProps {
  readonly height?: number;
  readonly hideAlpha?: boolean;
  readonly hideInput?: (keyof ColorTypesMap)[] | boolean;
  readonly color: ColorTypesMap;
  readonly onChange: (color: ColorTypesMap) => void;
}

export const ColorPicker = memo(
  ({
    height = 200,
    hideAlpha = false,
    hideInput = false,
    color,
    onChange,
  }: ColorPickerProps) => (
    <div className="fmd-root fmd">
      <Saturation height={height} color={color} onChange={onChange} />
      <div className="fmd-body">
        <section className="fmd-section">
          <Hue color={color} onChange={onChange} />
          {!hideAlpha && <Alpha color={color} onChange={onChange} />}
        </section>
        {(!isHidden(hideInput, "hex") ||
          !isHidden(hideInput, "rgb") ||
          !isHidden(hideInput, "hsv")) && (
          <section className="fmd-section">
            <Fields
              hideInput={hideInput}
              color={color}
              onChange={onChange}
            />
          </section>
        )}
      </div>
    </div>
  ),
);
