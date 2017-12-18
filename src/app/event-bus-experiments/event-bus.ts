import * as _ from "lodash";

export const LESSONS_LIST_AVAIBLE = "NEW_LIST_AVAIBLE";

export const ADD_NEW_LESSON = "ADD_NEW_LESSON";

export interface Observer {
  notify(data:any);
}

interface Subject {
  registerObserver(eventType:string ,obs:Observer);
  unregisterObserver(eventType:string, obs:Observer);
  notifyObservers(eventType:string, data:any);
}

class EventBus implements Subject {

  private observers: {[key:string]: Observer[]} = {};

  registerObserver(eventType:string ,obs: Observer) {
    this.observerPerEventType(eventType).push(obs);
  }

  unregisterObserver(eventType:string, obs: Observer) {
    _.remove(this.observerPerEventType(eventType), el => el === obs);
  }
  
  notifyObservers(eventType:string, data: any) {
    this.observerPerEventType(eventType).forEach(obs => obs.notify(data));
  }

  private observerPerEventType(eventType:string): Observer[] {
    const observersPerType = this.observers[eventType];
    if(!observersPerType) {
      this.observers[eventType] = [];
    }
    return this.observers[eventType];
  }
  
}

export const globalEventBus = new EventBus();