module.exports = {
  client: {
    service: {
      name: 'sage-source',
      url: 'http://localhost:4000/graphql',
    },
    includes: ['apps/sight/src/graphql/**/*.graphql'],
  },
}
