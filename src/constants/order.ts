export const ORDER_STATUS = ['pending', 'accepted', 'realised', 'finished'] as const;
export const CAKE_SHAPE = ['round', 'square'] as const;
export const SPONGE_COLOUR = ['bright', 'dark'] as const;

export const GET_ATTRIBUTES = [
  'firstname',
  'surname',
  'status',
  'id',
  'cakeWeight',
  'createdAt',
  'updatedAt',
  'hash',
];
export const PUBLIC_GET_ATTRIBUTES = ['status', 'hash'];
