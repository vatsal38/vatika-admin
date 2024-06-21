'use client';
import { metaObject } from '@/config/site.config';
import TableLayout from './components/table-layout';
import { getColumns } from './components/article-columns';
import React, { useEffect, useState } from 'react';
import ViewAdminData from './components/view-article';
import Spinner from '@/components/ui/spinner';
import SelectTable from '@/components/controlled-table/selectTable';
import { Modal } from 'rizzui';
import {
  CallAllArticle,
  CallDeleteArticle,
} from '@/_ServerActions';
import toast from 'react-hot-toast';

export const metadata = {
  ...metaObject('Article List'),
};

const pageHeader = {
  title: 'Article',
  breadcrumb: [
    {
      name: 'List',
    },
  ],
};

export default function ArticleListTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const token = localStorage.getItem('token');
  const handleViewArticle = (Data: any) => {
    setSelectedArticle(Data);
    setIsModalOpen(true);
  };

  const handleDeleteArticle = async (id: string) => {
    try {
      setIsDeleting(true);
      const { data } = (await CallDeleteArticle(id)) as any;
      if (data?.status_code == 200) {
        toast.success(data?.message);
        setIsDeleting(false);
        listArticle();
      }
    } catch (error: any) {
      console.log('error::: ', error);
      toast.error(error?.response?.data?.message_key);
      setIsDeleting(false);
    }
  };

  const handlePagination = (page: any) => {
    setPageNumber(page);
  };

  const listArticle = async () => {
    try {
      setIsLoading(true);
      const { data: response } = (await CallAllArticle()) as any;
      if (response) {
        setArticleList(response?.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    listArticle();
  }, [token]);

  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      data={articleList}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <SelectTable
            title="Article List"
            variant="minimal"
            data={articleList}
            handlePagination={handlePagination}
            // @ts-ignore
            getColumns={(columns) =>
              getColumns({
                ...columns,
                isDeleting,
                onViewArticle: handleViewArticle,
                data: articleList,
                onDeleteItem: handleDeleteArticle,
              })
            }
            expandable
            enablePagination
            searchPlaceholder="Search..."
            className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
          />
          {selectedArticle && (
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <ViewAdminData data={selectedArticle} />
            </Modal>
          )}
        </>
      )}
    </TableLayout>
  );
}
