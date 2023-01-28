export type QueryType =
  | 'intitle'
  | 'inauthor'
  | 'inpublisher'
  | 'subject'
  | 'isbn'
  | 'lccn'
  | 'oclc';
export type OrderBy = 'newest' | 'relevance';

export type PrintType = 'all' | 'books' | 'magazines';
