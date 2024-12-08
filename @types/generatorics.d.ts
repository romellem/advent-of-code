declare module 'generatorics' {
	interface ChoicesOptions {
		replace?: boolean;
		ordered?: boolean;
	}
	type ArrLike<T> = T[] | string;
	interface GInterface {
		clones: boolean;
		factorial(n: number): number;
		factoradic(n: number): number[];
		P(n: number, k: number): number;
		C(n: number, k: number): number;
		choices(n: number, k: number, options?: ChoicesOptions): number;
		combination<T>(arr: ArrLike<T>, size?: number): Generator<T[], void, unknown>;
		permutation<T>(arr: ArrLike<T>, size?: number): Generator<T[], void, unknown>;
		powerSet<T>(arr: ArrLike<T>): Generator<T[], void, unknown>;
		permutationCombination<T>(arr: ArrLike<T>): Generator<T[], void, unknown>;
		baseN<T>(arr: ArrLike<T>, size?: number): Generator<T[], void, unknown>;
		baseNAll<T>(arr: ArrLike<T>): Generator<T[], void, unknown>;
		cartesian<T>(...sets: ArrLike<T>[]): Generator<T[], void, unknown>;
		shuffle<T>(arr: T[]): T[];

		// Omit 'clone' from GInterface so it doesn't recurse infinitely.
		clone: Omit<GInterface, 'clone'>;
	}
	const G: GInterface;
	export default G;
}
