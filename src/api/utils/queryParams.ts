import { QueryParams } from 'types/common';

export default (queryObject: Record<string, any>): QueryParams => {
  const { page = 1, pageSize = 10, filter = undefined, order = 'ASC', field = 'id' } = queryObject;

  let offset = (page - 1) * pageSize;
  offset = offset < 0 ? 0 : offset;

  return {
    pageSize,
    filter,
    order,
    field,
    offset,
  };
};
