export const mockUsersData = {
  count: 2,
  data: [
    {
      id: 123,
      name: 'João Silva',
      orders: [
        {
          id: 1,
          date: '2024-01-15',
          products: [
            {
              id: 456,
              value: '29.99',
            },
          ],
        },
      ],
    },
    {
      id: 789,
      name: 'Maria Santos',
      orders: [
        {
          id: 2,
          date: '2024-02-20',
          products: [
            {
              id: 987,
              value: '49.90',
            },
            {
              id: 654,
              value: '19.50',
            },
          ],
        },
      ],
    },
  ],
};

export const mockSingleUser = {
  found: true,
  data: {
    id: 123,
    name: 'João Silva',
    orders: [
      {
        id: 1,
        date: '2024-01-15',
        products: [
          {
            id: 456,
            value: '29.99',
          },
        ],
      },
      {
        id: 3,
        date: '2024-03-10',
        products: [
          {
            id: 321,
            value: '15.75',
          },
        ],
      },
    ],
  },
};

export const mockEmptyUsersData = {
  count: 0,
  data: [],
};
