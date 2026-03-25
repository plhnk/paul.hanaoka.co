import { describe, expect, it } from 'vitest';
import { getAllSidebarHotkeys } from '@/components/sidebar-config';

describe('sidebar hotkeys', () => {
  it('stays unique across navigation, utility, and theme controls', () => {
    const hotkeys = getAllSidebarHotkeys();
    expect(new Set(hotkeys).size).toBe(hotkeys.length);
  });
});
