// src/types.ts

export type CategoryId = 'all' | 'social' | 'messaging' | 'tools' | 'protocols';

export type UseCaseId =
  | 'storage'
  | 'video'
  | 'social'
  | 'chat'
  | 'identity'
  | 'docs'
  | 'media'
  | 'devops'
  | 'support'
  | 'streaming'
  | 'protocol';

export interface App {
  name: string;
  description: string; // usado no card
  longDescription?: string; // usado no modal
  features?: string[]; // bullet points
  reasonToUse?: string; // por que escolher este app
  challenges?: string[]; // pontos reais de atrito
  links?: { label: string; url: string }[]; // botões
  categories: CategoryId[];
  useCases?: UseCaseId[];
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
