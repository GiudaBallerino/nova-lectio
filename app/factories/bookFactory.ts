import { BestSeller, Book, BuyLink, ImageLinks, Isbn } from '../types/entities';
import {
    BestSellerBookResponse,
    BestSellersResponse,
    BuyLinkResponse,
    IsbnResponse,
    SearchVolumesResponse
} from '../types/responses';
import { getBookByIsbn } from '../api/googleBooksApi';

class BookFactory {
    static replaceHttpWithHttps(book: Book): Book {
        return {
            id: book.id,
            volumeInfo: {
                ...book.volumeInfo,
                imageLinks: Object.entries(book.volumeInfo?.imageLinks ?? {}).reduce(
                    (acc, [key, value]) => {
                        const _ = key as keyof ImageLinks;
                        acc[_] = value.replace('http://', 'https://');
                        return acc;
                    },
                    {} as ImageLinks
                )
            }
        };
    }
    static fromSearchVolumesResponseToBooks(response: SearchVolumesResponse): Book[] {
        return response.items?.map(item => this.replaceHttpWithHttps(item));
    }

    static fromSearchVolumesResponseToSingleBook(response: SearchVolumesResponse): Book {
        return this.replaceHttpWithHttps(response.items[0]);
    }

    static fromIsbnsResponseToIsbns(response: IsbnResponse): Isbn {
        return response;
    }
    static fromBuyLinkResponseToBuyLink(response: BuyLinkResponse): BuyLink {
        return response;
    }
    static fromBestSellersBookResponseToBestSellers(response: BestSellerBookResponse): BestSeller {
        return {
            rank: response.rank,
            rankLastWeek: response.rank_last_week,
            weeksOnList: response.weeks_on_list,
            asterisk: response.asterisk,
            dagger: response.dagger,
            primaryIsbn10: response.primary_isbn10,
            primaryIsbn13: response.primary_isbn13,
            publisher: response.publisher,
            description: response.description,
            price: response.price,
            title: response.title,
            author: response.author,
            contributor: response.contributor,
            contributorNote: response.contributor_note,
            bookImage: response.book_image,
            bookImageWidth: response.book_image_width,
            bookImageHeight: response.book_image_height,
            amazonProductUrl: response.amazon_product_url,
            ageGroup: response.age_group,
            bookReviewLink: response.book_review_link,
            firstChapterLink: response.first_chapter_link,
            sundayReviewLink: response.sunday_review_link,
            articleChapterLink: response.article_chapter_link,
            isbns: response.isbns.map(i => this.fromIsbnsResponseToIsbns(i)),
            buyLinks: response.buy_links.map(b => this.fromBuyLinkResponseToBuyLink(b)),
            bookUri: response.book_uri
        };
    }

    static fromBestSellersResponseToMultipleBestSellers(
        response: BestSellersResponse
    ): BestSeller[] {
        return response.results.books.map(b => this.fromBestSellersBookResponseToBestSellers(b));
    }

    static fromBestSellerToIsbnList(bestSeller: BestSeller): string[] {
        let isbn: string[] = [];
        bestSeller.isbns.forEach(i => {
            if (i.isbn10) isbn.push(i.isbn13);
            if (i.isbn10) isbn.push(i.isbn10);
        });
        return isbn;
    }

    static async getBestBook(isbns: string[], best: Book | undefined): Promise<Book | undefined> {
        const isbn = isbns.shift();
        if (isbn === undefined) return best;

        const result = await getBookByIsbn(isbn);
        const book = this.fromSearchVolumesResponseToSingleBook(result);

        if (!best || (book.volumeInfo.pageCount !== 0 && book.volumeInfo.pageCount !== undefined)) {
            if (
                book.volumeInfo.imageLinks?.thumbnail !== '' &&
                book.volumeInfo.description !== '' &&
                book.volumeInfo.averageRating !== undefined
            ) {
                return book;
            } else {
                return this.getBestBook(isbns, best || book);
            }
        }

        return this.getBestBook(isbns, book);
    }
    static fromBestSellerToBook = async (bestSeller: BestSeller): Promise<Book | undefined> =>
        await this.getBestBook(this.fromBestSellerToIsbnList(bestSeller), undefined);

    static async fromBestSellersToBooks(bestSellers: BestSeller[]): Promise<Book[]> {
        const results: Promise<Book | undefined>[] = bestSellers.map(bestSeller =>
            this.fromBestSellerToBook(bestSeller)
        );

        const books: (Book | undefined)[] = await Promise.all(results);
        return books.filter((book): book is Book => book !== undefined);
    }
}

export default BookFactory;
