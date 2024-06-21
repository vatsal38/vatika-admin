'use client';

import SimpleBar from '@/components/ui/simplebar';
import { Loader } from 'rizzui';
import { useEffect, useState } from 'react';
import { CallGetCategoryById } from '@/_ServerActions';
import CategoryCard from './category-card';

export default function CategoryDrawer({ categoryId }: any) {
  const [subCategoryData, setSubCategoryData] = useState<any>([]);
  const [isloading, setIsLoading] = useState(false);

  const getCategoryById = async () => {
    try {
      setIsLoading(true);
      const { data } = (await CallGetCategoryById(categoryId)) as any;

      if (data?.message === 'Success') {
        setSubCategoryData(data?.data?.sub_category);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    getCategoryById();
  }, []);

  const handleCategoryEdited = () => {
    getCategoryById();
  };

  return (
    <>
      <SimpleBar className="h-[calc(100%-138px)] p-4">
        <div className="space-y-2">
          {isloading ? (
            <div className="mt-8 flex justify-center">
              <Loader size="xl" />
            </div>
          ) : (
            subCategoryData?.map((item: any, index: any) => (
              <CategoryCard
                item={item}
                key={index}
                onDeleteItem={() => null}
                className="min-w-[273px] hover:-translate-y-0 hover:shadow-none"
                handleCategoryEdited={handleCategoryEdited}
              />
            ))
          )}
        </div>
      </SimpleBar>
    </>
  );
}
