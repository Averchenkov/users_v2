import { GetterTree } from 'vuex'
import { State } from './state'
import {User} from "@/types";

export type Getters = {
    getUsers(state: State): User[],
    isLoading(state: State): boolean
}

export const getters: GetterTree<State, State> & Getters = {
    getUsers(state): User[] {
        return state.users
    },
    isLoading(state): boolean {
        return state.loading
    }
}