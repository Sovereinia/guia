// src/types.ts

export type CategoryId = 'all' | 'social' | 'messaging' | 'tools' | 'protocols';

export interface App {
  name: string;
  description: string; // usado no card
  longDescription?: string; // usado no modal
  features?: string[]; // bullet points
  links?: { label: string; url: string }[]; // botões
  categories: CategoryId[];
  alternatives?: string[];
  protocol?: string[];
  recommendedForBeginners?: boolean;
  banner: {
    src: string;
    alt: string;
  };
  modalBanner?: {
    src: string;
    alt: string;
  };
  selfHostingLevel?: 1 | 2 | 3;
}

export interface FilterItem {
  id: string;
  name: string;
}

export interface FilterGroup {
  id: string;
  name: string;
  items: FilterItem[];
}

export type FiltersByCategory = {
  [key in CategoryId]: FilterGroup[];
};

export interface Category {
  id: CategoryId;
}

export type HeaderEntry = {
  subtitle: string;
};

export interface ProtocolInfo {
  src: string;
  url: string;
  alt: string;
}
