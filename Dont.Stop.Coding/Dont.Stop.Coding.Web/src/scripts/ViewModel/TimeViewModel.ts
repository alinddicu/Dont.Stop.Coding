/// <reference path="../../../typings/knockout.d.ts"/>
/// <reference path="C:\\Program Files (x86)\\Microsoft SDKs\\TypeScript\\3.2\\lib.d.ts"/>

'use strict';

namespace ViewModel {

	class Colors {
		public static grey = "#eae7dc";
		public static brown = "#d8c3a5";
		public static darkGrey = "#8d8e8a";
		public static lightRed = "#e98074";
		public static mildRed = "#e85a4f";
	}

	export class TimeViewModel extends ViewModelBase {

		public pageName = "time";
		public currentTime: KnockoutObservable<Date> = ko.observable(new Date());

		constructor(appsRunner: IAppsRunner) {
			super(appsRunner);
			this.backgroundColor(Colors.grey);

			setInterval(() => {
				var currentDateTime = new Date();
				this.currentTime(currentDateTime);
				this.drawCurrentAnalogicTime(currentDateTime);
			}, 500);
		}

		private drawCurrentAnalogicTime(currentDateTime: Date): void {
			const canvas = document.getElementById("current-analogic-time") as HTMLCanvasElement;
			const canvasCtx = this.setupSmoothCanvas(canvas);

			const height = Math.min(canvas.height, canvas.width) * 0.8;
			canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

			// dev

			const baseRadius = height / 2;
			const fullArc = 2 * Math.PI;
			const thickness = 5;

			const frameRadius = baseRadius - 10;
			const threeOClockOffset = fullArc * 0.25;
			this.drawThickArc(canvas, canvasCtx, frameRadius, Colors.darkGrey, 0, fullArc, thickness);

			const secondsRadius = baseRadius - 15;
			const secondsArc = ((currentDateTime.getSeconds()) / 60) * (fullArc) - threeOClockOffset;
			this.drawThickArc(canvas, canvasCtx, secondsRadius, Colors.mildRed, -threeOClockOffset, secondsArc, thickness);

			const minutesRadius = baseRadius - 20;
			const minutesArc = ((currentDateTime.getMinutes()) / 60) * (fullArc) - threeOClockOffset;
			this.drawThickArc(canvas, canvasCtx, minutesRadius, Colors.lightRed, -threeOClockOffset, minutesArc, thickness);

			const hourRadius = baseRadius - 25;
			const hoursArc = ((currentDateTime.getHours() - 12) / 12) * (fullArc) - threeOClockOffset;
			this.drawThickArc(canvas, canvasCtx, hourRadius, Colors.brown, -threeOClockOffset, hoursArc, thickness);
		}

		private drawThickArc(canvas: HTMLCanvasElement, canvasCtx: CanvasRenderingContext2D, radius: number, color: string, arcStart: number, arcEnd: number, thickness: number): void {
			for (let i = 1; i < thickness; i++) {
				this.drawArc(canvas, canvasCtx, radius + i, color, arcStart, arcEnd);
			}
		}

		private drawArc(canvas: HTMLCanvasElement, canvasCtx: CanvasRenderingContext2D, radius: number, color: string, arcStart: number, arcEnd: number): void {

			const height = canvas.height * 0.8;
			const width = canvas.width * 0.8;

			canvasCtx.strokeStyle = color;
			canvasCtx.beginPath();
			canvasCtx.arc(width / 2, height / 2, radius, arcStart, arcEnd);
			canvasCtx.stroke();
		}

		private setupSmoothCanvas(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
			// Get the device pixel ratio, falling back to 1.
			const dpr = window.devicePixelRatio || 1;
			// Get the size of the canvas in CSS pixels.
			const rect = canvas.getBoundingClientRect();
			// Give the canvas pixel dimensions of their CSS
			// size * the device pixel ratio.
			canvas.width = rect.width * dpr;
			canvas.height = rect.height * dpr;
			const ctx = canvas.getContext('2d');
			// Scale all drawing operations by the dpr, so you
			// don't have to worry about the difference.
			ctx.scale(dpr, dpr);
			return ctx;
		}
	}
}