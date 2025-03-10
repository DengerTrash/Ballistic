import { Client } from "../../mod.ts";
import { Base } from "../base/Base.ts";

export interface AutoModerationRuleStructure {
    id: string;
    guild_id: string;
    name: string;
    creator_id: string;
    event_type: number;
    trigger_type: number;
    trigger_metadata: AutoModerationRuleTriggerMetadata;
    actions: (AutoModerationAction)[];
    enabled: boolean;
    exempt_roles: (string)[];
    exempt_channels: (string)[];
}
interface AutoModerationRuleTriggerMetadata {
    keyword_filter: (string)[];
    regex_paterns: (string)[];
    presets: (any)[];
    allow_list: (string)[];
    mention_total_limit: number;
    mention_raid_protection_enabled: boolean;
}
interface AutoModerationAction {
    type: number;
    metadata: any;
}

/**
 * automoderationのベースです。現状では特別なことはありません。
 */
export class AutoModerationRule extends Base{
    constructor(client: Client){
        super(client)
    }
}