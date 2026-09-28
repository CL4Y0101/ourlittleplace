export type Photo = {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption?: string;
  aspect: "portrait" | "landscape" | "square";
  sourceType?: "local" | "cloudinary";
  cloudinaryPublicId?: string;
  width?: number;
  height?: number;
  createdAt?: string;
};

export type SiteSettings = {
  title: string;
  description: string;
  heroLine: string;
  intro: { eyebrow: string; line1: string; line2: string; line3: string };
  rightNow?: RightNowContent;
  heroPhotoId?: string;
  updatedAt?: string;
};

export type AdminRecord = { active: boolean; email?: string };

export type Memory = {
  id: string;
  title: string;
  description: string;
  dateLabel: string;
  photo: Photo;
  location?: string;
  song?: string;
  createdAt?: string;
};

export type Letter = {
  id: string;
  title: string;
  coverText: string;
  preview: string;
  createdAt?: string;
};

export type LoveThing = {
  id: string;
  text: string;
  photo?: Photo;
  createdAt?: string;
};

export type RightNowContent = {
  note: string;
  mood: string;
  song: string;
  updatedLabel: string;
  photo: Photo;
};
