## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Questions

this app has few issues. investigate why it is not working, and fix it.

- `users` GET service call fails. what is the issue? and what is the minimal solution?
- rendering is failing. what is the root cause and what is the best solution?
- the search section and add new section is visually not alligned. please check CSS and make it aligned in column direction
- search is working, but it is case sensitive. make it case "insensitive". (interview-senior-fe/src/app/api/users/route.ts)
- add a new user is working, but we need a validation. Add a validation logic for 
  - no name, no age -> show "name and age is required"
  - name length is under 2 characters -> show "name need to be more than 2 characters"
  - when age is under 18 -> show "age should be 18 or older than 18
  - when age is over 100 -> show "please call us. We have a senior friendly service."


## Bonus

- refactor the component for the better readability
- as a scenior engineer, review the code and give suggestions
