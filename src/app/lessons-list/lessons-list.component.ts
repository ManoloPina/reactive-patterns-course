import { Component, OnInit } from '@angular/core';
import { Lesson } from '../shared/model/lesson';
import { Observer, globalEventBus, LESSONS_LIST_AVAIBLE } from '../event-bus-experiments/event-bus';

@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements Observer {

  lessons:Lesson[] = [];

  constructor() { 
    console.log('lesson list component is registered as observer...');
    globalEventBus.registerObserver(LESSONS_LIST_AVAIBLE, this);  
  }

  notify(data: Lesson[]) {
    console.log('Lesson list component received');
    this.lessons = data;
  }

}
