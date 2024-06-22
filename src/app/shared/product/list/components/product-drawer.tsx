'use client';

import SimpleBar from '@/components/ui/simplebar';
import ProductVariantCard from './product-variant-card';
import { Button, Loader } from 'rizzui';
import { BsPlusCircleFill } from 'react-icons/bs';
import AddProductVariant from './add-product-variant';
import { useEffect, useState } from 'react';
import { CallGetProductById } from '@/_ServerActions';

export default function ProductDrawer({ productId }: any) {
  const [isOpen, setIsOpen] = useState<any>(false);
  const [variantData, setVariantData] = useState<any>([]);
  const [isloading, setIsLoading] = useState(false);

  const getProductById = async () => {
    try {
      setIsLoading(true);
      const { data } = (await CallGetProductById(productId)) as any;
      if (data?.message === 'Success') {
        setVariantData(data?.data?.variants);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    getProductById();
  }, []);

  const handleVariantAdded = () => {
    getProductById();
  };

  return (
    <>
      <SimpleBar className="h-[calc(100%-38px)] p-4">
        <Button
          variant="outline"
          className="my-2 mr-2 flex w-32 items-center justify-start p-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
          onClick={() => setIsOpen(true)}
        >
          <BsPlusCircleFill className="mr-2 h-4 w-4 text-gray-500" />
          Add variant
        </Button>
        <AddProductVariant
          onOpen={isOpen}
          setIsOpen={setIsOpen}
          isEdit={false}
          variantId={null}
          productId={productId}
          handleVariantAdded={handleVariantAdded}
        />
        <div className="space-y-2">
          {isloading ? (
            <div className="mt-8 flex justify-center">
              <Loader size="xl" />
            </div>
          ) : (
            variantData?.map((item: any, index: any) => (
              <ProductVariantCard
                item={item}
                key={index}
                onDeleteItem={() => null}
                className="min-w-[273px] hover:-translate-y-0 hover:shadow-none"
                handleVariantAdded={handleVariantAdded}
              />
            ))
          )}
        </div>
      </SimpleBar>
    </>
  );
}
