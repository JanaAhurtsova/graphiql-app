export const Request = `
  query {
    characters(filter: { name: "rick" }) {
      results {
        name
      }
    }
  }`;

export const TestQuery = `
query AllCharacters($page: Int, $filter: FilterCharacter) {
  characters(page: $page, filter: $filter) {
    results {
      name
    }
  }
}`;

export const TestVariables = `
{
  "page": 2,
  "filter": {
    "name": "rick"
  }
}
`;
