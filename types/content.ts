export type Photo = {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption?: string;
  aspect: "portrait" | "landscape" | "square";
};

export type Memory = {
  id: string;
  title: string;
  description: string;
  dateLabel: string;
  photo: Photo;
  location?: string;
  song?: string;
};

export type Letter = {
  id: string;
  title: string;
  coverText: string;
  preview: string;
};

export type LoveThing = {
  id: string;
  text: string;
  photo?: Photo;
};

export type RightNowContent = {
  note: string;
  mood: string;
  song: string;
  updatedLabel: string;
  photo: Photo;
};
