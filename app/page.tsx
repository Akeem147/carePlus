"use client";

import { useEffect, useState } from "react";
import PatientForm from "@/components/forms/PatientForm";
import PassKeyModal from "@/components/PassKeyModal";
import Image from "next/image";
import Link from "next/link";



export default function Home({ searchParams }: SearchParamProps) {
  const [resolvedSearchParams, setResolvedSearchParams] = useState<
    { [key: string]: string | string[] | undefined } | null
  >(null);

  useEffect(() => {
    async function resolveParams() {
      const resolved = await searchParams;
      setResolvedSearchParams(resolved);
      console.log("Resolved Search Params:", resolved);
    }
    resolveParams();
  }, [searchParams]);

  if (!resolvedSearchParams) {
    return <div>Loading...</div>; // Show a loader while resolving searchParams
  }

  const isAdmin = resolvedSearchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PassKeyModal />}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            className="mb-12 h-10 w-fit"
            src={"/assets/icons/logo-full.svg"}
            alt="patient"
            width={1000}
            height={1000}
          />

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 lg:text-left">
              &copy; 2024 CarePlus
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        className="side-img max-w-[50%]"
        src={"/assets/images/onboarding-img.png"}
        alt="patient"
        width={1000}
        height={1000}
      />
    </div>
  );
}
