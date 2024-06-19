import { Metadata } from 'next';
import logoImg from '@public/logo.svg';
import { LAYOUT_OPTIONS } from '@/config/enums';
import logoIconImg from '@public/logo-short.svg';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Vatika',
  description: `Vatika green`,
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title}` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title}` : title,
      description,
      url: 'https://vatika-admin.vercel.app',
      siteName: 'Vatika Green', // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: 'https://vatika-ui.vercel.app/_next/image?url=https%3A%2F%2Fdev-vatikagreen-s3.s3.amazonaws.com%2F1717058269410-646197974.png%3FAWSAccessKeyId%3DAKIAQ3EGTZ6FIOOHWVP2%26Expires%3D1718823121%26Signature%3DPPSgbleknSWjPateW7rOqJ2v9rk%253D&w=1920&q=75',
        width: 1200,
        height: 630,
      },
      locale: 'en_US',
      type: 'website',
    },
  };
};
