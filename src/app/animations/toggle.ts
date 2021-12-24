import { trigger, transition, animate, keyframes, style } from "@angular/animations";

export let toggle = trigger('toggle', [
    transition(':enter', [
        animate('0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)', keyframes([
            style({
                offset: 0,
                transform: 'scaleY(0)',
                transformOrigin: '100% 0%',
                opacity: 1
            }),
            style({
                offset: 1,
                transform: 'scaleY(1)',
                transformOrigin: '100% 0%',
                opacity: 1
            }),

        ]))
    ]),
    transition(':leave', [
        animate('0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)', keyframes([
            style({
                offset: 0,
                transform: 'scaleY(1)',
                transformOrigin: '100% 0%',
                opacity: 1
            }),
            style({
                offset: 1,
                transform: 'scaleY(0)',
                transformOrigin: '100% 0%',
                opacity: 1
            }),

        ]))
    ])
])