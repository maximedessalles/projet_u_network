export default interface Actualite {
    corps: string,
    file?: File,
    lien?: string,
    video?: File,
    groupeId?:string,
    creator:string,
    createdOn: Date,
    like?: [string],
    comments?: [{
        creator:string,
        date:Date,
        content:string
    }]
}
