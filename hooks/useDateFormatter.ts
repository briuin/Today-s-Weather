import { useCallback } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const useDateFormatter = () => {
  const formatDate = useCallback((date: string | Date, format: string = 'YYYY-MM-DD'): string => {
    return dayjs(date).format(format);
  }, []);

  const fromNow = useCallback((date: string | Date): string => {
    return dayjs(date).fromNow();
  }, []);

  return { formatDate, fromNow };
};

export default useDateFormatter;