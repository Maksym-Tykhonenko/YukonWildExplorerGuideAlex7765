import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React, {useRef} from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
  type ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Yknwldexplorerguiddeexpl from './Yknwldexplorerguidde/Yknwldexplorerguiddescrns/Yknwldexplorerguiddeexpl';

import Yknwldexplorerguiddesvd from './Yknwldexplorerguidde/Yknwldexplorerguiddescrns/Yknwldexplorerguiddesvd';
import Yknwldexplorerguiddemap from './Yknwldexplorerguidde/Yknwldexplorerguiddescrns/Yknwldexplorerguiddemap';
import Yknwldexplorerguiddefcts from './Yknwldexplorerguidde/Yknwldexplorerguiddescrns/Yknwldexplorerguiddefcts';
import Yknwldexplorerguiddequzz from './Yknwldexplorerguidde/Yknwldexplorerguiddescrns/Yknwldexplorerguiddequzz';
import Yknwldexplorerguiddegall from './Yknwldexplorerguidde/Yknwldexplorerguiddescrns/Yknwldexplorerguiddegall';

const Tab = createBottomTabNavigator();

const CozyrabtteacornetabAnimatedButton = (props: Record<string, unknown>) => {
  const {children, style, onPress, onLongPress, ...rest} = props;
  const yknwldexplorerguidScale = useRef(new Animated.Value(1)).current;

  const yknwldexplorerguidHandlePressIn = () => {
    Animated.spring(yknwldexplorerguidScale, {
      toValue: 0.88,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const yknwldexplorerguidHandlePressOut = () => {
    Animated.spring(yknwldexplorerguidScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 8,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress as () => void}
      onLongPress={onLongPress as (() => void) | undefined}
      onPressIn={yknwldexplorerguidHandlePressIn}
      onPressOut={yknwldexplorerguidHandlePressOut}
      style={[style as ViewStyle, styles.yknwldexplorerguidButton]}
      {...rest}>
      <Animated.View
        style={[
          styles.yknwldexplorerguidButtonInner,
          {transform: [{scale: yknwldexplorerguidScale}]},
        ]}>
        {children as React.ReactNode}
      </Animated.View>
    </Pressable>
  );
};

const CozyrabtteacornetabIcon = ({
  focused,
  source,
  label,
}: {
  focused: boolean;
  source: ImageSourcePropType;
  label: string;
}) => {
  return (
    <View style={styles.yknwldexplorerguidIconWrap}>
      <View style={styles.yknwldexplorerguidIconImageWrap}>
        {focused ? (
          <Image
            source={require('./assets/i/yknwldexploindi.png')}
            style={{position: 'absolute', top: -20, right: -2}}
          />
        ) : null}

        <Image
          source={source}
          tintColor={focused ? undefined : '#FFFFFF59'}
          style={{width: 22, height: 22}}
        />
        {focused ? (
          <Image
            source={require('./assets/i/yknwldexplorergsel.png')}
            style={[
              styles.yknwldexplorerguidIconSel,
              styles.yknwldexplorerguidIconSelFocused,
            ]}
          />
        ) : null}
      </View>
      <Text
        adjustsFontSizeToFit
        minimumFontScale={0.7}
        numberOfLines={1}
        style={[
          styles.yknwldexplorerguidLabel,
          focused
            ? styles.yknwldexplorerguidLabelFocused
            : styles.yknwldexplorerguidLabelIdle,
        ]}>
        {label}
      </Text>
    </View>
  );
};

const yknwldexplorerguidBarBackground = () => (
  <LinearGradient
    pointerEvents="none"
    colors={['#0F0C1DF7', '#0F0C1DF7']}
    style={StyleSheet.absoluteFill}
  />
);

const yknwldexplorerguidIconPlaces = ({focused}: {focused: boolean}) => (
  <CozyrabtteacornetabIcon
    focused={focused}
    label="Explore"
    source={require('./assets/i/yknwldexplorerguidt1.png')}
  />
);

const yknwldexplorerguidIconSaved = ({focused}: {focused: boolean}) => (
  <CozyrabtteacornetabIcon
    focused={focused}
    label="Saved"
    source={require('./assets/i/yknwldexplorerguidt2.png')}
  />
);

const yknwldexplorerguidIconMap = ({focused}: {focused: boolean}) => (
  <CozyrabtteacornetabIcon
    focused={focused}
    label="Map"
    source={require('./assets/i/yknwldexplorerguidt3.png')}
  />
);

const yknwldexplorerguidIconBlog = ({focused}: {focused: boolean}) => (
  <CozyrabtteacornetabIcon
    focused={focused}
    label="Facts"
    source={require('./assets/i/yknwldexplorerguidt4.png')}
  />
);

const yknwldexplorerguidIconQuiz = ({focused}: {focused: boolean}) => (
  <CozyrabtteacornetabIcon
    focused={focused}
    label="Quiz"
    source={require('./assets/i/yknwldexplorerguidt5.png')}
  />
);

const yknwldexplorerguidIconGallery = ({focused}: {focused: boolean}) => (
  <CozyrabtteacornetabIcon
    focused={focused}
    label="Gallery"
    source={require('./assets/i/yknwldexplorerguidt6.png')}
  />
);

const yknwldexplorerguidButton = (props: Record<string, unknown>) => (
  <CozyrabtteacornetabAnimatedButton {...props} />
);

const Yknwldexplorerguidtab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [styles.yknwldexplorerguidBar],
        tabBarActiveTintColor: '#FFFFFF',
        tabBarButton: yknwldexplorerguidButton,
        tabBarBackground: yknwldexplorerguidBarBackground,
      }}>
      <Tab.Screen
        name="Yknwldexplorerguiddeexpl"
        component={Yknwldexplorerguiddeexpl}
        options={{
          tabBarIcon: yknwldexplorerguidIconPlaces,
        }}
      />
      <Tab.Screen
        name="Yknwldexplorerguiddesvd"
        component={Yknwldexplorerguiddesvd}
        options={{
          tabBarIcon: yknwldexplorerguidIconSaved,
        }}
      />
      <Tab.Screen
        name="Yknwldexplorerguiddemap"
        component={Yknwldexplorerguiddemap}
        options={{
          tabBarIcon: yknwldexplorerguidIconMap,
        }}
      />
      <Tab.Screen
        name="Yknwldexplorerguiddefcts"
        component={Yknwldexplorerguiddefcts}
        options={{
          tabBarIcon: yknwldexplorerguidIconBlog,
        }}
      />
      <Tab.Screen
        name="Yknwldexplorerguiddequzz"
        component={Yknwldexplorerguiddequzz}
        options={{
          tabBarIcon: yknwldexplorerguidIconQuiz,
        }}
      />
      <Tab.Screen
        name="Yknwldexplorerguiddegall"
        component={Yknwldexplorerguiddegall}
        options={{
          tabBarIcon: yknwldexplorerguidIconGallery,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  yknwldexplorerguidLabelFocused: {
    color: '#C9A84C',
    fontSize: 9,
    fontWeight: '700',
    marginTop: 6,
    textAlign: 'center',
  },
  yknwldexplorerguidBar: {
    elevation: 0,
    paddingTop: 12,
    justifyContent: 'center',
    position: 'absolute',
    paddingHorizontal: 10,
    borderColor: '#FFFFFF14',
    borderTopWidth: 1,
    borderTopColor: '#FFFFFF14',
    backgroundColor: 'transparent',
    height: 85,
    paddingBottom: 20,
    overflow: 'hidden',
  },

  yknwldexplorerguidButton: {
    flex: 1,
  },
  yknwldexplorerguidButtonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  yknwldexplorerguidIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  yknwldexplorerguidIconImageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  yknwldexplorerguidIconSel: {
    position: 'absolute',
    top: -6,
  },
  yknwldexplorerguidIconSelFocused: {
    zIndex: -1,
  },

  yknwldexplorerguidIconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  yknwldexplorerguidIconCircleFocused: {
    borderWidth: 1,
    borderColor: '#805CB4',
  },
  yknwldexplorerguidLabel: {
    fontSize: 9,
    fontWeight: '700',
    marginTop: 6,
    textAlign: 'center',
  },
  yknwldexplorerguidLabelIdle: {
    color: '#FFFFFF59',
  },
});

export default Yknwldexplorerguidtab;
