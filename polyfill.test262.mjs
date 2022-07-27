import path from "path";
import tape from "tape";
import Test262Stream from "test262-stream";
import NodeAgent from "eshost/lib/agents/node.js";
import { readFileSync } from "fs";

const POLYFILL = readFileSync(
	new URL("./polyfill.js", import.meta.url),
	"utf-8"
);

const agent = new NodeAgent({
	hostPath: process.argv0,
	transform(source) {
		return POLYFILL + ";\n" + source;
	},
});

const testsPaths = [
	["Array", "toReversed"],
	["Array", "toSorted"],
	["Array", "toSpliced"],
	["Array", "with"],
	["Array", "Symbol.unscopables/change-array-by-copy.js"],
	["TypedArray", "toReversed"],
	["TypedArray", "toSorted"],
	["TypedArray", "with"],
].map(
	([constructor, method]) => `test/built-ins/${constructor}/prototype/${method}`
);

const tests = new Test262Stream(
	new URL("./test262", import.meta.url).pathname,
	{ paths: testsPaths }
);

for await (const test of tests) {
	tape(`[${test.file}] ${test.attrs.description}`, async (t) => {
		const result = await timeout(30_000, agent.evalScript(test));
		if (result.error) {
			t.fail(Object.assign(new Error(), result.error));
		} else {
			t.pass("PASSED");
		}
		t.end();
	});
}

function timeout(time, promise) {
	return new Promise((resolve, reject) => {
		const timeout = setTimeout(() => reject(new Error("Timed out")), time);
		promise.finally(() => clearTimeout(timeout));
		promise.then(resolve, reject);
	});
}
