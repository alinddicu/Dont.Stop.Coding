/// <reference path="./node_modules/@types/jasmine/index.d.ts" />
/// <reference path="../Dont.Stop.Coding.Web/src/scripts/GoL/Logic/CellState.ts"/>

describe('GoL.Logic.CellState', function () {
	it('Alive != Dead', function () {
		expect(GoL.Logic.CellState.Alive != GoL.Logic.CellState.Dead).toEqual(true);
	});
});