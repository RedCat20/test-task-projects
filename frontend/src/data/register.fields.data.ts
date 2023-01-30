import { IFormInput } from "../types/form.input.types";

export const REGISTER_INPUTS: IFormInput[] = [
    {
        name: "email",
        type: "text",
        validation: "email",
        fullWidth: true,
        marginBottom: 10,
        title: "Email",
        errorMessage: "Email must have a special format such as email@email.com and can not be empty",
        validator: '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$'
    },
    {
        name: "password",
        type: "password",
        validation: "password",
        fullWidth: true,
        marginBottom: 0,
        title: "Password",
        errorMessage: "Password must be minimum 6 characters in length and contains 1 big letter, 1 small letter, 1 number and 1 special symbol",
        //validator: '^(?=.{3,30}$).*'
        validator: '(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*'
    }
]