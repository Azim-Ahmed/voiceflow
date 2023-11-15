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
import useUpdateNode from "@/hooks/useUpdateNode";
import { Button } from "@/components/button";
import { nanoid } from "nanoid";
import AutoComplete from "./AutoComplete";
import { NodeTypes } from "../Utils";
import { useReactFlow } from "reactflow";
const SideBar = ({ sideBarOpen, currentSideData, setOpenSidebar }) => {
  const { getNodes } = useReactFlow();
  // console.log({ currentSideData });
  const allNodes = getNodes();
  const except = allNodes.filter((item) => item.type !== NodeTypes.startNode);
  const exceptFloat = except.filter(
    (item) => item.type !== NodeTypes.FloatNode
  );
  const FinalNode = exceptFloat.filter(
    (item) => item.id !== currentSideData.id
  );
  const renderNodes = FinalNode.map((item) => ({
    node: item.data.description,
    id: item.id,
  }));
  // console.log({ renderNodes });
  const addInput = () => {
    append({ id: nanoid(8), value: "", step: "" });
  };
  const initialDefault = {
    description: "",
    gotoStep: "",
  };
  const [defaultValues, setdefaultValues] = useState(initialDefault);
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
    register,
    reset,
    // setValue,
    // setError,
    // clearErrors,
  } = useForm({
    defaultValues,
    mode: "onChange",
  });
  const { handleSubmitNode } = useUpdateNode();

  useEffect(() => {
    if (currentSideData) {
      setdefaultValues((prev) => ({
        ...prev,
        description: currentSideData?.data?.description,
        gotoStep: currentSideData?.data?.gotoStep,
        conditions: currentSideData?.data?.conditions,
      }));
    }
  }, [currentSideData]);

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "conditions", // unique name for your Field Array
    }
  );

  const onSubmit = async (data) => {
    // console.log({ data });
    handleSubmitNode(data, currentSideData);
    reset();
    setOpenSidebar(false);
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
                  <label
                    htmlFor=""
                    className="w-full px-6 py-4 bg-white border border-gray-200 rounded-md outline-none hover:border-violet-400 focus:outline-none text-black select-none"
                  >
                    {`Type : ${currentSideData.type}`}
                  </label>
                </div>
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
                            message: "Description field is required",
                          },
                        })}
                        className={`w-full px-6 py-4 mt-5 bg-white border border-gray-200 rounded-md outline-none hover:border-violet-400 focus:outline-none text-black`}
                        placeholder="Write description here"
                      />
                      <ErrorMessage errors={errors} name="description" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="" className="text-gray-900">
                        Go to Step :
                      </label>
                      <input
                        type="text"
                        {...register("gotoStep", {
                          required: {
                            value: true,
                            message: "Step field is required",
                          },
                        })}
                        className={`w-full px-6 py-4 mt-5 bg-white border border-gray-200 rounded-md outline-none hover:border-violet-400 focus:outline-none text-black`}
                        placeholder="Title of the message"
                      />
                      <ErrorMessage errors={errors} name="gotoStep" />
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
                            message: "Description is required",
                          },
                        })}
                        className={`w-full px-6 py-4 mt-5 bg-white border border-gray-200 rounded-md outline-none hover:border-violet-400 focus:outline-none text-black`}
                        placeholder="Write description here"
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
                                message: "Write the condition here",
                              },
                            })}
                            className={`w-full px-6 py-4 mt-5 bg-white border border-gray-200 rounded-md outline-none hover:border-violet-400 focus:outline-none text-black`}
                            placeholder="Write description here"
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
                          <Controller
                            name={`conditions.${index}.step`}
                            control={control}
                            render={({
                              field: { onChange, value, onBlur },
                            }) => (
                              <AutoComplete
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                renderNodes={renderNodes}
                                currentSideData={currentSideData}
                              />
                            )}
                          />
                          <ErrorMessage
                            errors={errors}
                            name={`conditions.${index}.step`}
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
