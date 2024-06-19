'use client';
import { metaObject } from '@/config/site.config';
import TableLayout from './components/table-layout';
import { getColumns } from './components/product-columns';
import React, { useEffect, useState } from 'react';
import ViewAdminData from './components/view-product';
import Spinner from '@/components/ui/spinner';
import SelectTable from '@/components/controlled-table/selectTable';
import { Modal } from 'rizzui';
import { CallAllProduct, CallDeleteProduct } from '@/_ServerActions';
import toast from 'react-hot-toast';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';

export const metadata = {
  ...metaObject('Product List'),
};

const pageHeader = {
  title: 'Product',
  breadcrumb: [
    {
      name: 'List',
    },
  ],
};

export default function ProductListTable() {
  const { openDrawer, closeDrawer } = useDrawer();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [productList, setProductList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleViewProduct = (Data: any) => {
    setSelectedProduct(Data);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      setIsDeleting(true);
      const { data } = (await CallDeleteProduct(id)) as any;
      if (data?.status_code == 200) {
        toast.success(data?.message);
        setIsDeleting(false);
        listProduct();
      }
    } catch (error: any) {
      console.log('error::: ', error);
      setIsDeleting(false);
      toast.error(error?.response?.data?.message_key);
    }
  };

  const handlePagination = (page: any) => {
    setPageNumber(page);
  };

  const listProduct = async () => {
    try {
      setIsLoading(true);
      const { data: response } = (await CallAllProduct()) as any;
      if (response) {
        setProductList(response?.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    listProduct();
  }, []);

  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      data={productList}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <SelectTable
            title="Product List"
            variant="minimal"
            data={productList}
            handlePagination={handlePagination}
            // @ts-ignore
            getColumns={(columns) =>
              getColumns({
                ...columns,
                isDeleting,
                openDrawer: openDrawer,
                closeDrawer: closeDrawer,
                onViewProduct: handleViewProduct,
                data: productList,
                onDeleteItem: handleDeleteProduct,
              })
            }
            expandable
            enablePagination
            searchPlaceholder="Search..."
            className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
          />
          {selectedProduct && (
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <ViewAdminData data={selectedProduct} />
            </Modal>
          )}
        </>
      )}
    </TableLayout>
  );
}
