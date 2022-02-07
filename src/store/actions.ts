import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import { Mutations } from './mutations'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import {User} from "@/types";
import axios from "axios";

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
    [ActionTypes.FETCH_USERS](
        { commit }: AugmentedActionContext,
        payload: User[] | boolean
    ): void
    [ActionTypes.UPDATE_USERS](
        { commit }: AugmentedActionContext,
        payload: User[] | boolean
    ): void
}

export const actions: ActionTree<State, State> & Actions = {
    async [ActionTypes.FETCH_USERS]({ commit }) {
        let data = localStorage.getItem("users")
        let users: User[] = data ? JSON.parse(data) : null
        if (!users) {
            commit(MutationTypes.UPDATE_LOADING, false)
            await axios.get("https://reqres.in/api/users?page=2")
                .then(response => {
                    users = response.data.data
                    users = validation(users)
                    localStorage.setItem("users", JSON.stringify(users))
                })
                .catch(e => {
                    throw e
                })
            await sleep(1000)
        }
        commit(MutationTypes.UPDATE_USERS, users)
        commit(MutationTypes.UPDATE_LOADING, true)
    },
    async [ActionTypes.UPDATE_USERS]({ commit }) {
        commit(MutationTypes.UPDATE_LOADING, false)
        await axios.get("https://reqres.in/api/users?page=2")
            .then(response => {
                let users: User[] = response.data.data
                users = validation(users)
                localStorage.setItem("users", JSON.stringify(users))
                commit(MutationTypes.UPDATE_USERS, users)
            })
            .catch(e => {
                throw e
            })
        await sleep(1000)
        commit(MutationTypes.UPDATE_LOADING, true)
    },
}

function sleep(ms: number): Promise<number> {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

function validation(users: User[]): User[]{
    let newUsers = users.filter(user => {
        if (!validationName(user.first_name)) {
            console.warn("Неправильное имя", user)
            return false
        }
        if (!validationName(user.last_name)) {
            console.warn("Неправильная фамилия", user)
            return false
        }
        if (!validationEmail(user.email)) {
            console.warn("Неправильный email", user)
            return false
        }
        if (!validationLink(user.avatar)) {
            console.warn("Неправильный ссылка на аватар", user)
            return false
        }
        return true
    })
    return newUsers
}

function validationName(name: string): boolean{
    let pattern = new RegExp("^[A-Za-z]+$", "i")
    return pattern.test(name)
}

function validationEmail(email: string): boolean{
    let pattern = new RegExp("^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$", "i");
    return pattern.test(email)
}

function validationLink(link: string): boolean{
    var pattern = new RegExp('^(https?:\\/\\/)?'+
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+
        '((\\d{1,3}\\.){3}\\d{1,3}))'+
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
        '(\\?[;&a-z\\d%_.~+=-]*)?'+
        '(\\#[-a-z\\d_]*)?$','i');
    return pattern.test(link)
}