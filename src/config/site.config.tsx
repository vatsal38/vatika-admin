import { Metadata } from 'next';
import logoImg from '@public/logo.svg';
import { LAYOUT_OPTIONS } from '@/config/enums';
import logoIconImg from '@public/logo-short.svg';
import logo from '@public/logo-vatika.png';
import logoImage from '@public/vatika.png';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Vatika',
  description: `Vatika green`,
  logo: logo,
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
    openGraph:
      openGraph ??
      ({
        title: title ? `${title}` : title,
        description,
        url: logoImage,
        siteName: 'Vatika Green', // https://developers.google.com/search/docs/appearance/site-names
        images: {
          url: '/vatika.png',
          width: 1200,
          height: 630,
        },
        locale: 'en_US',
        type: 'website',
      } as any),
  };
};
