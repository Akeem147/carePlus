import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";



const Appointment = async ({ params }: { params: { userId: string } }) => { 
  // Fetch the patient using the userId
  const { userId } = params;
 
  
  const patient = await getPatient(userId);

  if (!patient) {
    return <div>Patient not found</div>;
  }
  
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            className="mb-12 h-10 w-fit"
            src={"/assets/icons/logo-full.svg"}
            alt="patient"
            width={1000}
            height={1000}
          />

          <AppointmentForm
            patientId={patient.$id}
            userId={userId}
            type="create"
          />

          <p className="copyright mt-10 py-12">
            &copy; 2024 CarePlus
          </p>
        </div>
      </section>

      <Image
        className="side-img max-w-[390px] bg-bottom"
        src={"/assets/images/appointment-img.png"}
        alt="appointment"
        width={1000}
        height={1000}
      />
    </div>
  );
}

export default Appointment;
