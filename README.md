# WiVolunteer App
## About App
WiVolunteer App is a web application that enable user to join and organise volunteering events. It aims to improve resource allocation, quality of events and volunteers' experience with analysis of feedbacks from participants.

## Collaborator
This project is a collaborative effort.
- [Jess Toh](https://github.com/jesstoh)
- [Tee Wenjie](https://github.com/wenjietee)

## Application Links

This web application is built using microservice architecture. 

[WiVolunteer App](https://wivolunteer.herokuapp.com)
- Front End

[WiVolunteer API](https://wivolunteer-api.herokuapp.com)
- Backend Server <br>
(Note: There is authentication layer implemented for API)

## Other Link

Repo to backend [WiVolunteer Backend Repo](https://github.com/wenjietee/wivolunteer-api/tree/master)

## User Stories
1. User is able to join and drop event
2. User is able to create, cancel or delete event
3. User is able to submit feedbacks after event
4. User is able to view charts of feedbacks
5. User is able to receive email notification for event cancellation or update
6. User is able to edit profile


## Technologies

UI
- **Reactjs** is components based UI library that allows decoupling of front end UI building from backend API
- **mdbreact** is React version of CSS framework with material design concept

Storage
- Cloudinary (Image Cloud Storage)

Libraries
- **react-router-dom, react-router** is used for managing multi-page components of React app
- **react-calendar** to display and select calendar date of events
- **cloudinary upload widget** provides intuitive UI that allows multiple ways of uploading images to Cloudinary (direct file upload, url etc) 
- **react-chartjs-2, Chart.js 2** used for plotting of charts feedbacks of this project
- **react-select** is React select control component used for multiple selection of inputs. This is used for selection in search bar in this project. 
- **react-moment** is React component for the moment date library, used to format dates of event to be more human readable 
- **axios** is promised based HTTP client used to make requests to backend api