/** @type {import('next').NextConfig} */
const nextConfig = {
  // Включаем App Router (папка app/)
  // experimental: {
  //   appDir: true,
  // },

  // Разрешённые домены для <Image>
  images: {
    domains: ['fakestoreapi.com'],
  },

  // Рекомендуемые опции
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
