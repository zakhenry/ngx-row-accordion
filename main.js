(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./dist/ngx-row-accordion/fesm5/ngx-row-accordion.js":
/*!***********************************************************!*\
  !*** ./dist/ngx-row-accordion/fesm5/ngx-row-accordion.js ***!
  \***********************************************************/
/*! exports provided: NgxRowAccordionService, NgxRowAccordionComponent, NgxRowAccordionModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxRowAccordionService", function() { return NgxRowAccordionService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxRowAccordionComponent", function() { return NgxRowAccordionComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxRowAccordionModule", function() { return NgxRowAccordionModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");









/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxRowAccordionService = /** @class */ (function () {
    function NgxRowAccordionService() {
        this.groups$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]({});
        this.componentToGroup = new Map();
    }
    /**
     * @param {?} accordionComponentId
     * @param {?} groupName
     * @return {?}
     */
    NgxRowAccordionService.prototype.addComponentToGroup = /**
     * @param {?} accordionComponentId
     * @param {?} groupName
     * @return {?}
     */
    function (accordionComponentId, groupName) {
        // get current group
        var /** @type {?} */ groups = this.groups$.getValue();
        var /** @type {?} */ group = groups[groupName];
        // if the group does not exist yet, initialize it
        if (!group) {
            group = {
                map: {},
                array: [],
            };
        }
        // if the accordion ID is already registered, throw
        if (!!group.map[accordionComponentId]) {
            throw new Error('A row-accordion should be registered only once');
        }
        // add the new accordion to the group
        var /** @type {?} */ groupWithNewAccordion = {
            map: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, group.map, (_a = {}, _a[accordionComponentId] = { folded: false }, _a)),
            array: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(group.array, [accordionComponentId]),
        };
        this.componentToGroup.set(accordionComponentId, groupName);
        var /** @type {?} */ index = groupWithNewAccordion.array.length - 1;
        var /** @type {?} */ newGroupWithNewState = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.groups$.getValue(), (_b = {}, _b[groupName] = groupWithNewAccordion, _b));
        // if adding an accordion which is not the first one, close the previous one
        if (index > 0) {
            var /** @type {?} */ previousComponentId = groupWithNewAccordion.array[index - 1];
            newGroupWithNewState = getNewState(newGroupWithNewState, groupName, previousComponentId, { folded: true });
        }
        this.groups$.next(newGroupWithNewState);
        var _a, _b;
    };
    /**
     * @param {?} accordionComponentId
     * @return {?}
     */
    NgxRowAccordionService.prototype.removeComponentFromGroup = /**
     * @param {?} accordionComponentId
     * @return {?}
     */
    function (accordionComponentId) {
        var /** @type {?} */ groups = this.groups$.getValue();
        var /** @type {?} */ groupName = this.componentToGroup.get(accordionComponentId);
        if (!groupName) {
            return;
        }
        var /** @type {?} */ group = this.groups$.getValue()[groupName];
        var _a = group.map, _b = accordionComponentId, omit = _a[_b], newMap = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, [typeof _b === "symbol" ? _b : _b + ""]);
        var /** @type {?} */ newArray = group.array.filter(function (x) { return x !== accordionComponentId; });
        var /** @type {?} */ newGroups;
        var _c = groupName, currentGroup = groups[_c], remainingGroups = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(groups, [typeof _c === "symbol" ? _c : _c + ""]);
        if (newArray.length === 0) {
            // if current group is now empty, remove the group by keeping only the others
            newGroups = remainingGroups;
        }
        else {
            var /** @type {?} */ indexCompToRemove = group.array.findIndex(function (id) { return id === accordionComponentId; });
            var /** @type {?} */ idPreviousComp = group.array[indexCompToRemove - 1];
            var /** @type {?} */ newGroupsBeforeUnfoldingPrevious = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, remainingGroups, (_d = {}, _d[groupName] = {
                map: newMap,
                array: newArray,
            }, _d));
            newGroups = getNewState(newGroupsBeforeUnfoldingPrevious, groupName, idPreviousComp, { folded: false });
        }
        this.groups$.next(newGroups);
        var _d;
    };
    /**
     * @param {?} accordionComponentId
     * @return {?}
     */
    NgxRowAccordionService.prototype.getState = /**
     * @param {?} accordionComponentId
     * @return {?}
     */
    function (accordionComponentId) {
        var /** @type {?} */ groupName = this.componentToGroup.get(accordionComponentId);
        return this.groups$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (groups) { return groups[groupName]; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(function (group) { return !!group; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (group) { return group.map[accordionComponentId]; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(function (group) { return !!group; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["delay"])(0));
    };
    /**
     * @param {?} accordionComponentId
     * @param {?} newState
     * @return {?}
     */
    NgxRowAccordionService.prototype.updateState = /**
     * @param {?} accordionComponentId
     * @param {?} newState
     * @return {?}
     */
    function (accordionComponentId, newState) {
        var /** @type {?} */ groupName = this.componentToGroup.get(accordionComponentId);
        var /** @type {?} */ state = this._getState(accordionComponentId);
        if (!!state) {
            this.groups$.next(getNewState(this.groups$.getValue(), groupName, accordionComponentId, newState));
        }
    };
    /**
     * @param {?} accordionComponentId
     * @return {?}
     */
    NgxRowAccordionService.prototype.toggle = /**
     * @param {?} accordionComponentId
     * @return {?}
     */
    function (accordionComponentId) {
        var /** @type {?} */ groupName = this.componentToGroup.get(accordionComponentId);
        var /** @type {?} */ state = this._getState(accordionComponentId);
        if (!!state) {
            var /** @type {?} */ folded = state.folded;
            this.updateState(accordionComponentId, { folded: !folded });
        }
    };
    /**
     * @param {?} accordionComponentId
     * @return {?}
     */
    NgxRowAccordionService.prototype._getState = /**
     * @param {?} accordionComponentId
     * @return {?}
     */
    function (accordionComponentId) {
        var /** @type {?} */ groupName = this.componentToGroup.get(accordionComponentId);
        var /** @type {?} */ groups = this.groups$.getValue();
        var /** @type {?} */ group = groups[groupName];
        if (!!group) {
            var /** @type {?} */ state = group.map[accordionComponentId];
            return state;
        }
    };
    NgxRowAccordionService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */ NgxRowAccordionService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["defineInjectable"])({ factory: function NgxRowAccordionService_Factory() { return new NgxRowAccordionService(); }, token: NgxRowAccordionService, providedIn: "root" });
    return NgxRowAccordionService;
}());
/**
 * @param {?} groups
 * @param {?} groupName
 * @param {?} accordionComponentId
 * @param {?} newState
 * @return {?}
 */
function getNewState(groups, groupName, accordionComponentId, newState) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, groups, (_a = {}, _a[groupName] = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, groups[groupName], { map: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, groups[groupName].map, (_b = {}, _b[accordionComponentId] = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, groups[groupName].map[accordionComponentId], newState), _b)) }), _a));
    var _a, _b;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxRowAccordionComponent = /** @class */ (function () {
    function NgxRowAccordionComponent(ngxRowAccordionService) {
        this.ngxRowAccordionService = ngxRowAccordionService;
        this.id = Object(uuid__WEBPACK_IMPORTED_MODULE_4__["v4"])();
        this.onDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    /**
     * @return {?}
     */
    NgxRowAccordionComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.group) {
            throw new Error('[ngx-row-accordion] you should always pass a group when creating a row-accordion');
        }
        this.ngxRowAccordionService.addComponentToGroup(this.id, this.group);
        this.displayBody$ = this.ngxRowAccordionService.getState(this.id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (x) { return !x.folded; }));
    };
    /**
     * @return {?}
     */
    NgxRowAccordionComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.onDestroy$.complete();
        this.ngxRowAccordionService.removeComponentFromGroup(this.id);
    };
    /**
     * @return {?}
     */
    NgxRowAccordionComponent.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.ngxRowAccordionService.toggle(this.id);
    };
    NgxRowAccordionComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'ngx-row-accordion',
                    template: "<div fxFill fxLayout=\"row\">\n  <div class=\"ngx-row-accordion\">\n    <div fxLayout=\"row\" class=\"ngx-row-accordion\">\n      <div class=\"title\" (click)=\"toggle()\">\n        {{ title }}\n      </div>\n\n      <div class=\"body\" *ngIf=\"displayBody$ | async\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  </div>\n\n  <router-outlet></router-outlet>\n</div>\n",
                    styles: [""],
                },] },
    ];
    /** @nocollapse */
    NgxRowAccordionComponent.ctorParameters = function () { return [
        { type: NgxRowAccordionService }
    ]; };
    NgxRowAccordionComponent.propDecorators = {
        title: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        group: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return NgxRowAccordionComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxRowAccordionModule = /** @class */ (function () {
    function NgxRowAccordionModule() {
    }
    /**
     * @return {?}
     */
    NgxRowAccordionModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: NgxRowAccordionModule,
            providers: [NgxRowAccordionService],
        };
    };
    NgxRowAccordionModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["CommonModule"], _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__["FlexLayoutModule"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["RouterModule"]],
                    declarations: [NgxRowAccordionComponent],
                    exports: [NgxRowAccordionComponent],
                },] },
    ];
    return NgxRowAccordionModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJvdy1hY2NvcmRpb24uanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC1yb3ctYWNjb3JkaW9uL2xpYi9uZ3gtcm93LWFjY29yZGlvbi5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtcm93LWFjY29yZGlvbi9saWIvbmd4LXJvdy1hY2NvcmRpb24uY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtcm93LWFjY29yZGlvbi9saWIvbmd4LXJvdy1hY2NvcmRpb24ubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXBUbywgbWFwLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgdGFwLCBkZWxheSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IG1hcENoaWxkcmVuSW50b0FycmF5IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyL3NyYy91cmxfdHJlZSc7XG5cbmludGVyZmFjZSBEaWN0aW9ubmFyeTxUPiB7XG4gIFtrZXk6IHN0cmluZ106IFQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWNjb3JkaW9uU3RhdGUge1xuICBmb2xkZWQ6IGJvb2xlYW47XG59XG5cbnR5cGUgR3JvdXBOYW1lID0gc3RyaW5nO1xudHlwZSBBY2NvcmRpb25Db21wb25lbnRJZCA9IHN0cmluZztcblxuaW50ZXJmYWNlIEFjY29yZGlvbkdyb3VwIHtcbiAgLy8gcmVmZXJlbmNlIHRvIGV2ZXJ5IGFjY29yZGlvbnMgb2YgdGhlIGdyb3VwICh0byBhY2Nlc3MgdGhlbSBieSByZWZlcmVuY2UpXG4gIG1hcDogeyBbYWNjb3JkaW9uQ29tcG9uZW50SWQ6IHN0cmluZ106IEFjY29yZGlvblN0YXRlIH07XG4gIC8vIGFycmF5IGNvbnRhaW5pbmcgdGhlIGVsZW1lbnRzIElEcyB0byBrZWVwIHRyYWNrIG9mIHRoZSBvcmRlXG4gIGFycmF5OiBBY2NvcmRpb25Db21wb25lbnRJZFtdO1xufVxuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIE5neFJvd0FjY29yZGlvblNlcnZpY2Uge1xuICBwcml2YXRlIGdyb3VwcyQ6IEJlaGF2aW9yU3ViamVjdDxEaWN0aW9ubmFyeTxBY2NvcmRpb25Hcm91cD4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh7fSk7XG4gIHByaXZhdGUgY29tcG9uZW50VG9Hcm91cDogTWFwPEFjY29yZGlvbkNvbXBvbmVudElkLCBHcm91cE5hbWU+ID0gbmV3IE1hcCgpO1xuXG4gIHB1YmxpYyBhZGRDb21wb25lbnRUb0dyb3VwKGFjY29yZGlvbkNvbXBvbmVudElkOiBzdHJpbmcsIGdyb3VwTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgLy8gZ2V0IGN1cnJlbnQgZ3JvdXBcbiAgICBjb25zdCBncm91cHMgPSB0aGlzLmdyb3VwcyQuZ2V0VmFsdWUoKTtcbiAgICBsZXQgZ3JvdXA6IEFjY29yZGlvbkdyb3VwID0gZ3JvdXBzW2dyb3VwTmFtZV07XG5cbiAgICAvLyBpZiB0aGUgZ3JvdXAgZG9lcyBub3QgZXhpc3QgeWV0LCBpbml0aWFsaXplIGl0XG4gICAgaWYgKCFncm91cCkge1xuICAgICAgZ3JvdXAgPSB7XG4gICAgICAgIG1hcDoge30sXG4gICAgICAgIGFycmF5OiBbXSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gaWYgdGhlIGFjY29yZGlvbiBJRCBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQsIHRocm93XG4gICAgaWYgKCEhZ3JvdXAubWFwW2FjY29yZGlvbkNvbXBvbmVudElkXSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBIHJvdy1hY2NvcmRpb24gc2hvdWxkIGJlIHJlZ2lzdGVyZWQgb25seSBvbmNlJyk7XG4gICAgfVxuXG4gICAgLy8gYWRkIHRoZSBuZXcgYWNjb3JkaW9uIHRvIHRoZSBncm91cFxuICAgIGNvbnN0IGdyb3VwV2l0aE5ld0FjY29yZGlvbjogQWNjb3JkaW9uR3JvdXAgPSB7XG4gICAgICBtYXA6IHtcbiAgICAgICAgLi4uZ3JvdXAubWFwLFxuICAgICAgICBbYWNjb3JkaW9uQ29tcG9uZW50SWRdOiB7IGZvbGRlZDogZmFsc2UgfSxcbiAgICAgIH0sXG4gICAgICBhcnJheTogWy4uLmdyb3VwLmFycmF5LCBhY2NvcmRpb25Db21wb25lbnRJZF0sXG4gICAgfTtcblxuICAgIHRoaXMuY29tcG9uZW50VG9Hcm91cC5zZXQoYWNjb3JkaW9uQ29tcG9uZW50SWQsIGdyb3VwTmFtZSk7XG5cbiAgICBjb25zdCBpbmRleDogbnVtYmVyID0gZ3JvdXBXaXRoTmV3QWNjb3JkaW9uLmFycmF5Lmxlbmd0aCAtIDE7XG5cbiAgICBsZXQgbmV3R3JvdXBXaXRoTmV3U3RhdGU6IERpY3Rpb25uYXJ5PEFjY29yZGlvbkdyb3VwPiA9IHtcbiAgICAgIC4uLnRoaXMuZ3JvdXBzJC5nZXRWYWx1ZSgpLFxuICAgICAgW2dyb3VwTmFtZV06IGdyb3VwV2l0aE5ld0FjY29yZGlvbixcbiAgICB9O1xuXG4gICAgLy8gaWYgYWRkaW5nIGFuIGFjY29yZGlvbiB3aGljaCBpcyBub3QgdGhlIGZpcnN0IG9uZSwgY2xvc2UgdGhlIHByZXZpb3VzIG9uZVxuICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzQ29tcG9uZW50SWQ6IHN0cmluZyA9IGdyb3VwV2l0aE5ld0FjY29yZGlvbi5hcnJheVtpbmRleCAtIDFdO1xuXG4gICAgICBuZXdHcm91cFdpdGhOZXdTdGF0ZSA9IGdldE5ld1N0YXRlKG5ld0dyb3VwV2l0aE5ld1N0YXRlLCBncm91cE5hbWUsIHByZXZpb3VzQ29tcG9uZW50SWQsIHsgZm9sZGVkOiB0cnVlIH0pO1xuICAgIH1cblxuICAgIHRoaXMuZ3JvdXBzJC5uZXh0KG5ld0dyb3VwV2l0aE5ld1N0YXRlKTtcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVDb21wb25lbnRGcm9tR3JvdXAoYWNjb3JkaW9uQ29tcG9uZW50SWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGdyb3VwcyA9IHRoaXMuZ3JvdXBzJC5nZXRWYWx1ZSgpO1xuXG4gICAgY29uc3QgZ3JvdXBOYW1lOiBzdHJpbmcgPSB0aGlzLmNvbXBvbmVudFRvR3JvdXAuZ2V0KGFjY29yZGlvbkNvbXBvbmVudElkKTtcblxuICAgIGlmICghZ3JvdXBOYW1lKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZ3JvdXA6IEFjY29yZGlvbkdyb3VwID0gdGhpcy5ncm91cHMkLmdldFZhbHVlKClbZ3JvdXBOYW1lXTtcblxuICAgIGNvbnN0IHsgW2FjY29yZGlvbkNvbXBvbmVudElkXTogb21pdCwgLi4ubmV3TWFwIH0gPSBncm91cC5tYXA7XG5cbiAgICBjb25zdCBuZXdBcnJheSA9IGdyb3VwLmFycmF5LmZpbHRlcih4ID0+IHggIT09IGFjY29yZGlvbkNvbXBvbmVudElkKTtcblxuICAgIGxldCBuZXdHcm91cHM6IERpY3Rpb25uYXJ5PEFjY29yZGlvbkdyb3VwPjtcblxuICAgIGNvbnN0IHsgW2dyb3VwTmFtZV06IGN1cnJlbnRHcm91cCwgLi4ucmVtYWluaW5nR3JvdXBzIH0gPSBncm91cHM7XG5cbiAgICBpZiAobmV3QXJyYXkubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyBpZiBjdXJyZW50IGdyb3VwIGlzIG5vdyBlbXB0eSwgcmVtb3ZlIHRoZSBncm91cCBieSBrZWVwaW5nIG9ubHkgdGhlIG90aGVyc1xuICAgICAgbmV3R3JvdXBzID0gcmVtYWluaW5nR3JvdXBzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbmRleENvbXBUb1JlbW92ZTogbnVtYmVyID0gZ3JvdXAuYXJyYXkuZmluZEluZGV4KGlkID0+IGlkID09PSBhY2NvcmRpb25Db21wb25lbnRJZCk7XG4gICAgICBjb25zdCBpZFByZXZpb3VzQ29tcDogc3RyaW5nID0gZ3JvdXAuYXJyYXlbaW5kZXhDb21wVG9SZW1vdmUgLSAxXTtcblxuICAgICAgY29uc3QgbmV3R3JvdXBzQmVmb3JlVW5mb2xkaW5nUHJldmlvdXMgPSB7XG4gICAgICAgIC4uLnJlbWFpbmluZ0dyb3VwcyxcbiAgICAgICAgW2dyb3VwTmFtZV06IHtcbiAgICAgICAgICBtYXA6IG5ld01hcCxcbiAgICAgICAgICBhcnJheTogbmV3QXJyYXksXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICBuZXdHcm91cHMgPSBnZXROZXdTdGF0ZShuZXdHcm91cHNCZWZvcmVVbmZvbGRpbmdQcmV2aW91cywgZ3JvdXBOYW1lLCBpZFByZXZpb3VzQ29tcCwgeyBmb2xkZWQ6IGZhbHNlIH0pO1xuICAgIH1cblxuICAgIHRoaXMuZ3JvdXBzJC5uZXh0KG5ld0dyb3Vwcyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0U3RhdGUoYWNjb3JkaW9uQ29tcG9uZW50SWQ6IHN0cmluZyk6IE9ic2VydmFibGU8QWNjb3JkaW9uU3RhdGU+IHtcbiAgICBjb25zdCBncm91cE5hbWU6IHN0cmluZyA9IHRoaXMuY29tcG9uZW50VG9Hcm91cC5nZXQoYWNjb3JkaW9uQ29tcG9uZW50SWQpO1xuXG4gICAgcmV0dXJuIHRoaXMuZ3JvdXBzJC5waXBlKFxuICAgICAgbWFwKGdyb3VwcyA9PiBncm91cHNbZ3JvdXBOYW1lXSksXG4gICAgICBmaWx0ZXIoZ3JvdXAgPT4gISFncm91cCksXG4gICAgICBtYXAoZ3JvdXAgPT4gZ3JvdXAubWFwW2FjY29yZGlvbkNvbXBvbmVudElkXSksXG4gICAgICBmaWx0ZXIoZ3JvdXAgPT4gISFncm91cCksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgZGVsYXkoMClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVTdGF0ZShhY2NvcmRpb25Db21wb25lbnRJZDogc3RyaW5nLCBuZXdTdGF0ZTogUGFydGlhbDxBY2NvcmRpb25TdGF0ZT4pOiB2b2lkIHtcbiAgICBjb25zdCBncm91cE5hbWU6IHN0cmluZyA9IHRoaXMuY29tcG9uZW50VG9Hcm91cC5nZXQoYWNjb3JkaW9uQ29tcG9uZW50SWQpO1xuICAgIGNvbnN0IHN0YXRlOiBBY2NvcmRpb25TdGF0ZSA9IHRoaXMuX2dldFN0YXRlKGFjY29yZGlvbkNvbXBvbmVudElkKTtcblxuICAgIGlmICghIXN0YXRlKSB7XG4gICAgICB0aGlzLmdyb3VwcyQubmV4dChnZXROZXdTdGF0ZSh0aGlzLmdyb3VwcyQuZ2V0VmFsdWUoKSwgZ3JvdXBOYW1lLCBhY2NvcmRpb25Db21wb25lbnRJZCwgbmV3U3RhdGUpKTtcbiAgICB9XG4gIH1cblxuICB0b2dnbGUoYWNjb3JkaW9uQ29tcG9uZW50SWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGdyb3VwTmFtZTogc3RyaW5nID0gdGhpcy5jb21wb25lbnRUb0dyb3VwLmdldChhY2NvcmRpb25Db21wb25lbnRJZCk7XG4gICAgY29uc3Qgc3RhdGU6IEFjY29yZGlvblN0YXRlID0gdGhpcy5fZ2V0U3RhdGUoYWNjb3JkaW9uQ29tcG9uZW50SWQpO1xuXG4gICAgaWYgKCEhc3RhdGUpIHtcbiAgICAgIGNvbnN0IGZvbGRlZDogYm9vbGVhbiA9IHN0YXRlLmZvbGRlZDtcblxuICAgICAgdGhpcy51cGRhdGVTdGF0ZShhY2NvcmRpb25Db21wb25lbnRJZCwgeyBmb2xkZWQ6ICFmb2xkZWQgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0U3RhdGUoYWNjb3JkaW9uQ29tcG9uZW50SWQ6IHN0cmluZyk6IEFjY29yZGlvblN0YXRlIHtcbiAgICBjb25zdCBncm91cE5hbWU6IHN0cmluZyA9IHRoaXMuY29tcG9uZW50VG9Hcm91cC5nZXQoYWNjb3JkaW9uQ29tcG9uZW50SWQpO1xuICAgIGNvbnN0IGdyb3VwcyA9IHRoaXMuZ3JvdXBzJC5nZXRWYWx1ZSgpO1xuICAgIGNvbnN0IGdyb3VwOiBBY2NvcmRpb25Hcm91cCA9IGdyb3Vwc1tncm91cE5hbWVdO1xuICAgIGlmICghIWdyb3VwKSB7XG4gICAgICBjb25zdCBzdGF0ZTogQWNjb3JkaW9uU3RhdGUgPSBncm91cC5tYXBbYWNjb3JkaW9uQ29tcG9uZW50SWRdO1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXROZXdTdGF0ZShcbiAgZ3JvdXBzOiBEaWN0aW9ubmFyeTxBY2NvcmRpb25Hcm91cD4sXG4gIGdyb3VwTmFtZTogc3RyaW5nLFxuICBhY2NvcmRpb25Db21wb25lbnRJZDogc3RyaW5nLFxuICBuZXdTdGF0ZTogUGFydGlhbDxBY2NvcmRpb25TdGF0ZT5cbik6IERpY3Rpb25uYXJ5PEFjY29yZGlvbkdyb3VwPiB7XG4gIHJldHVybiB7XG4gICAgLi4uZ3JvdXBzLFxuICAgIFtncm91cE5hbWVdOiB7XG4gICAgICAuLi5ncm91cHNbZ3JvdXBOYW1lXSxcbiAgICAgIG1hcDoge1xuICAgICAgICAuLi5ncm91cHNbZ3JvdXBOYW1lXS5tYXAsXG4gICAgICAgIFthY2NvcmRpb25Db21wb25lbnRJZF06IHtcbiAgICAgICAgICAuLi5ncm91cHNbZ3JvdXBOYW1lXS5tYXBbYWNjb3JkaW9uQ29tcG9uZW50SWRdLFxuICAgICAgICAgIC4uLm5ld1N0YXRlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neFJvd0FjY29yZGlvblNlcnZpY2UsIEFjY29yZGlvblN0YXRlIH0gZnJvbSAnLi9uZ3gtcm93LWFjY29yZGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IHRhcCwgdGFrZVVudGlsLCBkZWxheSwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgbWVyZ2UsIFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHY0IGFzIHV1aWQgfSBmcm9tICd1dWlkJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXJvdy1hY2NvcmRpb24nLFxuICB0ZW1wbGF0ZTogYDxkaXYgZnhGaWxsIGZ4TGF5b3V0PVwicm93XCI+XG4gIDxkaXYgY2xhc3M9XCJuZ3gtcm93LWFjY29yZGlvblwiPlxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBjbGFzcz1cIm5neC1yb3ctYWNjb3JkaW9uXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIiAoY2xpY2spPVwidG9nZ2xlKClcIj5cbiAgICAgICAge3sgdGl0bGUgfX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiYm9keVwiICpuZ0lmPVwiZGlzcGxheUJvZHkkIHwgYXN5bmNcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxyb3V0ZXItb3V0bGV0Pjwvcm91dGVyLW91dGxldD5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hSb3dBY2NvcmRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG4gIC8vIG5hbWUgb2YgdGhlIGdyb3VwIHRoaXMgYWNjb3JkaW9ucyBiZWxvbmdzIHRvXG4gIEBJbnB1dCgpIGdyb3VwOiBzdHJpbmc7XG5cbiAgZGlzcGxheUJvZHkkOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuXG4gIHByaXZhdGUgaWQ6IHN0cmluZyA9IHV1aWQoKTtcbiAgcHJpdmF0ZSBvbkRlc3Ryb3kkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5neFJvd0FjY29yZGlvblNlcnZpY2U6IE5neFJvd0FjY29yZGlvblNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmdyb3VwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tuZ3gtcm93LWFjY29yZGlvbl0geW91IHNob3VsZCBhbHdheXMgcGFzcyBhIGdyb3VwIHdoZW4gY3JlYXRpbmcgYSByb3ctYWNjb3JkaW9uJyk7XG4gICAgfVxuXG4gICAgdGhpcy5uZ3hSb3dBY2NvcmRpb25TZXJ2aWNlLmFkZENvbXBvbmVudFRvR3JvdXAodGhpcy5pZCwgdGhpcy5ncm91cCk7XG5cbiAgICB0aGlzLmRpc3BsYXlCb2R5JCA9IHRoaXMubmd4Um93QWNjb3JkaW9uU2VydmljZS5nZXRTdGF0ZSh0aGlzLmlkKS5waXBlKG1hcCh4ID0+ICF4LmZvbGRlZCkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5vbkRlc3Ryb3kkLmNvbXBsZXRlKCk7XG5cbiAgICB0aGlzLm5neFJvd0FjY29yZGlvblNlcnZpY2UucmVtb3ZlQ29tcG9uZW50RnJvbUdyb3VwKHRoaXMuaWQpO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMubmd4Um93QWNjb3JkaW9uU2VydmljZS50b2dnbGUodGhpcy5pZCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5neFJvd0FjY29yZGlvblNlcnZpY2UgfSBmcm9tICcuL25neC1yb3ctYWNjb3JkaW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neFJvd0FjY29yZGlvbkNvbXBvbmVudCB9IGZyb20gJy4vbmd4LXJvdy1hY2NvcmRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21waWxlci9zcmMvY29yZSc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbi8vIEB0b2RvIFJvdXRlck1vZHVsZSBzaG91bGQgYmUgcGFzc2VkIHdpdGhpbiBmb3JSb290IHRvIGF2b2lkIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbi8vIHRoaXMgd2lsbCBwcmV2ZW50IHVuZXhwZWN0ZWQgYmVoYXZpb3Igd2l0aCBpbnRlcmNlcHRvcnMgb24gbWFpbiBhcHBcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZsZXhMYXlvdXRNb2R1bGUsIFJvdXRlck1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW05neFJvd0FjY29yZGlvbkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtOZ3hSb3dBY2NvcmRpb25Db21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hSb3dBY2NvcmRpb25Nb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5neFJvd0FjY29yZGlvbk1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW05neFJvd0FjY29yZGlvblNlcnZpY2VdLFxuICAgIH07XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJ1dWlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7dUJBeUJrRSxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUM7Z0NBQ3RCLElBQUksR0FBRyxFQUFFOzs7Ozs7O0lBRW5FLG9EQUFtQjs7Ozs7Y0FBQyxvQkFBNEIsRUFBRSxTQUFpQjs7UUFFeEUscUJBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdkMscUJBQUksS0FBSyxHQUFtQixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7O1FBRzlDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixLQUFLLEdBQUc7Z0JBQ04sR0FBRyxFQUFFLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLEVBQUU7YUFDVixDQUFDO1NBQ0g7O1FBR0QsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO1lBQ3JDLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztTQUNuRTs7UUFHRCxxQkFBTSxxQkFBcUIsR0FBbUI7WUFDNUMsR0FBRyxlQUNFLEtBQUssQ0FBQyxHQUFHLGVBQ1gsb0JBQW9CLElBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQzFDO1lBQ0QsS0FBSyxXQUFNLEtBQUssQ0FBQyxLQUFLLEdBQUUsb0JBQW9CLEVBQUM7U0FDOUMsQ0FBQztRQUVGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFM0QscUJBQU0sS0FBSyxHQUFXLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRTdELHFCQUFJLG9CQUFvQixnQkFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsZUFDekIsU0FBUyxJQUFHLHFCQUFxQixNQUNuQyxDQUFDOztRQUdGLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtZQUNiLHFCQUFNLG1CQUFtQixHQUFXLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFM0Usb0JBQW9CLEdBQUcsV0FBVyxDQUFDLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxtQkFBbUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQzVHO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQzs7Ozs7OztJQUduQyx5REFBd0I7Ozs7Y0FBQyxvQkFBNEI7UUFDMUQscUJBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFdkMscUJBQU0sU0FBUyxHQUFXLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUUxRSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2QsT0FBTztTQUNSO1FBRUQscUJBQU0sS0FBSyxHQUFtQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWpFLG9CQUFRLHlCQUFzQixFQUF0QixhQUE0QixFQUFFLDREQUF1QixDQUFDO1FBRTlELHFCQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsS0FBSyxvQkFBb0IsR0FBQSxDQUFDLENBQUM7UUFFckUscUJBQUksU0FBc0MsQ0FBQztRQUUzQyxJQUFRLGNBQVcsRUFBWCx5QkFBeUIsRUFBRSx5RUFBNkIsQ0FBQztRQUVqRSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOztZQUV6QixTQUFTLEdBQUcsZUFBZSxDQUFDO1NBQzdCO2FBQU07WUFDTCxxQkFBTSxpQkFBaUIsR0FBVyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLEVBQUUsS0FBSyxvQkFBb0IsR0FBQSxDQUFDLENBQUM7WUFDM0YscUJBQU0sY0FBYyxHQUFXLEtBQUssQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFbEUscUJBQU0sZ0NBQWdDLGdCQUNqQyxlQUFlLGVBQ2pCLFNBQVMsSUFBRztnQkFDWCxHQUFHLEVBQUUsTUFBTTtnQkFDWCxLQUFLLEVBQUUsUUFBUTthQUNoQixNQUNGLENBQUM7WUFFRixTQUFTLEdBQUcsV0FBVyxDQUFDLGdDQUFnQyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUN6RztRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7Ozs7O0lBR3hCLHlDQUFROzs7O2NBQUMsb0JBQTRCO1FBQzFDLHFCQUFNLFNBQVMsR0FBVyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFFMUUsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDdEIsR0FBRyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFBLENBQUMsRUFDaEMsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssR0FBQSxDQUFDLEVBQ3hCLEdBQUcsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsR0FBQSxDQUFDLEVBQzdDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLENBQUMsQ0FBQyxLQUFLLEdBQUEsQ0FBQyxFQUN4QixvQkFBb0IsRUFBRSxFQUN0QixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQ1QsQ0FBQzs7Ozs7OztJQUdJLDRDQUFXOzs7OztjQUFDLG9CQUE0QixFQUFFLFFBQWlDO1FBQ2pGLHFCQUFNLFNBQVMsR0FBVyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDMUUscUJBQU0sS0FBSyxHQUFtQixJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFFbkUsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQ1gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsU0FBUyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDcEc7Ozs7OztJQUdILHVDQUFNOzs7O0lBQU4sVUFBTyxvQkFBNEI7UUFDakMscUJBQU0sU0FBUyxHQUFXLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMxRSxxQkFBTSxLQUFLLEdBQW1CLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUVuRSxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDWCxxQkFBTSxNQUFNLEdBQVksS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUVyQyxJQUFJLENBQUMsV0FBVyxDQUFDLG9CQUFvQixFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUM3RDtLQUNGOzs7OztJQUVPLDBDQUFTOzs7O2NBQUMsb0JBQTRCO1FBQzVDLHFCQUFNLFNBQVMsR0FBVyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDMUUscUJBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdkMscUJBQU0sS0FBSyxHQUFtQixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQ1gscUJBQU0sS0FBSyxHQUFtQixLQUFLLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDOUQsT0FBTyxLQUFLLENBQUM7U0FDZDs7O2dCQW5JSixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7aUNBdkJsQzs7Ozs7Ozs7O0FBOEpBLHFCQUNFLE1BQW1DLEVBQ25DLFNBQWlCLEVBQ2pCLG9CQUE0QixFQUM1QixRQUFpQztJQUVqQyxvQkFDSyxNQUFNLGVBQ1IsU0FBUyxpQkFDTCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQ3BCLEdBQUcsZUFDRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxlQUN2QixvQkFBb0IsaUJBQ2hCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsRUFDM0MsUUFBUSxpQkFJakI7O0NBQ0g7Ozs7OztBQ2pMRDtJQW9DRSxrQ0FBb0Isc0JBQThDO1FBQTlDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7a0JBSDdDQSxFQUFJLEVBQUU7MEJBQ1MsSUFBSSxPQUFPLEVBQUU7S0FFcUI7Ozs7SUFFdEUsMkNBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZixNQUFNLElBQUksS0FBSyxDQUFDLGtGQUFrRixDQUFDLENBQUM7U0FDckc7UUFFRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFckUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFBLENBQUMsQ0FBQyxDQUFDO0tBQzdGOzs7O0lBRUQsOENBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUUzQixJQUFJLENBQUMsc0JBQXNCLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQy9EOzs7O0lBRUQseUNBQU07OztJQUFOO1FBQ0UsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDN0M7O2dCQWxERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLG9ZQWVYO29CQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDYjs7OztnQkF4QlEsc0JBQXNCOzs7d0JBMEI1QixLQUFLO3dCQUVMLEtBQUs7O21DQTdCUjs7Ozs7OztBQ0FBOzs7Ozs7SUFnQlMsNkJBQU87OztJQUFkO1FBQ0UsT0FBTztZQUNMLFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDcEMsQ0FBQztLQUNIOztnQkFYRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLFlBQVksQ0FBQztvQkFDdkQsWUFBWSxFQUFFLENBQUMsd0JBQXdCLENBQUM7b0JBQ3hDLE9BQU8sRUFBRSxDQUFDLHdCQUF3QixDQUFDO2lCQUNwQzs7Z0NBZEQ7Ozs7Ozs7Ozs7Ozs7OzsifQ==

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/accordions-page/accordions-page.component.html":
/*!****************************************************************!*\
  !*** ./src/app/accordions-page/accordions-page.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"accordions-container\">\n  <router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ "./src/app/accordions-page/accordions-page.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/accordions-page/accordions-page.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".accordions-container {\n  height: 800px; }\n  .accordions-container ngx-row-accordion {\n    height: 100%; }\n"

/***/ }),

/***/ "./src/app/accordions-page/accordions-page.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/accordions-page/accordions-page.component.ts ***!
  \**************************************************************/
/*! exports provided: AccordionsPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccordionsPageComponent", function() { return AccordionsPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AccordionsPageComponent = /** @class */ (function () {
    function AccordionsPageComponent() {
    }
    AccordionsPageComponent.prototype.ngOnInit = function () { };
    AccordionsPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-accordions-page',
            template: __webpack_require__(/*! ./accordions-page.component.html */ "./src/app/accordions-page/accordions-page.component.html"),
            styles: [__webpack_require__(/*! ./accordions-page.component.scss */ "./src/app/accordions-page/accordions-page.component.scss")],
        }),
        __metadata("design:paramtypes", [])
    ], AccordionsPageComponent);
    return AccordionsPageComponent;
}());



/***/ }),

/***/ "./src/app/accordions-page/accordions-page.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/accordions-page/accordions-page.module.ts ***!
  \***********************************************************/
/*! exports provided: AccordionsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccordionsPageModule", function() { return AccordionsPageModule; });
/* harmony import */ var _page_one_page_one_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-one/page-one.component */ "./src/app/accordions-page/page-one/page-one.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_row_accordion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-row-accordion */ "./dist/ngx-row-accordion/fesm5/ngx-row-accordion.js");
/* harmony import */ var _accordions_page_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./accordions-page.component */ "./src/app/accordions-page/accordions-page.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _page_two_page_two_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./page-two/page-two.component */ "./src/app/accordions-page/page-two/page-two.component.ts");
/* harmony import */ var _page_three_page_three_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./page-three/page-three.component */ "./src/app/accordions-page/page-three/page-three.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    {
        path: 'accordions',
        component: _accordions_page_component__WEBPACK_IMPORTED_MODULE_3__["AccordionsPageComponent"],
        children: [
            {
                path: 'page1',
                component: _page_one_page_one_component__WEBPACK_IMPORTED_MODULE_0__["PageOneComponent"],
                children: [
                    {
                        path: 'page2',
                        component: _page_two_page_two_component__WEBPACK_IMPORTED_MODULE_5__["PageTwoComponent"],
                        children: [
                            {
                                path: 'page3',
                                component: _page_three_page_three_component__WEBPACK_IMPORTED_MODULE_6__["PageThreeComponent"],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
var AccordionsPageModule = /** @class */ (function () {
    function AccordionsPageModule() {
    }
    AccordionsPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes), ngx_row_accordion__WEBPACK_IMPORTED_MODULE_2__["NgxRowAccordionModule"].forRoot()],
            declarations: [_accordions_page_component__WEBPACK_IMPORTED_MODULE_3__["AccordionsPageComponent"], _page_one_page_one_component__WEBPACK_IMPORTED_MODULE_0__["PageOneComponent"], _page_two_page_two_component__WEBPACK_IMPORTED_MODULE_5__["PageTwoComponent"], _page_three_page_three_component__WEBPACK_IMPORTED_MODULE_6__["PageThreeComponent"]],
        })
    ], AccordionsPageModule);
    return AccordionsPageModule;
}());



/***/ }),

/***/ "./src/app/accordions-page/page-one/page-one.component.html":
/*!******************************************************************!*\
  !*** ./src/app/accordions-page/page-one/page-one.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-row-accordion title=\"Page 1 title\" group=\"great-accordions-group\">\n  Page 1 content\n\n  <p>\n    <a routerLink=\"page2\">Open page 2</a>\n  </p>\n\n  Pariatur nisi consequat exercitation enim aliqua in labore ullamco nisi ad aliqua. Incididunt laborum sit exercitation dolore.\n  Incididunt occaecat fugiat veniam duis occaecat dolore esse. Do quis est nisi nulla aute. Proident aliquip Lorem ad qui\n  esse aliqua consequat aliqua dolor eu esse sint incididunt est. Lorem veniam nostrud dolore id nostrud labore labore. Excepteur\n  culpa nisi sit eiusmod officia deserunt officia incididunt velit aute sint cillum ex fugiat. Aliquip incididunt dolor eiusmod\n  labore do ea aute mollit voluptate laborum. In aliquip labore eu incididunt. Cillum consectetur sint enim ex nulla. Et\n  duis dolor excepteur qui fugiat labore et officia amet reprehenderit aliquip fugiat nostrud. Sit quis eu ad ipsum aute\n  occaecat. Exercitation ad aliqua sunt ut voluptate eiusmod anim. Est do incididunt magna mollit amet. Ullamco ipsum id\n  velit duis officia enim pariatur commodo ullamco duis sit occaecat ad amet. Magna nulla excepteur eiusmod et magna commodo.\n  Laborum culpa minim velit tempor consectetur reprehenderit nulla ullamco adipisicing amet laboris irure. Deserunt quis\n  anim minim enim dolore minim esse amet. Ex voluptate tempor officia commodo aute velit dolor commodo. Cupidatat magna fugiat\n  sint non sit enim minim ut ullamco elit occaecat ipsum. Anim adipisicing qui id duis. Ea fugiat pariatur eiusmod esse.\n  Labore nisi cillum exercitation cupidatat adipisicing aute adipisicing. Ut laborum pariatur aute ullamco laborum eu officia\n  aute laboris. Pariatur nisi consequat exercitation enim aliqua in labore ullamco nisi ad aliqua. Incididunt laborum sit\n  exercitation dolore. Incididunt occaecat fugiat veniam duis occaecat dolore esse. Do quis est nisi nulla aute. Proident\n  aliquip Lorem ad qui esse aliqua consequat aliqua dolor eu esse sint incididunt est. Lorem veniam nostrud dolore id nostrud\n  labore labore. Excepteur culpa nisi sit eiusmod officia deserunt officia incididunt velit aute sint cillum ex fugiat. Aliquip\n  incididunt dolor eiusmod labore do ea aute mollit voluptate laborum. In aliquip labore eu incididunt. Cillum consectetur\n  sint enim ex nulla. Et duis dolor excepteur qui fugiat labore et officia amet reprehenderit aliquip fugiat nostrud. Sit\n  quis eu ad ipsum aute occaecat. Exercitation ad aliqua sunt ut voluptate eiusmod anim. Est do incididunt magna mollit amet.\n  Ullamco ipsum id velit duis officia enim pariatur commodo ullamco duis sit occaecat ad amet. Magna nulla excepteur eiusmod\n  et magna commodo. Laborum culpa minim velit tempor consectetur reprehenderit nulla ullamco adipisicing amet laboris irure.\n  Deserunt quis anim minim enim dolore minim esse amet. Ex voluptate tempor officia commodo aute velit dolor commodo. Cupidatat\n  magna fugiat sint non sit enim minim ut ullamco elit occaecat ipsum. Anim adipisicing qui id duis. Ea fugiat pariatur eiusmod\n  esse. Labore nisi cillum exercitation cupidatat adipisicing aute adipisicing. Ut laborum pariatur aute ullamco laborum\n  eu officia aute laboris. Pariatur nisi consequat exercitation enim aliqua in labore ullamco nisi ad aliqua. Incididunt\n  laborum sit exercitation dolore. Incididunt occaecat fugiat veniam duis occaecat dolore esse. Do quis est nisi nulla aute.\n  Proident aliquip Lorem ad qui esse aliqua consequat aliqua dolor eu esse sint incididunt est. Lorem veniam nostrud dolore\n  id nostrud labore labore. Excepteur culpa nisi sit eiusmod officia deserunt officia incididunt velit aute sint cillum ex\n  fugiat. Aliquip incididunt dolor eiusmod labore do ea aute mollit voluptate laborum. In aliquip labore eu incididunt. Cillum\n  consectetur sint enim ex nulla. Et duis dolor excepteur qui fugiat labore et officia amet reprehenderit aliquip fugiat\n  nostrud. Sit quis eu ad ipsum aute occaecat. Exercitation ad aliqua sunt ut voluptate eiusmod anim. Est do incididunt magna\n  mollit amet. Ullamco ipsum id velit duis officia enim pariatur commodo ullamco duis sit occaecat ad amet. Magna nulla excepteur\n  eiusmod et magna commodo. Laborum culpa minim velit tempor consectetur reprehenderit nulla ullamco adipisicing amet laboris\n  irure. Deserunt quis anim minim enim dolore minim esse amet. Ex voluptate tempor officia commodo aute velit dolor commodo.\n  Cupidatat magna fugiat sint non sit enim minim ut ullamco elit occaecat ipsum. Anim adipisicing qui id duis. Ea fugiat\n  pariatur eiusmod esse. Labore nisi cillum exercitation cupidatat adipisicing aute adipisicing. Ut laborum pariatur aute\n  ullamco laborum eu officia aute laboris.\n</ngx-row-accordion>\n"

/***/ }),

/***/ "./src/app/accordions-page/page-one/page-one.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/accordions-page/page-one/page-one.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/accordions-page/page-one/page-one.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/accordions-page/page-one/page-one.component.ts ***!
  \****************************************************************/
/*! exports provided: PageOneComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageOneComponent", function() { return PageOneComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageOneComponent = /** @class */ (function () {
    function PageOneComponent() {
    }
    PageOneComponent.prototype.ngOnInit = function () { };
    PageOneComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-one',
            template: __webpack_require__(/*! ./page-one.component.html */ "./src/app/accordions-page/page-one/page-one.component.html"),
            styles: [__webpack_require__(/*! ./page-one.component.scss */ "./src/app/accordions-page/page-one/page-one.component.scss")],
        }),
        __metadata("design:paramtypes", [])
    ], PageOneComponent);
    return PageOneComponent;
}());



/***/ }),

/***/ "./src/app/accordions-page/page-three/page-three.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/accordions-page/page-three/page-three.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-row-accordion title=\"Page 3 title\" group=\"great-accordions-group\">\n  Page 3 content\n\n  <p>\n    <a routerLink=\"/app/accordions/page1/page2\">Come back to page 2</a>\n  </p>\n\n  Pariatur nisi consequat exercitation enim aliqua in labore ullamco nisi ad aliqua. Incididunt laborum sit exercitation dolore.\n  Incididunt occaecat fugiat veniam duis occaecat dolore esse. Do quis est nisi nulla aute. Proident aliquip Lorem ad qui\n  esse aliqua consequat aliqua dolor eu esse sint incididunt est. Lorem veniam nostrud dolore id nostrud labore labore. Excepteur\n  culpa nisi sit eiusmod officia deserunt officia incididunt velit aute sint cillum ex fugiat. Aliquip incididunt dolor eiusmod\n  labore do ea aute mollit voluptate laborum. In aliquip labore eu incididunt. Cillum consectetur sint enim ex nulla. Et\n</ngx-row-accordion>\n"

/***/ }),

/***/ "./src/app/accordions-page/page-three/page-three.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/accordions-page/page-three/page-three.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/accordions-page/page-three/page-three.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/accordions-page/page-three/page-three.component.ts ***!
  \********************************************************************/
/*! exports provided: PageThreeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageThreeComponent", function() { return PageThreeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageThreeComponent = /** @class */ (function () {
    function PageThreeComponent() {
    }
    PageThreeComponent.prototype.ngOnInit = function () { };
    PageThreeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-three',
            template: __webpack_require__(/*! ./page-three.component.html */ "./src/app/accordions-page/page-three/page-three.component.html"),
            styles: [__webpack_require__(/*! ./page-three.component.scss */ "./src/app/accordions-page/page-three/page-three.component.scss")],
        }),
        __metadata("design:paramtypes", [])
    ], PageThreeComponent);
    return PageThreeComponent;
}());



/***/ }),

/***/ "./src/app/accordions-page/page-two/page-two.component.html":
/*!******************************************************************!*\
  !*** ./src/app/accordions-page/page-two/page-two.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-row-accordion title=\"Page 2 title\" group=\"great-accordions-group\">\n    Page 2 content\n\n    <p>\n      <a routerLink=\"page3\">Open page 3</a>\n    </p>\n\n    <p>\n      <a routerLink=\"/app/accordions/page1\">Come back to page 1</a>\n    </p>\n\n    Pariatur nisi consequat exercitation enim aliqua in labore ullamco nisi ad aliqua. Incididunt laborum sit exercitation dolore.\n    Incididunt occaecat fugiat veniam duis occaecat dolore esse. Do quis est nisi nulla aute. Proident aliquip Lorem ad qui\n    esse aliqua consequat aliqua dolor eu esse sint incididunt est. Lorem veniam nostrud dolore id nostrud labore labore. Excepteur\n    culpa nisi sit eiusmod officia deserunt officia incididunt velit aute sint cillum ex fugiat. Aliquip incididunt dolor eiusmod\n    labore do ea aute mollit voluptate laborum. In aliquip labore eu incididunt. Cillum consectetur sint enim ex nulla. Et\n    duis dolor excepteur qui fugiat labore et officia amet reprehenderit aliquip fugiat nostrud. Sit quis eu ad ipsum aute\n    occaecat. Exercitation ad aliqua sunt ut voluptate eiusmod anim. Est do incididunt magna mollit amet. Ullamco ipsum id\n    velit duis officia enim pariatur commodo ullamco duis sit occaecat ad amet. Magna nulla excepteur eiusmod et magna commodo.\n    Laborum culpa minim velit tempor consectetur reprehenderit nulla ullamco adipisicing amet laboris irure. Deserunt quis\n    anim minim enim dolore minim esse amet. Ex voluptate tempor officia commodo aute velit dolor commodo. Cupidatat magna fugiat\n  </ngx-row-accordion>\n\n"

/***/ }),

/***/ "./src/app/accordions-page/page-two/page-two.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/accordions-page/page-two/page-two.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/accordions-page/page-two/page-two.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/accordions-page/page-two/page-two.component.ts ***!
  \****************************************************************/
/*! exports provided: PageTwoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageTwoComponent", function() { return PageTwoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageTwoComponent = /** @class */ (function () {
    function PageTwoComponent() {
    }
    PageTwoComponent.prototype.ngOnInit = function () { };
    PageTwoComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-two',
            template: __webpack_require__(/*! ./page-two.component.html */ "./src/app/accordions-page/page-two/page-two.component.html"),
            styles: [__webpack_require__(/*! ./page-two.component.scss */ "./src/app/accordions-page/page-two/page-two.component.scss")],
        }),
        __metadata("design:paramtypes", [])
    ], PageTwoComponent);
    return PageTwoComponent;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\">\n  <div fxFlex>\n    <h1>Main route</h1>\n    <button routerLink=\"app/accordions/page1\" type=\"button\" data-go-to-page-1-primary>\n      Go to first primary outlet\n    </button>\n\n    <button routerLink=\"app/accordions\" type=\"button\" data-close-all-primary>\n      Close all (primary outlet)\n    </button>\n  </div>\n\n  <div fxFlex>\n    <h1>Aux route</h1>\n    <button [routerLink]=\"[{outlets: {'aux': ['auxiliary-route', 'accordions', 'page4']}}]\" type=\"button\" data-go-to-page-4-aux>\n      Go to first auxiliary outlet\n    </button>\n\n    <button [routerLink]=\"[{outlets: {'aux': null}}]\" data-close-all-aux>\n      Close all (auxiliary outlet)\n    </button>\n  </div>\n</div>\n\n<div fxLayout=\"row\">\n  <div fxFlex>\n    <router-outlet></router-outlet>\n  </div>\n\n  <div fxFlex>\n    <router-outlet name=\"aux\"></router-outlet>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")],
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: loadAccordionsPageModule, loadAuxAccordionsPageModule, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadAccordionsPageModule", function() { return loadAccordionsPageModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadAuxAccordionsPageModule", function() { return loadAuxAccordionsPageModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _accordions_page_accordions_page_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./accordions-page/accordions-page.module */ "./src/app/accordions-page/accordions-page.module.ts");
/* harmony import */ var _aux_accordions_page_aux_accordions_page_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./aux-accordions-page/aux-accordions-page.module */ "./src/app/aux-accordions-page/aux-accordions-page.module.ts");
/* harmony import */ var _auxiliary_route_proxy_auxiliary_route_proxy_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./auxiliary-route-proxy/auxiliary-route-proxy.component */ "./src/app/auxiliary-route-proxy/auxiliary-route-proxy.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










function loadAccordionsPageModule() {
    return _accordions_page_accordions_page_module__WEBPACK_IMPORTED_MODULE_7__["AccordionsPageModule"];
}
function loadAuxAccordionsPageModule() {
    return _aux_accordions_page_aux_accordions_page_module__WEBPACK_IMPORTED_MODULE_8__["AuxAccordionsPageModule"];
}
// for now the build of the project (at least demo) does not work at all
// when using lazy loading like the following
// ----------------------------------------
// {
//   path: 'auxiliary-route',
//   outlet: 'aux',
//   component: AuxiliaryRouteProxyComponent,
//   children: [
//     {
//       path: '',
//       loadChildren: 'app/aux-accordions-page/aux-accordions-page.module#AuxAccordionsPageModule',
//     },
//   ],
// },
// {
//   path: 'app',
//   loadChildren: 'app/accordions-page/accordions-page.module#AccordionsPageModule',
// },
// ----------------------------------------
// it's failing because of CLI issues
// https://github.com/angular/angular-cli/issues/2601
// https://github.com/angular/angular-cli/issues/10750
// https://github.com/angular/angular-cli/issues/7332
// when not using lazy loading, it doesn't work either
// because of https://github.com/angular/angular-cli/issues/4192 ... ¯\_(ツ)_/¯
// tried to explain the vicious circle here:
// https://github.com/angular/angular-cli/issues/2601#issuecomment-393197794
var routes = [
    {
        path: 'auxiliary-route',
        outlet: 'aux',
        component: _auxiliary_route_proxy_auxiliary_route_proxy_component__WEBPACK_IMPORTED_MODULE_9__["AuxiliaryRouteProxyComponent"],
        children: [
            {
                path: '',
                loadChildren: loadAuxAccordionsPageModule,
            },
        ],
    },
    {
        path: 'app',
        loadChildren: loadAccordionsPageModule,
    },
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"], _auxiliary_route_proxy_auxiliary_route_proxy_component__WEBPACK_IMPORTED_MODULE_9__["AuxiliaryRouteProxyComponent"]],
            imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forRoot(routes), _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__["SharedModule"], _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__["FlexModule"]],
            providers: [
                {
                    provide: _angular_common__WEBPACK_IMPORTED_MODULE_5__["LocationStrategy"],
                    useClass: _angular_common__WEBPACK_IMPORTED_MODULE_5__["HashLocationStrategy"],
                },
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]],
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/aux-accordions-page/aux-accordions-page.component.html":
/*!************************************************************************!*\
  !*** ./src/app/aux-accordions-page/aux-accordions-page.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/aux-accordions-page/aux-accordions-page.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/aux-accordions-page/aux-accordions-page.component.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/aux-accordions-page/aux-accordions-page.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/aux-accordions-page/aux-accordions-page.component.ts ***!
  \**********************************************************************/
/*! exports provided: AuxAccordionsPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuxAccordionsPageComponent", function() { return AuxAccordionsPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AuxAccordionsPageComponent = /** @class */ (function () {
    function AuxAccordionsPageComponent() {
    }
    AuxAccordionsPageComponent.prototype.ngOnInit = function () { };
    AuxAccordionsPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-aux-accordions-page',
            template: __webpack_require__(/*! ./aux-accordions-page.component.html */ "./src/app/aux-accordions-page/aux-accordions-page.component.html"),
            styles: [__webpack_require__(/*! ./aux-accordions-page.component.scss */ "./src/app/aux-accordions-page/aux-accordions-page.component.scss")],
        }),
        __metadata("design:paramtypes", [])
    ], AuxAccordionsPageComponent);
    return AuxAccordionsPageComponent;
}());



/***/ }),

/***/ "./src/app/aux-accordions-page/aux-accordions-page.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/aux-accordions-page/aux-accordions-page.module.ts ***!
  \*******************************************************************/
/*! exports provided: AuxAccordionsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuxAccordionsPageModule", function() { return AuxAccordionsPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _aux_accordions_page_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./aux-accordions-page.component */ "./src/app/aux-accordions-page/aux-accordions-page.component.ts");
/* harmony import */ var _page_four_page_four_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-four/page-four.component */ "./src/app/aux-accordions-page/page-four/page-four.component.ts");
/* harmony import */ var _page_five_page_five_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page-five/page-five.component */ "./src/app/aux-accordions-page/page-five/page-five.component.ts");
/* harmony import */ var _page_six_page_six_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./page-six/page-six.component */ "./src/app/aux-accordions-page/page-six/page-six.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    {
        path: 'accordions',
        component: _aux_accordions_page_component__WEBPACK_IMPORTED_MODULE_1__["AuxAccordionsPageComponent"],
        children: [
            {
                path: 'page4',
                component: _page_four_page_four_component__WEBPACK_IMPORTED_MODULE_2__["PageFourComponent"],
                children: [
                    {
                        path: 'page5',
                        component: _page_five_page_five_component__WEBPACK_IMPORTED_MODULE_3__["PageFiveComponent"],
                        children: [
                            {
                                path: 'page6',
                                component: _page_six_page_six_component__WEBPACK_IMPORTED_MODULE_4__["PageSixComponent"],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
var AuxAccordionsPageModule = /** @class */ (function () {
    function AuxAccordionsPageModule() {
    }
    AuxAccordionsPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"].forChild(routes)],
            declarations: [_aux_accordions_page_component__WEBPACK_IMPORTED_MODULE_1__["AuxAccordionsPageComponent"], _page_four_page_four_component__WEBPACK_IMPORTED_MODULE_2__["PageFourComponent"], _page_five_page_five_component__WEBPACK_IMPORTED_MODULE_3__["PageFiveComponent"], _page_six_page_six_component__WEBPACK_IMPORTED_MODULE_4__["PageSixComponent"]],
        })
    ], AuxAccordionsPageModule);
    return AuxAccordionsPageModule;
}());



/***/ }),

/***/ "./src/app/aux-accordions-page/page-five/page-five.component.html":
/*!************************************************************************!*\
  !*** ./src/app/aux-accordions-page/page-five/page-five.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-row-accordion title=\"Page 5 title\" group=\"awesome-accordions-group\">\n  Page 5 content\n\n  <p>\n    <a routerLink=\"page6\">Open page 6</a>\n  </p>\n\n  <p>\n    <a routerLink=\"..\">Come back to page 4</a>\n  </p>\n\n  Pariatur nisi consequat exercitation enim aliqua in labore ullamco nisi ad aliqua. Incididunt laborum sit exercitation dolore.\n  Incididunt occaecat fugiat veniam duis occaecat dolore esse. Do quis est nisi nulla aute. Proident aliquip Lorem ad qui\n  esse aliqua consequat aliqua dolor eu esse sint incididunt est. Lorem veniam nostrud dolore id nostrud labore labore. Excepteur\n  culpa nisi sit eiusmod officia deserunt officia incididunt velit aute sint cillum ex fugiat. Aliquip incididunt dolor eiusmod\n  labore do ea aute mollit voluptate laborum. In aliquip labore eu incididunt. Cillum consectetur sint enim ex nulla. Et\n  duis dolor excepteur qui fugiat labore et officia amet reprehenderit aliquip fugiat nostrud. Sit quis eu ad ipsum aute\n  occaecat. Exercitation ad aliqua sunt ut voluptate eiusmod anim. Est do incididunt magna mollit amet. Ullamco ipsum id\n  velit duis officia enim pariatur commodo ullamco duis sit occaecat ad amet. Magna nulla excepteur eiusmod et magna commodo.\n  Laborum culpa minim velit tempor consectetur reprehenderit nulla ullamco adipisicing amet laboris irure. Deserunt quis\n  anim minim enim dolore minim esse amet. Ex voluptate tempor officia commodo aute velit dolor commodo. Cupidatat magna fugiat\n</ngx-row-accordion>\n\n"

/***/ }),

/***/ "./src/app/aux-accordions-page/page-five/page-five.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/aux-accordions-page/page-five/page-five.component.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/aux-accordions-page/page-five/page-five.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/aux-accordions-page/page-five/page-five.component.ts ***!
  \**********************************************************************/
/*! exports provided: PageFiveComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageFiveComponent", function() { return PageFiveComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageFiveComponent = /** @class */ (function () {
    function PageFiveComponent() {
    }
    PageFiveComponent.prototype.ngOnInit = function () { };
    PageFiveComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-five',
            template: __webpack_require__(/*! ./page-five.component.html */ "./src/app/aux-accordions-page/page-five/page-five.component.html"),
            styles: [__webpack_require__(/*! ./page-five.component.scss */ "./src/app/aux-accordions-page/page-five/page-five.component.scss")],
        }),
        __metadata("design:paramtypes", [])
    ], PageFiveComponent);
    return PageFiveComponent;
}());



/***/ }),

/***/ "./src/app/aux-accordions-page/page-four/page-four.component.html":
/*!************************************************************************!*\
  !*** ./src/app/aux-accordions-page/page-four/page-four.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-row-accordion title=\"Page 4 title\" group=\"awesome-accordions-group\">\n  Page 4 content\n\n  <p>\n    <a routerLink=\"page5\">Open page 5</a>\n  </p>\n\n  Pariatur nisi consequat exercitation enim aliqua in labore ullamco nisi ad aliqua. Incididunt laborum sit exercitation dolore.\n  Incididunt occaecat fugiat veniam duis occaecat dolore esse. Do quis est nisi nulla aute. Proident aliquip Lorem ad qui\n  esse aliqua consequat aliqua dolor eu esse sint incididunt est. Lorem veniam nostrud dolore id nostrud labore labore. Excepteur\n  culpa nisi sit eiusmod officia deserunt officia incididunt velit aute sint cillum ex fugiat. Aliquip incididunt dolor eiusmod\n  labore do ea aute mollit voluptate laborum. In aliquip labore eu incididunt. Cillum consectetur sint enim ex nulla. Et\n  duis dolor excepteur qui fugiat labore et officia amet reprehenderit aliquip fugiat nostrud. Sit quis eu ad ipsum aute\n  occaecat. Exercitation ad aliqua sunt ut voluptate eiusmod anim. Est do incididunt magna mollit amet. Ullamco ipsum id\n  velit duis officia enim pariatur commodo ullamco duis sit occaecat ad amet. Magna nulla excepteur eiusmod et magna commodo.\n  Laborum culpa minim velit tempor consectetur reprehenderit nulla ullamco adipisicing amet laboris irure. Deserunt quis\n  anim minim enim dolore minim esse amet. Ex voluptate tempor officia commodo aute velit dolor commodo. Cupidatat magna fugiat\n  sint non sit enim minim ut ullamco elit occaecat ipsum. Anim adipisicing qui id duis. Ea fugiat pariatur eiusmod esse.\n  Labore nisi cillum exercitation cupidatat adipisicing aute adipisicing. Ut laborum pariatur aute ullamco laborum eu officia\n  aute laboris. Pariatur nisi consequat exercitation enim aliqua in labore ullamco nisi ad aliqua. Incididunt laborum sit\n  exercitation dolore. Incididunt occaecat fugiat veniam duis occaecat dolore esse. Do quis est nisi nulla aute. Proident\n  aliquip Lorem ad qui esse aliqua consequat aliqua dolor eu esse sint incididunt est. Lorem veniam nostrud dolore id nostrud\n  labore labore. Excepteur culpa nisi sit eiusmod officia deserunt officia incididunt velit aute sint cillum ex fugiat. Aliquip\n  incididunt dolor eiusmod labore do ea aute mollit voluptate laborum. In aliquip labore eu incididunt. Cillum consectetur\n  sint enim ex nulla. Et duis dolor excepteur qui fugiat labore et officia amet reprehenderit aliquip fugiat nostrud. Sit\n  quis eu ad ipsum aute occaecat. Exercitation ad aliqua sunt ut voluptate eiusmod anim. Est do incididunt magna mollit amet.\n  Ullamco ipsum id velit duis officia enim pariatur commodo ullamco duis sit occaecat ad amet. Magna nulla excepteur eiusmod\n  et magna commodo. Laborum culpa minim velit tempor consectetur reprehenderit nulla ullamco adipisicing amet laboris irure.\n  Deserunt quis anim minim enim dolore minim esse amet. Ex voluptate tempor officia commodo aute velit dolor commodo. Cupidatat\n  magna fugiat sint non sit enim minim ut ullamco elit occaecat ipsum. Anim adipisicing qui id duis. Ea fugiat pariatur eiusmod\n  esse. Labore nisi cillum exercitation cupidatat adipisicing aute adipisicing. Ut laborum pariatur aute ullamco laborum\n  eu officia aute laboris. Pariatur nisi consequat exercitation enim aliqua in labore ullamco nisi ad aliqua. Incididunt\n  laborum sit exercitation dolore. Incididunt occaecat fugiat veniam duis occaecat dolore esse. Do quis est nisi nulla aute.\n  Proident aliquip Lorem ad qui esse aliqua consequat aliqua dolor eu esse sint incididunt est. Lorem veniam nostrud dolore\n  id nostrud labore labore. Excepteur culpa nisi sit eiusmod officia deserunt officia incididunt velit aute sint cillum ex\n  fugiat. Aliquip incididunt dolor eiusmod labore do ea aute mollit voluptate laborum. In aliquip labore eu incididunt. Cillum\n  consectetur sint enim ex nulla. Et duis dolor excepteur qui fugiat labore et officia amet reprehenderit aliquip fugiat\n  nostrud. Sit quis eu ad ipsum aute occaecat. Exercitation ad aliqua sunt ut voluptate eiusmod anim. Est do incididunt magna\n  mollit amet. Ullamco ipsum id velit duis officia enim pariatur commodo ullamco duis sit occaecat ad amet. Magna nulla excepteur\n  eiusmod et magna commodo. Laborum culpa minim velit tempor consectetur reprehenderit nulla ullamco adipisicing amet laboris\n  irure. Deserunt quis anim minim enim dolore minim esse amet. Ex voluptate tempor officia commodo aute velit dolor commodo.\n  Cupidatat magna fugiat sint non sit enim minim ut ullamco elit occaecat ipsum. Anim adipisicing qui id duis. Ea fugiat\n  pariatur eiusmod esse. Labore nisi cillum exercitation cupidatat adipisicing aute adipisicing. Ut laborum pariatur aute\n  ullamco laborum eu officia aute laboris.\n</ngx-row-accordion>\n"

/***/ }),

/***/ "./src/app/aux-accordions-page/page-four/page-four.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/aux-accordions-page/page-four/page-four.component.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/aux-accordions-page/page-four/page-four.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/aux-accordions-page/page-four/page-four.component.ts ***!
  \**********************************************************************/
/*! exports provided: PageFourComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageFourComponent", function() { return PageFourComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageFourComponent = /** @class */ (function () {
    function PageFourComponent() {
    }
    PageFourComponent.prototype.ngOnInit = function () { };
    PageFourComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-four',
            template: __webpack_require__(/*! ./page-four.component.html */ "./src/app/aux-accordions-page/page-four/page-four.component.html"),
            styles: [__webpack_require__(/*! ./page-four.component.scss */ "./src/app/aux-accordions-page/page-four/page-four.component.scss")],
        }),
        __metadata("design:paramtypes", [])
    ], PageFourComponent);
    return PageFourComponent;
}());



/***/ }),

/***/ "./src/app/aux-accordions-page/page-six/page-six.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/aux-accordions-page/page-six/page-six.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-row-accordion title=\"Page 6 title\" group=\"awesome-accordions-group\">\n  Page 6 content\n\n  <p>\n    <a routerLink=\"..\">Come back to page 5</a>\n  </p>\n\n  Pariatur nisi consequat exercitation enim aliqua in labore ullamco nisi ad aliqua. Incididunt laborum sit exercitation dolore.\n  Incididunt occaecat fugiat veniam duis occaecat dolore esse. Do quis est nisi nulla aute. Proident aliquip Lorem ad qui\n  esse aliqua consequat aliqua dolor eu esse sint incididunt est. Lorem veniam nostrud dolore id nostrud labore labore. Excepteur\n  culpa nisi sit eiusmod officia deserunt officia incididunt velit aute sint cillum ex fugiat. Aliquip incididunt dolor eiusmod\n  labore do ea aute mollit voluptate laborum. In aliquip labore eu incididunt. Cillum consectetur sint enim ex nulla. Et\n</ngx-row-accordion>\n"

/***/ }),

/***/ "./src/app/aux-accordions-page/page-six/page-six.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/aux-accordions-page/page-six/page-six.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/aux-accordions-page/page-six/page-six.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/aux-accordions-page/page-six/page-six.component.ts ***!
  \********************************************************************/
/*! exports provided: PageSixComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageSixComponent", function() { return PageSixComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageSixComponent = /** @class */ (function () {
    function PageSixComponent() {
    }
    PageSixComponent.prototype.ngOnInit = function () { };
    PageSixComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-six',
            template: __webpack_require__(/*! ./page-six.component.html */ "./src/app/aux-accordions-page/page-six/page-six.component.html"),
            styles: [__webpack_require__(/*! ./page-six.component.scss */ "./src/app/aux-accordions-page/page-six/page-six.component.scss")],
        }),
        __metadata("design:paramtypes", [])
    ], PageSixComponent);
    return PageSixComponent;
}());



/***/ }),

/***/ "./src/app/auxiliary-route-proxy/auxiliary-route-proxy.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/auxiliary-route-proxy/auxiliary-route-proxy.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/auxiliary-route-proxy/auxiliary-route-proxy.component.scss":
/*!****************************************************************************!*\
  !*** ./src/app/auxiliary-route-proxy/auxiliary-route-proxy.component.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/auxiliary-route-proxy/auxiliary-route-proxy.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/auxiliary-route-proxy/auxiliary-route-proxy.component.ts ***!
  \**************************************************************************/
/*! exports provided: AuxiliaryRouteProxyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuxiliaryRouteProxyComponent", function() { return AuxiliaryRouteProxyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AuxiliaryRouteProxyComponent = /** @class */ (function () {
    function AuxiliaryRouteProxyComponent() {
    }
    AuxiliaryRouteProxyComponent.prototype.ngOnInit = function () { };
    AuxiliaryRouteProxyComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-auxiliary-route-proxy',
            template: __webpack_require__(/*! ./auxiliary-route-proxy.component.html */ "./src/app/auxiliary-route-proxy/auxiliary-route-proxy.component.html"),
            styles: [__webpack_require__(/*! ./auxiliary-route-proxy.component.scss */ "./src/app/auxiliary-route-proxy/auxiliary-route-proxy.component.scss")],
        }),
        __metadata("design:paramtypes", [])
    ], AuxiliaryRouteProxyComponent);
    return AuxiliaryRouteProxyComponent;
}());



/***/ }),

/***/ "./src/app/shared/shared.module.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var ngx_row_accordion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-row-accordion */ "./dist/ngx-row-accordion/fesm5/ngx-row-accordion.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var shared = [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"], ngx_row_accordion__WEBPACK_IMPORTED_MODULE_2__["NgxRowAccordionModule"]];
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: shared.slice(),
            exports: shared.slice(),
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])()
    .bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/travis/build/maxime1992/ngx-row-accordion/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map