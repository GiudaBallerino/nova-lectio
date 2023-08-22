import EE from 'eventemitter3';
import colors from './theme.json';
import Config from 'react-native-config';
export const EventEmitter = new EE();
export const Theme = colors;
export const NYT_API_KEY = Config.NYT_API_KEY;
export const EMPTY_COVER = require('../assets/images/book-placeholder.webp');
