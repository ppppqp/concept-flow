import React from 'react';


const Switch = ({onToggle, check}: {onToggle: (s: boolean) => void; check: boolean}) => {

  const toggleSwitch = () => {
    onToggle(!check);
  };

  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input type="checkbox" id="toggle" className="sr-only" checked={check} onChange={toggleSwitch} />
        <div className="block bg-gray-600 w-8 h-5 rounded-full"></div>
        <div className={`dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition transform ${check ? 'translate-x-full bg-white-600' : 'bg-gray-400'}`}></div>
      </div>
    </label>
  );
};

export default Switch;
