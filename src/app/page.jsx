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
// import StepNode from "@/app/flowbuilder/StepNode";
// import ConditionNode from "@/app/flowbuilder/ConditionNode";
// import StartNode from "@/app/flowbuilder/StartNode";
// import FloatNode from "@/app/flowbuilder/FloatNode";
// import BridgeEdge from "@/app/flowbuilder/BridgeEdge";
// import CustomEdge from "@/app/flowbuilder/CustomEdge";
import SelectNodeModal from "../flowbuilder/SelectNodeModal";
// import { getLayoutedElements } from "../components/flowbuilder/WorkflowLayoutUtils";
import {
  NodeTypes,
  initialEdges,
  initialNodes,
  isSideBarOpen,
} from "../flowbuilder/Utils";
import NodeSelectTab from "../flowbuilder/NodeSelectTab";
import useFlowBuilder from "../hooks/useFlowBuilder";
import Navbar from "../flowbuilder/Navbar";
import SideBar from "../flowbuilder/sideBar";
import useElementSize from "@/hooks/useElementSize";
import { getLayoutedElements } from "@/flowbuilder/WorkflowLayoutUtils";
// import useElementSize from "../hooks/useElementSize";

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

  const { fitView, getViewport } = useReactFlow();
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
      const checkedSidebar = isSideBarOpen.every(
        (item) => item !== node.data.actionTitle
      );
      const tagName = event.target?.tagName;
      if (tagName !== "DIV" && node.type === NodeTypes.FloatNode) {
        setCurrentNode(node);
        setIsModalOpen(true);
        setOnlySteps(false);
      } else if (node.type === NodeTypes.FloatNode) {
        return;
      } else {
        setCurrentSideData(node);
        fitView({ minZoom: 1, duration: 300 });
        setOpenSidebar(true);
      }
    },
    [currentSideData.id]
  );

  // const extractedJsonStructure = {
  //   nodes,
  //   edges,
  // };

  useEffect(() => {
    fitView({ minZoom: 1, duration: 300 });
  }, [size.width]);
  const viewport = getViewport();

  const defaultViewport = {
    x: size.width / 2 || 750,
    y: 20,
    zoom: 1,
  };
  return (
    <>
      {/* <Navbar jsonElements={extractedJsonStructure} /> */}
      <div className="flex justify-center gap-y2 bg-white h-screen w-screen">
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
            // translateExtent={translateExtent}
            defaultViewport={defaultViewport}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onPaneClick={() => {
              setOpenSidebar(false);
              // dispatch({
              //   type: "NODE_SIDE_BAR",
              //   payload: {
              //     open: false,
              //     activeId: "",
              //   },
              // });
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
            emails={[]}
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
    </>
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
