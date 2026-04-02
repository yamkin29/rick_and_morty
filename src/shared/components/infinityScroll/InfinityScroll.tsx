import React, { useEffect, useRef } from 'react';

interface IInfinityScrollProps {
  loader: React.ReactNode;
  isLoadingMore: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export const InfinityScroll = ({ loader, isLoadingMore, hasMore, onLoadMore }: IInfinityScrollProps) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current || !hasMore || isLoadingMore) {
      return;
    }

    const observer = new IntersectionObserver((entries, observerInstance) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        observerInstance.disconnect();
        onLoadMore();
      }
    });

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isLoadingMore, hasMore, onLoadMore]);

  return <div ref={sentinelRef}>{isLoadingMore ? loader : null}</div>;
};
