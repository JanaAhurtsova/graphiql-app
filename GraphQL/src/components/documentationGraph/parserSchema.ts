import {
  TSchemaReturned,
  TSchemaFields,
  TSchemaServer,
  TDocumentation,
  TDocumentationItem,
} from './type';

export function parserSchema(schema: TSchemaServer): TDocumentation {
  const typesFields = schema.types;
  const typeObject: Record<string, TDocumentationItem> = {};
  for (let i = 0; i < typesFields.length; i++) {
    let returnType = typesFields[i].fields && getReturnFields(typesFields[i].fields);
    if (typesFields[i].inputFields) {
      returnType = getReturnFields(typesFields[i].inputFields);
    }
    typeObject[typesFields[i].name] = {
      description: typesFields[i].description,
      kind: typesFields[i].kind,
      args: returnType,
    };
  }
  return typeObject;
}

function getReturnFields(fields: TSchemaFields[] | null): TSchemaFields[] | null {
  const fieldsObject: TSchemaFields[] = [];
  if (fields) {
    for (let i = 0; i < fields?.length; i++) {
      fieldsObject.push({
        name: fields[i].name,
        description: fields[i]?.description,
        type: getReturnType(fields[i].type),
        args: fields[i]?.args && fields[i].args ? getReturnFields(fields[i].args) : null,
      });
    }
    return fieldsObject;
  }
  return null;
}

function getReturnType(type: TSchemaReturned | undefined, kind = ''): TSchemaReturned {
  kind += type?.kind + ',';
  if (type?.name) {
    return {
      kind,
      name: type.name,
    };
  }
  return getReturnType(type?.ofType, kind);
}
