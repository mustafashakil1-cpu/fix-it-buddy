import { useRef } from 'react';

interface LogoUploadProps {
  value?: string;
  onChange: (dataUrl: string | undefined) => void;
  label?: string;
}

const MAX_BYTES = 2 * 1024 * 1024;

function LogoUpload({ value, onChange, label = 'Company Logo' }: LogoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please choose an image file (PNG, JPG or SVG).');
      return;
    }
    if (file.size > MAX_BYTES) {
      alert('Image is too large. Please use an image under 2 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange(typeof reader.result === 'string' ? reader.result : undefined);
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-green-900 dark:text-white">{label}</p>
      <div className="flex items-center gap-3">
        <div className="h-16 w-16 shrink-0 rounded-md border border-green-200 dark:border-slate-600 bg-white flex items-center justify-center overflow-hidden">
          {value ? (
            <img src={value} alt="Company logo preview" className="h-full w-full object-contain" />
          ) : (
            <span className="text-[10px] text-green-500 text-center px-1">No logo</span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-sm font-semibold bg-green-600 hover:bg-red-800 text-white px-3 py-1.5 rounded-md transition-colors"
          >
            {value ? 'Change logo' : 'Upload logo'}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange(undefined)}
              className="text-sm font-semibold text-red-600 hover:underline px-1"
            >
              Remove
            </button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            handleFile(e.target.files?.[0]);
            e.target.value = '';
          }}
        />
      </div>
      <p className="text-xs text-green-600">PNG, JPG or SVG — max 2 MB. Shown on the printed document.</p>
    </div>
  );
}

export default LogoUpload;
