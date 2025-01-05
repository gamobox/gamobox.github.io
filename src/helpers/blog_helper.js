export const allPosts = Object.values(import.meta.glob('../pages/posts/*.{md,mdx}', { eager: true }))
