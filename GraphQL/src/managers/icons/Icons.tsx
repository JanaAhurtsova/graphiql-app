import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const DocsSvg = () => {
  return (
    <svg height="1em" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title>docs icon</title>
      <path
        d="M0.75 3C0.75 4.24264 1.75736 5.25 3 5.25H17.25M0.75 3C0.75 1.75736 1.75736 0.75 3 0.75H16.25C16.8023 0.75 17.25 1.19772 17.25 1.75V5.25M0.75 3V21C0.75 22.2426 1.75736 23.25 3 23.25H18.25C18.8023 23.25 19.25 22.8023 19.25 22.25V6.25C19.25 5.69771 18.8023 5.25 18.25 5.25H17.25"
        stroke="currentColor"
        strokeWidth="1.5"
      ></path>
      <line x1="13" y1="11.75" x2="6" y2="11.75" stroke="currentColor" strokeWidth="1.5"></line>
    </svg>
  );
};

export const DocsIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={DocsSvg} {...props} />
);
