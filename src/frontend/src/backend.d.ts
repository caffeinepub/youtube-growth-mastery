import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Lead {
    name: string;
    email: string;
    timestamp: bigint;
}
export interface BlogPost {
    id: bigint;
    title: string;
    content: string;
    date: string;
    imageUrl: string;
    excerpt: string;
    category: string;
}
export interface backendInterface {
    addPost(title: string, category: string, date: string, excerpt: string, content: string, imageUrl: string): Promise<bigint>;
    getLeads(): Promise<Array<Lead>>;
    getPosts(): Promise<Array<BlogPost>>;
    getPostsByCategory(category: string): Promise<Array<BlogPost>>;
    initialize(): Promise<void>;
    submitLead(name: string, email: string): Promise<void>;
}
