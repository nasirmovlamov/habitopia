export type HabitType = {
  id: number;
  name: string;
  description: string;
  startDate: string;
  positiveStreakCount: number;
  negativeStreakCount: number;
  isPositiveActive: boolean;
  isNegativeActive: boolean;
  reward: number;
  punishment: number;
};

