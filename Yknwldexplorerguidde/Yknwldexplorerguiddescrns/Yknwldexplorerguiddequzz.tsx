import Yknwldexplorerguiddelay from '../Yknwldexplorerguiddecpn/Yknwldexplorerguiddelay';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Image,
  Pressable,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type YknwldexplorerguidQuizOption = {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
};

type YknwldexplorerguidQuizQuestion = {
  id: string;
  question: string;
  options: [
    YknwldexplorerguidQuizOption,
    YknwldexplorerguidQuizOption,
    YknwldexplorerguidQuizOption,
    YknwldexplorerguidQuizOption,
  ];
  correctOptionId: YknwldexplorerguidQuizOption['id'];
};

const yknwldexplorerguidCoinsKey = 'yknwldexplorerguid_coin_balance_v1';
const yknwldexplorerguidInitialCoins = 10;
const yknwldexplorerguidSecondsPerQuestion = 15;
const yknwldexplorerguidCoinsPerCorrect = 2;
const yknwldexplorerguidQuestionsPerRun = 5;

const yknwldexplorerguidQuestions: YknwldexplorerguidQuizQuestion[] = [
  {
    id: 'q1',
    question: 'What is Yukon?',
    options: [
      {id: 'A', text: 'City'},
      {id: 'B', text: 'Province'},
      {id: 'C', text: 'Island'},
      {id: 'D', text: 'Territory'},
    ],
    correctOptionId: 'D',
  },
  {
    id: 'q2',
    question: 'In which country is Yukon located?',
    options: [
      {id: 'A', text: 'United States'},
      {id: 'B', text: 'Canada'},
      {id: 'C', text: 'Mexico'},
      {id: 'D', text: 'Greenland'},
    ],
    correctOptionId: 'B',
  },
  {
    id: 'q3',
    question: 'The capital of Yukon is:',
    options: [
      {id: 'A', text: 'Dawson City'},
      {id: 'B', text: 'Vancouver'},
      {id: 'C', text: 'Whitehorse'},
      {id: 'D', text: 'Ottawa'},
    ],
    correctOptionId: 'C',
  },
  {
    id: 'q4',
    question: 'What is the most common natural phenomenon in Yukon?',
    options: [
      {id: 'A', text: 'Tornado'},
      {id: 'B', text: 'Volcanic eruptions'},
      {id: 'C', text: 'Tsunami'},
      {id: 'D', text: 'Northern lights'},
    ],
    correctOptionId: 'D',
  },
  {
    id: 'q5',
    question: 'What is the average temperature in Yukon in winter?',
    options: [
      {id: 'A', text: '0°C'},
      {id: 'B', text: '-10°C'},
      {id: 'C', text: '-20°C'},
      {id: 'D', text: '-40°C and below'},
    ],
    correctOptionId: 'D',
  },
  {
    id: 'q6',
    question: 'What makes Yukon popular among tourists?',
    options: [
      {id: 'A', text: 'Large cities'},
      {id: 'B', text: 'Beaches'},
      {id: 'C', text: 'Wildlife'},
      {id: 'D', text: 'Skyscrapers'},
    ],
    correctOptionId: 'C',
  },
  {
    id: 'q7',
    question: 'Which river is one of the main ones in Yukon?',
    options: [
      {id: 'A', text: 'Amazon'},
      {id: 'B', text: 'Nile'},
      {id: 'C', text: 'Mississippi'},
      {id: 'D', text: 'Yukon River'},
    ],
    correctOptionId: 'D',
  },
  {
    id: 'q8',
    question: 'What happened in Yukon in the 19th century?',
    options: [
      {id: 'A', text: 'War'},
      {id: 'B', text: 'Earthquake'},
      {id: 'C', text: 'Gold rush'},
      {id: 'D', text: 'Construction of the capital'},
    ],
    correctOptionId: 'C',
  },
  {
    id: 'q9',
    question: 'Which city is associated with the gold rush?',
    options: [
      {id: 'A', text: 'Toronto'},
      {id: 'B', text: 'Calgary'},
      {id: 'C', text: 'Dawson City'},
      {id: 'D', text: 'Montreal'},
    ],
    correctOptionId: 'C',
  },
  {
    id: 'q10',
    question: 'What kind of nature prevails in Yukon?',
    options: [
      {id: 'A', text: 'Jungle'},
      {id: 'B', text: 'Desert'},
      {id: 'C', text: 'Savannah'},
      {id: 'D', text: 'Taiga and mountains'},
    ],
    correctOptionId: 'D',
  },
  {
    id: 'q11',
    question: 'What is characteristic of summer in Yukon?',
    options: [
      {id: 'A', text: 'Short days'},
      {id: 'B', text: 'Heavy rains'},
      {id: 'C', text: 'Very long days'},
      {id: 'D', text: 'Constant snow'},
    ],
    correctOptionId: 'C',
  },
  {
    id: 'q12',
    question: 'What does “Midnight Sun” mean?',
    options: [
      {id: 'A', text: 'The sun in winter'},
      {id: 'B', text: "The sun that doesn't shine"},
      {id: 'C', text: 'The sun that hardly sets at night'},
      {id: 'D', text: 'The sun that is red'},
    ],
    correctOptionId: 'C',
  },
  {
    id: 'q13',
    question: 'What animals live in the Yukon?',
    options: [
      {id: 'A', text: 'Lions'},
      {id: 'B', text: 'Kangaroos'},
      {id: 'C', text: 'Pandas'},
      {id: 'D', text: 'Moose and bears'},
    ],
    correctOptionId: 'D',
  },
  {
    id: 'q14',
    question: 'What is often used to get around in winter?',
    options: [
      {id: 'A', text: 'Bicycles'},
      {id: 'B', text: 'Buses'},
      {id: 'C', text: 'Planes'},
      {id: 'D', text: 'Snowmobiles'},
    ],
    correctOptionId: 'D',
  },
  {
    id: 'q15',
    question: 'Why is the air in the Yukon very clean?',
    options: [
      {id: 'A', text: 'Because of the ocean'},
      {id: 'B', text: 'Because of the rain'},
      {id: 'C', text: 'Few cities and factories'},
      {id: 'D', text: 'Because of the heat'},
    ],
    correctOptionId: 'C',
  },
  {
    id: 'q16',
    question: 'What can you do on the rivers of the Yukon?',
    options: [
      {id: 'A', text: 'Surfing'},
      {id: 'B', text: 'Diving'},
      {id: 'C', text: 'Canoeing and rafting'},
      {id: 'D', text: 'Skiing'},
    ],
    correctOptionId: 'C',
  },
  {
    id: 'q17',
    question: 'What park is in the Yukon?',
    options: [
      {id: 'A', text: 'Yellowstone'},
      {id: 'B', text: 'Banff'},
      {id: 'C', text: 'Jasper'},
      {id: 'D', text: 'Kluane'},
    ],
    correctOptionId: 'D',
  },
  {
    id: 'q18',
    question: 'What freezes in the Yukon in winter?',
    options: [
      {id: 'A', text: 'Mountains'},
      {id: 'B', text: 'Air'},
      {id: 'C', text: 'Lakes and rivers'},
      {id: 'D', text: 'Forests'},
    ],
    correctOptionId: 'C',
  },
  {
    id: 'q19',
    question: 'How many people live in the Yukon?',
    options: [
      {id: 'A', text: 'Millions'},
      {id: 'B', text: 'Tens of millions'},
      {id: 'C', text: 'Less than 50 thousand'},
      {id: 'D', text: 'More than 10 million'},
    ],
    correctOptionId: 'C',
  },
  {
    id: 'q20',
    question: 'What is the main feature of the Yukon?',
    options: [
      {id: 'A', text: 'Large cities'},
      {id: 'B', text: 'Developed industry'},
      {id: 'C', text: 'Tourist beaches'},
      {id: 'D', text: 'Wild and untouched nature'},
    ],
    correctOptionId: 'D',
  },
];

function yknwldexplorerguidClampInt(n: number, min: number, max: number) {
  if (!Number.isFinite(n)) {
    return min;
  }
  return Math.min(max, Math.max(min, Math.trunc(n)));
}

function yknwldexplorerguidShuffle<T>(input: T[]): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

async function yknwldexplorerguidGetCoinsBalance(): Promise<number> {
  try {
    const raw = await AsyncStorage.getItem(yknwldexplorerguidCoinsKey);
    if (!raw) {
      await AsyncStorage.setItem(
        yknwldexplorerguidCoinsKey,
        String(yknwldexplorerguidInitialCoins),
      );
      return yknwldexplorerguidInitialCoins;
    }
    const parsed = Number.parseInt(raw, 10);
    return yknwldexplorerguidClampInt(parsed, 0, 1_000_000);
  } catch {
    return yknwldexplorerguidInitialCoins;
  }
}

async function yknwldexplorerguidSetCoinsBalance(next: number): Promise<void> {
  const safe = yknwldexplorerguidClampInt(next, 0, 1_000_000);
  await AsyncStorage.setItem(yknwldexplorerguidCoinsKey, String(safe));
}

const Yknwldexplorerguiddequzz = () => {
  const [yknwldexplorerguidPhase, setYknwldexplorerguidPhase] = useState<
    'intro' | 'question' | 'result'
  >('intro');

  const [yknwldexplorerguidBalance, setYknwldexplorerguidBalance] = useState(0);
  const [yknwldexplorerguidIdx, setYknwldexplorerguidIdx] = useState(0);
  const [yknwldexplorerguidRunQuestions, setYknwldexplorerguidRunQuestions] =
    useState<YknwldexplorerguidQuizQuestion[]>([]);

  const [yknwldexplorerguidSecondsLeft, setYknwldexplorerguidSecondsLeft] =
    useState(yknwldexplorerguidSecondsPerQuestion);

  const [yknwldexplorerguidSelected, setYknwldexplorerguidSelected] = useState<
    YknwldexplorerguidQuizOption['id'] | null
  >(null);
  const [yknwldexplorerguidRevealed, setYknwldexplorerguidRevealed] =
    useState(false);

  const [yknwldexplorerguidCorrectCount, setYknwldexplorerguidCorrectCount] =
    useState(0);
  const yknwldexplorerguidCorrectCountRef = useRef(0);

  const yknwldexplorerguidTimerRef = useRef<ReturnType<
    typeof setInterval
  > | null>(null);

  const yknwldexplorerguidTotal = yknwldexplorerguidRunQuestions.length;
  const yknwldexplorerguidQuestion =
    yknwldexplorerguidRunQuestions[yknwldexplorerguidIdx];
  const yknwldexplorerguidTimeRatio =
    yknwldexplorerguidSecondsPerQuestion > 0
      ? Math.min(
          1,
          Math.max(
            0,
            yknwldexplorerguidSecondsLeft /
              yknwldexplorerguidSecondsPerQuestion,
          ),
        )
      : 0;

  const yknwldexplorerguidRunCoins = useMemo(
    () => yknwldexplorerguidCorrectCount * yknwldexplorerguidCoinsPerCorrect,
    [yknwldexplorerguidCorrectCount],
  );

  const yknwldexplorerguidStars = useMemo(() => {
    const ratio =
      yknwldexplorerguidTotal > 0
        ? yknwldexplorerguidCorrectCount / yknwldexplorerguidTotal
        : 0;
    return yknwldexplorerguidClampInt(Math.round(ratio * 5), 0, 5);
  }, [yknwldexplorerguidCorrectCount, yknwldexplorerguidTotal]);

  useEffect(() => {
    yknwldexplorerguidCorrectCountRef.current = yknwldexplorerguidCorrectCount;
  }, [yknwldexplorerguidCorrectCount]);

  useEffect(() => {
    let mounted = true;
    yknwldexplorerguidGetCoinsBalance().then(v => {
      if (mounted) {
        setYknwldexplorerguidBalance(v);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const yknwldexplorerguidStopTimer = useCallback(() => {
    if (yknwldexplorerguidTimerRef.current) {
      clearInterval(yknwldexplorerguidTimerRef.current);
      yknwldexplorerguidTimerRef.current = null;
    }
  }, []);

  const yknwldexplorerguidStartTimer = useCallback(() => {
    yknwldexplorerguidStopTimer();
    setYknwldexplorerguidSecondsLeft(yknwldexplorerguidSecondsPerQuestion);
    yknwldexplorerguidTimerRef.current = setInterval(() => {
      setYknwldexplorerguidSecondsLeft(prev => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [yknwldexplorerguidStopTimer]);

  useEffect(() => {
    if (yknwldexplorerguidPhase !== 'question') {
      yknwldexplorerguidStopTimer();
      return;
    }
    if (yknwldexplorerguidSecondsLeft === 0 && !yknwldexplorerguidRevealed) {
      setYknwldexplorerguidRevealed(true);
      yknwldexplorerguidStopTimer();
    }
  }, [
    yknwldexplorerguidPhase,
    yknwldexplorerguidSecondsLeft,
    yknwldexplorerguidRevealed,
    yknwldexplorerguidStopTimer,
  ]);

  useEffect(() => {
    return () => {
      yknwldexplorerguidStopTimer();
    };
  }, [yknwldexplorerguidStopTimer]);

  const yknwldexplorerguidResetRun = useCallback(() => {
    setYknwldexplorerguidIdx(0);
    setYknwldexplorerguidRunQuestions([]);
    setYknwldexplorerguidSelected(null);
    setYknwldexplorerguidRevealed(false);
    setYknwldexplorerguidCorrectCount(0);
    setYknwldexplorerguidSecondsLeft(yknwldexplorerguidSecondsPerQuestion);
  }, []);

  const yknwldexplorerguidStartQuiz = useCallback(() => {
    const nextRunQuestions = yknwldexplorerguidShuffle(
      yknwldexplorerguidQuestions,
    ).slice(
      0,
      Math.min(
        yknwldexplorerguidQuestionsPerRun,
        yknwldexplorerguidQuestions.length,
      ),
    );
    setYknwldexplorerguidIdx(0);
    setYknwldexplorerguidRunQuestions(nextRunQuestions);
    setYknwldexplorerguidSelected(null);
    setYknwldexplorerguidRevealed(false);
    setYknwldexplorerguidCorrectCount(0);
    setYknwldexplorerguidSecondsLeft(yknwldexplorerguidSecondsPerQuestion);
    setYknwldexplorerguidPhase('question');
    yknwldexplorerguidStartTimer();
  }, [yknwldexplorerguidStartTimer]);

  const yknwldexplorerguidSelect = useCallback(
    (id: YknwldexplorerguidQuizOption['id']) => {
      if (yknwldexplorerguidRevealed) {
        return;
      }
      if (!yknwldexplorerguidQuestion) {
        return;
      }
      setYknwldexplorerguidSelected(id);
      setYknwldexplorerguidRevealed(true);
      yknwldexplorerguidStopTimer();
      if (id === yknwldexplorerguidQuestion.correctOptionId) {
        setYknwldexplorerguidCorrectCount(prev => prev + 1);
      }
    },
    [
      yknwldexplorerguidQuestion,
      yknwldexplorerguidRevealed,
      yknwldexplorerguidStopTimer,
    ],
  );

  const yknwldexplorerguidGoNext = useCallback(async () => {
    if (yknwldexplorerguidTotal === 0) {
      return;
    }
    const isLast = yknwldexplorerguidIdx >= yknwldexplorerguidTotal - 1;
    if (!isLast) {
      setYknwldexplorerguidIdx(prev => prev + 1);
      setYknwldexplorerguidSelected(null);
      setYknwldexplorerguidRevealed(false);
      setYknwldexplorerguidSecondsLeft(yknwldexplorerguidSecondsPerQuestion);
      yknwldexplorerguidStartTimer();
      return;
    }

    const earned =
      yknwldexplorerguidCorrectCountRef.current *
      yknwldexplorerguidCoinsPerCorrect;
    const nextBalance = yknwldexplorerguidBalance + earned;
    setYknwldexplorerguidBalance(nextBalance);
    await yknwldexplorerguidSetCoinsBalance(nextBalance);
    setYknwldexplorerguidPhase('result');
  }, [
    yknwldexplorerguidBalance,
    yknwldexplorerguidIdx,
    yknwldexplorerguidStartTimer,
    yknwldexplorerguidTotal,
  ]);

  const yknwldexplorerguidShare = useCallback(async () => {
    const message = `Quiz result: ${yknwldexplorerguidCorrectCount}/${yknwldexplorerguidTotal} correct. Earned: +${yknwldexplorerguidRunCoins} coins.`;
    try {
      await Share.share({message});
    } catch {
      console.log('error');
    }
  }, [
    yknwldexplorerguidCorrectCount,
    yknwldexplorerguidRunCoins,
    yknwldexplorerguidTotal,
  ]);

  const yknwldexplorerguidBackToIntro = useCallback(() => {
    yknwldexplorerguidResetRun();
    setYknwldexplorerguidPhase('intro');
  }, [yknwldexplorerguidResetRun]);

  const yknwldexplorerguidHeader = (
    <View style={styles.yknwldexplorerguidHeader}>
      <View style={styles.yknwldexplorerguidHeaderTopRow}>
        <Text style={styles.yknwldexplorerguidProgressText}>
          {yknwldexplorerguidPhase === 'question'
            ? `${yknwldexplorerguidIdx + 1} / ${yknwldexplorerguidTotal}`
            : ''}
        </Text>

        {yknwldexplorerguidPhase === 'question' ? (
          <View style={styles.yknwldexplorerguidTimerStack}>
            <View style={styles.yknwldexplorerguidTimerPill}>
              <Image
                source={require('../../assets/i/yknwldexplortmr.png')}
                style={styles.yknwldexplorerguidTimerIcon}
              />
              <Text style={styles.yknwldexplorerguidTimerText}>
                {yknwldexplorerguidSecondsLeft}s
              </Text>
            </View>
          </View>
        ) : null}
        <View style={styles.yknwldexplorerguidCoinsPill}>
          <Text style={styles.yknwldexplorerguidCoinEmoji12}>🪙</Text>
          <Text style={styles.yknwldexplorerguidCoinsText}>
            {yknwldexplorerguidPhase === 'question'
              ? yknwldexplorerguidRunCoins
              : yknwldexplorerguidBalance}
          </Text>
        </View>
      </View>
      <View style={styles.yknwldexplorerguidTimerBarTrack}>
        <View
          style={[
            styles.yknwldexplorerguidTimerBarFill,
            {width: `${Math.round(yknwldexplorerguidTimeRatio * 100)}%`},
          ]}
        />
      </View>
    </View>
  );

  return (
    <Yknwldexplorerguiddelay>
      <View style={styles.yknwldexplorerguidOverlay}>
        {yknwldexplorerguidPhase === 'intro' ? (
          <View style={styles.yknwldexplorerguidIntroWrap}>
            {/* {yknwldexplorerguidHeader} */}

            <View style={styles.yknwldexplorerguidIntroTop}>
              <View style={styles.yknwldexplorerguidIntroTag}>
                <Text style={styles.yknwldexplorerguidIntroTagText}>
                  🏆 KNOWLEDGE CHALLENGE
                </Text>
              </View>

              <View style={styles.yknwldexplorerguidIntroEthanRow}>
                <Image source={require('../../assets/i/yknwldexplotmr.png')} />
                <View style={styles.yknwldexplorerguidFlex1}>
                  <Text style={styles.yknwldexplorerguidIntroEthanTitle}>
                    ETHAN SAYS
                  </Text>
                  <Text style={styles.yknwldexplorerguidIntroEthanSub}>
                    Ready to test your Yukon knowledge?
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.yknwldexplorerguidIntroTitleWrap}>
              <Text style={styles.yknwldexplorerguidIntroTitle}>
                Yukon Quiz
              </Text>
              <Text style={styles.yknwldexplorerguidIntroSubtitle}>
                Prove your knowledge of Canada's most spectacular territory.
                Answer quickly to earn maximum points!
              </Text>
            </View>

            <View style={styles.yknwldexplorerguidIntroCards}>
              <View style={styles.yknwldexplorerguidIntroCard}>
                <Text style={styles.yknwldexplorerguidEmoji24}>❓</Text>

                <View>
                  <Text style={styles.yknwldexplorerguidIntroCardTitle}>
                    {yknwldexplorerguidQuestionsPerRun} Questions
                  </Text>
                  <Text style={styles.yknwldexplorerguidIntroCardSub}>
                    Covering Yukon history, geography & culture
                  </Text>
                </View>
              </View>
              <View style={styles.yknwldexplorerguidIntroCard}>
                <Text style={styles.yknwldexplorerguidEmoji24}>⏱️</Text>
                <View>
                  <Text style={styles.yknwldexplorerguidIntroCardTitle}>
                    {yknwldexplorerguidSecondsPerQuestion} Seconds Each
                  </Text>
                  <Text style={styles.yknwldexplorerguidIntroCardSub}>
                    The clock is ticking — trust your instincts
                  </Text>
                </View>
              </View>
              <View style={styles.yknwldexplorerguidIntroCard}>
                <Text style={styles.yknwldexplorerguidEmoji24}>💰</Text>
                <View>
                  <Text style={styles.yknwldexplorerguidIntroCardTitle}>
                    +{yknwldexplorerguidCoinsPerCorrect} Points per Correct
                  </Text>
                  <Text style={styles.yknwldexplorerguidIntroCardSub}>
                    Earn coins to unlock exclusive wallpapers
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.yknwldexplorerguidIntroBalance}>
              <Text style={styles.yknwldexplorerguidEmoji24}>🪙</Text>
              <Text style={styles.yknwldexplorerguidIntroBalanceText}>
                Your balance: {yknwldexplorerguidBalance} coins
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={yknwldexplorerguidStartQuiz}
              style={styles.yknwldexplorerguidMt18}>
              <LinearGradient
                colors={['#2F2861', '#1A1045']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.yknwldexplorerguidPrimaryBtn}>
                <Image source={require('../../assets/i/yknwldexplorth.png')} />
                <Text style={styles.yknwldexplorerguidPrimaryBtnText}>
                  Start Quiz
                </Text>
                <Image
                  source={require('../../assets/i/yknwldexplotnext.png')}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : null}

        {yknwldexplorerguidPhase === 'question' ? (
          <View style={styles.yknwldexplorerguidQuestionWrap}>
            {yknwldexplorerguidHeader}

            <View style={styles.yknwldexplorerguidQuestionCard}>
              <Text style={styles.yknwldexplorerguidQuestionLabel}>
                QUESTION {yknwldexplorerguidIdx + 1}
              </Text>
              <Text style={styles.yknwldexplorerguidQuestionText}>
                {yknwldexplorerguidQuestion?.question ?? ''}
              </Text>
            </View>

            <View style={styles.yknwldexplorerguidOptionsWrap}>
              {(yknwldexplorerguidQuestion?.options ?? []).map(opt => {
                const isCorrect =
                  opt.id === yknwldexplorerguidQuestion?.correctOptionId;
                const isSelected = opt.id === yknwldexplorerguidSelected;
                const showCorrect = yknwldexplorerguidRevealed && isCorrect;
                const showWrong =
                  yknwldexplorerguidRevealed && isSelected && !isCorrect;

                return (
                  <Pressable
                    key={opt.id}
                    onPress={() => yknwldexplorerguidSelect(opt.id)}
                    style={({pressed}) => [
                      styles.yknwldexplorerguidOption,
                      pressed && !yknwldexplorerguidRevealed
                        ? {opacity: 0.9}
                        : null,
                      showCorrect
                        ? styles.yknwldexplorerguidOptionCorrect
                        : null,
                      showWrong ? styles.yknwldexplorerguidOptionWrong : null,
                    ]}>
                    <View style={styles.yknwldexplorerguidOptionLeft}>
                      <View
                        style={[
                          styles.yknwldexplorerguidOptionLetter,
                          showCorrect
                            ? styles.yknwldexplorerguidOptionLetterCorrect
                            : null,
                          showWrong
                            ? styles.yknwldexplorerguidOptionLetterWrong
                            : null,
                        ]}>
                        <Text style={styles.yknwldexplorerguidOptionLetterText}>
                          {opt.id}
                        </Text>
                      </View>
                      <Text style={styles.yknwldexplorerguidOptionText}>
                        {opt.text}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>

            {yknwldexplorerguidRevealed ? (
              <View style={styles.yknwldexplorerguidFeedbackBottomWrap}>
                <View
                  style={[
                    styles.yknwldexplorerguidFeedback,
                    yknwldexplorerguidSelected ===
                    yknwldexplorerguidQuestion?.correctOptionId
                      ? styles.yknwldexplorerguidFeedbackOk
                      : styles.yknwldexplorerguidFeedbackBad,
                  ]}>
                  <Text
                    style={[
                      styles.yknwldexplorerguidFeedbackText,
                      yknwldexplorerguidSelected ===
                      yknwldexplorerguidQuestion?.correctOptionId
                        ? styles.yknwldexplorerguidFeedbackTextOk
                        : styles.yknwldexplorerguidFeedbackTextBad,
                    ]}>
                    {yknwldexplorerguidSelected ===
                    yknwldexplorerguidQuestion?.correctOptionId ? (
                      <Text style={styles.yknwldexplorerguidOptionMark}>
                        🎉{'  '}
                      </Text>
                    ) : null}
                    {yknwldexplorerguidSelected !==
                    yknwldexplorerguidQuestion?.correctOptionId ? (
                      <Text style={styles.yknwldexplorerguidOptionMark}>
                        ❌{'  '}
                      </Text>
                    ) : null}
                    {yknwldexplorerguidSelected ===
                    yknwldexplorerguidQuestion?.correctOptionId
                      ? `Correct! +${yknwldexplorerguidCoinsPerCorrect} coins earned`
                      : 'Not quite!'}
                  </Text>
                </View>
              </View>
            ) : null}

            {yknwldexplorerguidRevealed && (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={yknwldexplorerguidGoNext}
                disabled={!yknwldexplorerguidRevealed}
                style={styles.yknwldexplorerguidMt14}>
                <LinearGradient
                  colors={['#2F2861', '#1E1A3A']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={[
                    styles.yknwldexplorerguidSecondaryBtn,
                    !yknwldexplorerguidRevealed
                      ? styles.yknwldexplorerguidDisabled
                      : null,
                  ]}>
                  <Text style={styles.yknwldexplorerguidSecondaryBtnText}>
                    {yknwldexplorerguidIdx === yknwldexplorerguidTotal - 1
                      ? 'Result'
                      : 'Next Question'}
                  </Text>
                  <Text style={styles.yknwldexplorerguidSecondaryBtnArrow}>
                    ›
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        ) : null}

        {yknwldexplorerguidPhase === 'result' ? (
          <View style={styles.yknwldexplorerguidResultWrap}>
            <View style={styles.yknwldexplorerguidResultHero}>
              <View style={styles.yknwldexplorerguidResultAvatarWrap}>
                <LinearGradient
                  colors={['#00AA4F', '#2F2861']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.yknwldexplorerguidResultAvatarRing}>
                  <Image
                    source={require('../../assets/i/Yknwldexplorerguieth.png')}
                    style={styles.yknwldexplorerguidResultAvatarImg}
                  />
                </LinearGradient>
              </View>

              <Text style={styles.yknwldexplorerguidResultTitle}>
                Quiz Complete!
              </Text>
              <Text style={styles.yknwldexplorerguidResultSub}>
                You got {yknwldexplorerguidCorrectCount} out of{' '}
                {yknwldexplorerguidTotal} correct
              </Text>

              <View style={styles.yknwldexplorerguidResultStarsRow}>
                {Array.from({length: 5}).map((_, i) => (
                  <Image
                    key={i}
                    source={
                      i < yknwldexplorerguidStars
                        ? require('../../assets/i/yknwldexploactstr.png')
                        : require('../../assets/i/yknwldexplinactst.png')
                    }
                  />
                ))}
              </View>
            </View>

            <View
              style={[
                styles.yknwldexplorerguidResultStat,
                styles.yknwldexplorerguidResultStatEarned,
              ]}>
              <Text style={styles.yknwldexplorerguidResultStatLabel}>
                Points earned this round:
              </Text>
              <Text style={styles.yknwldexplorerguidResultStatValue}>
                🪙 +{yknwldexplorerguidRunCoins}
              </Text>
            </View>
            <View style={styles.yknwldexplorerguidResultStat}>
              <Text style={styles.yknwldexplorerguidResultStatLabel}>
                Total balance:
              </Text>
              <Text
                style={[
                  styles.yknwldexplorerguidResultStatValue,
                  styles.yknwldexplorerguidResultStatValueBig,
                ]}>
                🪙 {yknwldexplorerguidBalance}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={yknwldexplorerguidShare}
              style={styles.yknwldexplorerguidMt18}>
              <LinearGradient
                colors={['#2F2861', '#1E1A3A']}
                style={styles.yknwldexplorerguidSecondaryBtn}>
                <Text style={styles.yknwldexplorerguidSecondaryBtnText}>
                  Share
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={yknwldexplorerguidBackToIntro}
              style={styles.yknwldexplorerguidMt12}>
              <LinearGradient
                colors={['#2F2861', '#1E1A3A']}
                style={styles.yknwldexplorerguidSecondaryBtn}>
                <Text style={styles.yknwldexplorerguidSecondaryBtnText}>
                  Back
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </Yknwldexplorerguiddelay>
  );
};

const styles = StyleSheet.create({
  yknwldexplorerguidIntroBalance: {
    marginTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
    width: '96%',
    alignSelf: 'center',
    gap: 10,
    paddingHorizontal: 14,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#C9A84C1F',
    borderWidth: 1,
    borderColor: '#C9A84C40',
  },
  yknwldexplorerguidIntroBalanceText: {
    color: '#C9A84C',
    fontSize: 14,
    fontWeight: '600',
  },

  yknwldexplorerguidRoot: {
    flex: 1,
    backgroundColor: '#0F0C1D',
  },
  yknwldexplorerguidOverlay: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 70,
    paddingBottom: 110,
    backgroundColor: 'rgba(15, 12, 29, 0.72)',
  },

  yknwldexplorerguidHeader: {
    marginBottom: 16,
    width: '96%',
    alignSelf: 'center',
  },
  yknwldexplorerguidHeaderTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  yknwldexplorerguidHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  yknwldexplorerguidProgressText: {
    color: '#FFFFFFB3',
    fontSize: 13,
    fontWeight: '400',
  },
  yknwldexplorerguidTimerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    minWidth: 70,

    justifyContent: 'center',
    height: 34,
    borderRadius: 12,
    backgroundColor: '#00AA4F22',
    borderWidth: 1,
    borderColor: '#00AA4F55',
  },
  yknwldexplorerguidTimerStack: {
    alignItems: 'flex-start',
    gap: 6,
  },
  yknwldexplorerguidTimerBarTrack: {
    width: '100%',
    height: 4,
    borderRadius: 3,
    backgroundColor: '#FFFFFF1A',
    overflow: 'hidden',
  },
  yknwldexplorerguidTimerBarFill: {
    height: '100%',
    backgroundColor: '#00AA4F',
    borderRadius: 3,
  },
  yknwldexplorerguidTimerText: {
    color: '#00AA4F',
    fontSize: 14,
    fontWeight: '600',
  },
  yknwldexplorerguidCoinsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    height: 34,
    borderRadius: 18,
    backgroundColor: '#FFFFFF14',
    borderWidth: 1,
    borderColor: '#FFFFFF22',
  },
  yknwldexplorerguidCoinDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#C9A84C',
  },
  yknwldexplorerguidCoinDotBig: {
    width: 14,
    height: 14,
    borderRadius: 14,
    backgroundColor: '#C9A84C',
  },
  yknwldexplorerguidCoinsText: {
    color: '#C9A84C',
    fontSize: 13,
    fontWeight: '700',
  },
  yknwldexplorerguidCoinEmoji12: {fontSize: 12},
  yknwldexplorerguidTimerIcon: {width: 18, height: 18},
  yknwldexplorerguidEthanIcon: {width: 26, height: 26},
  yknwldexplorerguidFlex1: {flex: 1},
  yknwldexplorerguidIntroTitleWrap: {marginTop: 10},
  yknwldexplorerguidMt12: {marginTop: 12, width: '96%', alignSelf: 'center'},
  yknwldexplorerguidMt14: {marginTop: 14, width: '96%', alignSelf: 'center'},
  yknwldexplorerguidMt18: {marginTop: 22, width: '96%', alignSelf: 'center'},
  yknwldexplorerguidDisabled: {opacity: 0.5},
  yknwldexplorerguidEmoji24: {fontSize: 24},
  yknwldexplorerguidFeedbackBottomWrap: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '96%',
  },

  yknwldexplorerguidIntroWrap: {flex: 1},
  yknwldexplorerguidIntroTop: {gap: 24},
  yknwldexplorerguidIntroTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#C9A84C26',
    borderWidth: 1,
    borderColor: '#C9A84C3D',
    minWidth: 260,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yknwldexplorerguidIntroTagText: {
    color: '#C9A84C',
    fontSize: 12,
    fontWeight: '600',
  },
  yknwldexplorerguidIntroEthanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  yknwldexplorerguidIntroEthanTitle: {
    color: '#C9A84C',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.7,
  },
  yknwldexplorerguidIntroEthanSub: {
    color: '#FFFFFFB3',
    fontSize: 13,
    marginTop: 2,
  },
  yknwldexplorerguidIntroTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 14,
  },
  yknwldexplorerguidIntroSubtitle: {
    color: '#FFFFFF8A',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },
  yknwldexplorerguidIntroCards: {
    marginTop: 24,
    gap: 12,
  },
  yknwldexplorerguidIntroCard: {
    backgroundColor: '#2F286166',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FFFFFF14',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '96%',
    alignSelf: 'center',
  },
  yknwldexplorerguidIntroCardTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  yknwldexplorerguidIntroCardSub: {
    color: '#FFFFFF8A',
    fontSize: 12,
    marginTop: 6,
    lineHeight: 16,
    flexShrink: 1,
    width: '90%',
  },

  yknwldexplorerguidPrimaryBtn: {
    height: 56,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#C9A84C66',
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
  },
  yknwldexplorerguidPrimaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  yknwldexplorerguidSecondaryBtn: {
    height: 56,
    width: '96%',
    alignSelf: 'center',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    borderWidth: 1,
    borderColor: '#C9A84C59',
  },
  yknwldexplorerguidSecondaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  yknwldexplorerguidSecondaryBtnArrow: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    marginTop: -1,
  },

  yknwldexplorerguidQuestionWrap: {flex: 1, alignItems: 'center'},
  yknwldexplorerguidQuestionCard: {
    width: '96%',
    alignSelf: 'center',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#FFFFFF14',
    backgroundColor: '#1E1A3ACC',
    minHeight: 90,
    justifyContent: 'center',
    marginBottom: 8,
    marginTop: 38,
  },
  yknwldexplorerguidQuestionLabel: {
    color: '#C9A84C',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.7,
  },
  yknwldexplorerguidQuestionText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 26,
    marginTop: 10,
  },
  yknwldexplorerguidOptionsWrap: {
    marginTop: 16,
    width: '96%',
    alignSelf: 'center',
    gap: 14,
  },
  yknwldexplorerguidOption: {
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FFFFFF14',
    backgroundColor: '#1E1A3ACC',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  yknwldexplorerguidOptionCorrect: {
    backgroundColor: '#00AA4F33',
    borderColor: '#00AA4F80',
  },
  yknwldexplorerguidOptionWrong: {
    backgroundColor: '#FF505026',
    borderColor: '#FF505066',
  },
  yknwldexplorerguidOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  yknwldexplorerguidOptionLetter: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF0F',
  },
  yknwldexplorerguidOptionLetterCorrect: {
    backgroundColor: '#00AA4F55',
    borderColor: '#00AA4F77',
  },
  yknwldexplorerguidOptionLetterWrong: {
    backgroundColor: '#FF4D4D55',
    borderColor: '#FF4D4D77',
  },
  yknwldexplorerguidOptionLetterText: {
    color: '#FFFFFFE6',
    fontSize: 13,
    fontWeight: '700',
  },
  yknwldexplorerguidOptionText: {
    color: '#FFFFFFE6',
    fontSize: 14,
    fontWeight: '500',
    flexShrink: 1,
  },
  yknwldexplorerguidOptionMark: {
    color: '#FFFFFF',
    fontSize: 15,
    paddingHorizontal: 6,
  },
  yknwldexplorerguidFeedback: {
    width: '96%',
    alignSelf: 'center',
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  yknwldexplorerguidFeedbackOk: {
    backgroundColor: '#00AA4F26',
    borderColor: '#00AA4F55',
  },
  yknwldexplorerguidFeedbackBad: {
    backgroundColor: '#FF50501A',
    borderColor: '#FF4D4D55',
  },
  yknwldexplorerguidFeedbackText: {
    fontSize: 14,
    fontWeight: '500',
  },
  yknwldexplorerguidFeedbackTextOk: {color: '#00AA4F'},
  yknwldexplorerguidFeedbackTextBad: {color: '#FF5050'},

  yknwldexplorerguidResultWrap: {flex: 1, alignItems: 'center'},
  yknwldexplorerguidResultHero: {
    alignItems: 'center',
  },
  yknwldexplorerguidResultAvatarWrap: {
    width: 200,
    height: 200,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 14,
  },
  yknwldexplorerguidResultAvatarRing: {
    flex: 1,
    borderRadius: 520,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C9A84C',
    overflow: 'hidden',
  },
  yknwldexplorerguidResultAvatar: {
    width: 112,
    height: 112,
    borderRadius: 112,
    resizeMode: 'cover',
  },
  yknwldexplorerguidResultAvatarImg: {top: 5},
  yknwldexplorerguidResultStarsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 28,
    marginBottom: 25,
  },
  yknwldexplorerguidResultTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    marginTop: 19,
  },
  yknwldexplorerguidResultSub: {
    color: '#FFFFFF8A',
    fontSize: 14,
    marginTop: 6,
  },
  yknwldexplorerguidStars: {
    marginTop: 14,
    color: '#C9A84C',
    fontSize: 22,
    letterSpacing: 4,
  },
  yknwldexplorerguidResultStat: {
    width: 340,
    marginTop: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FFFFFF14',
    backgroundColor: '#FFFFFF10',
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  yknwldexplorerguidResultStatLabel: {
    color: '#FFFFFF8A',
    fontSize: 13,
    fontWeight: '700',
  },
  yknwldexplorerguidResultStatValue: {
    color: '#C9A84C',
    fontSize: 20,
    fontWeight: '800',
  },
  yknwldexplorerguidResultStatValueBig: {fontSize: 18},
  yknwldexplorerguidResultStatEarned: {
    backgroundColor: '#C9A84C1F',
    minHeight: 67,
  },
});

export default Yknwldexplorerguiddequzz;
