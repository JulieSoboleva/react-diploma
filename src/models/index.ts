import { PayloadAction } from "@reduxjs/toolkit";

export interface DataItem {
    id: number,
    category: string,
    title: string,
    price: string,
    images: string[],
}

export interface Category {
    id: number,
    title: string,
}

export interface ItemDetails {
    id: string | number,
    category: string | number,
    title: string,
    images: string[],
    sku: string,
    manufacturer: string,
    color: string,
    material: string,
    reason: string,
    season: string,
    heelSize: string,
    price: number,
    oldPrice: number,
    sizes: { 
        size: string,
        available: boolean,
    }[],
}

export interface CartItemModel {
    id: string | number,
    title: string,
    size: string,
    price: number,
    count: number,
}

export interface OrderModel {
    owner: {
        phone: string,
        address: string,
    },
    items: {
        id: number | string,
        price: number,
        count: number,
    }[],
}

export interface IError {
    message: string,
    errFunc: PayloadAction<string | number | OrderModel>,
}