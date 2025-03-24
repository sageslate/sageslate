import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'SageSlate - The Lore',
  description: 'The documentation for SageSlate VTT',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started/' },
      { text: 'User Guides', link: '/user-guides/' },
      { text: 'Extension Development', link: '/extension-dev/' },
      { text: 'API Reference', link: '/api-reference/' },
      { text: 'Community', link: '/community/' },
    ],

    sidebar: {
      '/getting-started/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/getting-started/' },
            { text: 'Installation', link: '/getting-started/installation' },
            { text: 'Quick Setup', link: '/getting-started/quick-setup' },
            {
              text: 'System Requirements',
              link: '/getting-started/system-requirements',
            },
          ],
        },
      ],
      '/user-guides/': [
        {
          text: 'User Guides',
          items: [{ text: 'Overview', link: '/user-guides/' }],
        },
        {
          text: 'For Game Masters',
          items: [
            {
              text: 'Campaign Management',
              link: '/user-guides/gm/campaign-management',
            },
            { text: 'Scene Creation', link: '/user-guides/gm/scene-creation' },
            { text: 'NPC Management', link: '/user-guides/gm/npc-management' },
            { text: 'Running Encounters', link: '/user-guides/gm/encounters' },
            { text: 'Managing Assets', link: '/user-guides/gm/assets' },
          ],
        },
        {
          text: 'For Players',
          items: [
            {
              text: 'Character Creation',
              link: '/user-guides/players/character-creation',
            },
            {
              text: 'Gameplay Basics',
              link: '/user-guides/players/gameplay-basics',
            },
            {
              text: 'Character Sheets',
              link: '/user-guides/players/character-sheets',
            },
            { text: 'Dice Rolling', link: '/user-guides/players/dice-rolling' },
          ],
        },
        {
          text: 'Features',
          items: [
            {
              text: 'Maps & Tokens',
              link: '/user-guides/features/maps-tokens',
            },
            {
              text: 'Lighting & Vision',
              link: '/user-guides/features/lighting-vision',
            },
            {
              text: 'Audio & Music',
              link: '/user-guides/features/audio-music',
            },
            {
              text: 'Chat & Messaging',
              link: '/user-guides/features/chat-messaging',
            },
          ],
        },
      ],
      '/extension-dev/': [
        {
          text: 'Extension Development',
          items: [
            { text: 'Overview', link: '/extension-dev/' },
            { text: 'Extension Basics', link: '/extension-dev/basics' },
            { text: 'Project Setup', link: '/extension-dev/project-setup' },
          ],
        },
        {
          text: 'Guides',
          items: [
            {
              text: 'Creating Game Systems',
              link: '/extension-dev/guides/game-systems',
            },
            {
              text: 'Building UI Extensions',
              link: '/extension-dev/guides/ui-extensions',
            },
            {
              text: 'Asset Modules',
              link: '/extension-dev/guides/asset-modules',
            },
            {
              text: 'Data Handling',
              link: '/extension-dev/guides/data-handling',
            },
          ],
        },
        {
          text: 'Tutorials',
          items: [
            {
              text: 'Your First Extension',
              link: '/extension-dev/tutorials/first-extension',
            },
            {
              text: 'Custom Character Sheet',
              link: '/extension-dev/tutorials/character-sheet',
            },
            {
              text: 'Dice System Customization',
              link: '/extension-dev/tutorials/dice-system',
            },
          ],
        },
        {
          text: 'Best Practices',
          items: [
            {
              text: 'Performance Optimization',
              link: '/extension-dev/best-practices/performance',
            },
            {
              text: 'Security Considerations',
              link: '/extension-dev/best-practices/security',
            },
            {
              text: 'Testing Extensions',
              link: '/extension-dev/best-practices/testing',
            },
          ],
        },
      ],
      '/api-reference/': [
        {
          text: 'API Reference',
          items: [{ text: 'Overview', link: '/api-reference/' }],
        },
        {
          text: 'Grimoire API',
          items: [
            { text: 'Introduction', link: '/api-reference/grimoire/' },
            {
              text: 'Core Interfaces',
              link: '/api-reference/grimoire/interfaces',
            },
            { text: 'Classes', link: '/api-reference/grimoire/classes' },
            { text: 'Utilities', link: '/api-reference/grimoire/utilities' },
            { text: 'Events', link: '/api-reference/grimoire/events' },
            {
              text: 'Data Structures',
              link: '/api-reference/grimoire/data-structures',
            },
          ],
        },
        {
          text: 'Frontend API (Mirror)',
          items: [
            { text: 'UI Components', link: '/api-reference/mirror/components' },
            { text: 'Hooks', link: '/api-reference/mirror/hooks' },
            { text: 'Theming', link: '/api-reference/mirror/theming' },
          ],
        },
        {
          text: 'Backend API (Forge)',
          items: [
            { text: 'Server API', link: '/api-reference/forge/server-api' },
            {
              text: 'Database Integration',
              link: '/api-reference/forge/database',
            },
            {
              text: 'File Handling',
              link: '/api-reference/forge/file-handling',
            },
          ],
        },
      ],
      '/community/': [
        {
          text: 'Community',
          items: [
            { text: 'Overview', link: '/community/' },
            { text: 'Contributing', link: '/community/contributing' },
            { text: 'Code of Conduct', link: '/community/code-of-conduct' },
            { text: 'Roadmap', link: '/community/roadmap' },
            { text: 'Community Resources', link: '/community/resources' },
          ],
        },
        {
          text: 'Troubleshooting',
          items: [
            {
              text: 'Common Issues',
              link: '/community/troubleshooting/common-issues',
            },
            { text: 'FAQ', link: '/community/troubleshooting/faq' },
            { text: 'Support', link: '/community/troubleshooting/support' },
          ],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/sageslate/sageslate' }],
  },
})
