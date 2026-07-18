import { expect, test } from "vitest"
import { mapUserToInsert, mappedUser } from "./mappers"
import type { UserDTO } from "../api/dto"
import type { IUser } from "../model/types"

test("map user from dto to domain", () => {
  const userDTO: UserDTO = {
    id: 1,
    user_id: 100001,
    address: "address",
    auth_user_id: "529sdlkjflksdjfasd09246ut345",
    flat: 1,
    name: "konstantin",
    number: "899944412312",
    floor: 1,
    username: "@shpala54",
    created_at: new Date().toISOString(),
  }

  expect(mappedUser(userDTO)).toEqual<IUser>({
    id: 1,
    userId: 100001,
    address: "address",
    flat: 1,
    name: "konstantin",
    number: "899944412312",
    floor: 1,
    username: "@shpala54",
  })
})

test("map user with null fields to defaults", () => {
  const userDTO: UserDTO = {
    id: 1,
    user_id: 100001,
    address: null,
    auth_user_id: null,
    flat: null,
    name: "konstantin",
    number: null,
    floor: null,
    username: null,
    created_at: new Date().toISOString(),
  }

  expect(mappedUser(userDTO)).toEqual<IUser>({
    id: 1,
    userId: 100001,
    address: "",
    flat: null,
    name: "konstantin",
    number: "",
    floor: null,
    username: "",
  })
})

test("map domain user to insert dto", () => {
  const user: IUser = {
    id: 1,
    userId: 100001,
    address: "address",
    flat: 1,
    name: "konstantin",
    number: "899944412312",
    floor: 1,
    username: "@shpala54",
  }

  expect(mapUserToInsert(user)).toEqual({
    name: "konstantin",
    user_id: 100001,
    username: "@shpala54",
    number: "899944412312",
    address: "address",
    flat: 1,
    floor: 1,
  })
})

test("map empty optional fields to null in insert dto", () => {
  const user: IUser = {
    id: 1,
    userId: 100001,
    address: "",
    flat: null,
    name: "konstantin",
    number: "",
    floor: null,
    username: "",
  }

  expect(mapUserToInsert(user)).toEqual({
    name: "konstantin",
    user_id: 100001,
    username: null,
    number: null,
    address: null,
    flat: null,
    floor: null,
  })
})
