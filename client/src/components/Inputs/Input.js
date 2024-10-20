import React, { useId } from "react";

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className="mb-3 font-weight-bold">
            {label &&
                <label className="form-label" htmlFor={id}>
                    {label}
                </label>
            }
            <input
                type={type}
                className={`form-control ${className}`}
                ref={ref}
                id={id}
                {...props}
            />
        </div>
    );
});

export default Input;
