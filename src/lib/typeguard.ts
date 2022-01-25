import { languages, levels, topics } from '$lib/data';

import type { Language, Level, Topic } from '$lib/data';

export const isLanguage = (value: string): value is Language => languages.includes(value as Language);

export const isLevel = (value: number): value is Level => levels.includes(value as Level);

export const isTopic = (value: string): value is Topic => topics.includes(value as Topic);

