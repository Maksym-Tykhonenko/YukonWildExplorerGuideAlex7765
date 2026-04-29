import {
  type YknwldexplorerguidFact,
  type YknwldexplorerguidFactsCategory,
  yknwldexplorerguidFacts,
} from '../Yknwldexplorerguiddata/Yknwldexplorerguidfacts';

import {useCallback, useMemo, useState} from 'react';
import {
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Yknwldexplorerguiddelay from '../Yknwldexplorerguiddecpn/Yknwldexplorerguiddelay';

const yknwldexplorerguidGetCatMeta = (
  yknwldexplorerguidCat: YknwldexplorerguidFactsCategory,
) => {
  switch (yknwldexplorerguidCat) {
    case 'Nature':
      return {emoji: '🌿', color: '#00AA4F'};
    case 'Life':
      return {emoji: '🏔️', color: '#8A63FF'};
    case 'History':
      return {emoji: '📜', color: '#C9A84C'};
    default:
      return {emoji: '🧭', color: '#00AA4F'};
  }
};

const yknwldexplorerguidGetFactEmoji = (yknwldexplorerguidTitle: string) => {
  const yknwldexplorerguidT = yknwldexplorerguidTitle.toLowerCase();
  if (yknwldexplorerguidT.includes('aurora')) {
    return '🌌';
  }
  if (yknwldexplorerguidT.includes('river')) {
    return '🌊';
  }
  if (yknwldexplorerguidT.includes('glacier')) {
    return '🧊';
  }
  if (yknwldexplorerguidT.includes('forest')) {
    return '🌲';
  }
  if (
    yknwldexplorerguidT.includes('wildlife') ||
    yknwldexplorerguidT.includes('animal')
  ) {
    return '🦌';
  }
  if (yknwldexplorerguidT.includes('air')) {
    return '💨';
  }
  if (yknwldexplorerguidT.includes('lake')) {
    return '❄️';
  }
  if (yknwldexplorerguidT.includes('population')) {
    return '👥';
  }
  if (yknwldexplorerguidT.includes('community')) {
    return '🤝';
  }
  if (yknwldexplorerguidT.includes('culture')) {
    return '🪶';
  }
  if (yknwldexplorerguidT.includes('transport')) {
    return '🛷';
  }
  if (yknwldexplorerguidT.includes('gold')) {
    return '⛏️';
  }
  if (yknwldexplorerguidT.includes('trail')) {
    return '🥾';
  }
  if (yknwldexplorerguidT.includes('building')) {
    return '🏚️';
  }
  return '✨';
};

const Yknwldexplorerguiddefcts = () => {
  const yknwldexplorerguidCategories = useMemo(
    () => ['Nature', 'Life', 'History'] as const,
    [],
  );

  const [yknwldexplorerguidActiveCat, setYknwldexplorerguidActiveCat] =
    useState<YknwldexplorerguidFactsCategory>('Nature');

  const yknwldexplorerguidFiltered = useMemo(() => {
    return yknwldexplorerguidFacts.filter(
      f => f.category === yknwldexplorerguidActiveCat,
    );
  }, [yknwldexplorerguidActiveCat]);

  const yknwldexplorerguidShareFact = useCallback(
    async (yknwldexplorerguidFact: YknwldexplorerguidFact) => {
      await Share.share({
        title: yknwldexplorerguidFact.title,
        message: `${yknwldexplorerguidFact.title}\n\n${yknwldexplorerguidFact.body}`,
      });
    },
    [],
  );

  const yknwldexplorerguidRandomize = useCallback(() => {
    const yknwldexplorerguidIdx = Math.floor(
      Math.random() * yknwldexplorerguidCategories.length,
    );
    setYknwldexplorerguidActiveCat(
      yknwldexplorerguidCategories[yknwldexplorerguidIdx],
    );
  }, [yknwldexplorerguidCategories]);

  return (
    <Yknwldexplorerguiddelay>
      <View style={styles.yknwldexplorerguidScreenPad}>
        <View style={styles.yknwldexplorerguidHeaderRow}>
          <View style={styles.yknwldexplorerguidHeaderText}>
            <Text style={styles.yknwldexplorerguidKicker}>DID YOU KNOW?</Text>
            <Text style={styles.yknwldexplorerguidTitle}>Yukon Facts</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={yknwldexplorerguidRandomize}
            style={styles.yknwldexplorerguidRandomBtn}>
            <Image source={require('../../assets/i/yknwldexplorand.png')} />
            <Text style={styles.yknwldexplorerguidRandomText}>Random</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.yknwldexplorerguidTabsRow}>
          {yknwldexplorerguidCategories.map(cat => {
            const yknwldexplorerguidMeta = yknwldexplorerguidGetCatMeta(cat);
            const yknwldexplorerguidActive =
              cat === yknwldexplorerguidActiveCat;
            const yknwldexplorerguidTabBorder = yknwldexplorerguidActive
              ? yknwldexplorerguidMeta.color
              : '#FFFFFF14';

            return (
              <TouchableOpacity
                key={cat}
                activeOpacity={0.9}
                onPress={() => setYknwldexplorerguidActiveCat(cat)}
                style={[
                  styles.yknwldexplorerguidTab,
                  {
                    borderColor: yknwldexplorerguidTabBorder,
                  },
                ]}>
                <LinearGradient
                  colors={
                    yknwldexplorerguidActive
                      ? ['#00AA4F33', '#00AA4F0D']
                      : ['#1E1A3A99', '#1E1A3A99']
                  }
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.yknwldexplorerguidTabGrad}>
                  <View
                    style={{
                      padding: 16,
                      justifyContent: 'space-between',
                      flex: 1,
                    }}>
                    <Text style={styles.yknwldexplorerguidTabEmoji}>
                      {yknwldexplorerguidMeta.emoji}
                    </Text>
                    <View>
                      <Text
                        style={[
                          styles.yknwldexplorerguidTabLabel,
                          yknwldexplorerguidActive
                            ? {color: yknwldexplorerguidMeta.color}
                            : styles.yknwldexplorerguidTabLabelIdle,
                        ]}>
                        {cat}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.yknwldexplorerguidList}>
          {yknwldexplorerguidFiltered.map(fact => {
            const yknwldexplorerguidMeta = yknwldexplorerguidGetCatMeta(
              fact.category,
            );

            return (
              <LinearGradient
                key={fact.id}
                colors={['#00AA4F33', '#00AA4F0D']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.yknwldexplorerguidCard}>
                <View style={[styles.yknwldexplorerguidCardAccent]} />

                <View style={styles.yknwldexplorerguidCardInner}>
                  <View style={styles.yknwldexplorerguidCardHeader}>
                    <Text style={styles.yknwldexplorerguidCardIcon}>
                      {yknwldexplorerguidGetFactEmoji(fact.title)}
                    </Text>
                    <Text style={styles.yknwldexplorerguidCardTitle}>
                      {fact.title}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => yknwldexplorerguidShareFact(fact)}
                      style={[styles.yknwldexplorerguidShareBtn]}>
                      <Image
                        source={require('../../assets/i/yknwldexplshr.png')}
                        style={styles.yknwldexplorerguidShareIcon}
                        tintColor="#00AA4F"
                      />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.yknwldexplorerguidCardBody}>
                    {fact.body}
                  </Text>

                  <Text
                    style={[
                      styles.yknwldexplorerguidCardFooter,
                      {color: yknwldexplorerguidMeta.color},
                    ]}>
                    {fact.category.toUpperCase()}
                  </Text>
                </View>
              </LinearGradient>
            );
          })}
        </View>
      </View>
    </Yknwldexplorerguiddelay>
  );
};

export default Yknwldexplorerguiddefcts;

const styles = StyleSheet.create({
  yknwldexplorerguidKicker: {
    color: '#A78BFA',
    fontSize: 10,
    letterSpacing: 3,
    fontWeight: '700',
    marginBottom: 8,
  },
  yknwldexplorerguidTitle: {color: '#FFFFFF', fontSize: 28, fontWeight: '800'},

  yknwldexplorerguidRandomBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#A78BFA26',
    borderWidth: 1,
    borderColor: '#A78BFA4D',
  },

  yknwldexplorerguidScreenPad: {
    paddingTop: 70,
    paddingHorizontal: 22,
    paddingBottom: 110,
  },
  yknwldexplorerguidHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  yknwldexplorerguidHeaderText: {flex: 1, paddingRight: 12},

  yknwldexplorerguidRandomIcon: {fontSize: 14},
  yknwldexplorerguidRandomText: {
    color: '#A78BFA',
    fontSize: 12,
    fontWeight: '600',
  },

  yknwldexplorerguidTabsRow: {
    gap: 12,
    marginBottom: 16,
    flexDirection: 'row',
  },
  yknwldexplorerguidTab: {
    flex: 1,
    minHeight: 92,
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  yknwldexplorerguidTabGrad: {
    flex: 1,

    justifyContent: 'space-between',
  },
  yknwldexplorerguidTabEmoji: {textAlign: 'center', fontSize: 18},
  yknwldexplorerguidTabLabel: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '500',
  },
  yknwldexplorerguidTabLabelIdle: {color: '#FFFFFF66'},
  yknwldexplorerguidTabUnderline: {
    height: 3,
    borderRadius: 999,
    marginTop: 6,
    width: 20,
    alignSelf: 'center',
  },
  yknwldexplorerguidTabUnderlineSpacer: {height: 3, marginTop: 6, width: 8},

  yknwldexplorerguidList: {gap: 12, marginTop: 10},
  yknwldexplorerguidCard: {
    flexDirection: 'row',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#FFFFFF12',
    overflow: 'hidden',
  },
  yknwldexplorerguidCardAccent: {width: 6},
  yknwldexplorerguidCardInner: {flex: 1, padding: 14},
  yknwldexplorerguidCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  yknwldexplorerguidCardIcon: {fontSize: 16, width: 22, textAlign: 'center'},
  yknwldexplorerguidCardTitle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  yknwldexplorerguidShareBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00AA4F22',
    borderWidth: 1,
    borderColor: '#00AA4F44',
  },
  yknwldexplorerguidShareIcon: {width: 16, height: 16, tintColor: '#FFFFFF'},
  yknwldexplorerguidCardBody: {
    marginTop: 10,
    color: '#FFFFFFB2',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 19,
    width: '90%',
  },
  yknwldexplorerguidCardFooter: {
    marginTop: 12,
    fontSize: 10,
    fontWeight: '600',
  },
});
