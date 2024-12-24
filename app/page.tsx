import PatientForm from "@/components/forms/PatientForm";
import PassKeyModal from "@/components/PassKeyModal";
import Image from "next/image";
import Link from "next/link";

export default function Home({searchParams}: SearchParamProps) {
  const isAdmin = typeof searchParams?.admin === "string" && searchParams.admin === "true";
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
