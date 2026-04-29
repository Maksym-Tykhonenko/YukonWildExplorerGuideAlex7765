import {useNavigation, useRoute} from '@react-navigation/native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useEffect, useMemo, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, type Region} from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';

import {
  type YknwldexplorerguidPlace,
  yknwldexplorerguidPlaces,
} from '../Yknwldexplorerguiddata/Yknwldexplorerguidplaces';

type YknwldexplorerguidRouteParams = {
  yknwldexplorerguidPlaceId: string;
};

const yknwldexplorerguidGetCatColor = (yknwldexplorerguidCat: string) => {
  switch (yknwldexplorerguidCat) {
    case 'Parks':
      return '#00AA4F';
    case 'Waters':
      return '#2D9CDB';
    case 'Winter':
      return '#A9D6FF';
    case 'Aurora':
      return '#8A63FF';
    case 'Heritage':
      return '#C9A84C';
    default:
      return '#00AA4F';
  }
};

function yknwldexplorerguidHexToRgba(
  yknwldexplorerguidHex: string,
  yknwldexplorerguidAlpha: number,
) {
  const yknwldexplorerguidNormalized = yknwldexplorerguidHex.trim();
  if (
    !yknwldexplorerguidNormalized.startsWith('#') ||
    yknwldexplorerguidNormalized.length !== 7
  ) {
    return yknwldexplorerguidHex;
  }
  const yknwldexplorerguidR = Number.parseInt(
    yknwldexplorerguidNormalized.slice(1, 3),
    16,
  );
  const yknwldexplorerguidG = Number.parseInt(
    yknwldexplorerguidNormalized.slice(3, 5),
    16,
  );
  const yknwldexplorerguidB = Number.parseInt(
    yknwldexplorerguidNormalized.slice(5, 7),
    16,
  );
  if (
    Number.isNaN(yknwldexplorerguidR) ||
    Number.isNaN(yknwldexplorerguidG) ||
    Number.isNaN(yknwldexplorerguidB)
  ) {
    return yknwldexplorerguidHex;
  }
  const yknwldexplorerguidA = Math.min(1, Math.max(0, yknwldexplorerguidAlpha));
  return `rgba(${yknwldexplorerguidR}, ${yknwldexplorerguidG}, ${yknwldexplorerguidB}, ${yknwldexplorerguidA})`;
}

function yknwldexplorerguidFormatCoords(
  yknwldexplorerguidLat: number,
  yknwldexplorerguidLng: number,
) {
  const ns = yknwldexplorerguidLat >= 0 ? 'N' : 'S';
  const ew = yknwldexplorerguidLng >= 0 ? 'E' : 'W';
  return `${Math.abs(yknwldexplorerguidLat).toFixed(3)}°${ns}, ${Math.abs(
    yknwldexplorerguidLng,
  ).toFixed(3)}°${ew}`;
}

const Yknwldexplorerguiddemap = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const yknwldexplorerguidInsets = useSafeAreaInsets();
  const yknwldexplorerguidMapRef = useRef<MapView | null>(null);
  const yknwldexplorerguidIgnoreNextMapPressRef = useRef(false);
  const yknwldexplorerguidMapPressGuardTimerRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const [yknwldexplorerguidSelected, setYknwldexplorerguidSelected] =
    useState<YknwldexplorerguidPlace | null>(null);

  const [
    yknwldexplorerguidTracksViewChanges,
    setYknwldexplorerguidTracksViewChanges,
  ] = useState(Platform.OS === 'android');

  const yknwldexplorerguidPlaceIdFromParams = (
    route.params as YknwldexplorerguidRouteParams | undefined
  )?.yknwldexplorerguidPlaceId;

  const yknwldexplorerguidArmMapPressGuard = () => {
    yknwldexplorerguidIgnoreNextMapPressRef.current = true;
    if (yknwldexplorerguidMapPressGuardTimerRef.current) {
      clearTimeout(yknwldexplorerguidMapPressGuardTimerRef.current);
    }
    yknwldexplorerguidMapPressGuardTimerRef.current = setTimeout(() => {
      yknwldexplorerguidIgnoreNextMapPressRef.current = false;
      yknwldexplorerguidMapPressGuardTimerRef.current = null;
    }, 250);
  };

  useEffect(() => {
    return () => {
      if (yknwldexplorerguidMapPressGuardTimerRef.current) {
        clearTimeout(yknwldexplorerguidMapPressGuardTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }
    const t = setTimeout(() => {
      setYknwldexplorerguidTracksViewChanges(false);
    }, 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!yknwldexplorerguidPlaceIdFromParams) {
      return;
    }

    const next = yknwldexplorerguidPlaces.find(
      p => p.id === yknwldexplorerguidPlaceIdFromParams,
    );
    if (!next) {
      return;
    }

    setYknwldexplorerguidSelected(next);

    requestAnimationFrame(() => {
      yknwldexplorerguidMapRef.current?.animateToRegion(
        {
          latitude: next.coordinates.lat,
          longitude: next.coordinates.lng,
          latitudeDelta: 0.6,
          longitudeDelta: 0.6,
        },
        650,
      );
    });
  }, [yknwldexplorerguidPlaceIdFromParams]);

  const yknwldexplorerguidInitialRegion = useMemo<Region>(() => {
    const lats = yknwldexplorerguidPlaces.map(p => p.coordinates.lat);
    const lngs = yknwldexplorerguidPlaces.map(p => p.coordinates.lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const lat = (minLat + maxLat) / 2;
    const lng = (minLng + maxLng) / 2;
    const latDelta = Math.max(10, (maxLat - minLat) * 1.05);
    const lngDelta = Math.max(10, (maxLng - minLng) * 1.05);

    return {
      latitude: lat,
      longitude: lng,
      latitudeDelta: latDelta,
      longitudeDelta: lngDelta,
    };
  }, []);

  const yknwldexplorerguidLegend = useMemo(
    () =>
      [
        {key: 'Parks', label: 'Parks'},
        {key: 'Aurora', label: 'Aurora'},
        {key: 'Waters', label: 'Waters'},
        {key: 'Heritage', label: 'Heritage'},
        {key: 'Winter', label: 'Winter'},
      ] as const,
    [],
  );

  return (
    <View style={styles.yknwldexplorerguidRoot}>
      <MapView
        ref={yknwldexplorerguidMapRef}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        style={StyleSheet.absoluteFill}
        userInterfaceStyle="dark"
        initialRegion={yknwldexplorerguidInitialRegion}
        rotateEnabled={false}
        pitchEnabled={false}
        mapPadding={{
          top: yknwldexplorerguidInsets.top + 86,
          right: 14,
          bottom: 110,
          left: 14,
        }}
        onMarkerPress={e => {
          const yknwldexplorerguidMarkerId = e.nativeEvent.id;
          const yknwldexplorerguidNext = yknwldexplorerguidPlaces.find(
            p => p.id === yknwldexplorerguidMarkerId,
          );
          if (yknwldexplorerguidNext) {
            yknwldexplorerguidArmMapPressGuard();
            setYknwldexplorerguidSelected(yknwldexplorerguidNext);
          }
        }}
        onPress={() => {
          if (yknwldexplorerguidIgnoreNextMapPressRef.current) {
            return;
          }
          setYknwldexplorerguidSelected(null);
        }}>
        {yknwldexplorerguidPlaces.map(place => {
          const yknwldexplorerguidPinColor = yknwldexplorerguidGetCatColor(
            place.category,
          );
          const yknwldexplorerguidPinOuterFill = yknwldexplorerguidHexToRgba(
            yknwldexplorerguidPinColor,
            0.22,
          );
          const yknwldexplorerguidPinInnerFill = yknwldexplorerguidHexToRgba(
            yknwldexplorerguidPinColor,
            0.38,
          );
          return (
            <Marker
              key={place.id}
              identifier={place.id}
              coordinate={{
                latitude: place.coordinates.lat,
                longitude: place.coordinates.lng,
              }}
              tracksViewChanges={yknwldexplorerguidTracksViewChanges}
              onPress={() => {
                yknwldexplorerguidArmMapPressGuard();
                setYknwldexplorerguidSelected(place);
              }}>
              <View
                style={[
                  styles.yknwldexplorerguidPinOuter,
                  {
                    borderColor: yknwldexplorerguidPinColor,
                    backgroundColor: yknwldexplorerguidPinOuterFill,
                  },
                ]}>
                <View
                  style={[
                    styles.yknwldexplorerguidPinInner,
                    {backgroundColor: yknwldexplorerguidPinInnerFill},
                  ]}>
                  <Text style={styles.yknwldexplorerguidPinEmoji}>
                    {place.emoji}
                  </Text>
                </View>
              </View>
            </Marker>
          );
        })}
      </MapView>

      <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
        <View
          style={[
            styles.yknwldexplorerguidTopRow,
            {paddingTop: yknwldexplorerguidInsets.top + 10},
          ]}>
          <View style={styles.yknwldexplorerguidHeader}>
            <Text style={styles.yknwldexplorerguidHeaderKicker}>
              INTERACTIVE
            </Text>
            <Text style={styles.yknwldexplorerguidHeaderTitle}>Yukon Map</Text>
          </View>

          <View style={styles.yknwldexplorerguidCountCard}>
            <Text style={styles.yknwldexplorerguidCountValue}>
              {yknwldexplorerguidPlaces.length}
            </Text>
            <Text style={styles.yknwldexplorerguidCountLabel}>locations</Text>
          </View>
        </View>

        <View
          style={[
            styles.yknwldexplorerguidLegend,
            {bottom: 110 + yknwldexplorerguidInsets.bottom},
          ]}>
          <Text style={styles.yknwldexplorerguidLegendTitle}>LEGEND</Text>
          {yknwldexplorerguidLegend.map(item => (
            <View key={item.key} style={styles.yknwldexplorerguidLegendRow}>
              <View
                style={[
                  styles.yknwldexplorerguidLegendDot,
                  {backgroundColor: yknwldexplorerguidGetCatColor(item.key)},
                ]}
              />
              <Text
                style={[
                  styles.yknwldexplorerguidLegendText,
                  {color: yknwldexplorerguidGetCatColor(item.key)},
                ]}>
                {item.label}
              </Text>
            </View>
          ))}
        </View>

        <View
          style={[
            styles.yknwldexplorerguidHintPill,
            {bottom: 102 + yknwldexplorerguidInsets.bottom},
          ]}>
          <Text style={styles.yknwldexplorerguidHintText}>
            Tap a pin to explore
          </Text>
        </View>

        {yknwldexplorerguidSelected ? (
          <View
            style={styles.yknwldexplorerguidPreviewWrap}
            pointerEvents="box-none">
            <View style={styles.yknwldexplorerguidPreviewCard}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setYknwldexplorerguidSelected(null)}
                style={styles.yknwldexplorerguidPreviewClose}>
                <Image
                  source={require('../../assets/i/yknwldexplorocls.png')}
                />
              </TouchableOpacity>

              <ImageBackground
                source={
                  (yknwldexplorerguidSelected.image as never) ?? undefined
                }
                style={styles.yknwldexplorerguidPreviewImg}
                resizeMode="cover">
                <LinearGradient
                  colors={['#0F0C1D00', '#0F0C1DCC']}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: 30,
                    bottom: 0,
                  }}
                />
                <View style={styles.yknwldexplorerguidPreviewTag}>
                  <Text style={styles.yknwldexplorerguidPreviewTagText}>
                    {yknwldexplorerguidSelected.category.toUpperCase()}
                  </Text>
                </View>
              </ImageBackground>

              <View style={styles.yknwldexplorerguidPreviewBody}>
                <Text style={styles.yknwldexplorerguidPreviewTitle}>
                  {yknwldexplorerguidSelected.title}
                </Text>
                <Text
                  style={styles.yknwldexplorerguidPreviewSub}
                  numberOfLines={2}>
                  {yknwldexplorerguidSelected.description}
                </Text>
                <Text style={styles.yknwldexplorerguidPreviewCoords}>
                  {yknwldexplorerguidFormatCoords(
                    yknwldexplorerguidSelected.coordinates.lat,
                    yknwldexplorerguidSelected.coordinates.lng,
                  )}
                </Text>

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    navigation.navigate('Yknwldexplorerguiddedtl', {
                      yknwldexplorerguidPlaceId: yknwldexplorerguidSelected.id,
                    });
                  }}
                  style={styles.yknwldexplorerguidPreviewBtnWrap}>
                  <LinearGradient
                    colors={['#93C5FD', '#93C5FDBB']}
                    style={styles.yknwldexplorerguidPreviewBtn}>
                    <Image
                      source={require('../../assets/i/yknwldexplorsen.png')}
                    />
                    <Text style={styles.yknwldexplorerguidPreviewBtnText}>
                      View Details
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default Yknwldexplorerguiddemap;

const styles = StyleSheet.create({
  yknwldexplorerguidHeaderKicker: {
    color: '#00AA4F',
    fontSize: 11,
    letterSpacing: 3,
    fontWeight: '700',
    marginBottom: 6,
  },

  yknwldexplorerguidLegend: {
    position: 'absolute',
    left: 14,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#0F0C1DEB',
    borderWidth: 1,
    borderColor: '#FFFFFF1A',
  },
  yknwldexplorerguidLegendTitle: {
    color: '#FFFFFF59',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2,
    marginBottom: 8,
  },
  yknwldexplorerguidLegendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },

  yknwldexplorerguidRoot: {flex: 1, backgroundColor: '#0F0C1D'},

  yknwldexplorerguidTopRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  yknwldexplorerguidHeader: {flex: 1, paddingRight: 10},

  yknwldexplorerguidHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  yknwldexplorerguidCountCard: {
    minWidth: 69,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: '#0F0C1DE0',
    borderWidth: 1,
    borderColor: '#FFFFFF14',
    alignItems: 'center',
  },
  yknwldexplorerguidCountValue: {
    color: '#00AA4F',
    fontSize: 18,
    fontWeight: '800',
  },
  yknwldexplorerguidCountLabel: {
    marginTop: 2,
    color: '#FFFFFF66',
    fontSize: 9,
    fontWeight: '600',
  },

  yknwldexplorerguidPinOuter: {
    width: 28,
    height: 28,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yknwldexplorerguidPinInner: {
    width: 20,
    height: 20,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yknwldexplorerguidPinEmoji: {fontSize: 13},

  yknwldexplorerguidLegendDot: {width: 10, height: 10, borderRadius: 5},
  yknwldexplorerguidLegendText: {fontSize: 10, fontWeight: '600'},

  yknwldexplorerguidHintPill: {
    position: 'absolute',
    right: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#0F0C1DD9',
    borderWidth: 1,
    borderColor: '#FFFFFF14',
  },
  yknwldexplorerguidHintText: {
    color: '#FFFFFF73',
    fontSize: 10,
    fontWeight: '400',
  },

  yknwldexplorerguidPreviewWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  yknwldexplorerguidPreviewCard: {
    width: '53%',
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#1E1A3ACC',
    borderWidth: 1,
    borderColor: '#FFFFFF12',
    zIndex: 100,
    left: 10,
  },
  yknwldexplorerguidPreviewClose: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 5,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#0F0C1DBF',
    borderWidth: 1,
    borderColor: '#FFFFFF14',
    alignItems: 'center',
    justifyContent: 'center',
  },
  yknwldexplorerguidPreviewCloseText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    top: -1,
  },
  yknwldexplorerguidPreviewImg: {height: 89, width: '100%'},
  yknwldexplorerguidPreviewTag: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  yknwldexplorerguidPreviewTagText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  yknwldexplorerguidPreviewBody: {padding: 14},
  yknwldexplorerguidPreviewTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  yknwldexplorerguidPreviewSub: {
    marginTop: 6,
    color: '#FFFFFF66',
    fontSize: 10,
    fontWeight: '400',
  },
  yknwldexplorerguidPreviewCoords: {
    marginTop: 10,
    color: '#FFFFFF66',
    fontSize: 9,
    fontWeight: '400',
  },
  yknwldexplorerguidPreviewBtnWrap: {marginTop: 14},
  yknwldexplorerguidPreviewBtn: {
    height: 33,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF14',
  },
  yknwldexplorerguidPreviewBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});
