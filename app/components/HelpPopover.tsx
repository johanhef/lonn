import { useState, useEffect, useRef } from "react";
import { useFloating, autoUpdate, offset, shift } from "@floating-ui/react";
import { HelpCircle } from "lucide-react";

export default function HelpPopover({ helpText }: { helpText: string }) {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(8), shift()], // Smart positioning
    whileElementsMounted: autoUpdate,
  });

  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      {/* Help Icon */}
      <button
        ref={refs.setReference}
        onClick={(event) =>  {
            event.preventDefault()
            setOpen(!open)
          }
        }
        className="flex items-center justify-center w-6 h-6 cursor-pointer"
      >
        <HelpCircle size={18} strokeWidth={1.6} />
      </button>

      {/* Popover Content */}
      {open && (
        <div
          ref={refs.setFloating}
          style={{ ...floatingStyles, zIndex: 9999 }}
          className="p-2 w-48 text-sm bg-white dark:bg-zinc-700 border dark:border-zinc-700 rounded-md shadow-lg"
        >
          {helpText}
        </div>
      )}
    </div>
  );
}
