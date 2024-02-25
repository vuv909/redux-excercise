import restClient from "./restClient"

type TLogin = {
    email : string,
    password : string
}

export const login = ( data : TLogin) =>{
    return restClient(
        {
            url: "auth/login",
            method: "POST",
            data: data
        }
    )
}