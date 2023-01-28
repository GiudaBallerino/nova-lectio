import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Divider, IconButton, Menu, Text } from 'react-native-paper';
import { BookData } from '../../../../../utils/models/bookData';

//-- Props
// define props
interface PageSectionProps {
  bookData: BookData;
  onUpdate: (data: number) => void;
}

const PageSection = (props: PageSectionProps) => {
  //-- Hooks
  // state for minus menu
  const [minusVisible, setMinusVisible] = React.useState(false);
  // state for plus menu
  const [plusVisible, setPlusVisible] = React.useState(false);

  //-- Methods
  /**
   * Open minus menu
   * @returns {void}
   */
  const openPlusMenu = () => setPlusVisible(true);

  /**
   * Close minus menu
   * @returns {void}
   */
  const closePlusMenu = () => setPlusVisible(false);

  /**
   * Open plus menu
   * @returns {void}
   */
  const openMinusMenu = () => setMinusVisible(true);

  /**
   * Close plus menu
   * @returns {void}
   */
  const closeMinusMenu = () => setMinusVisible(false);

  //-- Render
  return (
    <View style={styles.section}>
      <View style={styles.pageLine}>
        <Menu
          visible={minusVisible}
          onDismiss={closeMinusMenu}
          anchor={
            <IconButton
              icon={'minus'}
              mode="outlined"
              size={20}
              onLongPress={openMinusMenu}
              onPress={() => {
                props.onUpdate(-1);
              }}
            />
          }>
          <Menu.Item
            onPress={() => {
              props.onUpdate(-10);
            }}
            title="-10"
          />
          <Menu.Item
            onPress={() => {
              props.onUpdate(-50);
            }}
            title="-50"
          />
          <Menu.Item
            onPress={() => {
              props.onUpdate(-100);
            }}
            title="-100"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              props.onUpdate(Number.MIN_SAFE_INTEGER);
            }}
            title="Segna come non letto"
          />
        </Menu>
        <Text variant="displayMedium" style={styles.pageCount}>
          {props.bookData.currentPage}{' '}
          <Text variant="bodyLarge">
            /{props.bookData.book.volumeInfo?.pageCount ?? 0}
          </Text>
        </Text>
        <Menu
          visible={plusVisible}
          onDismiss={closePlusMenu}
          anchor={
            <IconButton
              icon={'plus'}
              mode="outlined"
              size={20}
              onLongPress={openPlusMenu}
              onPress={() => {
                props.onUpdate(1);
              }}
            />
          }>
          <Menu.Item
            onPress={() => {
              props.onUpdate(10);
            }}
            title="+10"
          />
          <Menu.Item
            onPress={() => {
              props.onUpdate(50);
            }}
            title="+50"
          />
          <Menu.Item
            onPress={() => {
              props.onUpdate(100);
            }}
            title="+100"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              props.onUpdate(Number.MAX_SAFE_INTEGER);
            }}
            title="Segna come letto"
          />
        </Menu>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  pageLine: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 15,
  },
  pageCount: {
    lineHeight: 40 * 0.4,
    paddingTop: 40,
  },
});

export default PageSection;
