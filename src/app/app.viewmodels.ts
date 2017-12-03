export interface UserVM {
    isLoggedIn: boolean;
    profile: any;
    authProvider: string;
    userId: string;
}

export interface PhotoVM{
    created_time:string;
    height:number;
    id:string;
    picture:string;
    name:string;
    updated_time:string;
    width:string;
}

export interface VideoVM{
    created_time:string;
    id:string;
    picture:string;
    title:string;
    updated_time:string;
    permalink_url:string;
    source:string;
}