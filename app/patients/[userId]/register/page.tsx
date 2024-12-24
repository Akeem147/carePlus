import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import React from "react";

const Register = async ({ params }: SearchParamProps) => {
  const { userId } = params; // Safely destructure inside the function
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            className="mb-12 h-10 w-fit"
            src={"/assets/icons/logo-full.svg"}
            alt="patient"
            width={1000}
            height={1000}
          />

          <RegisterForm user={user} />

          <p className="copyright py-12">&copy; 2024 CarePlus</p>
        </div>
      </section>

      <Image
        className="side-img max-w-[390px]"
        src={"/assets/images/register-img.png"}
        alt="patient"
        width={1000}
        height={1000}
      />
    </div>
  );
};

export default Register;
