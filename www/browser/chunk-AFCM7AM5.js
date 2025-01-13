import{f as F,j,k as $}from"./chunk-YWZIUTR5.js";import{a as S}from"./chunk-7VSVCZ7D.js";import{a as R,b as V}from"./chunk-LEIMCQKJ.js";import{a as B}from"./chunk-MM5QLNJM.js";import{e as I,l as M,m as g,q as E}from"./chunk-72KDLSWN.js";import{c as q}from"./chunk-PVZQOOQ7.js";import{b as L,g as i,h as P,k as U,l as f}from"./chunk-U2CNLB2V.js";import{f as K}from"./chunk-RW4GY4BD.js";function G(t){return t%1===0?0:t.toString().split(".")[1].length}function N(t,...e){let n=Math.max(...e.map(r=>G(r)));return Number(t.toFixed(n))}var H=":host{--knob-handle-size:calc(var(--knob-size) * 2);display:-ms-flexbox;display:flex;position:relative;-ms-flex:3;flex:3;-ms-flex-align:center;align-items:center;font-family:var(--ion-font-family, inherit);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}:host(.range-disabled){pointer-events:none}::slotted(ion-label){-ms-flex:initial;flex:initial}::slotted(ion-icon[slot]){font-size:24px}.range-slider{position:relative;-ms-flex:1;flex:1;width:100%;height:var(--height);contain:size layout style;cursor:-webkit-grab;cursor:grab;-ms-touch-action:pan-y;touch-action:pan-y}:host(.range-pressed) .range-slider{cursor:-webkit-grabbing;cursor:grabbing}.range-pin{position:absolute;background:var(--ion-color-base);color:var(--ion-color-contrast);text-align:center;-webkit-box-sizing:border-box;box-sizing:border-box}.range-knob-handle{top:calc((var(--height) - var(--knob-handle-size)) / 2);-webkit-margin-start:calc(0px - var(--knob-handle-size) / 2);margin-inline-start:calc(0px - var(--knob-handle-size) / 2);display:-ms-flexbox;display:flex;position:absolute;-ms-flex-pack:center;justify-content:center;width:var(--knob-handle-size);height:var(--knob-handle-size);text-align:center}.range-knob-handle{inset-inline-start:0}:host-context([dir=rtl]) .range-knob-handle{left:unset}[dir=rtl] .range-knob-handle{left:unset}@supports selector(:dir(rtl)){.range-knob-handle:dir(rtl){left:unset}}.range-knob-handle:active,.range-knob-handle:focus{outline:none}.range-bar-container{border-radius:var(--bar-border-radius);top:calc((var(--height) - var(--bar-height)) / 2);position:absolute;width:100%;height:var(--bar-height)}.range-bar-container{inset-inline-start:0}:host-context([dir=rtl]) .range-bar-container{left:unset}[dir=rtl] .range-bar-container{left:unset}@supports selector(:dir(rtl)){.range-bar-container:dir(rtl){left:unset}}.range-bar{border-radius:var(--bar-border-radius);position:absolute;width:100%;height:var(--bar-height);background:var(--bar-background);pointer-events:none}.range-knob{border-radius:var(--knob-border-radius);top:calc(50% - var(--knob-size) / 2);position:absolute;width:var(--knob-size);height:var(--knob-size);background:var(--knob-background);-webkit-box-shadow:var(--knob-box-shadow);box-shadow:var(--knob-box-shadow);z-index:2;pointer-events:none}.range-knob{inset-inline-start:calc(50% - var(--knob-size) / 2)}:host-context([dir=rtl]) .range-knob{left:unset}[dir=rtl] .range-knob{left:unset}@supports selector(:dir(rtl)){.range-knob:dir(rtl){left:unset}}:host(.range-pressed) .range-bar-active{will-change:left, right}:host(.in-item){width:100%}:host([slot=start]),:host([slot=end]){width:auto}:host(.in-item) ::slotted(ion-label){-ms-flex-item-align:center;align-self:center}.range-wrapper{display:-ms-flexbox;display:flex;position:relative;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:center;align-items:center;height:inherit}::slotted([slot=label]){max-width:200px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.label-text-wrapper-hidden{display:none}.native-wrapper{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:center;align-items:center}:host(.range-label-placement-start) .range-wrapper{-ms-flex-direction:row;flex-direction:row}:host(.range-label-placement-start) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}:host(.range-label-placement-end) .range-wrapper{-ms-flex-direction:row-reverse;flex-direction:row-reverse}:host(.range-label-placement-end) .label-text-wrapper{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}:host(.range-label-placement-fixed) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}:host(.range-label-placement-fixed) .label-text-wrapper{-ms-flex:0 0 100px;flex:0 0 100px;width:100px;min-width:100px;max-width:200px}:host(.range-label-placement-stacked) .range-wrapper{-ms-flex-direction:column;flex-direction:column;-ms-flex-align:stretch;align-items:stretch}:host(.range-label-placement-stacked) .label-text-wrapper{-webkit-transform-origin:left top;transform-origin:left top;-webkit-transform:scale(0.75);transform:scale(0.75);margin-left:0;margin-right:0;margin-bottom:16px;max-width:calc(100% / 0.75)}:host-context([dir=rtl]):host(.range-label-placement-stacked) .label-text-wrapper,:host-context([dir=rtl]).range-label-placement-stacked .label-text-wrapper{-webkit-transform-origin:right top;transform-origin:right top}@supports selector(:dir(rtl)){:host(.range-label-placement-stacked:dir(rtl)) .label-text-wrapper{-webkit-transform-origin:right top;transform-origin:right top}}:host(.in-item.range-label-placement-stacked) .label-text-wrapper{margin-top:10px;margin-bottom:16px}:host(.in-item.range-label-placement-stacked) .native-wrapper{margin-bottom:0px}:host{--knob-border-radius:50%;--knob-background:#ffffff;--knob-box-shadow:0px 0.5px 4px rgba(0, 0, 0, 0.12), 0px 6px 13px rgba(0, 0, 0, 0.12);--knob-size:26px;--bar-height:4px;--bar-background:var(--ion-color-step-900, var(--ion-background-color-step-900, #e6e6e6));--bar-background-active:var(--ion-color-primary, #0054e9);--bar-border-radius:2px;--height:42px}:host(.range-item-start-adjustment){-webkit-padding-start:24px;padding-inline-start:24px}:host(.range-item-end-adjustment){-webkit-padding-end:24px;padding-inline-end:24px}:host(.ion-color) .range-bar-active,:host(.ion-color) .range-tick-active{background:var(--ion-color-base)}::slotted([slot=start]){-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}::slotted([slot=end]){-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}:host(.range-has-pin:not(.range-label-placement-stacked)){padding-top:calc(8px + 0.75rem)}:host(.range-has-pin.range-label-placement-stacked) .label-text-wrapper{margin-bottom:calc(8px + 0.75rem)}.range-bar-active{bottom:0;width:auto;background:var(--bar-background-active)}.range-bar-active.has-ticks{border-radius:0;-webkit-margin-start:-2px;margin-inline-start:-2px;-webkit-margin-end:-2px;margin-inline-end:-2px}.range-tick{-webkit-margin-start:-2px;margin-inline-start:-2px;border-radius:0;position:absolute;top:17px;width:4px;height:8px;background:var(--ion-color-step-900, var(--ion-background-color-step-900, #e6e6e6));pointer-events:none}.range-tick-active{background:var(--bar-background-active)}.range-pin{-webkit-transform:translate3d(0,  100%,  0) scale(0.01);transform:translate3d(0,  100%,  0) scale(0.01);-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:8px;padding-inline-end:8px;padding-top:8px;padding-bottom:8px;min-width:28px;-webkit-transition:-webkit-transform 120ms ease;transition:-webkit-transform 120ms ease;transition:transform 120ms ease;transition:transform 120ms ease, -webkit-transform 120ms ease;background:transparent;color:var(--ion-text-color, #000);font-size:0.75rem;text-align:center}.range-knob-pressed .range-pin,.range-knob-handle.ion-focused .range-pin{-webkit-transform:translate3d(0, calc(-100% + 11px), 0) scale(1);transform:translate3d(0, calc(-100% + 11px), 0) scale(1)}:host(.range-disabled){opacity:0.3}",W=H,J=':host{--knob-handle-size:calc(var(--knob-size) * 2);display:-ms-flexbox;display:flex;position:relative;-ms-flex:3;flex:3;-ms-flex-align:center;align-items:center;font-family:var(--ion-font-family, inherit);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}:host(.range-disabled){pointer-events:none}::slotted(ion-label){-ms-flex:initial;flex:initial}::slotted(ion-icon[slot]){font-size:24px}.range-slider{position:relative;-ms-flex:1;flex:1;width:100%;height:var(--height);contain:size layout style;cursor:-webkit-grab;cursor:grab;-ms-touch-action:pan-y;touch-action:pan-y}:host(.range-pressed) .range-slider{cursor:-webkit-grabbing;cursor:grabbing}.range-pin{position:absolute;background:var(--ion-color-base);color:var(--ion-color-contrast);text-align:center;-webkit-box-sizing:border-box;box-sizing:border-box}.range-knob-handle{top:calc((var(--height) - var(--knob-handle-size)) / 2);-webkit-margin-start:calc(0px - var(--knob-handle-size) / 2);margin-inline-start:calc(0px - var(--knob-handle-size) / 2);display:-ms-flexbox;display:flex;position:absolute;-ms-flex-pack:center;justify-content:center;width:var(--knob-handle-size);height:var(--knob-handle-size);text-align:center}.range-knob-handle{inset-inline-start:0}:host-context([dir=rtl]) .range-knob-handle{left:unset}[dir=rtl] .range-knob-handle{left:unset}@supports selector(:dir(rtl)){.range-knob-handle:dir(rtl){left:unset}}.range-knob-handle:active,.range-knob-handle:focus{outline:none}.range-bar-container{border-radius:var(--bar-border-radius);top:calc((var(--height) - var(--bar-height)) / 2);position:absolute;width:100%;height:var(--bar-height)}.range-bar-container{inset-inline-start:0}:host-context([dir=rtl]) .range-bar-container{left:unset}[dir=rtl] .range-bar-container{left:unset}@supports selector(:dir(rtl)){.range-bar-container:dir(rtl){left:unset}}.range-bar{border-radius:var(--bar-border-radius);position:absolute;width:100%;height:var(--bar-height);background:var(--bar-background);pointer-events:none}.range-knob{border-radius:var(--knob-border-radius);top:calc(50% - var(--knob-size) / 2);position:absolute;width:var(--knob-size);height:var(--knob-size);background:var(--knob-background);-webkit-box-shadow:var(--knob-box-shadow);box-shadow:var(--knob-box-shadow);z-index:2;pointer-events:none}.range-knob{inset-inline-start:calc(50% - var(--knob-size) / 2)}:host-context([dir=rtl]) .range-knob{left:unset}[dir=rtl] .range-knob{left:unset}@supports selector(:dir(rtl)){.range-knob:dir(rtl){left:unset}}:host(.range-pressed) .range-bar-active{will-change:left, right}:host(.in-item){width:100%}:host([slot=start]),:host([slot=end]){width:auto}:host(.in-item) ::slotted(ion-label){-ms-flex-item-align:center;align-self:center}.range-wrapper{display:-ms-flexbox;display:flex;position:relative;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:center;align-items:center;height:inherit}::slotted([slot=label]){max-width:200px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.label-text-wrapper-hidden{display:none}.native-wrapper{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:center;align-items:center}:host(.range-label-placement-start) .range-wrapper{-ms-flex-direction:row;flex-direction:row}:host(.range-label-placement-start) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}:host(.range-label-placement-end) .range-wrapper{-ms-flex-direction:row-reverse;flex-direction:row-reverse}:host(.range-label-placement-end) .label-text-wrapper{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}:host(.range-label-placement-fixed) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}:host(.range-label-placement-fixed) .label-text-wrapper{-ms-flex:0 0 100px;flex:0 0 100px;width:100px;min-width:100px;max-width:200px}:host(.range-label-placement-stacked) .range-wrapper{-ms-flex-direction:column;flex-direction:column;-ms-flex-align:stretch;align-items:stretch}:host(.range-label-placement-stacked) .label-text-wrapper{-webkit-transform-origin:left top;transform-origin:left top;-webkit-transform:scale(0.75);transform:scale(0.75);margin-left:0;margin-right:0;margin-bottom:16px;max-width:calc(100% / 0.75)}:host-context([dir=rtl]):host(.range-label-placement-stacked) .label-text-wrapper,:host-context([dir=rtl]).range-label-placement-stacked .label-text-wrapper{-webkit-transform-origin:right top;transform-origin:right top}@supports selector(:dir(rtl)){:host(.range-label-placement-stacked:dir(rtl)) .label-text-wrapper{-webkit-transform-origin:right top;transform-origin:right top}}:host(.in-item.range-label-placement-stacked) .label-text-wrapper{margin-top:10px;margin-bottom:16px}:host(.in-item.range-label-placement-stacked) .native-wrapper{margin-bottom:0px}:host{--knob-border-radius:50%;--knob-background:var(--bar-background-active);--knob-box-shadow:none;--knob-size:18px;--bar-height:2px;--bar-background:rgba(var(--ion-color-primary-rgb, 0, 84, 233), 0.26);--bar-background-active:var(--ion-color-primary, #0054e9);--bar-border-radius:0;--height:42px;--pin-background:var(--ion-color-primary, #0054e9);--pin-color:var(--ion-color-primary-contrast, #fff)}::slotted(:not(ion-icon)[slot=start]),::slotted(:not(ion-icon)[slot=end]),.native-wrapper{font-size:0.75rem}:host(.range-item-start-adjustment){-webkit-padding-start:18px;padding-inline-start:18px}:host(.range-item-end-adjustment){-webkit-padding-end:18px;padding-inline-end:18px}:host(.ion-color) .range-bar{background:rgba(var(--ion-color-base-rgb), 0.26)}:host(.ion-color) .range-bar-active,:host(.ion-color) .range-knob,:host(.ion-color) .range-knob::before,:host(.ion-color) .range-pin,:host(.ion-color) .range-pin::before,:host(.ion-color) .range-tick{background:var(--ion-color-base);color:var(--ion-color-contrast)}::slotted([slot=start]){-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:14px;margin-inline-end:14px;margin-top:0;margin-bottom:0}::slotted([slot=end]){-webkit-margin-start:14px;margin-inline-start:14px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}:host(.range-has-pin:not(.range-label-placement-stacked)){padding-top:1.75rem}:host(.range-has-pin.range-label-placement-stacked) .label-text-wrapper{margin-bottom:1.75rem}.range-bar-active{bottom:0;width:auto;background:var(--bar-background-active)}.range-knob{-webkit-transform:scale(0.67);transform:scale(0.67);-webkit-transition-duration:120ms;transition-duration:120ms;-webkit-transition-property:background-color, border, -webkit-transform;transition-property:background-color, border, -webkit-transform;transition-property:transform, background-color, border;transition-property:transform, background-color, border, -webkit-transform;-webkit-transition-timing-function:ease;transition-timing-function:ease;z-index:2}.range-knob::before{border-radius:50%;position:absolute;width:var(--knob-size);height:var(--knob-size);-webkit-transform:scale(1);transform:scale(1);-webkit-transition:0.267s cubic-bezier(0, 0, 0.58, 1);transition:0.267s cubic-bezier(0, 0, 0.58, 1);background:var(--knob-background);content:"";opacity:0.13;pointer-events:none}.range-knob::before{inset-inline-start:0}.range-tick{position:absolute;top:calc((var(--height) - var(--bar-height)) / 2);width:var(--bar-height);height:var(--bar-height);background:var(--bar-background-active);z-index:1;pointer-events:none}.range-tick-active{background:transparent}.range-pin{padding-left:0;padding-right:0;padding-top:8px;padding-bottom:8px;border-radius:50%;-webkit-transform:translate3d(0,  0,  0) scale(0.01);transform:translate3d(0,  0,  0) scale(0.01);display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:1.75rem;height:1.75rem;-webkit-transition:background 120ms ease, -webkit-transform 120ms ease;transition:background 120ms ease, -webkit-transform 120ms ease;transition:transform 120ms ease, background 120ms ease;transition:transform 120ms ease, background 120ms ease, -webkit-transform 120ms ease;background:var(--pin-background);color:var(--pin-color)}.range-pin::before{bottom:-1px;-webkit-margin-start:-13px;margin-inline-start:-13px;border-radius:50% 50% 50% 0;position:absolute;width:26px;height:26px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transition:background 120ms ease;transition:background 120ms ease;background:var(--pin-background);content:"";z-index:-1}.range-pin::before{inset-inline-start:50%}:host-context([dir=rtl]) .range-pin::before{left:unset}[dir=rtl] .range-pin::before{left:unset}@supports selector(:dir(rtl)){.range-pin::before:dir(rtl){left:unset}}.range-knob-pressed .range-pin,.range-knob-handle.ion-focused .range-pin{-webkit-transform:translate3d(0, calc(-100% + 4px), 0) scale(1);transform:translate3d(0, calc(-100% + 4px), 0) scale(1)}@media (any-hover: hover){.range-knob-handle:hover .range-knob:before{-webkit-transform:scale(2);transform:scale(2);opacity:0.13}}.range-knob-handle.ion-activated .range-knob:before,.range-knob-handle.ion-focused .range-knob:before,.range-knob-handle.range-knob-pressed .range-knob:before{-webkit-transform:scale(2);transform:scale(2)}.range-knob-handle.ion-focused .range-knob::before{opacity:0.13}.range-knob-handle.ion-activated .range-knob::before,.range-knob-handle.range-knob-pressed .range-knob::before{opacity:0.25}:host(:not(.range-has-pin)) .range-knob-pressed .range-knob,:host(:not(.range-has-pin)) .range-knob-handle.ion-focused .range-knob{-webkit-transform:scale(1);transform:scale(1)}:host(.range-disabled) .range-bar-active,:host(.range-disabled) .range-bar,:host(.range-disabled) .range-tick{background-color:var(--ion-color-step-250, var(--ion-background-color-step-250, #bfbfbf))}:host(.range-disabled) .range-knob{-webkit-transform:scale(0.55);transform:scale(0.55);outline:5px solid #fff;background-color:var(--ion-color-step-250, var(--ion-background-color-step-250, #bfbfbf))}:host(.range-disabled) .label-text-wrapper,:host(.range-disabled) ::slotted([slot=start]),:host(.range-disabled) ::slotted([slot=end]){opacity:0.38}',O=J,Q=class{constructor(t){L(this,t),this.ionChange=f(this,"ionChange",7),this.ionInput=f(this,"ionInput",7),this.ionFocus=f(this,"ionFocus",7),this.ionBlur=f(this,"ionBlur",7),this.ionKnobMoveStart=f(this,"ionKnobMoveStart",7),this.ionKnobMoveEnd=f(this,"ionKnobMoveEnd",7),this.rangeId=`ion-r-${Z++}`,this.didLoad=!1,this.noUpdate=!1,this.hasFocus=!1,this.inheritedAttributes={},this.contentEl=null,this.initialContentScrollY=!0,this.clampBounds=e=>g(this.min,e,this.max),this.ensureValueInBounds=e=>this.dualKnobs?{lower:this.clampBounds(e.lower),upper:this.clampBounds(e.upper)}:this.clampBounds(e),this.setupGesture=()=>K(this,null,function*(){let e=this.rangeSlider;e&&(this.gesture=(yield import("./chunk-2OUJHQAH.js")).createGesture({el:e,gestureName:"range",gesturePriority:100,threshold:10,onStart:()=>this.onStart(),onMove:n=>this.onMove(n),onEnd:n=>this.onEnd(n)}),this.gesture.enable(!this.disabled))}),this.handleKeyboard=(e,n)=>{let{ensureValueInBounds:r}=this,a=this.step;a=a>0?a:1,a=a/(this.max-this.min),n||(a*=-1),e==="A"?this.ratioA=g(0,this.ratioA+a,1):this.ratioB=g(0,this.ratioB+a,1),this.ionKnobMoveStart.emit({value:r(this.value)}),this.updateValue(),this.emitValueChange(),this.ionKnobMoveEnd.emit({value:r(this.value)})},this.onBlur=()=>{this.hasFocus&&(this.hasFocus=!1,this.ionBlur.emit())},this.onFocus=()=>{this.hasFocus||(this.hasFocus=!0,this.ionFocus.emit())},this.ratioA=0,this.ratioB=0,this.pressedKnob=void 0,this.color=void 0,this.debounce=void 0,this.name=this.rangeId,this.label=void 0,this.dualKnobs=!1,this.min=0,this.max=100,this.pin=!1,this.pinFormatter=e=>Math.round(e),this.snaps=!1,this.step=1,this.ticks=!0,this.activeBarStart=void 0,this.disabled=!1,this.value=0,this.labelPlacement="start"}debounceChanged(){let{ionInput:t,debounce:e,originalIonInput:n}=this;this.ionInput=e===void 0?n!=null?n:t:E(t,e)}minChanged(){this.noUpdate||this.updateRatio()}maxChanged(){this.noUpdate||this.updateRatio()}activeBarStartChanged(){let{activeBarStart:t}=this;t!==void 0&&(t>this.max?(B(`Range: The value of activeBarStart (${t}) is greater than the max (${this.max}). Valid values are greater than or equal to the min value and less than or equal to the max value.`,this.el),this.activeBarStart=this.max):t<this.min&&(B(`Range: The value of activeBarStart (${t}) is less than the min (${this.min}). Valid values are greater than or equal to the min value and less than or equal to the max value.`,this.el),this.activeBarStart=this.min))}disabledChanged(){this.gesture&&this.gesture.enable(!this.disabled)}valueChanged(){this.noUpdate||this.updateRatio()}componentWillLoad(){this.el.hasAttribute("id")&&(this.rangeId=this.el.getAttribute("id")),this.inheritedAttributes=I(this.el)}componentDidLoad(){this.originalIonInput=this.ionInput,this.setupGesture(),this.updateRatio(),this.didLoad=!0}connectedCallback(){var t;this.updateRatio(),this.debounceChanged(),this.disabledChanged(),this.activeBarStartChanged(),this.didLoad&&this.setupGesture();let e=F(this.el);this.contentEl=(t=e==null?void 0:e.querySelector(".ion-content-scroll-host"))!==null&&t!==void 0?t:e}disconnectedCallback(){this.gesture&&(this.gesture.destroy(),this.gesture=void 0)}getValue(){var t;let e=(t=this.value)!==null&&t!==void 0?t:0;return this.dualKnobs?typeof e=="object"?e:{lower:0,upper:e}:typeof e=="object"?e.upper:e}emitValueChange(){this.value=this.ensureValueInBounds(this.value),this.ionChange.emit({value:this.value})}onStart(){this.ionKnobMoveStart.emit({value:this.ensureValueInBounds(this.value)})}onMove(t){let{contentEl:e,pressedKnob:n}=this,r=t.currentX;e&&this.pressedKnob===void 0&&(this.initialContentScrollY=j(e)),n===void 0&&this.setPressedKnob(r),this.update(r)}onEnd(t){var e;let{contentEl:n,initialContentScrollY:r}=this,a=(e=t.currentX)!==null&&e!==void 0?e:t.clientX;this.pressedKnob===void 0&&this.setPressedKnob(a),n&&this.pressedKnob!==void 0&&$(n,r),this.update(a),this.pressedKnob=void 0,this.emitValueChange(),this.ionKnobMoveEnd.emit({value:this.ensureValueInBounds(this.value)})}update(t){let e=this.rect,n=g(0,(t-e.left)/e.width,1);S(this.el)&&(n=1-n),this.snaps&&(n=w(C(n,this.min,this.max,this.step),this.min,this.max)),this.pressedKnob==="A"?this.ratioA=n:this.ratioB=n,this.updateValue()}setPressedKnob(t){let e=this.rect=this.rangeSlider.getBoundingClientRect(),n=g(0,(t-e.left)/e.width,1);S(this.el)&&(n=1-n),this.pressedKnob=!this.dualKnobs||Math.abs(this.ratioA-n)<Math.abs(this.ratioB-n)?"A":"B",this.setFocus(this.pressedKnob)}get valA(){return C(this.ratioA,this.min,this.max,this.step)}get valB(){return C(this.ratioB,this.min,this.max,this.step)}get ratioLower(){if(this.dualKnobs)return Math.min(this.ratioA,this.ratioB);let{activeBarStart:t}=this;return t==null?0:w(t,this.min,this.max)}get ratioUpper(){return this.dualKnobs?Math.max(this.ratioA,this.ratioB):this.ratioA}updateRatio(){let t=this.getValue(),{min:e,max:n}=this;this.dualKnobs?(this.ratioA=w(t.lower,e,n),this.ratioB=w(t.upper,e,n)):this.ratioA=w(t,e,n)}updateValue(){this.noUpdate=!0;let{valA:t,valB:e}=this;this.value=this.dualKnobs?{lower:Math.min(t,e),upper:Math.max(t,e)}:t,this.ionInput.emit({value:this.value}),this.noUpdate=!1}setFocus(t){if(this.el.shadowRoot){let e=this.el.shadowRoot.querySelector(t==="A"?".range-knob-a":".range-knob-b");e&&e.focus()}}get hasStartSlotContent(){return this.el.querySelector('[slot="start"]')!==null}get hasEndSlotContent(){return this.el.querySelector('[slot="end"]')!==null}get hasLabel(){return this.label!==void 0||this.el.querySelector('[slot="label"]')!==null}renderRangeSlider(){var t;let{min:e,max:n,step:r,handleKeyboard:a,pressedKnob:h,disabled:d,pin:p,ratioLower:l,ratioUpper:b,pinFormatter:k,inheritedAttributes:x}=this,u=`${l*100}%`,m=`${100-b*100}%`,c=S(this.el),o=c?"right":"left",v=c?"left":"right",T=s=>({[o]:s[o]});this.dualKnobs===!1&&(this.valA<((t=this.activeBarStart)!==null&&t!==void 0?t:this.min)?(u=`${b*100}%`,m=`${100-l*100}%`):(u=`${l*100}%`,m=`${100-b*100}%`));let X={[o]:u,[v]:m},z=[];if(this.snaps&&this.ticks)for(let s=e;s<=n;s+=r){let y=w(s,e,n),Y=Math.min(l,b),_=Math.max(l,b),A={ratio:y,active:y>=Y&&y<=_};A[o]=`${y*100}%`,z.push(A)}return i("div",{class:"range-slider",ref:s=>this.rangeSlider=s,onPointerUp:s=>{this.pressedKnob===void 0&&(this.onStart(),this.onEnd(s))}},z.map(s=>i("div",{style:T(s),role:"presentation",class:{"range-tick":!0,"range-tick-active":s.active},part:s.active?"tick-active":"tick"})),i("div",{class:"range-bar-container"},i("div",{class:"range-bar",role:"presentation",part:"bar"}),i("div",{class:{"range-bar":!0,"range-bar-active":!0,"has-ticks":z.length>0},role:"presentation",style:X,part:"bar-active"})),D(c,{knob:"A",pressed:h==="A",value:this.valA,ratio:this.ratioA,pin:p,pinFormatter:k,disabled:d,handleKeyboard:a,min:e,max:n,inheritedAttributes:x}),this.dualKnobs&&D(c,{knob:"B",pressed:h==="B",value:this.valB,ratio:this.ratioB,pin:p,pinFormatter:k,disabled:d,handleKeyboard:a,min:e,max:n,inheritedAttributes:x}))}render(){let{disabled:t,el:e,hasLabel:n,rangeId:r,pin:a,pressedKnob:h,labelPlacement:d,label:p}=this,l=R("ion-item",e),b=n&&(d==="start"||d==="fixed")||this.hasStartSlotContent,k=l&&!b,x=n&&d==="end"||this.hasEndSlotContent,u=l&&!x,m=q(this);return M(!0,e,this.name,JSON.stringify(this.getValue()),t),i(P,{key:"05c699caaead7cc74deaae2a958c4632191473a8",onFocusin:this.onFocus,onFocusout:this.onBlur,id:r,class:V(this.color,{[m]:!0,"in-item":l,"range-disabled":t,"range-pressed":h!==void 0,"range-has-pin":a,[`range-label-placement-${d}`]:!0,"range-item-start-adjustment":k,"range-item-end-adjustment":u})},i("label",{key:"959837bcc48c4bda33ae1f62b66ef444329a2961",class:"range-wrapper",id:"range-label"},i("div",{key:"a434c6b5c26f57f52b3af98d881e7e6a179c89fc",class:{"label-text-wrapper":!0,"label-text-wrapper-hidden":!n},part:"label"},p!==void 0?i("div",{class:"label-text"},p):i("slot",{name:"label"})),i("div",{key:"87df1037b6b3337bd1fab05d33a26bf658c57914",class:"native-wrapper"},i("slot",{key:"2cb88f101da49b70aeae29b0bf5445fac241bb2f",name:"start"}),this.renderRangeSlider(),i("slot",{key:"17b835cfb2bd9b8e1957afd425543ff02b913d83",name:"end"}))))}get el(){return U(this)}static get watchers(){return{debounce:["debounceChanged"],min:["minChanged"],max:["maxChanged"],activeBarStart:["activeBarStartChanged"],disabled:["disabledChanged"],value:["valueChanged"]}}},D=(t,{knob:e,value:n,ratio:r,min:a,max:h,disabled:d,pressed:p,pin:l,handleKeyboard:b,pinFormatter:k,inheritedAttributes:x})=>{let u=t?"right":"left",m=()=>{let o={};return o[u]=`${r*100}%`,o},c=x["aria-label"];return i("div",{onKeyDown:o=>{let v=o.key;v==="ArrowLeft"||v==="ArrowDown"?(b(e,!1),o.preventDefault(),o.stopPropagation()):(v==="ArrowRight"||v==="ArrowUp")&&(b(e,!0),o.preventDefault(),o.stopPropagation())},class:{"range-knob-handle":!0,"range-knob-a":e==="A","range-knob-b":e==="B","range-knob-pressed":p,"range-knob-min":n===a,"range-knob-max":n===h,"ion-activatable":!0,"ion-focusable":!0},style:m(),role:"slider",tabindex:d?-1:0,"aria-label":c!==void 0?c:null,"aria-labelledby":c===void 0?"range-label":null,"aria-valuemin":a,"aria-valuemax":h,"aria-disabled":d?"true":null,"aria-valuenow":n},l&&i("div",{class:"range-pin",role:"presentation",part:"pin"},k(n)),i("div",{class:"range-knob",role:"presentation",part:"knob"}))},C=(t,e,n,r)=>{let a=(n-e)*t;r>0&&(a=Math.round(a/r)*r+e);let h=g(e,a,n);return N(h,e,n,r)},w=(t,e,n)=>g(0,(t-e)/(n-e),1),Z=0;Q.style={ios:W,md:O};export{Q as ion_range};
