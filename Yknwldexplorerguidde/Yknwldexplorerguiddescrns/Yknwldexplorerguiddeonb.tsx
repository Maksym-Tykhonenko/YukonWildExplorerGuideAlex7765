// onboard

import {useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {useNavigation} from '@react-navigation/native';

const yknwldexplorerguidData = [
  {
    id: 1,
    title: 'Welcome to Yukon',
    description: `I'll show you everything this incredible territory has to offer — from historic mining towns to glacial peaks. Let's begin your journey!`,
    sectionTitle: `G'day, explorer! I'm Ethan, your personal Yukon guide.`,
    image: require('../../assets/i/yknwldexploroim1.png'),
  },
  {
    id: 2,
    title: 'Wild & Untamed',
    description: `Yukon covers 482,443 km² — bigger than California — yet has fewer than 40,000 residents. The vast majority is pristine wilderness, untouched for millennia.`,
    image: require('../../assets/i/yknwldexploroim2.png'),
    sectionTitle: `The last true wilderness of North America.`,
  },
  {
    id: 3,
    title: 'Chase the Aurora',
    description: `With over 200 nights of clear skies per year and minimal light pollution, Yukon offers the most reliable Northern Lights viewing on Earth. Prepare to be amazed.`,
    image: require('../../assets/i/yknwldexploroim3.png'),
    sectionTitle: `Yukon is the world's top Aurora Borealis destination.`,
  },
  {
    id: 4,
    title: 'Gold Rush Legends',
    description: `The Klondike mining boom of 1897–1898 changed the world. Over 100,000 people braved difficult conditions to reach Yukon’s goldfields. Their stories echo across these landscapes.`,
    image: require('../../assets/i/yknwldexploroim4.png'),
    sectionTitle: `History carved into every mountain and riverbank.`,
  },
  {
    id: 5,
    title: 'Begin Your Journey',
    description:
      'Discover hidden gems, earn points, collect wallpapers, and test your Yukon knowledge. The wilderness is waiting — are you ready, explorer?',
    image: require('../../assets/i/yknwldexploroim5.png'),
    sectionTitle: `Your adventure starts now.`,
  },
];

const Yknwldexplorerguiddeonb = () => {
  const [yknwldexplorerguidcurrentIdx, setYknwldexplorerguidCurrentIdx] =
    useState(0);
  const navigation = useNavigation();

  const yknwldexplorerguidnext = () => {
    yknwldexplorerguidcurrentIdx === 4
      ? navigation.navigate('Yknwldexplorerguidtab' as never)
      : setYknwldexplorerguidCurrentIdx(yknwldexplorerguidcurrentIdx + 1);
  };

  return (
    <ImageBackground
      source={require('../../assets/i/yknwldexploronbg1.png')}
      style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.yknwldexplorerguiddeonbcontainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              marginBottom: 55,
            }}>
            <View style={styles.yknwldexplorerguidpagination}>
              {[1, 2, 3, 4, 5].map((item, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.yknwldexplorerguidpaginationitem,
                    {
                      backgroundColor:
                        yknwldexplorerguidcurrentIdx === idx
                          ? '#C9A84C'
                          : '#FFFFFF4D',
                      width: yknwldexplorerguidcurrentIdx === idx ? 24 : 8,
                    },
                  ]}
                />
              ))}
            </View>
            <TouchableOpacity
              style={styles.yknwldexplorerguidskipbtn}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('Yknwldexplorerguidtab' as never)
              }>
              <Text style={styles.yknwldexplorerguidskipbtntext}>Skip</Text>
              <Image source={require('../../assets/i/yknwldexplocls.png')} />
            </TouchableOpacity>
          </View>

          <LinearGradient
            colors={['#00AA4F', '#2F2861']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              width: 342,
              height: 342,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 500,
              borderWidth: 1,
              borderColor: '#C9A84C',
              overflow: 'hidden',
            }}>
            <Image
              source={
                yknwldexplorerguidData[yknwldexplorerguidcurrentIdx].image
              }
              style={{top: 20}}
            />
          </LinearGradient>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,

              paddingTop: 50,
              marginBottom: 16,
              justifyContent: 'flex-start',
              width: '100%',
            }}>
            <Image source={require('../../assets/i/yknwldexplotmr.png')} />
            <View>
              <Text style={styles.yknwldexplorerguidtitle}>
                ETHAN — YOUR GUIDE
              </Text>
              <Text style={styles.yknwldexplorerguiddescription}>
                {
                  yknwldexplorerguidData[yknwldexplorerguidcurrentIdx]
                    .sectionTitle
                }
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.yknwldexplorerguidwelcometext}>
              {yknwldexplorerguidData[yknwldexplorerguidcurrentIdx].title}
            </Text>
            <Text style={styles.yknwldexplorerguidwelcdescr}>
              {yknwldexplorerguidData[yknwldexplorerguidcurrentIdx].description}
            </Text>
          </View>

          <TouchableOpacity
            style={{width: '100%'}}
            activeOpacity={0.8}
            onPress={yknwldexplorerguidnext}>
            <LinearGradient
              colors={
                yknwldexplorerguidcurrentIdx === 4
                  ? ['#00AA4F', '#007A38']
                  : ['#2F2861', '#1E1A3A']
              }
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.yknwldexplorerguidwelcbtn}>
              <Text style={styles.yknwldexplorerguidwelctext}>
                {yknwldexplorerguidcurrentIdx === 4
                  ? `Let's Explore Yukon!`
                  : 'Continue'}
              </Text>
              <Image source={require('../../assets/i/yknwldexplotnext.png')} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  yknwldexplorerguiddeonbcontainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    justifyContent: 'flex-end',
    paddingBottom: 60,
  },
  yknwldexplorerguidpagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  yknwldexplorerguidpaginationitem: {
    width: 8,
    height: 3,
    backgroundColor: '#FFFFFF4D',
  },
  yknwldexplorerguidpaginationitemactive: {
    backgroundColor: '#C9A84C',
  },
  yknwldexplorerguidskipbtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    width: 70,
    height: 33,
    backgroundColor: '#FFFFFF26',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#FFFFFF33',
  },
  yknwldexplorerguidskipbtntext: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  yknwldexplorerguidtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#C9A84C',
  },
  yknwldexplorerguiddescription: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFFB2',
    width: '80%',
  },
  yknwldexplorerguidwelcometext: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'left',
  },
  yknwldexplorerguidwelcdescr: {
    fontSize: 15,
    fontWeight: '400',
    color: '#FFFFFFB2',
    marginTop: 10,
  },
  yknwldexplorerguidwelcbtn: {
    height: 58,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C9A84C66',
    marginTop: 30,

    flexDirection: 'row',
    gap: 5,
  },
  yknwldexplorerguidwelctext: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default Yknwldexplorerguiddeonb;
