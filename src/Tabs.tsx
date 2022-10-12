import { Children, ReactElement, ReactNode } from 'react';
import cx from 'classnames';

interface TabsProps {
  children: ReactNode;
  onChange: (value: string) => void;
  value: string;
}

const Tabs = ({ children, value, onChange }: TabsProps) => {
  const tabs = Children.toArray(children) as ReactElement<TabItemProps>[];

  const selectedTab = tabs.find((child) => child.props.value === value);

  return (
    <>
      <header className="Tabs-header">
        {tabs.map((tab) => (
          <div
            key={tab.props.value}
            onClick={() => onChange(tab.props.value)}
            className={cx('Tabs-tabItem', {
              'Tabs-tabItem--selected':
                tab.props.value === selectedTab?.props.value,
            })}
          >
            {tab.props.title}
          </div>
        ))}
      </header>
      {selectedTab && (
        <div className="Tabs-content">{selectedTab.props.children}</div>
      )}
    </>
  );
};

interface TabItemProps {
  title: string;
  children: ReactNode;
  value: string;
}

Tabs.TabItem = (_props: TabItemProps) => {
  return null;
};

export default Tabs;
