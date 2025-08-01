const handleSumProductsTotalValue = (products) => {
  const total = products.reduce(
    (acc, product) => acc + Number(product.value),
    0
  );

  return String(total.toFixed(2));
};

export { handleSumProductsTotalValue };
