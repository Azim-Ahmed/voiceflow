"use client";
import React, { useState, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  BackgroundVariant,
  Panel,
  addEdge,
  MarkerType,
  updateEdge,
  useReactFlow,
} from "reactflow";
import { v4 as uuidv4, v4 } from "uuid";
import _ from "lodash";
import "./styles.css";
import "reactflow/dist/style.css";
import SelectNodeModal from "../flowbuilder/SelectNodeModal";
import { NodeTypes, initialEdges, initialNodes } from "../flowbuilder/Utils";
import NodeSelectTab from "../flowbuilder/NodeSelectTab";
import useFlowBuilder from "../hooks/useFlowBuilder";
import Navbar from "../flowbuilder/Navbar";
import SideBar from "../flowbuilder/sideBar";
import useElementSize from "@/hooks/useElementSize";

const Flowbuilder = () => {
  const {
    stepActionHandle,
    stepBlankNode,
    setIsModalOpen,
    setCurrentEdge,
    setCurrentNode,
    setCurrentSideData,
    isModalOpen,
    currentSideData,
    nodeTypes,
    edgeTypes,
  } = useFlowBuilder();
  const { screenToFlowPosition } = useReactFlow();
  //node select modal
  const [onlySteps, setOnlySteps] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [size, ref] = useElementSize();
  const [nodePosition, setNodePosition] = useState({});
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const proOptions = { hideAttribution: true };

  const handleNodeClick = useCallback(
    (event, node) => {
      const tagName = event.target?.tagName;
      if (tagName !== "DIV" && node.type === NodeTypes.FloatNode) {
        setCurrentNode(node);
        setIsModalOpen(true);
        setOnlySteps(false);
      } else if (node.type === NodeTypes.FloatNode) {
        return;
      } else {
        setCurrentSideData(node);
        setOpenSidebar(true);
      }
    },
    [currentSideData.id]
  );

  const extractedJsonStructure = {
    nodes,
    edges,
  };

  const defaultViewport = {
    x: size.width / 2 || 750,
    y: 20,
    zoom: 1,
  };

  const onConnect = useCallback(
    (params) => {
      if (params.source === params.target) return;

      const addNewEdge = {
        id: uuidv4(),
        source: params.source,
        target: params.target,
        type: "custom",
        style: { stroke: "black", strokeWidth: "1" },
        labelBgBorderRadius: 4,
        markerEnd: {
          type: MarkerType.Arrow,
          width: 24,
          height: 24,
          color: "#335CCB",
        },
        data: {
          icon: false,
          condition: "",
        },
      };

      setEdges((eds) => addEdge({ ...addNewEdge, ...params }, eds));
    },
    [setEdges]
  );
  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) =>
      setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    []
  );

  const handleInitialPosition = (e) => {
    const { clientX, clientY, offsetX, offsetY } = e.nativeEvent;
    const targetIsPane = e.target.classList.contains("react-flow__pane");
    if (targetIsPane) {
      const position = screenToFlowPosition({ x: clientX, y: clientY });
      setNodePosition({
        allPos: { clientX, clientY, offsetX, offsetY },
        position,
      });
    }
  };
  const handleLastPosition = (e) => {
    const { clientX, clientY, offsetX, offsetY } = e.nativeEvent;
    const lastNodePosition = { clientX, clientY, offsetX, offsetY };
    const singleBlankNode = getNodeDimensionsAndPosition(
      nodePosition.allPos,
      lastNodePosition
    );
    Object.assign(singleBlankNode, {
      type: "blank",
      label: "Blank Node",
      id: v4(),
      position: nodePosition.position,
    });
    stepBlankNode(singleBlankNode);
  };
  function getNodeDimensionsAndPosition(obj1, obj2) {
    // Calculate width and height
    const width = Math.abs(obj2.clientX - obj1.clientX);
    const height = Math.abs(obj2.clientY - obj1.clientY);

    // Determine position
    const left = Math.min(obj1.clientX, obj2.clientX);
    const top = Math.min(obj1.clientY, obj2.clientY);

    return {
      width: width,
      height: height,
      left: left,
      top: top,
    };
  }

  return (
    <div>
      <Navbar jsonElements={extractedJsonStructure} />
      <div
        style={{
          height: "calc(100vh - 75px)",
        }}
        className="flex justify-center gap-y2 bg-white w-screen"
      >
        <div
          className="bg-white"
          style={{
            width:
              openSidebar && currentSideData.id ? "calc(100%-40%)" : "100%",
          }}
        >
          <ReactFlow
            ref={ref}
            nodes={nodes}
            edges={edges}
            onEdgeUpdate={onEdgeUpdate}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            proOptions={proOptions}
            // onPaneMouseMove={(e) => console.log(e)}
            selectionMode={"full"}
            onSelectionStart={(e) => handleInitialPosition(e)}
            onSelectionEnd={(e) => handleLastPosition(e)}
            zoomOnScroll={false}
            zoomOnPinch={false}
            elementsSelectable={true}
            onInit={setReactFlowInstance}
            zoomOnDoubleClick={false}
            selectionOnDrag
            defaultViewport={defaultViewport}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onPaneClick={() => {
              setOpenSidebar(false);
            }}
            panOnScroll
            preventScrolling
            onEdgeClick={(e, f) => {
              if (e.target.tagName === "BUTTON" || e.target.tagName === "svg") {
                setCurrentEdge(f);
                setOnlySteps(true);
                setIsModalOpen(true);
              } else {
                setCurrentSideData(f);
                setOpenSidebar(true);
              }
            }}
            onNodeClick={(e, f) => handleNodeClick(e, f)}
          >
            <Controls
              showInteractive={false}
              position="bottom-left"
              className="Controls"
            />
            <Background
              gap={100}
              color="rgb(243 244 246)"
              size={3}
              variant={BackgroundVariant.Lines}
            />
            <Panel position="top-left">
              <button
                className={
                  " rounded-lg py-2.5 px-10  text-sm font-medium rounded-l-lg leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 bg-blue-800 shadow text-white"
                }
                onClick={() => setIsModalOpen(true)}
              >
                Add Empty Node
              </button>
            </Panel>
          </ReactFlow>
        </div>
        {/* Update A node */}
        {openSidebar && currentSideData.id && (
          <SideBar
            sideBarOpen={openSidebar}
            currentSideData={currentSideData}
            openSidebar={openSidebar}
            setOpenSidebar={setOpenSidebar}
          />
        )}
        <SelectNodeModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        >
          <NodeSelectTab stepActionHandle={stepActionHandle} />
        </SelectNodeModal>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <ReactFlowProvider>
      <Flowbuilder />
    </ReactFlowProvider>
  );
};

export default Home;
