# Pro Calendar

Professional Calendar for Angular
> Angular 16+
- [Pro Calendar](#pro-calendar)
  - [Install](#install)
  - [Screenshot with Native Datepicker](#screenshot-with-native-datepicker)
  - [Screenshot with Material Datepicker](#screenshot-with-material-datepicker)
  - [Props \& Types](#props--types)
    - [Type `Configs`](#type-configs)
  - [Use](#use)
  - [Events](#events)
  - [Slots](#slots)
  - [Custom HTML Events fired](#custom-html-events-fired)

## Install

```sh
npm i ng-pro-calendar
```

## Screenshot with Native Datepicker

![ng-pro-calendar screenshot with native datepicker](https://user-images.githubusercontent.com/92580505/283180919-d601c5be-1f9d-4df4-a900-79b3efd932e7.png)

## Screenshot with Material Datepicker

![ng-pro-calendar screenshot with material datepicker](https://user-images.githubusercontent.com/92580505/283180238-8363d4b5-2f23-45c9-bcfb-f77a45e954b6.png)

## Props & Types

> Import and inspect types `T_View`, `T_Action`, `Appointment`, `Configs` from 'ng-pro-calendar';

| Prop | Type | Required | Default |
| :---     | :---     | :---         | :---        |
| `date`   | `string` `// iso string` | No           | `undefined` |
| `view`   | `T_View` | No           | `"week"`    |
| `events` | `Appointment[]` | No    | `[]`        |
| `loading`| `boolean` | No          | `false`     |
| `config` | `Configs` | No          | `DEFAULT_CONFIGS` |

> You can import `DEFAULT_CONFIGS` from ng-pro-calendar;

### Type `Configs`

> When you set `nativeDatepicker` to `false` or `undefined`, Material DatePicker will be used.

> When you set a property with type `T_Action` to `undefined`, the action is disabled.

## Use

`app.module.ts`

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { ProCalendarModule } from 'ng-pro-calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ProCalendarModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

`app.component.ts`

```ts
import { Component, OnInit } from '@angular/core';
import { Appointment, Configs, E_CustomEvents } from 'ng-pro-calendar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-pro-calendar';

  evts: Appointment[] = [
    {
      date: "2022-11-24T16:00:50.253Z",
      comment: "Faire une livraison à moto de Mont Sinaï à Calavi",
      id: "cl3eddmjz1435801pqwfa5ihd1",
      keywords: "Anniversaire",
      name: "Rodolphe SOUNLIN"",
    },
    {
      date: "2022-11-19T14:00:00.000Z",
      comment: "",
      id: "cl32rbkjk1700101o53e3e3uhn",
      keywords: "Projet BAMBA",
      name: "MONTCHO Kévin",
    },
    {
      date: "2022-11-17T13:00:36.284Z",
      comment: "",
      id: "cl34856g01439801piot8vp3jr",
      keywords: "Rencontre",
      name: "Cornelia ADADJO",
    },
    {
      date: "2022-11-10T07:00:00.000Z",
      comment: "",
      id: "cl2yk477s136301pbmh49btdg",
      keywords: "Anniversaire",
      name: "Sylla Rahamata",
    },
    {
      date: "2022-11-10T07:00:00.000Z",
      comment: "",
      id: "cl30h76qi116501nu2dc1wnv1",
      keywords: "Réunion",
      name: "Espéra AWO",
    }
  ];

  cfg: Configs = {
    viewEvent: undefined,
    reportEvent: {
      icon: true,
      text: "",
    },
    searchPlaceholder: "",
    eventName: "",
    closeText: "",
    nativeDatepicker: false,
    todayButton: true,
    firstDayOfWeek: 1
  };

  ngOnInit(): void {
    [E_CustomEvents.VIEW, E_CustomEvents.REPORT].forEach((e: string) => {
      document.body.addEventListener(e, (event: Event | CustomEvent) => {
        console.log({ event });
      });
    });
  }
}
```

`app.component.html`

```html
<pro-calendar 
    date="2022-11-10T00:00:00.000Z"
    [events]="evts"
    [config]="cfg"
/>
```

## Events

`(calendarClosed)`:
> This event is fired when user clicks close button.

`(fetchEvents)`:
> This event is fired when date selected changes. `$event: { start: string; end: string }`. `start` and `end` are iso string date.

## Slots

Draw your own calendar using scoped slots

```html
<pro-calendar 
    date="2022-11-10T00:00:00.000Z"
    [events]="evts"
    [config]="cfg"
>
    <!-- <ng-template let-calendarGotLoading="calendarGotLoading" #loader> -->
       <!-- content -->
    <!-- </ng-template> -->

    <!-- <ng-template #searchIcon> -->
        <!-- &#454; -->
    <!-- </ng-template> -->

    <!-- <ng-template #leftSwitchArrow> -->
        <!-- &#454; -->
    <!-- </ng-template> -->
    
    <!-- <ng-template #rightSwitchArrow> -->
        <!-- &#454; -->
    <!-- </ng-template> -->

    <!-- <ng-template #closeButton> -->
        <!-- &#454; -->
    <!-- </ng-template> -->

    <!-- <ng-template let-date="date" let-time="time" let-cardEvent="cardEvent" #eventCard> -->
        <!-- use this template to show calendar event in appearance you want -->
        <!--
        date: Date;
        time: string;
        cardEvent: Appointment[]; // events according to date/time
        -->
    <!-- </ng-template> -->

    <!-- <ng-template let-dateSelected="dateSelected" let-calendarEvents="calendarEvents" #sideEvent> -->
        <!-- use this template to show side event in appearance you want -->
        <!-- dateSelected: Date; -->
        <!-- calendarEvents: Appointment[]; // all events -->
    <!-- </ng-template> -->
</pro-calendar>
```

## Custom HTML Events fired

`calendar.request.view` & `calendar.request.report`

> When the user clicks on view or report action, a custom html event is fired with the id of event in detail.
> You can listen these events like described on [Use](#use).

> On default `#sideEvent template`, when user clicks on event, `calendar.request.view` is fired.
