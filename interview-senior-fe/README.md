# Getting Started

```bash
git clone https://github.com/wootra/interview-questions.git
```

## First things first...

```bash
cd interview-{title}-fe
npm i
```

## Next, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Questions

This app has some issues. Start investigating why it's not working. Feel free to ask questions, google, or talk out loud.

1. The `users` GET service call isn't working as expected. What is the issue? At a miniumum what can be done to resolve this issue?

- a. Rendering user information doesn't appear to be working. What is the root cause and what do you think is the best solution?

2. The search section and add new section is visually not aligned. please check CSS and make it aligned in column direction
3. Please take a few minutes and share your observations on the UX.

- a: What are some things you would do to improve the UX?
- b: Implement one of your suggested UX improvements

4. Search is functional, but it is case-sensitive. Can you broaden the search to make it case insensitive. (interview-senior-fe/src/app/api/users/route.ts)
5. Adding users is working, however newly added users are not showing in the list, make the latest users shown rather than older users.
6. New user creation is working but doesn't seem to have any validation. Can you add validation logic for

- Name field is empty, No age is provided -> show "name and age is required"
- Name length is under 2 characters -> show "name need to be more than 2 characters"
- when Age is under 18 -> show "age should be 18 or older than 18

## Bonus

- refactor the component for the better readability
- as a senior engineer, review the code and give suggestions
