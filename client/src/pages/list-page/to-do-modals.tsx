import React from "react";
import { WarningModal, DeleteModal } from "../../components/Modals";

import { useTodoHandlers } from "../../hooks";



const TodoModals: React.FC = () => {
  const {
    showWarningModal,
    showDeleteModal,
    handleCancelWarningModal,
    handleConfirmDelete,
    handleCloseDeleteModal,
    todoToDelete,
    handleConfirmDrawerClose,
  } = useTodoHandlers();
  return (
    <>
      {showWarningModal && (
        <WarningModal
          open={showWarningModal}
          onClose={handleCancelWarningModal}
          title="Discard Changes?"
          question="Are you sure you want to discard these changes?"
          additionalText="Any unsaved progress will be lost. You will not be able to see them again."
          onConfirm={handleConfirmDrawerClose}
          confirmText="Yes, Discard"
          onCancel={handleCancelWarningModal}
          cancelText="No, Keep Editing"
        />
      )}
      {todoToDelete && (
        <DeleteModal
          open={showDeleteModal}
          onClose={handleCloseDeleteModal}
          title="Delete Todo?"
          question={`Are you sure you want to delete "${todoToDelete.name}"?`}
          onConfirm={handleConfirmDelete}
          confirmText="Delete"
          onCancel={handleCloseDeleteModal}
          cancelText="Cancel"
        />
      )}
    </>
  );
};

export default TodoModals;
