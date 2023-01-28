import { ImageLinks } from './imageLinks';

import { IndustryIdentifier } from './industryIdentifier';
export interface VolumeInfo {
  title?: string;
  subtitle?: string;
  authors?: string[];
  //publisher?: string;
  //publishedDate?: Date | null;
  //rawPublishedDate?: string;
  description?: string;
  //industryIdentifiers?: IndustryIdentifier[];
  pageCount?: number;
  categories?: string[];
  //averageRating?: number;
  //ratingCount?: number;
  //maturityRating?: string;
  //contentVersion?: string;
  imageLinks?: ImageLinks;
  language?: string;
  //previewLink?: string;
  //infoLink?: string;
  //canonicalVolumeLink?: string;
}
