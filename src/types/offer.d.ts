import { OFFER_CATEGORIES } from 'constants/offer';
import { QueryParams as BasicQueryParams } from 'types/common';

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

export interface UpdateTypeProps {
  title: string;
  description?: string;
  placement: number;
  visible: boolean;
  category: Categories;
  images: string[];
}
export interface QueryParams extends BasicQueryParams {
  category: Categories?;
}
