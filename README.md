## `Instructions for locally running the project`

### `Install node`
Install node on your machine
(potentially via the main website https://nodejs.org/en)
This project was developed with node v20.15.0

### `Install dependencies`
Run the command "npm install" on the root of the project

Note: what installing the packages, it alerts about several vulnerabilities.
The "high severitly" vulnerabilites among them, are being caused by the react-script library which is part of the "create react app" that was explicitly defined at the task. there is no easy fix for that issue

### `Start the app in development mode`
Run the command "npm start" at the root of the project

The command Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.





#### `Challanges beyond the task's description:`
1.When gitlab api is being used without personal/user/app token it is limited and therefore limitation error might appear. please contact the developer in case that happens :)  
2.Api limitations - The repositoris api is limited to 100 results. therefore we have decided to use pagination with limit of 30 results per page.  
3.There has been a need to call few endpoints in order to achieve pagination, one for the repo list and other for user details in order to get number of public repos.  
4.The main repo list api provides only a single language (probably the most used) from the repo.
in order to get all languages used, we are making an additional network request.  
5. We are using the "accordion" component in order to display the data, which by default loads the component at the "hidden part", which causes many ineffient parralel calls to languages api. that issue was fixed so the component only loads when repo is being expanded.

#### `Assumption / Design dcisions`
1.The are number of api calls being made, in case of several errors, I have decided to display only one of them. otherwise, scenarios such as showing the same error twice might happen which we preffer to avoid.  
2.No input validation has taken place as part of this app, and therefore unexpected input might cause unexpxected results.  
3.All potentially shareable types, APIs, etc., are currently located within the specific page directory. They will be relocated to the project's root if there is a need for reuse.