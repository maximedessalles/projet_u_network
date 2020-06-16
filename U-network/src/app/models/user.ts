export default interface User {
    _id?:string,
    isLoggedIn?: boolean,
    civilite:string,
    email: string,
    image?:string,
    name:string,
    firstName : string,
    password?: string,
    telephone?:string,
    isMailValid?:boolean,
    role?:[string],
    etude?:[
        {
            formation: string,
            promotion: string,
            filiere?:   string
        }
    ],
    experience?:[{
        entreprise:String,
        dateDebut:Date,
        dateFin:Date,
        libelle_poste:string,
        salaire:string,
        description:string
    }],
    user_add?:[string],
    user_wait?:[string],
    user_friend?:[string],
    isRGPDAcceptedRegister?:Boolean,
    isRGPDAcceptedLogin?:Boolean,
    forcePasswordChange?:Boolean
}
