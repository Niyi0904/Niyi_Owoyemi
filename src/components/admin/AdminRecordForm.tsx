"use client";

/* Admin previews must accept arbitrary uploaded image URLs. */
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { uploadImage } from "@/lib/image-upload";
import { Button } from "@/components/ui/Button";
import { RiCloseLine, RiImageAddLine } from "react-icons/ri";

export type AdminFieldType =
  | "text"
  | "email"
  | "url"
  | "date"
  | "month"
  | "number"
  | "textarea"
  | "select"
  | "checkbox"
  | "tags"
  | "list"
  | "image"
  | "images";

export interface AdminFieldOption {
  label: string;
  value: string;
}

export interface AdminFieldConfig {
  name: string;
  label: string;
  type: AdminFieldType;
  required?: boolean;
  placeholder?: string;
  helper?: string;
  rows?: number;
  options?: AdminFieldOption[];
  defaultValue?: string | number | boolean | string[];
  min?: number;
  max?: number;
  step?: number;
  wide?: boolean;
}

type FormState = Record<string, string | boolean>;
type Payload = Record<string, unknown>;

interface AdminRecordFormProps {
  title: string;
  fields: AdminFieldConfig[];
  initialData?: Payload | null;
  onSubmit: (payload: Payload) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
  hideCancel?: boolean;
}

function valueToFormString(value: unknown, field: AdminFieldConfig): string {
  if (value == null) return "";
  if (Array.isArray(value)) {
    return field.type === "tags" ? value.join(", ") : value.join("\n");
  }
  return String(value);
}

function getInitialValue(field: AdminFieldConfig, initialData?: Payload | null) {
  const value = initialData?.[field.name] ?? field.defaultValue;

  if (field.type === "checkbox") {
    return Boolean(value);
  }

  return valueToFormString(value, field);
}

function splitList(value: string, mode: "comma" | "line") {
  const splitter = mode === "comma" ? /[,\n]/ : /\r?\n|,/;
  return value
    .split(splitter)
    .map((item) => item.trim())
    .filter(Boolean);
}

function preparePayload(fields: AdminFieldConfig[], state: FormState): Payload {
  return fields.reduce<Payload>((payload, field) => {
    const value = state[field.name];

    if (field.type === "checkbox") {
      payload[field.name] = Boolean(value);
      return payload;
    }

    const stringValue = typeof value === "string" ? value.trim() : "";

    if (field.type === "number") {
      payload[field.name] = stringValue === "" ? 0 : Number(stringValue);
      return payload;
    }

    if (field.type === "tags") {
      payload[field.name] = splitList(stringValue, "comma");
      return payload;
    }

    if (field.type === "list" || field.type === "images") {
      payload[field.name] = splitList(stringValue, "line");
      return payload;
    }

    payload[field.name] = stringValue;
    return payload;
  }, {});
}

function getUploadUrl(result: unknown): string {
  if (!result || typeof result !== "object") return "";
  const data = (result as { data?: Record<string, unknown> }).data;
  const image = data?.image as Record<string, unknown> | undefined;
  const url = data?.display_url ?? data?.url ?? image?.url;
  return typeof url === "string" ? url : "";
}

export function AdminRecordForm({
  title,
  fields,
  initialData,
  onSubmit,
  onCancel,
  submitLabel = "Save",
  hideCancel = false,
}: AdminRecordFormProps) {
  const initialState = useMemo(
    () =>
      fields.reduce<FormState>((state, field) => {
        state[field.name] = getInitialValue(field, initialData);
        return state;
      }, {}),
    [fields, initialData]
  );

  const [formState, setFormState] = useState<FormState>(initialState);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setFormState(initialState);
  }, [initialState]);

  const setValue = (name: string, value: string | boolean) => {
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleUpload = async (
    field: AdminFieldConfig,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    setError("");
    setUploadingField(field.name);

    try {
      const urls: string[] = [];
      for (const file of files) {
        const result = await uploadImage(file);
        const url = getUploadUrl(result);
        if (!url) throw new Error("Image uploaded but no URL was returned");
        urls.push(url);
      }

      if (field.type === "images") {
        const existing = String(formState[field.name] ?? "").trim();
        setValue(field.name, [existing, ...urls].filter(Boolean).join("\n"));
      } else {
        setValue(field.name, urls[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed");
    } finally {
      setUploadingField(null);
      event.target.value = "";
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = preparePayload(fields, formState);
      await onSubmit(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save changes");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {!hideCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            aria-label="Close form"
          >
            <RiCloseLine className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-lg border border-red-500/60 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {fields.map((field) => {
            const value = formState[field.name];
            const isWide =
              field.wide ??
              ["textarea", "list", "image", "images"].includes(field.type);

            return (
              <div
                key={field.name}
                className={isWide ? "md:col-span-2" : undefined}
              >
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {field.label}
                  {field.required ? " *" : ""}
                </label>

                {field.type === "textarea" || field.type === "list" ? (
                  <textarea
                    value={String(value ?? "")}
                    onChange={(event) => setValue(field.name, event.target.value)}
                    required={field.required}
                    rows={field.rows ?? (field.type === "list" ? 5 : 4)}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 resize-y"
                  />
                ) : field.type === "select" ? (
                  <select
                    value={String(value ?? "")}
                    onChange={(event) => setValue(field.name, event.target.value)}
                    required={field.required}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-violet-500"
                  >
                    {(field.options ?? []).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "checkbox" ? (
                  <label className="inline-flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-slate-200">
                    <input
                      type="checkbox"
                      checked={Boolean(value)}
                      onChange={(event) => setValue(field.name, event.target.checked)}
                      className="w-4 h-4 accent-violet-600"
                    />
                    Enabled
                  </label>
                ) : field.type === "image" || field.type === "images" ? (
                  <div className="space-y-3">
                    {field.type === "images" ? (
                      <textarea
                        value={String(value ?? "")}
                        onChange={(event) => setValue(field.name, event.target.value)}
                        rows={field.rows ?? 4}
                        placeholder={field.placeholder ?? "One image URL per line"}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 resize-y"
                      />
                    ) : (
                      <input
                        type="url"
                        value={String(value ?? "")}
                        onChange={(event) => setValue(field.name, event.target.value)}
                        required={field.required}
                        placeholder={field.placeholder ?? "https://..."}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-violet-500"
                      />
                    )}

                    <label className="flex items-center justify-center gap-2 w-full px-4 py-5 border-2 border-dashed border-slate-600 rounded-lg hover:border-violet-500 transition-colors cursor-pointer bg-slate-700/50 text-slate-300">
                      <RiImageAddLine className="w-5 h-5" />
                      {uploadingField === field.name
                        ? "Uploading..."
                        : field.type === "images"
                          ? "Upload image(s)"
                          : "Upload image"}
                      <input
                        type="file"
                        accept="image/*"
                        multiple={field.type === "images"}
                        onChange={(event) => handleUpload(field, event)}
                        disabled={uploadingField === field.name}
                        className="hidden"
                      />
                    </label>

                    {String(value ?? "").trim() && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {splitList(String(value), "line").slice(0, 4).map((url) => (
                          <img
                            key={url}
                            src={url}
                            alt=""
                            className="h-24 w-full rounded-lg object-cover bg-slate-900 border border-slate-700"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <input
                    type={field.type === "tags" ? "text" : field.type}
                    value={String(value ?? "")}
                    onChange={(event) => setValue(field.name, event.target.value)}
                    required={field.required}
                    placeholder={field.placeholder}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-violet-500"
                  />
                )}

                {field.helper && (
                  <p className="mt-1.5 text-xs text-slate-500">{field.helper}</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-end gap-3 pt-2">
          {!hideCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
          )}
          <Button type="submit" disabled={saving || Boolean(uploadingField)}>
            {saving ? "Saving..." : submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
}
