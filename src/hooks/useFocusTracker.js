import { useState, useEffect } from 'react';

/**
 * Hook to track the focus state of a specific element.
 *
 * @param {Object} ref - React ref object pointing to a DOM element.
 * @param {Object} options - Optional configuration.
 * @param {boolean} options.bubble - If true, use bubbling events ('focusin'/'focusout'). Defaults to false.
 * @param {boolean} options.capture - Whether to use event capturing. Defaults to false.
 *
 * @returns {boolean} - True if the element is focused, false otherwise.
 */
export function useFocusTracker(ref, options = {}) {
  const { bubble = false, capture = false } = options;
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const element = ref?.current;
    if (!element || typeof element.addEventListener !== 'function') {
      console.warn(
        'useFocusTracker: Provided ref is not attached to a valid DOM element'
      );
      return;
    }

    // Choose the appropriate events. "focusin"/"focusout" bubble.
    const focusEvent = bubble ? 'focusin' : 'focus';
    const blurEvent = bubble ? 'focusout' : 'blur';

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    // Attach event listeners.
    element.addEventListener(focusEvent, handleFocus, capture);
    element.addEventListener(blurEvent, handleBlur, capture);

    // If the element is already focused when the hook mounts.
    if (document.activeElement === element) {
      setIsFocused(true);
    }

    // Cleanup listeners on unmount or if dependencies change.
    return () => {
      element.removeEventListener(focusEvent, handleFocus, capture);
      element.removeEventListener(blurEvent, handleBlur, capture);
    };
  }, [ref, bubble, capture]);

  return isFocused;
}
