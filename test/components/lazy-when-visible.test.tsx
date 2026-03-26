import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import LazyWhenVisible from '@/components/lazy-when-visible';

describe('LazyWhenVisible', () => {
  it('renders the fallback until the container intersects', () => {
    let observerCallback:
      | ((entries: IntersectionObserverEntry[]) => void)
      | undefined;

    const observe = vi.fn();
    const disconnect = vi.fn();

    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn((callback: (entries: IntersectionObserverEntry[]) => void) => {
        observerCallback = callback;
        return {
          observe,
          disconnect,
          unobserve: vi.fn(),
          root: null,
          rootMargin: '',
          thresholds: [],
          takeRecords: vi.fn(),
        };
      })
    );

    render(
      <LazyWhenVisible fallback={<div>Loading footer widget…</div>}>
        <div>Visible widget</div>
      </LazyWhenVisible>
    );

    expect(screen.getByText('Loading footer widget…')).toBeInTheDocument();
    expect(screen.queryByText('Visible widget')).not.toBeInTheDocument();
    expect(observe).toHaveBeenCalledTimes(1);

    act(() => {
      observerCallback?.([{ isIntersecting: true } as IntersectionObserverEntry]);
    });

    expect(screen.getByText('Visible widget')).toBeInTheDocument();
    expect(disconnect).toHaveBeenCalled();

    vi.unstubAllGlobals();
  });
});
