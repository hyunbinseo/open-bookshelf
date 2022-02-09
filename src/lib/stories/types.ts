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
  'adventure',
  'animal',
  'food',
  'history',
  'life',
  'nature',
  'science',
] as const;

export type Topic = typeof topics[number];

export const topicEnum: { [key in Topic]: string; } = {
  adventure: '모험',
  animal: '동물',
  food: '음식',
  history: '역사',
  life: '생활',
  nature: '자연',
  science: '과학',
};

export type TopicKR = typeof topicEnum[Topic];

export const isTopic = (value: string): value is Topic => topics.includes(value as Topic);

export type Story = {
  id: number;
  level: Level;
  number: number;
  language: Language;
  title: string;
  topics: Set<TopicKR>;
};
