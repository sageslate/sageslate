module.exports = {
  client: {
    service: {
      name: 'sage-source',
      url: 'http://localhost:4000/graphql',
    },
    includes: [
      'packages/sight/src/graphql/**/*.graphql',
    ],
  },
}