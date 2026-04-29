import RNFS from 'react-native-fs';
import {captureRef} from 'react-native-view-shot';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type ImageSourcePropType,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Yknwldexplorerguiddelay from '../Yknwldexplorerguiddecpn/Yknwldexplorerguiddelay';

import Share from 'react-native-share';

const yknwldexplorerguidCoinsKey = 'yknwldexplorerguid_coin_balance_v1';
const yknwldexplorerguidInitialCoins = 10;
const yknwldexplorerguidUnlockedKey =
  'yknwldexplorerguid_unlocked_wallpapers_v1';

const yknwldexplorerguidWallpaperCost = 4;

type YknwldexplorerguidWallpaper = {
  id: string;
  title: string;
  cost: number;
  image: ImageSourcePropType;
};

const yknwldexplorerguidWallpapers: YknwldexplorerguidWallpaper[] = [
  {
    id: 'w1',
    title: 'Aurora Borealis',
    cost: yknwldexplorerguidWallpaperCost,
    image: require('../../assets/i/yknwldexplogall1.png'),
  },
  {
    id: 'w2',
    title: 'Aurora Borealis',
    cost: yknwldexplorerguidWallpaperCost,
    image: require('../../assets/i/yknwldexplogall2.png'),
  },
  {
    id: 'w3',
    title: 'Aurora Borealis',
    cost: yknwldexplorerguidWallpaperCost,
    image: require('../../assets/i/yknwldexplogall3.png'),
  },
  {
    id: 'w4',
    title: 'Aurora Borealis',
    cost: yknwldexplorerguidWallpaperCost,
    image: require('../../assets/i/yknwldexplogall4.png'),
  },
  {
    id: 'w5',
    title: 'Aurora Borealis',
    cost: yknwldexplorerguidWallpaperCost,
    image: require('../../assets/i/yknwldexplogall5.png'),
  },
  {
    id: 'w6',
    title: 'Aurora Borealis',
    cost: yknwldexplorerguidWallpaperCost,
    image: require('../../assets/i/yknwldexplogall6.png'),
  },
];

function yknwldexplorerguidClampInt(n: number, min: number, max: number) {
  if (!Number.isFinite(n)) {
    return min;
  }
  return Math.min(max, Math.max(min, Math.trunc(n)));
}

async function yknwldexplorerguidGetOrInitCoins(): Promise<number> {
  try {
    const raw = await AsyncStorage.getItem(yknwldexplorerguidCoinsKey);
    if (!raw) {
      await AsyncStorage.setItem(
        yknwldexplorerguidCoinsKey,
        String(yknwldexplorerguidInitialCoins),
      );
      return yknwldexplorerguidInitialCoins;
    }
    return yknwldexplorerguidClampInt(Number.parseInt(raw, 10), 0, 1_000_000);
  } catch {
    return yknwldexplorerguidInitialCoins;
  }
}

async function yknwldexplorerguidSetCoins(next: number): Promise<void> {
  const safe = yknwldexplorerguidClampInt(next, 0, 1_000_000);
  await AsyncStorage.setItem(yknwldexplorerguidCoinsKey, String(safe));
}

async function yknwldexplorerguidGetUnlocked(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(yknwldexplorerguidUnlockedKey);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(x => typeof x === 'string');
  } catch {
    return [];
  }
}

async function yknwldexplorerguidSetUnlocked(ids: string[]): Promise<void> {
  await AsyncStorage.setItem(
    yknwldexplorerguidUnlockedKey,
    JSON.stringify(Array.from(new Set(ids))),
  );
}

const Yknwldexplorerguiddegall = () => {
  const [yknwldexplorerguidCoins, setYknwldexplorerguidCoins] = useState(0);
  const [yknwldexplorerguidUnlocked, setYknwldexplorerguidUnlockedState] =
    useState<string[]>([]);
  const yknwldexplorerguidImageRef = useRef(null);
  const [yknwldexplorerguidSelected, setYknwldexplorerguidSelected] =
    useState<YknwldexplorerguidWallpaper | null>(null);

  const yknwldexplorerguidUnlockedSet = useMemo(
    () => new Set(yknwldexplorerguidUnlocked),
    [yknwldexplorerguidUnlocked],
  );

  useEffect(() => {
    let mounted = true;
    Promise.all([
      yknwldexplorerguidGetOrInitCoins(),
      yknwldexplorerguidGetUnlocked(),
    ]).then(([coins, unlocked]) => {
      if (!mounted) {
        return;
      }
      setYknwldexplorerguidCoins(coins);
      setYknwldexplorerguidUnlockedState(unlocked);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const yknwldexplorerguidOpen = useCallback(
    (w: YknwldexplorerguidWallpaper) => {
      setYknwldexplorerguidSelected(w);
    },
    [],
  );

  const yknwldexplorerguidClose = useCallback(() => {
    setYknwldexplorerguidSelected(null);
  }, []);

  const yknwldexplorerguidUnlock = useCallback(async () => {
    const w = yknwldexplorerguidSelected;
    if (!w) {
      return;
    }
    if (yknwldexplorerguidUnlockedSet.has(w.id)) {
      yknwldexplorerguidClose();
      return;
    }
    if (yknwldexplorerguidCoins < w.cost) {
      return;
    }
    const nextCoins = yknwldexplorerguidCoins - w.cost;
    const nextUnlocked = [...yknwldexplorerguidUnlocked, w.id];
    setYknwldexplorerguidCoins(nextCoins);
    setYknwldexplorerguidUnlockedState(nextUnlocked);
    await Promise.all([
      yknwldexplorerguidSetCoins(nextCoins),
      yknwldexplorerguidSetUnlocked(nextUnlocked),
    ]);
    yknwldexplorerguidClose();
  }, [
    yknwldexplorerguidClose,
    yknwldexplorerguidCoins,
    yknwldexplorerguidSelected,
    yknwldexplorerguidUnlocked,
    yknwldexplorerguidUnlockedSet,
  ]);

  const yknwldexplorerguidShare = async () => {
    try {
      const yknwldexplorerguidTmpUri = await captureRef(
        yknwldexplorerguidImageRef,
        {
          format: 'png',
          quality: 1,
          result: 'tmpfile',
        },
      );

      const yknwldexplorerguidFileUri = yknwldexplorerguidTmpUri.startsWith(
        'file://',
      )
        ? yknwldexplorerguidTmpUri
        : `file://${yknwldexplorerguidTmpUri}`;

      const yknwldexplorerguidPathToCheck = yknwldexplorerguidFileUri.replace(
        'file://',
        '',
      );
      const yknwldexplorerguidExists = await RNFS.exists(
        yknwldexplorerguidPathToCheck,
      );

      if (!yknwldexplorerguidExists) {
        return;
      }

      await Share.open({
        url: yknwldexplorerguidTmpUri,
        type: 'image/png',
        failOnCancel: false,
      });
    } catch (yknwldexplorerguidError: unknown) {
      if (
        yknwldexplorerguidError instanceof Error &&
        !yknwldexplorerguidError.message?.includes('User did not share')
      ) {
        console.error('shareLabbbnnyteasImage error', yknwldexplorerguidError);
      }
    }
  };

  const renderItem = useCallback(
    ({item}: {item: YknwldexplorerguidWallpaper}) => {
      const unlocked = yknwldexplorerguidUnlockedSet.has(item.id);
      return (
        <Pressable
          onPress={() => yknwldexplorerguidOpen(item)}
          style={[
            styles.yknwldexplorerguidCard,
            unlocked ? styles.yknwldexplorerguidCardUnlocked : null,
          ]}>
          <Image
            source={item.image}
            style={styles.yknwldexplorerguidCardImage}
            ref={yknwldexplorerguidImageRef}
          />
          <LinearGradient
            colors={['transparent', 'rgba(15, 12, 29, 0.95)']}
            style={styles.yknwldexplorerguidCardFade}
          />

          {!unlocked ? (
            <View style={styles.yknwldexplorerguidLockBadge}>
              <Image source={require('../../assets/i/yknwldexplolock.png')} />
            </View>
          ) : (
            <View style={styles.yknwldexplorerguidCheckBadge}>
              <Image source={require('../../assets/i/yknwldexplock.png')} />
            </View>
          )}

          {!unlocked ? (
            <View style={styles.yknwldexplorerguidCardBottom}>
              <Text
                numberOfLines={1}
                style={styles.yknwldexplorerguidCardTitle}>
                {item.title}
              </Text>
              <View style={styles.yknwldexplorerguidCardCostRow}>
                <Text style={styles.yknwldexplorerguidCoinText}>🪙</Text>
                <Text style={styles.yknwldexplorerguidCardCostText}>
                  {item.cost} coins
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.yknwldexplorerguidCardActionsRow}>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={yknwldexplorerguidShare}
                style={styles.yknwldexplorerguidCardActionBtn}>
                <Image source={require('../../assets/i/yknwldexplshr.png')} />
              </TouchableOpacity>
            </View>
          )}
        </Pressable>
      );
    },
    [yknwldexplorerguidOpen, yknwldexplorerguidUnlockedSet],
  );

  const selectedUnlocked = yknwldexplorerguidSelected
    ? yknwldexplorerguidUnlockedSet.has(yknwldexplorerguidSelected.id)
    : false;

  return (
    <Yknwldexplorerguiddelay>
      <View style={styles.yknwldexplorerguidRoot}>
        <View style={styles.yknwldexplorerguidHeader}>
          <View style={styles.yknwldexplorerguidFlex1}>
            <Text style={styles.yknwldexplorerguidPremium}>
              PREMIUM COLLECTION
            </Text>
            <View style={styles.yknwldexplorerguidTitleRow}>
              <Text style={styles.yknwldexplorerguidTitle}>Wallpapers</Text>

              <View style={styles.yknwldexplorerguidCoinsPill}>
                <Text style={styles.yknwldexplorerguidCoinText}>🪙</Text>
                <Text style={styles.yknwldexplorerguidCoinsText}>
                  {yknwldexplorerguidCoins}
                </Text>
              </View>
            </View>

            <Text style={styles.yknwldexplorerguidSubtitle}>
              Spend your quiz coins to unlock premium Yukon wallpapers
            </Text>
          </View>
        </View>

        <FlatList
          data={yknwldexplorerguidWallpapers}
          renderItem={renderItem}
          keyExtractor={x => x.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.yknwldexplorerguidGridRow}
          contentContainerStyle={styles.yknwldexplorerguidGrid}
          extraData={yknwldexplorerguidUnlocked}
          showsVerticalScrollIndicator={false}
        />

        <Modal
          statusBarTranslucent={Platform.OS === 'android'}
          transparent
          visible={!!yknwldexplorerguidSelected}
          animationType="fade"
          onRequestClose={yknwldexplorerguidClose}>
          <Pressable
            style={styles.yknwldexplorerguidModalBackdrop}
            onPress={yknwldexplorerguidClose}
          />
          <View style={styles.yknwldexplorerguidSheet}>
            <View style={styles.yknwldexplorerguidSheetHandle} />
            {yknwldexplorerguidSelected ? (
              <>
                <Image
                  source={yknwldexplorerguidSelected.image}
                  style={styles.yknwldexplorerguidSheetImage}
                />
                <Text style={styles.yknwldexplorerguidSheetTitle}>
                  {yknwldexplorerguidSelected.title}
                </Text>

                <Text style={styles.yknwldexplorerguidSheetCost}>
                  🪙{' '}
                  <Text style={styles.yknwldexplorerguidSheetCostBold}>
                    Costs {yknwldexplorerguidSelected.cost} coins
                  </Text>{' '}
                  <Text style={styles.yknwldexplorerguidSheetCostMuted}>
                    (You have: {yknwldexplorerguidCoins})
                  </Text>
                </Text>

                <View style={styles.yknwldexplorerguidSheetBtns}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={yknwldexplorerguidClose}
                    style={styles.yknwldexplorerguidSheetBtnWrap}>
                    <LinearGradient
                      colors={['#2F2861', '#1E1A3A']}
                      style={styles.yknwldexplorerguidSheetBtn}>
                      <Image
                        source={require('../../assets/i/yknwldexplorocls.png')}
                      />
                      <Text style={styles.yknwldexplorerguidSheetBtnText}>
                        Cancel
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={yknwldexplorerguidUnlock}
                    disabled={
                      selectedUnlocked ||
                      yknwldexplorerguidCoins <
                        (yknwldexplorerguidSelected?.cost ?? 0)
                    }
                    style={styles.yknwldexplorerguidSheetBtnWrap}>
                    <LinearGradient
                      colors={
                        selectedUnlocked
                          ? ['#00AA4F', '#007A38']
                          : ['#C9A84C', '#A8822A']
                      }
                      style={[
                        styles.yknwldexplorerguidSheetBtn,
                        selectedUnlocked ||
                        yknwldexplorerguidCoins <
                          (yknwldexplorerguidSelected?.cost ?? 0)
                          ? styles.yknwldexplorerguidDisabled
                          : null,
                      ]}>
                      <Text style={styles.yknwldexplorerguidSheetBtnText}>
                        {selectedUnlocked
                          ? 'Unlocked'
                          : `Unlock 🪙${yknwldexplorerguidSelected.cost}`}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </>
            ) : null}
          </View>
        </Modal>
      </View>
    </Yknwldexplorerguiddelay>
  );
};

const styles = StyleSheet.create({
  yknwldexplorerguidPremium: {
    color: '#C9A84C',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.9,
  },
  yknwldexplorerguidTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    marginTop: 8,
  },

  yknwldexplorerguidFlex1: {flex: 1},
  yknwldexplorerguidDisabled: {opacity: 0.6},
  yknwldexplorerguidRoot: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 70,
    paddingBottom: 110,
  },
  yknwldexplorerguidHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 14,
  },

  yknwldexplorerguidSubtitle: {
    color: '#FFFFFF73',
    fontSize: 13,
    marginTop: 8,
    lineHeight: 18,
  },
  yknwldexplorerguidTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  yknwldexplorerguidCoinsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    height: 38,
    minWidth: 60,
    borderRadius: 12,
    backgroundColor: '#C9A84C26',
    borderWidth: 1,
    borderColor: '#C9A84C59',
  },
  yknwldexplorerguidCoinsText: {
    color: '#C9A84C',
    fontSize: 13,
    fontWeight: '700',
  },
  yknwldexplorerguidCoinText: {fontSize: 12},

  yknwldexplorerguidGrid: {
    paddingTop: 18,
    paddingBottom: 30,
  },
  yknwldexplorerguidGridRow: {gap: 14},
  yknwldexplorerguidCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFFFFF14',
    backgroundColor: '#FFFFFF10',
    marginBottom: 12,
    minHeight: 190,
  },
  yknwldexplorerguidCardUnlocked: {
    borderColor: '#00AA4F80',
    borderWidth: 2,
  },
  yknwldexplorerguidCardImage: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
  },
  yknwldexplorerguidCardFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
  },
  yknwldexplorerguidLockBadge: {
    position: 'absolute',
    top: 65,
    alignSelf: 'center',

    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0F0C1DCC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF33',
  },
  yknwldexplorerguidLockText: {fontSize: 18},
  yknwldexplorerguidCheckBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#00AA4F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  yknwldexplorerguidCheckText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  yknwldexplorerguidCardBottom: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
  },
  yknwldexplorerguidCardTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  yknwldexplorerguidCardCostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  yknwldexplorerguidCardCostText: {
    color: '#C9A84C',
    fontSize: 11,
    fontWeight: '500',
  },
  yknwldexplorerguidCardActionsRow: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
  },
  yknwldexplorerguidCardActionBtn: {
    width: 65,
    height: 28,
    borderRadius: 10,
    backgroundColor: '#2F286180',
    borderWidth: 1,
    borderColor: '#FFFFFF1F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  yknwldexplorerguidCardActionIcon: {
    width: 16,
    height: 16,
    tintColor: '#00AA4F',
  },
  yknwldexplorerguidCardActionIconText: {color: '#00AA4F', fontWeight: '900'},

  yknwldexplorerguidModalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  yknwldexplorerguidSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 28,
    paddingTop: 15,
    paddingBottom: 40,
    backgroundColor: '#1E1A3A',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderWidth: 1,
    borderColor: '#FFFFFF1A',
  },
  yknwldexplorerguidSheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#FFFFFF2B',
    alignSelf: 'center',
    marginBottom: 12,
  },
  yknwldexplorerguidSheetImage: {
    width: '100%',
    height: 140,
    borderRadius: 14,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#FFFFFF14',
  },
  yknwldexplorerguidSheetTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginTop: 14,
  },
  yknwldexplorerguidSheetCost: {marginTop: 10, color: '#C9A84C', fontSize: 13},
  yknwldexplorerguidSheetCostBold: {color: '#C9A84C', fontWeight: '600'},
  yknwldexplorerguidSheetCostMuted: {color: '#FFFFFF73'},
  yknwldexplorerguidSheetBtns: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  yknwldexplorerguidSheetBtnWrap: {flex: 1},
  yknwldexplorerguidSheetBtn: {
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF14',
    flexDirection: 'row',
    gap: 10,
  },
  yknwldexplorerguidSheetBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default Yknwldexplorerguiddegall;
