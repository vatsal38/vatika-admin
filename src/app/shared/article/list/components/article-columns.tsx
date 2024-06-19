'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import TableAvatar from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import { PiEnvelopeSimple } from 'react-icons/pi';
import { ActionIcon, Badge, Text, Tooltip } from 'rizzui';

type Columns = {
  data: any[];
  sortConfig?: any;
  isDeleting: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onViewArticle?: (row: any) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  isDeleting,
  onDeleteItem,
  onHeaderCellClick,
  onViewArticle,
}: Columns) => [
  {
    title: <HeaderCell title="Namesss" />,
    dataIndex: 'name',
    key: 'name',
    width: 200,
    render: (_: any, row: any) => (
      <TableAvatar src={row?.image_url} name={row?.title} />
    ),
  },
  {
    title: <HeaderCell title="Views" />,
    dataIndex: 'views',
    key: 'views',
    width: 160,
    render: (value: any) => {
      return <Text className="font-semibold">{value}</Text>;
    },
  },
  {
    title: (
      <HeaderCell
        title="Date/Time Submitted"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'created_at'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('created_at'),
    dataIndex: 'created_at',
    key: 'created_at',
    width: 160,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 100,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={'Edit Article'}
          placement="top"
          color="invert"
        >
          <Link href={`/article/${row?._id}/edit`}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              className="hover:text-gray-700"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={'View Article'}
          placement="top"
          color="invert"
        >
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            className="hover:cursor-pointer hover:text-gray-700"
            onClick={() => onViewArticle && onViewArticle(row)}
          >
            <EyeIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>

        <DeletePopover
          title={`Delete Article`}
          description={`Are you sure you want to delete the "${row?.title}"?`}
          onDelete={() => onDeleteItem(row._id)}
          isLoading={isDeleting}
        />
      </div>
    ),
  },
];
