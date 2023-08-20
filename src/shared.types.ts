import type { PublicUserData } from '@clerk/types';


export interface House {
  id: number;
  address: string;
  admin_needs_to_approve: boolean;
  login_images: string[];
  house_admins: string[];
  house_name: string;
}

export interface Booking {
  id: number;
  start_date: Date;
  end_date: Date;
  approved: boolean;
  house_id: string;
  user_bookings: string;
}

export interface BookingResponseData {
  booking: Booking;
  user: PublicUserData;
}

export interface Family {
  id: number;
  family_name: string;
  members: string[];
  house_id: string;
}






