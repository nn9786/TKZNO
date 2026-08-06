/* eslint-disable */
export type CreateCustomerRequest = {
  code: string
  name: string
  customerRankKubun: string
  preferentialDiscountRate?: number | null | undefined
  postalCode?: string | null | undefined
  address?: string | null | undefined
  phoneNumber?: string | null | undefined
  contractStartDate: string
  contractEndDate?: string | null | undefined
  useFlag?: boolean | undefined
}

export type CreateStoreRequest = {
  code: string
  name: string
  postalCode?: string | null | undefined
  address?: string | null | undefined
  phoneNumber?: string | null | undefined
  useFlag?: boolean | undefined
}

export type CreateSupplierRequest = {
  code: string
  name: string
  supplierTypeKubun: string
  corporateNumber?: string | null | undefined
  postalCode?: string | null | undefined
  address?: string | null | undefined
  phoneNumber?: string | null | undefined
  creditLimit?: number | null | undefined
  transactionStartDate: string
  useFlag?: boolean | undefined
}

export type CreateUnitRequest = {
  code: string
  name: string
  useFlag?: boolean | undefined
}

export type CreateUserRequest = {
  userName: string
  name: string
  role: string
  useFlag?: boolean | undefined
  password: string
  confirmPassword: string
}

export type CustomerDto = {
  sid?: number | undefined
  code?: string | null | undefined
  name?: string | null | undefined
  customerRankKubun?: string | null | undefined
  preferentialDiscountRate?: number | null | undefined
  postalCode?: string | null | undefined
  address?: string | null | undefined
  phoneNumber?: string | null | undefined
  contractStartDate?: string | undefined
  contractEndDate?: string | null | undefined
  useFlag?: boolean | undefined
  displayOrderNumber?: number | undefined
  version?: string | null | undefined
  createdDateTime?: string | undefined
  createdName?: string | null | undefined
  modifiedDateTime?: string | undefined
  modifiedName?: string | null | undefined
}

export type CustomerDtoPagedResult = {
  items?: CustomerDto[] | null | undefined
  pageNumber?: number | undefined
  pageSize?: number | undefined
  totalCount?: number | undefined
  sortKey?: string | null | undefined
  sortDirection?: string | null | undefined
  totalPages?: number | undefined
  hasPreviousPage?: boolean | undefined
  hasNextPage?: boolean | undefined
}

export type LoginRequest = {
  userName: string
  password: string
}

export type LoginResponse = {
  token?: string | null | undefined
  sid?: number | undefined
  userName?: string | null | undefined
  name?: string | null | undefined
  role?: string | null | undefined
  expiresAtUtc?: string | undefined
}

export type StoreDto = {
  sid?: number | undefined
  code?: string | null | undefined
  name?: string | null | undefined
  postalCode?: string | null | undefined
  address?: string | null | undefined
  phoneNumber?: string | null | undefined
  useFlag?: boolean | undefined
  displayOrderNumber?: number | undefined
  version?: string | null | undefined
  createdDateTime?: string | undefined
  createdName?: string | null | undefined
  modifiedDateTime?: string | undefined
  modifiedName?: string | null | undefined
}

export type StoreDtoPagedResult = {
  items?: StoreDto[] | null | undefined
  pageNumber?: number | undefined
  pageSize?: number | undefined
  totalCount?: number | undefined
  sortKey?: string | null | undefined
  sortDirection?: string | null | undefined
  totalPages?: number | undefined
  hasPreviousPage?: boolean | undefined
  hasNextPage?: boolean | undefined
}

export type SupplierDto = {
  sid?: number | undefined
  code?: string | null | undefined
  name?: string | null | undefined
  supplierTypeKubun?: string | null | undefined
  corporateNumber?: string | null | undefined
  postalCode?: string | null | undefined
  address?: string | null | undefined
  phoneNumber?: string | null | undefined
  creditLimit?: number | null | undefined
  transactionStartDate?: string | undefined
  useFlag?: boolean | undefined
  displayOrderNumber?: number | undefined
  version?: string | null | undefined
  createdDateTime?: string | undefined
  createdName?: string | null | undefined
  modifiedDateTime?: string | undefined
  modifiedName?: string | null | undefined
}

export type SupplierDtoPagedResult = {
  items?: SupplierDto[] | null | undefined
  pageNumber?: number | undefined
  pageSize?: number | undefined
  totalCount?: number | undefined
  sortKey?: string | null | undefined
  sortDirection?: string | null | undefined
  totalPages?: number | undefined
  hasPreviousPage?: boolean | undefined
  hasNextPage?: boolean | undefined
}

export type UnitDto = {
  sid?: number | undefined
  code?: string | null | undefined
  name?: string | null | undefined
  useFlag?: boolean | undefined
  displayOrderNumber?: number | undefined
  unDeleteFlag?: boolean | undefined
  version?: string | null | undefined
  createdDateTime?: string | undefined
  createdName?: string | null | undefined
  modifiedDateTime?: string | undefined
  modifiedName?: string | null | undefined
}

export type UnitDtoPagedResult = {
  items?: UnitDto[] | null | undefined
  pageNumber?: number | undefined
  pageSize?: number | undefined
  totalCount?: number | undefined
  sortKey?: string | null | undefined
  sortDirection?: string | null | undefined
  totalPages?: number | undefined
  hasPreviousPage?: boolean | undefined
  hasNextPage?: boolean | undefined
}

export type UpdateCustomerRequest = {
  code: string
  name: string
  customerRankKubun: string
  preferentialDiscountRate?: number | null | undefined
  postalCode?: string | null | undefined
  address?: string | null | undefined
  phoneNumber?: string | null | undefined
  contractStartDate: string
  contractEndDate?: string | null | undefined
  useFlag?: boolean | undefined
  version: string
}

export type UpdateDisplayOrderRequest = {
  orderedSids?: number[] | null | undefined
}

export type UpdateStoreRequest = {
  code: string
  name: string
  postalCode?: string | null | undefined
  address?: string | null | undefined
  phoneNumber?: string | null | undefined
  useFlag?: boolean | undefined
  version: string
}

export type UpdateSupplierRequest = {
  code: string
  name: string
  supplierTypeKubun: string
  corporateNumber?: string | null | undefined
  postalCode?: string | null | undefined
  address?: string | null | undefined
  phoneNumber?: string | null | undefined
  creditLimit?: number | null | undefined
  transactionStartDate: string
  useFlag?: boolean | undefined
  version: string
}

export type UpdateUnitRequest = {
  code: string
  name: string
  useFlag?: boolean | undefined
  version: string
}

export type UpdateUserPasswordRequest = {
  password: string
  confirmPassword: string
  version: string
}

export type UpdateUserRequest = {
  userName: string
  name: string
  role: string
  useFlag?: boolean | undefined
  version: string
}

export type UserDto = {
  sid?: number | undefined
  userName?: string | null | undefined
  name?: string | null | undefined
  role?: string | null | undefined
  useFlag?: boolean | undefined
  version?: string | null | undefined
  createdDateTime?: string | undefined
  createdName?: string | null | undefined
  modifiedDateTime?: string | undefined
  modifiedName?: string | null | undefined
}

export type UserDtoPagedResult = {
  items?: UserDto[] | null | undefined
  pageNumber?: number | undefined
  pageSize?: number | undefined
  totalCount?: number | undefined
  sortKey?: string | null | undefined
  sortDirection?: string | null | undefined
  totalPages?: number | undefined
  hasPreviousPage?: boolean | undefined
  hasNextPage?: boolean | undefined
}
