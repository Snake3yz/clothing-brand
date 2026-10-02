import { useEffect } from 'react';

/**
 * Custom hook to update document title
 * @param {string} title 
 */
export function useDocumentTitle(title) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
}

export default useDocumentTitle;
