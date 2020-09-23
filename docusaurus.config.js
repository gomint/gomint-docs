module.exports = {
  title: 'GoMint Documentation',
  tagline: 'The place to go if you would like to learn more about GoMint',
  url: 'https://docs.gomint.io/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'gomint',
  projectName: 'gomint',
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/nightOwl'),
    },
    navbar: {
      title: 'GoMint',
      logo: {
        alt: 'GoMint Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/guides',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          to: 'blog', 
          label: 'Blog', 
          position: 'left',
        },
        {
          href: 'https://github.com/gomint/gomint',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/qC4nJVN',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/gomintbe',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/gomint/gomint-docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} GoMint`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/gomint/gomint-docs/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/gomint/gomint-docs/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
