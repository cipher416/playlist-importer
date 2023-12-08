'use client';

import { useRef } from "react";

type ModalProps = {
  children: React.ReactNode,
  text: string,
  icon?: React.ReactNode
}

export default function Modal({
  children,
  text,
  icon
}: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button className="btn" onClick={()=>modalRef.current!.showModal()}>
        {icon}
        {text}
        </button>
        <dialog className="modal" ref={modalRef}>
          <div className="modal-box">
            {children}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>Close</button>
          </form>
        </dialog>
    </>
  );
}