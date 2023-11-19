import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface Size {
  /**
   * The width of the element.
   * @type {number} width
   */
  readonly width: number;
  /**
   * The height of the element.
   * @type {number} height
   */
  readonly height: number;
}
/**
 * The position of an element.
 */
interface Position {
  /**
   * The left position of the element.
   * @type {number} left
   */
  readonly left: number;
  /**
   * The right position of the element.
   * @type {number} right
   */
  readonly right: number;
  /**
   * The top position of the element.
   * @type {number} top
   */
  readonly top: number;
  /**
   * The bottom position of the element.
   * @type {number} bottom
   */
  readonly bottom: number;
}
/**
 * Custom React hook to obtain the size and position of an HTML element.
 * It updates the size on window resize events.
 *
 * @return A tuple containing:
 *         - a ref object to attach to an element,
 *         - the size of the element,
 *         - a function to get the position of the element.
 */
export function useBoundingDOMRect<T extends HTMLElement>(): [
  React.RefObject<T>,
  Size,
  () => Position,
] {
  const ref = useRef<T>(null);

  const [resizeCounter, setResizeCounter] = useState(0);

  const onResize = useCallback(
    () => setResizeCounter((resizeCounter) => resizeCounter + 1),
    [],
  );

  useLayoutEffect((): (() => void) => {
    window.addEventListener("resize", onResize, false);

    const observer = new ResizeObserver(onResize);

    if (ref.current) observer.observe(ref.current);

    return (): void => {
      window.removeEventListener("resize", onResize, false);
      observer.disconnect();
    };
  }, [onResize]);

  const size = useMemo((): Size => {
    const { width = 1, height = 1 } =
      ref.current?.getBoundingClientRect() ?? ({} as DOMRect);
    return { width, height };
  }, [resizeCounter]);

  /**
   * Get the position of the element.
   * @return {Position} The position of the element.
   * @example
   * import { useBoundingDOMRect } from "@flash/colorpicker";
   *
   * const [ref, size, getPosition] = useBoundingDOMRect();
   */
  const getPosition = useCallback((): Position => {
    const {
      left = 1,
      right = 1,
      top = 1,
      bottom = 1,
    } = ref.current?.getBoundingClientRect() ?? ({} as DOMRect);

    return { left, right, top, bottom };
  }, []);

  return [ref, size, getPosition];
}
