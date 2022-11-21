/** @type {import('next').NextConfig} */
console.log(`🚀 RUN  \nsite  : ${process.env.SITE_NAME} \napi   : ${process.env.API_URL} \ntheme : ${process.env.THEME}`)
// console.log({env})

const env = {
  API_URL:      process.env.API_URL   || 'https://mineral-store-v2-api.mineral.id',
  BASE_URL:     process.env.BASE_URL  || 'http://localhost:3000',
  DOMAIN:       process.env.DOMAIN    || 'mineral.id',

  SHIPPING:     process.env.SHIPPING || 'sicepat',
  HOMEPAGE_REDIRECT: process.env.HOMEPAGE_REDIRECT || false,
  // 3rd Party Integration
  GOOGLE_TAG_MANAGER_ID:        process.env.GOOGLE_TAG_MANAGER_ID   || null,
  GOOGLE_DOMAIN_VERIFY:         process.env.GOOGLE_DOMAIN_VERIFY    || null,
  GOOGLE_ANALYTICS_ID:          process.env.GOOGLE_ANALYTICS_ID     || null,
  FACEBOOK_DOMAIN_VERIFY:       process.env.FACEBOOK_DOMAIN_VERIFY  || null,
  FACEBOOK_PIXEL_ID:            process.env.FACEBOOK_PIXEL_ID       || '925972241459551',
  FONT_AWESOME_KIT:             process.env.FONT_AWESOME_KIT        || '3b49b8af22',
  SOCIAL_SIGNIN:                process.env.SOCIAL_SIGNIN           || false,

  // Cache
  GENERAL_CACHE_TIME:           process.env.GENERAL_CACHE_TIME      || 600, // 10 minutes
  LOGIN_CACHE_TIME:             process.env.LOGIN_CACHE_TIME        || 604800, // 1 week

  THEME:                        process.env.THEME                   || null,
  LOGO_POSITION:                process.env.LOGO_POSITION           || 'center',
  COLOR_PRIMARY_BUTTON:         process.env.COLOR_PRIMARY_BUTTON    || '#ffffff',
  COLOR_PRIMARY:                process.env.COLOR_PRIMARY           || '#0A100D',

  BUTTON_TRANSFORM:             process.env.BUTTON_TRANSFORM        || 'inherit',
  BORDER_RADIUS:                process.env.BORDER_RADIUS           || '0.25rem',
  HOMEPAGE_TRANSPARANT:         process.env.HOMEPAGE_TRANSPARANT    || null,

  ADOBE_FONT_PROJECT_ID:        process.env.ADOBE_FONT_PROJECT_ID   || 'ylv6jbe',
  GOOGLE_FONTS_LINK:            process.env.GOOGLE_FONTS_LINK       || '',
  FONT_FAMILY_SERIF:            process.env.FONT_FAMILY_SERIF       || 'minerva-modern, sans-serif',
  FONT_FAMILY_SANS:             process.env.FONT_FAMILY_SANS        || 'acumin-pro, sans-serif',
  FONT_HEADING_TRANSFORM:       process.env.FONT_HEADING_TRANSFORM  || 'inherit',

  SITE_NAME:                    process.env.SITE_NAME               || 'Mineral Store',
  SITE_DESC:                    process.env.SITE_DESC               || 'Ecommerce software by Mineral.',
  SITE_OG_IMAGE:                process.env.SITE_OG_IMAGE           || 'https://static.mineralcdn.net/site/mineral-store-v2/og_image.png',
  SITE_LOGO_HEIGHT:             process.env.SITE_LOGO_HEIGHT        || 'inherit',
  SITE_LOGO_URL:                process.env.SITE_LOGO_URL           || 'https://static.mineralcdn.net/site/mineral-store-v2/logo.png',
  SITE_ICONS_PATH:              process.env.SITE_ICONS_PATH         || 'https://static.mineralcdn.net/site/mineral-store-v2/icon',
  APP_IOS:                      process.env.APP_IOS                 || null,
  APP_ANDROID:                  process.env.APP_ANDROID             || null,

  FOOTER_COPYRIGHT:             process.env.FOOTER_COPYRIGHT        || `&copy; ${new Date().getFullYear()} ${process.env.SITE_NAME || 'Mineral Store'}.`,
  FOOTER_PAYMENT_LOGO_URL:      process.env.FOOTER_PAYMENT_LOGO_URL || 'https://static.mineralcdn.net/payment/payment-qris-all-color.png',

  CONTACT_EMAIL:                process.env.CONTACT_EMAIL,
  CONTACT_PHONE:                process.env.CONTACT_PHONE,
  CONTACT_ADDRESS:              process.env.CONTACT_ADDRESS,
  CONTACT_OPERATIONAL:          process.env.CONTACT_OPERATIONAL,

  DISABLE_DUPLICATE_MOBILE_NUMBER: process.env.DISABLE_DUPLICATE_MOBILE_NUMBER || false,

  POPUP_IMAGE:                  process.env.POPUP_IMAGE || null,
  POPUP_START:                  process.env.POPUP_START || '19700101',
  POPUP_END:                    process.env.POPUP_END   || '19701201',

  RECAPTCHA_SITE_KEY:           process.env.RECAPTCHA_SITE_KEY      || '',
  RECAPTCHA_SECRET_KEY:         process.env.RECAPTCHA_SECRET_KEY    || '',

  BLUR_DATA_URL:                process.env.BLUR_DATA_URL || '',
}
const nextConfig = {
  env: env,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['static.mineralcdn.net'],
  },
};

module.exports = nextConfig ;
