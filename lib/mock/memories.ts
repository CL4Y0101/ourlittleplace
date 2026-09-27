import { photos } from "./photos";
import type { Memory } from "@/types/content";

export const timeline: Memory[] = [
  { id: "story-01", title: "A beginning, someday.", description: "A space for the first part of the story.", dateLabel: "CHAPTER 01", photo: photos[2] },
  { id: "story-02", title: "A moment to keep.", description: "Add a photograph and the words that belong with it.", dateLabel: "CHAPTER 02", photo: photos[4] },
  { id: "story-03", title: "And everything after.", description: "There is room for the story to keep growing.", dateLabel: "CHAPTER 03", photo: photos[3] },
];

export const memories: Memory[] = Array.from({ length: 7 }, (_, index) => ({
  id: `memory-${String(index + 1).padStart(2, "0")}`,
  title: `A little moment ${String(index + 1).padStart(2, "0")}`,
  description: "Something worth remembering.",
  dateLabel: `MOMENT ${String(index + 1).padStart(2, "0")}`,
  photo: photos[index % photos.length],
}));

export const latestMemory = timeline[2];
