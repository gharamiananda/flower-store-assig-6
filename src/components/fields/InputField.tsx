// Custom components
import React from "react";

function InputField(props: {
  name: string;
  label: string;
  extra?: string;
  placeholder: string;
  variant: string;
  error?: string;
  disabled?: boolean;
  type?: string;
  isDirty?: boolean;
}) {
  const { label, name, extra, type, placeholder, variant, error, disabled ,isDirty,...field} =
    props;

    console.log('field', field)
  return (
    <div className={`${extra??''}`}>
          <label   htmlFor={name} className={`${
          variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
        } ${error ? 'text-red-700 dark:text-red-500' : 'text-green-700 dark:text-green-500'}`}> {label}</label>

     
      <input
        disabled={disabled}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        {...field}
        className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
          disabled === true
            ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
            : error 
            ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
            : isDirty ?
             "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
            : "border-gray-200 dark:!border-white/10 dark:text-white"
        }`}
      />
        {error &&  <p className="mt-2 text-sm text-red-600 dark:text-red-500"> {error}</p>}

    </div>
  );
}

export default InputField;
