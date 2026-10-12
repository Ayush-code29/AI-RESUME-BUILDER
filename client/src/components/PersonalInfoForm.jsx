
import {
  BriefcaseBusiness,
  Globe,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { useState } from "react";

async function compressImage(file) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please select a valid image.");
  }

  const sourceUrl = URL.createObjectURL(file);

  try {
    const image = new Image();

    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
      image.src = sourceUrl;
    });

    const maxDimension = 600;
    const scale = Math.min(
      1,
      maxDimension / Math.max(image.width, image.height)
    );

    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Unable to process this image.");
    }

    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL("image/jpeg", 0.75);
  } finally {
    URL.revokeObjectURL(sourceUrl);
  }
}

export default function PersonalInfoForm({ data, onchange }) {
  const [imageError, setImageError] = useState("");
  const [processingImage, setProcessingImage] = useState(false);

  const handlechange = (field, value) => {
    onchange({
      ...data,
      personal_info: {
        ...(data.personal_info || {}),
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

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setImageError("");

    if (file.size > 8 * 1024 * 1024) {
      setImageError("Please select an image smaller than 8 MB.");
      event.target.value = "";
      return;
    }

    setProcessingImage(true);

    try {
      const imageData = await compressImage(file);
      handlechange("image", imageData);
    } catch (error) {
      setImageError(error.message || "Could not process this image.");
    } finally {
      setProcessingImage(false);
      event.target.value = "";
    }
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
          {data.personal_info?.image ? (
            <img
              src={data.personal_info.image}
              alt="Profile"
              className="mt-5 h-16 w-16 rounded-full object-cover ring ring-slate-300 hover:opacity-80"
            />
          ) : (
            <div className="mt-5 inline-flex items-center gap-2 text-slate-600 hover:text-slate-700">
              <User className="size-10 rounded-full border p-2.5" />
              <span>
                {processingImage ? "Processing image..." : "Upload user image"}
              </span>
            </div>
          )}

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleImageChange}
            disabled={processingImage}
          />
        </label>

        {data.personal_info?.image && (
          <button
            type="button"
            onClick={() => handlechange("image", "")}
            className="mt-5 text-sm text-red-600 hover:underline"
          >
            Remove image
          </button>
        )}
      </div>

      {imageError && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {imageError}
        </p>
      )}

      {fields.map((field) => {
        const Icon = field.icon;

        return (
          <div key={field.key} className="mt-5 space-y-1">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Icon className="size-4" />
              {field.label}
              {field.required && (
                <span className="text-red-500">*</span>
              )}
            </label>

            <input
              type={field.type}
              value={data.personal_info?.[field.key] || ""}
              onChange={(event) =>
                handlechange(field.key, event.target.value)
              }
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-blue-500 focus:ring focus:ring-blue-500"
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              required={field.required}
              maxLength={field.key === "email" ? 254 : 500}
            />
          </div>
        );
      })}
    </div>
  );
}
