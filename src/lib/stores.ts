import { hideBodyOverflow } from '$lib/browser';
import stories from '$lib/stories/data';
import type { Language, Level, SortOption, Story, Topic } from '$lib/stories/types';
import { topicEnum } from '$lib/stories/types';
import focusLock from 'dom-focus-lock';
import { tick } from 'svelte';
import { derived, writable } from 'svelte/store';

export const isLoaded = writable<boolean>(false);

export const selSort = writable<SortOption>('random');
export const selLanguage = writable<Language>('ko-kr');
export const selLevel = writable<Level | undefined>();
export const selTopic = writable<Topic | undefined>();

export const sidebarEl = writable<HTMLElement>();
export const sidebarToggleEl = writable<HTMLElement>();
export const sidebarState = (() => {
	const { subscribe, set } = writable<boolean>(false);
	return {
		subscribe,
		expand: async () => {
			hideBodyOverflow(true);
			set(true);
			await tick();
			sidebarEl.subscribe((el) => {
				if (el) focusLock.on(el);
			});
		},
		collapse: () => {
			hideBodyOverflow(false);
			sidebarEl.subscribe((el) => {
				if (el) focusLock.off(el);
			});
			set(false);
			sidebarToggleEl.subscribe((el) => {
				el?.focus();
			});
		}
	};
})();

export const downloadModalEl = writable<HTMLElement>();
export const downloadModalToggleEl = writable<HTMLElement>();
export const downloadModalState = (() => {
	const { subscribe, set } = writable<boolean>(false);
	return {
		subscribe,
		show: async () => {
			hideBodyOverflow(true);
			set(true);
			await tick();
			downloadModalEl.subscribe((el) => {
				if (el) focusLock.on(el);
			});
		},
		hide: () => {
			hideBodyOverflow(false);
			set(false);
			downloadModalEl.subscribe((el) => {
				if (el) focusLock.off(el);
			});
			downloadModalToggleEl.subscribe((el) => {
				el?.focus();
			});
		}
	};
})();

export const reqStories = derived(
	[isLoaded, selSort, selLanguage, selLevel, selTopic],
	([$isLoaded, $selSort, $selLanguage, $selLevel, $selTopic]): Story[] => {
		if (!$isLoaded) return [];

		const filtered = stories
			.filter(({ language }) => language === $selLanguage)
			.filter(({ level }) => ($selLevel ? level === $selLevel : true))
			.filter(({ topics }) => ($selTopic ? topics.has(topicEnum[$selTopic]) : true));

		// Data is currently sorted by story number
		if ($selSort === 'number') return filtered;

		if ($selSort === 'abc')
			return filtered.sort(({ title: titleA }, { title: titleB }) => {
				if (titleA < titleB) return -1;
				if (titleA > titleB) return 1;
				return 0;
			});

		if ($selSort === 'random')
			return filtered
				.map((value) => ({ value, sort: Math.random() }))
				.sort((a, b) => a.sort - b.sort)
				.map(({ value }) => value);

		return filtered;
	}
);

export const urlSearchParams = derived(
	[selLanguage, selLevel, selTopic],
	([$selLanguage, $selLevel, $selTopic]) => {
		const params = new URLSearchParams();
		if ($selLanguage) params.append('language', $selLanguage);
		if ($selTopic) params.append('topic', $selTopic);
		if ($selLevel) params.append('level', $selLevel.toString());
		return params.toString();
	}
);
