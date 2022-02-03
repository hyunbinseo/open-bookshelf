import {
  sortOptions,
  sortOptionEnum,
  languages,
  languageEnum,
  levels,
  topics,
} from '$lib/stories/types';

export type Option = string | number;

export type FilterProps = {
  allowValueReset?: boolean;
  title: string;
  name: string;
  options: readonly (Option)[];
  optionsEnum?: { [option: Option]: string; };
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
  title: '수준',
  name: 'level',
  options: levels,
  optionSuffix: '단계',
};

export const generateOptionText = (option: Option, { optionsEnum, optionSuffix }: FilterProps): string => (!option ? '모두' : `${optionsEnum?.[option] || option}${optionSuffix || ''}`);
