import React, { useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider, 
  addEdge,//for adding edge between nodes
  MiniMap,//for adding the features of background and controls style
  Controls,
  Background,
  applyNodeChanges,//for apply change of nodes and edges
  applyEdgeChanges,
} from 'react-flow-renderer';// importing reactflow component to manage the dgram
import './App.css'; // app css sheet
//then calling the node from component file
import Sidebar from './components/Sidebar';
import { ScrapperNode } from './components/ScrapperNode';
import { SummaryNode } from './components/SummaryNode';
import { ScraperProvider } from './components/ScraperContext';

// here we will have 2 node one for url and other for summary output
const nodeTypes = {
  webscrapper: ScrapperNode,
  summary: SummaryNode,
};

// store each nodes of the flow diagram
const App = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

//handling add an edg between nodes when we connect 2 node together
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  
//allow drag over flow diagram
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
// handling when we dropped into flow diagram
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowInstance.getViewport();
      const type = event.dataTransfer.getData('application/reactflow');
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.x,//position of event node
        y: event.clientY - reactFlowBounds.y,
      });
      const newNode = {
        id: `${type}_${Date.now()}`,
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    //insert data inside node {type, id , data, position} //for lisente update data
    [reactFlowInstance]
  );

  return (
    <ScraperProvider>
      <div className="app">
        <Sidebar />
        <div className="reactflow-wrapper">
          <ReactFlowProvider>
            <div style={{ height: '100vh', width: '100%', backgroundColor: '#F4EAE0' }}>
            <ReactFlow
              //pass edges and nodes to diagram
              nodes={nodes}
              edges={edges}
              //update nodes and edges based on changes that i make
              onNodesChange={(changes) => setNodes((nds) => applyNodeChanges(changes, nds))}
              onEdgesChange={(changes) => setEdges((eds) => applyEdgeChanges(changes, eds))}
              //handel drag and drop over events
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              fitView
            >
              <MiniMap />
              <Controls />
              <Background variant="lines" gap={20} size={2} />
            </ReactFlow>
            </div>
          </ReactFlowProvider>
        </div>
      </div>
    </ScraperProvider>
  );
};

export default App;
