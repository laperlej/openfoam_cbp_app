import React from 'react';
import { UncontrolledTreeEnvironment, Tree, StaticTreeDataProvider } from 'react-complex-tree';
import './projectfiletree.css';

const ExpendedIcon = ({}) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 -2 16 16"
      enableBackground="new 0 0 16 16"
      xmlSpace="preserve"
    >
      <g>
        <g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12,5c-0.28,0-0.53,0.11-0.71,0.29L8,8.59L4.71,5.29C4.53,5.11,4.28,5,4,5
            C3.45,5,3,5.45,3,6c0,0.28,0.11,0.53,0.29,0.71l4,4C7.47,10.89,7.72,11,8,11s0.53-0.11,0.71-0.29l4-4C12.89,6.53,13,6.28,13,6
            C13,5.45,12.55,5,12,5z"
            className="rct-tree-item-arrow-path"
          />
        </g>
      </g>
    </svg>
  )
}
const ClosedIcon = ({}) => {
  return (
    <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 -2 16 16"
    enableBackground="new 0 0 16 16"
    xmlSpace="preserve"
    >
    <g>
      <g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.71,7.29l-4-4C6.53,3.11,6.28,3,6,3C5.45,3,5,3.45,5,4
          c0,0.28,0.11,0.53,0.29,0.71L8.59,8l-3.29,3.29C5.11,11.47,5,11.72,5,12c0,0.55,0.45,1,1,1c0.28,0,0.53-0.11,0.71-0.29l4-4
          C10.89,8.53,11,8.28,11,8C11,7.72,10.89,7.47,10.71,7.29z"
          className="rct-tree-item-arrow-path"
        />
      </g>
    </g>
    </svg>
  )
}
const FileIcon = ({}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-text" viewBox="0 0 16 16">
      <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
      <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
    </svg>
  )
}

export default function ProjectFileTree({data, setSelectedItem}) {
  const cx = (classNames) => classNames.filter(cn => !!cn).join(' ');

  const renderItemArrow = ({ item, context }) => {
      return (
        <div className={cx([item.hasChildren && 'rct-tree-item-arrow-hasChildren', 'rct-tree-item-arrow'])} {...context.arrowProps}>
          {item.hasChildren ? (context.isExpanded ? (<ExpendedIcon/>) : (<ClosedIcon/>)) : (<FileIcon/>)}
        </div>
  )}
  const staticTreeDataProvider = new StaticTreeDataProvider(data, (item, data) => ({ ...item, data }))
  return (
    <UncontrolledTreeEnvironment
      dataProvider={staticTreeDataProvider}
      getItemTitle={item => item.data}
      viewState={{}}
      onSelectItems={items => setSelectedItem(items[0])}
      renderItemArrow={renderItemArrow}
    >
      <Tree treeId="tree-1" rootItem="root" treeLabel="File Tree" />
    </UncontrolledTreeEnvironment>
  );
}