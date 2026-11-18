import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import expressiveCode, {pluginFramesTexts} from "astro-expressive-code";
import tailwindcss from "@tailwindcss/vite";
import {unified} from "@astrojs/markdown-remark";
import {site} from './src/consts.ts'
import remarkDirective from "remark-directive";
import {pluginLineNumbers} from '@expressive-code/plugin-line-numbers'
import {pluginCollapsibleSections, pluginCollapsibleSectionsTexts} from '@expressive-code/plugin-collapsible-sections'

import {remarkModifiedTime,} from "./src/plugins/remark-modified-time.mjs";
import {resetRemark} from "./src/plugins/reset-remark.js";
import {remarkAsides} from './src/plugins/remark-asides.js'
import {remarkCollapse} from "./src/plugins/remark-collapse.js";
import {remarkGithubCard} from './src/plugins/remark-github-card.js'
import {lazyLoadImage} from "./src/plugins/lazy-load-image.js";
import {remarkButton} from "./src/plugins/remark-button.js";
import {remarkHtml} from "./src/plugins/remark-html.js";

pluginFramesTexts.addLocale('zh-CN', {
  terminalWindowFallbackTitle: '终端窗口',
  copyButtonTooltip: '复制代码',
  copyButtonCopied: '已复制！',
});
pluginCollapsibleSectionsTexts.addLocale('zh-CN', {
  collapsedLines: '已折叠 {lineCount} 行',
});

export default defineConfig({
  site: site.url,
  base: import.meta.env.PROD ? site.baseUrl : '',
  trailingSlash: "never",
  // Astro 7 defaults compressHTML to 'jsx', which strips whitespace between
  // adjacent inline elements. Keep the v5 behaviour so layouts render unchanged.
  compressHTML: true,
  integrations: [sitemap(), expressiveCode({
    defaultLocale: 'zh-CN',
    plugins: [pluginLineNumbers(), pluginCollapsibleSections()],
    themes: ["github-dark", "github-light"],
    styleOverrides: {
      codeFontFamily: "jetbrains-mono",
      uiFontFamily: "jetbrains-mono",
    },
    themeCssSelector: (theme) => `[data-theme="${theme.type}"]`
  }), mdx()],
  // Astro 7's default Markdown processor is Sätteri, which does not run remark/
  // rehype plugins. Pin the unified() processor from @astrojs/markdown-remark so
  // the existing remark/rehype plugins keep working.
  markdown: {
    processor: unified({
      remarkPlugins: [remarkModifiedTime, resetRemark, remarkDirective, remarkAsides({}), remarkCollapse({}), remarkGithubCard(), remarkButton(), remarkHtml()],
      rehypePlugins: [lazyLoadImage],
      remarkRehype: {footnoteLabel: '脚注', footnoteBackLabel: '返回正文'},
    }),
  },
  // Tailwind v4 is wired through its Vite plugin (replaces the removed @astrojs/tailwind integration).
  vite: {
    plugins: [tailwindcss()],
  },
});
