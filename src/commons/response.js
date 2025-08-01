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

const buildResponse = (data, message = null) => {
  if (message) {
    return {
      message,
      data,
    };
  }

  return {
    data,
  };
};

export { buildResponse, buildResponseWithPagination };
