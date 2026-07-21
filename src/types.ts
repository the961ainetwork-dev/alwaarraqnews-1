export interface Article {
  id: string;
  category: string; // e.g. 'news' | 'middle-east' | 'world' | 'opinion' | 'business' | 'sports' | 'culture' | 'tech';
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  summaryEn: string;
  contentAr: string;
  contentEn: string;
  author: {
    nameAr: string;
    nameEn: string;
    titleAr?: string;
    titleEn?: string;
    avatar?: string;
  };
  imageUrl: string;
  date: string;
  readTimeAr: string;
  readTimeEn: string;
  isBreaking?: boolean;
  isFeatured?: boolean; // Main frontpage banner slider
  isPremium?: boolean; // Premium subscriber only content
  excerptAr?: string; // Short excerpt/brief for summary
  excerptEn?: string; // Short excerpt/brief for summary
  tags?: string[]; // SEO optimized tags
  categories?: string[]; // Optional multiple categories for cross-listing
  parentAuthorityArticleId?: string; // Authority linking backlink article ID
  views: number;
  excerpt?: string; // Unified excerpt property
  hashtags?: string[]; // Unified hashtags array
  focusKeyword?: string; // Focus Keyword for SEO optimization
  slug?: string; // URL Slug matching the focus keyword or title
}

export interface UserProfile {
  email: string;
  username: string;
  role: 'reader' | 'admin';
  isPremiumSubscriber?: boolean;
  goldenPrimeStatus?: 'none' | 'pending_approval' | 'approved';
  goldenPrimeCandidacyDetails?: {
    name: string;
    organization: string;
    researchUseCase: string;
    submittedAt: string;
  };
  goldenPrimeDemoExpires?: string;
  goldenPrimeDemoExpiresAt?: number;
}

export interface WorkspaceDocument {
  id: string;
  userId: string;
  title: string;
  content: string;
  uploadedAt: string;
  type: 'file' | 'saved_article';
  articleId?: string;
  isActive: boolean;
}

export interface NavigationTab {
  id: string;
  labelAr: string;
  labelEn: string;
}

export type LayoutMode = 'digital' | 'classic-print';

export interface WeatherData {
  temp: number;
  cityAr: string;
  cityEn: string;
  conditionAr: string;
  conditionEn: string;
}

export interface CurrencyRate {
  pair: string;
  rate: string;
  change: string;
  isPositive: boolean;
}

export interface SiteDesign {
  layoutMode: LayoutMode;
  themeAccent: 'slate' | 'red' | 'blue' | 'emerald';
  sloganAr: string;
  sloganEn: string;
  subHeaderAr: string;
  subHeaderEn: string;
  alertBannerAr: string;
  alertBannerEn: string;
  titleAr?: string;
  titleEn?: string;
}

export interface DynamicWidget {
  id: string;
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  type: 'alert-banner' | 'card-widget' | 'text-snippet';
  style: 'red-alert' | 'black-minimal' | 'gold-premium' | 'green-stats';
  location: 'top-bar' | 'sidebar' | 'footer';
  isActive: boolean;
}

export interface PublishedPodcast {
  id: string;
  articleId?: string;
  titleAr: string;
  titleEn: string;
  audioUrl?: string;
  transcriptAr?: string;
  transcriptEn?: string;
  publisherAr?: string;
  publisherEn?: string;
  publishedAt: string;
}


