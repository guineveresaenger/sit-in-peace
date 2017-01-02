## Problem Statement
---
As a busy single parent, I have to frequently arrange for childcare.
I am currently having to keep track of many babysitters in my head and contact each by their preferred method.
I would like a web app that helps me make these arrangements by sending text message babysitting requests all at once, and automatic appointment reminders to folks who agreed to babysit for an appointment.

## Market Research
---
### Sitter
* Sitter is an app very like my proposed project. It schedules appointments for parents, notifies sitters by text, including sending reminders, and has a built-in electronic payment option (via Venmo) with a timer and a calculator. Sitters can choose to use the app or just respond to texts (they are not required to sign up for the app. Parents can network with each other and share Sitter data.
* This particular app seems great and easy to use. It is free for both parents and sitters.
* Limits: This app exists for iOS only as a phone app. There is no website. This is limiting for sitters who would like to use the Sitter features but have no iPhone. There is also more of a focus on the timer and the payment calculator, and less on a schedule view.
* My app would not include a timer feature or a payment calculator, because I like rounding up what I owe, and I will often book a sitter for a pre-set block of time. I will honor and pay for the time I reserved with them, even if I return earlier.
* I really want my product to have a Calendar view, so that I can see at a glance whether I'm covered. I would also be able to share this calendar with other parental adults so they can see what is going on. Ultimately I would like to integrate this Calendar into my regular Google calendar but that is an extra feature for now.
* Additionally, my application would be able to create appointments and set the babysitter at that time (if I already know who it is), skipping the request text message, but still sending reminders to the sitter taking care of the appointment. This will make weekly repeats easy and non-annoying as well.
* I would say the focus of my project would be one of organization for the parent, while Sitter encourages more of a market economy approach with its focus on putting the gig "out there", timing it, and calculating pay.

### Outlook
* Outlook has a calendar and the capacity to send reminder emails and messages. It appears as though sending out initial babysitting requests would take explicit configuration of an address list. Replies from sitters would not be possible, or be handled via email.
* Separation of concerns would be configurable (have all babysitting correspondence in its own folder), but possibly unwieldy and difficult to use, especially for Sitters.
* It would be difficult to set calendar permissions such that each Sitter can only view their own and unclaimend appointments, rather than see everyone's appointments cluttering up the view.
* Outlook is a Microsoft product, meaning a trial web subscription or a costly investment upfront.
* My application would make it very easy for Sitters to respond to and accept babysitting requests. Sitters will not need to spend any effort configuring shared calendars. They can use the Sitter view for quick reference and to stay on top of things.


## User Personas
---
* I am creating this application for personal use. I want an easy-to-use organizatorial tool for handling my childcare situations, which means a Calendar view with simple input forms. I would use it to schedule people who pick my child up from school, summer day camp, and watch him if I'm busy at night. I would also use it to mark aftercare at school and keep track of no-school days (more of a regular Calendar function). I often worry about confirming or double-checking, so having the app send automatic reminders will free me from having to stay on top of everything at all times.
* I want this to be friendly and helpful for my babysitters. Sitters should be able to view the calendar, and have control over whether they'd like to receive reminders. Most of my babysitters are friends who have regular access to computers, so the schedule view would be easy for them to access. Most of them probably could benefit from an automatic reminder.


## Trello Board
---
https://trello.com/b/p3CSxi9l/brendancare

## Technology selections
---
* Rails with AR database
* Ruby gem simple_calendar to build the calendar
* Twilio to send out texts
* Foundation for scaling to all screen sizes
* React with Rails for front-end development
* OAuth with Google and Facebook (so that a majority of people can log in)
* Cron  for setting tasks for sending reminders

## Wireframes
---
*Will be available upon request, and included in the project repo once created.
