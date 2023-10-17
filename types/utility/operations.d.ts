import { AnyProperty } from "./fields";

export interface Creatable<T, D> {
    create(data: D, param?: AnyProperty): Promise<T>
}

export interface SystemFunction<T> {
    update(param?: AnyProperty): Promise<T>
    fetch(param?: AnyProperty): Promise<T>
    delete(param?: AnyProperty): Promise<T>
}