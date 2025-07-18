/* eslint-disable prettier/prettier */
export class Todo {
    constructor(
        public id: string,
        public title: string,
        public description: string | null,
        public completed: boolean,
        public createdAt: Date,
        public updatedAt: Date,
        public userId: string,
    ) { }
}