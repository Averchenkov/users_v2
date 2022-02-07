import {MutationTree} from "vuex";
import {User} from "@/types";
import { State } from './state'
import {MutationTypes} from "./mutation-types";

export type Mutations<S = State> = {
    [MutationTypes.UPDATE_USERS](state: S, users: User[]): void,
    [MutationTypes.UPDATE_LOADING](state: S, lading: boolean): void,
    [MutationTypes.EDIT_USER](state: S, newUser: User): void,
    [MutationTypes.DELETE_USER](state: S, userId: number): void
}

export const mutations: MutationTree<State> & Mutations= {
    [MutationTypes.UPDATE_USERS](state , users: User[]) {
        state.users = users
    },
    [MutationTypes.UPDATE_LOADING](state, loading: boolean) {
        state.loading = loading
    },
    [MutationTypes.EDIT_USER](state, newUser: User) {
        let oldUser = state.users.find(user => user.id === newUser.id)
        if (oldUser && !isEqual(oldUser, newUser)){
            let newUsers = state.users.map(user => {
                if(user.id === newUser.id){
                    return newUser
                } else return user
            })
            localStorage.setItem("users", JSON.stringify(newUsers))
            state.users = newUsers
        }
    },
    [MutationTypes.DELETE_USER](state, userId: number) {
        let newUsers: User[] = state.users.filter(user => user.id !== userId)
        localStorage.setItem("users", JSON.stringify(newUsers))
        state.users = newUsers
    }
}

function isEqual(user: User, newUser: User) {
    return (user.id === newUser.id &&
        user.first_name === newUser.first_name &&
        user.last_name === newUser.last_name &&
        user.email === newUser.email &&
        user.avatar === newUser.avatar)
}