export interface House {
    id: number;
    address: string;
    admin_needs_to_approve: boolean;
    login_images: string[];
    house_admins: string[];
    house_name: string;
}