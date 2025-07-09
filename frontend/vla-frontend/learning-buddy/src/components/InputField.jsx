import React from "react";
import { Mail, Lock, User } from "lucide-react";

const iconMap = {
  email: Mail,
  password: Lock,
  name: User,
};

const InputField = ({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
  showPasswordToggle,
  showPassword,
  togglePassword,
}) => {
  const Icon = iconMap[name];

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2 capitalize">
        {name}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id={id}
          name={name}
          type={showPasswordToggle ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`input-field pl-10 pr-${showPasswordToggle ? "10" : "3"} ${
            error ? "border-red-500 focus:ring-red-500" : ""
          }`}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <Lock className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Lock className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default InputField;
