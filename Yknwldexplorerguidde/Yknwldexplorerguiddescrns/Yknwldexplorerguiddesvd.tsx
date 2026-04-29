import {
  yknwldexplorerguidGetSavedPlaceIds,
  yknwldexplorerguidToggleSavedPlaceId,
} from '../Yknwldexplorerguidutils/Yknwldexplorerguidsaved';
import Yknwldexplorerguiddelay from '../Yknwldexplorerguiddecpn/Yknwldexplorerguiddelay';
import LinearGradient from 'react-native-linear-gradient';

import {useEffect, useMemo, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {useIsFocused, useNavigation} from '@react-navigation/native';

import {yknwldexplorerguidPlaces} from '../Yknwldexplorerguiddata/Yknwldexplorerguidplaces';
import AsyncStorage from '@react-native-async-storage/async-storage';

const yknwldexplorerguidGetCatEmoji = (yknwldexplorerguidCat: string) => {
  switch (yknwldexplorerguidCat) {
    case 'Parks':
      return '🌲';
    case 'Waters':
      return '💧';
    case 'Winter':
      return '❄️';
    case 'Aurora':
      return '🌌';
    case 'Heritage':
      return '🏛️';
    default:
      return '🧭';
  }
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

const Yknwldexplorerguiddesvd = () => {
  const navigation = useNavigation<any>();
  const yknwldexplorerguidIsFocused = useIsFocused();
  const [yknwldexplorerguidSavedIds, setYknwldexplorerguidSavedIds] = useState<
    string[]
  >([]);

  useEffect(() => {
    if (!yknwldexplorerguidIsFocused) {
      return;
    }
    (async () => {
      setYknwldexplorerguidSavedIds(await yknwldexplorerguidGetSavedPlaceIds());
    })();
  }, [yknwldexplorerguidIsFocused]);

  const yknwldexplorerguidSavedPlaces = useMemo(() => {
    const set = new Set(yknwldexplorerguidSavedIds);
    return yknwldexplorerguidPlaces.filter(p => set.has(p.id));
  }, [yknwldexplorerguidSavedIds]);

  const yknwldexplorerguidGoToExplore = () => {
    navigation.navigate('Yknwldexplorerguiddeexpl');
  };

  const yknwldexplorerguidRemoveSaved = async (
    yknwldexplorerguidPlaceId: string,
  ) => {
    const next = await yknwldexplorerguidToggleSavedPlaceId(
      yknwldexplorerguidPlaceId,
    );
    setYknwldexplorerguidSavedIds(next);
  };

  return (
    <Yknwldexplorerguiddelay>
      <View style={styles.yknwldexplorerguidScreenPad}>
        <View style={styles.yknwldexplorerguidHeader}>
          <Text style={styles.yknwldexplorerguidHeaderKicker}>
            MY COLLECTION
          </Text>
          <Text style={styles.yknwldexplorerguidHeaderTitle}>
            Saved Locations
          </Text>
        </View>

        {yknwldexplorerguidSavedPlaces.length > 0 ? (
          <View style={styles.yknwldexplorerguidSavedCountPill}>
            <Text style={styles.yknwldexplorerguidSavedCountPillText}>
              {yknwldexplorerguidSavedPlaces.length} locations saved
            </Text>
          </View>
        ) : null}

        {yknwldexplorerguidSavedPlaces.length === 0 ? (
          <View style={styles.yknwldexplorerguidEmptyWrap}>
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
                source={require('../../assets/i/yknwldexploroim3.png')}
                style={{top: 20}}
              />
            </LinearGradient>
            <Text style={styles.yknwldexplorerguidEmptyTitle}>
              No saved locations yet
            </Text>
            <Text style={styles.yknwldexplorerguidEmptySub}>
              Explore Yukon and tap the bookmark icon on any location to save it
              here.
            </Text>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={yknwldexplorerguidGoToExplore}
              style={{width: '100%', alignSelf: 'center'}}>
              <LinearGradient
                colors={['#00AA4F', '#007A38']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.yknwldexplorerguidEmptyBtn}>
                <Text style={styles.yknwldexplorerguidEmptyBtnText}>
                  Go to Explore
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.yknwldexplorerguidList}>
            {yknwldexplorerguidSavedPlaces.map(place => {
              const catColor = yknwldexplorerguidGetCatColor(place.category);
              return (
                <TouchableOpacity
                  key={place.id}
                  activeOpacity={0.9}
                  onPress={() =>
                    navigation.navigate('Yknwldexplorerguiddedtl', {
                      yknwldexplorerguidPlaceId: place.id,
                    })
                  }
                  style={styles.yknwldexplorerguidCard}>
                  <Image
                    source={(place.image as never) ?? undefined}
                    style={styles.yknwldexplorerguidCardImg}
                  />

                  <View
                    style={[
                      styles.yknwldexplorerguidCardBadge,
                      {backgroundColor: catColor},
                    ]}>
                    <Text style={styles.yknwldexplorerguidCardBadgeText}>
                      {yknwldexplorerguidGetCatEmoji(place.category)}
                    </Text>
                  </View>

                  <View style={styles.yknwldexplorerguidCardBody}>
                    <Text style={styles.yknwldexplorerguidCardTitle}>
                      {place.title}
                    </Text>
                    <Text
                      style={styles.yknwldexplorerguidCardSub}
                      numberOfLines={2}>
                      {place.description}
                    </Text>
                    <Text
                      style={[
                        styles.yknwldexplorerguidCardCat,
                        {color: catColor},
                      ]}>
                      {place.category.toUpperCase()}
                    </Text>
                  </View>

                  <View style={styles.yknwldexplorerguidCardRight}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      hitSlop={{top: 12, bottom: 12, left: 12, right: 12}}
                      onPress={() => yknwldexplorerguidRemoveSaved(place.id)}
                      style={styles.yknwldexplorerguidTrashBtn}>
                      <Image
                        source={require('../../assets/i/yknwldexpldel.png')}
                      />
                    </TouchableOpacity>
                    <Image
                      source={require('../../assets/i/yknwldexplorcsarr.png')}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </Yknwldexplorerguiddelay>
  );
};

export default Yknwldexplorerguiddesvd;

const styles = StyleSheet.create({
  yknwldexplorerguidSavedCountPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#C9A84C26',
    borderWidth: 1,
    borderColor: '#C9A84C4D',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 22,
  },
  yknwldexplorerguidSavedCountPillText: {
    color: '#C9A84C',
    fontSize: 13,
    fontWeight: '600',
  },

  yknwldexplorerguidScreenPad: {paddingTop: 70, paddingHorizontal: 22, flex: 1},
  yknwldexplorerguidHeader: {marginBottom: 14},
  yknwldexplorerguidHeaderKicker: {
    color: '#C9A84C',
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '600',
    marginBottom: 8,
  },
  yknwldexplorerguidHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },

  yknwldexplorerguidList: {gap: 12, paddingBottom: 110},
  yknwldexplorerguidCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1A3ACC',
    borderWidth: 1,
    borderColor: '#FFFFFF12',
    borderRadius: 18,
    overflow: 'hidden',
    minHeight: 102,
  },
  yknwldexplorerguidCardImgWrap: {},
  yknwldexplorerguidCardImg: {width: 100, height: '100%'},
  yknwldexplorerguidCardBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#00AA4F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  yknwldexplorerguidCardBadgeText: {fontSize: 11},
  yknwldexplorerguidCardBody: {flex: 1, padding: 12},
  yknwldexplorerguidCardTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  yknwldexplorerguidCardSub: {
    color: '#FFFFFF66',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 5,
  },
  yknwldexplorerguidCardCat: {
    marginTop: 8,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
  },
  yknwldexplorerguidCardRight: {
    paddingRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  yknwldexplorerguidTrashBtn: {},
  yknwldexplorerguidTrashBtnText: {fontSize: 14, top: 0.5},

  yknwldexplorerguidEmptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 130,
  },
  yknwldexplorerguidEmptyCircle: {
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#00AA4F33',
    borderWidth: 2,
    borderColor: '#C9A84C',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  yknwldexplorerguidEmptyImg: {width: 120, height: 120, opacity: 0.95},
  yknwldexplorerguidEmptyTitle: {
    marginTop: 28,
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  yknwldexplorerguidEmptySub: {
    marginTop: 10,
    color: '#FFFFFF66',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 22,
  },
  yknwldexplorerguidEmptyBtn: {
    marginTop: 26,
    height: 58,
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#C9A84C66',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  yknwldexplorerguidEmptyBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
