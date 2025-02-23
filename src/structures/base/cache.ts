import type { Client } from '../../mod.ts';

/**
 * キャッシュを保存できるabstractクラスです。
 */
export abstract class Cache {
	public client: Client;
	public cache = new Map<string, any>;

	constructor(client: Client){
		this.client = client;
	}
	/**
	 * 書き換え専用メソッド。
	 * @param key 
	 * @param data 
	 */
	public _update(key: string, data: any){
		this.cache.set(key, data);
	}
	/**
	 * keyのキャッシュをゲットします。
	 * @param key 
	 * @returns 
	 */
	public _takeit(key: string): any{
		const result = this.cache.get(key);
		return result;
	}
	/**
	 * キャッシュにアクセスし、発見できた場合はそのインスタンスを、ない場合は第二引数で指定したインスタンスが生成され、それ自身を返します。
	 * @param key 
	 * @param doodoo 
	 * @returns 
	 */
	public access(key: string, doodoo: () => any){
		const result = this._takeit(key);
		if(result) return result;
		else{
			const rere = doodoo()
			this.cache.set(key, rere)
			return rere;
		}
	}
	/**
	 * キャッシュを削除します。
	 * @param key 
	 */
	public _delete(key: string){
		const result = this.cache.get(key);
		if(!result){
			this.cache.delete(key);
		}
	}
}