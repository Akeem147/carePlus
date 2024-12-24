import {DataTable} from "@/components/table/DataTable";
import StatCard from "@/components/StatCard";
import { columns} from "@/components/table/columns";
import { getRecentAppointmentList } from "@/lib/actions/appointment.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";



const Admin = async () => {

    const appointments = await getRecentAppointmentList()
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link className="cursor-pointer" href={"/"}>
          <Image
            className="h-8 w-fit"
            src={"/assets/icons/logo-full.svg"}
            width={162}
            height={32}
            alt="logo"
          />
          <p className="text-16-semibold">Admin Dashboard</p>
        </Link>
      </header>

      <main className="admin-main ">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing your appointment.
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduleCount}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelCount}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

        <DataTable columns={columns} data={appointments.documents}/>
      </main>
    </div>
  );
};

export default Admin;
