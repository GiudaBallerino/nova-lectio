import { SaleInfo } from './saleInfo';
import { VolumeInfo } from './volumeInfo';

export interface Book {
  id: string;
  //etags?: string;
  //selfLink?: string;
  volumeInfo?: VolumeInfo;
  //saleInfo?: SaleInfo;
}

export function instanceofBook(object: any): object is Book {
  return 'id' in object;
}
