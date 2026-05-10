import type { Metadata } from "next";
import { BookingDashboard } from "@/components/dashboard/booking/booking-dashboard";

export const metadata: Metadata = {
  title: "Booking & Payment | SA'YA Umroh OS",
  description: "Bookings and payments with status and invoice preview for SA'YA Umroh.",
};

export default function BookingPage() {
  return <BookingDashboard />;
}
