/* eslint-disable */
export type CreateStoreRequest = {
  code: string;
  name: string;
  postalCode?: string | null | undefined;
  address?: string | null | undefined;
  phoneNumber?: string | null | undefined;
  useFlag?: boolean | undefined;
}

export type CreateUnitRequest = {
  code: string;
  name: string;
  useFlag?: boolean | undefined;
}

export type LoginRequest = {
  userName: string;
  password: string;
}

export type LoginResponse = {
  token?: string | null | undefined;
  userName?: string | null | undefined;
  role?: string | null | undefined;
  expiresAtUtc?: string | undefined;
}

export type StoreDto = {
  sid?: number | undefined;
  code?: string | null | undefined;
  name?: string | null | undefined;
  postalCode?: string | null | undefined;
  address?: string | null | undefined;
  phoneNumber?: string | null | undefined;
  useFlag?: boolean | undefined;
  displayOrderNumber?: number | undefined;
  version?: string | null | undefined;
}

export type StoreDtoPagedResult = {
  items?: StoreDto[] | null | undefined;
  pageNumber?: number | undefined;
  pageSize?: number | undefined;
  totalCount?: number | undefined;
  totalPages?: number | undefined;
  hasPreviousPage?: boolean | undefined;
  hasNextPage?: boolean | undefined;
}

export type UnitDto = {
  sid?: number | undefined;
  code?: string | null | undefined;
  name?: string | null | undefined;
  useFlag?: boolean | undefined;
  displayOrderNumber?: number | undefined;
  version?: string | null | undefined;
}

export type UnitDtoPagedResult = {
  items?: UnitDto[] | null | undefined;
  pageNumber?: number | undefined;
  pageSize?: number | undefined;
  totalCount?: number | undefined;
  totalPages?: number | undefined;
  hasPreviousPage?: boolean | undefined;
  hasNextPage?: boolean | undefined;
}

export type UpdateDisplayOrderRequest = {
  orderedSids?: number[] | null | undefined;
}

export type UpdateStoreRequest = {
  code: string;
  name: string;
  postalCode?: string | null | undefined;
  address?: string | null | undefined;
  phoneNumber?: string | null | undefined;
  useFlag?: boolean | undefined;
  version: string;
}

export type UpdateUnitRequest = {
  code: string;
  name: string;
  useFlag?: boolean | undefined;
  version: string;
}
