'use client';
import { metaObject } from '@/config/site.config';
import TableLayout from './components/table-layout';
import { getColumns } from './components/order-columns';
import React, { useEffect, useState } from 'react';
import ViewAdminData from './components/view-order';
import Spinner from '@/components/ui/spinner';
import SelectTable from '@/components/controlled-table/selectTable';
import { Modal } from 'rizzui';
import { CallAllOrder } from '@/_ServerActions';

export const metadata = {
  ...metaObject('Order List'),
};

const pageHeader = {
  title: 'Order',
  breadcrumb: [
    {
      name: 'List',
    },
  ],
};

export default function OrderListTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleViewOrder = (Data: any) => {
    setSelectedOrder(Data);
    setIsModalOpen(true);
  };

  const handleDeleteOrder = async (id: string) => {
    console.log('object.......', id);
  };

  const handlePagination = (page: any) => {
    setPageNumber(page);
  };

  const listOrder = async () => {
    try {
      setIsLoading(true);
      const { data: response } = (await CallAllOrder()) as any;
      if (response) {
        setOrderList(response?.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    listOrder();
  }, []);

  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      data={orderList}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <SelectTable
            title="Order List"
            variant="minimal"
            data={orderList}
            handlePagination={handlePagination}
            // @ts-ignore
            getColumns={(columns) =>
              getColumns({
                ...columns,
                onViewOrder: handleViewOrder,
                data: orderList,
                onDeleteItem: handleDeleteOrder,
              })
            }
            expandable
            enablePagination
            searchPlaceholder="Search..."
            className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
          />
          {selectedOrder && (
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <ViewAdminData data={selectedOrder} />
            </Modal>
          )}
        </>
      )}
    </TableLayout>
  );
}
