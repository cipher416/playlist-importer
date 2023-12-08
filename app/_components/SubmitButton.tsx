'use client';

import { useFormStatus } from 'react-dom';
type SubmitButtonProps = {
  className: string;
  children: React.ReactNode;
}
export default function SubmitButton({className, children}: SubmitButtonProps) {
  const {pending} = useFormStatus();

  return (
    <button type='submit' className={className} aria-disabled={pending}>
      {pending ? <span className="loading loading-spinner loading-md"></span> : children}
    </button>
  );

}