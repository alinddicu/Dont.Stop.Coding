/// <reference path="../../../../typings/linq.d.ts"/>

'use strict';

namespace Gol.Logic {
	import CellState = GoL.Logic.CellState;

	export class Cell {
		private computeNextMutations: IComputeNextMutation[] =
			[
				new ShouldResurectNextMutation(),
				new ShouldStayAliveNextMutation(),
				new ShouldDieNextMutation()
			];

		public x: number;
		public y: number;
		public state: CellState;
		public nextState: CellState;

		constructor(x: number, y: number, state: CellState = CellState.Dead, nextState: CellState = CellState.Unknown) {
			this.x = x;
			this.y = y;
			this.state = state;
			this.nextState = nextState;
		}

		public static fromJsonArray(jsonCellsArray: string): Cell[] {
			return Enumerable.from(JSON.parse(jsonCellsArray))
				.cast<IJsonCell>().
				select((cell: IJsonCell) => new Cell(cell.x, cell.y))
				.toArray();
		}

		public isAlive(): boolean {
			return this.state === CellState.Alive;
		}

		public computeNextMutation(aliveNeighboursCount: number): void {
			const nextComputation = Enumerable.from(this.computeNextMutations)
				.firstOrDefault((m: IComputeNextMutation) => m.canComputeNextMutation(this, aliveNeighboursCount));
			
			if (nextComputation) {
				nextComputation.computeNextMutation(this);
			}
		}

		public completeMutation(): void {
			if (this.nextState === CellState.Unknown) {
				return;
			}

			this.state = this.nextState;
			this.nextState = CellState.Unknown;
		}

		public static equals(a: Cell, b: Cell): boolean {
			if (!a || !b) {
				return false;
			}

			return a.x === b.x && a.y === b.y;
		}
		
		public toString(): string
		{
			return `{"x":${this.x},"y":${this.y}}`;
		}
	}

	interface IComputeNextMutation {
		canComputeNextMutation(cell: Cell, aliveNeighboursCount: number): boolean;

		computeNextMutation(cell: Cell): void;
	}

	class ShouldResurectNextMutation implements IComputeNextMutation {
		public canComputeNextMutation(cell: Cell, aliveNeighboursCount: number): boolean {
			return cell.state === CellState.Dead && aliveNeighboursCount === 3;
		}

		public computeNextMutation(cell: Cell): void {
			cell.nextState = CellState.Alive;
		}
	}

	class ShouldStayAliveNextMutation implements IComputeNextMutation {
		public canComputeNextMutation(cell: Cell, aliveNeighboursCount: number): boolean {
			return cell.state === CellState.Alive && (aliveNeighboursCount === 2 || aliveNeighboursCount === 3);
		}

		public computeNextMutation(cell: Cell): void {
			cell.nextState = CellState.Alive;
		}
	}

	class ShouldDieNextMutation implements IComputeNextMutation {
		public canComputeNextMutation(cell: Cell, aliveNeighboursCount: number): boolean {
			return cell.state === CellState.Alive && (aliveNeighboursCount < 2 || aliveNeighboursCount >= 4);
		}

		public computeNextMutation(cell: Cell): void {
			cell.nextState = CellState.Dead;
		}
	}

	interface IJsonCell {
		x: number;
		y: number;
	}
}
