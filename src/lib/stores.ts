import { writable, derived } from 'svelte/store';

import stories from '$lib/stories/data';

import type { SortOption, Language, Level, Topic } from '$lib/stories/types';

export const isLoaded = writable<boolean>(false);

export const selSort = writable<SortOption>('number');
export const selLanguage = writable<Language>('ko-kr');
export const selLevel = writable<Level | undefined>();
export const selTopic = writable<Topic | undefined>();

export const sidebarToggle = writable<HTMLElement>();
export const sidebarExpanded = writable<boolean>(false);

export const reqStories = derived(
  [isLoaded, selSort, selLanguage, selLevel, selTopic],
  ([$isLoaded, $selSort, $selLanguage, $selLevel, $selTopic]) => {
    if (!$isLoaded) return [];

    const filtered = stories
      .filter(({ language }) => language === $selLanguage)
      .filter(({ level }) => ($selLevel ? level === $selLevel : true))
      .filter(({ topics }) => ($selTopic ? topics.has($selTopic) : true));

    // Data is currently sorted by story number
    if ($selSort === 'number') return filtered;

    if ($selSort === 'abc') return filtered
      .sort(({ title: titleA }, { title: titleB }) => {
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });

    return filtered;
  },
);
