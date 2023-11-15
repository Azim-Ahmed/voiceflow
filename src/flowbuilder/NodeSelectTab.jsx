import { Tab } from "@headlessui/react";
import { nodeTypeCondtion, nodeTypeStage } from "./Utils";
import EachType from "./EachType";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NodeSelectTab = ({
  stepActionHandle,
  conditionActionHandle,
  onlySteps,
  setSelectedIndex,
  selectedIndex,
}) => {
  const documentsTakingTabs = [
    {
      label: "Add an input",
      id: 1,
    },
    {
      label: "Add a condition",
      id: 2,
    },
  ];
  const renderedTab = onlySteps
    ? [...documentsTakingTabs].slice(0, 1)
    : documentsTakingTabs;
  return (
    <div className="w-full max-w-md px-4 py-4 sm:px-0">
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex rounded-xl rounded-r-lg border-t-2 border-r-2 border-b-2 border-purple-100  p-1">
          {renderedTab.map(({ label, id }) => (
            <Tab
              key={id}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium rounded-l-lg  leading-5 text-gray-600",
                  "ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-blue-800 shadow text-white mx-1"
                    : "text-black bg-white hover:bg-white/[0.12] hover:text-black"
                )
              }
            >
              {label}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2 w-[450px]">
          {renderedTab.map(({ id }, idx) => (
            <Tab.Panel
              key={id}
              className={classNames(
                "rounded-xl bg-white p-3",
                "ring-white w-full ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2"
              )}
            >
              {idx === 0 && (
                <div className="flex flex-wrap justify-center flex-row gap-2">
                  {nodeTypeStage.map((item, i) => (
                    <EachType
                      key={i}
                      item={item}
                      actionHandle={stepActionHandle}
                    />
                  ))}
                </div>
              )}
              {idx === 1 && (
                <div className="flex flex-wrap justify-center flex-row gap-2">
                  {nodeTypeCondtion.map((item, i) => (
                    <EachType
                      key={i}
                      item={item}
                      actionHandle={conditionActionHandle}
                    />
                  ))}
                </div>
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
export default NodeSelectTab;
