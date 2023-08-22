#!/bin/bash
CWD=$(pwd)
watchman watch-del $CWD || true
watchman watch-project $CWD || true

npx react-native start --reset-cache