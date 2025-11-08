"use client";

import { MensagemIcon } from "@/app/utils/mensagens";
import { useEffect, useState } from "react";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  mensagem: string;
  type: ToastType;
  duracao?: number;
  onClose: () => void;
}

export function Toast({ mensagem, type, duracao = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 10000);
    }, duracao);

    return () => clearTimeout(timer);
  }, [duracao, onClose]);

  const bgColors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  const icons = {
    success: MensagemIcon.success,
    error: MensagemIcon.error,
    info: MensagemIcon.info,
    warning: MensagemIcon.warning,
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 transform ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div
        className={`${bgColors[type]} text-white px-6 py-4 rounded-lg shadow-lg max-w-md flex items-center gap-3`}
      >
        <span className="material-symbols-outlined text-2xl">
          {icons[type]}
        </span>
        <p className="flex-1">{mensagem}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="text-white hover:text-gray-200"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<
    Array<{ id: number; message: string; type: ToastType }>
  >([]);

  const showToast = (message: string, type: ToastType = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const ToastContainer = () => (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          mensagem={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  );

  return { showToast, ToastContainer };
}