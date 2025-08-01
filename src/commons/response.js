const buildResponseWithPagination = (data, params, message = 'Operação realizada com sucesso!') => {
  return {
    message,
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

const buildResponse = (data, message = 'Operação realizada com sucesso!') => {
  return {
    message,
    data,
  };
};

export { buildResponse, buildResponseWithPagination };
