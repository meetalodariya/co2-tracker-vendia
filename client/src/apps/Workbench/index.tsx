import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import WorkbenchContainer from './WorkbenchContainer';
import { WorkbenchProvider } from 'src/providers/workbench/workbench';

const Workbench = () => {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <WorkbenchProvider>
          <div
            style={{
              height: 'calc(100% - 64px)',
              width: '100%',
              backgroundColor: '#eeeeee',
              padding: '5px',
              overflow: 'hidden',
            }}
          >
            <WorkbenchContainer />
          </div>
        </WorkbenchProvider>
      </DndProvider>
    </>
  );
};

export default Workbench;
