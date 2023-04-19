import { CAKE_SHAPE, ORDER_STATUS, SPONGE_COLOUR } from 'constants/order';
import { QueryParams as BasicQueryParams } from 'types/common';

type StatusTuple = typeof ORDER_STATUS;
export type OrderStatus = StatusTuple[number];

type ShapeTuple = typeof CAKE_SHAPE;
export type CakeShape = ShapeTuple[number];

type SpongeTuple = typeof SPONGE_COLOUR;
export type SpongeColour = SpongeTuple[number];

interface CakeAttributes {
  cakeType: string;
  cakeFlavour: string?;
  spongeColour: SpongeColour;
  cakeWeight: number;
  cakeShape: CakeShape;
  cakeInscription: string?;
  alcoholAllowed: boolean;
  commentsToOrder: string?;
}

export interface OrderAttributes extends CakeAttributes {
  id: string;
  hash: string;
  status: OrderStatus;
  firstname: string;
  surname: string;
  phoneNumber: string;
  occasion: string?;
  imageUrl: string?;
  createdAt: Date;
  updatedAt: Date;
}

export interface QueryParams extends BasicQueryParams {
  cakeWeight: number?;
  firstname: string?;
  surname: string?;
  createdAt: string?;
  status: OrderStatus?;
}
