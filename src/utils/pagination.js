import { PAGINATION_DEFAULTS } from '../enums/index.js';

const getPaginationParams = (query) => {
  return {
    page: Number(query.page) || PAGINATION_DEFAULTS.page,
    pageSize: Number(query.pageSize) || PAGINATION_DEFAULTS.pageSize,
    orderBy: query.orderBy || PAGINATION_DEFAULTS.orderBy,
    sort: query.sort || PAGINATION_DEFAULTS.sort,
  };
};

export { getPaginationParams };
