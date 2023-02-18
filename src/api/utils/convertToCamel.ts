import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import { KVObject } from 'types/common';

const toCamel = (s: string) =>
  s.replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));

const convertToCamel = (o: KVObject): KVObject => {
  if (isObject(o) && !isArray(o) && typeof o !== 'function') {
    const obj: KVObject = {};
    Object.entries(o).forEach(([key, value]) => {
      obj[toCamel(key)] = convertToCamel(value);
    });

    return obj;
  }

  if (isArray(o)) {
    return o.map((i) => convertToCamel(i));
  }

  return o;
};

export default convertToCamel;
