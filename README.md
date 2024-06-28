node v20.15.0

npm install
#note: what installing the packages, it alerts about several vulnerabilities.
The "high severitly" vulnerabilites among them, are being caused by the react-script library which is part of the "create react app" that was explicitly defined at the task. there is no easy fix for that issue



### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.



##Challanges beyond the task's description:
1.when gitlab api is being used without personal/user/app token it is limited and therefore limitation error might appear. please contact the developer in case that happens :)
2.Api limitations - The reposoris api is limited to 100 results. therefore we have decided to use pagination with limit of 30 results per page
3.The has been a need to call few endpoints in order to achieve pagination, one for the repo list and other for user detail in order to get number of public repos.
4.The main api provides only a single language (probably the most used) from the repo.
in order to get all languages used, we are making an additional network request.
5. We are using the "accordion" component in order to display the data, which by default loads the component at the "hidden part" which caused many ineffient parralel calls to languages api. that issue was fixed so the component only loads when repo is being expanded.

##Assumption / Design dcisions
1.The are number of api calls being made, in case of several errors, I have decided to take only one of them. otherwise scenario such as showing the same error twice might happen which we preffer to avoid.
2.No input validation has taken place as part of this app, and therefore unexpected input might cause unexpxected results