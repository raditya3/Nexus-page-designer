import { Injectable } from '@angular/core';
import { IDerived, IPage, Prop } from '../../types';
import { BehaviorSubject, Subscription, combineLatest, delay, filter, skip } from 'rxjs';
import { stringToFunction } from '../../helper';
@Injectable({
  providedIn: 'root'
})
export class PageContextService {

  unsubscribe() {
    this.subsBag.forEach(sub => sub.unsubscribe());
  }

  subsBag: Subscription[] = [];

  private props: Prop[] = [];
  private derived: IDerived[] = [];
  public propsVariables = new Map<string, BehaviorSubject<any>>();
  public initialize(context: IPage["context"]) {
    this.props = context.properties;
    this.derived = context.derived;
    this.props.forEach(prop => {
      this.propsVariables.set(prop[0], new BehaviorSubject(prop[1]));
    })
    this.processDerived();
  }

  private validateDerived() {
    this.derived.forEach(derivedObj => {
      if (derivedObj.name) {
        if (!this.propsVariables.has(derivedObj.name)) {
          throw new Error(`${derivedObj.name} is not defined in properties`);
        }
      }
      derivedObj.from.forEach(fromProp => {
        if (!this.propsVariables.has(fromProp)) {
          throw new Error(`${fromProp} is not defined in properties`);
        }
      })

    })
  }


  private processDerived() {
    this.validateDerived();
    this.derived.forEach(derivedObj => {
      const dependentObservables = derivedObj.from.map(fromProp => {
        return this.propsVariables.get(fromProp)!;
      })
      let combinedObs = combineLatest(dependentObservables)
      if (derivedObj.delay && derivedObj.delay > 0) {
        combinedObs = combinedObs.pipe(delay(derivedObj.delay));
      }
      const convertedSpecFn = stringToFunction(derivedObj.spec);
      let convertedFilterFn: ((val: any) => boolean) | undefined = undefined;
      if (derivedObj.filterFn) {
        convertedFilterFn = stringToFunction(derivedObj.filterFn);
        combinedObs = combinedObs.pipe(filter(vals => {
          const data: any = {};
          derivedObj.from.forEach((fromProp, idx) => {
            data[fromProp] = vals[idx];
          })
          return !!convertedFilterFn!(data);
        }))
      }
      if (!derivedObj.from.includes("init")) {
        combinedObs = combinedObs.pipe(skip(1));
      }
      const sub = combinedObs.subscribe(vals => {
        const data: any = {};
        derivedObj.from.forEach((fromProp, idx) => {
          data[fromProp] = vals[idx];
        })

        const val = convertedSpecFn(data);
        if (derivedObj.name) {
          this.propsVariables.get(derivedObj.name)?.next(val);
        }
      });
      this.subsBag.push(sub);
    })


  }


}
