import React, { Fragment, useContext, useEffect, useState } from "react";
import SideBarTopPortion from "./SideBarTopPortion";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { Transition } from "@headlessui/react";
// import { GlobalContext } from "@/app/context/context";
import useUpdateNode from "@/hooks/useUpdateNode";

const SideBar = ({ sideBarOpen, currentSideData, emails }) => {
  // const { state, dispatch } = useContext(GlobalContext);
  console.log(currentSideData);

  // code for add condition but not working
  const inputArr = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];
  const [arr, setArr] = useState(inputArr);
  const addInput = () => {
    setArr((prev) => [
      ...prev,
      {
        type: "text",
        value: "",
      },
    ]);
    console.log(arr);
  };

  const [senderProfile, setsenderProfile] = useState({
    name: "",
    email: null,
    linkedinUrl: "",
    avatar: "/no-profile-picture.svg",
    headline: "",
  });

  ////////////////////////////////////
  const initialDefault = {
    email: {},
    editorData: "",
    email_subject: "",
    isAiMsg: true,
    humanText: "",
    always_send_msg: false,
  };
  const [defaultValues, setdefaultValues] = useState(initialDefault);
  const { handleSubmitNode } = useUpdateNode();

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
    register,
    watch,
    reset,
    setValue,
    setError,
    clearErrors,
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const itemData = { ...data };
    handleSubmitNode(itemData, currentSideData);
    reset();
  };
  return (
    <Transition appear show={sideBarOpen} as={Fragment}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div
          style={{
            width: sideBarOpen ? "40%" : "0%",
            overflow: "auto",
          }}
          className="sidebarWrapper shadow-lg"
        >
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <div className="p-4">
              <SideBarTopPortion item={currentSideData} />

              {/* previous code  */}

              {/* <Fragment>
                <input
                  type="text"
                  {...register("email_subject", {
                    required: {
                      value: true,
                      message: "Please fill the title of message",
                    },
                  })}
                  className={`w-full px-6 py-4 mt-5 bg-white border border-gray-200 rounded-md outline-none hover:border-violet-400 focus:outline-none`}
                  placeholder="Title of the message"
                />
                <ErrorMessage errors={errors} name="email_subject" />
              </Fragment> */}

              {/* i write this below Fragment code */}
              <Fragment>
                <label htmlFor="" className="text-gray-900">
                  Type :
                </label>
                <input
                  type="text"
                  {...register("email_subject", {
                    required: {
                      value: true,
                      message: "Please fill the title of message",
                    },
                  })}
                  className={`w-full px-6 py-4 mt-5 bg-white border border-gray-200 rounded-md outline-none hover:border-violet-400 focus:outline-none`}
                  placeholder="Title of the message"
                />
                {/* here i check the currentSideData type and show the input form for each condition */}
                {currentSideData.type === "startNode" ? (
                  <>
                    <label htmlFor="" className="text-gray-900">
                      Description :
                    </label>
                    <input
                      type="text"
                      {...register("email_subject", {
                        required: {
                          value: true,
                          message: "Please fill the title of message",
                        },
                      })}
                      className={`w-full px-6 py-4 mt-5 bg-white border border-gray-200 rounded-md outline-none hover:border-violet-400 focus:outline-none`}
                      placeholder="Title of the message"
                    />
                  </>
                ) : currentSideData.type === "StepNode" ? (
                  <>
                    <label htmlFor="" className="text-gray-900">
                      Description :
                    </label>
                    <input
                      type="text"
                      {...register("email_subject", {
                        required: {
                          value: true,
                          message: "Please fill the title of message",
                        },
                      })}
                      className={`w-full px-6 py-4 mt-5 bg-white border border-gray-200 rounded-md outline-none hover:border-violet-400 focus:outline-none`}
                      placeholder="Title of the message"
                    />
                    <label htmlFor="" className="text-gray-900">
                      Go to Step :
                    </label>
                    <input
                      type="text"
                      {...register("email_subject", {
                        required: {
                          value: true,
                          message: "Please fill the title of message",
                        },
                      })}
                      className={`w-full px-6 py-4 mt-5 bg-white border border-gray-200 rounded-md outline-none hover:border-violet-400 focus:outline-none`}
                      placeholder="Title of the message"
                    />
                  </>
                ) : (
                  <>
                    <label htmlFor="" className="text-gray-900">
                      Description :
                    </label>
                    <input
                      type="text"
                      {...register("email_subject", {
                        required: {
                          value: true,
                          message: "Please fill the title of message",
                        },
                      })}
                      className={`w-full px-6 py-4 mt-5 bg-white border border-gray-200 rounded-md outline-none hover:border-violet-400 focus:outline-none`}
                      placeholder="Title of the message"
                    />
                    <label htmlFor="" className="text-gray-900">
                      Condition :
                    </label>
                    <input
                      type="text"
                      {...register("email_subject", {
                        required: {
                          value: true,
                          message: "Please fill the title of message",
                        },
                      })}
                      className={`w-full px-6 py-4 mt-5 bg-white border border-gray-200 rounded-md outline-none hover:border-violet-400 focus:outline-none`}
                      placeholder="Title of the message"
                    />
                    {/* i give click event on button but this is not working  */}
                    <button onClick={() => addInput} className="bg-blue-400">
                      Add Condition
                    </button>
                  </>
                )}
                <ErrorMessage errors={errors} name="email_subject" />
              </Fragment>
            </div>
          </form>
        </div>
      </Transition.Child>
    </Transition>
  );
};

export default SideBar;
