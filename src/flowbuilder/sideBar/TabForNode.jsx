import { Tab } from "@headlessui/react";
// import { Controller } from "react-hook-form";
import { ActionTitles } from "../Utils";
import ErrorMessage from "./ErrorMessage";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { isEmpty } from "lodash";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TabForNode = ({
  control,
  handleModal,
  setValue,
  currentSideData,
  isDirty,
  isValid,
  errors,
  setError,
  clearErrors,
  realUrl,
  setRealUrl,
}) => {
  const isVoiceNode =
    currentSideData?.data?.actionTitle === ActionTitles.send_voice;
  const documentsTakingTabs = [
    {
      label: isVoiceNode ? "Pre-record audio" : "Write manually",
      id: 1,
    },
    {
      label: isVoiceNode ? "AI Voice Prompt" : "AI created message",
      id: 2,
    },
  ];

  const params = useSearchParams();
  const campaignId = params.get("id") ?? "";
  const nodeId = currentSideData.id;

  const [tabId, setTabId] = useState(1);
  const isDisabled =
    currentSideData?.data?.actionTitle === ActionTitles.comment_last_post;
  // const sendEmail =
  //   currentSideData?.data?.actionTitle === ActionTitles.send_email;
  // const checkPrompt = currentSideData?.data?.editorData === "" && sendEmail;
  // const checkHumanText = currentSideData?.data?.humanText === "";

  useEffect(() => {
    if (currentSideData.data.isAiMsg) {
      setTabId(1);
    } else {
      setTabId(0);
    }
  }, [currentSideData?.data.isAiMsg, currentSideData?.id]);
  // console.log({ errors }, isEmpty(errors));
  //TO_UNCOMMENT
  useEffect(() => {
    if (!realUrl && isVoiceNode) {
      setError("humanText", {
        type: "required",
        message: "Please record the voice message you want to send.",
      });
    }
    if (realUrl && isVoiceNode) {
      clearErrors("humanText");
    }
  }, [tabId, realUrl, setError, clearErrors]);
  return (
    <div className="w-full  px-2 py-4 sm:px-0">
      <Tab.Group
        onChange={(e) => {
          setValue("isAiMsg", e === 1 ? true : false);
          setTabId(e);
        }}
        selectedIndex={tabId}
      >
        <Tab.List className="flex rounded-xl rounded-r-lg  border-purple-100  p-1">
          {documentsTakingTabs.map(({ label, id }) => (
            <Tab
              key={id}
              disabled={id === 1 && isDisabled}
              className={({ selected }) =>
                classNames(
                  "w-full max-w-[250px]  rounded-lg py-2.5 text-sm font-medium rounded-l-lg  leading-5 text-gray-600",
                  "ring-white ring-opacity-60 ring-offset-2  focus:outline-none focus:ring-2",
                  id == 1
                    ? "border-r-0 rounded-tr-none rounded-br-none"
                    : "border-l-0 rounded-tl-0 rounded-tl-none rounded-bl-none",
                  id === 1 &&
                    isDisabled &&
                    "rounded-tr-none rounded-br-none hover:border-gray-400 border-2 hover:text-gray-400 cursor-not-allowed",
                  selected
                    ? "bg-purple-600 shadow text-white"
                    : "text-black bg-white border-2 border-gray-400  hover:bg-white/[0.12] hover:text-black"
                )
              }
            >
              {label}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className=" w-full">
          {documentsTakingTabs.map((_, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-xl bg-white pb-3 pt-1",
                "ring-white w-full  ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2"
                // PROMPT_COMMENTS
                // idx === 1 && "mt-14"
              )}
            >
              {idx === 0 && (
                <>
                  <div className="mb-3">
                    "Azxi"
                    <ErrorMessage errors={errors} name="humanText" />
                  </div>

                  <div
                    className={
                      isVoiceNode ? "flex justify-end mt-3" : "flex justify-end"
                    }
                  >
                    <button
                      onClick={() => setValue("isAiMsg", false)}
                      disabled={!isEmpty(errors)}
                      type="submit"
                      className={` rounded-lg py-2.5 px-14  text-sm font-medium rounded-l-lg leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2  shadow text-white ${
                        !isDirty && !isValid ? "bg-gray-400" : "bg-purple-600"
                      }`}
                    >
                      Save
                    </button>
                  </div>
                </>
              )}
              {idx === 1 && (
                <>
                  <div className="mb-3">
                    <ErrorMessage errors={errors} name="editorData" />
                  </div>

                  <h1>editorData</h1>
                  <div className="flex  justify-end">
                    <button
                      onClick={() => setValue("isAiMsg", true)}
                      disabled={!isEmpty(errors)}
                      type="submit"
                      className={` rounded-lg py-2.5 px-14  text-sm font-medium rounded-l-lg leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 shadow text-white ${
                        !isEmpty(errors) ? "bg-gray-400" : "bg-purple-600"
                      }`}
                    >
                      Save
                    </button>
                  </div>
                </>
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
export default TabForNode;
