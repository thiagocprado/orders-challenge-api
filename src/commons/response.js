const buildResponseWithPagination = (data, params) => {
  return {
    data,
    pagination: {
      page: params.page,
      pageSize: params.pageSize,
      orderBy: params.orderBy,
      sort: params.sort,
      total: params.count,
    },
  };
};

const buildResponseNoPagination = (data) => {
  return {
    data,
  };
};
