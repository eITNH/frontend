module.exports = {
  client: {
    name: 'graphql-vscode-client',
    service: {
      url: 'http://localhost:8081/graphql',
    },
    includes: ['src/**/*.{js,jsx,graphql,gql}'],
  },
};
