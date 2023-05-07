import { OFFER_CATEGORIES } from 'constants/offer';

type CategoriesTuple = typeof OFFER_CATEGORIES;
export type Categories = CategoriesTuple[number];

export interface OfferAttributes {
  id: number;
  title: string;
  description?: string;
  placement: number;
  visible: boolean;
  category: Categories;
  images: string[];
}

export interface AddOfferInput {
  title: string;
  description?: string;
  placement: number;
  visible: boolean;
  category: Categories;
  images: string[];
}
