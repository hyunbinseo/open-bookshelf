import {
  sortOptions,
  sortOptionEnum,
  languages,
  languageEnum,
  levels,
  topics,
} from '$lib/stories/types';

export type FilterProps = {
  allowValueReset?: boolean;
  title: string;
  name: string;
  options: readonly (string | number)[];
  optionsEnum?: { [option: string | number]: string; };
  optionSuffix?: string;
};

export const sortProps: FilterProps = {
  title: '정렬',
  name: 'sortOption',
  options: sortOptions,
  optionsEnum: sortOptionEnum,
  optionSuffix: ' 순',
};

export const languageProps: FilterProps = {
  title: '언어',
  name: 'language',
  options: languages,
  optionsEnum: languageEnum,
};

export const topicProps: FilterProps = {
  allowValueReset: true,
  title: '주제',
  name: 'topic',
  options: topics,
};

export const levelProps: FilterProps = {
  allowValueReset: true,
  title: '단계',
  name: 'level',
  options: levels,
  optionSuffix: '단계',
};
