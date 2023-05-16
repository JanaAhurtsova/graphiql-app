import { Input, Button } from 'antd';
import { useState } from 'react';
import { ISetState } from './type';
import styles from './HeadersVariables.module.scss';
import langJSON from 'assets/json/localization.json';
import { useGetLocalization } from 'hooks/reduxHooks';
import { UpOutlined } from '@ant-design/icons';

export const HeadersVariables = ({ setVariables, setHeaders }: ISetState) => {
  const [active, setActive] = useState(true);
  const [open, setOpen] = useState(false);
  const { lang } = useGetLocalization();

  const openTextArea = (value: boolean) => {
    if (!open) {
      setOpen(true);
    }
    setActive(value);
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.buttons}>
          <Button onClick={() => openTextArea(true)} type={active ? 'primary' : 'default'}>
            {langJSON[lang].variables}
          </Button>
          <Button onClick={() => openTextArea(false)} type={!active ? 'primary' : 'default'}>
            {langJSON[lang].headers}
          </Button>
        </div>
        <div className={styles.icon} onClick={() => setOpen(!open)}>
          <UpOutlined rotate={open ? 180 : 0} />
        </div>
      </div>
      <div style={{ display: open ? 'block' : 'none' }}>
        <Input.TextArea
          style={{ display: active ? 'block' : 'none' }}
          className={styles.option}
          onChange={(e) => setVariables(e.target.value)}
          placeholder={langJSON[lang].placeholderVariables}
        />
        <Input.TextArea
          style={{ display: !active ? 'block' : 'none' }}
          className={styles.option}
          onChange={(e) => setHeaders(e.target.value)}
          placeholder={langJSON[lang].placeholderHeaders}
        />
      </div>
    </div>
    // <Collapse ghost expandIconPosition="end">
    //   <Panel
    //     collapsible="icon"
    //     className={styles.panel}
    //     key={VARIABLES}
    //     header={
    //       <>
    //         <Button onClick={() => setActive(true)} type={active ? 'link' : 'text'}>
    //           {langJSON[lang].variables}
    //         </Button>
    //         <Button onClick={() => setActive(false)} type={!active ? 'link' : 'text'}>
    //           {langJSON[lang].headers}
    //         </Button>
    //       </>
    //     }
    //   >
    //     <Input.TextArea
    //       style={{ display: active ? 'block' : 'none' }}
    //       className={styles.option}
    //       onChange={(e) => setVariables(e.target.value)}
    //       placeholder={langJSON[lang].placeholderVariables}
    //     />
    //     <Input.TextArea
    //       style={{ display: !active ? 'block' : 'none' }}
    //       className={styles.option}
    //       onChange={(e) => setHeaders(e.target.value)}
    //       placeholder={langJSON[lang].placeholderHeaders}
    //     />
    //   </Panel>
    // </Collapse>
  );
};
