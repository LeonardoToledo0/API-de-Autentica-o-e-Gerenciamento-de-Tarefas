/* eslint-disable prettier/prettier */
export class User {
    constructor(
        public id: string,
        public email: string,
        public username: string,
        public password: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) { }
}
