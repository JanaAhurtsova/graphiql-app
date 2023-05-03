import { Layout, theme, Button } from 'antd';
import { DocsIcon } from 'managers/icons/Icons';
const { Sider } = Layout;

export default function Sidebar() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Sider width={60} style={{ background: colorBgContainer, height: '100%' }}>
      <Button type="text" icon={<DocsIcon />} loading={false} />
    </Sider>
  );
}
