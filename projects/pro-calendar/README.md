# Pro Calendar

Professional Calendar for Angular
> Angular 16+
- [Pro Calendar](#pro-calendar)
  - [Install](#install)
  - [Screenshot with Native Datepicker](#screenshot-with-native-datepicker)
  - [Screenshot with Material Datepicker](#screenshot-with-material-datepicker)
  - [Use](#use)
  - [Props \& Types](#props--types)
  - [Events](#events)
  - [Slots](#slots)
  - [Custom HTML Events fired](#custom-html-events-fired)
  - [Support me ?](#support-me-)

## Install

```sh
npm i ng-pro-calendar
```

## Screenshot with Native Datepicker

![ng-pro-calendar screenshot with native datepicker]()

## Screenshot with Material Datepicker

![ng-pro-calendar screenshot with material datepicker]()

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
import { Appointment, Configs, E_CustomEvents } from 'pro-calendar';

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
      name: "SAGBO Aimé",
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

## Props & Types

`nativeDatepicker`:
> false or undefined : use Material DatePicker instead

`property?: T_Action`:
> undefined : the action is disabled

```ts
type T_View = 'day' | 'week' | 'month';

type T_Action = {
  icon?: boolean;
  text?: string;
}

type Configs = {
  viewEvent?: T_Action;
  reportEvent?: T_Action;
  searchPlaceholder?: string;
  eventName?: string;
  closeText?: string;
  nativeDatepicker?: boolean;
}

type Appointment = {
  id: string;
  name: string;
  date: string; //DateIsoString
  keywords: string;
  comment?: string;
  createdAt?: string; //DateIsoString
  updatedAt?: string; //DateIsoString
}

// Props with default
interface Props {
  date?: string;
  view?: T_View;
  events?: Appointment[];
  loading?: boolean;
  config?: Configs;
}

// default 
date = undefined;
view = "week";
events = [];
loading = false;
config = {
    viewEvent: {
    icon: true,
    text: "",
    },
    reportEvent: {
    icon: true,
    text: "",
    },
    searchPlaceholder: "",
    eventName: "",
    closeText: "",
    nativeDatepicker: true,
};
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

    <!-- <ng-template let-calendarClose="calendarClose" #closeButton> -->
        <!-- calendarClose.emit() -->
    <!-- </ng-template> -->

    <!-- <ng-template let-date="date" let-time="time" let-cardEvent="cardEvent" #eventCard> -->
        <!-- use this slot to show yourself calendar event in appearance you want -->
        <!--
        date: Date;
        time: string;
        cardEvent: Appointment[]; // events according to date/time
        -->
    <!-- </ng-template> -->

    <!-- <ng-template let-dateSelected="dateSelected" let-calendarEvents="calendarEvents" #sideEvent> -->
        <!-- use this slot to show yourself side events in appearance you want -->
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

## Support me ?

<p>encourage me to do even more...</p>
<a href="https://www.buymeacoffee.com/lbgm" title="Buy me a coffee ?" target="_blank" rel="nofollow"><img align="left" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50" width="210" alt="lbgmcoffee" data-canonical-src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"></a><br>
