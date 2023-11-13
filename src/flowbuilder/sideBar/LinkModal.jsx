import React, { Dispatch, SetStateAction } from "react";
import * as Icons from "./Icons";
import InstandDialogue from "../NodeHelper/InstandDialogue";

export function LinkModal(props) {
  const {
    url,
    closeModal,
    onChangeUrl,
    setIsOpen,
    onSaveLink,
    onRemoveLink,
    ...rest
  } = props;
  return (
    <InstandDialogue
      setIsOpen={setIsOpen}
      handleDelete={undefined}
      nodeData={undefined}
      {...rest}
    >
      <>
        <button className="modal-close" type="button" onClick={closeModal}>
          <Icons.X />
        </button>
        <input
          className="modal-input"
          autoFocus
          value={url}
          onChange={onChangeUrl}
        />
        <div className="modal-buttons">
          <button
            className="button-remove"
            type="button"
            onClick={onRemoveLink}
          >
            Remove
          </button>
          <button className="button-save" type="button" onClick={onSaveLink}>
            Save
          </button>
        </div>
      </>
    </InstandDialogue>
  );
}
