import BookCard, { BookCardProps } from './BookCard';
import * as React from 'react';
import { useGetBookByIsbnQuery } from '../../api/googleBooksApi';
import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

type BestSellerCardProps = {
    isbn: string;
} & BookCardProps;
function BestSellerCard(props: BestSellerCardProps) {
    const { isbn, ...rest } = props;

    // Hooks
    const { data: book, isSuccess } = useGetBookByIsbnQuery(isbn);
    const navigation = useNavigation<any>();

    // Callbacks
    const handleOnPress = useCallback(() => navigation.push('Book', { book }), [book]);

    return <BookCard {...rest} type='cover' onPress={handleOnPress} disabled={!isSuccess} />;
}

export default BestSellerCard;
