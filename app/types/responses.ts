import { Book } from './entities';

export type SearchVolumesResponse = {
    kind: string;
    totalItems: number;
    items: Book[];
};

export type BestSellersResponse = {
    status: string;
    copyright: string;
    num_results: number;
    last_modified: string;
    results: BestSellerResultsResponse;
};

export type BestSellerResultsResponse = {
    list_name: string;
    list_name_encoded: string;
    bestsellers_date: string;
    published_date: string;
    published_date_description: string;
    next_published_date: string;
    previous_published_date: string;
    display_name: string;
    normal_list_ends_at: number;
    updated: string;
    books: BestSellerBookResponse[];
    corrections: any[];
};

export type BestSellerBookResponse = {
    rank: number;
    rank_last_week: number;
    weeks_on_list: number;
    asterisk: number;
    dagger: number;
    primary_isbn10: string;
    primary_isbn13: string;
    publisher: string;
    description: string;
    price: string;
    title: string;
    author: string;
    contributor: string;
    contributor_note: string;
    book_image: string;
    book_image_width: number;
    book_image_height: number;
    amazon_product_url: string;
    age_group: string;
    book_review_link: string;
    first_chapter_link: string;
    sunday_review_link: string;
    article_chapter_link: string;
    isbns: IsbnResponse[];
    buy_links: BuyLinkResponse[];
    book_uri: string;
};

export type IsbnResponse = {
    isbn10: string;
    isbn13: string;
};

export type BuyLinkResponse = {
    name: string;
    url: string;
};
