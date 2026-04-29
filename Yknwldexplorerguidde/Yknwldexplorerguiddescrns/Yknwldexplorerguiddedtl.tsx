import {
  yknwldexplorerguidGetSavedPlaceIds,
  yknwldexplorerguidToggleSavedPlaceId,
} from '../Yknwldexplorerguidutils/Yknwldexplorerguidsaved';

import {useEffect, useMemo, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {useNavigation, useRoute} from '@react-navigation/native';

import {yknwldexplorerguidGetPlaceById} from '../Yknwldexplorerguiddata/Yknwldexplorerguidplaces';

type YknwldexplorerguidRouteParams = {
  yknwldexplorerguidPlaceId: string;
};

function yknwldexplorerguidFormatCoords(
  yknwldexplorerguidLat: number,
  yknwldexplorerguidLng: number,
) {
  const ns = yknwldexplorerguidLat >= 0 ? 'N' : 'S';
  const ew = yknwldexplorerguidLng >= 0 ? 'E' : 'W';
  return `${Math.abs(yknwldexplorerguidLat).toFixed(4)}°${ns}, ${Math.abs(
    yknwldexplorerguidLng,
  ).toFixed(4)}°${ew}`;
}

const Yknwldexplorerguiddedtl = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const yknwldexplorerguidPlaceId = (
    route.params as YknwldexplorerguidRouteParams | undefined
  )?.yknwldexplorerguidPlaceId;

  const yknwldexplorerguidPlace = useMemo(
    () =>
      yknwldexplorerguidPlaceId
        ? yknwldexplorerguidGetPlaceById(yknwldexplorerguidPlaceId)
        : undefined,
    [yknwldexplorerguidPlaceId],
  );

  const [yknwldexplorerguidSaved, setYknwldexplorerguidSaved] = useState(false);

  useEffect(() => {
    (async () => {
      if (!yknwldexplorerguidPlaceId) {
        return;
      }
      const ids = await yknwldexplorerguidGetSavedPlaceIds();
      setYknwldexplorerguidSaved(ids.includes(yknwldexplorerguidPlaceId));
    })();
  }, [yknwldexplorerguidPlaceId]);

  const yknwldexplorerguidOpenOnMap = async () => {
    if (!yknwldexplorerguidPlace) {
      return;
    }
    navigation.navigate('Yknwldexplorerguidtab', {
      screen: 'Yknwldexplorerguiddemap',
      params: {yknwldexplorerguidPlaceId: yknwldexplorerguidPlace.id},
    });
  };

  const yknwldexplorerguidShare = async () => {
    if (!yknwldexplorerguidPlace) {
      return;
    }
    const {lat, lng} = yknwldexplorerguidPlace.coordinates;
    await Share.share({
      message: `${yknwldexplorerguidPlace.title}\n\n${yknwldexplorerguidPlace.description}\n\nCoordinates: ${lat}, ${lng}`,
    });
  };

  const yknwldexplorerguidToggleSave = async () => {
    if (!yknwldexplorerguidPlaceId) {
      return;
    }
    const ids = await yknwldexplorerguidToggleSavedPlaceId(
      yknwldexplorerguidPlaceId,
    );
    setYknwldexplorerguidSaved(ids.includes(yknwldexplorerguidPlaceId));
  };

  if (!yknwldexplorerguidPlace) {
    return (
      <View
        style={[
          styles.yknwldexplorerguidRoot,
          styles.yknwldexplorerguidCenter,
        ]}>
        <Text style={styles.yknwldexplorerguidMissingTitle}>Not found</Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.goBack()}
          style={styles.yknwldexplorerguidMissingBtn}>
          <Text style={styles.yknwldexplorerguidMissingBtnText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.yknwldexplorerguidRoot}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <ImageBackground
          source={(yknwldexplorerguidPlace.image as never) ?? undefined}
          style={styles.yknwldexplorerguidHero}
          resizeMode="cover">
          <LinearGradient
            colors={['#0F0C1D00', '#0F0C1DEE', '#0F0C1D']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 120,
            }}
          />

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.goBack()}
            style={styles.yknwldexplorerguidBackBtn}>
            <Image source={require('../../assets/i/yknwldexplorbak.png')} />
          </TouchableOpacity>

          <View style={styles.yknwldexplorerguidChip}>
            <Text style={styles.yknwldexplorerguidChipText}>
              {yknwldexplorerguidPlace.category}
            </Text>
          </View>

          <View style={styles.yknwldexplorerguidHeroBottom}>
            <Text style={styles.yknwldexplorerguidTitle}>
              {yknwldexplorerguidPlace.title}
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.yknwldexplorerguidBody}>
          <View style={styles.yknwldexplorerguidCoordsCard}>
            <View style={styles.yknwldexplorerguidCoordsRow}>
              <Image
                source={require('../../assets/i/yknwldexplorcoord.png')}
                style={{width: 18, height: 18}}
              />
              <Text style={styles.yknwldexplorerguidCoordsLabel}>
                COORDINATES
              </Text>
            </View>
            <Text style={styles.yknwldexplorerguidCoordsValue}>
              {yknwldexplorerguidFormatCoords(
                yknwldexplorerguidPlace.coordinates.lat,
                yknwldexplorerguidPlace.coordinates.lng,
              )}
            </Text>
          </View>

          <View style={{paddingHorizontal: 10}}>
            <Text style={styles.yknwldexplorerguidSectionKicker}>ABOUT</Text>
            <Text style={styles.yknwldexplorerguidAbout}>
              {yknwldexplorerguidPlace.description}
            </Text>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={yknwldexplorerguidOpenOnMap}
              style={styles.yknwldexplorerguidMapBtnWrap}>
              <LinearGradient
                colors={['#00AA4F', '#007A38']}
                style={styles.yknwldexplorerguidMapBtn}>
                <Image source={require('../../assets/i/yknwldexploopma.png')} />
                <Text style={styles.yknwldexplorerguidMapBtnText}>
                  Open on Map
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.yknwldexplorerguidBottomRow}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={yknwldexplorerguidToggleSave}
                style={styles.yknwldexplorerguidHalfBtnWrap}>
                <LinearGradient
                  colors={
                    yknwldexplorerguidSaved
                      ? ['#C9A84C33', '#C9A84C33']
                      : ['#2F286180', '#2F286180']
                  }
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={[
                    styles.yknwldexplorerguidHalfBtn,
                    yknwldexplorerguidSaved
                      ? styles.yknwldexplorerguidHalfBtnActive
                      : styles.yknwldexplorerguidHalfBtnIdle,
                  ]}>
                  <Image
                    source={
                      yknwldexplorerguidSaved
                        ? require('../../assets/i/yknwldexplorcsaved.png')
                        : require('../../assets/i/yknwldexplorsv.png')
                    }
                  />
                  <Text
                    style={[
                      styles.yknwldexplorerguidHalfBtnText,
                      yknwldexplorerguidSaved && {color: '#C9A84C'},
                    ]}>
                    {yknwldexplorerguidSaved ? 'Saved' : 'Save'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={yknwldexplorerguidShare}
                style={styles.yknwldexplorerguidHalfBtnWrap}>
                <LinearGradient
                  colors={['#2F286180', '#2F286180']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={[
                    styles.yknwldexplorerguidHalfBtn,
                    styles.yknwldexplorerguidHalfBtnIdle,
                  ]}>
                  <Image source={require('../../assets/i/yknwldexplshr.png')} />
                  <Text style={styles.yknwldexplorerguidHalfBtnText}>
                    Share
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Yknwldexplorerguiddedtl;

const styles = StyleSheet.create({
  yknwldexplorerguidMapBtnWrap: {marginBottom: 12},
  yknwldexplorerguidMapBtn: {
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#C9A84C66',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },

  yknwldexplorerguidRoot: {flex: 1, backgroundColor: '#0F0C1D'},
  yknwldexplorerguidCenter: {alignItems: 'center', justifyContent: 'center'},

  yknwldexplorerguidHero: {
    height: 320,
  },
  yknwldexplorerguidBackBtn: {
    position: 'absolute',
    top: 55,
    left: 18,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00000080',
    borderWidth: 1,
    borderColor: '#FFFFFF33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  yknwldexplorerguidBackBtnText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    top: -1,
  },
  yknwldexplorerguidHeroBottom: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 18,
  },
  yknwldexplorerguidChip: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 60,
    right: 18,
    paddingHorizontal: 12,
    height: 28,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#00AA4F66',
    backgroundColor: '#00AA4F26',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  yknwldexplorerguidChipText: {color: '#00AA4F', fontWeight: '600'},
  yknwldexplorerguidTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 34,
  },

  yknwldexplorerguidBody: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 24,
  },

  yknwldexplorerguidCoordsCard: {
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#C9A84C33',
    backgroundColor: '#2F286166',
    marginBottom: 16,

    width: '95%',
    alignSelf: 'center',
  },
  yknwldexplorerguidCoordsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  yknwldexplorerguidCoordsLabel: {
    color: '#FFFFFF66',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 2,
  },
  yknwldexplorerguidCoordsValue: {
    color: '#C9A84C',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
  },

  yknwldexplorerguidSectionKicker: {
    color: '#00AA4F',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 6,
  },
  yknwldexplorerguidAbout: {
    color: '#FFFFFFCC',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
    marginBottom: 18,
  },

  yknwldexplorerguidMapBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  yknwldexplorerguidBottomRow: {flexDirection: 'row', gap: 12},
  yknwldexplorerguidHalfBtnWrap: {flex: 1},
  yknwldexplorerguidHalfBtn: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  yknwldexplorerguidHalfBtnIdle: {borderColor: '#FFFFFF14'},
  yknwldexplorerguidHalfBtnActive: {borderColor: '#C9A84C66'},
  yknwldexplorerguidHalfBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  yknwldexplorerguidMissingTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 14,
  },
  yknwldexplorerguidMissingBtn: {
    borderWidth: 1,
    borderColor: '#FFFFFF14',
    backgroundColor: '#FFFFFF0F',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
  },
  yknwldexplorerguidMissingBtnText: {color: '#FFFFFF', fontWeight: '800'},
});
