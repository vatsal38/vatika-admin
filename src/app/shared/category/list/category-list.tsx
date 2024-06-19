'use client';
import { metaObject } from '@/config/site.config';
import TableLayout from './components/table-layout';
import { getColumns } from './components/category-columns';
import React, { useEffect, useState } from 'react';
import ViewAdminData from './components/view-category';
import Spinner from '@/components/ui/spinner';
import SelectTable from '@/components/controlled-table/selectTable';
import { Modal } from 'rizzui';
import { CallAllCategory, CallDeleteCategory } from '@/_ServerActions';
import toast from 'react-hot-toast';

export const metadata = {
  ...metaObject('Category List'),
};

const pageHeader = {
  title: 'Category',
  breadcrumb: [
    {
      name: 'List',
    },
  ],
};

export default function CategoryListTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleViewCategory = (Data: any) => {
    setSelectedCategory(Data);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      setIsDeleting(true);
      const { data } = (await CallDeleteCategory(id)) as any;
      if (data?.status_code == 200) {
        toast.success(data?.message);
        setIsDeleting(false);
        listCategory();
      }
    } catch (error: any) {
      setIsDeleting(false);
      console.log('error::: ', error);
      toast.error(error?.response?.data?.message_key);
    }
  };

  const handlePagination = (page: any) => {
    setPageNumber(page);
  };

  const listCategory = async () => {
    try {
      setIsLoading(true);
      const { data: response } = (await CallAllCategory()) as any;
      if (response) {
        setCategoryList(response?.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    listCategory();
  }, []);

  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      data={categoryList}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <SelectTable
            title="Category List"
            variant="minimal"
            data={categoryList}
            handlePagination={handlePagination}
            getColumns={(columns) =>
              getColumns({
                ...columns,
                isDeleting,
                onViewCategory: handleViewCategory,
                data: categoryList,
                onDeleteItem: handleDeleteCategory,
              })
            }
            expandable
            enablePagination
            searchPlaceholder="Search..."
            className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
          />
          {selectedCategory && (
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <ViewAdminData data={selectedCategory} />
            </Modal>
          )}
        </>
      )}
    </TableLayout>
  );
}
