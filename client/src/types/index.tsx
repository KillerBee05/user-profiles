export interface Profile {
    picture: string;
    name: string;
    email: string;
    phone: string;
    location: string;
}

export interface User {
    name: {
        first: string;
        last: string;
        };
        email: string;
        phone: string;
        picture: {
        large: string;
    };
        location: {
        city: string;
        country: string;
    };
}