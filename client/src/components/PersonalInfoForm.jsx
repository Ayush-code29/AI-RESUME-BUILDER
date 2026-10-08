import {
  BriefcaseBusiness,
  Globe,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
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
      personal_info: {
        ...data.personal_info,
        [field]: value,
      },
    });
  };

  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      icon: User,
      type: "text",
      required: true,
    },
    {
      key: "email",
      label: "Email Address",
      icon: Mail,
      type: "email",
      required: true,
    },
    {
      key: "phone",
      label: "Phone Number",
      icon: Phone,
      type: "tel",
      required: true,
    },
    {
      key: "location",
      label: "Location",
      icon: MapPin,
      type: "text",
      required: true,
    },
    {
      key: "profession",
      label: "Profession",
      icon: BriefcaseBusiness,
      type: "text",
    },
    {
      key: "linkedin",
      label: "LinkedIn Profile",
      icon: BriefcaseBusiness,
      type: "url",
    },
    {
      key: "website",
      label: "Personal Website",
      icon: Globe,
      type: "url",
    },
  ];

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
          {data.personal_info?.image ? (
            <img
              src={
                typeof data.personal_info.image === "string"
                  ? data.personal_info.image
                  : URL.createObjectURL(data.personal_info.image)
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

        {data.personal_info?.image instanceof File && (
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

      {fields.map((field) => {
        const Icon = field.icon;

        return (
          <div
            key={field.key}
            className="space-y-1 mt-5"
          >
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Icon className="size-4" />

              {field.label}

              {field.required && (
                <span className="text-red-500">*</span>
              )}
            </label>

            <input
              type={field.type}
              value={
                data.personal_info?.[field.key] || ""
              }
              onChange={(e) => {
                handlechange(
                  field.key,
                  e.target.value
                );
              }}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              required={field.required}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PersonalInfoForm;