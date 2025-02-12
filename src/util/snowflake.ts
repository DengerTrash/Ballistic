export function converSnowflake(data: string){
	const bigg = BigInt(data).toString(2)

	const timestamp = parseInt(bigg.substring(0, 41), 2) + 1420070400000;
	const workedId = parseInt(bigg.substring(42, 46), 2);
	const processId = parseInt(bigg.substring(47, 51), 2);
	const increment = parseInt(bigg.substring(52, 63), 2);
	return bigg.substring(52, 63)
}

console.log(converSnowflake('1324304164175614003'));
//console.log(converSnowflake('11451419194545931810'));