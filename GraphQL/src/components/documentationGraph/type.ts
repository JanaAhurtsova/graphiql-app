export type TSchemaServer = {
  directives?: [];
  mutationType?: null;
  queryType: {
    name: string;
  };
  subscriptionType?: null;
  types: TSchemaTypesServer[];
};

export type TSchemaTypesServer = {
  name: string;
  type: TSchemaReturned;
  description: string;
  args: TSchemaFields[] | null;
  fields: TSchemaFields[];
  inputFields: TSchemaFields[];
  kind: string;
};

export type TDocumentation = {
  [key: string]: TDocumentationItem;
};

export type TDocumentationItem = {
  description: string;
  kind: string;
  args: TSchemaFields[] | null;
};

export type TSchemaReturned = {
  kind: string;
  name: string;
  ofType?: TSchemaReturned;
};

export type TSchemaFields = {
  name: string;
  type: TSchemaReturned;
  description: string;
  args: TSchemaFields[] | null;
};

export type TReturnedArgsProps = {
  args: TSchemaFields[] | null;
  setQueryType: (value: string) => void;
};

export type TReturnedValueProps = {
  type: TSchemaReturned;
  setQueryType: (value: string) => void;
};
