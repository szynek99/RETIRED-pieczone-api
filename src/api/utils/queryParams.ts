import { QueryParams } from 'types/common';

export default (queryObject: Record<string, any>): QueryParams => {
  const { page = 1, pageSize = 10, filter = undefined, order = 'ASC', field = 'id' } = queryObject;
  return {
    page,
    pageSize,
    filter,
    order,
    field,
  };
};
