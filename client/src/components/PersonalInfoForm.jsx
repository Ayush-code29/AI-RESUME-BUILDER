import { User } from "lucide-react";
import React from "react";

const PersonalInfoForm = ({
data,
onchange,
removebackground,
setremovebackground,
}) => {
const handlechange = (field, value) => {
onchange({
...data,
[field]: value,
});
};

return (
<div>
<h3 className="text-lg font-semibold text-gray-900">
Personal Information
</h3>

  <p className="text-sm text-gray-600">
    Get Started with the personal information
  </p>

  <div className="flex items-center gap-2">
    <label className="cursor-pointer">
      {data.image ? (
        <img
          src={
            typeof data.image === "string"
              ? data.image
              : URL.createObjectURL(data.image)
          }
          alt="user-image"
          className="w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80"
        />
      ) : (
        <div className="inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-700">
          <User className="size-10 p-2.5 border rounded-full" />
          <span>Upload user image</span>
        </div>
      )}

      <input
        type="file"
        accept="image/jpeg,image/png"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            handlechange("image", file);
          }
        }}
      />
    </label>

    {data.image instanceof File && (
      <div className="flex flex-col gap-1 pl-4 text-sm">
        <p>Remove Background</p>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={removebackground}
            onChange={() =>
              setremovebackground((prev) => !prev)
            }
          />

          <div
            className={`relative w-10 h-6 rounded-full transition-colors duration-200 ${
              removebackground
                ? "bg-green-600"
                : "bg-slate-300"
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                removebackground
                  ? "translate-x-4"
                  : "translate-x-0"
              }`}
            />
          </div>
        </label>
      </div>
    )}
  </div>
</div>

);
};

export default PersonalInfoForm;