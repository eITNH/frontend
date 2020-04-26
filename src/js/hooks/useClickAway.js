import { useEffect } from 'react';

const useClickAway = (ref, callback) => {
  useEffect(() => {
    const handleDocumentClick = (event) => {
      const node = ref.current;
      const doc = (node && node.ownerDocument) || document;
      if (
        doc.documentElement &&
        doc.documentElement.contains(event.target) &&
        !node.contains(event.target)
      ) {
        callback(event);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [callback, ref]);
};

export default useClickAway;
