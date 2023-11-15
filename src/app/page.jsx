"use client";
import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  useReactFlow,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  BackgroundVariant,
} from "reactflow";
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
import { getLayoutedElements } from "@/flowbuilder/WorkflowLayoutUtils";

const Flowbuilder = () => {
  const {
    stepActionHandle,
    setIsModalOpen,
    setCurrentEdge,
    setCurrentNode,
    isModalOpen,
    currentSideData,
    setCurrentSideData,
    selectedIndex,
    setSelectedIndex,
    conditionActionHandle,
    nodeTypes,
    edgeTypes,
  } = useFlowBuilder();
  //node select modal
  const [onlySteps, setOnlySteps] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [size, ref] = useElementSize();

  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [layoutElements, setLayoutElements] = React.useState([]);

  useEffect(() => {
    setLayoutElements(getLayoutedElements([...nodes, ...edges]));
  }, [nodes, edges]);

  const proOptions = { hideAttribution: true };
  const layoutNodes = layoutElements.filter((x) => x.position);
  const layoutEdges = layoutElements.filter((x) => !x.position);

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
        fitView({ maxZoom: 1, duration: 300 });
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

  useEffect(() => {
    fitView({ maxZoom: 1, duration: 300 });
  }, [size.width]);

  const defaultViewport = {
    x: size.width / 2 || 750,
    y: 20,
    zoom: 1,
  };
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
            nodes={layoutNodes}
            edges={layoutEdges}
            nodesDraggable={false}
            nodesConnectable={true}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            proOptions={proOptions}
            zoomOnScroll={false}
            zoomOnPinch={false}
            elementsSelectable={true}
            zoomOnDoubleClick={false}
            deleteKeyCode={null}
            defaultViewport={defaultViewport}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onPaneClick={() => {
              setOpenSidebar(false);
            }}
            panOnScroll
            maxZoom={1}
            minZoom={1}
            preventScrolling
            onEdgeClick={(e, f) => {
              if (e.target.tagName === "BUTTON" || e.target.tagName === "svg") {
                setCurrentEdge(f);
                setOnlySteps(true);
                setIsModalOpen(true);
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
              gap={24}
              color="rgb(229 231 235)"
              size={3}
              variant={BackgroundVariant.Dots}
            />
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
          setOnlySteps={setOnlySteps}
          setSelectedIndex={setSelectedIndex}
        >
          <NodeSelectTab
            stepActionHandle={stepActionHandle}
            setSelectedIndex={setSelectedIndex}
            selectedIndex={selectedIndex}
            conditionActionHandle={conditionActionHandle}
            onlySteps={onlySteps}
          />
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
