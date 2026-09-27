import type { RightNowContent } from "@/types/content";
import { photos } from "./photos";

export const site = {
  title: "Our Little Place",
  description: "A little place on the internet for moments worth keeping.",
  intro: { eyebrow: "FOR YOU,", line1: "I made you", line2: "a little place", line3: "on the internet." },
  heroLine: "Some moments deserve a little more room to stay.",
};

export const rightNow: RightNowContent = {
  note: "Your note goes here.",
  mood: "A little space for today.",
  song: "Add a song here",
  updatedLabel: "READY TO BE UPDATED",
  photo: photos[1],
};
