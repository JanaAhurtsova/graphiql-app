export const Request = `
  query {
    characters(filter: { name: "rick" }) {
      results {
        name
      }
    }
  }`;
