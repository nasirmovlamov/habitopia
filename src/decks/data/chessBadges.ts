import { IBadge } from "./badges";

export const chessBadges: IBadge[] = [
  {
    id: Math.random().toString(36).substr(2, 9),
    name: "Chess Opening Novice Badge",
    color: "Light Gray",
    icon: "♙",
    description:
      "Awarded for mastering the basics of 10 chess openings, symbolizing your foundation in chess openings.",
  },
  {
    id: Math.random().toString(36).substr(2, 9),
    name: "Opening Explorer Badge",
    color: "Light Blue",
    icon: "♘",
    description:
      "Given when you've studied and applied 20 different chess openings in your games, showcasing your versatility in openings.",
  },
  {
    id: Math.random().toString(36).substr(2, 9),
    name: "Trap Detective Badge",
    color: "Dark Purple",
    icon: "🕵️",
    description:
      "Awarded for successfully detecting and avoiding 30 chess traps set by your opponents.",
  },
  {
    id: Math.random().toString(36).substr(2, 9),
    name: "Gambit Connoisseur Badge",
    color: "Gold",
    icon: "💰",
    description:
      "Given in recognition of your proficiency in using and countering various chess gambits, signifying your tactical skill.",
  },
  {
    id: Math.random().toString(36).substr(2, 9),
    name: "Tactics Master Badge",
    color: "Red",
    icon: "♗",
    description:
      "Awarded for solving 50 tactical puzzles with a success rate of at least 80%, showcasing your ability to spot tactical opportunities.",
  },
  {
    id: Math.random().toString(36).substr(2, 9),
    name: "Endgame Strategist Badge",
    color: "Green",
    icon: "♖",
    description:
      "Given for executing successful endgame strategies in 15 chess games, emphasizing your endgame prowess.",
  },
  {
    id: Math.random().toString(36).substr(2, 9),
    name: "Opening Guru Badge",
    color: "Dark Blue",
    icon: "♕",
    description:
      "Awarded for mastering 5 complex chess openings and achieving victory using each in at least 10 games.",
  },
  {
    id: Math.random().toString(36).substr(2, 9),
    name: "Chess Coach Badge",
    color: "Brown",
    icon: "♔",
    description:
      "Given for coaching and helping at least 10 other chess enthusiasts improve their understanding of openings, traps, and gambits.",
  },
  {
    id: Math.random().toString(36).substr(2, 9),
    name: "Blitz Chess Champion Badge",
    color: "Purple",
    icon: "⏱️",
    description:
      "Awarded for winning a blitz chess tournament with a minimum of 15 participants, demonstrating your speed and skill.",
  },
  {
    id: Math.random().toString(36).substr(2, 9),
    name: "Chess Grandmaster Badge",
    color: "Dark Green",
    icon: "👑",
    description:
      "Given when you've achieved a FIDE (International Chess Federation) Grandmaster title, symbolizing your highest level of chess mastery.",
  },
];
