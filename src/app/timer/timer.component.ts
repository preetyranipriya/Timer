import { Component, OnDestroy } from '@angular/core';
import { Subject, interval, takeUntil } from 'rxjs';



@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  timer: string = '05:00';
  isPaused: boolean = false; 
  isTimerRunning: boolean = false;
  isReset:boolean=false;
  startTimer() {
    this.isTimerRunning=true;
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (!this.isPaused) {
          const timeArray = this.timer.split(':');
          let minutes = +timeArray[0];
          let seconds = +timeArray[1];

          if (minutes === 0 && seconds === 0) {
            this.stopTimer();
          } else if(this.isReset==false || this.isTimerRunning==true) {
            if (seconds === 0) {
              minutes--;
              seconds = 59;
            } else {
              seconds--;
            }

            this.timer = `${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
          }
        }
      });
  }

  pauseTimer() {
    this.isPaused = true;
  }

  resumeTimer() {
    this.isPaused = false;
  }

 

  stopTimer() {
    this.destroy$.next();
  }

  private formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }
  resetTimer() {
    this.timer = '05:00';
    this.isTimerRunning=false;
    this.isReset=true;
    this.isPaused = false;
    this.ngOnDestroy();

    
  
  }

  




  

  ngOnDestroy(): void {  
    this.destroy$.next();
    this.destroy$.complete();

    
  }
  
  

}
