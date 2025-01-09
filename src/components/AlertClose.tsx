import { ReactNode, useState } from "react";

interface Props {
  children?: ReactNode;
  visible?: Boolean;
  onDismiss?: () => void;
}

const AlertClose = ({children = "", visible=false, onDismiss=() => {visible = false}}: Props) => {
  if (!visible) return null;

  return (
    <div
      className="alert alert-danger alert-dismissible fade show"
      role="alert"
    >
      <strong>{children}</strong>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onDismiss}
      ></button>
    </div>
  );
};

export default AlertClose;
