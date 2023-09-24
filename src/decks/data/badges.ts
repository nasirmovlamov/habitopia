import { bookBadges } from "./bookBadges";
import { chessBadges } from "./chessBadges";
import { historyBadges } from "./historyBadges";
import { physicsBadges } from "./physicsBadges";
import { programmingBadges } from "./programmingBadges";
import { survivingBadges } from "./survivingBadges";

export interface IBadge {
  id: string;
  name: string;
  color: string;
  icon: string;
  description: string;
}

export const badges: IBadge[] = [
  ...bookBadges,
  ...chessBadges,
  ...historyBadges,
  ...physicsBadges,
  ...programmingBadges,
  ...survivingBadges,
];
