import{a as _e,b as Ce}from"./chunk-77S6SFFR.js";import{A as st,C as rt,D as le,E as It,M as ce,N as wt,O as de,P as he,Q as G,R as $,S as me,T as lt,U as L,V as T,W as ct,_ as ue,aa as pe,ba as M,ca as fe,da as ge,ga as dt,ja as ye,q as se,s as Ot,t as Tt,u as re,v as nt,w as ot,z as at}from"./chunk-NEWLENRX.js";import{$ as Z,A as R,Aa as N,Ab as Wt,Ac as ne,Ba as V,Bb as Yt,Cb as vt,Da as Ht,Db as Dt,Dc as oe,Eb as c,Fb as h,Fc as kt,G as Q,Hb as et,Hc as ae,Ib as xt,Ja as Ct,Kb as C,M as Vt,Mb as m,Rb as Qt,Sb as Ut,T as U,Tb as Jt,Vb as f,Wa as u,Wb as O,Xa as d,Xb as At,Za as Gt,_ as J,a as D,ac as Zt,b as Pt,ba as A,bc as v,da as p,db as X,ea as _,ec as Kt,fb as $t,fc as Xt,hc as te,ia as y,ib as zt,j as x,ja as K,jb as yt,ka as j,kb as F,lb as qt,n as Bt,pb as b,qc as ee,ra as P,sa as B,sb as tt,tb as H,v as Y,va as _t,vb as bt,vc as ie,xa as k,z as Nt,zb as S,zc as it}from"./chunk-L6CPDOQ7.js";function Ee(o,i){}var E=class{constructor(){this.role="dialog",this.panelClass="",this.hasBackdrop=!0,this.backdropClass="",this.disableClose=!1,this.width="",this.height="",this.data=null,this.ariaDescribedBy=null,this.ariaLabelledBy=null,this.ariaLabel=null,this.ariaModal=!0,this.autoFocus="first-tabbable",this.restoreFocus=!0,this.closeOnNavigation=!0,this.closeOnDestroy=!0,this.closeOnOverlayDetachments=!0}};var Ft=(()=>{let i=class i extends he{constructor(t,e,n,s,l,r,g,w){super(),this._elementRef=t,this._focusTrapFactory=e,this._config=s,this._interactivityChecker=l,this._ngZone=r,this._overlayRef=g,this._focusMonitor=w,this._platform=_(re),this._focusTrap=null,this._elementFocusedBeforeDialogWasOpened=null,this._closeInteractionType=null,this._ariaLabelledByQueue=[],this._changeDetectorRef=_(ee),this._injector=_(k),this._isDestroyed=!1,this.attachDomPortal=gt=>{this._portalOutlet.hasAttached();let Ie=this._portalOutlet.attachDomPortal(gt);return this._contentAttached(),Ie},this._document=n,this._config.ariaLabelledBy&&this._ariaLabelledByQueue.push(this._config.ariaLabelledBy)}_addAriaLabelledBy(t){this._ariaLabelledByQueue.push(t),this._changeDetectorRef.markForCheck()}_removeAriaLabelledBy(t){let e=this._ariaLabelledByQueue.indexOf(t);e>-1&&(this._ariaLabelledByQueue.splice(e,1),this._changeDetectorRef.markForCheck())}_contentAttached(){this._initializeFocusTrap(),this._handleBackdropClicks(),this._captureInitialFocus()}_captureInitialFocus(){this._trapFocus()}ngOnDestroy(){this._isDestroyed=!0,this._restoreFocus()}attachComponentPortal(t){this._portalOutlet.hasAttached();let e=this._portalOutlet.attachComponentPortal(t);return this._contentAttached(),e}attachTemplatePortal(t){this._portalOutlet.hasAttached();let e=this._portalOutlet.attachTemplatePortal(t);return this._contentAttached(),e}_recaptureFocus(){this._containsFocus()||this._trapFocus()}_forceFocus(t,e){this._interactivityChecker.isFocusable(t)||(t.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let n=()=>{t.removeEventListener("blur",n),t.removeEventListener("mousedown",n),t.removeAttribute("tabindex")};t.addEventListener("blur",n),t.addEventListener("mousedown",n)})),t.focus(e)}_focusByCssSelector(t,e){let n=this._elementRef.nativeElement.querySelector(t);n&&this._forceFocus(n,e)}_trapFocus(){this._isDestroyed||$t(()=>{let t=this._elementRef.nativeElement;switch(this._config.autoFocus){case!1:case"dialog":this._containsFocus()||t.focus();break;case!0:case"first-tabbable":this._focusTrap?.focusInitialElement()||this._focusDialogContainer();break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this._config.autoFocus);break}},{injector:this._injector})}_restoreFocus(){let t=this._config.restoreFocus,e=null;if(typeof t=="string"?e=this._document.querySelector(t):typeof t=="boolean"?e=t?this._elementFocusedBeforeDialogWasOpened:null:t&&(e=t),this._config.restoreFocus&&e&&typeof e.focus=="function"){let n=nt(),s=this._elementRef.nativeElement;(!n||n===this._document.body||n===s||s.contains(n))&&(this._focusMonitor?(this._focusMonitor.focusVia(e,this._closeInteractionType),this._closeInteractionType=null):e.focus())}this._focusTrap&&this._focusTrap.destroy()}_focusDialogContainer(){this._elementRef.nativeElement.focus&&this._elementRef.nativeElement.focus()}_containsFocus(){let t=this._elementRef.nativeElement,e=nt();return t===e||t.contains(e)}_initializeFocusTrap(){this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._document&&(this._elementFocusedBeforeDialogWasOpened=nt()))}_handleBackdropClicks(){this._overlayRef.backdropClick().subscribe(()=>{this._config.disableClose&&this._recaptureFocus()})}};i.\u0275fac=function(e){return new(e||i)(d(V),d(st),d(it,8),d(E),d(at),d(X),d(L),d(rt))},i.\u0275cmp=y({type:i,selectors:[["cdk-dialog-container"]],viewQuery:function(e,n){if(e&1&&Qt(G,7),e&2){let s;Ut(s=Jt())&&(n._portalOutlet=s.first)}},hostAttrs:["tabindex","-1",1,"cdk-dialog-container"],hostVars:6,hostBindings:function(e,n){e&2&&tt("id",n._config.id||null)("role",n._config.role)("aria-modal",n._config.ariaModal)("aria-labelledby",n._config.ariaLabel?null:n._ariaLabelledByQueue[0])("aria-label",n._config.ariaLabel)("aria-describedby",n._config.ariaDescribedBy||null)},standalone:!0,features:[F,v],decls:1,vars:0,consts:[["cdkPortalOutlet",""]],template:function(e,n){e&1&&b(0,Ee,0,0,"ng-template",0)},dependencies:[G],styles:[".cdk-dialog-container{display:block;width:100%;height:100%;min-height:inherit;max-height:inherit}"],encapsulation:2});let o=i;return o})(),z=class{constructor(i,a){this.overlayRef=i,this.config=a,this.closed=new x,this.disableClose=a.disableClose,this.backdropClick=i.backdropClick(),this.keydownEvents=i.keydownEvents(),this.outsidePointerEvents=i.outsidePointerEvents(),this.id=a.id,this.keydownEvents.subscribe(t=>{t.keyCode===27&&!this.disableClose&&!ot(t)&&(t.preventDefault(),this.close(void 0,{focusOrigin:"keyboard"}))}),this.backdropClick.subscribe(()=>{this.disableClose||this.close(void 0,{focusOrigin:"mouse"})}),this._detachSubscription=i.detachments().subscribe(()=>{a.closeOnOverlayDetachments!==!1&&this.close()})}close(i,a){if(this.containerInstance){let t=this.closed;this.containerInstance._closeInteractionType=a?.focusOrigin||"program",this._detachSubscription.unsubscribe(),this.overlayRef.dispose(),t.next(i),t.complete(),this.componentInstance=this.containerInstance=null}}updatePosition(){return this.overlayRef.updatePosition(),this}updateSize(i="",a=""){return this.overlayRef.updateSize({width:i,height:a}),this}addPanelClass(i){return this.overlayRef.addPanelClass(i),this}removePanelClass(i){return this.overlayRef.removePanelClass(i),this}},Fe=new A("DialogScrollStrategy",{providedIn:"root",factory:()=>{let o=_(T);return()=>o.scrollStrategies.block()}}),Le=new A("DialogData"),Me=new A("DefaultDialogConfig");var Re=0,Lt=(()=>{let i=class i{get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}constructor(t,e,n,s,l,r){this._overlay=t,this._injector=e,this._defaultOptions=n,this._parentDialog=s,this._overlayContainer=l,this._openDialogsAtThisLevel=[],this._afterAllClosedAtThisLevel=new x,this._afterOpenedAtThisLevel=new x,this._ariaHiddenElements=new Map,this.afterAllClosed=Y(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(U(void 0))),this._scrollStrategy=r}open(t,e){let n=this._defaultOptions||new E;e=D(D({},n),e),e.id=e.id||`cdk-dialog-${Re++}`,e.id&&this.getDialogById(e.id);let s=this._getOverlayConfig(e),l=this._overlay.create(s),r=new z(l,e),g=this._attachContainer(l,r,e);return r.containerInstance=g,this._attachDialogContent(t,r,g,e),this.openDialogs.length||this._hideNonDialogContentFromAssistiveTechnology(),this.openDialogs.push(r),r.closed.subscribe(()=>this._removeOpenDialog(r,!0)),this.afterOpened.next(r),r}closeAll(){St(this.openDialogs,t=>t.close())}getDialogById(t){return this.openDialogs.find(e=>e.id===t)}ngOnDestroy(){St(this._openDialogsAtThisLevel,t=>{t.config.closeOnDestroy===!1&&this._removeOpenDialog(t,!1)}),St(this._openDialogsAtThisLevel,t=>t.close()),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete(),this._openDialogsAtThisLevel=[]}_getOverlayConfig(t){let e=new me({positionStrategy:t.positionStrategy||this._overlay.position().global().centerHorizontally().centerVertically(),scrollStrategy:t.scrollStrategy||this._scrollStrategy(),panelClass:t.panelClass,hasBackdrop:t.hasBackdrop,direction:t.direction,minWidth:t.minWidth,minHeight:t.minHeight,maxWidth:t.maxWidth,maxHeight:t.maxHeight,width:t.width,height:t.height,disposeOnNavigation:t.closeOnNavigation});return t.backdropClass&&(e.backdropClass=t.backdropClass),e}_attachContainer(t,e,n){let s=n.injector||n.viewContainerRef?.injector,l=[{provide:E,useValue:n},{provide:z,useValue:e},{provide:L,useValue:t}],r;n.container?typeof n.container=="function"?r=n.container:(r=n.container.type,l.push(...n.container.providers(n))):r=Ft;let g=new wt(r,n.viewContainerRef,k.create({parent:s||this._injector,providers:l}),n.componentFactoryResolver);return t.attach(g).instance}_attachDialogContent(t,e,n,s){if(t instanceof Gt){let l=this._createInjector(s,e,n,void 0),r={$implicit:s.data,dialogRef:e};s.templateContext&&(r=D(D({},r),typeof s.templateContext=="function"?s.templateContext():s.templateContext)),n.attachTemplatePortal(new de(t,null,r,l))}else{let l=this._createInjector(s,e,n,this._injector),r=n.attachComponentPortal(new wt(t,s.viewContainerRef,l,s.componentFactoryResolver));e.componentRef=r,e.componentInstance=r.instance}}_createInjector(t,e,n,s){let l=t.injector||t.viewContainerRef?.injector,r=[{provide:Le,useValue:t.data},{provide:z,useValue:e}];return t.providers&&(typeof t.providers=="function"?r.push(...t.providers(e,t,n)):r.push(...t.providers)),t.direction&&(!l||!l.get(Ot,null,{optional:!0}))&&r.push({provide:Ot,useValue:{value:t.direction,change:Bt()}}),k.create({parent:l||s,providers:r})}_removeOpenDialog(t,e){let n=this.openDialogs.indexOf(t);n>-1&&(this.openDialogs.splice(n,1),this.openDialogs.length||(this._ariaHiddenElements.forEach((s,l)=>{s?l.setAttribute("aria-hidden",s):l.removeAttribute("aria-hidden")}),this._ariaHiddenElements.clear(),e&&this._getAfterAllClosed().next()))}_hideNonDialogContentFromAssistiveTechnology(){let t=this._overlayContainer.getContainerElement();if(t.parentElement){let e=t.parentElement.children;for(let n=e.length-1;n>-1;n--){let s=e[n];s!==t&&s.nodeName!=="SCRIPT"&&s.nodeName!=="STYLE"&&!s.hasAttribute("aria-live")&&(this._ariaHiddenElements.set(s,s.getAttribute("aria-hidden")),s.setAttribute("aria-hidden","true"))}}}_getAfterAllClosed(){let t=this._parentDialog;return t?t._getAfterAllClosed():this._afterAllClosedAtThisLevel}};i.\u0275fac=function(e){return new(e||i)(p(T),p(k),p(Me,8),p(i,12),p(lt),p(Fe))},i.\u0275prov=J({token:i,factory:i.\u0275fac,providedIn:"root"});let o=i;return o})();function St(o,i){let a=o.length;for(;a--;)i(o[a])}var be=(()=>{let i=class i{};i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=K({type:i}),i.\u0275inj=Z({providers:[Lt],imports:[ct,$,le,$]});let o=i;return o})();function Pe(o,i){}var q=class{constructor(){this.role="dialog",this.panelClass="",this.hasBackdrop=!0,this.backdropClass="",this.disableClose=!1,this.width="",this.height="",this.data=null,this.ariaDescribedBy=null,this.ariaLabelledBy=null,this.ariaLabel=null,this.ariaModal=!0,this.autoFocus="first-tabbable",this.restoreFocus=!0,this.delayFocusTrap=!0,this.closeOnNavigation=!0}},Mt="mdc-dialog--open",ve="mdc-dialog--opening",De="mdc-dialog--closing",Be=150,Ne=75,Ve=(()=>{let i=class i extends Ft{constructor(t,e,n,s,l,r,g,w,gt){super(t,e,n,s,l,r,g,gt),this._animationMode=w,this._animationStateChanged=new Ht,this._animationsEnabled=this._animationMode!=="NoopAnimations",this._actionSectionCount=0,this._hostElement=this._elementRef.nativeElement,this._enterAnimationDuration=this._animationsEnabled?Ae(this._config.enterAnimationDuration)??Be:0,this._exitAnimationDuration=this._animationsEnabled?Ae(this._config.exitAnimationDuration)??Ne:0,this._animationTimer=null,this._finishDialogOpen=()=>{this._clearAnimationClasses(),this._openAnimationDone(this._enterAnimationDuration)},this._finishDialogClose=()=>{this._clearAnimationClasses(),this._animationStateChanged.emit({state:"closed",totalTime:this._exitAnimationDuration})}}_contentAttached(){super._contentAttached(),this._startOpenAnimation()}_startOpenAnimation(){this._animationStateChanged.emit({state:"opening",totalTime:this._enterAnimationDuration}),this._animationsEnabled?(this._hostElement.style.setProperty(xe,`${this._enterAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(ve,Mt)),this._waitForAnimationToComplete(this._enterAnimationDuration,this._finishDialogOpen)):(this._hostElement.classList.add(Mt),Promise.resolve().then(()=>this._finishDialogOpen()))}_startExitAnimation(){this._animationStateChanged.emit({state:"closing",totalTime:this._exitAnimationDuration}),this._hostElement.classList.remove(Mt),this._animationsEnabled?(this._hostElement.style.setProperty(xe,`${this._exitAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(De)),this._waitForAnimationToComplete(this._exitAnimationDuration,this._finishDialogClose)):Promise.resolve().then(()=>this._finishDialogClose())}_updateActionSectionCount(t){this._actionSectionCount+=t,this._changeDetectorRef.markForCheck()}_clearAnimationClasses(){this._hostElement.classList.remove(ve,De)}_waitForAnimationToComplete(t,e){this._animationTimer!==null&&clearTimeout(this._animationTimer),this._animationTimer=setTimeout(e,t)}_requestAnimationFrame(t){this._ngZone.runOutsideAngular(()=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(t):t()})}_captureInitialFocus(){this._config.delayFocusTrap||this._trapFocus()}_openAnimationDone(t){this._config.delayFocusTrap&&this._trapFocus(),this._animationStateChanged.next({state:"opened",totalTime:t})}ngOnDestroy(){super.ngOnDestroy(),this._animationTimer!==null&&clearTimeout(this._animationTimer)}attachComponentPortal(t){let e=super.attachComponentPortal(t);return e.location.nativeElement.classList.add("mat-mdc-dialog-component-host"),e}};i.\u0275fac=function(e){return new(e||i)(d(V),d(st),d(it,8),d(q),d(at),d(X),d(L),d(Ct,8),d(rt))},i.\u0275cmp=y({type:i,selectors:[["mat-dialog-container"]],hostAttrs:["tabindex","-1",1,"mat-mdc-dialog-container","mdc-dialog"],hostVars:10,hostBindings:function(e,n){e&2&&(xt("id",n._config.id),tt("aria-modal",n._config.ariaModal)("role",n._config.role)("aria-labelledby",n._config.ariaLabel?null:n._ariaLabelledByQueue[0])("aria-label",n._config.ariaLabel)("aria-describedby",n._config.ariaDescribedBy||null),bt("_mat-animation-noopable",!n._animationsEnabled)("mat-mdc-dialog-container-with-actions",n._actionSectionCount>0))},standalone:!0,features:[F,v],decls:3,vars:0,consts:[[1,"mat-mdc-dialog-inner-container","mdc-dialog__container"],[1,"mat-mdc-dialog-surface","mdc-dialog__surface"],["cdkPortalOutlet",""]],template:function(e,n){e&1&&(c(0,"div",0)(1,"div",1),b(2,Pe,0,0,"ng-template",2),h()())},dependencies:[G],styles:['.mat-mdc-dialog-container{width:100%;height:100%;display:block;box-sizing:border-box;max-height:inherit;min-height:inherit;min-width:inherit;max-width:inherit;outline:0}.cdk-overlay-pane.mat-mdc-dialog-panel{max-width:var(--mat-dialog-container-max-width, 80vw);min-width:var(--mat-dialog-container-min-width, 0)}@media(max-width: 599px){.cdk-overlay-pane.mat-mdc-dialog-panel{max-width:var(--mat-dialog-container-small-max-width, 80vw)}}.mat-mdc-dialog-inner-container{display:flex;flex-direction:row;align-items:center;justify-content:space-around;box-sizing:border-box;height:100%;opacity:0;transition:opacity linear var(--mat-dialog-transition-duration, 0ms);max-height:inherit;min-height:inherit;min-width:inherit;max-width:inherit}.mdc-dialog--closing .mat-mdc-dialog-inner-container{transition:opacity 75ms linear;transform:none}.mdc-dialog--open .mat-mdc-dialog-inner-container{opacity:1}._mat-animation-noopable .mat-mdc-dialog-inner-container{transition:none}.mat-mdc-dialog-surface{display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;box-sizing:border-box;width:100%;height:100%;position:relative;overflow-y:auto;outline:0;transform:scale(0.8);transition:transform var(--mat-dialog-transition-duration, 0ms) cubic-bezier(0, 0, 0.2, 1);max-height:inherit;min-height:inherit;min-width:inherit;max-width:inherit;box-shadow:var(--mat-dialog-container-elevation-shadow, 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12));border-radius:var(--mdc-dialog-container-shape, 4px);background-color:var(--mdc-dialog-container-color, white)}[dir=rtl] .mat-mdc-dialog-surface{text-align:right}.mdc-dialog--open .mat-mdc-dialog-surface,.mdc-dialog--closing .mat-mdc-dialog-surface{transform:none}._mat-animation-noopable .mat-mdc-dialog-surface{transition:none}.mat-mdc-dialog-surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:2px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}.mat-mdc-dialog-title{display:block;margin-top:0;position:relative;flex-shrink:0;box-sizing:border-box;margin:0 0 1px;padding:var(--mat-dialog-headline-padding, 0 24px 9px)}.mat-mdc-dialog-title::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}[dir=rtl] .mat-mdc-dialog-title{text-align:right}.mat-mdc-dialog-container .mat-mdc-dialog-title{color:var(--mdc-dialog-subhead-color, rgba(0, 0, 0, 0.87));font-family:var(--mdc-dialog-subhead-font, Roboto, sans-serif);line-height:var(--mdc-dialog-subhead-line-height, 1.5rem);font-size:var(--mdc-dialog-subhead-size, 1rem);font-weight:var(--mdc-dialog-subhead-weight, 400);letter-spacing:var(--mdc-dialog-subhead-tracking, 0.03125em)}.mat-mdc-dialog-content{display:block;flex-grow:1;box-sizing:border-box;margin:0;overflow:auto;max-height:65vh}.mat-mdc-dialog-content>:first-child{margin-top:0}.mat-mdc-dialog-content>:last-child{margin-bottom:0}.mat-mdc-dialog-container .mat-mdc-dialog-content{color:var(--mdc-dialog-supporting-text-color, rgba(0, 0, 0, 0.6));font-family:var(--mdc-dialog-supporting-text-font, Roboto, sans-serif);line-height:var(--mdc-dialog-supporting-text-line-height, 1.5rem);font-size:var(--mdc-dialog-supporting-text-size, 1rem);font-weight:var(--mdc-dialog-supporting-text-weight, 400);letter-spacing:var(--mdc-dialog-supporting-text-tracking, 0.03125em)}.mat-mdc-dialog-container .mat-mdc-dialog-content{padding:var(--mat-dialog-content-padding, 20px 24px)}.mat-mdc-dialog-container-with-actions .mat-mdc-dialog-content{padding:var(--mat-dialog-with-actions-content-padding, 20px 24px)}.mat-mdc-dialog-container .mat-mdc-dialog-title+.mat-mdc-dialog-content{padding-top:0}.mat-mdc-dialog-actions{display:flex;position:relative;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;box-sizing:border-box;min-height:52px;margin:0;padding:8px;border-top:1px solid rgba(0,0,0,0);padding:var(--mat-dialog-actions-padding, 8px);justify-content:var(--mat-dialog-actions-alignment, start)}.cdk-high-contrast-active .mat-mdc-dialog-actions{border-top-color:CanvasText}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-start,.mat-mdc-dialog-actions[align=start]{justify-content:start}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-center,.mat-mdc-dialog-actions[align=center]{justify-content:center}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-end,.mat-mdc-dialog-actions[align=end]{justify-content:flex-end}.mat-mdc-dialog-actions .mat-button-base+.mat-button-base,.mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-mdc-dialog-actions .mat-button-base+.mat-button-base,[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}.mat-mdc-dialog-component-host{display:contents}'],encapsulation:2});let o=i;return o})(),xe="--mat-dialog-transition-duration";function Ae(o){return o==null?null:typeof o=="number"?o:o.endsWith("ms")?Tt(o.substring(0,o.length-2)):o.endsWith("s")?Tt(o.substring(0,o.length-1))*1e3:o==="0"?0:null}var mt=function(o){return o[o.OPEN=0]="OPEN",o[o.CLOSING=1]="CLOSING",o[o.CLOSED=2]="CLOSED",o}(mt||{}),I=class{constructor(i,a,t){this._ref=i,this._containerInstance=t,this._afterOpened=new x,this._beforeClosed=new x,this._state=mt.OPEN,this.disableClose=a.disableClose,this.id=i.id,i.addPanelClass("mat-mdc-dialog-panel"),t._animationStateChanged.pipe(R(e=>e.state==="opened"),Q(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete()}),t._animationStateChanged.pipe(R(e=>e.state==="closed"),Q(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),this._finishDialogClose()}),i.overlayRef.detachments().subscribe(()=>{this._beforeClosed.next(this._result),this._beforeClosed.complete(),this._finishDialogClose()}),Nt(this.backdropClick(),this.keydownEvents().pipe(R(e=>e.keyCode===27&&!this.disableClose&&!ot(e)))).subscribe(e=>{this.disableClose||(e.preventDefault(),He(this,e.type==="keydown"?"keyboard":"mouse"))})}close(i){this._result=i,this._containerInstance._animationStateChanged.pipe(R(a=>a.state==="closing"),Q(1)).subscribe(a=>{this._beforeClosed.next(i),this._beforeClosed.complete(),this._ref.overlayRef.detachBackdrop(),this._closeFallbackTimeout=setTimeout(()=>this._finishDialogClose(),a.totalTime+100)}),this._state=mt.CLOSING,this._containerInstance._startExitAnimation()}afterOpened(){return this._afterOpened}afterClosed(){return this._ref.closed}beforeClosed(){return this._beforeClosed}backdropClick(){return this._ref.backdropClick}keydownEvents(){return this._ref.keydownEvents}updatePosition(i){let a=this._ref.config.positionStrategy;return i&&(i.left||i.right)?i.left?a.left(i.left):a.right(i.right):a.centerHorizontally(),i&&(i.top||i.bottom)?i.top?a.top(i.top):a.bottom(i.bottom):a.centerVertically(),this._ref.updatePosition(),this}updateSize(i="",a=""){return this._ref.updateSize(i,a),this}addPanelClass(i){return this._ref.addPanelClass(i),this}removePanelClass(i){return this._ref.removePanelClass(i),this}getState(){return this._state}_finishDialogClose(){this._state=mt.CLOSED,this._ref.close(this._result,{focusOrigin:this._closeInteractionType}),this.componentInstance=null}};function He(o,i,a){return o._closeInteractionType=i,o.close(a)}var W=new A("MatMdcDialogData"),Ge=new A("mat-mdc-dialog-default-options"),$e=new A("mat-mdc-dialog-scroll-strategy",{providedIn:"root",factory:()=>{let o=_(T);return()=>o.scrollStrategies.block()}});var ze=0,ut=(()=>{let i=class i{get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}_getAfterAllClosed(){let t=this._parentDialog;return t?t._getAfterAllClosed():this._afterAllClosedAtThisLevel}constructor(t,e,n,s,l,r,g,w){this._overlay=t,this._defaultOptions=s,this._scrollStrategy=l,this._parentDialog=r,this._openDialogsAtThisLevel=[],this._afterAllClosedAtThisLevel=new x,this._afterOpenedAtThisLevel=new x,this.dialogConfigClass=q,this.afterAllClosed=Y(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(U(void 0))),this._dialog=e.get(Lt),this._dialogRefConstructor=I,this._dialogContainerType=Ve,this._dialogDataToken=W}open(t,e){let n;e=D(D({},this._defaultOptions||new q),e),e.id=e.id||`mat-mdc-dialog-${ze++}`,e.scrollStrategy=e.scrollStrategy||this._scrollStrategy();let s=this._dialog.open(t,Pt(D({},e),{positionStrategy:this._overlay.position().global().centerHorizontally().centerVertically(),disableClose:!0,closeOnDestroy:!1,closeOnOverlayDetachments:!1,container:{type:this._dialogContainerType,providers:()=>[{provide:this.dialogConfigClass,useValue:e},{provide:E,useValue:e}]},templateContext:()=>({dialogRef:n}),providers:(l,r,g)=>(n=new this._dialogRefConstructor(l,e,g),n.updatePosition(e?.position),[{provide:this._dialogContainerType,useValue:g},{provide:this._dialogDataToken,useValue:r.data},{provide:this._dialogRefConstructor,useValue:n}])}));return n.componentRef=s.componentRef,n.componentInstance=s.componentInstance,this.openDialogs.push(n),this.afterOpened.next(n),n.afterClosed().subscribe(()=>{let l=this.openDialogs.indexOf(n);l>-1&&(this.openDialogs.splice(l,1),this.openDialogs.length||this._getAfterAllClosed().next())}),n}closeAll(){this._closeDialogs(this.openDialogs)}getDialogById(t){return this.openDialogs.find(e=>e.id===t)}ngOnDestroy(){this._closeDialogs(this._openDialogsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete()}_closeDialogs(t){let e=t.length;for(;e--;)t[e].close()}};i.\u0275fac=function(e){return new(e||i)(p(T),p(k),p(ne,8),p(Ge,8),p($e),p(i,12),p(lt),p(Ct,8))},i.\u0275prov=J({token:i,factory:i.\u0275fac,providedIn:"root"});let o=i;return o})(),qe=0;var ke=(()=>{let i=class i{constructor(t,e,n){this._dialogRef=t,this._elementRef=e,this._dialog=n}ngOnInit(){this._dialogRef||(this._dialogRef=We(this._elementRef,this._dialog.openDialogs)),this._dialogRef&&Promise.resolve().then(()=>{this._onAdd()})}ngOnDestroy(){this._dialogRef?._containerInstance&&Promise.resolve().then(()=>{this._onRemove()})}};i.\u0275fac=function(e){return new(e||i)(d(I,8),d(V),d(ut))},i.\u0275dir=j({type:i,standalone:!0});let o=i;return o})(),pt=(()=>{let i=class i extends ke{constructor(){super(...arguments),this.id=`mat-mdc-dialog-title-${qe++}`}_onAdd(){this._dialogRef._containerInstance?._addAriaLabelledBy?.(this.id)}_onRemove(){this._dialogRef?._containerInstance?._removeAriaLabelledBy?.(this.id)}};i.\u0275fac=(()=>{let t;return function(n){return(t||(t=_t(i)))(n||i)}})(),i.\u0275dir=j({type:i,selectors:[["","mat-dialog-title",""],["","matDialogTitle",""]],hostAttrs:[1,"mat-mdc-dialog-title","mdc-dialog__title"],hostVars:1,hostBindings:function(e,n){e&2&&xt("id",n.id)},inputs:{id:"id"},exportAs:["matDialogTitle"],standalone:!0,features:[F]});let o=i;return o})(),ft=(()=>{let i=class i{};i.\u0275fac=function(e){return new(e||i)},i.\u0275dir=j({type:i,selectors:[["","mat-dialog-content",""],["mat-dialog-content"],["","matDialogContent",""]],hostAttrs:[1,"mat-mdc-dialog-content","mdc-dialog__content"],standalone:!0,features:[qt([ce])]});let o=i;return o})(),Oe=(()=>{let i=class i extends ke{_onAdd(){this._dialogRef._containerInstance?._updateActionSectionCount?.(1)}_onRemove(){this._dialogRef._containerInstance?._updateActionSectionCount?.(-1)}};i.\u0275fac=(()=>{let t;return function(n){return(t||(t=_t(i)))(n||i)}})(),i.\u0275dir=j({type:i,selectors:[["","mat-dialog-actions",""],["mat-dialog-actions"],["","matDialogActions",""]],hostAttrs:[1,"mat-mdc-dialog-actions","mdc-dialog__actions"],hostVars:6,hostBindings:function(e,n){e&2&&bt("mat-mdc-dialog-actions-align-start",n.align==="start")("mat-mdc-dialog-actions-align-center",n.align==="center")("mat-mdc-dialog-actions-align-end",n.align==="end")},inputs:{align:"align"},standalone:!0,features:[F]});let o=i;return o})();function We(o,i){let a=o.nativeElement.parentElement;for(;a&&!a.classList.contains("mat-mdc-dialog-container");)a=a.parentElement;return a?i.find(t=>t.id===a.id):null}var Te=(()=>{let i=class i{};i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=K({type:i}),i.\u0275inj=Z({providers:[ut],imports:[be,ct,$,It,It]});let o=i;return o})();var Rt=(()=>{let i=class i{constructor(t,e){this.dialogo=t,this.mensaje=e}cerrarDialogo(){this.dialogo.close(!1)}confirmado(){this.dialogo.close(!0)}};i.\u0275fac=function(e){return new(e||i)(d(I),d(W))},i.\u0275cmp=y({type:i,selectors:[["app-confirm"]],standalone:!0,features:[v],decls:10,vars:1,consts:[["mat-dialog-title",""],["mat-dialog-content",""],["mat-dialog-actions",""],["mat-button","","cdkFocusInitial","",3,"click"],["mat-button","",3,"click"]],template:function(e,n){e&1&&(c(0,"h1",0),f(1,"Confirmaci\xF3n"),h(),c(2,"div",1)(3,"p"),f(4),h()(),c(5,"div",2)(6,"button",3),C("click",function(){return n.cerrarDialogo()}),f(7,"No"),h(),c(8,"button",4),C("click",function(){return n.confirmado()}),f(9,"S\xED"),h()()),e&2&&(u(4),O(n.mensaje))},dependencies:[Te,pt,Oe,ft,M,ue]});let o=i;return o})();var jt=(()=>{let i=class i{constructor(){this.dialogRef=_(I),this.data=_(W),this.error=zt("")}process(t){this.exists(t)?this.error.set("El elemento ya existe"):this.dialogRef.close(t)}exists(t){if(!this.data.items||this.data.items.length===0||this.data.initialData&&JSON.stringify(this.data.initialData)===JSON.stringify(t))return!1;for(let e of this.data.items)if(JSON.stringify(e)===JSON.stringify(t))return!0;return!1}};i.\u0275fac=function(e){return new(e||i)},i.\u0275cmp=y({type:i,selectors:[["app-add-item"]],standalone:!0,features:[v],decls:6,vars:4,consts:[["mat-dialog-title",""],[1,"error"],[3,"submitForm","formStructure","initialData"]],template:function(e,n){e&1&&(c(0,"h1",0),f(1),h(),c(2,"mat-dialog-content")(3,"label",1),f(4),h(),c(5,"app-dynamic-form",2),C("submitForm",function(l){return n.process(l)}),h()()),e&2&&(u(),O(n.data.title),u(3),O(n.error()),u(),H("formStructure",n.data.formStructure)("initialData",n.data.initialData))},dependencies:[se,M,pt,ft,ye],styles:[".error[_ngcontent-%COMP%]{color:#ba1a1a}"]});let o=i;return o})();var Ue=(o,i)=>({"list-container":o,"list-container-readonly":i});function Je(o,i){if(o&1){let a=et();c(0,"p")(1,"mat-checkbox",2),C("change",function(e){P(a);let n=m(2);return B(n.changeCheck(e))}),f(2),h()()}if(o&2){let a=m(2);u(),H("checked",a.controlCheck),u(),O(a.label())}}function Ze(o,i){if(o&1&&(c(0,"label"),f(1),h()),o&2){let a=m(2);u(),O(a.label())}}function Ke(o,i){if(o&1){let a=et();c(0,"button",4),C("click",function(){P(a);let e=m(3);return B(e.createItem())}),c(1,"mat-icon"),f(2,"add"),h()()}}function Xe(o,i){if(o&1&&(f(0),Xt(1,"mask")),o&2){let a=m().$implicit,t=m().$implicit,e=m(3);At(" ",te(1,1,e.getValueDescription(t,a),i)," ")}}function ti(o,i){if(o&1&&f(0),o&2){let a=m().$implicit,t=m().$implicit,e=m(3);At(" ",e.getValueDescription(t,a)," ")}}function ei(o,i){if(o&1&&(c(0,"td"),b(1,Xe,2,4)(2,ti,1,1),h()),o&2){let a,t=i.$implicit,e=m(4);u(),S((a=e.getMask(t))?1:2,a)}}function ii(o,i){if(o&1){let a=et();c(0,"div")(1,"button",4),C("click",function(){P(a);let e=m().$implicit,n=m(3);return B(n.editarItem(e))}),c(2,"mat-icon"),f(3,"edit"),h()(),c(4,"button",4),C("click",function(){P(a);let e=m().$implicit,n=m(3);return B(n.removeItem(e))}),c(5,"mat-icon"),f(6,"delete"),h()()()}}function ni(o,i){if(o&1&&(c(0,"tr"),vt(1,ei,3,1,"td",null,Yt),c(3,"td"),b(4,ii,7,0,"div"),h()()),o&2){let a=m(3);u(),Dt(a.getHeaders()),u(3),S(a.editable()?4:-1)}}function oi(o,i){if(o&1&&(c(0,"div",1),b(1,Ke,3,0,"button",3),c(2,"table"),vt(3,ni,5,1,"tr",null,Wt),h()()),o&2){let a=m(2);H("ngClass",Kt(2,Ue,a.withCheck()&&a.editable(),!a.editable())),u(),S(a.editable()?1:-1),u(2),Dt(a.items())}}function ai(o,i){if(o&1&&(c(0,"section",0),b(1,Je,3,2,"p")(2,Ze,2,1,"label")(3,oi,5,5,"div",1),h()),o&2){let a=m();u(),S(a.withCheck()&&a.editable()?1:a.editable()?-1:2),u(2),S(a.controlCheck||!a.withCheck()?3:-1)}}var kn=(()=>{let i=class i{constructor(){this.items=yt.required(),this.formStructure=N.required({alias:"formStructure"}),this.initialData=yt(void 0,{alias:"initialData"}),this.label=N.required({alias:"label"}),this.withCheck=N(!1,{alias:"withCheck"}),this.editable=N(!1,{alias:"editable"}),this.controlCheck=!1,this.data=[],this.dialog=_(ut),this.datePipe=_(kt),this.maskPipe=_(dt),ie(()=>{if(this.initialData()&&this.items().length===0){let t=this.initialData();if(t.length>0){this.controlCheck=!0;for(let e of t)this.items().push(e)}}})}getHeaders(){return Object.keys(this.items()[0])}getValueDescription(t,e){let n=t[e];if(n&&typeof n=="object"&&n.start&&n.end)n=this.datePipe.transform(n.start,"dd/MM/yyyy HH:mm")+" - "+this.datePipe.transform(n.end,"dd/MM/yyyy HH:mm");else if(n&&typeof n=="object")return"";return n}getMask(t){return this.formStructure().filter(e=>e.name===t)[0].mask||""}changeCheck(t){this.controlCheck&&this.items().length>0?this.dialog.open(Rt,{data:`\xBFSeguro que desea borrar la lista de ${this.label().toLowerCase()}?`}).afterClosed().subscribe(n=>{n?(this.controlCheck=!this.controlCheck,this.controlCheck||(this.data=void 0,this.itemEdit=void 0,this.items.set([]),this.initialData.set(void 0))):t.source.checked=!0}):this.controlCheck=!this.controlCheck}createItem(){let t=structuredClone(this.formStructure()),e={};this.dialog.open(jt,{minWidth:"900px",data:{formStructure:t,initialData:e,items:this.items(),title:"Alta de "+this.label().toLowerCase()}}).afterClosed().subscribe(s=>{console.log("The dialog was closed"),s!==void 0&&this.process(s)})}removeItem(t){let e=this.getHeaders()[0],n=this.getValueDescription(t,e),s=this.getMask(e);s&&(n=this.maskPipe.transform(n,s)),this.dialog.open(Rt,{data:`\xBFDesea borrar el item ${n}?`}).afterClosed().subscribe(r=>{if(r){let g=this.items().filter(w=>w!==t);g.length===0&&this.initialData.set(void 0),this.items.set(g)}})}editarItem(t){this.data=t,this.itemEdit=t;let e=structuredClone(this.formStructure()),n=this.data;this.dialog.open(jt,{minWidth:"900px",data:{formStructure:e,initialData:n,items:this.items(),title:"Modificaci\xF3n de "+this.label().toLowerCase()}}).afterClosed().pipe(Vt(1)).subscribe(l=>{console.log("The dialog was closed"),l!==void 0?this.process(l):(this.itemEdit=void 0,this.data=void 0)})}process(t){t&&(this.itemEdit?this.items.set(this.items().map(e=>e===this.itemEdit?t:e)):this.items().push(t)),this.itemEdit=void 0,this.data=void 0}};i.\u0275fac=function(e){return new(e||i)},i.\u0275cmp=y({type:i,selectors:[["app-dynamic-list"]],inputs:{items:[1,"items"],formStructure:[1,"formStructure"],initialData:[1,"initialData"],label:[1,"label"],withCheck:[1,"withCheck"],editable:[1,"editable"]},outputs:{items:"itemsChange",initialData:"initialDataChange"},standalone:!0,features:[Zt([kt,dt]),v],decls:1,vars:1,consts:[[1,"container"],[3,"ngClass"],[3,"change","checked"],["type","button","mat-icon-button",""],["type","button","mat-icon-button","",3,"click"]],template:function(e,n){e&1&&b(0,ai,4,2,"section",0),e&2&&S(n.formStructure()!==void 0&&n.formStructure().length>0?0:-1)},dependencies:[ae,oe,M,pe,Ce,_e,dt,ge,fe],styles:[".container[_ngcontent-%COMP%]{margin:0 0 20px;padding:0;width:100%}.list-container[_ngcontent-%COMP%]{padding-left:40px}.list-container-readonly[_ngcontent-%COMP%]{padding:5px 0 5px 5px;width:100%;background-color:#eee}table[_ngcontent-%COMP%]{width:100%;background-color:#eee}table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child{text-align:right}label[_ngcontent-%COMP%]{font-weight:700;background-color:#ddd;width:100%;padding:5px 0 5px 5px;display:inline-block}"]});let o=i;return o})();export{kn as DynamicListComponent};