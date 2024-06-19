'use client';

import SimpleBar from '@/components/ui/simplebar';
import { Button, Loader } from 'rizzui';
import { BsPlusCircleFill } from 'react-icons/bs';
// import AddProductVariant from './add-product-variant';
import { useEffect, useState } from 'react';
import { CallGetProductById, CallGetVendorById } from '@/_ServerActions';
import AddProductVendor from './add-product-vendor';
import ProductVendorCard from './product-vendor-card';

export default function VendorDrawer({ vendorId }: any) {
  const [isOpen, setIsOpen] = useState<any>(false);
  const [productData, setProductData] = useState<any>([]);
  const [pincodeList, setPincodeList] = useState<any>([]);
  const [isloading, setIsLoading] = useState(false);

  const getVendorById = async () => {
    try {
      setIsLoading(true);
      const { data } = (await CallGetVendorById(vendorId)) as any;
      console.log('data123::: ', data);

      if (data?.message === 'Success') {
        setProductData(
          data?.data?.products ? data?.data?.products : data?.data?.variants
        );
        setPincodeList(data?.data?.pincode);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    getVendorById();
  }, []);

  const handleAttachedProduct = () => {
    getVendorById();
  };

  return (
    <>
      <SimpleBar className="h-[calc(100%-138px)] p-4">
        <Button
          variant="outline"
          className="my-2 mr-2 flex w-40 items-center justify-start p-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
          onClick={() => setIsOpen(true)}
        >
          <BsPlusCircleFill className="mr-2 h-4 w-4 text-gray-500" />
          Attach Products
        </Button>
        <AddProductVendor
          onOpen={isOpen}
          setIsOpen={setIsOpen}
          isEdit={false}
          vendorId={vendorId}
          handleAttachedProduct={handleAttachedProduct}
          pincodeList={pincodeList}
        />
        <div className="space-y-2">
          {isloading ? (
            <div className="mt-8 flex justify-center">
              <Loader size="xl" />
            </div>
          ) : productData?.length !== 0 ? (
            productData?.map((item: any, index: any) => (
              <ProductVendorCard
                key={index}
                item={item}
                className="min-w-[273px] hover:-translate-y-0 hover:shadow-none"
                handleAttachedProduct={handleAttachedProduct}
                pincodeList={pincodeList}
                vendorId={vendorId}
              />
            ))
          ) : (
            <div>Not any product attached.</div>
          )}
        </div>
      </SimpleBar>
    </>
  );
}
