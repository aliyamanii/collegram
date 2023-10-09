import React from "react";

interface CustomSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ checked, onChange }) => {
  const toggleSwitch = () => {
    onChange(!checked);
  };

  return (
    <div
      className={`${
        checked ? "bg-amber" : "bg-gray-200"
      } relative inline-flex flex-end flex-shrink-0 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 h-6 focus:outline-none focus:shadow-outline`}
      onClick={toggleSwitch}
    >
      <span
        className={`${
          checked ? "translate-x-5" : "translate-x-0"
        } inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full`}
      />
    </div>
  );
};

export default CustomSwitch;
