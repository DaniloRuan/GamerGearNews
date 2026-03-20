export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tag: string;
  readTime: string;
  timestamp: string;
  image: string;
  isHot?: boolean;
  isFeatured?: boolean;
  score?: number;
}

export interface CategoryTab {
  label: string;
  icon: React.ReactNode;
  key: string;
}
