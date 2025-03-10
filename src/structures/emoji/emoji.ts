import type { User } from "../user/User.ts";

export interface EmojiStructure {
    id: string;
    name: string;
    roles?: (any)[];
    user?: User;
    require_colons?: boolean;
    managed?: boolean;
    animated?: boolean;
    avivavle?: boolean;
};
export class Emoji implements EmojiStructure{
    readonly id: string;
    name: string;;
    constructor(id: string, name: string){
        this.id = id;
        this.name = name;
    }
}