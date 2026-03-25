import recommendsData from '@/lib/data/recommends.json';
import type { RecommendsProps } from '@/lib/utilities/types';

export function getRecommends(): RecommendsProps[] {
  return recommendsData as RecommendsProps[];
}

export function groupRecommends(items: RecommendsProps[]) {
  return items.reduce(
    (groups, item) => {
      const group = groups[item.category] || [];
      group.push(item);
      groups[item.category] = group;
      return groups;
    },
    {} as Record<string, RecommendsProps[]>
  );
}
