import {
  type YknwldexplorerguidCategory,
  yknwldexplorerguidPlaces,
} from '../Yknwldexplorerguiddata/Yknwldexplorerguidplaces';

import {useEffect, useMemo, useRef, useState} from 'react';
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
import {useIsFocused, useNavigation} from '@react-navigation/native';

import {
  yknwldexplorerguidGetSavedPlaceIds,
  yknwldexplorerguidToggleSavedPlaceId,
} from '../Yknwldexplorerguidutils/Yknwldexplorerguidsaved';
import Yknwldexplorerguiddelay from '../Yknwldexplorerguiddecpn/Yknwldexplorerguiddelay';

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

const Yknwldexplorerguiddeexpl = () => {
  const navigation = useNavigation<any>();
  const yknwldexplorerguidIsFocused = useIsFocused();
  const yknwldexplorerguidIgnoreNextNavRef = useRef(false);

  const [yknwldexplorerguidActiveCat, setYknwldexplorerguidActiveCat] =
    useState<YknwldexplorerguidCategory | 'All'>('All');
  const [yknwldexplorerguidSavedIds, setYknwldexplorerguidSavedIds] = useState<
    string[]
  >([]);
  const [yknwldexplorerguidCatPreviewImgByCat] = useState<
    Partial<Record<YknwldexplorerguidCategory, unknown>>
  >(() => {
    const next: Partial<Record<YknwldexplorerguidCategory, unknown>> = {};
    (['Parks', 'Aurora', 'Waters', 'Heritage', 'Winter'] as const).forEach(
      cat => {
        const items = yknwldexplorerguidPlaces.filter(p => p.category === cat);
        if (items.length === 0) {
          return;
        }
        const idx = Math.floor(Math.random() * items.length);
        next[cat] = items[idx].image;
      },
    );
    return next;
  });

  useEffect(() => {
    if (!yknwldexplorerguidIsFocused) {
      return;
    }
    (async () => {
      setYknwldexplorerguidSavedIds(await yknwldexplorerguidGetSavedPlaceIds());
    })();
  }, [yknwldexplorerguidIsFocused]);

  const yknwldexplorerguidCategories = useMemo(
    () => ['All', 'Parks', 'Aurora', 'Waters', 'Heritage', 'Winter'] as const,
    [],
  );

  const yknwldexplorerguidFiltered = useMemo(() => {
    if (yknwldexplorerguidActiveCat === 'All') {
      return yknwldexplorerguidPlaces;
    }
    return yknwldexplorerguidPlaces.filter(
      p => p.category === yknwldexplorerguidActiveCat,
    );
  }, [yknwldexplorerguidActiveCat]);

  const yknwldexplorerguidOpenDetails = (yknwldexplorerguidPlaceId: string) => {
    if (yknwldexplorerguidIgnoreNextNavRef.current) {
      yknwldexplorerguidIgnoreNextNavRef.current = false;
      return;
    }
    navigation.navigate('Yknwldexplorerguiddedtl', {
      yknwldexplorerguidPlaceId,
    });
  };

  const yknwldexplorerguidToggleSaveFromList = async (
    yknwldexplorerguidPlaceId: string,
  ) => {
    yknwldexplorerguidIgnoreNextNavRef.current = true;
    const next = await yknwldexplorerguidToggleSavedPlaceId(
      yknwldexplorerguidPlaceId,
    );
    setYknwldexplorerguidSavedIds(next);
  };

  return (
    <Yknwldexplorerguiddelay>
      <View style={styles.yknwldexplorerguidScreenPad}>
        <View style={styles.yknwldexplorerguidHeader}>
          <Text style={styles.yknwldexplorerguidHeaderKicker}>DISCOVER</Text>
          <Text style={styles.yknwldexplorerguidHeaderTitle}>
            Explore Yukon
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.yknwldexplorerguidCatRow}>
          {yknwldexplorerguidCategories.map(cat => {
            const isActive = cat === yknwldexplorerguidActiveCat;
            const spots =
              cat === 'All'
                ? yknwldexplorerguidPlaces.length
                : yknwldexplorerguidPlaces.filter(p => p.category === cat)
                    .length;

            const catPreviewImg =
              cat === 'All'
                ? undefined
                : (yknwldexplorerguidCatPreviewImgByCat[
                    cat as YknwldexplorerguidCategory
                  ] as never);

            return (
              <TouchableOpacity
                key={cat}
                activeOpacity={0.9}
                onPress={() => setYknwldexplorerguidActiveCat(cat)}
                style={[
                  styles.yknwldexplorerguidCatCard,
                  cat === 'All' && styles.yknwldexplorerguidCatCardAll,
                  isActive
                    ? styles.yknwldexplorerguidCatCardActiveBorder
                    : styles.yknwldexplorerguidCatCardIdleBorder,
                ]}>
                {cat === 'All' ? (
                  <LinearGradient
                    colors={['#00AA4F', '#007A38']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={StyleSheet.absoluteFill}
                  />
                ) : (
                  <ImageBackground
                    source={catPreviewImg ?? undefined}
                    resizeMode="cover"
                    style={StyleSheet.absoluteFill}
                  />
                )}

                <LinearGradient
                  pointerEvents="none"
                  colors={
                    isActive
                      ? ['#00AA4F30', '#0F0C1DBF']
                      : ['#0F0C1D26', '#0F0C1DD9']
                  }
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}
                  style={StyleSheet.absoluteFill}
                />

                <View style={styles.yknwldexplorerguidCatInner}>
                  {cat === 'All' ? (
                    <Image
                      source={require('../../assets/i/yknwldexplocsall.png')}
                    />
                  ) : (
                    <Text style={{fontSize: 24, marginBottom: 4}}>
                      {yknwldexplorerguidGetCatEmoji(cat)}
                    </Text>
                  )}

                  <Text
                    style={[
                      styles.yknwldexplorerguidCatTitle,
                      isActive
                        ? styles.yknwldexplorerguidCatTitleActive
                        : styles.yknwldexplorerguidCatTitleIdle,
                    ]}>
                    {cat.toUpperCase()}
                  </Text>
                  <Text
                    style={[
                      styles.yknwldexplorerguidCatSpots,
                      isActive
                        ? styles.yknwldexplorerguidCatSpotsActive
                        : styles.yknwldexplorerguidCatSpotsIdle,
                    ]}>
                    {spots} spots
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.yknwldexplorerguidListHeader}>
          <Text style={styles.yknwldexplorerguidListTitle}>All Locations</Text>
          <Text style={styles.yknwldexplorerguidListCount}>
            {yknwldexplorerguidFiltered.length} found
          </Text>
        </View>

        <View style={styles.yknwldexplorerguidList}>
          {yknwldexplorerguidFiltered.map(place => {
            const saved = yknwldexplorerguidSavedIds.includes(place.id);
            const catColor = yknwldexplorerguidGetCatColor(place.category);
            return (
              <TouchableOpacity
                key={place.id}
                activeOpacity={0.9}
                onPress={() => yknwldexplorerguidOpenDetails(place.id)}
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
                    activeOpacity={0.85}
                    hitSlop={{top: 12, bottom: 12, left: 12, right: 12}}
                    onPress={() =>
                      yknwldexplorerguidToggleSaveFromList(place.id)
                    }
                    style={styles.yknwldexplorerguidSaveTap}>
                    <Image
                      source={
                        saved
                          ? require('../../assets/i/yknwldexplorcsaved.png')
                          : require('../../assets/i/yknwldexplorcoorsave.png')
                      }
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
      </View>
    </Yknwldexplorerguiddelay>
  );
};

export default Yknwldexplorerguiddeexpl;

const styles = StyleSheet.create({
  yknwldexplorerguidListHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 14,
    paddingHorizontal: 22,
  },
  yknwldexplorerguidListTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },

  yknwldexplorerguidScreenPad: {paddingTop: 70},
  yknwldexplorerguidRoot: {flex: 1, backgroundColor: '#0F0C1D'},
  yknwldexplorerguidContent: {
    paddingTop: 70,
    paddingBottom: 110,
  },
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
  yknwldexplorerguidHeader: {
    marginBottom: 18,
    paddingHorizontal: 22,
  },
  yknwldexplorerguidHeaderKicker: {
    color: '#00AA4F',
    fontSize: 11,
    letterSpacing: 3,
    fontWeight: '600',
    marginBottom: 6,
  },
  yknwldexplorerguidHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  yknwldexplorerguidCatRow: {
    gap: 12,
    paddingRight: 18,
    marginBottom: 18,
    paddingLeft: 22,
  },
  yknwldexplorerguidCatCard: {
    width: 122,
    height: 112,
    borderRadius: 18,
    padding: 10,
    borderWidth: 1,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF0F',
  },
  yknwldexplorerguidCatCardAll: {width: 80},
  yknwldexplorerguidCatCardActiveBorder: {
    borderColor: '#C9A84C66',
  },
  yknwldexplorerguidCatCardIdleBorder: {
    borderColor: '#FFFFFF14',
  },
  yknwldexplorerguidCatInner: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  yknwldexplorerguidCatTitle: {fontSize: 11, fontWeight: '700'},
  yknwldexplorerguidCatTitleActive: {color: '#FFFFFF', fontSize: 11},
  yknwldexplorerguidCatTitleIdle: {color: '#FFFFFFCC'},
  yknwldexplorerguidCatSpots: {marginTop: 3, fontSize: 12, fontWeight: '500'},
  yknwldexplorerguidCatSpotsActive: {color: '#FFFFFFCC', fontSize: 11},
  yknwldexplorerguidCatSpotsIdle: {color: '#FFFFFF66'},

  yknwldexplorerguidListCount: {
    color: '#FFFFFF66',
    fontSize: 13,
    fontWeight: '400',
  },
  yknwldexplorerguidList: {gap: 12},

  yknwldexplorerguidCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1A3ACC',
    borderWidth: 1,
    borderColor: '#FFFFFF12',
    borderRadius: 18,
    overflow: 'hidden',
    width: '84%',
    alignSelf: 'center',

    minHeight: 108,
  },
  yknwldexplorerguidCardRight: {gap: 17, paddingRight: 10},
  yknwldexplorerguidSaveTap: {alignSelf: 'flex-end'},
  yknwldexplorerguidCardImg: {
    width: 100,
    height: '100%',
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },
  yknwldexplorerguidCardBody: {flex: 1, padding: 10},
  yknwldexplorerguidCardTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  yknwldexplorerguidCardSub: {
    color: '#FFFFFF66',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 4,
  },
  yknwldexplorerguidCardCat: {
    marginTop: 6,
    color: '#00AA4F',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
  },
  yknwldexplorerguidCardSave: {
    paddingHorizontal: 12,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  yknwldexplorerguidCardSaveIdle: {borderColor: '#FFFFFF14'},
  yknwldexplorerguidCardSaveActive: {borderColor: '#C9A84C66'},
  yknwldexplorerguidCardSaveText: {
    color: '#FFFFFFCC',
    fontSize: 12,
    fontWeight: '800',
  },
});
