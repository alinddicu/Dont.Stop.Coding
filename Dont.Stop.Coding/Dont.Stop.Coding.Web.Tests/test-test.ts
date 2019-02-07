/// <reference path="./Scripts/typings/jasmine/jasmine.d.ts"/>
/// <reference path="../Dont.Stop.Coding.Web/src/scripts/GoL/Logic/CellState.ts"/>

describe("GoL.Logic.CellState", () => {
	it("Alive != Dead", () => {
		expect(GoL.Logic.CellState.Alive).toEqual(GoL.Logic.CellState.Dead);
	});
});