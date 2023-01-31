import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import * as React from 'react';
import { BackHandler } from 'react-native';
import { useAppTheme } from '../../../../state/hooks';
import BookPage from './component/BookPage';

//-- Props
// define props
interface BBSMProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  id?: string;
  onDismiss: () => void;
}

const BookBottomSheetModal = ({
  bottomSheetModalRef,
  id,
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

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={['100%']}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: colors.background }}
      onDismiss={onDismiss}>
      <BottomSheetScrollView>
        <BookPage id={id} />
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default BookBottomSheetModal;
