export const sortOptions = ['number', 'abc'] as const;

export type SortOption = typeof sortOptions[number];

export const sortOptionEnum: { [key in SortOption]: string } = {
  number: '번호',
  abc: '가나다',
};

export const languages = [
  'ko-kr',
  'en-ph',
  'th-th',
  'vi-vn',
  'zh-cn',
] as const;

export type Language = typeof languages[number];

export const languageEnum: { [key in Language]: string; } = {
  'ko-kr': '한국어',
  'en-ph': 'English',
  'th-th': 'ไทย',
  'vi-vn': 'Tiếng việt',
  'zh-cn': '中文',
};

export const isLanguage = (value: string): value is Language => languages.includes(value as Language);

export const levels = [1, 2, 3, 4, 5, 6] as const;

export type Level = typeof levels[number];

export const isLevel = (value: number): value is Level => levels.includes(value as Level);

export const topics = [
  '과학',
  '동물',
  '모험',
  '생활',
  '역사',
  '음식',
  '자연',
] as const;

export type Topic = typeof topics[number];

export const isTopic = (value: string): value is Topic => topics.includes(value as Topic);

export type Story = {
  id: number;
  level: Level;
  number: number;
  language: Language;
  title: string;
  topics: Set<Topic>;
};
