import React, { Fragment, useContext, useEffect, useState } from "react";
import SideBarTopPortion from "./SideBarTopPortion";
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { Transition } from "@headlessui/react";
// import { GlobalContext } from "@/app/context/context";
import useUpdateNode from "@/hooks/useUpdateNode";
import { Button } from "@/components/button";
import { nanoid } from "nanoid";
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
    append({ id: nanoid(4), value: "", step: "" });
    setArr((prev) => [
      ...prev,
      {
        type: "text",
        value: "",
      },
    ]);
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
    email_subject: "",
    isAiMsg: true,
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

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "conditions", // unique name for your Field Array
    }
  );

  const onSubmit = async (data) => {
    const itemData = { ...data };
    console.log(data);
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
              <div className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="" className="text-gray-900">
                    Type :
                  </label>
                  <input
                    defaultValue="start"
                    type="text"
                    {...register("type", {
                      required: {
                        value: true,
                        message: "Please fill the title of message",
                      },
                    })}
                    className={`w-full px-6 py-4 bg-white border border-gray-200 rounded-md outline-none hover:border-violet-400 focus:outline-none text-black`}
                    placeholder="Title of the message"
                  />
                  <ErrorMessage errors={errors} name="type" />
                </div>
                {/* here i check the currentSideData type and show the input form for each condition */}
                {currentSideData.type === "startNode" ? (
                  <div className="space-y-2">
                    <label htmlFor="" className="text-gray-900">
                      Description :
                    </label>
                    <input
                      type="text"
                      {...register("description", {
                        required: {
                          value: true,
                          message: "Please fill the title of message",
                        },
                      })}
                      className={`w-full px-6 py-4 mt-5 bg-white border border-gray-200 rounded-md outline-none hover:border-violet-400 focus:outline-none text-black`}
                      placeholder="Begin the process"
                    />
                    <ErrorMessage errors={errors} name="description" />
                    <Button type="submit">Save</Button>
                  </div>
                ) : currentSideData.type === "StepNode" ? (
                  <>
                    <div className="space-y-2">
                      <label htmlFor="" className="text-gray-900">
                        Description :
                      </label>
                      <input
                        type="text"
                        {...register("description", {
                          required: {
                            value: true,
                            message: "Please fill the title of message",
                          },
                        })}
                        className={`w-full px-6 py-4 mt-5 bg-white border border-gray-200 rounded-md outline-none hover:border-violet-400 focus:outline-none text-black`}
                        placeholder="Ask the user for their name"
                      />
                      <ErrorMessage errors={errors} name="description" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="" className="text-gray-900">
                        Go to Step :
                      </label>
                      <input
                        type="text"
                        {...register("step", {
                          required: {
                            value: true,
                            message: "Please fill the title of message",
                          },
                        })}
                        className={`w-full px-6 py-4 mt-5 bg-white border border-gray-200 rounded-md outline-none hover:border-violet-400 focus:outline-none text-black`}
                        placeholder="Title of the message"
                      />
                      <ErrorMessage errors={errors} name="description" />
                    </div>
                    <Button type="submit">Save</Button>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label htmlFor="" className="text-gray-900">
                        Description :
                      </label>
                      <input
                        type="text"
                        {...register("description", {
                          required: {
                            value: true,
                            message: "Please fill the title of message",
                          },
                        })}
                        className={`w-full px-6 py-4 mt-5 bg-white border border-gray-200 rounded-md outline-none hover:border-violet-400 focus:outline-none text-black`}
                        placeholder="Ask the user for their name"
                      />
                      <ErrorMessage errors={errors} name="description" />
                    </div>
                    {fields.map((item, index) => (
                      <div key={item.id} className="flex gap-x-3">
                        <div className="space-y-2">
                          <label
                            htmlFor={`conditions.${index}.value`}
                            className="text-gray-900"
                          >
                            Condition {index + 1} (Validation):
                          </label>
                          <input
                            id={`conditions.${index}.value`}
                            type="text"
                            {...register(`conditions.${index}.value`, {
                              required: {
                                value: true,
                                message: "Please fill the title of message",
                              },
                            })}
                            className={`w-full px-6 py-4 mt-5 bg-white border border-gray-200 rounded-md outline-none hover:border-violet-400 focus:outline-none text-black`}
                            placeholder="Ask the user for their name"
                          />
                          <ErrorMessage
                            errors={errors}
                            name={`conditions.${index}.value`}
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor={`conditions.${index}.step`}
                            className="text-gray-900"
                          >
                            Go to step:
                          </label>
                          <input
                            id={`conditions.${index}.step`}
                            type="number"
                            min={1}
                            {...register(`conditions.${index}.step`, {
                              required: {
                                value: true,
                                message: "Please fill the title of message",
                              },
                            })}
                            className={`w-full px-6 py-4 mt-5 bg-white border border-gray-200 rounded-md outline-none hover:border-violet-400 focus:outline-none text-black`}
                            placeholder="Enter step number"
                          />
                          <span
                            onClick={() => remove(index)}
                            className="text-red-700 py-1 cursor-pointer"
                          >
                            Remove
                          </span>
                          <ErrorMessage
                            errors={errors}
                            name={`conditions.${index}.step`}
                          />
                        </div>
                      </div>
                    ))}
                    {/* i give click event on button but this is not working  */}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={addInput}
                        className="bg-blue-400"
                      >
                        Add Condition
                      </button>
                      <Button type="submit">Save</Button>
                    </div>
                  </>
                )}
                <ErrorMessage errors={errors} name="email_subject" />
              </div>
            </div>
          </form>
        </div>
      </Transition.Child>
    </Transition>
  );
};

export default SideBar;
