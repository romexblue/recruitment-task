import { useState } from "react";

type JsonInputProps = {
    label?: string;
    onChange?: (value: Record<string, unknown> | null) => void;
    defaultValue?: Record<string, unknown>;
};

export default function JsonInput({
    label = "Enter or Upload JSON",
    onChange,
    defaultValue,
}: JsonInputProps) {
    const [value, setValue] = useState<string>(
        defaultValue ? JSON.stringify(defaultValue, null, 2) : ""
    );
    const [error, setError] = useState<string>("");

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setValue(newValue);

        if (newValue.trim() === "") {
            setError("");
            onChange?.(null);
            return;
        }

        try {
            const parsed = JSON.parse(newValue) as Record<string, unknown>;
            setError("");
            onChange?.(parsed);
        } catch {
            setError("Invalid JSON");
            onChange?.(null);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== "application/json" && !file.name.endsWith(".json")) {
            setError("Please upload a valid JSON file");
            onChange?.(null);
            return;
        }

        try {
            const text = await file.text();
            setValue(text);
            const parsed = JSON.parse(text) as Record<string, unknown>;
            setError("");
            onChange?.(parsed);
        } catch {
            setError("Invalid JSON in file");
            onChange?.(null);
        }
    };

    return (
        <div className="flex flex-col gap-3 w-full max-w-lg">
            {label && <label className="font-medium">{label}</label>}

            {/* Textarea for manual input */}
            <textarea
                value={value}
                onChange={handleTextChange}
                rows={8}
                className="border rounded-lg p-2 font-mono"
            />
            {/* File upload */}
            <input
                type="file"
                accept="application/json"
                onChange={handleFileChange}
                className="border rounded-lg p-2 cursor-pointer"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}
