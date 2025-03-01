import { useState, useEffect } from 'react';

/**
 * Hook to track the focus state of the browser window.
 *
 * @returns {boolean} - True if the window is focused (active), false otherwise.
 */
export function useWindowFocus() {
  // Ensure that we are running in a browser environment.
  const isBrowser =
    typeof window !== 'undefined' && typeof document !== 'undefined';
  const [isWindowFocused, setIsWindowFocused] = useState(
    isBrowser && document.hasFocus ? document.hasFocus() : false
  );

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    // Update function that checks the document's focus state.
    const updateFocus = () => {
      if (document.hasFocus) {
        setIsWindowFocused(document.hasFocus());
      } else {
        // Fallback to true if document.hasFocus is not available.
        setIsWindowFocused(true);
      }
    };

    // Listen to window focus/blur and document visibility change.
    window.addEventListener('focus', updateFocus);
    window.addEventListener('blur', updateFocus);
    document.addEventListener('visibilitychange', updateFocus);

    // Initial check in case the focus state changed before the effect ran.
    updateFocus();

    // Cleanup event listeners on unmount.
    return () => {
      window.removeEventListener('focus', updateFocus);
      window.removeEventListener('blur', updateFocus);
      document.removeEventListener('visibilitychange', updateFocus);
    };
  }, [isBrowser]);

  return isWindowFocused;
}
