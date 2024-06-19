'use client';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Button, Checkbox, Input, Loader, Password, Text } from 'rizzui';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import {
  CallCreateAdmin,
  CallGetAdminById,
  CallUpdateAdmin,
} from '@/_ServerActions';
import { permissionsData } from '@/utils/constants/page';
type FormData = {
  name: string;
  phone: string;
  email: string;
  password: string;
  permissions: any;
};

export default function AdminForm() {
  const route = useRouter();
  const params = useParams();
  const adminId = params?.slug[0];
  const isEdit = params?.slug[1] as any;
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [adminData, setAdminData] = useState({});
  const [selectedPermissions, setSelectedPermissions] = useState<any>([]);
  const session: any = useSession();
  const token = session?.data?.user?.token;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = useForm<FormData>();

  const handlePermissionChange = (
    resource: string,
    action: string,
    checked: boolean
  ) => {
    setSelectedPermissions((prev: any) => {
      const newPermissions = { ...prev };
      if (!newPermissions[resource]) {
        newPermissions[resource] = [];
      }
      if (checked) {
        newPermissions[resource].push(action);
      } else {
        newPermissions[resource] = newPermissions[resource].filter(
          (a: string) => a !== action
        );
      }
      if (newPermissions[resource].length === 0) {
        delete newPermissions[resource];
      }
      return newPermissions;
    });
  };

  const handleMasterCheckboxChange = (resource: string, checked: boolean) => {
    setSelectedPermissions((prev: any) => {
      const newPermissions = { ...prev };
      if (checked) {
        newPermissions[resource] = permissionsData.find(
          (p: any) => p.resource === resource
        )?.actions;
      } else {
        delete newPermissions[resource];
      }
      return newPermissions;
    });
  };

  const convertPermissions = (permissionsArray: any) => {
    return permissionsArray.reduce((acc: any, { resource, actions }: any) => {
      acc[resource] = actions;
      return acc;
    }, {});
  };

  const getAdminById = async () => {
    try {
      setIsLoading(true);
      const { data } = (await CallGetAdminById(adminId)) as any;
      if (data?.message === 'Success') {
        setValue('email', data?.data?.email);
        setValue('name', data?.data?.name);
        setValue('phone', data?.data?.phone);
        setSelectedPermissions(convertPermissions(data?.data?.permissions));
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    if (isEdit) {
      getAdminById();
    }
  }, [token]);

  const formatPermissions = (permissions: any) => {
    return Object.entries(permissions).map(([resource, actions]) => ({
      resource,
      actions,
    }));
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setLoading(true);
      if (isEdit) {
        const adminData = {
          name: data.name,
          permissions: formatPermissions(selectedPermissions),
        };
        const { data: response } = (await CallUpdateAdmin(
          adminData,
          adminId
        )) as any;
        if (response) {
          toast.success(response?.data?.message || 'Updated');
          reset();
          route.push('/admin');
        }
      } else {
        const adminData = {
          name: data.name,
          password: data.password,
          email: data.email,
          phone: data.phone,
          status: true,
          permissions: formatPermissions(selectedPermissions),
        };
        const { data: response } = (await CallCreateAdmin(adminData)) as any;
        if (response?.message === 'Success') {
          toast.success(response?.message);
          reset();
          route.push('/admin');
        }
      }
      setLoading(false);
    } catch (error: any) {
      console.log('error::: ', error);
      toast.error(error?.response?.data?.message);
      setLoading(false);
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
                Admin Details
              </Text>

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
                disabled={isEdit}
                type="number"
                size="lg"
                label="Phone No."
                placeholder="Enter your phone number"
                className="font-medium"
                inputClassName="text-sm"
                {...register('phone', {
                  required: 'Phone number is required',
                })}
                error={errors.phone?.message}
              />
              <Input
                disabled={isEdit}
                type="email"
                size="lg"
                label="Email"
                placeholder="Enter the email"
                className="font-medium"
                inputClassName="text-sm"
                {...register('email', {
                  required: 'Email is required',
                })}
                error={errors.email?.message}
              />
              {!isEdit && (
                <Password
                  label="Password"
                  placeholder="Enter your password"
                  size="lg"
                  className="[&>label>span]:font-medium"
                  inputClassName="text-sm"
                  {...register('password')}
                  error={errors.password?.message}
                />
              )}
            </>

            <Text className="col-span-2 pb-4 pt-8 text-2xl font-bold text-gray-700">
              Admin Permissions
            </Text>
            <div className="col-span-2 grid w-full grid-cols-3 gap-8">
              {permissionsData.map((permission: any) => (
                <div key={permission?.resource} className="">
                  <div className=" mb-2">
                    <Checkbox
                      label={`${permission?.resource} permissions`}
                      onChange={(e) =>
                        handleMasterCheckboxChange(
                          permission?.resource,
                          e.target.checked
                        )
                      }
                      checked={
                        selectedPermissions[permission?.resource]?.length ===
                        permission?.actions?.length
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    {permission?.actions.map((action: string) => (
                      <Checkbox
                        key={`${permission?.resource}-${action}`}
                        label={`${action.charAt(0).toUpperCase() + action.slice(1)}`}
                        checked={
                          selectedPermissions[permission?.resource]?.includes(
                            action
                          ) || false
                        }
                        onChange={(e) =>
                          handlePermissionChange(
                            permission?.resource,
                            action,
                            e.target.checked
                          )
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

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
