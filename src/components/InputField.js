import { useState, memo } from "react";
import icons from "../utils/icons";
const { TbEye, TbEyeClosed } = icons;
const InputField = ({
  label,
  type,
  payload,
  setPayload,
  namekey,
  value,
  invalidField,
  setInvalidField,
  placeholder,
  className,
  onKeyDown,
}) => {
  const [hide, setHide] = useState(true);
  const handleShowPassword = () => {
    setHide(!hide);
  };
  return (
    <div className="text-[14px] relative mb-5">
      <div className="mb-[10px]">{label}</div>
      <div className="relative mb-2">
        <input
          type={hide && type ? "password" : "text"}
          placeholder={placeholder || ""}
          className={`h-[44px] px-[15px] rounded-md bg-inputBg autofill:bg-inputBg focus:outline-none ${
            className ? className : "w-full"
          }`}
          onChange={(event) =>
            setPayload((prev) => ({ ...prev, [namekey]: event.target.value }))
          }
          onFocus={() => setInvalidField([])}
          value={value}
          onKeyDown={onKeyDown}
        />
        {type && (
          <div
            className="absolute bottom-0 right-0 h-[44px] flex items-center mr-2"
            onClick={() => handleShowPassword()}
          >
            {hide ? <TbEyeClosed size={20} /> : <TbEye size={20} />}
          </div>
        )}
      </div>
      {invalidField?.some((el) => el?.name === namekey) && (
        <div className="italic text-main duration-200 ease-in text-sm">
          {invalidField
            .find((el) => el.name === namekey)
            ?.mes.split("<br/>")
            .map((el, index) => (
              <div key={index}>{el}</div>
            ))}
        </div>
      )}
    </div>
  );
};

export default memo(InputField);
