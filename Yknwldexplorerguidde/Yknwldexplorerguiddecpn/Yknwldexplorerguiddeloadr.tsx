// loader

import {Animated, Image, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import WebView from 'react-native-webview';

const av = new Animated.Value(0);
av.addListener(() => {
  return;
});

const htmlloader = ` <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          margin: 0;
          padding: 0;
          background: transparent;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .three-body {
          --uib-size: 35px;
          --uib-speed: 0.8s;
          --uib-color: #5D3FD3;
          position: relative;
          height: var(--uib-size);
          width: var(--uib-size);
          animation: spin78236 calc(var(--uib-speed) * 2.5) infinite linear;
        }

        .three-body__dot {
          position: absolute;
          height: 100%;
          width: 30%;
        }

        .three-body__dot:after {
          content: '';
          position: absolute;
          width: 100%;
          padding-bottom: 100%;
          background-color: var(--uib-color);
          border-radius: 50%;
        }

        .three-body__dot:nth-child(1) {
          bottom: 5%;
          left: 0;
          transform: rotate(60deg);
          transform-origin: 50% 85%;
        }

        .three-body__dot:nth-child(1)::after {
          bottom: 0;
          animation: wobble1 var(--uib-speed) infinite ease-in-out;
          animation-delay: calc(var(--uib-speed) * -0.3);
        }

        .three-body__dot:nth-child(2) {
          bottom: 5%;
          right: 0;
          transform: rotate(-60deg);
          transform-origin: 50% 85%;
        }

        .three-body__dot:nth-child(2)::after {
          bottom: 0;
          animation: wobble1 var(--uib-speed) infinite ease-in-out;
          animation-delay: calc(var(--uib-speed) * -0.15);
        }

        .three-body__dot:nth-child(3) {
          bottom: -5%;
          left: 0;
          transform: translateX(116.666%);
        }

        .three-body__dot:nth-child(3)::after {
          top: 0;
          animation: wobble2 var(--uib-speed) infinite ease-in-out;
        }

        @keyframes spin78236 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes wobble1 {
          0%,100% {
            transform: translateY(0%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-66%) scale(0.65);
            opacity: 0.8;
          }
        }

        @keyframes wobble2 {
          0%,100% {
            transform: translateY(0%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(66%) scale(0.65);
            opacity: 0.8;
          }
        }
      </style>
    </head>
    <body>
      <div class="three-body">
        <div class="three-body__dot"></div>
        <div class="three-body__dot"></div>
        <div class="three-body__dot"></div>
      </div>
    </body>
  </html>`;

const Yknwldexplorerguiddeloadr = () => {
  const yknwldexplorerguidNavigation = useNavigation();

  //useEffect(() => {
  //  const yknwldexplorerguidTimer = setTimeout(() => {
  //    yknwldexplorerguidNavigation.navigate('Yknwldexplorerguiddeonb' as never);
  //  }, 6000);
//
  //  return () => {
  //    clearTimeout(yknwldexplorerguidTimer);
  //  };
  //}, [yknwldexplorerguidNavigation]);

  return (
    <View style={styles.yknwldexplorerguidimageBg}>
      <ScrollView
        contentContainerStyle={styles.yknwldexplorerguidscrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../../assets/i/yknwldexployklo.png')}
            style={{
              width: 220,
              height: 220,
              borderRadius: 60,
              borderWidth: 1,
              borderColor: '#C9A84C80',
              top: 20,
            }}
          />
        </View>
        <View style={styles.yknwldexplorerguidbottomWrap}>
          <WebView
            source={{html: htmlloader}}
            scrollEnabled={false}
            originWhitelist={['*']}
            style={{width: 260, height: 50, backgroundColor: 'transparent'}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Yknwldexplorerguiddeloadr;

const styles = StyleSheet.create({
  yknwldexplorerguidimageBg: {
    flex: 1,
    backgroundColor: '#0F0C1D',
  },
  yknwldexplorerguidscrollContent: {
    flexGrow: 1,
  },
  yknwldexplorerguidbottomWrap: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  yknwldexplorerguidbottomText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'DmSans-Regular',
    marginTop: 11,
    textAlign: 'center',
  },
  yknwldexplorerguidcenterFill: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    height: 550,
  },
  yknwldexplorerguidwebviewDock: {
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 20,
  },
  yknwldexplorerguidwebview: {
    backgroundColor: 'transparent',
    width: 260,
    height: 150,
  },
});
