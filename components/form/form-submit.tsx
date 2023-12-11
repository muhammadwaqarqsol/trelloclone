"use client";

import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Children } from "react";

interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "ghost"
    | "outline"
    | "secondary"
    | "link"
    | "primary";
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant,
}: FormSubmitProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      className={cn(className)}
      variant={variant}
      size={"sm"}
    >
      {children}
    </Button>
  );
};
