import { Note } from './note.model';

export interface Book {
  id: string;
  username: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    pageCount?: number;
    categories?: string[];
    averageRating?: number;
    ratingsCount?: number;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    previewLink?: string;
  };
  rate?: number;
  notes?: Note[];
  favorite?: boolean;
  createdAt?: string;
}
