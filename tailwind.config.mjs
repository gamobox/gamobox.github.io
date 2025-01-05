/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Maison Neue', 'Noto Sans JP', 'sans-serif']
    },
    container: {
      padding: '1.5rem',
      center: 'true'
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addComponents, addUtilities }) {
      addComponents({
        '.container': {
          '@screen xl': { maxWidth: '1024px' },
          '@screen 2xl': { maxWidth: '1024px' }
        },
        '.no-prose img': {
          margin: '0',
          padding: '0',
          borderRadius: '0'
        }
      }),
        addUtilities({
          '.bg-transparent-pattern': {
            backgroundImage: 'repeating-conic-gradient(from 0deg, #eee 0deg 90deg, #bbb 90deg 180deg)',
            backgroundSize: '24px 24px',
            backgroundRepeat: 'repeat'
          }
        })
    }
  ]
}
