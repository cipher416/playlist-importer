'use client';

import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";
import {useState, useEffect} from 'react'
import { toast } from "react-toastify";

type AccountFormContentProps = {
  children: React.ReactNode;
  defaultValue: string;
  action: any;
}

export default function AccountFormContent({children, defaultValue, action}: AccountFormContentProps) {
  const [message, formAction] = useFormState(action, null);
  const [value, setValue] = useState<string>(defaultValue);

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, [message]);
  
  return (
    <>
        <form action={formAction}>
          <input type="text" placeholder="Username" defaultValue={value} name="accountName" className="input w-full my-3" />
          {children}
        </form>
    </>
  );
}