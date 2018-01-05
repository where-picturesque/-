import request from "../utils/request"

export function get({page}){

    return request(`/api/users?_page=${page}&_limit=3`)
}
