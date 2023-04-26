export interface Product {
    name: string;
    description: string;
    price: number;
    unit: number;
    rating: number;
    id?: string;
    created?: Date;
    updated?: Date | null;
    active?: boolean;
}
