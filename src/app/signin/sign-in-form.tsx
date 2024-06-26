'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Checkbox, Password, Button, Input, Text } from 'rizzui';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/utils/validators/login.schema';
import { LOGIN } from '@/services/apis/loginAPI';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const initialValues: LoginSchema = {
  email: '',
  password: '',
  rememberMe: true,
};

export default function SignInForm() {
  const session = useSession() as any;
  const router = useRouter();
  const sessionStatus = session.status;
  const [Loading, setLoading] = useState(false);

  const redirection = () => {
    if (sessionStatus === 'authenticated') {
      router.push('/category');
    } else {
      router.push('/signin');
    }
  };
  useEffect(() => {
    redirection();
  }, [sessionStatus]);
  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    setLoading(true);
    try {
      const dataLogin: any = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: '/superadmin',
      });
      if (dataLogin?.error || dataLogin?.status !== 200) {
        toast.error(
          dataLogin?.error ? dataLogin?.error : 'Email or Password invalid'
        );
        setLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="email"
              size="lg"
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('password')}
              error={errors.password?.message}
            />
            <Button
              isLoading={Loading}
              className="w-full"
              type="submit"
              size="lg"
            >
              <span>Sign in</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </Button>
          </div>
        )}
      </Form>
    </>
  );
}
