import { getNavItems } from './navItems';

describe('Sidebar hotkeys', () => {
  it('should have unique hotkeys across all sections', () => {
    const hotkeys = getNavItems(false); 
    const hotkeyMap = {};

    hotkeys.forEach((item) => {
      if (hotkeyMap[item.hotkey]) {
        hotkeyMap[item.hotkey].push(item.label);
      } else {
        hotkeyMap[item.hotkey] = [item.label];
      }
    });

    const duplicateHotkeys = Object.keys(hotkeyMap).filter(
      (key) => hotkeyMap[key].length > 1
    );

    expect(duplicateHotkeys.length).toBe(0);
  });
});
