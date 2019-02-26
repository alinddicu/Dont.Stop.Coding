/// <reference path="../../../typings/knockout.d.ts"/>
/// <reference path="C:\\Program Files (x86)\\Microsoft SDKs\\TypeScript\\3.2\\lib.d.ts"/>

'use strict';

namespace ViewModel
{

	class Colors
	{
		public static grey = "#eae7dc";
		public static brown = "#d8c3a5";
		public static darkGrey = "#8d8e8a";
		public static lightRed = "#e98074";
		public static mildRed = "#e85a4f";
	}

	export class TimeViewModel extends ViewModelBase
	{

		private sillyCanvasRatio = 0.8;
		public pageName = "time";
		public currentTime: KnockoutObservable<Date> = ko.observable(new Date());

		constructor(appsRunner: IAppsRunner)
		{
			super(appsRunner);
			this.backgroundColor(Colors.grey);

			setInterval(() =>
			{
				var currentDateTime = new Date();
				this.currentTime(currentDateTime);
				this.drawCurrentDigitalTime(currentDateTime);
				this.drawCurrentAnalogicTime(currentDateTime);
				this.drawCurrentBarTime(currentDateTime);
			}, 500);
		}
		
		private format2Digits(num: number): string {
			return (`0${num}`).slice(-2);
		}

		private drawCurrentDigitalTime(currentDateTime: Date): void
		{
			const canvas = document.getElementById("current-digital-time") as HTMLCanvasElement;
			const canvasCtx = this.setupSmoothCanvas(canvas);

			const centeredHeight = Math.min(canvas.height, canvas.width) * this.sillyCanvasRatio;
			canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

			const fontSize = centeredHeight;
			canvasCtx.font = `${fontSize}px Calibri`;
			canvasCtx.fillStyle = Colors.mildRed;

			const hours = this.format2Digits(currentDateTime.getHours());
			const minutes = this.format2Digits(currentDateTime.getMinutes());
			const seconds = this.format2Digits(currentDateTime.getSeconds());
			const formattedDate = `${hours}:${minutes}:${seconds}`;
			const textWidth = canvasCtx.measureText(formattedDate).width;

			const centeredWidth = canvas.width * this.sillyCanvasRatio;
			const x = centeredWidth / 2 - textWidth / 2;
			const y = centeredHeight * 4 / 5;
			canvasCtx.fillText(formattedDate, x, y);
		}

		private drawCurrentAnalogicTime(currentDateTime: Date): void
		{
			const canvas = document.getElementById("current-analogic-time") as HTMLCanvasElement;
			const canvasCtx = this.setupSmoothCanvas(canvas);

			const centeredHeight = Math.min(canvas.height, canvas.width) * this.sillyCanvasRatio;
			canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

			const baseRadius = centeredHeight / 2;
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
			const hours = currentDateTime.getHours();
			const hoursArc = ((hours - 12) / 12) * (fullArc) - threeOClockOffset;
			this.drawThickArc(canvas, canvasCtx, hourRadius, Colors.brown, -threeOClockOffset, hoursArc, thickness);

			const fontSize = baseRadius / 8;
			canvasCtx.font = `${fontSize}px Calibri`;
			canvasCtx.textAlign = "center";
			const centeredWidth = canvas.width * this.sillyCanvasRatio;
			const xAmPm = centeredWidth / 2 - fontSize / 2;
			const yAmPm = canvas.height * this.sillyCanvasRatio / 2 + fontSize / 2;
			const amPm = hours < 12 ? "AM" : "PM";
			//canvasCtx.strokeStyle = Colors.mildRed;
			canvasCtx.strokeText(amPm, xAmPm, yAmPm);
		}

		private drawCurrentBarTime(currentDateTime: Date): void
		{
			const canvas = document.getElementById("current-bar-time") as HTMLCanvasElement;
			const canvasCtx = this.setupSmoothCanvas(canvas);

			const height = canvas.height * this.sillyCanvasRatio;
			const width = canvas.width * this.sillyCanvasRatio;
			const fontSize = height / 8;
			const heightGap = 2;

			canvasCtx.beginPath();
			canvasCtx.fillStyle = Colors.brown;
			const hours = currentDateTime.getHours();
			canvasCtx.rect(0, 0, width * hours / 24, height / 3 - heightGap);
			canvasCtx.fill();

			canvasCtx.font = `${fontSize}px Calibri`;
			canvasCtx.strokeStyle = Colors.darkGrey;
			canvasCtx.strokeText(hours + "", 5, height / 6);

			canvasCtx.beginPath();
			canvasCtx.fillStyle = Colors.lightRed;
			const minutes = currentDateTime.getMinutes();
			canvasCtx.rect(0, height / 3, width * minutes / 60, height / 3 - heightGap);
			canvasCtx.fill();

			canvasCtx.font = `${fontSize}px Calibri`;
			canvasCtx.strokeStyle = Colors.darkGrey;
			canvasCtx.strokeText(minutes + "", 5, height / 3 + height / 6);

			canvasCtx.beginPath();
			canvasCtx.fillStyle = Colors.mildRed;
			const seconds = currentDateTime.getSeconds();
			canvasCtx.rect(0, height * 2 / 3, width * seconds / 60, height / 3 - heightGap);
			canvasCtx.fill();

			canvasCtx.font = `${fontSize}px Calibri`;
			canvasCtx.strokeStyle = Colors.darkGrey;
			canvasCtx.strokeText(seconds + "", 5, height * 2 / 3 + height / 6);
		}

		private drawThickArc(canvas: HTMLCanvasElement, canvasCtx: CanvasRenderingContext2D, radius: number, color: string, arcStart: number, arcEnd: number, thickness: number): void
		{
			for (let i = 1; i < thickness; i++) {
				this.drawArc(canvas, canvasCtx, radius + i, color, arcStart, arcEnd);
			}
		}

		private drawArc(canvas: HTMLCanvasElement, canvasCtx: CanvasRenderingContext2D, radius: number, color: string, arcStart: number, arcEnd: number): void
		{

			const height = canvas.height * this.sillyCanvasRatio;
			const width = canvas.width * this.sillyCanvasRatio;

			canvasCtx.strokeStyle = color;
			canvasCtx.beginPath();
			canvasCtx.arc(width / 2, height / 2, radius, arcStart, arcEnd);
			canvasCtx.stroke();
		}

		private setupSmoothCanvas(canvas: HTMLCanvasElement): CanvasRenderingContext2D
		{
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