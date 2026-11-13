export interface Article {
  slug: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  content: string[]; // paragraphs
}
