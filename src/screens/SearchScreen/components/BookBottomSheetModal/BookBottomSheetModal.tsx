import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import * as React from 'react';
import { BackHandler } from 'react-native';
import { useAppTheme } from '../../../../state/hooks';
import { BookData } from '../../../../utils/models/bookData';
import BookPage from './component/BookPage';

// -- Props
// define the props interface
interface BBSMProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  bookData: BookData;
  onDismiss: () => void;
}

const BookBottomSheetModal = ({
  bottomSheetModalRef,
  bookData,
  onDismiss,
}: BBSMProps) => {
  // -- Hooks
  // Get theme colors
  const { colors } = useAppTheme();

  // Handles back button press
  React.useEffect(() => {
    const backAction = () => {
      bottomSheetModalRef.current?.close();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [bottomSheetModalRef]);

  //-- Render
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={['100%']}
      onDismiss={onDismiss}
      backgroundStyle={{ backgroundColor: colors.background }}
      enablePanDownToClose={true}>
      <BottomSheetScrollView>
        <BookPage bookData={bookData} />
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default BookBottomSheetModal;
