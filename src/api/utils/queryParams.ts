import { QueryParams } from 'types/common';

function queryParams<T extends QueryParams>(queryObject: any): T {
  const {
    page = 1,
    pageSize = 10,
    filter = undefined,
    order = 'ASC',
    field = 'id',
    ...rest
  } = queryObject;

  let offset = (page - 1) * pageSize;
  offset = offset < 0 ? 0 : offset;

  return {
    ...rest,
    pageSize,
    filter,
    order,
    field,
    offset,
  };
}

export default queryParams;
