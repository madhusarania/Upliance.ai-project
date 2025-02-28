import React, { forwardRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillWrapperProps {
  value: string;
  onChange?: (content: string) => void;
  readOnly?: boolean;
  modules?: any;
  className?: string;
  theme?: string;
}

const QuillWrapper = forwardRef<ReactQuill, QuillWrapperProps>(
  (
    { value, onChange, readOnly = false, modules, className, theme = "snow" },
    ref
  ) => {
    return (
      <ReactQuill
        ref={ref}
        theme={theme}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        modules={modules}
        className={className}
      />
    );
  }
);

QuillWrapper.displayName = "QuillWrapper";

export default QuillWrapper;
