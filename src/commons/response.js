const buildResponseWithPagination = (data, params) => {
  return {
    data,
    pagination: {
      page: params.page,
      pageSize: params.pageSize,
      orderBy: params.orderBy,
      sort: params.sort,
      total: params.total,
    },
  };
};

const buildResponse = (data) => {
  return {
    data,
  };
};

export { buildResponse, buildResponseWithPagination };
