"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Spinner } from "@/components/ui/spinner";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data?.session) {
        // Session is active, redirect to dashboard
        router.push("/dashboard");
      } else {
        console.error("No session found or auth error", error);
        router.push("/signin"); // fallback
      }
    };

    handleRedirect();
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner className="w-10 h-10" />
    </div>
  );
}
