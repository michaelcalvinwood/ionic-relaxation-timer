#!/bin/bash

clear
rm -rf ios
ionic capacitor add ios
ionic capacitor sync ios
cd ios/App
pod install
cd ../..
npx cap open ios

