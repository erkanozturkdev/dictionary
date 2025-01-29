/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Sadece warning seviyesindeki hataları build sırasında kabul et
    dirs: ["pages", "components", "lib", "app"], // ESLint'in kontrol edeceği dizinler
  },
};

module.exports = nextConfig;
