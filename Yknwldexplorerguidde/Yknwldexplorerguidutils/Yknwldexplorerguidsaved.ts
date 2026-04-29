import AsyncStorage from '@react-native-async-storage/async-storage';

const yknwldexplorerguidSavedKey = 'yknwldexplorerguid_saved_place_ids_v1';

export async function yknwldexplorerguidGetSavedPlaceIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(yknwldexplorerguidSavedKey);
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

export async function yknwldexplorerguidSetSavedPlaceIds(
  yknwldexplorerguidIds: string[],
): Promise<void> {
  await AsyncStorage.setItem(
    yknwldexplorerguidSavedKey,
    JSON.stringify(Array.from(new Set(yknwldexplorerguidIds))),
  );
}

export async function yknwldexplorerguidToggleSavedPlaceId(
  yknwldexplorerguidId: string,
): Promise<string[]> {
  const current = await yknwldexplorerguidGetSavedPlaceIds();
  const next = current.includes(yknwldexplorerguidId)
    ? current.filter(x => x !== yknwldexplorerguidId)
    : [...current, yknwldexplorerguidId];
  await yknwldexplorerguidSetSavedPlaceIds(next);
  return next;
}
