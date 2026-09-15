import { useLiveQuery } from 'dexie-react-hooks';
import { db, getProfile, saveProfile } from '../db/database';
import type { UserProfile } from '../types';

export function useProfile() {
  return useLiveQuery(() => getProfile(), []);
}

export async function updateProfile(changes: Partial<UserProfile>): Promise<void> {
  const existing = await getProfile();
  if (existing?.id) {
    await db.profile.update(existing.id, changes);
  } else {
    await saveProfile({
      name: 'Warrior',
      avatar: '🔥',
      roast_intensity: 3,
      theme: 'mythic',
      motivation_prefs: ['greek', 'stoic', 'movie'],
      roast_persona: 'sarcastic',
      onboarding_complete: false,
      ...changes,
    });
  }
}
