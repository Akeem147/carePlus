"use server";
import { ID, Query } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_DATABASE_ID,
  databases,
  messaging,

} from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";

import { revalidatePath } from "next/cache";

// Function to create a new appointment
export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      NEXT_PUBLIC_DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};

// Function to get a single appointment by ID
export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      NEXT_PUBLIC_DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
  }
};

// Function to get a list of recent appointments with counts
export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      NEXT_PUBLIC_DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    // Ensure appointments.documents is an array before proceeding
    const documents = Array.isArray(appointments.documents)
      ? appointments.documents
      : [];

    // Initialize counts
    const initialCounts = {
      scheduleCount: 0,
      pendingCount: 0,
      cancelCount: 0,
    };

    // Safely reduce the documents array to count statuses
    const counts = documents.reduce((acc, appointment) => {
      if (appointment.status === "scheduled") {
        acc.scheduleCount += 1;
      } else if (appointment.status === "pending") {
        acc.pendingCount += 1;
      } else if (appointment.status === "cancelled") {
        acc.cancelCount += 1;
      }
      return acc;
    }, initialCounts);

    // Prepare the data to return, including the counts and documents
    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.error("An error occurred while retrieving appointments:", error);
  }
};

// Function to update an existing appointment
export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      NEXT_PUBLIC_DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );
    if (!updatedAppointment) {
      throw new Error("Appointment not found!");
    }

    // Send SMS message based on appointment type
    const smsMessage = `Greetings from CarePlus. ${
      type === "schedule"
        ? `Your appointment has been scheduled for ${
            formatDateTime(appointment.schedule!).dateTime
          } with Dr. ${appointment.primaryPhysician}`
        : `We regret to inform that your appointment for ${
            formatDateTime(appointment.schedule!).dateTime
          } is cancelled. Reason:  ${appointment.cancellationReason}`
    }.`;

    // Send SMS notification
    await sendSMSNotification(userId, smsMessage);

    // Revalidate the path for admin page
    revalidatePath("/admin");

    return parseStringify(updatedAppointment);
  } catch (error) {
    console.log(error);
  }
};

// Function to send SMS notification
export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );
    return parseStringify(message);
  } catch (error) {
    console.log(error);
  }
};
