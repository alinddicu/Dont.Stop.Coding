/// <reference path="../node_modules/@types/jasmine/index.d.ts"/>
/// <reference path="../../Dont.Stop.Coding.Web/src/scripts/GameOfLife/Logic/CellState.ts"/>

describe("GoL.Logic.CellState", () => {
	it("Alive != Dead", () => {
		expect(GameOfLife.Logic.CellState.Alive).toEqual(GameOfLife.Logic.CellState.Dead);
	});
});