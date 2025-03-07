export interface Localizations {
    id: string
    da: string
    de: string
    'en-GB': string
    'en-US': string
}

export interface CommandOptions {
    string_option?: Array<StringOption>;
    number_option?: Array<NumberOption>;
    user_option?: Array<UserOption>;
    channel_option?: Array<ChannelOption>;
    role_option?: Array<RoleOption>;
}
export interface CommandOptionPayload {
    name: string;
    name_localizations?: Localizations;
    description: string;
    description_localizations?: Localizations;
    required?: true;
    option?: CommandOptionPayload
}

export interface CommandOptionStructure extends Omit<CommandOptionPayload,'option'> {
    type: number;
}

export interface SubCommand extends CommandOptionPayload {

}
export interface StringOption extends Omit<CommandOptionPayload,'option'> {

}
export interface NumberOption extends Omit<CommandOptionPayload,'option'> {

}
export interface UserOption extends Omit<CommandOptionPayload,'option'> {

}
export interface ChannelOption extends Omit<CommandOptionPayload,'option'> {

}
export interface RoleOption extends Omit<CommandOptionPayload,'option'> {

}