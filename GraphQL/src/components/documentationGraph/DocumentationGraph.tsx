import { useState } from 'react';

import { parserSchema } from './parserSchema';
import { ReturnedArgs } from './returnedArgs/ReturnedArgs';
import { ReturnedValue } from './returnedValue/ReturnedValue';
import { TSchemaServer } from './type';
import styles from './DocumentationSchema.module.scss';

export default function DocumentationGraph({ schema }: { schema: TSchemaServer }): JSX.Element {
  const [schemaParser] = useState(parserSchema(schema));
  const [queryType, setQueryType] = useState(['Query']);
  const indexQuery = queryType.length - 1;
  const querySchema = schemaParser[queryType[indexQuery]]?.args;
  const setQuery = (queryNext: string) => {
    setQueryType([...queryType, queryNext]);
  };

  const setPrevQuery = () => {
    const queryTypePrev = [...queryType];
    queryTypePrev.pop();
    setQueryType(queryTypePrev);
  };

  let schemaLink = (
    <>
      {queryType.length > 1 ? (
        <p>
          <span>&lt;</span>
          <span className={styles.link_documentation} onClick={setPrevQuery}>
            {`${queryType[queryType.length - 2]}`}
          </span>
        </p>
      ) : (
        ''
      )}
      <h3>{queryType[indexQuery]}</h3>
      <p>{schemaParser[queryType[indexQuery]]?.description}</p>
    </>
  );
  for (let key = 0; querySchema && key < querySchema?.length; key++) {
    schemaLink = (
      <>
        {schemaLink}
        <h3 key={querySchema[key].name}>
          <span className={styles.blue_text}>{querySchema[key].name}</span>
          {querySchema[key]?.args ? (
            <ReturnedArgs args={querySchema[key].args} setQueryType={setQuery} />
          ) : (
            ''
          )}
          : <ReturnedValue type={querySchema[key].type} setQueryType={setQuery} />
        </h3>
        <p>{querySchema[key].description}</p>
      </>
    );
  }
  return schemaLink;
}
