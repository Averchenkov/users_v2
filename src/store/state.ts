import {User} from "@/types";

type StateType = {
    users: User[],
    loading: boolean
}

export const state:StateType = {
    users: [],
    loading: false
}

export type State = typeof state


