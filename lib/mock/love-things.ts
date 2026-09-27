import type { LoveThing } from "@/types/content";
import { photos } from "./photos";

export const loveThings: LoveThing[] = [
  { id: "love-01", text: "Your words go here." },
  { id: "love-02", text: "Another small thing to remember.", photo: photos[3] },
  { id: "love-03", text: "A detail worth writing down." },
  { id: "love-04", text: "And so much more, eventually." },
];
