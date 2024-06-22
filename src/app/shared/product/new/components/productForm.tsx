'use client';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import {
  Button,
  Checkbox,
  Input,
  Loader,
  Password,
  Select,
  Text,
  Textarea,
} from 'rizzui';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  CallAllCategory,
  CallCreateCategory,
  CallCreateProduct,
  CallGetCategoryById,
  CallGetProductById,
  CallUpdateCategory,
  CallUpdateProduct,
} from '@/_ServerActions';
import FormGroup from '@/app/shared/form-group';
import AvatarUpload from '@/components/ui/file-upload/avatar-upload';
import { useSession } from 'next-auth/react';

type FormDataList = {
  name: string;
  type: string;
  short_description: string;
  image: any;
  sequence: string;
  mrp: string;
  price: string;
  size: string;
  color: string;
  category: string;
};

export default function ProductForm() {
  const route = useRouter();
  const params = useParams();
  const productId = params?.slug[0];
  const isEdit: any = params?.slug[1];
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [isCategoryloading, setIsCategoryLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<any>();
  const [categoryList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState<any>(null);
  const [subCategoryId, setSubCategoryId] = useState<any>(null);
  const [imageFile, setImageFile] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<any>();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = useForm<FormDataList>();
  const session: any = useSession();
  const token = session?.data?.user?.token;

  const getProductById = async () => {
    try {
      setIsLoading(true);
      const { data } = (await CallGetProductById(productId)) as any;
      console.log('pdata::: ', data);

      if (data?.message === 'Success') {
        const label = data?.data?.type === 'single' ? 'Single' : 'Multiple';
        const type = data?.data?.type;
        setValue('name', data?.data?.name);
        setValue('sequence', data?.data?.sequence);
        setValue('short_description', data?.data?.short_description);
        if (data?.data?.category?.parent_category_id) {
          setCategoryId(data?.data?.category?.parent_category_id);
          setSubCategoryId(data?.data?.category);
        } else {
          setCategoryId(data?.data?.category);
          setSubCategoryId(null);
        }
        setSelectedType({ label: label, value: type });
        if (data?.data?.mrp) {
          setValue('mrp', data?.data?.mrp);
        }
        if (data?.data?.price) {
          setValue('price', data?.data?.price);
        }
        if (data?.data?.size) {
          setValue('size', data?.data?.size);
        }
        if (data?.data?.colour) {
          setValue('color', data?.data?.colour);
        }
        setImagePreview(data?.data?.image_url);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    if (isEdit) {
      getProductById();
    }
  }, [token]);

  const listCategory = async () => {
    try {
      setIsCategoryLoading(true);
      const { data: response } = (await CallAllCategory()) as any;
      if (response) {
        setCategoryList(response?.data);
        setIsCategoryLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsCategoryLoading(false);
    }
  };

  useEffect(() => {
    listCategory();
  }, [categoryId]);

  const onSubmit: SubmitHandler<FormDataList> = async (data) => {
    try {
      setLoading(true);
      if (isEdit) {
        if (!selectedType?.value) {
          setErrorMsg('This field is required');
          return;
        }
        const productData = new FormData();
        productData.append('name', data.name);
        productData.append('sequence', data.sequence);
        productData.append('short_description', data.short_description);
        productData.append(
          'category',
          subCategoryId?._id ? subCategoryId?._id : categoryId?._id
        );

        productData.append('type', selectedType?.value);
        if (data.mrp) {
          productData.append('mrp', data.mrp);
        }
        if (data.price) {
          productData.append('price', data.price);
        }
        if (data.size) {
          productData.append('size', data.size);
        }
        if (data.color) {
          productData.append('colour', data.color);
        }
        if (imageFile) {
          productData.append('image', imageFile);
        }
        const { data: response } = (await CallUpdateProduct(
          productData,
          productId
        )) as any;

        if (response) {
          toast.success(response?.message);
          reset();
          route.push('/product');
        }
      } else {
        const productData = new FormData();
        productData.append('name', data.name);
        productData.append('sequence', data.sequence);
        productData.append('short_description', data.short_description);
        productData.append('category', subCategoryId?._id);

        productData.append('type', selectedType?.value);
        if (data.mrp) {
          productData.append('mrp', data.mrp);
        }
        if (data.price) {
          productData.append('price', data.price);
        }
        if (data.size) {
          productData.append('size', data.size);
        }
        if (data.color) {
          productData.append('colour', data.color);
        }
        if (imageFile) {
          productData.append('image', imageFile);
        }
        const { data: response } = (await CallCreateProduct(
          productData
        )) as any;

        if (response) {
          toast.success(response?.message);
          reset();
          route.push('/product');
        }
      }

      setLoading(false);
    } catch (error: any) {
      console.log('error::: ', error);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleLogoChange = (e: any) => {
    if (e.target.files.length > 0) {
      const fileType = e.target.files[0].type;
      const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];

      if (!validImageTypes.includes(fileType)) {
        toast.error('Only JPG, JPEG, and PNG formats are allowed.');
        return;
      }

      setImageFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setImagePreview(null);
    }
  };

  return (
    <>
      <div className="w-full max-w-5xl">
        {isloading ? (
          <>
            <div className="flex h-[80vh] items-center justify-center">
              <Loader size="xl" />
            </div>
          </>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-x-4 gap-y-5 px-4 md:grid md:grid-cols-2 lg:gap-5"
          >
            <>
              <Text className="col-span-2 py-3 text-2xl font-bold text-gray-700">
                Product Details
              </Text>

              <FormGroup
                title="Upload Image"
                description="This will be displayed on category."
                className="col-span-2 flex w-full items-center justify-evenly pt-7 text-center @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <div className="col-span-2 flex flex-col items-center gap-4 @xl:flex-row">
                  <div className="relative">
                    {imagePreview ? (
                      <>
                        <img
                          className="mt-3 h-52 w-52 rounded-full object-cover"
                          src={imagePreview}
                          alt="Current logo preview"
                        />
                        <div
                          onClick={() => {
                            setValue('image', null);
                            setImagePreview(null);
                          }}
                          className="absolute left-52 top-0 w-fit cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#000000"
                            height={15}
                            width={15}
                            version="1.1"
                            id="Capa_1"
                            viewBox="0 0 490 490"
                            xmlSpace="preserve"
                          >
                            <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490   489.292,457.678 277.331,245.004 489.292,32.337 " />
                          </svg>
                        </div>
                      </>
                    ) : (
                      <div className="mt-3 flex w-full items-center justify-center">
                        <label
                          htmlFor="dropzone-file-logo"
                          className="flex h-52 w-52 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50"
                        >
                          <div className="flex flex-col items-center justify-center pb-6 pt-5">
                            <svg
                              className="mb-4 h-8 w-8 text-gray-500"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">
                                Click to upload
                              </span>{' '}
                              or drag and drop Image
                            </p>
                            <p className="text-xs text-gray-500">
                              SVG, PNG, JPG
                            </p>
                          </div>
                          <input
                            {...register('image', {
                              required: 'Image is required',
                            })}
                            id="dropzone-file-logo"
                            type={'file'}
                            className="hidden"
                            accept="image/*"
                            onChange={handleLogoChange}
                          />
                        </label>
                      </div>
                    )}
                    {errors.image?.message && (
                      <div className="font-medium text-red-500">
                        {errors.image?.message as any}
                      </div>
                    )}
                  </div>
                </div>
              </FormGroup>

              <Input
                type="text"
                size="lg"
                label="Name"
                placeholder="Enter the name"
                className="font-medium"
                inputClassName="text-sm"
                {...register('name', {
                  required: 'Name is required',
                })}
                error={errors.name?.message}
              />

              <Input
                type="number"
                size="lg"
                label="Sequence"
                placeholder="Enter sequence"
                className="font-medium"
                inputClassName="text-sm"
                {...register('sequence', {
                  required: 'Sequence number is required',
                })}
                error={errors.sequence?.message}
              />
              <Textarea
                label="Description"
                placeholder="Add the Description"
                className="col-span-2 font-medium"
                {...register('short_description', {
                  required: 'Description is required',
                })}
                error={errors.short_description?.message}
              />
              <Select
                label="Type"
                placeholder={'Select a type'}
                options={[
                  { label: 'Single', value: 'single' },
                  { label: 'Multiple', value: 'multiple' },
                ]}
                {...register('type', {
                  required: 'Type is required',
                })}
                onChange={(selectedOption: any) =>
                  setSelectedType(selectedOption)
                }
                value={selectedType}
                size="lg"
                error={errors.type?.message}
              />

              <Select
                label="Category"
                placeholder={'Select a category'}
                options={categoryList}
                getOptionDisplayValue={(option: any) => option?.name}
                {...register('category', {
                  required: 'Category is required',
                })}
                onChange={(selectedOption: any) =>
                  setCategoryId(selectedOption)
                }
                value={categoryId}
                size="lg"
                error={errors.category?.message}
              />
              {((categoryId?.sub_category !== undefined &&
                categoryId?.sub_category?.length !== 0) ||
                subCategoryId) && (
                <Select
                  label="Sub Category"
                  placeholder={'Select a sub category'}
                  options={categoryId?.sub_category}
                  getOptionDisplayValue={(option: any) => option?.name}
                  onChange={(selectedOption: any) =>
                    setSubCategoryId(selectedOption)
                  }
                  value={subCategoryId}
                  size="lg"
                />
              )}

              {selectedType?.value === 'single' && (
                <>
                  <Input
                    type="number"
                    size="lg"
                    label="MRP"
                    placeholder="Enter MRP"
                    className="font-medium"
                    inputClassName="text-sm"
                    {...register('mrp', {
                      required: 'MRP is required',
                    })}
                    error={errors.mrp?.message}
                  />
                  <Input
                    type="number"
                    size="lg"
                    label="Price"
                    placeholder="Enter price"
                    className="font-medium"
                    inputClassName="text-sm"
                    {...register('price', {
                      required: 'Price is required',
                    })}
                    error={errors.price?.message}
                  />
                  <Input
                    type="text"
                    size="lg"
                    label="Size"
                    placeholder="Enter size"
                    className="font-medium"
                    inputClassName="text-sm"
                    {...register('size', {
                      required: 'Size is required',
                    })}
                    error={errors.size?.message}
                  />
                  <Input
                    type="text"
                    size="lg"
                    label="Color (Hex Code Format)"
                    placeholder="Enter color"
                    className="font-medium"
                    inputClassName="text-sm"
                    {...register('color', {
                      required: 'Color is required',
                    })}
                    error={errors.color?.message}
                  />
                </>
              )}
            </>

            <Button
              disabled={loading}
              isLoading={loading}
              size="lg"
              type="submit"
              className="col-span-2 mb-14 mt-2"
            >
              <span>Submit</span>
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </Button>
          </form>
        )}
      </div>
    </>
  );
}
