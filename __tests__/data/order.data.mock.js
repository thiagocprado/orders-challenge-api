import { writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';
import { FILE_TEMP_PATH_TEST } from '../../src/enums';

export const mockOrdersData = {
  count: 2,
  data: [
    {
      id: 1,
      userId: 123,
      date: '2024-01-15',
      products: [
        {
          id: 456,
          value: '29.99',
        },
      ],
    },
    {
      id: 2,
      userId: 789,
      date: '2024-02-20',
      products: [
        {
          id: 987,
          value: '49.90',
        },
      ],
    },
  ],
};

export const mockSingleOrder = {
  found: true,
  data: {
    id: 1,
    userId: 123,
    date: '2024-01-15',
    products: [
      {
        id: 456,
        value: '29.99',
      },
    ],
  },
};

export const writeMockEmptyFile = () => {
  const dir = path.resolve(FILE_TEMP_PATH_TEST);
  const filePath = path.join(dir, 'empty_file.txt');

  if (!existsSync(dir)) {
    mkdirSync(dir);
  }

  writeFileSync(filePath, '', 'utf-8');
};

export const writeMockFile = () => {
  const dir = path.resolve(FILE_TEMP_PATH_TEST);
  const filePath = path.join(dir, 'file.txt');

  if (!existsSync(dir)) {
    mkdirSync(dir);
  }

  const lines = [
    '0000000070                              Palmer Prosacco00000007530000000003     1836.7420210308',
    '0000000075                                  Bobbie Batz00000007980000000002     1578.5720211116',
    '0000000049                               Ken Wintheiser00000005230000000003      586.7420210903',
  ];

  writeFileSync(filePath, lines.join('\n'), 'utf8');
};
