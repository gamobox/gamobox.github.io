// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    }
  ],
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  trailingComma: 'none',
  semi: false
}
