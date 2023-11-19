import { useEffect, useState } from "react";
import { ColorTypesMap } from "@flashmd/types";
import Colors from "@flashmd/lib/colors";

const colors = new Colors();
export function useColor(initialColor: string) {
  const [c, setC] = useState<ColorTypesMap>(
    colors.convert("hex", initialColor),
  );
  const [color, setColor] = useState(
    colors.convert("hex", initialColor),
  );

  useEffect(() => {
    setColor(colors.convert("hex", initialColor));
  }, [initialColor]);

  return [color, setColor];
}
