export default interface Evenement {
    _id?:string,
    titre:string,
    corps: string,
    creator:string,
    createdOn: Date,
    participants?: [string],
    date:Date,
    lieu:string
}
