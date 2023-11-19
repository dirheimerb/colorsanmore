"use client";
import React, { memo, useCallback, useEffect, useState } from "react";
import Colors from "@flashmd/lib/colors";
import { ColorTypesMap } from "@flashmd/types";
import { formatHsv, formatRgb } from "@flashmd/utils/format";
import { isHidden } from "@flashmd/utils/isHidden";
import "@flashmd/styles/styles.css";
const colors = new Colors();

export interface FieldsProps {
  readonly hideInput: (keyof ColorTypesMap)[] | boolean;
  readonly color: ColorTypesMap;
  readonly onChange: (color: ColorTypesMap) => void;
}

export const Fields = memo(
  ({ hideInput, color, onChange }: FieldsProps) => {
    const [fields, setFields] = useState({
      hex: {
        value: color.hex,
        inputted: false,
      },
      rgb: {
        value: formatRgb(color.rgba),
        inputted: false,
      },
      hsv: {
        value: formatHsv(color.hsva),
        inputted: false,
      },
    });

    useEffect(() => {
      if (!fields.hex.inputted) {
        setFields((fields) => ({
          ...fields,
          hex: { ...fields.hex, value: color.hex },
        }));
      }
    }, [fields.hex.inputted, color.hex]);

    useEffect(() => {
      if (!fields.rgb.inputted) {
        setFields((fields) => ({
          ...fields,
          rgb: { ...fields.rgb, value: formatRgb(color.rgba) },
        }));
      }
    }, [fields.rgb.inputted, color.rgb]);

    useEffect(() => {
      if (!fields.hsv.inputted) {
        setFields((fields) => ({
          ...fields,
          hsv: { ...fields.hsv, value: formatHsv(color.hsva) },
        }));
      }
    }, [fields.hsv.inputted, color.hsv]);

    const onInputChange = useCallback(
      <T extends keyof typeof fields>(field: T) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
          const { value } = event.target;

          setFields((fields) => ({
            ...fields,
            [field]: { ...fields[field], value },
          }));

          if (field === "hsv")
            onChange(colors.convert("hsv", colors.toHSV(value)));
          else if (field === "rgb")
            onChange(colors.convert("rgb", colors.toRGB(value)));
          else onChange(colors.convert("hex", value));
        },
      [onChange],
    );

    const onInputFocus = useCallback(
      <T extends keyof typeof fields>(field: T) =>
        () => {
          setFields((fields) => ({
            ...fields,
            [field]: { ...fields[field], inputted: true },
          }));
        },
      [],
    );

    const onInputBlur = useCallback(
      <T extends keyof typeof fields>(field: T) =>
        () => {
          setFields((fields) => ({
            ...fields,
            [field]: { ...fields[field], inputted: false },
          }));
        },
      [],
    );

    return (
      <div className="fmd-fields">
        {!isHidden(hideInput, "hex") && (
          <div className="fmd-fields-floor">
            <div className="fmd-field">
              <input
                id="hex"
                className="fmd-field-input"
                value={fields.hex.value}
                onChange={onInputChange("hex")}
                onFocus={onInputFocus("hex")}
                onBlur={onInputBlur("hex")}
              />
              <label htmlFor="hex" className="fmd-field-label">
                HEX
              </label>
            </div>
          </div>
        )}
        {(!isHidden(hideInput, "rgb") ||
          !isHidden(hideInput, "hsv")) && (
          <div className="fmd-fields-floor">
            {!isHidden(hideInput, "rgb") && (
              <div className="fmd-field">
                <input
                  id="rgb"
                  className="fmd-field-input"
                  value={fields.rgb.value}
                  onChange={onInputChange("rgb")}
                  onFocus={onInputFocus("rgb")}
                  onBlur={onInputBlur("rgb")}
                />
                <label htmlFor="rgb" className="fmd-field-label">
                  RGB
                </label>
              </div>
            )}
            {!isHidden(hideInput, "hsv") && (
              <div className="fmd-field">
                <input
                  id="hsv"
                  className="fmd-field-input"
                  value={fields.hsv.value}
                  onChange={onInputChange("hsv")}
                  onFocus={onInputFocus("hsv")}
                  onBlur={onInputBlur("hsv")}
                />
                <label htmlFor="hsv" className="fmd-field-label">
                  HSV
                </label>
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);
